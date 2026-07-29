import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AnalyzeSongDto } from './dto/analyze-song.dto';

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
  }) {
    return this.prisma.song.create({ data });
  }

  list() {
    return this.prisma.song.findMany({ orderBy: { createdAt: 'desc' }, include: { artistRef: true } });
  }

  /* Нүүр хуудасны "Онцлох" — админ гараар тэмдэглэсэн featured дуунууд. */
  featured() {
    return this.prisma.song.findMany({ where: { featured: true }, orderBy: { createdAt: 'desc' }, include: { artistRef: true } });
  }

  /* "Сүүлийн үеийн" — createdAt-аар эрэмбэлсэн хамгийн шинэ дуунууд (list()-ийн default
     дараалал ижил тул зөвхөн хязгаарлагдсан тоог буцаана). */
  recent(limit = 12) {
    return this.prisma.song.findMany({ orderBy: { createdAt: 'desc' }, take: limit, include: { artistRef: true } });
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
    const songs = await this.prisma.song.findMany({ where: { id: { in: ids } }, include: { artistRef: true } });
    const order = new Map(ids.map((id, i) => [id, i]));
    return songs.sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0));
  }

  async findOne(id: string) {
    const song = await this.prisma.song.findUnique({ where: { id }, include: { artistRef: true } });
    if (!song) throw new NotFoundException('Дуу олдсонгүй');
    return song;
  }

  /* Дууны дэлгэрэнгүй хуудасны "Тухайн дуучны бусад дуунууд" — artistId-тэй л ажиллана,
     legacy Song.artist чөлөөт текстээр холбоо тогтоохгүй (давхардал/зөрчил үүсэхээс
     сэргийлнэ, зөвхөн бодит Artist relation дээр найдна). */
  async moreByArtist(songId: string, limit = 8) {
    const song = await this.prisma.song.findUnique({ where: { id: songId } });
    if (!song?.artistId) return [];
    return this.prisma.song.findMany({
      where: { artistId: song.artistId, id: { not: songId } },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
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
        analyzedBpm: dto.bpm,
        beatCount: dto.beatCount,
        beatTimestamps: dto.beatTimestamps,
        rms: dto.rms,
        peak: dto.peak,
        bassEnergy: dto.bassEnergy,
        midEnergy: dto.midEnergy,
        trebleEnergy: dto.trebleEnergy,
        waveformPeaks: dto.waveformPeaks,
        analyzedAt: new Date(),
      },
    });
  }

  async remove(id: string, requesterId: string, requesterRole: Role) {
    const song = await this.prisma.song.findUnique({ where: { id } });
    if (!song) throw new NotFoundException('Дуу олдсонгүй');
    if (song.uploadedBy !== requesterId && requesterRole !== Role.ADMIN) {
      throw new ForbiddenException('Энэ дууг устгах эрхгүй');
    }
    await this.prisma.song.delete({ where: { id } });
    return { ok: true };
  }
}
