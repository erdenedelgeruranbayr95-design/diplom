import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { Role, SongLicense } from '@prisma/client';
import { SongsService } from './songs.service';
import { PrismaService } from '../prisma/prisma.service';

describe('SongsService', () => {
  let service: SongsService;
  let prisma: {
    song: { create: jest.Mock; findMany: jest.Mock; findUnique: jest.Mock; update: jest.Mock; delete: jest.Mock };
    listenHistory: { groupBy: jest.Mock };
  };

  const baseSong = {
    id: 'song-1',
    title: 'Test Song',
    artistId: null,
    uploadedBy: 'uploader-1',
    license: null as SongLicense | null,
    uploadConfirmed: true,
    published: false,
    fileUrl: 'https://cdn/x.mp3',
    coverUrl: null,
  };

  beforeEach(() => {
    prisma = {
      song: { create: jest.fn(), findMany: jest.fn(), findUnique: jest.fn(), update: jest.fn(), delete: jest.fn() },
      listenHistory: { groupBy: jest.fn() },
    };
    service = new SongsService(prisma as unknown as PrismaService);
  });

  describe('create', () => {
    it('defaults published to false and publishedAt to null when not specified', () => {
      prisma.song.create.mockResolvedValue({});
      service.create({ title: 'T', fileUrl: 'x', uploadedBy: 'u1', license: SongLicense.ORIGINAL });
      expect(prisma.song.create).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ published: false, publishedAt: null }) }),
      );
    });

    it('sets publishedAt when published=true is explicitly passed (Curator/Admin self-upload)', () => {
      prisma.song.create.mockResolvedValue({});
      service.create({ title: 'T', fileUrl: 'x', uploadedBy: 'u1', license: SongLicense.ORIGINAL, published: true });
      expect(prisma.song.create).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ published: true, publishedAt: expect.any(Date) }) }),
      );
    });
  });

  describe('popular', () => {
    it('falls back to recent() when there is no listen history at all', async () => {
      prisma.listenHistory.groupBy.mockResolvedValue([]);
      prisma.song.findMany.mockResolvedValue([{ id: 's1' }]);
      const result = await service.popular(5);
      expect(result).toEqual([{ id: 's1' }]);
      // recent() queries published+confirmed songs ordered by createdAt, not by songId grouping
      expect(prisma.song.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: { published: true, uploadConfirmed: true } }),
      );
    });

    it('orders songs by play-count rank, not by DB return order', async () => {
      prisma.listenHistory.groupBy.mockResolvedValue([
        { songId: 'popular-song', _count: { songId: 10 } },
        { songId: 'less-popular-song', _count: { songId: 3 } },
      ]);
      // DB returns them in a different (e.g. insertion) order — service must re-sort by rank
      prisma.song.findMany.mockResolvedValue([{ id: 'less-popular-song' }, { id: 'popular-song' }]);
      const result = await service.popular(5);
      expect(result.map((s: { id: string }) => s.id)).toEqual(['popular-song', 'less-popular-song']);
    });
  });

  describe('findOne', () => {
    it('throws NotFoundException for a missing song', async () => {
      prisma.song.findUnique.mockResolvedValue(null);
      await expect(service.findOne('ghost')).rejects.toThrow(NotFoundException);
    });
  });

  describe('moreByArtist', () => {
    it('returns an empty array when the song has no artistId (no legacy free-text matching)', async () => {
      prisma.song.findUnique.mockResolvedValue({ ...baseSong, artistId: null });
      await expect(service.moreByArtist('song-1')).resolves.toEqual([]);
      expect(prisma.song.findMany).not.toHaveBeenCalled();
    });

    it('excludes the song itself and only returns published+confirmed songs by the same artist', async () => {
      prisma.song.findUnique.mockResolvedValue({ ...baseSong, artistId: 'artist-1' });
      prisma.song.findMany.mockResolvedValue([]);
      await service.moreByArtist('song-1');
      expect(prisma.song.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { artistId: 'artist-1', id: { not: 'song-1' }, published: true, uploadConfirmed: true },
        }),
      );
    });
  });

  describe('saveAnalysis', () => {
    it('rejects a non-owner, non-ADMIN requester', async () => {
      prisma.song.findUnique.mockResolvedValue(baseSong);
      await expect(service.saveAnalysis('song-1', {} as never, 'someone-else', Role.USER)).rejects.toThrow(ForbiddenException);
    });

    it('allows the uploader to save their own analysis', async () => {
      prisma.song.findUnique.mockResolvedValue(baseSong);
      prisma.song.update.mockResolvedValue({});
      await expect(service.saveAnalysis('song-1', { bpm: 120 } as never, 'uploader-1', Role.USER)).resolves.toBeDefined();
    });

    it('allows ADMIN to save analysis on any song', async () => {
      prisma.song.findUnique.mockResolvedValue(baseSong);
      prisma.song.update.mockResolvedValue({});
      await expect(service.saveAnalysis('song-1', { bpm: 120 } as never, 'admin-x', Role.ADMIN)).resolves.toBeDefined();
    });
  });

  describe('update (assertCanEdit)', () => {
    it('rejects a stranger (not owner, not catalog staff)', async () => {
      prisma.song.findUnique.mockResolvedValue(baseSong);
      await expect(service.update('song-1', {}, 'stranger', Role.USER)).rejects.toThrow(ForbiddenException);
    });

    it('allows CURATOR to edit a song they did not upload', async () => {
      prisma.song.findUnique.mockResolvedValue(baseSong);
      prisma.song.update.mockResolvedValue({});
      await expect(service.update('song-1', { title: 'New' }, 'curator-1', Role.CURATOR)).resolves.toBeDefined();
    });
  });

  describe('publish', () => {
    it('rejects publishing a song with no license (core DoD: "лицензгүй дуу нийтлэгдэхгүй")', async () => {
      prisma.song.findUnique.mockResolvedValue({ ...baseSong, license: null });
      await expect(service.publish('song-1', 'uploader-1', Role.USER)).rejects.toThrow(BadRequestException);
      expect(prisma.song.update).not.toHaveBeenCalled();
    });

    it('rejects publishing when uploadConfirmed is false', async () => {
      prisma.song.findUnique.mockResolvedValue({ ...baseSong, license: SongLicense.ORIGINAL, uploadConfirmed: false });
      await expect(service.publish('song-1', 'uploader-1', Role.USER)).rejects.toThrow(BadRequestException);
    });

    it('publishes a song with a license and confirmed upload', async () => {
      prisma.song.findUnique.mockResolvedValue({ ...baseSong, license: SongLicense.ORIGINAL, uploadConfirmed: true });
      prisma.song.update.mockResolvedValue({});
      await service.publish('song-1', 'uploader-1', Role.USER);
      expect(prisma.song.update).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ published: true, publishedAt: expect.any(Date) }) }),
      );
    });
  });

  describe('remove', () => {
    it('rejects a non-owner, non-ADMIN requester', async () => {
      prisma.song.findUnique.mockResolvedValue(baseSong);
      await expect(service.remove('song-1', 'stranger', Role.USER)).rejects.toThrow(ForbiddenException);
    });

    it('returns fileUrl/coverUrl so the caller can clean up storage', async () => {
      prisma.song.findUnique.mockResolvedValue({ ...baseSong, coverUrl: 'https://cdn/cover.jpg' });
      prisma.song.delete.mockResolvedValue({});
      await expect(service.remove('song-1', 'uploader-1', Role.USER)).resolves.toEqual({
        ok: true,
        fileUrl: baseSong.fileUrl,
        coverUrl: 'https://cdn/cover.jpg',
      });
    });
  });
});
