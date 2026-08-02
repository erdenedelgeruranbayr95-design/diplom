import { AdminService } from './admin.service';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';

describe('AdminService', () => {
  let service: AdminService;
  let prisma: {
    auditLog: { findMany: jest.Mock; count: jest.Mock };
    payment: { findMany: jest.Mock };
    song: { findMany: jest.Mock };
    $queryRaw: jest.Mock;
  };
  let storage: { listAllKeys: jest.Mock; keyFromUrl: jest.Mock; delete: jest.Mock };

  beforeEach(() => {
    prisma = {
      auditLog: { findMany: jest.fn(), count: jest.fn() },
      payment: { findMany: jest.fn() },
      song: { findMany: jest.fn() },
      $queryRaw: jest.fn(),
    };
    storage = { listAllKeys: jest.fn(), keyFromUrl: jest.fn(), delete: jest.fn() };
    service = new AdminService(prisma as unknown as PrismaService, storage as unknown as StorageService);
  });

  describe('listAudit', () => {
    it('applies default pagination (page 1, limit 30) when not specified', async () => {
      prisma.auditLog.findMany.mockResolvedValue([]);
      prisma.auditLog.count.mockResolvedValue(0);
      await service.listAudit({});
      expect(prisma.auditLog.findMany).toHaveBeenCalledWith(expect.objectContaining({ skip: 0, take: 30 }));
    });

    it('filters by actorId and case-insensitive action substring', async () => {
      prisma.auditLog.findMany.mockResolvedValue([]);
      prisma.auditLog.count.mockResolvedValue(0);
      await service.listAudit({ actorId: 'u1', action: 'delete' });
      expect(prisma.auditLog.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: { actorId: 'u1', action: { contains: 'delete', mode: 'insensitive' } } }),
      );
    });
  });

  describe('healthDb', () => {
    it('returns ok:true with a measured latency', async () => {
      prisma.$queryRaw.mockResolvedValue([{ '?column?': 1 }]);
      const result = await service.healthDb();
      expect(result.ok).toBe(true);
      expect(result.latencyMs).toBeGreaterThanOrEqual(0);
    });
  });

  describe('revenue', () => {
    it('sums only SUCCESS payments, parsing "9’900₮"-style amount strings', async () => {
      prisma.payment.findMany.mockResolvedValue([{ amount: '9’900₮' }, { amount: '5,000₮' }]);
      const result = await service.revenue();
      expect(result).toEqual({ total: 14900, count: 2 });
    });

    it('returns zero for no payments', async () => {
      prisma.payment.findMany.mockResolvedValue([]);
      await expect(service.revenue()).resolves.toEqual({ total: 0, count: 0 });
    });
  });

  describe('storageUsage', () => {
    it('groups objects by top-level prefix and computes byte totals', async () => {
      storage.listAllKeys.mockResolvedValue([
        { key: 'songs/a.mp3', size: 100 },
        { key: 'songs/b.mp3', size: 200 },
        { key: 'covers/c.webp', size: 50 },
      ]);
      prisma.song.findMany.mockResolvedValue([]);
      storage.keyFromUrl.mockReturnValue(null);
      const result = await service.storageUsage();
      expect(result.totalObjects).toBe(3);
      expect(result.totalBytes).toBe(350);
      expect(result.byPrefix).toEqual({ songs: { count: 2, bytes: 300 }, covers: { count: 1, bytes: 50 } });
    });

    it('counts objects not referenced by any Song as orphans, excluding scores/', async () => {
      storage.listAllKeys.mockResolvedValue([
        { key: 'songs/referenced.mp3', size: 100 },
        { key: 'songs/orphan.mp3', size: 50 },
        { key: 'scores/x.json', size: 10 },
      ]);
      prisma.song.findMany.mockResolvedValue([{ fileUrl: 'https://cdn/songs/referenced.mp3', coverUrl: null }]);
      storage.keyFromUrl.mockImplementation((url: string) => (url.includes('referenced') ? 'songs/referenced.mp3' : null));
      const result = await service.storageUsage();
      expect(result.orphanCount).toBe(1);
      expect(result.orphanBytes).toBe(50);
    });
  });

  describe('cleanupOrphanFiles', () => {
    it('deletes only unreferenced, non-scores objects and reports bytes freed', async () => {
      storage.listAllKeys.mockResolvedValue([
        { key: 'songs/orphan.mp3', size: 100 },
        { key: 'scores/keep.json', size: 20 },
      ]);
      prisma.song.findMany.mockResolvedValue([]);
      storage.keyFromUrl.mockReturnValue(null);
      storage.delete.mockResolvedValue(undefined);

      const result = await service.cleanupOrphanFiles();
      expect(storage.delete).toHaveBeenCalledTimes(1);
      expect(storage.delete).toHaveBeenCalledWith('songs/orphan.mp3');
      expect(result).toEqual({ deleted: 1, bytesFreed: 100 });
    });

    it('continues past a delete failure and does not count the failed byte size', async () => {
      storage.listAllKeys.mockResolvedValue([
        { key: 'songs/a.mp3', size: 100 },
        { key: 'songs/b.mp3', size: 50 },
      ]);
      prisma.song.findMany.mockResolvedValue([]);
      storage.keyFromUrl.mockReturnValue(null);
      storage.delete.mockRejectedValueOnce(new Error('network error')).mockResolvedValueOnce(undefined);

      const result = await service.cleanupOrphanFiles();
      expect(result).toEqual({ deleted: 2, bytesFreed: 50 });
    });
  });
});
