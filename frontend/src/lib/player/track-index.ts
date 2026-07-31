import type { PlayerTrack } from "@/types/player";

/* Дууны жагсаалтаас id-аар хайх туслахууд.

   `new Map(allTracks.map(t => [String(t.id), t]))` гэсэн мөр HomeView, ArtistView,
   DetailView, PlaylistsView-д тус тусдаа бичигдсэн, зарим нь `Map`, зарим нь
   `Array.find()` ашигладаг (том каталог дээр O(n²)) байв. */

/** id → track хайлтын Map. Backend id (string) болон статик id (number) хоёуланг барина. */
export function indexTracksById<T extends { id: number | string }>(tracks: T[]): Map<string, T> {
  return new Map(tracks.map((t) => [String(t.id), t]));
}

/** id-үүдийн жагсаалтыг бодит track болгож хөрвүүлнэ; олдоогүйг чимээгүй алгасна. */
export function resolveTracks<T extends { id: number | string }>(ids: (number | string)[], index: Map<string, T>): T[] {
  return ids.map((id) => index.get(String(id))).filter((t): t is T => !!t);
}

/** Хайлт/төрлийн шүүлт — Нүүр хуудасны хайлтын логик. */
export function filterTracks(tracks: PlayerTrack[], { genre, query }: { genre: string; query: string }): PlayerTrack[] {
  const term = query.trim().toLowerCase();
  return tracks.filter((t) => {
    if (genre !== ALL_GENRES && t.genre !== genre) return false;
    if (!term) return true;
    return (t.title + " " + t.artist + " " + t.genre).toLowerCase().includes(term);
  });
}

/** "Бүгд" — төрлөөр шүүхгүй гэдгийг илэрхийлэх утга. */
export const ALL_GENRES = "Бүгд";

/** Каталогоос давхардалгүй төрлийн жагсаалт (эхэнд нь "Бүгд"). */
export function collectGenres(tracks: PlayerTrack[]): string[] {
  return [ALL_GENRES, ...new Set(tracks.map((t) => t.genre))];
}
