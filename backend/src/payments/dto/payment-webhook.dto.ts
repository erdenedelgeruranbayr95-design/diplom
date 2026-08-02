import { IsIn, IsNumberString, IsOptional, IsString, MinLength } from 'class-validator';

/* QPay/SocialPay-ийн (эсвэл тэдгээрийн sandbox орчны) төлбөрийн үр дүн мэдэгдэх
   webhook payload. Провайдер тус бүрийн бодит талбарын нэр өөр байх магадлалтай тул
   энэ бол манай backend-ийн НОРМАЛИЗЧЛАГДСАН дотоод схем — жинхэнэ QPay/SocialPay
   мерчант рүү холбогдоход provider-ийн raw callback-ийг эндэхийн хэлбэрт хөрвүүлэх
   тусгай mapper бичих шаардлагатай (см. docs/PRODUCTION-DEPLOYMENT-PLAN.md). */
export class PaymentWebhookDto {
  @IsString()
  @MinLength(1)
  userId: string;

  @IsIn(['qpay', 'socialpay'])
  provider: 'qpay' | 'socialpay';

  @IsString()
  @MinLength(1)
  providerRef: string;

  @IsIn(['SUCCESS', 'FAILED'])
  status: 'SUCCESS' | 'FAILED';

  @IsOptional()
  @IsString()
  plan?: string;

  @IsOptional()
  @IsNumberString()
  amount?: string;
}
