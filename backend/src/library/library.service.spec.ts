import { NotFoundException } from '@nestjs/common';
import { LibraryService } from './library.service';
import { PrismaService } from '../prisma/prisma.service';

describe('LibraryService', () => {
  let service: LibraryService;
  let prisma: {
    sensoryProfile: { findUnique: jest.Mock; upsert: jest.Mock };
    userTrackAction: { findMany: jest.Mock; upsert: jest.Mock; delete: jest.Mock };
    song: { findUniqueOrThrow: jest.Mock };
    listenHistory: { count: jest.Mock; findMany: jest.Mock };
    playlist: { findMany: jest.Mock; create: jest.Mock; update: jest.Mock; delete: jest.Mock; findUnique: jest.Mock };
    playlistTrack: { findFirst: jest.Mock; create: jest.Mock; deleteMany: jest.Mock };
    payment: { findMany: jest.Mock };
  };

  beforeEach(() => {
    prisma = {
      sensoryProfile: { findUnique: jest.fn(), upsert: jest.fn() },
      userTrackAction: { findMany: jest.fn(), upsert: jest.fn(), delete: jest.fn() },
      song: { findUniqueOrThrow: jest.fn() },
      listenHistory: { count: jest.fn(), findMany: jest.fn() },
      playlist: { findMany: jest.fn(), create: jest.fn(), update: jest.fn(), delete: jest.fn(), findUnique: jest.fn() },
      playlistTrack: { findFirst: jest.fn(), create: jest.fn(), deleteMany: jest.fn() },
      payment: { findMany: jest.fn() },
    };
    service = new LibraryService(prisma as unknown as PrismaService);
  });

  describe('getSensoryProfile', () => {
    it('returns sane defaults (uncalibrated) when no profile exists yet', async () => {
      prisma.sensoryProfile.findUnique.mockResolvedValue(null);
      const result = await service.getSensoryProfile('u1');
      expect(result).toEqual({ vibLevel: 1, lightLevel: 1, bands: { bass: true, mid: true, high: true }, deviceMap: null, calibrated: false });
    });

    it('returns the stored profile when it exists', async () => {
      const stored = { vibLevel: 2, lightLevel: 0, bands: { bass: true, mid: false, high: true }, calibrated: true };
      prisma.sensoryProfile.findUnique.mockResolvedValue(stored);
      await expect(service.getSensoryProfile('u1')).resolves.toBe(stored);
    });
  });

  describe('getLibrary', () => {
    it('splits actions into likedIds/savedIds by action type', async () => {
      prisma.userTrackAction.findMany.mockResolvedValue([
        { songId: 's1', action: 'LIKE' },
        { songId: 's2', action: 'SAVE' },
        { songId: 's3', action: 'LIKE' },
      ]);
      const result = await service.getLibrary('u1');
      expect(result).toEqual({ likedIds: ['s1', 's3'], savedIds: ['s2'] });
    });
  });

  describe('addAction', () => {
    it('throws NotFoundException when the song does not exist', async () => {
      prisma.song.findUniqueOrThrow.mockRejectedValue(new Error('not found'));
      await expect(service.addAction('u1', { songId: 'ghost', action: 'LIKE' } as never)).rejects.toThrow(NotFoundException);
    });

    it('upserts the action idempotently for an existing song', async () => {
      prisma.song.findUniqueOrThrow.mockResolvedValue({ id: 's1' });
      prisma.userTrackAction.upsert.mockResolvedValue({});
      await expect(service.addAction('u1', { songId: 's1', action: 'LIKE' } as never)).resolves.toEqual({ ok: true });
    });
  });

  describe('removeAction', () => {
    it('does not throw even if the action row does not exist (idempotent removal)', async () => {
      prisma.userTrackAction.delete.mockRejectedValue(new Error('not found'));
      await expect(service.removeAction('u1', 's1', 'LIKE')).resolves.toEqual({ ok: true });
    });
  });

  describe('getStats', () => {
    it('aggregates byGenre/byTrack/days from raw listen-history rows', async () => {
      prisma.listenHistory.count.mockResolvedValueOnce(3).mockResolvedValueOnce(0);
      prisma.listenHistory.findMany.mockResolvedValue([
        { song: { genre: 'Поп' }, songId: 's1', playedAt: new Date('2026-01-01T10:00:00Z'), vibrations: true },
        { song: { genre: 'Поп' }, songId: 's1', playedAt: new Date('2026-01-01T12:00:00Z'), vibrations: false },
        { song: { genre: null }, songId: 's2', playedAt: new Date('2026-01-02T09:00:00Z'), vibrations: true },
      ]);
      const result = await service.getStats('u1');
      expect(result.byGenre).toEqual({ Поп: 2, Бусад: 1 });
      expect(result.byTrack).toEqual({ s1: 2, s2: 1 });
      expect(result.days).toEqual({ '2026-01-01': 2, '2026-01-02': 1 });
    });
  });

  describe('playlist ownership guard', () => {
    it('renamePlaylist rejects when the playlist belongs to a different user', async () => {
      prisma.playlist.findUnique.mockResolvedValue({ id: 'p1', userId: 'other-user' });
      await expect(service.renamePlaylist('u1', 'p1', { name: 'New' } as never)).rejects.toThrow(NotFoundException);
    });

    it('renamePlaylist rejects a non-existent playlist', async () => {
      prisma.playlist.findUnique.mockResolvedValue(null);
      await expect(service.renamePlaylist('u1', 'ghost', { name: 'New' } as never)).rejects.toThrow(NotFoundException);
    });

    it('renamePlaylist succeeds for the owner', async () => {
      prisma.playlist.findUnique.mockResolvedValue({ id: 'p1', userId: 'u1' });
      prisma.playlist.update.mockResolvedValue({ id: 'p1', name: 'New' });
      await expect(service.renamePlaylist('u1', 'p1', { name: 'New' } as never)).resolves.toEqual({ id: 'p1', name: 'New' });
    });
  });

  describe('addTrack', () => {
    it('appends at position (last.position + 1) when tracks already exist', async () => {
      prisma.playlist.findUnique.mockResolvedValue({ id: 'p1', userId: 'u1' });
      prisma.playlistTrack.findFirst.mockResolvedValue({ position: 4 });
      prisma.playlistTrack.create.mockResolvedValue({});
      await service.addTrack('u1', 'p1', { songId: 's1' } as never);
      expect(prisma.playlistTrack.create).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ position: 5 }) }),
      );
    });

    it('starts at position 0 for the first track in an empty playlist', async () => {
      prisma.playlist.findUnique.mockResolvedValue({ id: 'p1', userId: 'u1' });
      prisma.playlistTrack.findFirst.mockResolvedValue(null);
      prisma.playlistTrack.create.mockResolvedValue({});
      await service.addTrack('u1', 'p1', { songId: 's1' } as never);
      expect(prisma.playlistTrack.create).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ position: 0 }) }),
      );
    });

    it('translates a DB constraint failure (duplicate/missing song) into NotFoundException', async () => {
      prisma.playlist.findUnique.mockResolvedValue({ id: 'p1', userId: 'u1' });
      prisma.playlistTrack.findFirst.mockResolvedValue(null);
      prisma.playlistTrack.create.mockRejectedValue(new Error('constraint violation'));
      await expect(service.addTrack('u1', 'p1', { songId: 's1' } as never)).rejects.toThrow(NotFoundException);
    });
  });
});
