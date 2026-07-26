import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AnalyzeSongDto } from './dto/analyze-song.dto';

@Injectable()
export class SongsService {
  constructor(private prisma: PrismaService) {}

  create(data: { title: string; artist?: string; genre?: string; duration?: number; bpm?: number; fileUrl: string; uploadedBy: string }) {
    return this.prisma.song.create({ data });
  }

  list() {
    return this.prisma.song.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: string) {
    const song = await this.prisma.song.findUnique({ where: { id } });
    if (!song) throw new NotFoundException('Дуу олдсонгүй');
    return song;
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
