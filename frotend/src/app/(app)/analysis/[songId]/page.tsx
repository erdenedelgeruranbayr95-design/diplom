"use client";

/* Дууны анализ — өмнө нь `analysis` дотоод view байсныг бодит хаягтай болгов. */
import { use } from "react";
import AnalysisView from "@/components/player/AnalysisView";
import { usePlayer } from "@/components/providers/PlayerProvider";

export default function AnalysisPage({ params }: { params: Promise<{ songId: string }> }) {
  const { songId } = use(params);
  const p = usePlayer();
  return <AnalysisView songId={decodeURIComponent(songId)} onBack={() => p.goTo("history")} />;
}
