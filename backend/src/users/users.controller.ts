import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SubscribeDto } from './dto/subscribe.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AdminSubscriptionDto } from './dto/admin-subscription.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { AuthUser } from '../common/decorators/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  list() {
    return this.users.list();
  }

  /* ADMIN THERAPIST/ADMIN эрхтэй account үүсгэнэ — self-service бус. */
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.users.create(dto);
  }

  /* ⚠️ NestJS-ийн route matching дараалал чухал: `me/*` замууд `:id`-тэй dynamic
     route-уудаас ӨМНӨ байрлана, эс бол "me" нь id гэж уншигдана. */

  /* Өөрийн профайл засах — нэр, аватарын өнгө, (сонголтоор) сонсголын байдал. */
  @Patch('me')
  updateProfile(@CurrentUser() user: AuthUser, @Body() dto: UpdateProfileDto) {
    return this.users.updateProfile(user.userId, dto);
  }

  /* Нууц үг солих — одоогийн нууц үгээр баталгаажуулна. */
  @Patch('me/password')
  changePassword(@CurrentUser() user: AuthUser, @Body() dto: ChangePasswordDto) {
    return this.users.changePassword(user.userId, dto);
  }

  /* Self-service PRO захиалга/цуцлалт — өөрийн эрх, ADMIN эрх шаардахгүй. */
  @Patch('me/subscription')
  subscribe(@CurrentUser() user: AuthUser, @Body() dto: SubscribeDto) {
    return this.users.subscribe(user.userId, dto.plan || 'МЭДРЭХ PRO');
  }

  @Delete('me/subscription')
  cancelSubscription(@CurrentUser() user: AuthUser) {
    return this.users.cancelSubscription(user.userId);
  }

  /* Админ өөр хэрэглэгчийн PRO эрхийг олгох/хасах. */
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id/subscription')
  setSubscriptionFor(@Param('id') id: string, @Body() dto: AdminSubscriptionDto) {
    return this.users.setSubscriptionFor(id, dto.active, dto.plan);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.users.remove(id, user.userId);
  }
}
