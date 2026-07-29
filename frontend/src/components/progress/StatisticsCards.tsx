"use client";

/* ProgressView.tsx-ийн статистикийн карт (.st-cards) — тусад нь гаргасан. CSS/behavior бүгд
   өөрчлөгдөөгүй, зөвхөн component boundary шилжсэн. */
import StatCard from "@/components/player/StatCard";
import { ICONS } from "@/lib/player/constants";

export default function StatisticsCards({
  avgCompletion,
  avgEngagement,
  totalEntries,
}: {
  avgCompletion: number;
  avgEngagement: number;
  totalEntries: number;
}) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3.5">
      <StatCard icon={ICONS.star} color="c-gold" value={avgCompletion + "%"} label="Дундаж гүйцэтгэл" />
      <StatCard icon={ICONS.vibrate} color="c-rose" value={avgEngagement} label="Дундаж оролцоо" />
      <StatCard icon={ICONS.music} color="c-aqua" value={totalEntries} label="Нийт бичлэг" />
    </div>
  );
}
