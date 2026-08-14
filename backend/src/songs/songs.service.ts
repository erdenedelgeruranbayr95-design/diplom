import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Role, SongLicense } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AnalyzeSongDto } from './dto/analyze-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';

const CATALOG_ROLES: Role[] = [Role.CURATOR, Role.MODERATOR, Role.ADMIN, Role.ROOT];

@Injectable()
export class SongsService {
  constructor(private prisma: PrismaService) {}

  create(data: {
    title: string;
    artist?: string;
    artistId?: string;
    genre?: string;
    description?: string;
    releaseYear?: number;
    coverUrl?: string;
    featured?: boolean;
    duration?: number;
    bpm?: number;
    fileUrl: string;
    uploadedBy: string;
    license: SongLicense;
    licenseSrc?: string;
    uploadConfirmed?: boolean;
    /* Curator/Admin шууд upload хийвэл нийтэлсэн байдлаар эхэлнэ; энгийн хэрэглэгчийн
       upload хянагдаагүй тул нийтэд published=false-ээр хадгалж, Curator баталгаажуулна. */
    published?: boolean;
  }) {
    return this.prisma.song.create({
      data: { ...data, published: data.published ?? false, publishedAt: data.published ? new Date() : null },
    });
  }

  /* ЖАГСААЛТААС цохилтын өгөгдлийг ХАСНА.

     Гурван талбар: `beatTimestamps` (цохилтын хугацаа), `beatIntensity` (эрчим),
     `beatBrightness` (өнгө). Гурвуулаа дуу бүрд хэдэн зуун бодит тоо агуулна.

     Хэмжсэн:
       · `beatTimestamps` — 51 дууны хариу 244 KB байсны 171 KB (70%)
       · `beatIntensity` + `beatBrightness` — 30 дууны хариунд 97 KB (69%)

     Нүүр хуудас эдгээрийг ОГТ ашигладаггүй: чичиргээ өгдөг тоглуулагч дууг
     тусад нь (`GET /songs/:id`) татдаг бөгөөд тэр нь бүх талбараа хэвээр өгнө.
     Гар утсанд энэ хэмжээний JSON задлах нь нүүр хуудсыг мэдэгдэхүйц удаашруулна. */
  private stripBeats<
    T extends {
      beatTimestamps?: unknown;
      beatIntensity?: unknown;
      beatBrightness?: unknown;
      onsetTimestamps?: unknown;
      onsetIntensity?: unknown;
      onsetBrightness?: unknown;
    },
  >(
    songs: T[],
  ): Omit<
    T,
    'beatTimestamps' | 'beatIntensity' | 'beatBrightness' | 'onsetTimestamps' | 'onsetIntensity' | 'onsetBrightness'
  >[] {
    return songs.map(
      ({
        beatTimestamps: _t,
        beatIntensity: _i,
        beatBrightness: _b,
        onsetTimestamps: _ot,
        onsetIntensity: _oi,
        onsetBrightness: _ob,
        ...rest
      }) => rest,
    );
  }

  /* Нийтэд (тоглуулагч, хайлт) зөвхөн published + upload баталгаажсан дуу л харагдана. */
  async list() {
    const songs = await this.prisma.song.findMany({
      where: { published: true, uploadConfirmed: true },
      orderBy: { createdAt: 'desc' },
      include: { artistRef: true, album: { select: { title: true } } },
    });
    return this.stripBeats(songs);
  }

  /* Curator/Admin/Root-д зориулсан каталог — ноорог (published=false) хамт бүгдийг
     харуулна, лицензийн талбар засаж/publish хийхийн тулд шаардлагатай (Үе шат 5). */
  catalog() {
    return this.prisma.song.findMany({
      orderBy: { createdAt: 'desc' },
      include: { artistRef: true, album: { select: { title: true } } },
    });
  }

  /* Нүүр хуудасны "Онцлох" — админ гараар тэмдэглэсэн featured дуунууд. */
  async featured() {
    const songs = await this.prisma.song.findMany({
      where: { featured: true, published: true, uploadConfirmed: true },
      orderBy: { createdAt: 'desc' },
      include: { artistRef: true, album: { select: { title: true } } },
    });
    return this.stripBeats(songs);
  }

  /* "Сүүлийн үеийн" — createdAt-аар эрэмбэлсэн хамгийн шинэ дуунууд (list()-ийн default
     дараалал ижил тул зөвхөн хязгаарлагдсан тоог буцаана). */
  async recent(limit = 12) {
    const songs = await this.prisma.song.findMany({
      where: { published: true, uploadConfirmed: true },
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: { artistRef: true, album: { select: { title: true } } },
    });
    return this.stripBeats(songs);
  }

  /* "Хамгийн алдартай" — ListenHistory бичлэгийн тоогоор эрэмбэлнэ (бодит тоглуулалтын
     давтамж дээр суурилсан, зохиомол тоо биш). Play count бага дуу ч жагсаалтад орно. */
  async popular(limit = 12) {
    const grouped = await this.prisma.listenHistory.groupBy({
      by: ['songId'],
      _count: { songId: true },
      orderBy: { _count: { songId: 'desc' } },
      take: limit,
    });
    if (grouped.length === 0) return this.recent(limit);
    const ids = grouped.map((g) => g.songId);
    const songs = await this.prisma.song.findMany({
      where: { id: { in: ids }, published: true, uploadConfirmed: true },
      include: { artistRef: true, album: { select: { title: true } } },
    });
    const order = new Map(ids.map((id, i) => [id, i]));
    /* `grouped` хоосон үед дээр нь `recent()` буцаадаг бөгөөд тэр нь ХАСАГДСАН
       хэлбэртэй. Энд хасахгүй бол нэг эндпойнт хоёр өөр бүтэц буцаана. */
    return this.stripBeats(songs.sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0)));
  }

  async findOne(id: string) {
    const song = await this.prisma.song.findUnique({
      where: { id },
      include: { artistRef: true, album: { select: { title: true } } },
    });
    if (!song) throw new NotFoundException('Дуу олдсонгүй');
    return song;
  }

  /* Дууны дэлгэрэнгүй хуудасны "Тухайн дуучны бусад дуунууд" — artistId-тэй л ажиллана,
     legacy Song.artist чөлөөт текстээр холбоо тогтоохгүй (давхардал/зөрчил үүсэхээс
     сэргийлнэ, зөвхөн бодит Artist relation дээр найдна). */
  async moreByArtist(songId: string, limit = 8) {
    const song = await this.prisma.song.findUnique({ where: { id: songId } });
    if (!song?.artistId) return [];
    /* Энэ ч бас ЖАГСААЛТ — 8 дуу × ~370 тоо. Дэлгэрэнгүй дэлгэц эндээс зөвхөн
       нэр/хавтас уншиж, дарахад `GET /songs/:id`-аар бүтнээр нь татдаг. */
    const songs = await this.prisma.song.findMany({
      where: { artistId: song.artistId, id: { not: songId }, published: true, uploadConfirmed: true },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return this.stripBeats(songs);
  }

  /* Клиент тал (browser, OfflineAudioContext) тооцоолсон анализын үр дүнг хадгална —
     backend өөрөө аудио задлан шинжлэхгүй, зөвхөн хадгалж/буцаана. */
  async saveAnalysis(id: string, dto: AnalyzeSongDto, requesterId: string, requesterRole: Role) {
    const song = await this.prisma.song.findUnique({ where: { id } });
    if (!song) throw new NotFoundException('Дуу олдсонгүй');
    if (song.uploadedBy !== requesterId && requesterRole !== Role.ADMIN) {
      throw new ForbiddenException('Энэ дууны анализыг хадгалах эрхгүй');
    }
    return this.prisma.song.update({
      where: { id },
      data: {
        /* dto.duration нь undefined бол Prisma энэ талбарыг хөндөхгүй (хуучин утга хэвээр). */
        duration: dto.duration,
        analyzedBpm: dto.bpm,
        beatCount: dto.beatCount,
        beatTimestamps: dto.beatTimestamps,
        rms: dto.rms,
        peak: dto.peak,
        bassEnergy: dto.bassEnergy,
        midEnergy: dto.midEnergy,
        trebleEnergy: dto.trebleEnergy,
        bandEnergies: dto.bandEnergies,
        waveformPeaks: dto.waveformPeaks,
        analyzedAt: new Date(),
      },
    });
  }

  private async assertCanEdit(id: string, requesterId: string, requesterRole: Role) {
    const song = await this.prisma.song.findUnique({ where: { id } });
    if (!song) throw new NotFoundException('Дуу олдсонгүй');
    const isOwner = song.uploadedBy === requesterId;
    const isCatalogStaff = CATALOG_ROLES.includes(requesterRole);
    if (!isOwner && !isCatalogStaff) throw new ForbiddenException('Энэ дуунд хандах эрхгүй');
    return song;
  }

  async update(id: string, dto: UpdateSongDto, requesterId: string, requesterRole: Role) {
    await this.assertCanEdit(id, requesterId, requesterRole);
    return this.prisma.song.update({ where: { id }, data: dto });
  }

  /* Лицензгүй дуу нийтлэгдэхгүй байх ёстой (DoD) — publish үед лиценз заавал тавигдсан
     байх ёстойг сервер талд дахин баталгаажуулна (create() дээр аль хэдийн шаардсан ч,
     энэ бол хоёр дахь давхарга — ирээдүйд license-гүй мөр ямар нэг замаар үүссэн ч
     нийтлэгдэхгүй байхыг батална). */
  async publish(id: string, requesterId: string, requesterRole: Role) {
    const song = await this.assertCanEdit(id, requesterId, requesterRole);
    if (!song.license) {
      throw new BadRequestException('Лицензгүй дууг нийтлэх боломжгүй — эхлээд лиценз сонгоно уу');
    }
    if (!song.uploadConfirmed) {
      throw new BadRequestException('Файлын upload баталгаажаагүй байна');
    }
    return this.prisma.song.update({ where: { id }, data: { published: true, publishedAt: new Date() } });
  }

  async unpublish(id: string, requesterId: string, requesterRole: Role) {
    await this.assertCanEdit(id, requesterId, requesterRole);
    return this.prisma.song.update({ where: { id }, data: { published: false } });
  }

  async remove(id: string, requesterId: string, requesterRole: Role) {
    const song = await this.prisma.song.findUnique({ where: { id } });
    if (!song) throw new NotFoundException('Дуу олдсонгүй');
    if (song.uploadedBy !== requesterId && requesterRole !== Role.ADMIN) {
      throw new ForbiddenException('Энэ дууг устгах эрхгүй');
    }
    await this.prisma.song.delete({ where: { id } });
    return { ok: true, fileUrl: song.fileUrl, coverUrl: song.coverUrl };
  }
}
