import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { createHash } from 'crypto';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { SongAnalysisStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { HapticQueueService } from './haptic-queue.service';
import { HapticCallbackDto } from './dto/haptic-callback.dto';

/** `fileUrl` нь одоо MinIO (S3-compatible) public URL — жиш.
 *  `http://localhost:9000/medreh-media/songs/xxx.mp3` — локал `/uploads/`-аас ялгаатай. */
async function fetchBytes(fileUrl: string): Promise<Buffer> {
  if (/^https?:\/\//.test(fileUrl)) {
    const res = await fetch(fileUrl);
    if (!res.ok) throw new Error(`Файл татахад алдаа гарлаа: HTTP ${res.status}`);
    return Buffer.from(await res.arrayBuffer());
  }
  // Legacy зам (хуучин /uploads/xxx.mp3 — S3 руу нүүлгэхээс өмнөх Song мөрүүдтэй нийцтэй байлгана).
  return readFile(join(process.cwd(), fileUrl.replace(/^\//, '')));
}

@Injectable()
export class HapticService {
  private readonly logger = new Logger(HapticService.name);

  constructor(
    private prisma: PrismaService,
    private queue: HapticQueueService,
  ) {}

  /** Upload дараа дуудагдана — файлын hash тооцож, аль хэдийн задалсан бол дахин
   *  дараалуулахгүй (idempotent), эс бол шинэ ажил Redis дараалалд оруулна.
   *  `coverUrl` өгөгдсөн бол worker WebP олон хэмжээгээр боловсруулна (заавал биш). */
  async enqueueAnalysis(songId: string, fileUrl: string, coverUrl?: string) {
    const song = await this.prisma.song.findUnique({ where: { id: songId } });
    if (!song) throw new NotFoundException('Дуу олдсонгүй');

    let fileHash: string;
    try {
      const buf = await fetchBytes(fileUrl);
      fileHash = createHash('sha256').update(buf).digest('hex');
    } catch (err) {
      this.logger.warn(`Файл уншиж шалгахад алдаа (${fileUrl}): ${(err as Error).message}`);
      return;
    }

    /* Idempotent: өмнө нь ЯГ ЛУГ файл (ижил hash) амжилттай задарсан бол шинэ job
       дараалуулахгүй, харин тэр Score-г шууд холбоно. */
    const existing = await this.prisma.song.findFirst({
      where: { fileHash, analysisStatus: SongAnalysisStatus.READY, id: { not: songId } },
    });
    if (existing) {
      await this.prisma.song.update({
        where: { id: songId },
        data: {
          fileHash,
          scoreUrl: existing.scoreUrl,
          analysisStatus: SongAnalysisStatus.READY,
          analyzedBpm: existing.analyzedBpm,
          musicalKey: existing.musicalKey,
          /* Цохилтын өгөгдлийг ч хамт хуулна — эс бөгөөс дахин ашигласан дуу
             чичиргээтэй ч ЯЛГААГҮЙ цохилттой болно. */
          beatTimestamps: existing.beatTimestamps ?? undefined,
          beatCount: existing.beatCount,
          beatIntensity: existing.beatIntensity,
          beatBrightness: existing.beatBrightness,
          onsetTimestamps: existing.onsetTimestamps,
          onsetIntensity: existing.onsetIntensity,
          onsetBrightness: existing.onsetBrightness,
          analyzedAt: new Date(),
        },
      });
      return;
    }

    await this.prisma.song.update({
      where: { id: songId },
      data: { fileHash, analysisStatus: SongAnalysisStatus.PENDING, analysisError: null },
    });

    await this.queue.enqueue({ songId, fileUrl, fileHash, coverUrl });
    await this.prisma.song.update({ where: { id: songId }, data: { analysisStatus: SongAnalysisStatus.PROCESSING } });
  }

  async getAnalysisStatus(songId: string) {
    const song = await this.prisma.song.findUnique({
      where: { id: songId },
      select: { analysisStatus: true, analysisError: true, scoreUrl: true },
    });
    if (!song) throw new NotFoundException('Дуу олдсонгүй');
    return song;
  }

  async getScore(songId: string) {
    const song = await this.prisma.song.findUnique({ where: { id: songId }, select: { scoreUrl: true, analysisStatus: true } });
    if (!song) throw new NotFoundException('Дуу олдсонгүй');
    return song;
  }

  /** Worker-ийн callback — амжилттай/амжилтгүй үр дүнг DB-д тэмдэглэнэ. */
  async handleCallback(dto: HapticCallbackDto) {
    const song = await this.prisma.song.findUnique({ where: { id: dto.songId } });
    if (!song) throw new NotFoundException('Дуу олдсонгүй');

    if (dto.status === 'FAILED') {
      await this.prisma.song.update({
        where: { id: dto.songId },
        data: { analysisStatus: SongAnalysisStatus.FAILED, analysisError: dto.error || 'Тодорхойгүй алдаа' },
      });
      return { ok: true };
    }

    await this.prisma.song.update({
      where: { id: dto.songId },
      data: {
        analysisStatus: SongAnalysisStatus.READY,
        scoreUrl: dto.scoreUrl,
        analyzedBpm: dto.bpm,
        musicalKey: dto.musicalKey,
        /* BeatScheduler (frontend, timestamp-driven <40мс latency замд) шууд ашиглана —
           worker-ийн librosa.beat.beat_track-ийн үр дүн, client-side energy-based
           detectBeats()-тэй ижил талбарт бичигдэнэ (нэг эх сурвалж, хуучин client-side
           анализтай зөрчилдөхгүй — сүүлд задарсан нь л ялна). */
        beatTimestamps: dto.beatTimestamps,
        beatCount: dto.beatTimestamps?.length,
        /* Цохилт бүрийн эрчим/өнгө — `scoreUrl` дээрх 2.6 MB файлаас гаргасан
           хураангуй. Worker нь Score-оо ӨӨРИЙН дискэнд бичдэг тул үүлэн дээрх
           энэ сервер түүнийг уншиж чаддаггүй; иймд клиент талд хэрэгтэй хэсгийг
           нь DB-д шууд хадгална. Ирээгүй бол хоосон массив — клиент өгөгдмөл
           дугтуй ашиглана, чичиргээ ажилласаар байна. */
        beatIntensity: dto.beatIntensity ?? [],
        beatBrightness: dto.beatBrightness ?? [],
        /* Онсет — хөгжмийн нарийн бүтэц. Шүүгдээгүй ирнэ, клиент тал шүүнэ. */
        onsetTimestamps: dto.onsetTimestamps ?? [],
        onsetIntensity: dto.onsetIntensity ?? [],
        onsetBrightness: dto.onsetBrightness ?? [],
        analyzedAt: new Date(),
        analysisError: null,
        hlsUrl: dto.hlsUrl,
        coverThumbUrl: dto.coverThumbUrl,
        coverMediumUrl: dto.coverMediumUrl,
        coverLargeUrl: dto.coverLargeUrl,
      },
    });
    return { ok: true };
  }
}
