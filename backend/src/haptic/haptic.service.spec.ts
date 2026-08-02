import { NotFoundException } from '@nestjs/common';
import { SongAnalysisStatus } from '@prisma/client';
import { HapticService } from './haptic.service';
import { PrismaService } from '../prisma/prisma.service';
import { HapticQueueService } from './haptic-queue.service';

describe('HapticService', () => {
  let service: HapticService;
  let prisma: { song: { findUnique: jest.Mock; findFirst: jest.Mock; update: jest.Mock } };
  let queue: { enqueue: jest.Mock };
  let fetchMock: jest.Mock;

  const baseSong = { id: 'song-1', fileHash: null };

  beforeEach(() => {
    prisma = { song: { findUnique: jest.fn(), findFirst: jest.fn(), update: jest.fn() } };
    queue = { enqueue: jest.fn() };
    service = new HapticService(prisma as unknown as PrismaService, queue as unknown as HapticQueueService);

    fetchMock = jest.fn();
    (global as unknown as { fetch: jest.Mock }).fetch = fetchMock;
  });

  describe('enqueueAnalysis', () => {
    it('throws NotFoundException for a missing song', async () => {
      prisma.song.findUnique.mockResolvedValue(null);
      await expect(service.enqueueAnalysis('ghost', 'https://cdn/x.mp3')).rejects.toThrow(NotFoundException);
    });

    it('logs and returns silently when the file cannot be fetched (does not throw to the caller)', async () => {
      prisma.song.findUnique.mockResolvedValue(baseSong);
      fetchMock.mockResolvedValue({ ok: false, status: 404 });
      await expect(service.enqueueAnalysis('song-1', 'https://cdn/missing.mp3')).resolves.toBeUndefined();
      expect(queue.enqueue).not.toHaveBeenCalled();
    });

    it('links to an existing READY analysis with the same fileHash instead of re-queueing (idempotent)', async () => {
      prisma.song.findUnique.mockResolvedValue(baseSong);
      fetchMock.mockResolvedValue({ ok: true, arrayBuffer: async () => new ArrayBuffer(8) });
      prisma.song.findFirst.mockResolvedValue({
        id: 'song-existing',
        scoreUrl: '/uploads/scores/existing.json',
        analyzedBpm: 120,
        musicalKey: 'C major',
      });
      prisma.song.update.mockResolvedValue({});

      await service.enqueueAnalysis('song-1', 'https://cdn/dup.mp3');

      expect(queue.enqueue).not.toHaveBeenCalled();
      expect(prisma.song.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ analysisStatus: SongAnalysisStatus.READY, scoreUrl: '/uploads/scores/existing.json' }),
        }),
      );
    });

    it('enqueues a new job and transitions PENDING -> PROCESSING when no duplicate exists', async () => {
      prisma.song.findUnique.mockResolvedValue(baseSong);
      fetchMock.mockResolvedValue({ ok: true, arrayBuffer: async () => new ArrayBuffer(8) });
      prisma.song.findFirst.mockResolvedValue(null);
      prisma.song.update.mockResolvedValue({});
      queue.enqueue.mockResolvedValue('job-1');

      await service.enqueueAnalysis('song-1', 'https://cdn/new.mp3', 'https://cdn/cover.jpg');

      expect(queue.enqueue).toHaveBeenCalledWith(expect.objectContaining({ songId: 'song-1', coverUrl: 'https://cdn/cover.jpg' }));
      expect(prisma.song.update).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ analysisStatus: SongAnalysisStatus.PENDING }) }),
      );
      expect(prisma.song.update).toHaveBeenCalledWith(
        expect.objectContaining({ data: { analysisStatus: SongAnalysisStatus.PROCESSING } }),
      );
    });
  });

  describe('getAnalysisStatus / getScore', () => {
    it('getAnalysisStatus throws NotFoundException for a missing song', async () => {
      prisma.song.findUnique.mockResolvedValue(null);
      await expect(service.getAnalysisStatus('ghost')).rejects.toThrow(NotFoundException);
    });

    it('getScore returns scoreUrl + analysisStatus for an existing song', async () => {
      prisma.song.findUnique.mockResolvedValue({ scoreUrl: '/uploads/scores/x.json', analysisStatus: SongAnalysisStatus.READY });
      await expect(service.getScore('song-1')).resolves.toEqual({
        scoreUrl: '/uploads/scores/x.json',
        analysisStatus: SongAnalysisStatus.READY,
      });
    });
  });

  describe('handleCallback', () => {
    it('throws NotFoundException for a missing song', async () => {
      prisma.song.findUnique.mockResolvedValue(null);
      await expect(service.handleCallback({ songId: 'ghost', status: 'READY' } as never)).rejects.toThrow(NotFoundException);
    });

    it('marks the song FAILED with the error message on a FAILED callback', async () => {
      prisma.song.findUnique.mockResolvedValue(baseSong);
      prisma.song.update.mockResolvedValue({});
      await service.handleCallback({ songId: 'song-1', status: 'FAILED', error: 'ffmpeg crashed' } as never);
      expect(prisma.song.update).toHaveBeenCalledWith(
        expect.objectContaining({ data: { analysisStatus: SongAnalysisStatus.FAILED, analysisError: 'ffmpeg crashed' } }),
      );
    });

    it('derives beatCount from beatTimestamps.length on a READY callback', async () => {
      prisma.song.findUnique.mockResolvedValue(baseSong);
      prisma.song.update.mockResolvedValue({});
      await service.handleCallback({
        songId: 'song-1',
        status: 'READY',
        scoreUrl: '/uploads/scores/song-1.json',
        bpm: 128,
        beatTimestamps: [0.5, 1.0, 1.5],
      } as never);
      expect(prisma.song.update).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ beatCount: 3, analysisStatus: SongAnalysisStatus.READY }) }),
      );
    });
  });
});
