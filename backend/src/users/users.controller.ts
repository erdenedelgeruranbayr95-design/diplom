import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SubscribeDto } from './dto/subscribe.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AdminSubscriptionDto } from './dto/admin-subscription.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { DeleteAccountDto } from './dto/delete-account.dto';
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

  /* GDPR: өөрийн бүх мэдээллийг JSON болгож татах (см. Нууцлалын бодлого §5). */
  @Get('me/export')
  exportMyData(@CurrentUser() user: AuthUser) {
    return this.users.exportMyData(user.userId);
  }

  /* GDPR: бүртгэлээ бүрэн устгах — нууц үгээр баталгаажина. */
  @Delete('me')
  deleteMyAccount(@CurrentUser() user: AuthUser, @Body() dto: DeleteAccountDto) {
    return this.users.deleteMyAccount(user.userId, dto.password);
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

  /* ---------- ROOT: дүр/төлөв/эрх удирдлага ---------- */

  @UseGuards(RolesGuard)
  @Roles(Role.ROOT)
  @Patch(':id/role')
  updateRole(@Param('id') id: string, @Body() dto: UpdateRoleDto, @CurrentUser() user: AuthUser) {
    return this.users.updateRole(id, user.userId, dto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ROOT)
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusDto, @CurrentUser() user: AuthUser) {
    return this.users.updateStatus(id, user.userId, dto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ROOT)
  @Post(':id/reset-password')
  resetPassword(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.users.resetPassword(id, user.userId);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ROOT)
  @Get(':id/sessions')
  listSessions(@Param('id') id: string) {
    return this.users.listSessions(id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ROOT)
  @Delete(':id/sessions')
  revokeSessions(@Param('id') id: string) {
    return this.users.revokeSessions(id);
  }
}
