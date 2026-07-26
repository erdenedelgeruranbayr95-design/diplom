import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
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

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.users.remove(id, user.userId);
  }
}
