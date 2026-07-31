import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { NotificationsService } from './notifications.service';
import { BroadcastDto } from './dto/broadcast.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { AuthUser } from '../common/decorators/current-user.decorator';

@Controller('notifications')
export class NotificationsController {
  constructor(private notifications: NotificationsService) {}

  @Get()
  list(@CurrentUser() user: AuthUser) {
    return this.notifications.listFor(user.userId);
  }

  @Post('read')
  markRead(@CurrentUser() user: AuthUser) {
    return this.notifications.markRead(user.userId);
  }

  /* Админы зарлал — бүх хэрэглэгчид хүрнэ (`userId = null`). */
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Post('broadcast')
  broadcast(@Body() dto: BroadcastDto) {
    return this.notifications.broadcast(dto.text.trim(), dto.icon);
  }
}
