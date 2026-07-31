import type { VizMode } from "@/lib/player/visualizer-modes";
import type { Track } from "@/types/track";

/* Тоглуулагчийн доторх домэйн төрлүүд.

   Урьд нь `PlayerTrack` / `ViewName` / `Prefs` гурав нь `components/player/Player.tsx`
   дотор зарлагдаж, TopBar · Sidebar · HomeView · DetailView · ArtistView · PlayerHeader ·
   ProfileDropdown · SettingsDropdown бүгд ТОМ компонентоос төрөл импортлодог байв —
   өөрөөр хэлбэл давхаргын доод хэсэг нь дээд хэсгээсээ хамаарч, import граф нь
   тойрог үүсгэх ирмэг дээр байсан. Одоо төрлүүд UI-гүй энэ модульд амьдарна. */

/** Тоглуулагч дотор ашиглагдах дуу — статик каталог, backend Song, IndexedDB-ийн
 *  админы нэмсэн дуу гурвуулаа энэ нэг хэлбэрт хөрвөнө. */
export type PlayerTrack = Track & {
  custom?: boolean;
  songId?: string;
  artistId?: string;
  description?: string;
  releaseYear?: number;
  duration?: number;
};

/** Тоглуулагчийн үндсэн хэсгийн (PageContainer доторх) идэвхтэй дэлгэц. */
export type ViewName =
  | "home"
  | "stats"
  | "billing"
  | "help"
  | "detail"
  | "artist"
  | "admin"
  | "profile"
  | "devices"
  | "playlists"
  | "liked"
  | "saved"
  | "recent"
  | "analysis"
  | "history"
  | "therapist"
  | "progress"
  | "achievements"
  | "parent"
  | "upload";

/** Мэдрэх горимын визуалайзерын тохиргоо. */
export interface VizPrefs {
  mode: VizMode;
  particles: boolean;
  glow: number;
}

/** Хэрэглэгчийн тохиргоо — localStorage-д `medreh_prefs:<email>` түлхүүрээр хадгалагдана. */
export interface Prefs {
  vib: number;
  light: number;
  bands: Record<string, boolean>;
  calibrated: boolean;
  deviceMap?: Record<string, string>;
  viz?: VizPrefs;
  theme?: "dark" | "light";
  language?: "mn" | "en";
  notifyFeed?: boolean;
  reducedMotion?: boolean;
  largeText?: boolean;
}

/** Мэдрэхүйн калибровкийн үр дүн (Calibrate → updatePrefs). */
export interface CalibrationResult {
  vib: number;
  light: number;
  bands: Record<string, boolean>;
  calibrated: boolean;
}

/** Спектрийн 3 бүсийн агшин зуурын түвшин — RAF loop-оос бичигдэнэ. */
export interface BandLevels {
  lo: number;
  mi: number;
  hi: number;
}
