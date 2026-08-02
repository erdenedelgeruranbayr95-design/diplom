import type { SongLicense } from "@/types/song";

/* Upload формуудад (UploadSongView, SongLibraryPanel, Curator) нэг л газар — backend-ийн
   SongLicense enum-тай яг тохирсон 6 сонголт, Монгол тайлбартай. */
export const LICENSE_OPTIONS: { value: SongLicense; label: string }[] = [
  { value: "ORIGINAL", label: "Өөрийн бүтээл (эзэмшигч)" },
  { value: "CC0", label: "CC0 — Нийтийн өмч" },
  { value: "CC_BY", label: "CC BY — Attribution" },
  { value: "CC_BY_SA", label: "CC BY-SA — Attribution-ShareAlike" },
  { value: "CC_BY_NC", label: "CC BY-NC — Attribution-NonCommercial" },
  { value: "LICENSED", label: "Гэрээт лиценз (эх сурвалж заавал)" },
];
