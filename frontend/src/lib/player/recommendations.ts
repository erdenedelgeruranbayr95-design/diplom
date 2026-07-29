"use client";

/* Frontend-only "AI санал болгох" scoring — backend endpoint шинээр зохиомжлоогүй,
   зөвхөн одоо байгаа өгөгдлийг ашиглана: ListeningStats.byGenre/byTrack (Player.tsx-ийн
   секунд тутмын accumulate), likes/saves (id жагсаалт), recentTracks (сүүлд тоглуулсан,
   session-based). Тайлбар (reason) бүр өгөгдлөөс шууд гарна — хуурамч шалтгаан бичихгүй. */
import type { ListeningStats } from "@/types/track";

export interface Scorable {
  id: number | string;
  title: string;
  artist?: string;
  genre: string;
}

export interface Recommendation<T extends Scorable> {
  track: T;
  score: number;
  reasons: string[];
}

const WEIGHTS = {
  genreAffinity: 34, // stats.byGenre — хамгийн их сонссон төрөл рүү хамгийн их жин
  favorite: 22, // likes-д байгаа өөр дуутай ижил genre
  recentGenre: 16, // сүүлд тоглуулсан дуутай ижил genre
  frequency: 14, // stats.byTrack — тухайн дууг өөрийг нь өмнө сонссон эсэх (дахин санал болгохгүй өндөр жин биш, багахан bonus)
  saved: 10, // saves-д байгаа өөр дуутай ижил genre
  novelty: -8, // curId/аль хэдийн тоглуулсан их удаа бол бага зэрэг хорих (сонголтын олон талт байдал)
};

/* stats.byGenre-ийг [0,1] хооронд normalize хийнэ — хамгийн их секундтэй genre = 1. */
function normalizeGenreAffinity(byGenre: Record<string, number>): Record<string, number> {
  const max = Math.max(1, ...Object.values(byGenre));
  const out: Record<string, number> = {};
  for (const [g, sec] of Object.entries(byGenre)) out[g] = sec / max;
  return out;
}

export function scoreRecommendations<T extends Scorable>(
  candidates: T[],
  opts: {
    stats: ListeningStats | null | undefined;
    likedIds: (number | string)[];
    savedIds: (number | string)[];
    recentTracks: T[];
    excludeIds?: (number | string)[];
    limit?: number;
  },
): Recommendation<T>[] {
  const { stats, likedIds, savedIds, recentTracks, excludeIds = [], limit = 10 } = opts;
  const excludeSet = new Set(excludeIds);
  const likedSet = new Set(likedIds);
  const savedSet = new Set(savedIds);
  const byGenreNorm = stats ? normalizeGenreAffinity(stats.byGenre) : {};
  const byTrack = stats?.byTrack || {};
  const maxTrackSec = Math.max(1, ...Object.values(byTrack));

  const likedGenres = new Set(candidates.filter((c) => likedSet.has(c.id)).map((c) => c.genre));
  const savedGenres = new Set(candidates.filter((c) => savedSet.has(c.id)).map((c) => c.genre));
  const recentGenres = new Set(recentTracks.slice(0, 3).map((t) => t.genre));
  const topGenreEntry = stats ? Object.entries(stats.byGenre).sort((a, b) => b[1] - a[1])[0] : undefined;
  const topGenre = topGenreEntry?.[0];

  const results: Recommendation<T>[] = [];

  for (const c of candidates) {
    if (excludeSet.has(c.id)) continue;
    if (likedSet.has(c.id) || savedSet.has(c.id)) continue; // аль хэдийн дуртай/хадгалсан дууг дахин "санал болгохгүй"

    let score = 0;
    const reasons: string[] = [];

    const affinity = byGenreNorm[c.genre] || 0;
    if (affinity > 0) {
      score += affinity * WEIGHTS.genreAffinity;
      if (topGenre === c.genre) {
        reasons.push("Сүүлийн үед хамгийн их сонссон жанр");
      } else if (affinity > 0.35) {
        reasons.push("Та өмнө нь ийм төрлийн хөгжим их сонссон");
      }
    }

    if (likedGenres.has(c.genre)) {
      score += WEIGHTS.favorite;
      reasons.push("Таны дуртай дуутай төстэй төрөл");
    }
    if (savedGenres.has(c.genre)) {
      score += WEIGHTS.saved;
      if (!reasons.some((r) => r.includes("төстэй төрөл"))) reasons.push("Таны хадгалсан дуутай төстэй");
    }
    if (recentGenres.has(c.genre)) {
      score += WEIGHTS.recentGenre;
      reasons.push("Өмнөх сонссон дуутай төстэй");
    }

    const trackSec = byTrack[String(c.id)] || 0;
    if (trackSec > 0) {
      score += (trackSec / maxTrackSec) * WEIGHTS.frequency;
    }

    if (/тайван|чилл|эмбиент|relax/i.test(c.genre)) {
      reasons.push("Тайвшруулах төрөл");
    }

    if (score <= 0) continue; // өгөгдөлгүй холбоо байхгүй candidate-ийг санал болгохгүй (хуурамч reason үүсгэхгүй)

    results.push({ track: c, score: Math.round(score * 10) / 10, reasons: [...new Set(reasons)].slice(0, 2) });
  }

  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}
