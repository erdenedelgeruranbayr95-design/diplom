/* Вэбийн `frontend/src/types/`-ээс хуулагдсан домэйн төрлүүд. Эдгээр нь DOM-оос
   хамааралгүй цэвэр TypeScript тул RN-д ЯГ ХЭВЭЭР шилжинэ — backend-ийн хариутай
   гэрээ нэг хэвээр үлдэнэ. Вэб дээр төрөл өөрчлөгдвөл ЭНД БАС засна. */

export type UserRole = "ROOT" | "ADMIN" | "CURATOR" | "MODERATOR" | "THERAPIST" | "USER" | "PARENT";
export type UserStatus = "ACTIVE" | "BANNED";
export type HearingProfile = "deaf" | "hoh" | "hearing";

export interface UserSub {
  active: boolean;
  plan: string | null;
  since: string | null;
  renews: string | null;
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarColor: string | null;
  hearingProfile: string | null;
  sub: UserSub | null;
}

export interface Track {
  id: number | string;
  title: string;
  artist?: string;
  singer?: string;
  composer?: string;
  genre: string;
  file?: string;
  cover?: string;
  hasCover?: boolean;
  coverUrl?: string;
  added?: number;
}

export type PlayerTrack = Track & {
  custom?: boolean;
  songId?: string;
  artistId?: string;
  description?: string;
  lyrics?: string;
  releaseYear?: number;
  duration?: number;
};

/** `GET /me/library` — дуртай/хадгалсан дууны ID-ууд (бодитоор баталгаажсан). */
export interface LibraryState {
  likedIds: string[];
  savedIds: string[];
}

/** `GET /me/stats`. `vib` нь чичиргээний тоо — энэ аппын гол хэмжүүр. */
export interface ListeningStats {
  total: number;
  vib: number;
  byGenre: Record<string, number>;
  byTrack: Record<string, number>;
  days: Record<string, number>;
}

export interface PlaylistTrack {
  id: string;
  songId: string;
  position: number;
}

export interface Playlist {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
  tracks: PlaylistTrack[];
}

export type TrackAction = "LIKE" | "SAVE";

/** `GET /me/sensory-profile` — СЕРВЕРТ хадгалагдах калибровк, вэб болон утас
 *  хооронд дагана. Профайл үүсээгүй бол backend өгөгдмөл утга буцаана. */
export interface SensoryProfile {
  vibLevel: number;
  lightLevel: number;
  bands: { bass: boolean; mid: boolean; high: boolean };
  deviceMap: Record<string, string> | null;
  calibrated: boolean;
}

/** `GET /history` -ийн мөр. `song` нь зөвхөн хэдэн талбартай хураангуй
 *  (backend/src/history/history.service.ts дэх `select`). */
export interface HistoryRow {
  id: string;
  songId: string;
  playedAt: string;
  durationMs: number | null;
  bpm: number | null;
  vibrations: boolean | null;
  device: string | null;
  song: {
    id: string;
    title: string;
    artist: string | null;
    genre: string;
    fileUrl: string | null;
  };
}

export interface HistoryPage {
  items: HistoryRow[];
  total: number;
}

/** `GET /users` (@Roles(ADMIN)) -ийн мөр. Талбарууд backend-ийн хариунаас
 *  бодитоор баталгаажсан. */
export interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  lastLoginAt: string | null;
  subActive: boolean;
  subPlan: string | null;
}

/** `GET /artists` (@Public). ⚠️ `photoUrl` нь бүх дуучинд ХООСОН (шалгасан) —
 *  UI зургийн оронд тухайн дуучны дууны ковер эсвэл нэрийн эхний үсгийг харуулна. */
export interface Artist {
  id: string;
  name: string;
  bio: string | null;
  careerInfo: string | null;
  photoUrl: string | null;
  createdAt: string;
  _count?: { songs: number };
}

/* `GET /api/songs` (@Public) -ийн ЖИНХЭНЭ хариу. Вэбийн `PlayerTrack` нь энэ хариуг
   дотооддоо хөрвүүлсэн хэлбэр (`file`, `cover` гэх мэт богино нэртэй) — мобайл дээр
   нэмэлт давхарга үүсгэхгүйгээр серверийн талбаруудыг ШУУД ашиглана.

   Чичиргээнд хэрэгтэй талбарууд: `bpm`/`analyzedBpm` (хэмнэл), `beatTimestamps`
   (цохилт бүрийн мс), `bandEnergies` (8 бүсийн эрчим), `scoreUrl` (бүрэн Haptic Score).
   `analysisStatus` нь дуу шинжлэгдэж дууссан эсэхийг заана — дуусаагүй бол
   чичиргээ өгөх өгөгдөл байхгүй. */
export interface Song {
  id: string;
  title: string;
  artist: string | null;
  artistId: string | null;
  /* ⚠️ `null` БАЙЖ БОЛНО. Prisma-д `genre String?` тул backend `null` буцаадаг.
     Урьд нь энд `string` гэж зарласан байсан — seed хийсэн 21 дуу бүгд төрөлтэй
     байсан тул алдаа илрээгүй. Jamendo-гоос 30 дуу импортлоход тэдгээрийн төрөл
     хоосон ирж, `s.genre.toLowerCase()` (хайлт) АПП УНАГААХ болсон. */
  genre: string | null;
  description: string | null;
  lyrics: string | null;
  releaseYear: number | null;
  coverUrl: string | null;
  coverThumbUrl: string | null;
  fileUrl: string | null;
  hlsUrl: string | null;
  duration: number | null;
  bpm: number | null;
  analyzedBpm: number | null;
  beatCount: number | null;
  beatTimestamps: number[] | null;
  bandEnergies: number[] | null;
  waveformPeaks: number[] | null;
  scoreUrl: string | null;
  /** Цохилт бүрийн эрчим (0..1) — `beatTimestamps`-тай ижил урттай.
   *
   *  Урьд нь эдгээрийг `scoreUrl` дээрх 2.6 MB файлыг татаж, утсан дээр бодож
   *  гаргадаг байсан. Гэвч worker нь Score-оо ӨӨРИЙН дискэнд бичдэг тул үүлэн
   *  дээрх backend түүнийг үйлчилж чаддаггүй (404) — үр дүнд нь бүх цохилт ижил
   *  мэдрэгддэг байв. Одоо сервер урьдчилан бодож DB-д хадгална. */
  beatIntensity: number[] | null;
  /** Цохилт бүрийн өнгө (0 = гүн бас, 1 = хурц таваг). */
  beatBrightness: number[] | null;
  /** Онсет — аливаа шинэ авиа эхлэх мөч (нот, гитарын цохилт, дуучны үг).
   *  Цохилтоос 3–6 дахин олон; ШҮҮГДЭЭГҮЙ ирнэ, клиент тал зайн шаардлагаар
   *  шүүнэ (см. `lib/player/haptic-track.ts`). */
  onsetTimestamps: number[] | null;
  onsetIntensity: number[] | null;
  onsetBrightness: number[] | null;
  /** Хөгжмийн түлхүүр (жиш. "G# minor") — worker-ийн chroma шинжилгээнээс. */
  musicalKey: string | null;
  analysisStatus: SongAnalysisStatus;
  /** Шинжилгээ амжилтгүй болсон шалтгаан (`analysisStatus === "FAILED"` үед). */
  analysisError: string | null;
  /** `enum SongLicense` — CC_BY · CC_BY_SA · CC_BY_NC · CC0 · ORIGINAL · LICENSED */
  license: string | null;
  licenseSrc: string | null;
  featured: boolean;
  published: boolean;
}

/** backend/prisma/schema.prisma → `enum SongAnalysisStatus`. Зөвхөн `READY` үед
 *  `beatTimestamps`/`bandEnergies`/`scoreUrl` бөглөгдсөн байна. */
export type SongAnalysisStatus = "PENDING" | "PROCESSING" | "READY" | "FAILED";
