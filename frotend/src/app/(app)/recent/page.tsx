"use client";

import LibraryView from "@/components/player/LibraryView";
import { usePlayer } from "@/components/providers/PlayerProvider";

export default function RecentPage() {
  const p = usePlayer();
  return (
    <LibraryView
      title="Саяхан сонссон"
      tracks={p.recentTracks}
      curId={p.cur?.id ?? null}
      playing={p.playing}
      onPlay={p.playTrack}
      likes={p.likes}
      saves={p.saves}
      onToggleLike={p.toggleLike}
      onToggleSave={p.toggleSave}
      onInfo={p.openDetail}
      onBack={() => p.goTo("home")}
      emptyIcon="🕐"
      emptyTitle="Түүх хоосон"
      emptyHint="Дуу сонсоход энд сонссон түүх чинь үлдэнэ"
    />
  );
}
