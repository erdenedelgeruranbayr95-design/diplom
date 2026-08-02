import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    const env: Record<string, string> = {
      S3_BUCKET: 'medreh-media',
      S3_PUBLIC_URL: 'http://localhost:9000/medreh-media',
    };
    const config = { get: (key: string) => env[key] } as unknown as import('@nestjs/config').ConfigService;
    service = new StorageService(config);
  });

  describe('buildKey', () => {
    it('prefixes the key and preserves the file extension', () => {
      const key = service.buildKey('songs', 'my-track.mp3');
      expect(key).toMatch(/^songs\/[0-9a-f-]+\.mp3$/);
    });

    it('omits the extension when the original filename has none', () => {
      const key = service.buildKey('covers', 'noextension');
      expect(key).toMatch(/^covers\/[0-9a-f-]+$/);
    });

    it('generates a unique key on every call (no collisions)', () => {
      const a = service.buildKey('songs', 'x.mp3');
      const b = service.buildKey('songs', 'x.mp3');
      expect(a).not.toBe(b);
    });
  });

  describe('publicUrlFor / keyFromUrl (round-trip)', () => {
    it('publicUrlFor prefixes the key with the configured public URL', () => {
      expect(service.publicUrlFor('songs/abc.mp3')).toBe('http://localhost:9000/medreh-media/songs/abc.mp3');
    });

    it('keyFromUrl extracts the key back out of a matching public URL', () => {
      expect(service.keyFromUrl('http://localhost:9000/medreh-media/songs/abc.mp3')).toBe('songs/abc.mp3');
    });

    it('keyFromUrl returns null for a URL that does not match the public base (e.g. external/Jamendo URL)', () => {
      expect(service.keyFromUrl('https://cdn.jamendo.com/track.mp3')).toBeNull();
    });
  });

  describe('listAllKeys', () => {
    it('paginates through ContinuationToken until IsTruncated is false', async () => {
      const send = jest
        .fn()
        .mockResolvedValueOnce({ Contents: [{ Key: 'songs/a.mp3', Size: 10 }], IsTruncated: true, NextContinuationToken: 'page2' })
        .mockResolvedValueOnce({ Contents: [{ Key: 'songs/b.mp3', Size: 20 }], IsTruncated: false });
      (service as unknown as { client: { send: jest.Mock } }).client = { send };

      const result = await service.listAllKeys();
      expect(result).toEqual([
        { key: 'songs/a.mp3', size: 10 },
        { key: 'songs/b.mp3', size: 20 },
      ]);
      expect(send).toHaveBeenCalledTimes(2);
    });

    it('skips objects with no Key and defaults missing Size to 0', async () => {
      const send = jest.fn().mockResolvedValue({ Contents: [{ Key: undefined, Size: 5 }, { Key: 'songs/c.mp3' }], IsTruncated: false });
      (service as unknown as { client: { send: jest.Mock } }).client = { send };

      const result = await service.listAllKeys();
      expect(result).toEqual([{ key: 'songs/c.mp3', size: 0 }]);
    });
  });

  describe('exists', () => {
    it('returns true when the HEAD request succeeds', async () => {
      const send = jest.fn().mockResolvedValue({});
      (service as unknown as { client: { send: jest.Mock } }).client = { send };
      await expect(service.exists('songs/a.mp3')).resolves.toBe(true);
    });

    it('returns false when the HEAD request throws (object not found)', async () => {
      const send = jest.fn().mockRejectedValue(new Error('NotFound'));
      (service as unknown as { client: { send: jest.Mock } }).client = { send };
      await expect(service.exists('songs/ghost.mp3')).resolves.toBe(false);
    });
  });
});
