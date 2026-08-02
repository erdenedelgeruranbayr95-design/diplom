import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/* QPay/SocialPay-ийн webhook endpoint зөвхөн энэ header-тэй хүсэлтийг зөвшөөрнө —
   JWT биш (provider-ийн сервер хэрэглэгчийн session-гүй), тогтмол shared-secret
   хамгаалалт (см. haptic-callback.guard.ts-тэй ижил загвар). Бодит QPay/SocialPay
   мерчант бүртгэлгүй тул энэ секретийг өнөөдрийн байдлаар зөвхөн бидний өөрсдийн
   sandbox/тест дуудлагад ашиглана — жинхэнэ мерчант руу шилжихдээ provider тус
   бүрийн жинхэнэ signature баталгаажуулалтаар СОЛИХ шаардлагатай
   (см. docs/PRODUCTION-DEPLOYMENT-PLAN.md). */
@Injectable()
export class PaymentWebhookGuard implements CanActivate {
  constructor(private config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const secret = this.config.get<string>('PAYMENT_WEBHOOK_SECRET');
    const provided = request.headers['x-payment-webhook-secret'];
    if (!secret || provided !== secret) {
      throw new UnauthorizedException('Invalid payment webhook secret');
    }
    return true;
  }
}
