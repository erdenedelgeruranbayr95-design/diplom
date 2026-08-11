import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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

  create(dto: CreateArtistDto) {
    return this.prisma.artist.create({ data: dto });
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
}
