"use client";

import TherapistView from "@/components/player/TherapistView";
import { Empty } from "@/components/ui/States";
import { usePlayer } from "@/components/providers/PlayerProvider";

export default function TherapistPage() {
  const p = usePlayer();
  if (!p.isTherapist) return <Empty icon="🔒" title="Хандах эрхгүй" hint="Энэ хуудас зөвхөн эмчид зориулагдсан" />;
  return <TherapistView onGoHome={() => p.goTo("home")} />;
}
