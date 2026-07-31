"use client";

/* Хувийн ахиц — `listProgress()`-г параметргүй дуудаж өөрийн бичлэгээ авна
   (backend аль хэдийн scope хийдэг). График болон дундаж тооцоолол нь
   `lib/therapy/progress-chart.ts`-д — эмч/эцэг эхийн самбартай хуваалцана. */
import { useMemo } from "react";
import BackBar from "../BackBar";
import { Loading, ErrorState } from "@/components/ui/States";
import { listProgress } from "@/lib/api/client";
import { useAsyncResource } from "@/hooks/useAsyncResource";
import { averageOf, toProgressChartData } from "@/lib/therapy/progress-chart";
import StatisticsCards from "@/components/progress/StatisticsCards";
import ProgressChartCard from "@/components/ui/ProgressChartCard";
import ProgressSummary from "@/components/progress/ProgressSummary";
import type { Progress } from "@/types/therapy";

export default function ProgressView({ onBack }: { onBack: () => void }) {
  const {
    data: progress,
    loading,
    error,
    reload,
  } = useAsyncResource<Progress[]>(() => listProgress(), [], {
    initialData: [],
    errorMessage: "Ахиц ачаалахад алдаа гарлаа",
  });

  const chartData = useMemo(() => toProgressChartData(progress), [progress]);

  return (
    <>
      <div className="flex items-start justify-between gap-4 flex-wrap mb-1">
        <BackBar title="Миний ахиц" onBack={onBack} />
        {!loading && !error && progress.length > 0 && (
          <span className="mono !text-meta py-2 px-3.5 rounded-full border border-white/[.08] bg-white/[.03] whitespace-nowrap">
            {progress.length.toLocaleString()} бичлэг
          </span>
        )}
      </div>

      {loading && <Loading label="Ачааллаж байна…" />}
      {!loading && error && <ErrorState title="Ачаалагдсангүй" hint={error} onRetry={reload} />}

      {!loading && !error && progress.length === 0 && <ProgressSummary />}

      {!loading && !error && progress.length > 0 && (
        <>
          <StatisticsCards
            avgCompletion={averageOf(progress, "completionPct")}
            avgEngagement={averageOf(progress, "engagementScore")}
            totalEntries={progress.length}
          />
          <ProgressChartCard data={chartData} height={280} marginTopClass="mt-6" />
        </>
      )}
    </>
  );
}
