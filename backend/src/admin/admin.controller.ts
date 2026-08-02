import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { AdminService } from './admin.service';
import { ListAuditDto } from './dto/list-audit.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { Public } from '../common/decorators/public.decorator';

@Controller()
export class AdminController {
  constructor(private admin: AdminService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.ROOT)
  @Get('audit')
  listAudit(@Query() q: ListAuditDto) {
    return this.admin.listAudit(q);
  }

  /* Load balancer/uptime monitor-той зориулсан, нэвтрэлт шаардахгүй энгийн шалгуур. */
  @Public()
  @Get('health')
  health() {
    return { ok: true };
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ROOT)
  @Get('health/db')
  healthDb() {
    return this.admin.healthDb();
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ROOT, Role.ADMIN)
  @Get('revenue')
  revenue() {
    return this.admin.revenue();
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ROOT, Role.ADMIN)
  @Get('payments')
  listAllPayments() {
    return this.admin.listAllPayments();
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ROOT, Role.ADMIN)
  @Get('storage/usage')
  storageUsage() {
    return this.admin.storageUsage();
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ROOT, Role.ADMIN)
  @Post('storage/cleanup-orphans')
  cleanupOrphanFiles() {
    return this.admin.cleanupOrphanFiles();
  }
}
