"use client";

import { useEffect } from "react";
import { saveStats, todayKey } from "@/lib/data/library";
import type { PlayerTrack } from "@/types/player";
import type { ListeningStats } from "@/types/track";

/* Сонсолтын статистик — секунд тутам хуримтлуулж, 5 секунд тутам localStorage-д хадгална.

   `statsRef` нь ЗОРИУДААР ref (state биш): секундэд нэг setState хийвэл Player бүхэлдээ
   дахин зурагдана. Хадгалалт нь unmount/зогсох үед бас нэг удаа явна — сүүлийн
   секундүүд алдагдахгүй. */
export function useListeningStats({
  enabled,
  playing,
  email,
  statsRef,
  currentRef,
}: {
  enabled: boolean;
  playing: boolean;
  email: string;
  statsRef: React.MutableRefObject<ListeningStats | null>;
  currentRef: React.MutableRefObject<PlayerTrack | null>;
}): void {
  useEffect(() => {
    if (!enabled || !playing || !email) return;
    let ticks = 0;
    /* Cleanup дотор ref-ийг шууд уншихгүй — эдгээр нь тогтвортой ref объектууд тул
       effect-ийн эхэнд нэг удаа хувилж авна (react-hooks/exhaustive-deps). */
    const stats0 = statsRef;
    const interval = setInterval(() => {
      const stats = stats0.current;
      const track = currentRef.current;
      if (!stats || !track) return;
      stats.total++;
      stats.byGenre[track.genre] = (stats.byGenre[track.genre] || 0) + 1;
      stats.byTrack[track.id] = (stats.byTrack[track.id] || 0) + 1;
      const day = todayKey();
      stats.days[day] = (stats.days[day] || 0) + 1;
      if (++ticks % 5 === 0) saveStats(email, stats);
    }, 1000);

    return () => {
      clearInterval(interval);
      const latest = stats0.current;
      if (latest) saveStats(email, latest);
    };
    // statsRef/currentRef нь тогтвортой ref объектууд
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, playing, email]);
}
