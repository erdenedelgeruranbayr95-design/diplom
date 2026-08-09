import type { PlayerTrack } from "@/types/player";

/* Нүүр хуудасны нэмэлт 3 секцийн ангилал: сүүлд сонссон, жанраар, шинээр нэмэгдсэн. */

/** Хамгийн олон дуутай жанрын нэрийг буцаана (rail-ын гарчигт ашиглана). */
export function topGenre(tracks: PlayerTrack[]): string | null {
  const counts: Record<string, number> = {};
  for (const track of tracks) {
    if (!track.genre) continue;
    counts[track.genre] = (counts[track.genre] ?? 0) + 1;
  }
  const entries = Object.entries(counts);
  if (entries.length === 0) return null;
  return entries.sort((a, b) => b[1] - a[1])[0][0];
}

/** Заасан жанрын дуунууд. */
export function pickByGenre(tracks: PlayerTrack[], genre: string): PlayerTrack[] {
  return tracks.filter((track) => track.genre === genre);
}

/** Хамгийн сүүлд каталогт нэмэгдсэн дуунууд (`added` timestamp-аар эрэмбэлнэ). */
export function pickRecentlyAdded(tracks: PlayerTrack[], limit = 12): PlayerTrack[] {
  return [...tracks]
    .filter((track) => track.added != null)
    .sort((a, b) => (b.added ?? 0) - (a.added ?? 0))
    .slice(0, limit);
}
