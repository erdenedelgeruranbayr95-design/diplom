"use client";

/* AchievementsView.tsx-ийн "N / M амжилт нээгдсэн" мөр — тусад нь гаргасан. CSS/behavior
   бүгд өөрчлөгдөөгүй, зөвхөн component boundary шилжсэн. */
export default function AchievementSummary({ unlockedCount, totalCount }: { unlockedCount: number; totalCount: number }) {
  return (
    <p className="dv-lead">
      {unlockedCount} / {totalCount} амжилт нээгдсэн
    </p>
  );
}
