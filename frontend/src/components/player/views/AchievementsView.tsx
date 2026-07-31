"use client";

/* Хэрэглэгчийн одоо байгаа ListeningStats + Progress-оос badge тооцоолж харуулна —
   backend-д хадгалдаггүй, дуудах бүрт клиент талд дахин тооцоолно. Дашбоард маягийн
   header/зай нэмж шинэчлэв — computeAchievements() тооцоолол бүхэлдээ хэвээр.
   AchievementSummary/AchievementGrid (тусдаа файлууд, энэ даалгаврын хамрах хүрээнд
   ороогүй тул) өөрчлөгдөөгүй. */
import { useEffect, useState } from "react";
import BackBar from "../BackBar";
import { Loading, ErrorState } from "@/components/ui/States";
import { listProgress } from "@/lib/api/client";
import { computeAchievements } from "@/lib/player/achievements";
import AchievementSummary from "@/components/achievements/AchievementSummary";
import AchievementGrid from "@/components/achievements/AchievementGrid";
import type { ListeningStats } from "@/types/track";

const EMPTY_STATS: ListeningStats = { total: 0, vib: 0, byGenre: {}, byTrack: {}, days: {} };

export default function AchievementsView({ stats, onBack }: { stats: ListeningStats | null | undefined; onBack: () => void }) {
  const [progress, setProgress] = useState<Awaited<ReturnType<typeof listProgress>>>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  function load() {
    setLoading(true);
    setErr("");
    listProgress()
      .then(setProgress)
      .catch((e) => setErr(e.message || "Ахиц ачаалахад алдаа гарлаа"))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  const achievements = computeAchievements(stats || EMPTY_STATS, progress);
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <>
      <div className="flex items-start justify-between gap-4 flex-wrap mb-1">
        <BackBar title="Амжилтууд" onBack={onBack} />
        {!loading && !err && (
          <span className="mono !text-meta py-2 px-3.5 rounded-full border border-aqua/30 bg-aqua/[.06] text-aqua whitespace-nowrap">
            {unlockedCount} / {achievements.length} нээгдсэн
          </span>
        )}
      </div>

      {loading && <Loading label="Ачааллаж байна…" />}
      {!loading && err && <ErrorState title="Ачаалагдсангүй" hint={err} onRetry={load} />}

      {!loading && !err && (
        <>
          <AchievementSummary unlockedCount={unlockedCount} totalCount={achievements.length} />
          <AchievementGrid achievements={achievements} />
        </>
      )}
    </>
  );
}
