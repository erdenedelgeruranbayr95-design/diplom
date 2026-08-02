import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { PaymentWebhookGuard } from './payment-webhook.guard';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentWebhookGuard],
})
export class PaymentsModule {}
