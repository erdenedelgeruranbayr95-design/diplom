import { BadRequestException, NotFoundException } from '@nestjs/common';
import { SongLicense } from '@prisma/client';
import { FmaService } from './fma.service';
import { PrismaService } from '../prisma/prisma.service';
import { HapticService } from '../haptic/haptic.service';

describe('FmaService', () => {
  let service: FmaService;
  let prisma: { song: { findFirst: jest.Mock; create: jest.Mock } };
  let haptic: { enqueueAnalysis: jest.Mock };
  let fetchMock: jest.Mock;

  const fmaTrackJson = {
    errors: false,
    dataset: [
      {
        track_id: 'fma-1',
        track_title: 'Test Track',
        artist_name: 'Test Artist',
        album_title: 'Test Album',
        track_duration: '187',
        track_listen_url: 'https://freemusicarchive.org/track/fma-1/download',
        track_image_file: 'https://freemusicarchive.org/img/fma-1.jpg',
        license_url: 'https://creativecommons.org/licenses/by/4.0/',
        track_date_created: '2020-03-15T00:00:00',
      },
    ],
  };

  beforeEach(() => {
    process.env.FMA_API_KEY = 'test-key';
    prisma = { song: { findFirst: jest.fn(), create: jest.fn() } };
    haptic = { enqueueAnalysis: jest.fn().mockResolvedValue(undefined) };
    fetchMock = jest.fn().mockResolvedValue({ json: () => Promise.resolve(fmaTrackJson) });
    (global as unknown as { fetch: jest.Mock }).fetch = fetchMock;

    service = new FmaService(prisma as unknown as PrismaService, haptic as unknown as HapticService);
  });

  afterEach(() => {
    delete process.env.FMA_API_KEY;
    jest.clearAllMocks();
  });

  describe('search', () => {
    it('throws BadRequestException when FMA_API_KEY is not configured', async () => {
      delete process.env.FMA_API_KEY;
      await expect(service.search('test')).rejects.toThrow(BadRequestException);
    });

    it('maps FMA track fields to the internal search-result shape', async () => {
      const results = await service.search('test track');
      expect(results).toEqual([
        {
          fmaId: 'fma-1',
          title: 'Test Track',
          artist: 'Test Artist',
          album: 'Test Album',
          duration: 187,
          coverUrl: 'https://freemusicarchive.org/img/fma-1.jpg',
          audioUrl: 'https://freemusicarchive.org/track/fma-1/download',
          license: SongLicense.CC_BY,
          licenseSrc: 'https://creativecommons.org/licenses/by/4.0/',
          releaseYear: 2020,
        },
      ]);
    });

    it('throws BadRequestException when FMA API returns an error', async () => {
      fetchMock.mockResolvedValue({ json: () => Promise.resolve({ errors: true, message: 'boom' }) });
      await expect(service.search('test')).rejects.toThrow(BadRequestException);
    });
  });

  describe('importTrack', () => {
    it('returns the existing Song without calling FMA again if already imported', async () => {
      const existing = { id: 'song-1', fmaId: 'fma-1' };
      prisma.song.findFirst.mockResolvedValue(existing);

      const result = await service.importTrack('fma-1', 'user-1');

      expect(result).toBe(existing);
      expect(fetchMock).not.toHaveBeenCalled();
      expect(prisma.song.create).not.toHaveBeenCalled();
    });

    it('creates a new Song from FMA search results and enqueues Haptic analysis', async () => {
      prisma.song.findFirst.mockResolvedValue(null);
      const created = { id: 'song-2', fmaId: 'fma-1' };
      prisma.song.create.mockResolvedValue(created);

      const result = await service.importTrack('fma-1', 'user-1');

      expect(result).toBe(created);
      expect(prisma.song.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          title: 'Test Track',
          artist: 'Test Artist',
          fmaId: 'fma-1',
          uploadedBy: 'user-1',
          published: true,
        }),
      });
      expect(haptic.enqueueAnalysis).toHaveBeenCalledWith(
        'song-2',
        'https://freemusicarchive.org/track/fma-1/download',
      );
    });

    it('throws NotFoundException when the FMA track cannot be found', async () => {
      prisma.song.findFirst.mockResolvedValue(null);
      fetchMock.mockResolvedValue({ json: () => Promise.resolve({ errors: false, dataset: [] }) });

      await expect(service.importTrack('missing-id', 'user-1')).rejects.toThrow(NotFoundException);
    });

    it('does not fail the import when Haptic Score enqueue rejects', async () => {
      prisma.song.findFirst.mockResolvedValue(null);
      prisma.song.create.mockResolvedValue({ id: 'song-3', fmaId: 'fma-1' });
      haptic.enqueueAnalysis.mockRejectedValue(new Error('worker down'));

      await expect(service.importTrack('fma-1', 'user-1')).resolves.toEqual({ id: 'song-3', fmaId: 'fma-1' });
    });
  });
});
