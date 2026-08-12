import { ConflictException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ArtistsService', () => {
  let service: ArtistsService;
  let prisma: {
    artist: { create: jest.Mock; findMany: jest.Mock; findUnique: jest.Mock; update: jest.Mock; delete: jest.Mock };
    song: { findMany: jest.Mock };
  };

  beforeEach(() => {
    prisma = {
      artist: { create: jest.fn(), findMany: jest.fn(), findUnique: jest.fn(), update: jest.fn(), delete: jest.fn() },
      song: { findMany: jest.fn() },
    };
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

  describe('requireApproved — дуу/цомог нэмэх хаалга', () => {
    it('профайлгүй бол 403', async () => {
      prisma.artist.findUnique.mockResolvedValue(null);
      await expect(service.requireApproved('u1')).rejects.toThrow(ForbiddenException);
    });

    it('баталгаажаагүй бол 403', async () => {
      prisma.artist.findUnique.mockResolvedValue({ id: 'a1', approved: false });
      await expect(service.requireApproved('u1')).rejects.toThrow(ForbiddenException);
    });

    it('баталгаажсан бол профайлыг буцаана', async () => {
      const artist = { id: 'a1', approved: true };
      prisma.artist.findUnique.mockResolvedValue(artist);
      await expect(service.requireApproved('u1')).resolves.toBe(artist);
    });
  });

  describe('setApproval', () => {
    it('байхгүй дуучинд 404', async () => {
      prisma.artist.findUnique.mockResolvedValue(null);
      await expect(service.setApproval('ghost', true)).rejects.toThrow(NotFoundException);
      expect(prisma.artist.update).not.toHaveBeenCalled();
    });

    it('батлахад approvedAt тавигдана', async () => {
      prisma.artist.findUnique.mockResolvedValue({ id: 'a1' });
      await service.setApproval('a1', true);
      const [[arg]] = prisma.artist.update.mock.calls;
      expect(arg.data.approved).toBe(true);
      expect(arg.data.approvedAt).toBeInstanceOf(Date);
    });

    it('буцаахад approvedAt цэвэрлэгдэнэ', async () => {
      prisma.artist.findUnique.mockResolvedValue({ id: 'a1' });
      await service.setApproval('a1', false);
      expect(prisma.artist.update).toHaveBeenCalledWith({
        where: { id: 'a1' },
        data: { approved: false, approvedAt: null },
      });
    });
  });

  describe('remove — каталог цэвэрлэх', () => {
    it('байхгүй дуучинд 404', async () => {
      prisma.artist.findUnique.mockResolvedValue(null);
      await expect(service.remove('ghost')).rejects.toThrow(NotFoundException);
    });

    it('ДУУТАЙ дуучныг устгахгүй (дуунууд дуучингүй үлдэх байсан)', async () => {
      prisma.artist.findUnique.mockResolvedValue({ id: 'a1', name: 'Батаа', _count: { songs: 3, albums: 0 } });
      await expect(service.remove('a1')).rejects.toThrow(ConflictException);
      expect(prisma.artist.delete).not.toHaveBeenCalled();
    });

    it('ЦОМОГТОЙ дуучныг ч устгахгүй', async () => {
      prisma.artist.findUnique.mockResolvedValue({ id: 'a1', name: 'Батаа', _count: { songs: 0, albums: 1 } });
      await expect(service.remove('a1')).rejects.toThrow(ConflictException);
    });

    it('хоосон профайлыг устгана', async () => {
      prisma.artist.findUnique.mockResolvedValue({ id: 'a1', name: 'Батаа', _count: { songs: 0, albums: 0 } });
      await expect(service.remove('a1')).resolves.toEqual({ ok: true });
      expect(prisma.artist.delete).toHaveBeenCalledWith({ where: { id: 'a1' } });
    });
  });
});
