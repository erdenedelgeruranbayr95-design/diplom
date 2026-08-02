import { NotificationsService } from './notifications.service';
import { PrismaService } from '../prisma/prisma.service';

describe('NotificationsService', () => {
  let service: NotificationsService;
  let prisma: {
    notification: { findMany: jest.Mock; create: jest.Mock };
    notificationRead: { findUnique: jest.Mock; upsert: jest.Mock };
  };

  beforeEach(() => {
    prisma = {
      notification: { findMany: jest.fn(), create: jest.fn() },
      notificationRead: { findUnique: jest.fn(), upsert: jest.fn() },
    };
    service = new NotificationsService(prisma as unknown as PrismaService);
  });

  describe('listFor', () => {
    it('queries both personal (userId) and broadcast (userId=null) notifications', async () => {
      prisma.notification.findMany.mockResolvedValue([]);
      prisma.notificationRead.findUnique.mockResolvedValue(null);
      await service.listFor('u1');
      expect(prisma.notification.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: { OR: [{ userId: 'u1' }, { userId: null }] } }),
      );
    });

    it('returns readAt=null when the user has never marked the feed read', async () => {
      prisma.notification.findMany.mockResolvedValue([]);
      prisma.notificationRead.findUnique.mockResolvedValue(null);
      const result = await service.listFor('u1');
      expect(result.readAt).toBeNull();
    });

    it('returns the stored readAt when present', async () => {
      const readAt = new Date('2026-01-01T00:00:00Z');
      prisma.notification.findMany.mockResolvedValue([]);
      prisma.notificationRead.findUnique.mockResolvedValue({ userId: 'u1', readAt });
      const result = await service.listFor('u1');
      expect(result.readAt).toBe(readAt);
    });
  });

  describe('markRead', () => {
    it('upserts the read timestamp for the user', async () => {
      prisma.notificationRead.upsert.mockResolvedValue({});
      const result = await service.markRead('u1');
      expect(result.readAt).toEqual(expect.any(Date));
      expect(prisma.notificationRead.upsert).toHaveBeenCalledWith(
        expect.objectContaining({ where: { userId: 'u1' } }),
      );
    });
  });

  describe('broadcast', () => {
    it('creates a notification with userId=null so it reaches every user', () => {
      prisma.notification.create.mockResolvedValue({});
      service.broadcast('Шинэ дуу нэмэгдлээ');
      expect(prisma.notification.create).toHaveBeenCalledWith({
        data: { userId: null, text: 'Шинэ дуу нэмэгдлээ', icon: '📢' },
      });
    });

    it('accepts a custom icon override', () => {
      prisma.notification.create.mockResolvedValue({});
      service.broadcast('Text', '🚀');
      expect(prisma.notification.create).toHaveBeenCalledWith({ data: { userId: null, text: 'Text', icon: '🚀' } });
    });
  });

  describe('notify', () => {
    it('creates a notification scoped to a single user', () => {
      prisma.notification.create.mockResolvedValue({});
      service.notify('u1', 'Анализ дууслаа');
      expect(prisma.notification.create).toHaveBeenCalledWith({
        data: { userId: 'u1', text: 'Анализ дууслаа', icon: '🎵' },
      });
    });
  });
});
