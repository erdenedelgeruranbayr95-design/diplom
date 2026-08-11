import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import Stripe from 'stripe';

import { PrismaService } from '../prisma/prisma.service';
import { StripeService } from './stripe.service';
import { resolveReturnUrl, appendParams } from './return-url';

const DEFAULT_PLAN = 'МЭДРЭХ PRO';
const PROVIDER = 'stripe';

/* Stripe-ийн сар бүр сунгагдах захиалга.

   УРСГАЛ
     1. Клиент `POST /payments/checkout` дуудна → Stripe Checkout Session үүснэ →
        `url` буцна → клиент тэр хуудас руу шилжинэ (вэб: redirect, гар утас:
        системийн хөтөч).
     2. Хэрэглэгч картаа өгнө → Stripe төлбөр авна → бидний `success_url` руу
        буцаана.
     3. ⚠️ PRO эрхийг `success_url` БИШ, ЗӨВХӨН WEBHOOK олгоно.

   ЯАГААД success_url-д итгэж БОЛОХГҮЙ ВЭ
   Тэр бол зүгээр л хөтчийн redirect — хэрэглэгч түүнийг гараар бичээд ч ороод
   ирж чадна, эсвэл төлбөр амжилтгүй болсон ч сүлжээний саатлаас болж хүрч ирж
   болно. Stripe-ийн webhook нь гарын үсэгтэй (HMAC) тул мөнгө БОДИТООР
   шилжсэнийг батлах цорын ганц эх сурвалж. success_url нь зөвхөн "баярлалаа"
   гэж харуулах UI-ийн зориулалттай.

   ⚠️ SUBSCRIPTION горим тул webhook НЭГ УДАА биш, САР БҮР ирнэ (`invoice.paid`).
   Тиймээс "эрх олгох" биш "эрхийг сунгах" гэж бодох хэрэгтэй — доорх
   `activateFromInvoice` нь `renewsAt`-ыг Stripe-ийн хэлсэн ҮНЭН огноогоор
   бичдэг (бид өөрсдөө +1 сар тооцдоггүй). */
@Injectable()
export class StripeSubscriptionsService {
  private readonly logger = new Logger(StripeSubscriptionsService.name);

  constructor(
    private prisma: PrismaService,
    private stripe: StripeService,
    private config: ConfigService,
  ) {}

  /* --- 1. Checkout эхлүүлэх ------------------------------------------------ */

  /** @param apiBaseUrl Энэ backend-ийн ГАДНААС харагдах хаяг (гар утасны буцах
   *  хуудсыг эндээс үйлчилнэ). Дуудагч controller нь хүсэлтийн host-оос авна. */
  async createCheckoutSession(userId: string, returnUrl: string | undefined, apiBaseUrl: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Хэрэглэгч олдсонгүй');

    const webOrigin = this.config.get<string>('CORS_ORIGIN') ?? 'http://localhost:3000';
    const target = resolveReturnUrl(returnUrl, webOrigin, webOrigin);
    const customerId = await this.ensureCustomer(user.id, user.email, user.name);

    const { success, cancel } = this.buildRedirects(target, apiBaseUrl);

    /* Stripe нь `{CHECKOUT_SESSION_ID}` тэмдэгтийг өөрөө орлуулна. Клиент тал
       үүнийг ашиглан "төлбөр амжилттай" дэлгэцээ баталгаажуулж болно (гэхдээ
       эрх олгох нь webhook-ийн ажил — дээрх тайлбар харна уу). */
    const session = await this.stripe.stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      line_items: [{ price: this.stripe.priceId!, quantity: 1 }],
      success_url: success,
      cancel_url: cancel,
      /* Webhook дээр хэрэглэгчийг олох НӨӨЦ зам. Үндсэн зам нь `stripeCustomerId`
         боловч анхны checkout-ийн үед customer шинэ байж болзошгүй тул metadata-д
         ч бичиж, хоёр талаас нь баталгаажуулна. */
      metadata: { userId: user.id },
      subscription_data: { metadata: { userId: user.id } },
      client_reference_id: user.id,
    });

    if (!session.url) {
      throw new Error('Stripe Checkout Session үүссэн ч url буцаагаагүй');
    }
    return { url: session.url, sessionId: session.id };
  }

  /* Stripe-ийн буцах хаягуудыг бүтээнэ.

     ⚠️ STRIPE НЬ ЗӨВХӨН http(s) ХҮЛЭЭЖ АВНА. `medreh://` гэх custom scheme-ийг
     "invalid URL" гэж ТАТГАЛЗДАГ тул гар утсыг ШУУД deep link рүү буцааж
     болохгүй. Оронд нь энэ backend дээрх жижиг HTML хуудсаар (`GET
     /payments/return`) дамжуулж, тэр хуудас нь апп руу үсэргэнэ.

     Яагаад вэб апп биш, BACKEND дээр вэ: утас нь backend рүү аль хэдийн хүсэлт
     явуулж чадаж байгаа нь батлагдсан (checkout-ыг эндээс авсан). Вэб аппын хаяг
     нь хөгжүүлэлтийн үед `localhost:3001` байх бөгөөд утаснаас ХҮРЭХГҮЙ. */
  private buildRedirects(target: { url: string; isDeepLink: boolean }, apiBaseUrl: string) {
    if (!target.isDeepLink) {
      return {
        success: appendParams(target.url, { status: 'success', session_id: '{CHECKOUT_SESSION_ID}' }),
        cancel: appendParams(target.url, { status: 'cancel' }),
      };
    }

    const bounce = `${apiBaseUrl.replace(/\/$/, '')}/api/payments/return`;
    const app = encodeURIComponent(target.url);
    return {
      success: appendParams(bounce, { status: 'success', app }),
      cancel: appendParams(bounce, { status: 'cancel', app }),
    };
  }

  /** Буцах хуудсанд ирсэн deep link-ийг ДАХИН шалгана.
   *
   *  ⚠️ Тэр хуудас нь нээлттэй (JWT-гүй) тул хэн ч дурын `?app=` утгатай холбоос
   *  тарааж болно. Шалгалтгүй бол энэ нь МЭДРЭХ-ийн домэйн дээр сууж буй
   *  open redirect болно. */
  validateAppLink(app: string): string {
    const webOrigin = this.config.get<string>('CORS_ORIGIN') ?? 'http://localhost:3000';
    return resolveReturnUrl(app, webOrigin, webOrigin).url;
  }

  /** Stripe Customer-ыг нэг л удаа үүсгэж, дараа нь дахин ашиглана. */
  private async ensureCustomer(userId: string, email: string, name: string | null): Promise<string> {
    const user = await this.prisma.user.findUnique({ where: { id: userId }, select: { stripeCustomerId: true } });
    if (user?.stripeCustomerId) return user.stripeCustomerId;

    const customer = await this.stripe.stripe.customers.create({
      email,
      name: name ?? undefined,
      metadata: { userId },
    });
    await this.prisma.user.update({ where: { id: userId }, data: { stripeCustomerId: customer.id } });
    return customer.id;
  }

  /* --- 2. Webhook ---------------------------------------------------------- */

  /** Барьж авдаг event-үүд. Бусдыг чимээгүй алгасна (Stripe нь маш олон төрлийн
   *  event илгээдэг — таниагүйд нь 400 буцаавал Stripe дахин дахин оролдоно). */
  async handleEvent(event: Stripe.Event): Promise<{ handled: boolean }> {
    switch (event.type) {
      /* Анхны төлбөр БОЛОН сар бүрийн сунгалт хоёулаа энд ирнэ — тиймээс
         `checkout.session.completed`-ыг тусад нь барих шаардлагагүй, нэг зам
         хангалттай (мөн хоёуланг барих нь давхар Payment мөр үүсгэх эрсдэлтэй). */
      case 'invoice.paid':
        await this.activateFromInvoice(event.data.object);
        return { handled: true };

      case 'invoice.payment_failed':
        await this.recordFailure(event.data.object);
        return { handled: true };

      /* Захиалга дуусгавар болсон (хэрэглэгч цуцалсан, эсвэл төлбөр удаа дараа
         амжилтгүй болж Stripe өөрөө зогсоосон). */
      case 'customer.subscription.deleted':
        await this.deactivate(event.data.object);
        return { handled: true };

      default:
        this.logger.debug(`Stripe event "${event.type}" — алгаслаа`);
        return { handled: false };
    }
  }

  private async activateFromInvoice(invoice: Stripe.Invoice) {
    const userId = await this.resolveUserId(invoice.customer, invoice.metadata);
    if (!userId) {
      this.logger.warn(`invoice.paid — хэрэглэгч олдсонгүй (customer=${asId(invoice.customer)})`);
      return;
    }

    const subscriptionId = invoiceSubscriptionId(invoice);
    /* `renewsAt`-ыг +1 сар гэж ӨӨРСДӨӨ тооцвол Stripe-ийн бодит мөчлөгөөс
       (сунгалтын огноо, trial, proration) чимээгүй зөрнө. Stripe-аас уншина. */
    const renewsAt = await this.periodEnd(subscriptionId);
    const plan = this.config.get<string>('STRIPE_PLAN_NAME') || DEFAULT_PLAN;
    const since = await this.subSince(userId, new Date());

    /* Idempotency: `Payment.providerRef` дээр DB түвшний @@unique байгаа тул
       ижил invoice хоёр дахь удаа ирвэл P2002-оор унана. Webhook-ийг Stripe
       ДАХИН ИЛГЭЭДЭГ (timeout, 5xx) тул энэ нь ердийн зүйл — алдаа биш. */
    try {
      await this.prisma.$transaction([
        this.prisma.payment.create({
          data: {
            userId,
            amount: formatAmount(invoice.amount_paid, invoice.currency),
            amountMinor: invoice.amount_paid ?? 0,
            currency: invoice.currency.toUpperCase(),
            method: PROVIDER,
            providerRef: invoice.id,
            plan,
            status: 'SUCCESS',
          },
        }),
        this.prisma.subscription.upsert({
          where: { userId },
          create: { userId, provider: PROVIDER, providerRef: subscriptionId, plan, status: 'ACTIVE', renewsAt },
          update: { provider: PROVIDER, providerRef: subscriptionId, plan, status: 'ACTIVE', renewsAt },
        }),
        this.prisma.user.update({
          where: { id: userId },
          /* `subSince` нь ЭХЭЛСЭН огноо — сунгалт бүрд дахин бичвэл "хэдэн сар
             хэрэглэгч байсан" гэдэг мэдээлэл алдагдана. Тиймээс зөвхөн анх удаа. */
          data: { subActive: true, subPlan: plan, subRenews: renewsAt, subSince: since },
        }),
      ]);
      this.logger.log(`PRO идэвхжлээ/сунгагдлаа — user=${userId}, invoice=${invoice.id}`);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
        this.logger.warn(`Давхардсан invoice webhook (${invoice.id}) — алгаслаа`);
        return;
      }
      throw err;
    }
  }

  /** Анхны захиалгын огноог ХАДГАЛНА — байхгүй бол одоогийн мөчийг бичнэ. */
  private async subSince(userId: string, now: Date): Promise<Date> {
    const user = await this.prisma.user.findUnique({ where: { id: userId }, select: { subSince: true } });
    return user?.subSince ?? now;
  }

  private async recordFailure(invoice: Stripe.Invoice) {
    const userId = await this.resolveUserId(invoice.customer, invoice.metadata);
    if (!userId) return;

    /* ⚠️ Амжилтгүй төлбөр дээр PRO эрхийг ШУУД унтраахгүй. Stripe нь хэдэн
       өдрийн турш дахин оролддог (Smart Retries) бөгөөд ихэнх нь эцэстээ
       амжилттай болдог. Эрх нь `customer.subscription.deleted` ирэхэд л унтарна
       — эс бөгөөс картын түр саатлаас болж хэрэглэгч эрхээ алдана. */
    try {
      await this.prisma.payment.create({
        data: {
          userId,
          amount: formatAmount(invoice.amount_due, invoice.currency),
          /* Амжилтгүй төлбөр — орлогод ОРОХГҮЙ (`adminList` нь SUCCESS-ийг л
             нэмдэг) ч дүнг хадгалах нь оношилгоонд хэрэгтэй. */
          amountMinor: invoice.amount_due ?? 0,
          currency: invoice.currency.toUpperCase(),
          method: PROVIDER,
          providerRef: invoice.id,
          plan: this.config.get<string>('STRIPE_PLAN_NAME') || DEFAULT_PLAN,
          status: 'FAILED',
        },
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') return;
      throw err;
    }
    this.logger.warn(`Төлбөр амжилтгүй — user=${userId}, invoice=${invoice.id} (эрх хэвээр, Stripe дахин оролдоно)`);
  }

  private async deactivate(subscription: Stripe.Subscription) {
    const userId = await this.resolveUserId(subscription.customer, subscription.metadata);
    if (!userId) return;

    await this.prisma.$transaction([
      this.prisma.user.update({ where: { id: userId }, data: { subActive: false } }),
      this.prisma.subscription.updateMany({ where: { userId }, data: { status: 'CANCELED' } }),
    ]);
    this.logger.log(`Захиалга дуусгавар болов — user=${userId}, sub=${subscription.id}`);
  }

  /* --- 3. Цуцлалт ---------------------------------------------------------- */

  /** Аппаас цуцлахад Stripe дээрх захиалгыг ч зогсооно.
   *
   *  ⚠️ Үүнгүй бол хэрэглэгч апп дээр "цуцаллаа" гэж харах ч Stripe нь САР БҮР
   *  мөнгө авсаар байна — энэ бол хамгийн ноцтой төрлийн алдаа.
   *
   *  `cancel_at_period_end: true` — төлсөн саруудаа эцэс хүртэл ашиглана
   *  (шууд таслах нь төлчихсөн мөнгийг нь хураах явдал болно). Эрх нь
   *  `customer.subscription.deleted` webhook ирэхэд унтарна.
   *
   *  @returns Stripe дээр бодитоор цуцлагдсан эсэх. */
  async cancelAtStripe(userId: string): Promise<boolean> {
    const sub = await this.prisma.subscription.findUnique({ where: { userId } });
    if (sub?.provider !== PROVIDER || !sub.providerRef) return false;
    if (!this.stripe.configured) return false;

    try {
      await this.stripe.stripe.subscriptions.update(sub.providerRef, { cancel_at_period_end: true });
      this.logger.log(`Stripe захиалга мөчлөгийн эцэст цуцлагдахаар тэмдэглэгдэв — user=${userId}`);
      return true;
    } catch (err) {
      /* Stripe дээр аль хэдийн байхгүй бол (гараар устгасан) энэ нь алдаа биш —
         DB талын цуцлалт үргэлжлэх ёстой. */
      this.logger.warn(`Stripe цуцлалт бүтсэнгүй (user=${userId}): ${err instanceof Error ? err.message : err}`);
      return false;
    }
  }

  /* --- Туслах ------------------------------------------------------------- */

  /** Webhook-ийн объектоос бидний хэрэглэгчийг олно: эхлээд `stripeCustomerId`,
   *  дараа нь metadata-гийн `userId` (анхны checkout-ийн үеийн нөөц зам). */
  private async resolveUserId(
    customer: string | Stripe.Customer | Stripe.DeletedCustomer | null,
    metadata: Stripe.Metadata | null,
  ): Promise<string | null> {
    const customerId = asId(customer);
    if (customerId) {
      const user = await this.prisma.user.findUnique({ where: { stripeCustomerId: customerId }, select: { id: true } });
      if (user) return user.id;
    }

    const metaUserId = metadata?.userId;
    if (!metaUserId) return null;
    const byMeta = await this.prisma.user.findUnique({ where: { id: metaUserId }, select: { id: true } });
    if (byMeta && customerId) {
      /* Customer-ыг анх энд холбоно — дараагийн webhook-ууд шууд олдоно. */
      await this.prisma.user.update({ where: { id: byMeta.id }, data: { stripeCustomerId: customerId } });
    }
    return byMeta?.id ?? null;
  }

  /** Захиалгын одоогийн мөчлөгийн ТӨГСГӨЛ = дараагийн төлбөрийн огноо. */
  private async periodEnd(subscriptionId: string | null): Promise<Date | null> {
    if (!subscriptionId) return null;
    try {
      const sub = await this.stripe.stripe.subscriptions.retrieve(subscriptionId);
      const end = subscriptionPeriodEnd(sub);
      return end ? new Date(end * 1000) : null;
    } catch (err) {
      this.logger.warn(`Захиалгын мөчлөг уншиж чадсангүй (${subscriptionId}): ${err instanceof Error ? err.message : err}`);
      return null;
    }
  }
}

/* --- Модулийн доторх цэвэр функцууд ---------------------------------------- */

function asId(value: string | { id: string } | null | undefined): string | null {
  if (!value) return null;
  return typeof value === 'string' ? value : value.id;
}

/** Stripe-ийн мөнгөн дүнг харагдах текст болгоно.
 *
 *  ⚠️ Ихэнх валют ХОЁР ОРОНТОЙ (minor unit) — 990000 = 9,900.00. Гэхдээ JPY/KRW
 *  зэрэг zero-decimal валютад 990000 нь 990,000. `Intl` нь валют бүрийн орны
 *  тоог мэддэг тул гараар 100-д хуваахгүй, түүнд даалгана. */
function formatAmount(minorUnits: number | null | undefined, currency: string): string {
  const amount = minorUnits ?? 0;
  try {
    const fmt = new Intl.NumberFormat('mn-MN', { style: 'currency', currency: currency.toUpperCase() });
    const decimals = fmt.resolvedOptions().maximumFractionDigits ?? 2;
    return fmt.format(amount / 10 ** decimals);
  } catch {
    return `${amount} ${currency.toUpperCase()}`;
  }
}

/* Stripe-ийн `Invoice.subscription` ба `Subscription.current_period_end` талбарууд
   API хувилбар хооронд байрлалаа сольсон (сүүлийн хувилбарт мөчлөгийн огноо нь
   `items.data[].current_period_end` рүү нүүсэн). SDK-гийн төрөл нь бидний
   тогтоосон хувилбараас хамаарах тул хоёуланг нь шалгаж, аль байгааг нь авна. */

function invoiceSubscriptionId(invoice: Stripe.Invoice): string | null {
  const raw = invoice as unknown as {
    subscription?: string | { id: string } | null;
    parent?: { subscription_details?: { subscription?: string | { id: string } | null } | null } | null;
  };
  return asId(raw.subscription) ?? asId(raw.parent?.subscription_details?.subscription);
}

function subscriptionPeriodEnd(sub: Stripe.Subscription): number | null {
  const raw = sub as unknown as {
    current_period_end?: number | null;
    items?: { data?: Array<{ current_period_end?: number | null }> };
  };
  if (typeof raw.current_period_end === 'number') return raw.current_period_end;
  const fromItem = raw.items?.data?.[0]?.current_period_end;
  return typeof fromItem === 'number' ? fromItem : null;
}
