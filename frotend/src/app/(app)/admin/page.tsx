"use client";

import AdminView from "@/components/player/AdminView";
import { Empty } from "@/components/ui/States";
import { usePlayer } from "@/components/providers/PlayerProvider";

export default function AdminPage() {
  const p = usePlayer();
  /* Дүрийн шалгалт: хаягаар шууд орох гэвэл ч хаагдана (жинхэнэ шалгалт backend дээр) */
  if (!p.isAdmin) return <Empty icon="🔒" title="Хандах эрхгүй" hint="Энэ хуудас зөвхөн админд зориулагдсан" />;
  return <AdminView allTracksCount={p.ALL.length} onOpenAdmin={p.onAdmin} onGoHome={() => p.goTo("home")} />;
}
