"use client";

import HomeView from "@/components/player/HomeView";
import { usePlayer } from "@/components/providers/PlayerProvider";

export default function HomePage() {
  const p = usePlayer();
  return (
    <HomeView
      genres={p.GENRES}
      allTracks={p.ALL}
      curId={p.cur?.id ?? null}
      playing={p.playing}
      onPlay={p.playTrack}
      likes={p.likes}
      saves={p.saves}
      onToggleLike={p.toggleLike}
      onToggleSave={p.toggleSave}
      onInfo={p.openDetail}
      userName={p.user?.name}
      recentTracks={p.recentTracks}
      stats={p.stats}
      playlists={p.playlists}
      setView={p.goTo}
      onOpenGenre={(g) => {
        p.setGenre(g);
        p.goTo("browse");
      }}
      isAdmin={p.isAdmin}
      isTherapist={p.isTherapist}
      isParent={p.isParent}
    />
  );
}
