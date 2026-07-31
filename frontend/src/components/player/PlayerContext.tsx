"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { PlayerTrack, ViewName } from "@/types/player";

/* Дууны мөр/картын үйлдлүүдийн нийтлэг контекст — prop drilling-ийг таслах зорилготой.

   Урьд нь ЯГ ижил 8 prop (`curId`, `playing`, `onPlay`, `likes`, `saves`,
   `onToggleLike`, `onToggleSave`, `onInfo`) Player → HomeView → TrackRail → TrackCard,
   Player → Sidebar → SideList, Player → LibraryView, Player → ArtistView,
   Player → PlaylistsView гэсэн 5 салаагаар дамжиж байв. Дунд давхаргууд эдгээрийг
   ЗӨВХӨН цааш нь дамжуулахын тулд өөрсдийн интерфейст оруулж, өөрчлөлт бүр 4-5
   файлыг хөндөж байсан.

   Одоо `Player` нэг л удаа нийлүүлж, хэрэглэгч нь шууд `useTrackActions()`-оор авна. */

export interface TrackActions {
  /** Одоо тоглож буй дууны id (эсвэл null). */
  currentId: number | string | null;
  playing: boolean;
  likedIds: (number | string)[];
  savedIds: (number | string)[];
  play: (track: PlayerTrack) => void;
  toggleLike: (id: number | string) => void;
  toggleSave: (id: number | string) => void;
  /** Дэлгэрэнгүй хуудас руу шилжих. */
  openDetail: (track: PlayerTrack) => void;
  /** Уран бүтээлчийн хуудас руу шилжих. */
  openArtist: (artistId: string) => void;
  /** Тоглуулагчийн дэлгэц солих. */
  setView: (view: ViewName) => void;
}

const TrackActionsCtx = createContext<TrackActions | null>(null);

export function TrackActionsProvider({ value, children }: { value: TrackActions; children: ReactNode }) {
  /* Утгууд бүгд Player-ийн `useCallback`/state тул энэ memo нь зөвхөн объектын
     ижил төрхийг барина — хэрэглэгч компонентууд шалтгаангүй дахин зурагдахгүй. */
  const memoized = useMemo(
    () => value,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      value.currentId,
      value.playing,
      value.likedIds,
      value.savedIds,
      value.play,
      value.toggleLike,
      value.toggleSave,
      value.openDetail,
      value.openArtist,
      value.setView,
    ],
  );
  return <TrackActionsCtx.Provider value={memoized}>{children}</TrackActionsCtx.Provider>;
}

/** Дууны карт/мөр зурдаг аль ч компонентод хэрэглэнэ. */
export function useTrackActions(): TrackActions {
  const ctx = useContext(TrackActionsCtx);
  if (!ctx) throw new Error("useTrackActions-ийг TrackActionsProvider дотор ашиглана уу");
  return ctx;
}

/** Тухайн дуу одоо тоглож байгаа эсэх — 6 газар давтагдаж байсан жижиг дүрэм. */
export function useIsPlayingTrack(id: number | string): { isCurrent: boolean; isPlaying: boolean } {
  const { currentId, playing } = useTrackActions();
  const isCurrent = currentId === id;
  return { isCurrent, isPlaying: isCurrent && playing };
}
