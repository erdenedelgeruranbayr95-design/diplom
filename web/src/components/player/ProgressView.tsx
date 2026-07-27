"use client";

/* Хувийн ахиц — TherapistView.tsx-ийн chart хэсгийн яг ижил хэв маягийг дагана,
   зөвхөн listProgress()-г параметргүй дуудаж өөрийн бичлэгээ авна (backend аль хэдийн scope хийдэг). */
import { useEffect, useMemo, useState } from "react";
import BackBar from "./BackBar";
import { Loading, ErrorState } from "@/components/ui/States";
import { listProgress } from "@/lib/api/client";
import StatisticsCards from "@/components/progress/StatisticsCards";
import ProgressChartCard from "@/components/progress/ProgressChartCard";
import ProgressSummary from "@/components/progress/ProgressSummary";
import type { Progress } from "@/types/therapy";

export default function ProgressView({ onBack }: { onBack: () => void }) {
  const [progress, setProgress] = useState<Progress[]>([]);
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

  const chartData = useMemo(
    () =>
      [...progress]
        .sort((a, b) => new Date(a.recordedAt).getTime() - new Date(b.recordedAt).getTime())
        .map((p) => ({
          date: new Date(p.recordedAt).toLocaleDateString("mn-MN", { month: "short", day: "numeric" }),
          completionPct: p.completionPct ?? null,
          engagementScore: p.engagementScore ?? null,
        })),
    [progress],
  );

  const avgCompletion = progress.length
    ? Math.round(progress.reduce((s, p) => s + (p.completionPct ?? 0), 0) / progress.length)
    : 0;
  const avgEngagement = progress.length
    ? Math.round(progress.reduce((s, p) => s + (p.engagementScore ?? 0), 0) / progress.length)
    : 0;

  return (
    <>
      <BackBar title="Миний ахиц" onBack={onBack} />

      {loading && <Loading label="Ачааллаж байна…" />}
      {!loading && err && <ErrorState title="Ачаалагдсангүй" hint={err} onRetry={load} />}

      {!loading && !err && progress.length === 0 && <ProgressSummary />}

      {!loading && !err && progress.length > 0 && (
        <>
          <StatisticsCards avgCompletion={avgCompletion} avgEngagement={avgEngagement} totalEntries={progress.length} />
          <ProgressChartCard data={chartData} />
        </>
      )}
    </>
  );
}
