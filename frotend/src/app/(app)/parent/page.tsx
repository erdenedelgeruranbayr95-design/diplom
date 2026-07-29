"use client";

import ParentView from "@/components/player/ParentView";
import { Empty } from "@/components/ui/States";
import { usePlayer } from "@/components/providers/PlayerProvider";

export default function ParentPage() {
  const p = usePlayer();
  if (!p.isParent) return <Empty icon="🔒" title="Хандах эрхгүй" hint="Энэ хуудас зөвхөн эцэг эхэд зориулагдсан" />;
  return <ParentView onGoHome={() => p.goTo("home")} />;
}
