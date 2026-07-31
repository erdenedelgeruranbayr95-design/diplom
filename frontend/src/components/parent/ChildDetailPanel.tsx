"use client";

import { useMemo } from "react";
import { listProgress, listTherapySessions } from "@/lib/api/client";
import { useAsyncResource } from "@/hooks/useAsyncResource";
import { completedSessions, toProgressChartData } from "@/lib/therapy/progress-chart";
import ChildOverviewCard from "@/components/parent/ChildOverviewCard";
import StatisticsCards from "@/components/parent/StatisticsCards";
import ProgressChartCard from "@/components/ui/ProgressChartCard";
import RecommendationPanel from "@/components/parent/RecommendationPanel";
import SessionHistoryTable from "@/components/parent/SessionHistoryTable";
import { Loading, ErrorState } from "@/components/ui/States";
import type { LinkedChild, Progress, TherapySession } from "@/types/therapy";

interface ChildRecord {
  sessions: TherapySession[];
  progress: Progress[];
}
const EMPTY_RECORD: ChildRecord = { sessions: [], progress: [] };

/* Хүүхдийн дэлгэрэнгүй — БҮРЭН ЗӨВХӨН УНШИХ (сесс/ахиц бичих форм байхгүй).
   "Эмчийн зөвлөмж" гэдэг нь дууссан сессүүдийн therapist-ийн бичсэн notes талбар
   (тусдаа recommendation загвар backend-д байхгүй тул шинээр нэмэхгүй). */
export default function ChildDetailPanel({
  child,
  onBack,
  onGoHome,
}: {
  child: LinkedChild;
  onBack?: () => void;
  onGoHome: () => void;
}) {
  const userId = child.childUserId;

  const {
    data: record,
    loading,
    error,
    reload,
  } = useAsyncResource<ChildRecord>(
    () => Promise.all([listTherapySessions(userId), listProgress(userId)]).then(([sessions, progress]) => ({ sessions, progress })),
    [userId],
    { initialData: EMPTY_RECORD, errorMessage: "Мэдээлэл ачаалахад алдаа гарлаа" },
  );

  const chartData = useMemo(() => toProgressChartData(record.progress), [record.progress]);
  const completed = completedSessions(record.sessions);
  const recommendations = completed.filter((s) => s.notes && s.notes.trim().length > 0);

  return (
    <>
      <ChildOverviewCard child={child} onBack={onBack} onGoHome={onGoHome} />

      <StatisticsCards
        totalSessions={record.sessions.length}
        completedSessions={completed.length}
        progressEntries={record.progress.length}
      />

      {loading && <Loading label="Ачааллаж байна…" />}
      {!loading && error && <ErrorState title="Ачаалагдсангүй" hint={error} onRetry={reload} />}

      {!loading && !error && (
        <>
          <ProgressChartCard data={chartData} height={240} marginTopClass="mt-[26px]" hideWhenEmpty />

          <RecommendationPanel recommendations={recommendations} />

          <SessionHistoryTable sessions={record.sessions} />
        </>
      )}
    </>
  );
}
