import { NotFoundException } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ArtistsService', () => {
  let service: ArtistsService;
  let prisma: { artist: { create: jest.Mock; findMany: jest.Mock; findUnique: jest.Mock }; song: { findMany: jest.Mock } };

  beforeEach(() => {
    prisma = { artist: { create: jest.fn(), findMany: jest.fn(), findUnique: jest.fn() }, song: { findMany: jest.fn() } };
    service = new ArtistsService(prisma as unknown as PrismaService);
  });

  it('create() passes the DTO through to prisma.artist.create', () => {
    prisma.artist.create.mockResolvedValue({ id: 'a1' });
    service.create({ name: 'Батаа' } as never);
    expect(prisma.artist.create).toHaveBeenCalledWith({ data: { name: 'Батаа' } });
  });

  it('list() orders artists alphabetically and includes song counts', () => {
    prisma.artist.findMany.mockResolvedValue([]);
    service.list();
    expect(prisma.artist.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ orderBy: { name: 'asc' }, include: { _count: { select: { songs: true } } } }),
    );
  });

  describe('findOne', () => {
    it('404s for a non-existent artist', async () => {
      prisma.artist.findUnique.mockResolvedValue(null);
      await expect(service.findOne('ghost')).rejects.toThrow(NotFoundException);
    });

    it('returns the artist with their songs included', async () => {
      const artist = { id: 'a1', songs: [] };
      prisma.artist.findUnique.mockResolvedValue(artist);
      await expect(service.findOne('a1')).resolves.toBe(artist);
    });
  });

  describe('songs', () => {
    it('404s when the artist does not exist', async () => {
      prisma.artist.findUnique.mockResolvedValue(null);
      await expect(service.songs('ghost')).rejects.toThrow(NotFoundException);
      expect(prisma.song.findMany).not.toHaveBeenCalled();
    });

    it('returns songs for an existing artist', async () => {
      prisma.artist.findUnique.mockResolvedValue({ id: 'a1' });
      prisma.song.findMany.mockResolvedValue([{ id: 's1' }]);
      await expect(service.songs('a1')).resolves.toEqual([{ id: 's1' }]);
    });
  });
});
