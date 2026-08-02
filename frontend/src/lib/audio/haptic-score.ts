"use client";

/* Haptic Score татах/кэшлэх — Python worker-ийн (backend/worker) бэлдсэн 8-бүсийн
   фрэйм дараалал. `useHapticEngine`-ийн frame-index scheduler үүнийг уншиж, тоглуулах
   явцад дахин FFT тооцоолохгүйгээр 8 бүсийн энергийг шууд DOM-д буулгана.

   Кэш нь module-level Map (in-memory, session доторх л) — том (~1-5MB) JSON-ыг
   дуу бүрт ганц удаа татна, дараа нь дахин тоглуулахад сүлжээ дуудахгүй. */
import type { HapticScore } from "@/types/song";

const cache = new Map<string, Promise<HapticScore | null>>();

/** `scoreUrl`-аар Score-ыг татаж, амжилтгүй бол `null` буцаана (алдаа шидэхгүй —
 *  дуудагч тал үргэлж 3-бүсийн real-time fallback руу шилжих боломжтой байх ёстой). */
export function loadHapticScore(scoreUrl: string): Promise<HapticScore | null> {
  const cached = cache.get(scoreUrl);
  if (cached) return cached;

  const promise = fetch(scoreUrl)
    .then((res) => {
      if (!res.ok) throw new Error(`Score татахад алдаа: ${res.status}`);
      return res.json() as Promise<HapticScore>;
    })
    .catch(() => null);

  cache.set(scoreUrl, promise);
  return promise;
}

/** Тухайн секундэд харгалзах фрэймийн индексийг олно (clamp хийж хамгаалдаг). */
export function frameIndexAt(score: HapticScore, currentTime: number): number {
  const idx = Math.floor(currentTime * score.sampleRate);
  return Math.max(0, Math.min(score.frames.length - 1, idx));
}

/** Session доторх санах ойг чөлөөлөх шаардлагатай үед (ховор, тест зориулалттай). */
export function clearHapticScoreCache(): void {
  cache.clear();
}
