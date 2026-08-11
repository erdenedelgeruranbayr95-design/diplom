import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  Logger,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  type RawBodyRequest,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { Role } from '@prisma/client';

import { PaymentsService } from './payments.service';
import { StripeService } from './stripe.service';
import { StripeSubscriptionsService } from './stripe-subscriptions.service';
import { PaymentWebhookDto } from './dto/payment-webhook.dto';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { PaymentWebhookGuard } from './payment-webhook.guard';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { AuthUser } from '../common/decorators/current-user.decorator';

@Controller('payments')
export class PaymentsController {
  private readonly logger = new Logger(PaymentsController.name);

  constructor(
    private payments: PaymentsService,
    private stripe: StripeService,
    private subscriptions: StripeSubscriptionsService,
  ) {}

  /* Клиент тал төлбөрийн товчоо харуулах эсэхээ шийдэхэд ашиглана. Түлхүүр
     тохируулаагүй орчинд (ихэнх хөгжүүлэгчийн машин) "төлбөр идэвхгүй" гэж ИЛ
     хэлэх нь, товч дараад ойлгомжгүй алдаа авахаас хамаагүй дээр. */
  @Get('config')
  config() {
    return { provider: 'stripe', enabled: this.stripe.configured };
  }

  /** Админы «💎 PRO» таб — бодит төлбөрийн түүх ба сарын орлого. */
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  adminList() {
    return this.payments.adminList();
  }

  /** Stripe Checkout эхлүүлж, шилжих `url` буцаана. */
  @Post('checkout')
  checkout(@CurrentUser() user: AuthUser, @Body() dto: CreateCheckoutDto, @Req() req: Request) {
    return this.subscriptions.createCheckoutSession(user.userId, dto.returnUrl, publicBaseUrl(req));
  }

  /* Гар утасны буцах хуудас.

     ⚠️ ЯАГААД ЭНЭ ХУУДАС ХЭРЭГТЭЙ ВЭ
     Stripe нь `success_url`-д ЗӨВХӨН http(s) хүлээж авдаг — `medreh://` гэх
     custom scheme-ийг "invalid URL" гэж татгалздаг. Тиймээс Stripe-ыг энэ
     https хуудас руу буцаагаад, эндээс аппын deep link рүү үсэргэнэ.

     @Public() — хэрэглэгч Stripe-ийн хөтчөөс ирж байгаа тул JWT байхгүй.
     Энэ хуудас ямар ч нууц мэдээлэл харуулдаггүй, зөвхөн үсэргэдэг. */
  @Public()
  @Get('return')
  return(@Res() res: Response, @Query('app') app?: string, @Query('status') status?: string) {
    let target: string | null = null;
    try {
      /* ⚠️ Нээлттэй хуудас тул `app`-ыг ЗААВАЛ дахин шалгана — эс бөгөөс энэ нь
         МЭДРЭХ-ийн домэйн дээр сууж буй open redirect болно. */
      if (app) target = this.subscriptions.validateAppLink(app);
    } catch {
      target = null;
    }

    /* ⚠️ Глобал `helmet()`-ийн CSP нь inline <style>/<script>-ыг ХААДАГ тул энэ
       хуудас стильгүй, автомат үсрэлтгүй үлдэнэ. Энэ бол бүрэн статик хуудас
       (хэрэглэгчийн оруулга нь allowlist-ээр шалгагдсан ганц холбоос) тул зөвхөн
       ЭНЭ хариултад CSP-г тайлж, бусад бүх зүйлийг `'none'` дээр барина. */
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; base-uri 'none'; form-action 'none'",
    );
    res.type('html').send(renderReturnPage(target, status === 'cancel'));
  }

  /* Stripe-ийн webhook.

     ⚠️ @Public() — Stripe-ийн сервер дуудна, JWT session БАЙХГҮЙ. Оронд нь
     хамгаалалт нь HMAC гарын үсэг (`stripe-signature` header) бөгөөд түүнийг
     `constructEvent` шалгана. Гарын үсэг таарахгүй бол 400.

     ⚠️ `rawBody` — гарын үсэг нь ТҮҮХИЙ байтууд дээр тооцогддог тул `main.ts`-д
     `rawBody: true` заасан. Parse хийсэн объектоос буцааж үүсгэсэн JSON нь
     таарахгүй. */
  @Public()
  @Post('stripe/webhook')
  async stripeWebhook(@Req() req: RawBodyRequest<Request>, @Headers('stripe-signature') signature?: string) {
    if (!signature) throw new BadRequestException('stripe-signature header алга');
    if (!req.rawBody) throw new BadRequestException('Түүхий body уншигдсангүй');

    let event;
    try {
      event = this.stripe.constructEvent(req.rawBody, signature);
    } catch (err) {
      /* Гарын үсэг таарахгүй = хуурамч эсвэл буруу тохируулсан webhook secret.
         4xx буцаана — Stripe дахин оролдох нь утгагүй. */
      const message = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Stripe webhook гарын үсэг таарсангүй: ${message}`);
      throw new BadRequestException(`Webhook signature шалгалт амжилтгүй: ${message}`);
    }

    /* ⚠️ Дотоод алдааг ЗААВАЛ 5xx болгож дамжуулна — Stripe тэр үед дахин
       илгээдэг. Чимээгүй 200 буцаавал төлсөн хэрэглэгч PRO эрхээ АВАХГҮЙ үлдэнэ
       бөгөөд дахин оролдох боломж ч алга болно. */
    const result = await this.subscriptions.handleEvent(event);
    return { received: true, ...result };
  }

  /* QPay/SocialPay-ийн webhook — provider-ийн сервер дуудна, JWT session-гүй тул
     @Public() (глобал JwtAuthGuard-аас чөлөөлнө), оронд нь PaymentWebhookGuard-ийн
     shared-secret header-ээр хамгаална (haptic callback-тэй ижил загвар).

     Stripe рүү шилжсэн ч энэ endpoint нь ХЭВЭЭР — админ/тестийн гар дуудлагад
     ашиглагдсаар байна (`payments.service.ts` өөрчлөгдөөгүй). */
  @Public()
  @UseGuards(PaymentWebhookGuard)
  @Post('webhook')
  webhook(@Body() dto: PaymentWebhookDto) {
    return this.payments.handleWebhook(dto);
  }
}

/** Энэ backend-ийн ГАДНААС харагдах суурь хаяг.
 *
 *  Гар утас нь LAN хаягаар (`http://192.168.x.x:3000`) хандаж байгаа тул
 *  `localhost` гэж таамаглаж болохгүй — хүсэлт өөрөө хаанаас ирснийг хэлж
 *  байгаа тул түүнийг ашиглана. Reverse proxy-ийн ард `PUBLIC_API_URL`-ээр
 *  дарж бичиж болно (`X-Forwarded-*` тохируулаагүй тохиолдолд). */
function publicBaseUrl(req: Request): string {
  const override = process.env.PUBLIC_API_URL;
  if (override) return override;
  return `${req.protocol}://${req.get('host')}`;
}

/** Аппликейшн руу үсэргэх жижиг HTML хуудас.
 *
 *  Автомат үсрэлт бүтэлгүйтэж болно (хөтөч custom scheme-ийг хааж магадгүй) тул
 *  ГАРААР дарах холбоос ЗААВАЛ байна — эс бөгөөс хэрэглэгч цагаан дэлгэц дээр
 *  гацна. Deep link байхгүй (шалгалт унасан) бол зүгээр л зааварчилгаа харуулна. */
function renderReturnPage(appLink: string | null, canceled: boolean): string {
  const title = canceled ? 'Төлбөр цуцлагдлаа' : 'Төлбөр хүлээн авлаа';
  const note = canceled
    ? 'Мөнгө татагдаагүй. Апп руугаа буцаж, дахин оролдож болно.'
    : 'МЭДРЭХ апп руугаа буцна уу — PRO эрх баталгаажмагц автоматаар нээгдэнэ.';

  /* `appLink` нь allowlist-ээр баталгаажсан (зөвхөн `medreh:`/`exp:`) боловч
     HTML-д шигтгэхийн өмнө escape хийнэ — давхар хамгаалалт. */
  const safe = appLink ? escapeHtml(appLink) : null;

  return `<!doctype html>
<html lang="mn">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title} · МЭДРЭХ</title>
<style>
  :root { color-scheme: dark; }
  body { margin:0; min-height:100vh; display:flex; align-items:center; justify-content:center;
         background:#04100e; color:#f2f5f4; font-family:system-ui,-apple-system,sans-serif; padding:24px; }
  .card { max-width:380px; text-align:center; }
  h1 { font-size:20px; margin:0 0 10px; color:${canceled ? '#d9a54c' : '#38e8ce'}; }
  p { font-size:15px; line-height:1.5; color:#a9b6b4; margin:0 0 22px; }
  a { display:inline-block; background:#38e8ce; color:#04100e; text-decoration:none;
      font-weight:600; padding:13px 26px; border-radius:999px; }
</style>
</head>
<body>
  <div class="card">
    <h1>${title}</h1>
    <p>${note}</p>
    ${safe ? `<a id="back" href="${safe}">МЭДРЭХ апп руу буцах</a>` : ''}
  </div>
  ${safe ? `<script>setTimeout(function(){ location.replace(${JSON.stringify(appLink)}); }, 400);</script>` : ''}
</body>
</html>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
