"use client";

/* AchievementsView.tsx-ийн badge грид (.ach-grid) — тусад нь гаргасан. CSS/behavior бүгд
   өөрчлөгдөөгүй, зөвхөн component boundary шилжсэн. */
import AchievementCard from "@/components/achievements/AchievementCard";
import type { Achievement } from "@/lib/player/achievements";

export default function AchievementGrid({ achievements }: { achievements: Achievement[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3.5">
      {achievements.map((a) => (
        <AchievementCard achievement={a} key={a.id} />
      ))}
    </div>
  );
}
