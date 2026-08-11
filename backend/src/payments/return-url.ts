import { BadRequestException } from '@nestjs/common';

/* Checkout дууссаны дараа хэрэглэгчийг ХААШАА буцаахыг клиент тал заана — вэб нь
   өөрийн origin руу, гар утас нь `medreh://` deep link рүү.

   ⚠️ ЭНЭ БОЛ АЮУЛГҮЙ БАЙДЛЫН ЦЭГ (open redirect).
   Клиентээс ирсэн URL-ыг шалгалтгүй ашиглавал халдагч "МЭДРЭХ-ээс ирсэн"
   төлбөрийн баталгаа мэт харагдах хуурамч хуудас руу хэрэглэгчийг хөтөлж болно
   (Stripe өөрөө URL-ыг шалгадаггүй). Тиймээс ЗӨВХӨН зөвшөөрөгдсөн origin/scheme.

   `CORS_ORIGIN` нь аль хэдийн "вэбийн жинхэнэ хаяг" гэсэн ганц үнэн эх сурвалж
   тул давхардуулж шинэ env нэмэхгүй, түүнийг л ашиглана. */

/** Гар утасны апп-ын deep link scheme (`mobile/app.json`-ийн `expo.scheme`). */
const APP_SCHEME = 'medreh:';

/** Expo Go-гийн dev scheme. Зөвхөн production БИШ үед зөвшөөрнө — тэнд хост нь
 *  хөгжүүлэгчийн LAN хаяг байдаг тул production-д зөвшөөрвөл open redirect. */
const EXPO_DEV_SCHEME = 'exp:';

export interface ResolvedReturn {
  url: string;
  /** Custom scheme (апп руу шууд үсрэх) эсэх — http(s) вэб хаягаас ялгана. */
  isDeepLink: boolean;
}

export function resolveReturnUrl(
  candidate: string | undefined,
  allowedWebOrigin: string,
  fallback: string,
  isProduction = process.env.NODE_ENV === 'production',
): ResolvedReturn {
  if (!candidate) return { url: fallback, isDeepLink: false };

  let url: URL;
  try {
    url = new URL(candidate);
  } catch {
    throw new BadRequestException('returnUrl буруу форматтай байна');
  }

  if (url.protocol === APP_SCHEME) return { url: candidate, isDeepLink: true };
  if (!isProduction && url.protocol === EXPO_DEV_SCHEME) return { url: candidate, isDeepLink: true };

  /* `CORS_ORIGIN` нь таслалаар тусгаарлагдсан олон хаяг байж болно (dev + prod). */
  const origins = allowedWebOrigin
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
  if (origins.includes(url.origin)) return { url: candidate, isDeepLink: false };

  throw new BadRequestException('returnUrl зөвшөөрөгдөөгүй хаяг руу заасан байна');
}

/** URL дээр query параметр нэмнэ.
 *
 *  ⚠️ Утгыг encode ХИЙХГҮЙ — дуудагч тал шаардлагатай бол өөрөө хийнэ. Stripe-ийн
 *  `{CHECKOUT_SESSION_ID}` тэмдэгт нь хаалтаа хэвээр хадгалж байж л орлуулагдана. */
export function appendParams(base: string, params: Record<string, string>): string {
  const [withoutHash, hash] = base.split('#');
  const joiner = withoutHash.includes('?') ? '&' : '?';
  const query = Object.entries(params)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');
  return `${withoutHash}${joiner}${query}${hash ? `#${hash}` : ''}`;
}
