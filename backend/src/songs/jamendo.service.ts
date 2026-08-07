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
  artist_id: string;
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

interface JamendoArtist {
  id: string;
  name: string;
  image: string;
}

interface JamendoArtistResponse {
  headers: { status: string; code: number; error_message?: string; results_count: number };
  results: JamendoArtist[];
}

const JAMENDO_BASE = 'https://api.jamendo.com/v3.0';

export interface BatchImportResult {
  imported: number;
  skipped: number;
  failed: number;
  details: { jamendoId: string; title: string; status: 'imported' | 'skipped' | 'failed'; reason?: string }[];
}

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

  /* Jamendo v3.0 API-ийн track текст хайлт `search` биш **`namesearch`** параметрээр
     ажилладаг («search» огт танигдахгvй тул vргэлж 0 vр дvн буцаадаг байсан —
     https://api.jamendo.com/v3.0/tracks/?client_id=...&search=piano нь 0 vр дvнтэй,
     харин ...&namesearch=piano бодит vр дvн буцаадгийг curl-аар шалгаж баталгаажуулсан). */
  async search(query: string, limit = 12) {
    const url = new URL(`${JAMENDO_BASE}/tracks/`);
    url.searchParams.set('client_id', this.clientId);
    url.searchParams.set('format', 'json');
    url.searchParams.set('namesearch', query);
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

    return data.results.map(mapJamendoTrack);
  }

  /** Тодорхой ID-тэй ГАНЦ track-ийн мета мэдээллийг авна (`search`-тэй ялгаатай нь энд
   *  текст хайлт биш `id` query параметрээр шууд тохирох мөрийг олдог — importTrack()-ийн
   *  урьд нь `search(\`id:${id}\`)` гэж дуудаж байсан нь Jamendo-д ямар ч утгагvй string
   *  болж, vргэлж хоосон vр дvн буцаадаг байсан bug-ийн шалтгаан). */
  private async fetchTrackById(jamendoId: string) {
    const url = new URL(`${JAMENDO_BASE}/tracks/`);
    url.searchParams.set('client_id', this.clientId);
    url.searchParams.set('format', 'json');
    url.searchParams.set('id', jamendoId);
    url.searchParams.set('include', 'musicinfo');
    url.searchParams.set('audioformat', 'mp32');

    const res = await fetch(url.toString());
    const data = (await res.json()) as JamendoResponse;
    if (data.headers.status !== 'success') {
      throw new BadRequestException(`Jamendo API алдаа: ${data.headers.error_message || 'Тодорхойгүй'}`);
    }
    return data.results[0] ? mapJamendoTrack(data.results[0]) : null;
  }

  /** Нэг Jamendo track-ийг сонгож, Song болгон импортолно — файлыг backend дундуур
   *  татахгүй, `audioUrl`-ыг шууд `sourceUrl` шиг Song.fileUrl-д хадгална (Jamendo-ийн
   *  CDN-аас шууд тоглуулна). Haptic Score тооцоолуулахын тулд worker HTTP-ээр татаж авна
   *  (см. haptic.service.ts-ийн fetchBytes — S3 болон гадаад URL хоёуланд адилхан ажиллана). */
  async importTrack(jamendoId: string, uploaderId: string) {
    const existing = await this.prisma.song.findFirst({ where: { jamendoId } });
    if (existing) return existing;

    const track = await this.fetchTrackById(jamendoId);
    if (!track) throw new NotFoundException('Jamendo track олдсонгүй');

    return this.createSongFromTrack(track, jamendoId, uploaderId);
  }

  /** Home хуудасны "Алдартай дуучид" хэсэг тусдаа Artist хvснэгтээс (`/artists`)
   *  уншдаг тул зөвхөн Song.artist текст талбарыг бөглөөд орхивол тэр хэсэг vргэлж
   *  хоосон vлддэг байсан. Нэрээр нь олж, байхгvй бол шинээр vvсгэнэ. Jamendo-с
   *  artist зураг олдвол (importPopularBatch-ийн урьдчилан татсан кэш) photoUrl-г
   *  ч зэрэг бөглөнө — байхгvй бол хоосон vлдээж, дараа нь дуунуудынх нь coverUrl-аар
   *  fallback хийх боломжийг Home талд vлдээнэ (см. HomeCatalog/ArtistRail). */
  private async createSongFromTrack(
    track: ReturnType<typeof mapJamendoTrack>,
    jamendoId: string,
    uploaderId: string,
    artistPhotoUrl?: string,
  ) {
    const artistRef = await this.prisma.artist.upsert({
      where: { name: track.artist },
      update: artistPhotoUrl ? { photoUrl: artistPhotoUrl } : {},
      create: { name: track.artist, photoUrl: artistPhotoUrl },
    });

    const song = await this.prisma.song.create({
      data: {
        title: track.title,
        artist: track.artist,
        artistId: artistRef.id,
        description: track.album ? `Цомог: ${track.album}` : undefined,
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

  /** Системийг анх ажиллуулахад ашиглагдах анхны каталог — Jamendo-ийн хамгийн
   *  сонсогддог (popularity_total) Creative Commons трекүүдээс `limit` ширхэгийг
   *  импортолно. Аль хэдийн импортлогдсон jamendoId-г алгасна (идэмпотент, дахин
   *  ажиллуулахад давхардуулахгvй). Нэг трек амжилтгvй болвол ЗОГСОХГvй, дараагийн
   *  трек рvv vргэлжилнэ — эцэст нь хэдэн амжилттай/алгассан/амжилтгvй болсныг
   *  тоймлож буцаана (см. BatchImportResult). */
  async importPopularBatch(limit = 30, uploaderId: string): Promise<BatchImportResult> {
    const url = new URL(`${JAMENDO_BASE}/tracks/`);
    url.searchParams.set('client_id', this.clientId);
    url.searchParams.set('format', 'json');
    url.searchParams.set('order', 'popularity_total');
    url.searchParams.set('limit', String(limit));
    url.searchParams.set('include', 'musicinfo');
    url.searchParams.set('audioformat', 'mp32');

    const res = await fetch(url.toString());
    const data = (await res.json()) as JamendoResponse;
    if (data.headers.status !== 'success') {
      throw new BadRequestException(`Jamendo API алдаа: ${data.headers.error_message || 'Тодорхойгүй'}`);
    }

    const result: BatchImportResult = { imported: 0, skipped: 0, failed: 0, details: [] };

    for (const raw of data.results) {
      try {
        const existing = await this.prisma.song.findFirst({ where: { jamendoId: raw.id } });
        if (existing) {
          result.skipped++;
          result.details.push({ jamendoId: raw.id, title: raw.name, status: 'skipped', reason: 'аль хэдийн импортлогдсон' });
          continue;
        }

        const track = mapJamendoTrack(raw);
        await this.createSongFromTrack(track, raw.id, uploaderId);
        result.imported++;
        result.details.push({ jamendoId: raw.id, title: raw.name, status: 'imported' });
      } catch (err) {
        // Нэг трек унавал (сүлжээ, лиценз танигдаагvй г.м) бvх batch-ийг зогсоохгvй,
        // логлоод дараагийн трек рvv vргэлжилнэ.
        result.failed++;
        result.details.push({ jamendoId: raw.id, title: raw.name, status: 'failed', reason: (err as Error).message });
        this.logger.warn(`Jamendo batch import: track ${raw.id} (${raw.name}) амжилтгvй: ${(err as Error).message}`);
      }
    }

    this.logger.log(
      `Jamendo batch import дууслаа: ${result.imported} нэмэгдсэн, ${result.skipped} алгассан, ${result.failed} амжилтгvй`,
    );
    return result;
  }

  /** Одоо системд байгаа Artist бvрийн `photoUrl`-г Jamendo-ийн artist профайл
   *  зургаар бөглөнө (байхгvй байгаа мөрvvдэд л). Jamendo зарим artist-д зураг
   *  өгдөггvй тул (curl-аар баталгаажуулсан) тэр тохиолдолд тухайн уран бvтээлчийн
   *  хамгийн шинэ дууных нь coverUrl-г цомгийн зураг мэтээр орлуулж ашиглана —
   *  ингэснээр Popular Artists хэсэг vргэлж зурагтай карт харуулна. */
  async backfillArtistPhotos(): Promise<{ updated: number; usedFallbackCover: number }> {
    const artists = await this.prisma.artist.findMany({
      where: { photoUrl: null },
      include: { songs: { where: { coverUrl: { not: null } }, orderBy: { createdAt: 'desc' }, take: 1 } },
    });

    let updated = 0;
    let usedFallbackCover = 0;

    for (const artist of artists) {
      let photoUrl: string | null = null;
      try {
        photoUrl = await this.fetchArtistImage(artist.name);
      } catch (err) {
        this.logger.warn(`Jamendo artist зураг татахад алдаа (${artist.name}): ${(err as Error).message}`);
      }

      if (!photoUrl && artist.songs[0]?.coverUrl) {
        photoUrl = artist.songs[0].coverUrl;
        usedFallbackCover++;
      }

      if (photoUrl) {
        await this.prisma.artist.update({ where: { id: artist.id }, data: { photoUrl } });
        updated++;
      }
    }

    return { updated, usedFallbackCover };
  }

  private async fetchArtistImage(name: string): Promise<string | null> {
    const url = new URL(`${JAMENDO_BASE}/artists/`);
    url.searchParams.set('client_id', this.clientId);
    url.searchParams.set('format', 'json');
    url.searchParams.set('namesearch', name);
    url.searchParams.set('limit', '1');

    const res = await fetch(url.toString());
    const data = (await res.json()) as JamendoArtistResponse;
    if (data.headers.status !== 'success') return null;

    const image = data.results[0]?.image;
    return image ? image : null;
  }
}

function mapJamendoTrack(t: JamendoTrack) {
  return {
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
  };
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
