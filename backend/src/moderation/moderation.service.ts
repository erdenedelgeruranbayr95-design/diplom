import { Injectable, NotFoundException } from '@nestjs/common';
import { ReportStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReportDto } from './dto/create-report.dto';
import { ResolveReportDto } from './dto/resolve-report.dto';

@Injectable()
export class ModerationService {
  constructor(private prisma: PrismaService) {}

  create(reporterId: string, dto: CreateReportDto) {
    return this.prisma.report.create({
      data: { reporterId, targetType: dto.targetType, targetId: dto.targetId, reason: dto.reason },
    });
  }

  async listReports(status?: ReportStatus) {
    return this.prisma.report.findMany({
      where: status ? { status } : {},
      orderBy: { createdAt: 'desc' },
      include: {
        reporter: { select: { id: true, name: true, email: true } },
        resolvedBy: { select: { id: true, name: true, email: true } },
      },
    });
  }

  async resolve(id: string, resolverId: string, dto: ResolveReportDto) {
    const report = await this.prisma.report.findUnique({ where: { id } });
    if (!report) throw new NotFoundException('Гомдол олдсонгүй');
    return this.prisma.report.update({
      where: { id },
      data: { status: dto.status, resolvedById: resolverId, resolvedAt: new Date() },
    });
  }
}
