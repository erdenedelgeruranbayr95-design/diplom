import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentWebhookDto } from './dto/payment-webhook.dto';
import { PaymentWebhookGuard } from './payment-webhook.guard';
import { Public } from '../common/decorators/public.decorator';

@Controller('payments')
export class PaymentsController {
  constructor(private payments: PaymentsService) {}

  /* QPay/SocialPay-ийн webhook — provider-ийн сервер дуудна, JWT session-гүй тул
     @Public() (глобал JwtAuthGuard-аас чөлөөлнө), оронд нь PaymentWebhookGuard-ийн
     shared-secret header-ээр хамгаална (haptic callback-тэй ижил загвар). */
  @Public()
  @UseGuards(PaymentWebhookGuard)
  @Post('webhook')
  webhook(@Body() dto: PaymentWebhookDto) {
    return this.payments.handleWebhook(dto);
  }
}
