"use client";

import { useCallback } from "react";
import { scoreRecommendations } from "@/lib/player/recommendations";
import type { PlayerTrack } from "@/types/player";
import type { ListeningStats } from "@/types/track";

/* "ДАРААГИЙН дуу юу байх вэ" гэдэг сонголтын бодлого.

   `useAudioPlayback` нь ЯАЖ тоглуулахыг мэднэ; энэ hook нь ЮУГ тоглуулахыг шийднэ.
   Хоёрыг салгаснаар санал болголтын дүрэм өөрчлөгдөхөд аудио механикт хүрэх
   шаардлагагүй болно. */

export interface PlayerQueue {
  /** Жагсаалтын дагуу урагш/хойш (±1). */
  step: (direction: number) => void;
  /** Дуу дуусахад — хамгийн өндөр оноотой AI-санал, олдохгүй бол дараагийн дуу. */
  next: () => void;
}

export function usePlayerQueue({
  allTracks,
  currentRef,
  play,
  stats,
  likedIds,
  savedIds,
  recentTracks,
}: {
  allTracks: PlayerTrack[];
  currentRef: React.MutableRefObject<PlayerTrack | null>;
  play: (track: PlayerTrack) => void;
  stats: ListeningStats | null;
  likedIds: (number | string)[];
  savedIds: (number | string)[];
  recentTracks: PlayerTrack[];
}): PlayerQueue {
  const step = useCallback(
    (direction: number) => {
      const current = currentRef.current;
      if (!current || allTracks.length === 0) return;
      const index = allTracks.findIndex((t) => t.id === current.id);
      play(allTracks[(index + direction + allTracks.length) % allTracks.length]);
    },
    [allTracks, currentRef, play],
  );

  /* Дуу дуусахад (autoplay) шат амьд index-ийн оронд хамгийн өндөр оноотой AI-санал
     болгосон дууг тоглуулна — `play()` өөрчлөгдөөгүй, зөвхөн "юуг сонгох вэ" гэдэг
     сонголтын логик өөр. Санал болгоход тохирох дуу олдохгүй бол (өгөгдөл дутуу)
     хуучин index-based fallback руу ордог. */
  const next = useCallback(() => {
    const current = currentRef.current;
    const recommendations = scoreRecommendations(allTracks, {
      stats,
      likedIds,
      savedIds,
      recentTracks,
      excludeIds: current ? [current.id] : [],
      limit: 1,
    });
    if (recommendations[0]) {
      play(recommendations[0].track);
      return;
    }
    step(1);
  }, [allTracks, currentRef, likedIds, play, recentTracks, savedIds, stats, step]);

  return { step, next };
}
