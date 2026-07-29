"use client";

/* ParentView.tsx-ийн сонгосон хүүхдийн статистикийн карт (.st-cards) — тусад нь гаргасан.
   Эх кодод зөвхөн 3 карт байдаг: нийт сесс, дууссан сесс, ахицын бичлэг. "Listening time" болон
   "Achievements" карт эх кодод байхгүй тул шинээр зохиогоогүй (доод тайланг үзнэ үү).
   CSS/behavior бүгд өөрчлөгдөөгүй. */
import StatCard from "@/components/player/StatCard";
import { ICONS } from "@/lib/player/constants";

export default function StatisticsCards({
  totalSessions,
  completedSessions,
  progressEntries,
}: {
  totalSessions: number;
  completedSessions: number;
  progressEntries: number;
}) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3.5">
      <StatCard icon={ICONS.music} color="c-aqua" value={totalSessions} label="Нийт сесс" />
      <StatCard icon={ICONS.star} color="c-gold" value={completedSessions} label="Дууссан сесс" />
      <StatCard icon={ICONS.vibrate} color="c-rose" value={progressEntries} label="Ахицын бичлэг" />
    </div>
  );
}
