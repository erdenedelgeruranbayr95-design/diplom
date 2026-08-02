import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SongLicense } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { HapticService } from '../haptic/haptic.service';

/* Jamendo v3.0 REST API-ийн бодит хариултын хэлбэр (https://developer.jamendo.com/v3.0/tracks).
   Зөвхөн бидний ашигладаг талбаруудыг тодорхойлсон, бусдыг Jamendo буцаадаг ч энд алгасна. */
interface JamendoTrack {
  id: string;
  name: string;
  artist_name: string;
  album_name: string;
  duration: number; // секунд
  audio: string; // тоглуулах шууд URL (mp32/ogg — audioformat query-ээр сонгоно)
  image: string; // ковер зураг URL
  license_ccurl: string; // Creative Commons лицензийн URL — эндээс лицензийн төрлийг гаргана
  releasedate: string;
}

interface JamendoResponse {
  headers: { status: string; code: number; error_message?: string; results_count: number };
  results: JamendoTrack[];
}

const JAMENDO_BASE = 'https://api.jamendo.com/v3.0';

@Injectable()
export class JamendoService {
  private readonly logger = new Logger(JamendoService.name);

  constructor(
    private prisma: PrismaService,
    private haptic: HapticService,
  ) {}

  private get clientId(): string {
    const id = process.env.JAMENDO_CLIENT_ID;
    if (!id) {
      throw new BadRequestException(
        'JAMENDO_CLIENT_ID тохируулагдаагүй — https://developer.jamendo.com/v3.0-ээс үнэгүй бүртгүүлж backend/.env-д нэмнэ үү',
      );
    }
    return id;
  }

  async search(query: string, limit = 12) {
    const url = new URL(`${JAMENDO_BASE}/tracks/`);
    url.searchParams.set('client_id', this.clientId);
    url.searchParams.set('format', 'json');
    url.searchParams.set('search', query);
    url.searchParams.set('limit', String(limit));
    url.searchParams.set('include', 'musicinfo');
    url.searchParams.set('audioformat', 'mp32');
    // Зөвхөн Creative Commons лицензтэй трек — дипломын хамгийн эрсдэлтэй зүйл
    // (зохиогчийн эрхийн нэхэмжлэл) энэ каталогт хамаарахгүй байхыг эхнээс нь баталгаажуулна.
    url.searchParams.set('boost', 'popularity_total');

    const res = await fetch(url.toString());
    const data = (await res.json()) as JamendoResponse;
    if (data.headers.status !== 'success') {
      throw new BadRequestException(`Jamendo API алдаа: ${data.headers.error_message || 'Тодорхойгүй'}`);
    }

    return data.results.map((t) => ({
      jamendoId: t.id,
      title: t.name,
      artist: t.artist_name,
      album: t.album_name,
      duration: t.duration,
      coverUrl: t.image,
      audioUrl: t.audio,
      license: mapJamendoLicense(t.license_ccurl),
      licenseSrc: t.license_ccurl,
      releaseYear: t.releasedate ? new Date(t.releasedate).getFullYear() : undefined,
    }));
  }

  /** Нэг Jamendo track-ийг сонгож, Song болгон импортолно — файлыг backend дундуур
   *  татахгүй, `audioUrl`-ыг шууд `sourceUrl` шиг Song.fileUrl-д хадгална (Jamendo-ийн
   *  CDN-аас шууд тоглуулна). Haptic Score тооцоолуулахын тулд worker HTTP-ээр татаж авна
   *  (см. haptic.service.ts-ийн fetchBytes — S3 болон гадаад URL хоёуланд адилхан ажиллана). */
  async importTrack(jamendoId: string, uploaderId: string) {
    const existing = await this.prisma.song.findFirst({ where: { jamendoId } });
    if (existing) return existing;

    const [track] = await this.search(`id:${jamendoId}`, 1);
    if (!track) throw new NotFoundException('Jamendo track олдсонгүй');

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
        jamendoId,
        published: true,
        publishedAt: new Date(),
      },
    });

    this.haptic.enqueueAnalysis(song.id, track.audioUrl).catch((err) => {
      this.logger.warn(`Jamendo track (${jamendoId}) Haptic Score дараалуулахад алдаа: ${(err as Error).message}`);
    });

    return song;
  }
}

/** Jamendo-ийн `license_ccurl` (жиш. https://creativecommons.org/licenses/by-nc-sa/3.0/)-аас
 *  дотоод SongLicense enum рүү хөрвүүлнэ. Танигдаагүй хэлбэр гарвал хамгийн хязгаарлагдмал
 *  (BY_NC) төрөлд оноож эрсдэлээс сэргийлнэ (өргөн эрхтэй гэж буруу таамаглахаас дээр). */
function mapJamendoLicense(url: string): SongLicense {
  const lower = (url || '').toLowerCase();
  if (lower.includes('publicdomain') || lower.includes('/zero/')) return SongLicense.CC0;
  if (lower.includes('by-sa')) return SongLicense.CC_BY_SA;
  if (lower.includes('by-nc')) return SongLicense.CC_BY_NC;
  if (lower.includes('/by/')) return SongLicense.CC_BY;
  return SongLicense.CC_BY_NC;
}
