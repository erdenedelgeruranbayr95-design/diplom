"use client";

import LibraryView from "@/components/player/LibraryView";
import { usePlayer } from "@/components/providers/PlayerProvider";

export default function LikedPage() {
  const p = usePlayer();
  return (
    <LibraryView
      title="Дуртай дуунууд"
      tracks={p.likedTracks}
      curId={p.cur?.id ?? null}
      playing={p.playing}
      onPlay={p.playTrack}
      likes={p.likes}
      saves={p.saves}
      onToggleLike={p.toggleLike}
      onToggleSave={p.toggleSave}
      onInfo={p.openDetail}
      onBack={() => p.goTo("home")}
      emptyIcon="♥"
      emptyTitle="Дуртай дуу алга"
      emptyHint="Дуу дээрх зүрхэн товчийг дарж дуртай дуугаа энд цуглуулаарай"
    />
  );
}
