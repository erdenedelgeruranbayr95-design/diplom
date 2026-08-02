import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Role, ReportStatus } from '@prisma/client';
import { ModerationService } from './moderation.service';
import { CreateReportDto } from './dto/create-report.dto';
import { ResolveReportDto } from './dto/resolve-report.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { AuthUser } from '../common/decorators/current-user.decorator';

@Controller('moderation')
export class ModerationController {
  constructor(private moderation: ModerationService) {}

  /* Ямар ч нэвтэрсэн хэрэглэгч гомдол мэдүүлж болно. */
  @Post('reports')
  create(@Body() dto: CreateReportDto, @CurrentUser() user: AuthUser) {
    return this.moderation.create(user.userId, dto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.MODERATOR, Role.ADMIN)
  @Get('reports')
  list(@Query('status') status?: ReportStatus) {
    return this.moderation.listReports(status);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.MODERATOR, Role.ADMIN)
  @Patch('reports/:id/resolve')
  resolve(@Param('id') id: string, @Body() dto: ResolveReportDto, @CurrentUser() user: AuthUser) {
    return this.moderation.resolve(id, user.userId, dto);
  }
}
