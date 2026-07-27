"use client";

/* AchievementsView.tsx-ийн нэг badge карт (.ach-card) — тусад нь гаргасан. CSS/behavior бүгд
   өөрчлөгдөөгүй, зөвхөн component boundary шилжсэн. */
import type { Achievement } from "@/lib/player/achievements";

export default function AchievementCard({ achievement }: { achievement: Achievement }) {
  return (
    <div
      className={
        "border border-line rounded-md p-5 flex flex-col gap-1.5 transition-[opacity,filter,transform,box-shadow] duration-200 " +
        (achievement.unlocked
          ? "opacity-100 grayscale-0 border-[rgba(56,232,206,.35)] hover:-translate-y-[3px] hover:shadow-sm"
          : "opacity-45 grayscale-[.6]")
      }
    >
      <span className="text-[28px]" aria-hidden="true">
        {achievement.icon}
      </span>
      <b className="font-display text-[15px] tracking-[-.02em]">{achievement.title}</b>
      <p className="text-dim text-[12.5px] leading-[1.4]">{achievement.hint}</p>
      <span className="mono !text-faint !text-[11px] mt-0.5">{achievement.progressLabel}</span>
    </div>
  );
}
