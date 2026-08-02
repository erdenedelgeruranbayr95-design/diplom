import { NotFoundException } from '@nestjs/common';
import { ReportStatus } from '@prisma/client';
import { ModerationService } from './moderation.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ModerationService', () => {
  let service: ModerationService;
  let prisma: { report: { create: jest.Mock; findMany: jest.Mock; findUnique: jest.Mock; update: jest.Mock } };

  beforeEach(() => {
    prisma = { report: { create: jest.fn(), findMany: jest.fn(), findUnique: jest.fn(), update: jest.fn() } };
    service = new ModerationService(prisma as unknown as PrismaService);
  });

  describe('create', () => {
    it('creates a report tied to the reporter', () => {
      prisma.report.create.mockResolvedValue({ id: 'r1' });
      service.create('user-1', { targetType: 'song', targetId: 's1', reason: 'spam' } as never);
      expect(prisma.report.create).toHaveBeenCalledWith({
        data: { reporterId: 'user-1', targetType: 'song', targetId: 's1', reason: 'spam' },
      });
    });
  });

  describe('listReports', () => {
    it('lists all reports when no status filter is given', async () => {
      prisma.report.findMany.mockResolvedValue([]);
      await service.listReports();
      expect(prisma.report.findMany).toHaveBeenCalledWith(expect.objectContaining({ where: {} }));
    });

    it('filters by status when provided', async () => {
      prisma.report.findMany.mockResolvedValue([]);
      await service.listReports(ReportStatus.OPEN);
      expect(prisma.report.findMany).toHaveBeenCalledWith(expect.objectContaining({ where: { status: ReportStatus.OPEN } }));
    });
  });

  describe('resolve', () => {
    it('404s for a non-existent report', async () => {
      prisma.report.findUnique.mockResolvedValue(null);
      await expect(service.resolve('ghost', 'admin-1', { status: ReportStatus.RESOLVED } as never)).rejects.toThrow(NotFoundException);
    });

    it('records the resolver and resolution timestamp', async () => {
      prisma.report.findUnique.mockResolvedValue({ id: 'r1' });
      prisma.report.update.mockResolvedValue({ id: 'r1', status: ReportStatus.RESOLVED });
      await service.resolve('r1', 'admin-1', { status: ReportStatus.RESOLVED } as never);
      expect(prisma.report.update).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ status: ReportStatus.RESOLVED, resolvedById: 'admin-1', resolvedAt: expect.any(Date) }) }),
      );
    });
  });
});
