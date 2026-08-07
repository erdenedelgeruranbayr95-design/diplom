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

export interface Artist {
  id: string;
  name: string;
  bio?: string | null;
  careerInfo?: string | null;
  songCount?: number;
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
  genre: string;
  description: string | null;
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
  analysisStatus: SongAnalysisStatus;
  featured: boolean;
  published: boolean;
}

/** backend/prisma/schema.prisma → `enum SongAnalysisStatus`. Зөвхөн `READY` үед
 *  `beatTimestamps`/`bandEnergies`/`scoreUrl` бөглөгдсөн байна. */
export type SongAnalysisStatus = "PENDING" | "PROCESSING" | "READY" | "FAILED";
