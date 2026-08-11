import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { StripeService } from './stripe.service';
import { StripeSubscriptionsService } from './stripe-subscriptions.service';
import { PaymentWebhookGuard } from './payment-webhook.guard';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, StripeService, StripeSubscriptionsService, PaymentWebhookGuard],
  /* `UsersModule` нь цуцлах үед Stripe дээрх захиалгыг ч зогсоохын тулд
     ашиглана — эс бөгөөс апп дээр "цуцаллаа" гэж харагдах ч Stripe сар бүр
     мөнгө авсаар байх болно. */
  exports: [StripeSubscriptionsService],
})
export class PaymentsModule {}
