import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { QrService } from './qr.service';
import { Public } from '../common/decorators/public.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { AuthUser } from '../common/decorators/current-user.decorator';

@Controller('qr')
export class QrController {
  constructor(private qr: QrService) {}

  @Post('sessions')
  create(@CurrentUser() user: AuthUser) {
    return this.qr.create(user.userId);
  }

  /* Гар утас QR уншиж дараа нь энэ token-оор poll/connect хийнэ — нэвтрэлт шаардахгүй (гар утсанд session алга). */
  @Public()
  @Get('sessions/:token')
  get(@Param('token') token: string) {
    return this.qr.get(token);
  }

  @Public()
  @Patch('sessions/:token/connect')
  connect(@Param('token') token: string) {
    return this.qr.connect(token);
  }
}
