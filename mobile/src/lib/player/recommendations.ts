import type { ListeningStats } from "@/types";

/* Вэбийн `frontend/src/lib/player/recommendations.ts`-ээс хуулагдсан. DOM-оос
   хамааралгүй цэвэр тооцоолол тул логик нэг ч мөр өөрчлөгдөөгүй — зөвхөн
   `Scorable.artist` нь `string | null` -ыг ч хүлээж авахаар өргөжсөн (backend
   `null` буцаадаг, вэб дотоод хэлбэртээ `undefined` болгодог байсан).

   Backend endpoint шинээр зохиогүй: одоо байгаа өгөгдлийг л ашиглана —
   `ListeningStats.byGenre/byTrack`, likes/saves, сүүлд сонссон дуунууд.
   Тайлбар (reason) бүр өгөгдлөөс шууд гарна — хуурамч шалтгаан бичихгүй. */

export interface Scorable {
  id: number | string;
  title: string;
  artist?: string | null;
  /** `null` байж болно — backend-ийн `genre` нь заавал биш талбар. */
  genre: string | null;
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
  frequency: 14, // stats.byTrack — тухайн дууг өмнө сонссон эсэх (багахан bonus)
  saved: 10, // saves-д байгаа өөр дуутай ижил genre
};

/** stats.byGenre-ийг [0,1] хооронд normalize хийнэ — хамгийн их секундтэй genre = 1. */
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

  /* ⚠️ Төрөлгүй (`null`) дууг эдгээр олонлогт ОРУУЛАХГҮЙ.
     Jamendo-гоос импортолсон 30 дуу бүгд `genre: null`. Хэрэв null-ыг оруулбал
     `likedGenres.has(null)` нь тэдгээрийн БҮГДЭД нь `true` буцааж, "Таны дуртай
     дуутай төстэй төрөл" гэсэн ХУДАЛ шалтгаан үүсгэнэ — энэ файлын өөрийнх нь
     зарчим ("хуурамч шалтгаан бичихгүй") зөрчигдөнө. */
  const genreOf = (x: Scorable) => x.genre || null;
  const likedGenres = new Set(
    candidates.filter((c) => likedSet.has(c.id)).map(genreOf).filter((g): g is string => !!g),
  );
  const savedGenres = new Set(
    candidates.filter((c) => savedSet.has(c.id)).map(genreOf).filter((g): g is string => !!g),
  );
  const recentGenres = new Set(
    recentTracks.slice(0, 3).map(genreOf).filter((g): g is string => !!g),
  );
  const topGenreEntry = stats ? Object.entries(stats.byGenre).sort((a, b) => b[1] - a[1])[0] : undefined;
  const topGenre = topGenreEntry?.[0];

  const results: Recommendation<T>[] = [];

  for (const c of candidates) {
    if (excludeSet.has(c.id)) continue;
    // Аль хэдийн дуртай/хадгалсан дууг дахин "санал болгохгүй".
    if (likedSet.has(c.id) || savedSet.has(c.id)) continue;

    let score = 0;
    const reasons: string[] = [];

    /* Төрөлгүй дуу бол төрөлд суурилсан бүх оноог алгасана — тэр нь мэдээлэл
       байхгүйг л илэрхийлнэ, "ижил төрөл" гэсэн үг биш. */
    const genre = c.genre || null;

    const affinity = genre ? byGenreNorm[genre] || 0 : 0;
    if (affinity > 0) {
      score += affinity * WEIGHTS.genreAffinity;
      if (topGenre === genre) {
        reasons.push("Сүүлийн үед хамгийн их сонссон жанр");
      } else if (affinity > 0.35) {
        reasons.push("Та өмнө нь ийм төрлийн хөгжим их сонссон");
      }
    }

    if (genre && likedGenres.has(genre)) {
      score += WEIGHTS.favorite;
      reasons.push("Таны дуртай дуутай төстэй төрөл");
    }
    if (genre && savedGenres.has(genre)) {
      score += WEIGHTS.saved;
      if (!reasons.some((r) => r.includes("төстэй төрөл"))) reasons.push("Таны хадгалсан дуутай төстэй");
    }
    if (genre && recentGenres.has(genre)) {
      score += WEIGHTS.recentGenre;
      reasons.push("Өмнөх сонссон дуутай төстэй");
    }

    const trackSec = byTrack[String(c.id)] || 0;
    if (trackSec > 0) {
      score += (trackSec / maxTrackSec) * WEIGHTS.frequency;
    }

    if (genre && /тайван|чилл|эмбиент|relax/i.test(genre)) {
      reasons.push("Тайвшруулах төрөл");
    }

    // Өгөгдлийн холбоогүй дууг санал болгохгүй — хуурамч шалтгаан үүсгэхгүй.
    if (score <= 0) continue;

    results.push({ track: c, score: Math.round(score * 10) / 10, reasons: [...new Set(reasons)].slice(0, 2) });
  }

  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}
