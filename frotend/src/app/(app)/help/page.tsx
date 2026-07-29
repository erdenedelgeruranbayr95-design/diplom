"use client";

import HelpView from "@/components/player/HelpView";
import { usePlayer } from "@/components/providers/PlayerProvider";

export default function HelpPage() {
  const p = usePlayer();
  return <HelpView onOpenCalibrate={() => p.setCalibOpen(true)} onBack={() => p.goTo("home")} />;
}
