import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PaymentsModule } from '../payments/payments.module';

@Module({
  /* Захиалга цуцлахад Stripe дээрх recurring subscription-ыг ч зогсоох
     шаардлагатай (см. users.service.ts `cancelSubscription`). */
  imports: [PaymentsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
