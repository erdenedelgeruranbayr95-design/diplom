"use client";

import BrowseView from "@/components/player/BrowseView";
import { usePlayer } from "@/components/providers/PlayerProvider";

export default function BrowsePage() {
  const p = usePlayer();
  return (
    <BrowseView
      genres={p.GENRES}
      genre={p.genre}
      onGenre={p.setGenre}
      list={p.list}
      query={p.query}
      curId={p.cur?.id ?? null}
      playing={p.playing}
      onPlay={p.playTrack}
      likes={p.likes}
      saves={p.saves}
      onToggleLike={p.toggleLike}
      onToggleSave={p.toggleSave}
      onInfo={p.openDetail}
    />
  );
}
