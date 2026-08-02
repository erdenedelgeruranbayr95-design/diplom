import { BadRequestException, NotFoundException } from '@nestjs/common';
import { SongLicense } from '@prisma/client';
import { JamendoService } from './jamendo.service';
import { PrismaService } from '../prisma/prisma.service';
import { HapticService } from '../haptic/haptic.service';

describe('JamendoService', () => {
  let service: JamendoService;
  let prisma: { song: { findFirst: jest.Mock; create: jest.Mock } };
  let haptic: { enqueueAnalysis: jest.Mock };
  let fetchMock: jest.Mock;
  const originalClientId = process.env.JAMENDO_CLIENT_ID;

  function jamendoTrack(overrides: Partial<Record<string, unknown>> = {}) {
    return {
      id: 'jam-1',
      name: 'Test Track',
      artist_name: 'Test Artist',
      album_name: 'Album',
      duration: 200,
      audio: 'https://cdn.jamendo.com/track.mp3',
      image: 'https://cdn.jamendo.com/cover.jpg',
      license_ccurl: 'https://creativecommons.org/licenses/by/4.0/',
      releasedate: '2020-05-01',
      ...overrides,
    };
  }

  beforeEach(() => {
    process.env.JAMENDO_CLIENT_ID = 'test-client-id';
    prisma = { song: { findFirst: jest.fn(), create: jest.fn() } };
    haptic = { enqueueAnalysis: jest.fn().mockResolvedValue(undefined) };
    service = new JamendoService(prisma as unknown as PrismaService, haptic as unknown as HapticService);
    fetchMock = jest.fn();
    (global as unknown as { fetch: jest.Mock }).fetch = fetchMock;
  });

  afterAll(() => {
    process.env.JAMENDO_CLIENT_ID = originalClientId;
  });

  describe('search', () => {
    it('throws a clear, actionable error when JAMENDO_CLIENT_ID is not configured', async () => {
      delete process.env.JAMENDO_CLIENT_ID;
      await expect(service.search('piano')).rejects.toThrow(BadRequestException);
    });

    it('throws when Jamendo returns a non-success status (e.g. bad client_id)', async () => {
      fetchMock.mockResolvedValue({
        json: async () => ({ headers: { status: 'failed', code: 5, error_message: 'Invalid Client Id', results_count: 0 }, results: [] }),
      });
      await expect(service.search('piano')).rejects.toThrow(BadRequestException);
    });

    it('maps Jamendo track fields into the internal search-result shape', async () => {
      fetchMock.mockResolvedValue({
        json: async () => ({ headers: { status: 'success', code: 0, results_count: 1 }, results: [jamendoTrack()] }),
      });
      const [result] = await service.search('piano');
      expect(result).toEqual(
        expect.objectContaining({ jamendoId: 'jam-1', title: 'Test Track', artist: 'Test Artist', releaseYear: 2020 }),
      );
    });

    it.each([
      ['https://creativecommons.org/publicdomain/zero/1.0/', SongLicense.CC0],
      ['https://creativecommons.org/licenses/by-sa/4.0/', SongLicense.CC_BY_SA],
      ['https://creativecommons.org/licenses/by-nc/4.0/', SongLicense.CC_BY_NC],
      ['https://creativecommons.org/licenses/by/4.0/', SongLicense.CC_BY],
      ['https://creativecommons.org/licenses/unknown-format/', SongLicense.CC_BY_NC], // safe fallback: most restrictive
    ])('maps license_ccurl %s to %s', async (ccurl, expectedLicense) => {
      fetchMock.mockResolvedValue({
        json: async () => ({
          headers: { status: 'success', code: 0, results_count: 1 },
          results: [jamendoTrack({ license_ccurl: ccurl })],
        }),
      });
      const [result] = await service.search('piano');
      expect(result.license).toBe(expectedLicense);
    });
  });

  describe('importTrack', () => {
    it('returns the existing Song without re-importing when jamendoId was already imported (idempotent)', async () => {
      prisma.song.findFirst.mockResolvedValue({ id: 'existing-song', jamendoId: 'jam-1' });
      const result = await service.importTrack('jam-1', 'uploader-1');
      expect(result).toEqual({ id: 'existing-song', jamendoId: 'jam-1' });
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it('throws NotFoundException when the Jamendo track no longer exists', async () => {
      prisma.song.findFirst.mockResolvedValue(null);
      fetchMock.mockResolvedValue({ json: async () => ({ headers: { status: 'success', code: 0, results_count: 0 }, results: [] }) });
      await expect(service.importTrack('ghost-id', 'uploader-1')).rejects.toThrow(NotFoundException);
    });

    it('creates a published Song and enqueues Haptic Score analysis', async () => {
      prisma.song.findFirst.mockResolvedValue(null);
      fetchMock.mockResolvedValue({
        json: async () => ({ headers: { status: 'success', code: 0, results_count: 1 }, results: [jamendoTrack()] }),
      });
      prisma.song.create.mockResolvedValue({ id: 'new-song' });

      await service.importTrack('jam-1', 'uploader-1');

      expect(prisma.song.create).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ jamendoId: 'jam-1', published: true }) }),
      );
      expect(haptic.enqueueAnalysis).toHaveBeenCalledWith('new-song', 'https://cdn.jamendo.com/track.mp3');
    });
  });
});
