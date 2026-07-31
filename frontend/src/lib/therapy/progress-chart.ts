import type { Progress, TherapySession } from "@/types/therapy";

/* Ахицын бичлэгүүд → ProgressChartCard-ийн хүлээж авдаг цуврал.

   ЯГ ижил `useMemo(() => [...progress].sort(...).map(...))` блок TherapistView-ийн
   PatientDetail, ParentView-ийн ChildDetail, ProgressView гурвуулаанд байсан. Одоо
   энэ бол цэвэр функц — hook биш тул тест хийхэд ч, дахин ашиглахад ч хялбар. */

export interface ProgressChartPoint {
  date: string;
  completionPct: number | null;
  engagementScore: number | null;
}

/** Огноогоор өсөхөөр эрэмбэлээд график цэг болгоно (эх массивыг өөрчлөхгүй). */
export function toProgressChartData(progress: Progress[]): ProgressChartPoint[] {
  return [...progress]
    .sort((a, b) => new Date(a.recordedAt).getTime() - new Date(b.recordedAt).getTime())
    .map((p) => ({
      date: new Date(p.recordedAt).toLocaleDateString("mn-MN", { month: "short", day: "numeric" }),
      completionPct: p.completionPct ?? null,
      engagementScore: p.engagementScore ?? null,
    }));
}

/** Дундаж хувь — хоосон массив дээр 0 (ProgressView-ийн тооцоолол). */
export function averageOf(progress: Progress[], field: "completionPct" | "engagementScore"): number {
  if (!progress.length) return 0;
  return Math.round(progress.reduce((sum, p) => sum + (p[field] ?? 0), 0) / progress.length);
}

/** Дууссан сессүүд — эмч/эцэг эхийн самбарт хоёуланд нь ашиглагдана. */
export function completedSessions(sessions: TherapySession[]): TherapySession[] {
  return sessions.filter((s) => s.status === "COMPLETED");
}
