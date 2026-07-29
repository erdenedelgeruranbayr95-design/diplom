"use client";

import AchievementsView from "@/components/player/AchievementsView";
import { usePlayer } from "@/components/providers/PlayerProvider";

export default function AchievementsPage() {
  const p = usePlayer();
  return <AchievementsView stats={p.stats} onBack={() => p.goTo("home")} />;
}
