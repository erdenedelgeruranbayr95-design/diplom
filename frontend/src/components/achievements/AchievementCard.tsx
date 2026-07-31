"use client";

/* AchievementsView.tsx-ийн нэг badge карт — премиум "large achievement card" (Apple
   Health/Spotify Wrapped pattern) руу шинэчлэв: илүү том icon/зай, unlocked үед тод glow.
   achievement.progressLabel бол тоон хувь БИШ, текст (жишээ нь "3/5") тул тоон "animated
   progress bar" нэмээгүй — computeAchievements()-д numeric percent талбар байхгүй тул
   ийм progress bar зохиомол өгөгдөл болох байсан (доод тайланд дурдсан хязгаарлалт).
   achievement prop хэвээр, computeAchievements() огт хөндөгдөөгүй. */
import type { Achievement } from "@/lib/player/achievements";

export default function AchievementCard({ achievement }: { achievement: Achievement }) {
  return (
    <div
      className={
        "border rounded-2xl p-6 flex flex-col gap-2 transition-[opacity,filter,transform,box-shadow] duration-200 " +
        (achievement.unlocked
          ? "opacity-100 grayscale-0 border-aqua/35 bg-aqua/[.03] hover:-translate-y-[3px] hover:shadow-md hover:border-aqua/50"
          : "opacity-45 grayscale-[.6] border-white/[.08] bg-white/[.02]")
      }
    >
      <span
        className={"text-[32px] w-14 h-14 rounded-full flex items-center justify-center " + (achievement.unlocked ? "bg-aqua/[.1]" : "bg-white/[.04]")}
        aria-hidden="true"
      >
        {achievement.icon}
      </span>
      <b className="font-display text-title tracking-[-.02em] text-ink mt-1">{achievement.title}</b>
      <p className="text-dim text-note leading-[1.45]">{achievement.hint}</p>
      <span className="mono !text-faint !text-caption mt-1">{achievement.progressLabel}</span>
    </div>
  );
}
