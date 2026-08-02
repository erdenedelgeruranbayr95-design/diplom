import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { HistoryService } from './history.service';
import { PrismaService } from '../prisma/prisma.service';

describe('HistoryService', () => {
  let service: HistoryService;
  let prisma: {
    song: { findUnique: jest.Mock };
    listenHistory: { create: jest.Mock; findMany: jest.Mock; count: jest.Mock; findUnique: jest.Mock; delete: jest.Mock };
  };

  beforeEach(() => {
    prisma = {
      song: { findUnique: jest.fn() },
      listenHistory: { create: jest.fn(), findMany: jest.fn(), count: jest.fn(), findUnique: jest.fn(), delete: jest.fn() },
    };
    service = new HistoryService(prisma as unknown as PrismaService);
  });

  describe('log', () => {
    it('404s when the song does not exist', async () => {
      prisma.song.findUnique.mockResolvedValue(null);
      await expect(service.log('u1', { songId: 'ghost' } as never)).rejects.toThrow(NotFoundException);
    });

    it('creates a listen-history row for an existing song', async () => {
      prisma.song.findUnique.mockResolvedValue({ id: 's1' });
      prisma.listenHistory.create.mockResolvedValue({ id: 'h1' });
      await expect(service.log('u1', { songId: 's1', durationMs: 5000 } as never)).resolves.toEqual({ id: 'h1' });
    });
  });

  describe('list', () => {
    it('applies default pagination', async () => {
      prisma.listenHistory.findMany.mockResolvedValue([]);
      prisma.listenHistory.count.mockResolvedValue(0);
      await service.list('u1', {});
      expect(prisma.listenHistory.findMany).toHaveBeenCalledWith(expect.objectContaining({ skip: 0, take: 20 }));
    });

    it('adds a title/artist search filter only when q is provided', async () => {
      prisma.listenHistory.findMany.mockResolvedValue([]);
      prisma.listenHistory.count.mockResolvedValue(0);
      await service.list('u1', { q: 'love' } as never);
      expect(prisma.listenHistory.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            song: { OR: [{ title: { contains: 'love', mode: 'insensitive' } }, { artist: { contains: 'love', mode: 'insensitive' } }] },
          }),
        }),
      );
    });

    it('does not add a song filter when q is empty', async () => {
      prisma.listenHistory.findMany.mockResolvedValue([]);
      prisma.listenHistory.count.mockResolvedValue(0);
      await service.list('u1', {});
      const call = prisma.listenHistory.findMany.mock.calls[0][0];
      expect(call.where).toEqual({ userId: 'u1' });
    });
  });

  describe('remove', () => {
    it('404s for a non-existent row', async () => {
      prisma.listenHistory.findUnique.mockResolvedValue(null);
      await expect(service.remove('ghost', 'u1', Role.USER)).rejects.toThrow(NotFoundException);
    });

    it('rejects removal by a non-owner, non-ADMIN user', async () => {
      prisma.listenHistory.findUnique.mockResolvedValue({ id: 'h1', userId: 'other-user' });
      await expect(service.remove('h1', 'u1', Role.USER)).rejects.toThrow(ForbiddenException);
    });

    it('allows the owner to remove their own record', async () => {
      prisma.listenHistory.findUnique.mockResolvedValue({ id: 'h1', userId: 'u1' });
      prisma.listenHistory.delete.mockResolvedValue({});
      await expect(service.remove('h1', 'u1', Role.USER)).resolves.toEqual({ ok: true });
    });

    it('allows ADMIN to remove any record', async () => {
      prisma.listenHistory.findUnique.mockResolvedValue({ id: 'h1', userId: 'someone-else' });
      prisma.listenHistory.delete.mockResolvedValue({});
      await expect(service.remove('h1', 'admin-1', Role.ADMIN)).resolves.toEqual({ ok: true });
    });
  });
});
