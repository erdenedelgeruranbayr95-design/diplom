import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SongLicense } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { HapticService } from '../haptic/haptic.service';

/* Free Music Archive-ийн REST API-ийн бодит хариултын хэлбэр
   (https://freemusicarchive.org/api). Jamendo-той адил зөвхөн бидний ашигладаг
   талбаруудыг тодорхойлсон. */
interface FmaTrack {
  track_id: string;
  track_title: string;
  artist_name: string;
  album_title: string;
  track_duration: string; // секунд, гэхдээ string хэлбэрээр ирдэг
  track_listen_url: string; // тоглуулах шууд URL
  track_image_file?: string;
  album_image_file?: string;
  license_url: string; // Creative Commons лицензийн URL — лицензийн төрлийг эндээс гаргана
  track_date_created?: string;
}

interface FmaResponse {
  errors?: boolean;
  message?: string;
  total_results?: number;
  dataset: FmaTrack[];
}

const FMA_BASE = 'https://freemusicarchive.org/api/get';

@Injectable()
export class FmaService {
  private readonly logger = new Logger(FmaService.name);

  constructor(
    private prisma: PrismaService,
    private haptic: HapticService,
  ) {}

  private get apiKey(): string {
    const key = process.env.FMA_API_KEY;
    if (!key) {
      throw new BadRequestException(
        'FMA_API_KEY тохируулагдаагүй — https://freemusicarchive.org/api-аас үнэгүй бүртгүүлж backend/.env-д нэмнэ үү',
      );
    }
    return key;
  }

  async search(query: string, limit = 12) {
    const url = new URL(`${FMA_BASE}/tracks.json`);
    url.searchParams.set('api_key', this.apiKey);
    url.searchParams.set('search', query);
    url.searchParams.set('limit', String(limit));

    const res = await fetch(url.toString());
    const data = (await res.json()) as FmaResponse;
    if (data.errors) {
      throw new BadRequestException(`FMA API алдаа: ${data.message || 'Тодорхойгүй'}`);
    }

    return (data.dataset || []).map((t) => ({
      fmaId: t.track_id,
      title: t.track_title,
      artist: t.artist_name,
      album: t.album_title,
      duration: Math.round(Number(t.track_duration) || 0),
      coverUrl: t.track_image_file || t.album_image_file || undefined,
      audioUrl: t.track_listen_url,
      license: mapFmaLicense(t.license_url),
      licenseSrc: t.license_url,
      releaseYear: t.track_date_created ? new Date(t.track_date_created).getFullYear() : undefined,
    }));
  }

  /** Нэг FMA track-ийг сонгож, Song болгон импортолно — Jamendo-той адил зарчим:
   *  файлыг backend дундуур татахгүй, `audioUrl`-ыг шууд Song.fileUrl-д хадгалж
   *  FMA-ийн CDN-аас шууд тоглуулна. Haptic Score-ыг worker HTTP-ээр татаж тооцоолно. */
  async importTrack(fmaId: string, uploaderId: string) {
    const existing = await this.prisma.song.findFirst({ where: { fmaId } });
    if (existing) return existing;

    const [track] = await this.search(`id:${fmaId}`, 1);
    if (!track) throw new NotFoundException('FMA track олдсонгүй');

    const song = await this.prisma.song.create({
      data: {
        title: track.title,
        artist: track.artist,
        releaseYear: track.releaseYear,
        coverUrl: track.coverUrl || undefined,
        duration: track.duration,
        fileUrl: track.audioUrl,
        uploadedBy: uploaderId,
        license: track.license,
        licenseSrc: track.licenseSrc,
        fmaId,
        published: true,
        publishedAt: new Date(),
      },
    });

    this.haptic.enqueueAnalysis(song.id, track.audioUrl).catch((err) => {
      this.logger.warn(`FMA track (${fmaId}) Haptic Score дараалуулахад алдаа: ${(err as Error).message}`);
    });

    return song;
  }
}

/** FMA-ийн `license_url` (жиш. https://creativecommons.org/licenses/by-nc-sa/4.0/)-аас
 *  дотоод SongLicense enum рүү хөрвүүлнэ — jamendo.service.ts-ийн mapJamendoLicense-тэй
 *  ижил зарчим (танигдаагүй хэлбэр → хамгийн хязгаарлагдмал CC_BY_NC). */
function mapFmaLicense(url: string): SongLicense {
  const lower = (url || '').toLowerCase();
  if (lower.includes('publicdomain') || lower.includes('/zero/')) return SongLicense.CC0;
  if (lower.includes('by-sa')) return SongLicense.CC_BY_SA;
  if (lower.includes('by-nc')) return SongLicense.CC_BY_NC;
  if (lower.includes('/by/')) return SongLicense.CC_BY;
  return SongLicense.CC_BY_NC;
}
