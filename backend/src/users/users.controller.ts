import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SubscribeDto } from './dto/subscribe.dto';
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

  /* Self-service PRO захиалга/цуцлалт — өөрийн эрх, JwtAuthGuard (app-level default)
     л шаардлагатай, ADMIN эрх шаардахгүй. SubscribeModal.tsx-ийн демо SocialPay
     урсгал амжилттай болсны дараа дуудна — DB-д бодитоор бичигдэх тул refresh/
     дахин нэвтрэх/өөр tab дээр ч PRO эрх хадгалагдана. NestJS-ийн route matching
     дараалал чухал тул :id-тэй dynamic route-уудаас ӨМНӨ байрлуулав. */
  @Patch('me/subscription')
  subscribe(@CurrentUser() user: AuthUser, @Body() dto: SubscribeDto) {
    return this.users.subscribe(user.userId, dto.plan || 'МЭДРЭХ PRO');
  }

  @Delete('me/subscription')
  cancelSubscription(@CurrentUser() user: AuthUser) {
    return this.users.cancelSubscription(user.userId);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.users.remove(id, user.userId);
  }
}
