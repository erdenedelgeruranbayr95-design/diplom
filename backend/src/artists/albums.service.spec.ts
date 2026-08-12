import { ConflictException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { ArtistsService } from './artists.service';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';

/* Цомгийн үйлчилгээний гол эрсдэл нь ЭЗЭМШИЛ: клиент `artistId` илгээдэггүй,
   бүгд session-ээс гардаг. Тиймээс тестүүд ихэвчлэн «бусдынхыг хөндөж болохгүй»
   гэдгийг барьж байна. */
describe('AlbumsService', () => {
  const APPROVED = { id: 'art-1', name: 'Батаа', approved: true };

  let prisma: {
    artist: { findUnique: jest.Mock };
    album: { findUnique: jest.Mock; findFirst: jest.Mock; findMany: jest.Mock; create: jest.Mock; update: jest.Mock; delete: jest.Mock };
    song: { findMany: jest.Mock; update: jest.Mock; updateMany: jest.Mock };
    $transaction: jest.Mock;
  };
  let artists: { requireApproved: jest.Mock };
  let storage: { publicUrlFor: jest.Mock };
  let service: AlbumsService;

  beforeEach(() => {
    prisma = {
      artist: { findUnique: jest.fn() },
      album: {
        findUnique: jest.fn(),
        findFirst: jest.fn().mockResolvedValue(null),
        findMany: jest.fn().mockResolvedValue([]),
        create: jest.fn().mockImplementation(({ data }) => Promise.resolve({ id: 'alb-1', ...data })),
        update: jest.fn().mockImplementation(({ data }) => Promise.resolve({ id: 'alb-1', ...data })),
        delete: jest.fn().mockResolvedValue({}),
      },
      song: { findMany: jest.fn(), update: jest.fn(), updateMany: jest.fn() },
      $transaction: jest.fn().mockResolvedValue([]),
    };
    artists = { requireApproved: jest.fn().mockResolvedValue(APPROVED) };
    storage = { publicUrlFor: jest.fn((key: string) => `https://cdn.test/${key}`) };

    service = new AlbumsService(
      prisma as unknown as PrismaService,
      artists as unknown as ArtistsService,
      storage as unknown as StorageService,
    );
  });

  describe('create', () => {
    it('баталгаажаагүй уран бүтээлчийг оруулахгүй', async () => {
      artists.requireApproved.mockRejectedValue(new ForbiddenException());
      await expect(service.create('u1', { title: 'Цомог' } as never)).rejects.toThrow(ForbiddenException);
      expect(prisma.album.create).not.toHaveBeenCalled();
    });

    it('artistId-г КЛИЕНТЭЭС биш session-ээс авна', async () => {
      /* Хэрэглэгч `artistId` хуурамчаар илгээвэл ч үл тоомсорлоно. */
      await service.create('u1', { title: 'Цомог', artistId: 'бусдын-id' } as never);
      expect(prisma.album.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ artistId: 'art-1' }),
      });
    });

    it('нэрний урд/хойд зайг хасна', async () => {
      await service.create('u1', { title: '  Анхны алхам  ' } as never);
      expect(prisma.album.create).toHaveBeenCalledWith({ data: expect.objectContaining({ title: 'Анхны алхам' }) });
    });

    it('ижил нэртэй цомог давхардвал 409', async () => {
      prisma.album.findFirst.mockResolvedValue({ id: 'alb-0' });
      await expect(service.create('u1', { title: 'Цомог' } as never)).rejects.toThrow(ConflictException);
    });

    it('coverKey-г нийтийн URL болгоно', async () => {
      await service.create('u1', { title: 'Ц', coverKey: 'covers/x.jpg' } as never);
      expect(prisma.album.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ coverUrl: 'https://cdn.test/covers/x.jpg' }),
      });
    });

    it('coverKey өгөөгүй бол бичсэн coverUrl хэвээр', async () => {
      await service.create('u1', { title: 'Ц', coverUrl: 'https://жишээ.mn/a.jpg' } as never);
      expect(prisma.album.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ coverUrl: 'https://жишээ.mn/a.jpg' }),
      });
    });
  });

  describe('requireOwned (update/remove/setSongs дундаа)', () => {
    it('байхгүй цомог → 404', async () => {
      prisma.album.findUnique.mockResolvedValue(null);
      await expect(service.remove('u1', 'ghost')).rejects.toThrow(NotFoundException);
    });

    it('БУСДЫН цомгийг устгах → 403', async () => {
      prisma.album.findUnique.mockResolvedValue({ id: 'alb-9', artistId: 'өөр-artist' });
      await expect(service.remove('u1', 'alb-9')).rejects.toThrow(ForbiddenException);
      expect(prisma.album.delete).not.toHaveBeenCalled();
    });

    it('БУСДЫН цомгийг засах → 403', async () => {
      prisma.album.findUnique.mockResolvedValue({ id: 'alb-9', artistId: 'өөр-artist' });
      await expect(service.update('u1', 'alb-9', { title: 'Шинэ' } as never)).rejects.toThrow(ForbiddenException);
      expect(prisma.album.update).not.toHaveBeenCalled();
    });
  });

  describe('setSongs', () => {
    beforeEach(() => {
      prisma.album.findUnique.mockResolvedValue({ id: 'alb-1', artistId: 'art-1' });
      /* `findOne`-ийн эцсийн уншилт — эхний дуудлагаас ялгаатай утга буцаана. */
      prisma.album.findUnique
        .mockResolvedValueOnce({ id: 'alb-1', artistId: 'art-1' })
        .mockResolvedValue({ id: 'alb-1', songs: [] });
    });

    it('БУСДЫН дууг цомогт оруулахыг зөвшөөрөхгүй', async () => {
      /* Хоёр id илгээсэн ч зөвхөн нэг нь тухайн уран бүтээлчийнх. */
      prisma.song.findMany.mockResolvedValue([{ id: 's1' }]);
      await expect(service.setSongs('u1', 'alb-1', ['s1', 'бусдын-дуу'])).rejects.toThrow(ForbiddenException);
      expect(prisma.$transaction).not.toHaveBeenCalled();
    });

    it('дууг зөвхөн эзэмшигчийн artistId-гаар шүүнэ', async () => {
      prisma.song.findMany.mockResolvedValue([{ id: 's1' }]);
      await service.setSongs('u1', 'alb-1', ['s1']);
      expect(prisma.song.findMany).toHaveBeenCalledWith({
        where: { id: { in: ['s1'] }, artistId: 'art-1' },
        select: { id: true },
      });
    });

    it('trackNumber-ийг МАССИВЫН дарааллаар 1-ээс ононо', async () => {
      prisma.song.findMany.mockResolvedValue([{ id: 'a' }, { id: 'b' }, { id: 'c' }]);
      await service.setSongs('u1', 'alb-1', ['c', 'a', 'b']);

      const numbers = prisma.song.update.mock.calls.map(([arg]) => [arg.where.id, arg.data.trackNumber]);
      expect(numbers).toEqual([
        ['c', 1],
        ['a', 2],
        ['b', 3],
      ]);
    });

    it('жагсаалтад ороогүй дууг цомгоос салгана', async () => {
      prisma.song.findMany.mockResolvedValue([{ id: 'a' }]);
      await service.setSongs('u1', 'alb-1', ['a']);
      expect(prisma.song.updateMany).toHaveBeenCalledWith({
        where: { albumId: 'alb-1', id: { notIn: ['a'] } },
        data: { albumId: null, trackNumber: null },
      });
    });

    it('бүх бичилт НЭГ transaction-д явна (хагас шинэчлэлт үүсэхгүй)', async () => {
      prisma.song.findMany.mockResolvedValue([{ id: 'a' }, { id: 'b' }]);
      await service.setSongs('u1', 'alb-1', ['a', 'b']);
      expect(prisma.$transaction).toHaveBeenCalledTimes(1);
      // 1 updateMany (салгах) + 2 update (дугаарлах)
      expect(prisma.$transaction.mock.calls[0][0]).toHaveLength(3);
    });

    it('хоосон жагсаалт нь БҮХ дууг салгана', async () => {
      prisma.song.findMany.mockResolvedValue([]);
      await service.setSongs('u1', 'alb-1', []);
      /* `notIn: []` нь Prisma-д «юуг ч хасахгүй» болж, УРВУУГААР бүх мөрийг
         таарууллаа гэж үзэх эрсдэлтэй тул онцгой тэмдэг ашигладаг. */
      expect(prisma.song.updateMany).toHaveBeenCalledWith({
        where: { albumId: 'alb-1', id: { notIn: ['__none__'] } },
        data: { albumId: null, trackNumber: null },
      });
    });
  });

  describe('listMine', () => {
    it('профайлгүй хэрэглэгчид хоосон массив (алдаа биш)', async () => {
      prisma.artist.findUnique.mockResolvedValue(null);
      await expect(service.listMine('u1')).resolves.toEqual([]);
      expect(prisma.album.findMany).not.toHaveBeenCalled();
    });

    it('дуунуудыг trackNumber-ээр эрэмбэлж буцаана', async () => {
      prisma.artist.findUnique.mockResolvedValue(APPROVED);
      await service.listMine('u1');
      expect(prisma.album.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { artistId: 'art-1' },
          include: expect.objectContaining({
            songs: expect.objectContaining({ orderBy: [{ trackNumber: 'asc' }, { createdAt: 'asc' }] }),
          }),
        }),
      );
    });
  });
});
