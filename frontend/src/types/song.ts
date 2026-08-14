/** Prisma enum `SongLicense` (backend/prisma/schema.prisma). */
export type SongLicense = "CC_BY" | "CC_BY_SA" | "CC_BY_NC" | "CC0" | "ORIGINAL" | "LICENSED";

export interface Artist {
  id: string;
  name: string;
  bio: string | null;
  careerInfo: string | null;
  photoUrl: string | null;
  createdAt: string;
  /** Админ баталгаажуулсан эсэх. Зөвхөн баталгаажсан нь дуу/цомог нэмнэ. */
  approved?: boolean;
  approvedAt?: string | null;
  /** Эзэн хэрэглэгч. `null` = админ гараар үүсгэсэн каталогийн бичлэг. */
  ownerId?: string | null;
  _count?: { songs: number; albums?: number };
}

export interface ArtistWithSongs extends Artist {
  songs: Song[];
}

/** Админы баталгаажуулах жагсаалтын мөр — эзний мэдээлэл хамт. */
export interface PendingArtist extends Artist {
  owner: { id: string; name: string; email: string; createdAt: string } | null;
}

/** Цомгийн доторх трек.
 *
 *  ⚠️ Бүтэн `Song` БИШ: `GET /artists/me/albums` нь ачааллыг багасгахын тулд
 *  цөөн талбар сонгож буцаадаг (`beatTimestamps` гэх мэт хүнд массивгүй).
 *  Бүтэн Song гэж бичвэл байхгүй талбар руу найдаж эвдэрнэ. */
export interface AlbumTrack {
  id: string;
  title: string;
  trackNumber: number | null;
  duration: number | null;
  coverUrl: string | null;
  analysisStatus?: string | null;
}

export interface Album {
  id: string;
  title: string;
  coverUrl: string | null;
  year: number | null;
  artistId: string;
  createdAt: string;
  songs?: AlbumTrack[];
  _count?: { songs: number };
}

export interface Song {
  id: string;
  title: string;
  artist: string | null;
  artistId: string | null;
  artistRef?: Artist | null;
  genre: string | null;
  description: string | null;
  lyrics: string | null;
  releaseYear: number | null;
  coverUrl: string | null;
  featured: boolean;
  fileUrl: string;
  duration: number | null;
  bpm: number | null;
  uploadedBy: string;
  createdAt: string;

  /** Цомгийн харьяалал. `trackNumber` нь цомог доторх дараалал (1-ээс). */
  albumId?: string | null;
  trackNumber?: number | null;
  /** Цомгийн нэр — жагсаалтын endpoint-ууд хайлтад зориулж хамт буцаана. */
  album?: { title: string } | null;

  analyzedBpm: number | null;
  beatCount: number | null;
  beatTimestamps: number[] | null;
  rms: number | null;
  peak: number | null;
  bassEnergy: number | null;
  midEnergy: number | null;
  trebleEnergy: number | null;
  bandEnergies: number[] | null; // 8 логарифм бүсийн энерги [0..1] — worker Haptic Score-той зах тохирсон
  waveformPeaks: number[] | null;
  analyzedAt: string | null;

  // ---- Haptic Score (Python worker: librosa STFT→8 бүс, onset, beat, chroma) ----
  fileHash: string | null;
  scoreUrl: string | null;
  analysisStatus: "PENDING" | "PROCESSING" | "READY" | "FAILED";
  analysisError: string | null;
  musicalKey: string | null;

  // ---- Лиценз · нийтлэл · ингест (Phase 5) ----
  license: SongLicense | null;
  licenseSrc: string | null;
  published: boolean;
  publishedAt: string | null;
  jamendoId: string | null;
  uploadConfirmed: boolean;

  // ---- HLS/AAC хөрвүүлэлт + ковер боловсруулалт (Phase 5, заавал биш баяжуулалт) ----
  hlsUrl: string | null;
  coverThumbUrl: string | null;
  coverMediumUrl: string | null;
  coverLargeUrl: string | null;
}

/** POST /songs/upload-url хариу — MinIO рүү шууд PUT хийх presigned URL. */
export interface UploadUrlResponse {
  uploadUrl: string;
  key: string;
  publicUrl: string;
}

/** PUT /songs/:id — эзэмшигч эсвэл CURATOR_ROLES дуудна. */
export interface UpdateSongPayload {
  title?: string;
  artist?: string;
  artistId?: string;
  genre?: string;
  description?: string;
  lyrics?: string;
  releaseYear?: number;
  coverUrl?: string;
  featured?: boolean;
  license?: SongLicense;
  licenseSrc?: string;
}

/** GET /songs/jamendo/search мөр бүр. */
export interface JamendoSearchResult {
  jamendoId: string;
  title: string;
  artist: string;
  album: string | null;
  duration: number | null;
  coverUrl: string | null;
  audioUrl: string;
  license: string | null;
  licenseSrc: string | null;
  releaseYear: number | null;
}

/** GET /songs/fma/search мөр бүр — Jamendo-той ижил хэлбэр, зөвхөн `jamendoId` → `fmaId`. */
export interface FmaSearchResult {
  fmaId: string;
  title: string;
  artist: string;
  album: string | null;
  duration: number | null;
  coverUrl: string | null;
  audioUrl: string;
  license: string | null;
  licenseSrc: string | null;
  releaseYear: number | null;
}

/** GET /storage/usage — ROOT/ADMIN. */
export interface StorageUsage {
  totalObjects: number;
  totalBytes: number;
  byPrefix: Record<string, { count: number; bytes: number }>;
  orphanCount: number;
  orphanBytes: number;
}

/** GET /uploads/scores/:songId.json — worker-ийн бичсэн Haptic Score файл. */
export interface HapticScoreFrame {
  /** 8 бүсийн энерги, тухайн фрэйм доторх 0..1 normalize утга. */
  b: number[];
  /** Onset илэрсэн эсэх (0 | 1). */
  o: 0 | 1;
  /** Beat илэрсэн эсэх (0 | 1). */
  beat: 0 | 1;
  /** RMS түвшин 0..1. */
  rms: number;
}

export interface HapticScore {
  sampleRate: number;
  bandEdgesHz: number[];
  durationSec: number;
  frames: HapticScoreFrame[];
}

export interface AnalyzeSongPayload {
  duration?: number;
  bpm?: number;
  beatCount?: number;
  beatTimestamps?: number[];
  rms?: number;
  peak?: number;
  bassEnergy?: number;
  midEnergy?: number;
  trebleEnergy?: number;
  bandEnergies?: number[];
  waveformPeaks?: number[];
}

export interface ListenHistoryRow {
  id: string;
  userId: string;
  songId: string;
  playedAt: string;
  durationMs: number | null;
  bpm: number | null;
  visualizerStyle: string | null;
  song: {
    id: string;
    title: string;
    artist: string | null;
    genre: string | null;
    fileUrl: string;
  };
}

export interface CreateHistoryPayload {
  songId: string;
  durationMs?: number;
  bpm?: number;
  visualizerStyle?: string;
}

export interface HistoryPage {
  items: ListenHistoryRow[];
  total: number;
}

export interface SensoryProfile {
  vibLevel: number;
  lightLevel: number;
  bands: Record<string, boolean>;
  deviceMap: Record<string, string> | null;
  calibrated: boolean;
}

export interface UpdateSensoryProfilePayload {
  vibLevel?: number;
  lightLevel?: number;
  bands?: Record<string, boolean>;
  deviceMap?: Record<string, string>;
  calibrated?: boolean;
}

export interface UserLibraryRow {
  likedIds: string[];
  savedIds: string[];
}

export interface ListeningStatsRow {
  total: number;
  vib: number;
  byGenre: Record<string, number>;
  byTrack: Record<string, number>;
  days: Record<string, number>;
}

export interface PaymentRow {
  id: string;
  userId: string;
  amount: string;
  currency: string;
  method: string;
  status: "SUCCESS" | "FAILED" | "PENDING";
  providerRef: string | null;
  plan: string | null;
  createdAt: string;
}

export interface PlaylistTrackRow {
  id: string;
  playlistId: string;
  songId: string;
  position: number;
  addedAt: string;
}

export interface PlaylistRow {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
  tracks: PlaylistTrackRow[];
}
