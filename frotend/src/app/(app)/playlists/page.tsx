"use client";

import PlaylistsView from "@/components/player/PlaylistsView";
import { usePlayer } from "@/components/providers/PlayerProvider";

export default function PlaylistsPage() {
  const p = usePlayer();
  return (
    <PlaylistsView
      email={p.email}
      tracks={p.ALL}
      onPlay={p.playTrack}
      curId={p.cur?.id ?? null}
      playing={p.playing}
      onBack={() => p.goTo("home")}
    />
  );
}
