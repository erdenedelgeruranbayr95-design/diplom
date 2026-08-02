import { Module } from '@nestjs/common';
import { HapticService } from './haptic.service';
import { HapticQueueService } from './haptic-queue.service';
import { HapticCallbackGuard } from './haptic-callback.guard';

@Module({
  providers: [HapticService, HapticQueueService, HapticCallbackGuard],
  exports: [HapticService],
})
export class HapticModule {}
