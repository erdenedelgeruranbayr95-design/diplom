"use client";

import HistoryView from "@/components/player/HistoryView";
import { usePlayer } from "@/components/providers/PlayerProvider";

export default function HistoryPage() {
  const p = usePlayer();
  return <HistoryView onBack={() => p.goTo("home")} onOpenAnalysis={p.openAnalysis} />;
}
