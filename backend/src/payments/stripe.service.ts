import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

/* Stripe SDK-ийн нимгэн бүрхүүл.

   ⚠️ ЯАГААД ЗАЛХУУ (lazy) ҮҮСГЭДЭГ ВЭ
   `backend/.env`-д одоогоор 5 л түлхүүр байдаг (см. medreh-project тэмдэглэл) —
   Stripe-ийн түлхүүр бөглөөгүй хөгжүүлэгчийн машин дээр ч апп АСАХ ёстой.
   Хэрэв энэ service-ийг constructor дотор `new Stripe(...)` гэж үүсгэвэл түлхүүр
   байхгүй үед бүх апп бүтэлгүйтэж, дуу тоглуулах ч боломжгүй болно. Тиймээс
   client-ыг ЭХНИЙ дуудлагад л үүсгэж, түлхүүргүй бол ЗӨВХӨН төлбөрийн endpoint
   503 буцаана — бусад бүх функц хэвийн ажиллана.

   ⚠️ API ХУВИЛБАРЫГ ТОГТМОЛ БАРИХГҮЙ
   `apiVersion`-ыг заахгүй орхивол SDK нь өөрийн бүтээгдсэн хувилбарыг ашиглана.
   Энэ нь `stripe` пакетийн TypeScript тодорхойлолттой ҮРГЭЛЖ таарна — гараар
   бичсэн хувилбарын мөр нь пакет шинэчлэгдэхэд чимээгүй зөрж, compile алдаа
   өгдөг нийтлэг алдаа. */
@Injectable()
export class StripeService {
  private readonly logger = new Logger(StripeService.name);
  private client: Stripe | null = null;

  constructor(private config: ConfigService) {}

  /** Тохируулга бүрэн эсэх — UI-д "төлбөр идэвхгүй" гэж ИЛ хэлэхэд ашиглана. */
  get configured(): boolean {
    return Boolean(isSecretKey(this.config.get<string>('STRIPE_SECRET_KEY')) && this.priceId);
  }

  /** Сар бүрийн давтагдах Price (`price_...`) — Stripe Dashboard дээр үүсгэнэ. */
  get priceId(): string | undefined {
    return this.config.get<string>('STRIPE_PRICE_ID');
  }

  get webhookSecret(): string | undefined {
    return this.config.get<string>('STRIPE_WEBHOOK_SECRET');
  }

  get stripe(): Stripe {
    if (this.client) return this.client;

    const key = this.config.get<string>('STRIPE_SECRET_KEY');
    if (!key) {
      /* 500 БИШ, 503: энэ нь кодын алдаа биш, тохируулгын дутагдал. Клиент тал
         үүнийг "төлбөр түр боломжгүй" гэж хэрэглэгчид ойлгомжтой харуулна. */
      throw new ServiceUnavailableException(
        'Төлбөрийн систем тохируулагдаагүй байна (STRIPE_SECRET_KEY дутуу).',
      );
    }

    /* ⚠️ ХАМГИЙН ТҮГЭЭМЭЛ ТОХИРУУЛГЫН АЛДАА: `pk_...` (publishable) түлхүүрийг
       `sk_...` (secret)-ийн оронд буулгах. Stripe Dashboard дээр хоёулаа зэрэгцээ
       харагддаг тул андуурахад амархан. Ийм түлхүүрээр SDK үүсэх нь бүтнэ ч эхний
       API дуудлагад Stripe `secret_key_required` гэж татгалзаж, хэрэглэгч тал
       ойлгомжгүй 500 авдаг. Тиймээс ЭНД зогсоож, шалтгааныг нь шууд хэлнэ. */
    if (!isSecretKey(key)) {
      this.logger.error(
        `STRIPE_SECRET_KEY нь нууц түлхүүр биш байна ("${key.slice(0, 3)}…"). ` +
          'https://dashboard.stripe.com/test/apikeys → «Secret key» (sk_test_…) хуулж backend/.env-д тавина уу.',
      );
      throw new ServiceUnavailableException(
        'Төлбөрийн систем буруу тохируулагдсан байна (STRIPE_SECRET_KEY нь sk_-ээр эхлэх ёстой).',
      );
    }

    this.client = new Stripe(key);
    this.logger.log(`Stripe client бэлэн (${key.startsWith('sk_live') ? 'LIVE' : 'TEST'} горим)`);
    return this.client;
  }

  /** Webhook-ийн гарын үсгийг шалгаж, event-ийг задална.
   *
   *  ⚠️ `rawBody` ЗААВАЛ түүхий Buffer байх ёстой. JSON.parse хийгээд буцаан
   *  stringify хийсэн хувилбар нь ажиллахгүй — түлхүүрийн дараалал/зай өөрчлөгдөж
   *  HMAC таарахаа болино. `main.ts`-д `rawBody: true` тохируулсан нь ийм учиртай. */
  constructEvent(rawBody: Buffer, signature: string): Stripe.Event {
    const secret = this.webhookSecret;
    if (!secret) {
      throw new ServiceUnavailableException(
        'Webhook тохируулагдаагүй байна (STRIPE_WEBHOOK_SECRET дутуу).',
      );
    }
    return this.stripe.webhooks.constructEvent(rawBody, signature, secret);
  }
}

/** Stripe-ийн СЕРВЕР талын түлхүүр мөн эсэх.
 *
 *  `sk_test_…`/`sk_live_…` — энгийн нууц түлхүүр, `rk_…` — хязгаарлагдмал эрхтэй
 *  (restricted) түлхүүр; хоёулаа server-side дуудлагад тохирно. `pk_…` нь клиент
 *  талын publishable түлхүүр бөгөөд ЭНД ТААРАХГҮЙ. */
/* ⚠️ `key is string` гэсэн type predicate БИШ — тийм байвал `if (!isSecretKey(key))`
   салаанд TypeScript нь `key`-г `never` болгож нарийсгаж, доторх `key.slice()` нь
   compile алдаа өгнө (түлхүүр нь тэр цэгт аль хэдийн `string` гэдэг нь мэдэгдэж
   байгаа тул). Энгийн boolean хангалттай. */
function isSecretKey(key: string | undefined): boolean {
  return Boolean(key && (key.startsWith('sk_') || key.startsWith('rk_')));
}
