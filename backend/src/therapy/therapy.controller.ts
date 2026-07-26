import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { TherapyService } from './therapy.service';
import { CreateProgressDto, CreateTherapySessionDto, UpdateTherapySessionDto } from './dto/therapy.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { AuthUser } from '../common/decorators/current-user.decorator';

@Controller('therapy')
export class TherapyController {
  constructor(private therapy: TherapyService) {}

  /* Session үүсгэх/засах — зөвхөн THERAPIST/ADMIN. PARENT/USER эндээс өөрчлөлт хийж чадахгүй. */
  @UseGuards(RolesGuard)
  @Roles(Role.THERAPIST, Role.ADMIN)
  @Post('sessions')
  createSession(@Body() dto: CreateTherapySessionDto, @CurrentUser() user: AuthUser) {
    return this.therapy.createSession(user.userId, user.role, dto);
  }

  /* Уншихыг THERAPIST/USER/PARENT/ADMIN бүгд, эрхийн шалгалт service дотор userId-аар. */
  @Get('sessions')
  listSessions(@Query('userId') userId: string | undefined, @CurrentUser() user: AuthUser) {
    return this.therapy.listSessions({ userId: user.userId, role: user.role }, userId);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.THERAPIST, Role.ADMIN)
  @Patch('sessions/:id')
  updateSession(@Param('id') id: string, @Body() dto: UpdateTherapySessionDto, @CurrentUser() user: AuthUser) {
    return this.therapy.updateSession(id, user.userId, user.role, dto);
  }

  /* Progress бичих — зөвхөн THERAPIST/ADMIN. */
  @UseGuards(RolesGuard)
  @Roles(Role.THERAPIST, Role.ADMIN)
  @Post('progress')
  createProgress(@Body() dto: CreateProgressDto, @CurrentUser() user: AuthUser) {
    return this.therapy.createProgress(user.userId, user.role, dto);
  }

  @Get('progress')
  listProgress(@Query('userId') userId: string | undefined, @CurrentUser() user: AuthUser) {
    return this.therapy.listProgress({ userId: user.userId, role: user.role }, userId);
  }
}
