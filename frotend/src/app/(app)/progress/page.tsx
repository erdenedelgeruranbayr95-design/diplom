"use client";

import ProgressView from "@/components/player/ProgressView";
import { usePlayer } from "@/components/providers/PlayerProvider";

export default function ProgressPage() {
  const p = usePlayer();
  return <ProgressView onBack={() => p.goTo("home")} />;
}
