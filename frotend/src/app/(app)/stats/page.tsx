"use client";

import StatsView from "@/components/player/StatsView";
import { Empty } from "@/components/ui/States";
import { usePlayer } from "@/components/providers/PlayerProvider";

export default function StatsPage() {
  const p = usePlayer();
  if (!p.stats) return <Empty icon="📊" title="Статистик алга" hint="Дуу сонсож эхлэхэд энд цуглана" />;
  return <StatsView stats={p.stats} byId={p.byId} onPlay={p.playTrack} onBack={() => p.goTo("home")} />;
}
