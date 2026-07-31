"use client";

/* AchievementsView.tsx-ийн "N / M амжилт нээгдсэн" мөр — .dv-lead legacy CSS-ийг Tailwind
   болгож, CSS-only animated progress bar нэмэв (unlockedCount/totalCount-ээс шууд тооцоолсон
   бодит хувь — фонт өгөгдөл биш). unlockedCount/totalCount props хэвээр. */
export default function AchievementSummary({ unlockedCount, totalCount }: { unlockedCount: number; totalCount: number }) {
  const pct = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;
  return (
    <div className="mb-7">
      <p className="text-dim text-copy leading-[1.55] mb-3">
        {unlockedCount} / {totalCount} амжилт нээгдсэн
      </p>
      <div className="h-2 rounded-full bg-white/[.08] overflow-hidden max-w-[320px]">
        <div
          className="h-full rounded-full [background:linear-gradient(90deg,rgba(56,232,206,.5),var(--aqua))] transition-[width] duration-[800ms] ease-[cubic-bezier(.16,.8,.24,1)]"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Нээгдсэн амжилтын хувь"
        ></div>
      </div>
    </div>
  );
}
