"use client";

import UploadSongView from "@/components/player/UploadSongView";
import { usePlayer } from "@/components/providers/PlayerProvider";

export default function UploadPage() {
  const p = usePlayer();
  return <UploadSongView onBack={() => p.goTo("home")} />;
}
