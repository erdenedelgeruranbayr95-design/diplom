import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpsertMyArtistDto } from './dto/upsert-my-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(private prisma: PrismaService) {}

  /* ---- Хэрэглэгчийн ӨӨРИЙН уран бүтээлчийн профайл ---- */

  /** Дуудагчийн профайл. Байхгүй бол `null` — «уран бүтээлч биш» гэсэн үг. */
  findMine(userId: string) {
    return this.prisma.artist.findUnique({
      where: { ownerId: userId },
      include: { _count: { select: { songs: true } } },
    });
  }

  /** Профайл үүсгэх, эсвэл байгааг нь засах.
   *
   *  ⚠️ `Artist.name` нь UNIQUE. Өөр хүний эзэмшиж буй нэрийг авах гэвэл Prisma
   *  P2002 шиднэ — түүнийг ойлгомжтой мессеж болгож хөрвүүлнэ, эс бөгөөс
   *  хэрэглэгч «Internal server error» харна. */
  async upsertMine(userId: string, dto: UpsertMyArtistDto) {
    const existing = await this.prisma.artist.findUnique({ where: { ownerId: userId } });

    /* Нэр давхцаж байгаа эсэхийг УРЬДЧИЛАН шалгана — P2002-г барих нь ажилладаг
       ч аль талбар давхардсаныг ялгахад найдваргүй. */
    const taken = await this.prisma.artist.findUnique({ where: { name: dto.name } });
    if (taken && taken.id !== existing?.id) {
      throw new ConflictException(`«${dto.name}» нэр аль хэдийн бүртгэгдсэн байна`);
    }

    if (existing) {
      return this.prisma.artist.update({ where: { id: existing.id }, data: dto });
    }
    return this.prisma.artist.create({ data: { ...dto, ownerId: userId } });
  }

  /* ---- Админы баталгаажуулалт ---- */

  /** Админы анхаарал шаардах профайлууд — хүлээгдэж буй нь эхэнд.
   *
   *  Хоёр бүлэг:
   *    1. Эзэнтэй — хэрэглэгч өөрөө бүртгүүлсэн, батлах/буцаах шийдвэр хүлээж буй
   *    2. Эзэнгүй БӨГӨӨД баталгаажаагүй — эзэн нь бүртгэлээ устгасан «сүүдэр» мөр.
   *       Каталогийн (Jamendo/ADMIN) дуучид `approved: true` үүсдэг тул энд орохгүй.
   *       Эдгээрийг устгахаас өөр үйлдэл байхгүй — жагсаалтад гаргаагүй бол
   *       нийтийн `GET /artists`-д үүрд үлдэнэ. */
  pending() {
    return this.prisma.artist.findMany({
      where: { OR: [{ ownerId: { not: null } }, { approved: false }] },
      orderBy: [{ approved: 'asc' }, { createdAt: 'desc' }],
      include: {
        owner: { select: { id: true, name: true, email: true, createdAt: true } },
        _count: { select: { songs: true, albums: true } },
      },
    });
  }

  /** Баталгаажуулах / буцаах.
   *
   *  ⚠️ Шалгалт ЗӨВХӨН энд нэг удаа. Баталгаажсаны дараа уран бүтээлч дуу,
   *  цомгоо чөлөөтэй нэмнэ — дуу тус бүрд куратор шалгахгүй. */
  async setApproval(artistId: string, approved: boolean) {
    const artist = await this.prisma.artist.findUnique({ where: { id: artistId } });
    if (!artist) throw new NotFoundException('Уран бүтээлч олдсонгүй');
    return this.prisma.artist.update({
      where: { id: artistId },
      data: { approved, approvedAt: approved ? new Date() : null },
    });
  }

  /** Дуу/цомог нэмэх эрхтэй эсэх — баталгаажсан профайлыг буцаана, эс бөгөөс алдаа. */
  async requireApproved(userId: string) {
    const artist = await this.prisma.artist.findUnique({ where: { ownerId: userId } });
    if (!artist) throw new ForbiddenException('Уран бүтээлчийн профайл байхгүй байна');
    if (!artist.approved) {
      throw new ForbiddenException('Таны уран бүтээлчийн профайл админы баталгаажуулалт хүлээж байна');
    }
    return artist;
  }

  /** Дуудагчийн профайлд харьяалагдах бүх дуу — ноорог хамт.
   *
   *  Нийтийн `songs(id)`-ээс ялгаатай нь ноорогийг ч харуулна: уран бүтээлч
   *  өөрийн илгээсэн дуу хүлээгдэж байгааг харах ёстой. */
  async mySongs(userId: string) {
    const artist = await this.prisma.artist.findUnique({ where: { ownerId: userId } });
    if (!artist) return [];
    return this.prisma.song.findMany({
      where: { artistId: artist.id },
      orderBy: { createdAt: 'desc' },
    });
  }

  /** ADMIN гараар каталогийн дуучин нэмэх — эзэнгүй, шууд баталгаажсан.
   *  (Хэрэглэгч өөрөө үүсгэдэг зам нь `upsertMine`, тэр нь баталгаажаагүй үүснэ.) */
  create(dto: CreateArtistDto) {
    return this.prisma.artist.create({ data: { ...dto, approved: true, approvedAt: new Date() } });
  }

  list() {
    return this.prisma.artist.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { songs: true } } },
    });
  }

  async findOne(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
      include: { songs: { orderBy: { createdAt: 'desc' } } },
    });
    if (!artist) throw new NotFoundException('Дуучин олдсонгүй');
    return artist;
  }

  async songs(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) throw new NotFoundException('Дуучин олдсонгүй');
    return this.prisma.song.findMany({ where: { artistId: id }, orderBy: { createdAt: 'desc' } });
  }

  /** Каталогоос дуучин устгах (ADMIN).
   *
   *  ⚠️ ЗӨВХӨН ХООСОН профайл устгана. Дуутай профайлыг устгавал `Song.artistId`
   *  нь NULL болж (`onDelete: SetNull`) дуунууд дуучингүй үлдэнэ — каталог
   *  чимээгүй эвдэрнэ. Дуутай дуучныг арилгах шаардлагатай бол эхлээд дуунуудыг
   *  нь `docs/TAKEDOWN-PROCEDURE.md`-ээр хасна. */
  async remove(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
      include: { _count: { select: { songs: true, albums: true } } },
    });
    if (!artist) throw new NotFoundException('Дуучин олдсонгүй');

    if (artist._count.songs > 0 || artist._count.albums > 0) {
      throw new ConflictException(
        `«${artist.name}» дээр ${artist._count.songs} дуу, ${artist._count.albums} цомог байна — эхлээд тэдгээрийг хасна уу`,
      );
    }

    await this.prisma.artist.delete({ where: { id } });
    return { ok: true };
  }
}
