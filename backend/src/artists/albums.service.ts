import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ArtistsService } from './artists.service';
import { StorageService } from '../storage/storage.service';
import { UpsertAlbumDto } from './dto/upsert-album.dto';

/* Цомог — уран бүтээлчийн дуунуудын багц.

   Бүх үйлдэл дуудагчийн ӨӨРИЙН профайлаар хязгаарлагдана: цомгийн `artistId`
   нь дуудагчийн профайлтай таарахгүй бол хандалт хаагдана. Клиентээс ирсэн
   `artistId`-д хэзээ ч итгэхгүй — session-ээс гаргаж авна. */
@Injectable()
export class AlbumsService {
  constructor(
    private prisma: PrismaService,
    private artists: ArtistsService,
    private storage: StorageService,
  ) {}

  /** Presigned upload-ын key-г нийтийн URL болгоно. Key ирээгүй бол хэрэглэгчийн
   *  бичсэн URL-ыг хэвээр авна (гадаад зураг холбох хуучин зам). */
  private coverUrlFrom(dto: UpsertAlbumDto): string | undefined {
    return dto.coverKey ? this.storage.publicUrlFor(dto.coverKey) : dto.coverUrl;
  }

  /** Дуудагчийн цомгууд — дуунууд нь дараалалаараа. */
  async listMine(userId: string) {
    const artist = await this.prisma.artist.findUnique({ where: { ownerId: userId } });
    if (!artist) return [];
    return this.prisma.album.findMany({
      where: { artistId: artist.id },
      orderBy: { createdAt: 'desc' },
      include: {
        songs: {
          orderBy: [{ trackNumber: 'asc' }, { createdAt: 'asc' }],
          select: { id: true, title: true, trackNumber: true, duration: true, coverUrl: true, analysisStatus: true },
        },
      },
    });
  }

  async create(userId: string, dto: UpsertAlbumDto) {
    const artist = await this.artists.requireApproved(userId);
    const title = dto.title.trim();

    const dup = await this.prisma.album.findFirst({ where: { artistId: artist.id, title } });
    if (dup) throw new ConflictException(`«${title}» нэртэй цомог аль хэдийн байна`);

    return this.prisma.album.create({
      data: { title, coverUrl: this.coverUrlFrom(dto), year: dto.year, artistId: artist.id },
    });
  }

  async update(userId: string, albumId: string, dto: UpsertAlbumDto) {
    const album = await this.requireOwned(userId, albumId);
    const title = dto.title.trim();

    if (title !== album.title) {
      const dup = await this.prisma.album.findFirst({ where: { artistId: album.artistId, title } });
      if (dup) throw new ConflictException(`«${title}» нэртэй цомог аль хэдийн байна`);
    }

    return this.prisma.album.update({
      where: { id: albumId },
      data: { title, coverUrl: this.coverUrlFrom(dto), year: dto.year },
    });
  }

  /** Цомог устгана. Дуунууд нь ҮЛДЭНЭ — `Song.albumId` NULL болж дан дуу болно. */
  async remove(userId: string, albumId: string) {
    await this.requireOwned(userId, albumId);
    await this.prisma.album.delete({ where: { id: albumId } });
    return { ok: true };
  }

  /** Дуунуудыг цомогт хийх — масс байршуулалтын дараа дуудагдана.
   *
   *  Дараалал нь өгөгдсөн массивын дараалал. Аль хэдийн цомогт байгаа дуу
   *  давхардвал зүгээр л дугаар нь шинэчлэгдэнэ. */
  async setSongs(userId: string, albumId: string, songIds: string[]) {
    const album = await this.requireOwned(userId, albumId);

    /* ⚠️ Зөвхөн ӨӨРИЙН дууг цомогт хийж болно — эс бөгөөс хэн ч бусдын дууг
       өөрийн цомогт оруулж, зохиогчийг сольж чадна. */
    const owned = await this.prisma.song.findMany({
      where: { id: { in: songIds }, artistId: album.artistId },
      select: { id: true },
    });
    const allowed = new Set(owned.map((s) => s.id));
    const rejected = songIds.filter((id) => !allowed.has(id));
    if (rejected.length) {
      throw new ForbiddenException(`${rejected.length} дуу таны биш байна`);
    }

    /* Дараалал бүхэлдээ дахин бичигдэнэ — нэг transaction-д, тул хагас
       шинэчлэгдсэн байдал үүсэхгүй. */
    await this.prisma.$transaction([
      // Цомгоос хасагдсан дуунуудыг салгана
      this.prisma.song.updateMany({
        where: { albumId, id: { notIn: songIds.length ? songIds : ['__none__'] } },
        data: { albumId: null, trackNumber: null },
      }),
      ...songIds.map((id, i) =>
        this.prisma.song.update({ where: { id }, data: { albumId, trackNumber: i + 1 } }),
      ),
    ]);

    return this.findOne(albumId);
  }

  findOne(albumId: string) {
    return this.prisma.album.findUnique({
      where: { id: albumId },
      include: {
        songs: { orderBy: [{ trackNumber: 'asc' }, { createdAt: 'asc' }] },
        artist: { select: { id: true, name: true, photoUrl: true } },
      },
    });
  }

  /** Цомог дуудагчийнх мөн эсэхийг шалгана. */
  private async requireOwned(userId: string, albumId: string) {
    const artist = await this.artists.requireApproved(userId);
    const album = await this.prisma.album.findUnique({ where: { id: albumId } });
    if (!album) throw new NotFoundException('Цомог олдсонгүй');
    if (album.artistId !== artist.id) throw new ForbiddenException('Энэ цомогт хандах эрхгүй');
    return album;
  }
}
