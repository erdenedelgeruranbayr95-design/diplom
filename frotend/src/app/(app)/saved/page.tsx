"use client";

import LibraryView from "@/components/player/LibraryView";
import { usePlayer } from "@/components/providers/PlayerProvider";

export default function SavedPage() {
  const p = usePlayer();
  return (
    <LibraryView
      title="Хадгалсан"
      tracks={p.savedTracks}
      curId={p.cur?.id ?? null}
      playing={p.playing}
      onPlay={p.playTrack}
      likes={p.likes}
      saves={p.saves}
      onToggleLike={p.toggleLike}
      onToggleSave={p.toggleSave}
      onInfo={p.openDetail}
      onBack={() => p.goTo("home")}
      emptyIcon="🔖"
      emptyTitle="Хадгалсан дуу алга"
      emptyHint="Дуу дээрх хавчуургыг дарж дараа сонсох дуугаа хадгалаарай"
    />
  );
}
