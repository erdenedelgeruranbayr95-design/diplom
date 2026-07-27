"use client";

/* ParentView.tsx-ийн "Дууссан сессүүд" гарчигтай сессийн жагсаалт — тусад нь гаргасан.
   Гарчиг "Дууссан" гэсэн ч эх код бүх төлөвийн session-г харуулдаг (зөвхөн COMPLETED биш) —
   энэ зан төлөвийг өөрчлөлгүй хадгалав. Эмчийн тэмдэглэл (therapist notes) багана нь эх
   кодод байгаа "Тэмдэглэл" багана мөн — доод тайланд дурдсан. CSS/behavior бүгд өөрчлөгдөөгүй. */
import { Empty } from "@/components/ui/States";
import type { SessionStatus, TherapySession } from "@/types/therapy";

const STATUS_LABEL: Record<SessionStatus, string> = {
  SCHEDULED: "Товлогдсон",
  IN_PROGRESS: "Явагдаж буй",
  COMPLETED: "Дууссан",
  CANCELLED: "Цуцлагдсан",
};

export default function SessionHistoryTable({ sessions }: { sessions: TherapySession[] }) {
  return (
    <>
      <h3 className="st-h">Дууссан сессүүд</h3>
      {sessions.length === 0 ? (
        <Empty icon="📋" title="Одоогоор сесс алга" hint="Эмч эмчилгээний сесс товлоход энд харагдана" />
      ) : (
        <div className="bil-table">
          <div className="bil-row bil-head !grid-cols-[1.6fr_1fr_.8fr_.7fr] max-[760px]:!grid-cols-[1fr_1fr_.8fr]">
            <span className="mono">Тэмдэглэл</span>
            <span className="mono">Товлосон</span>
            <span className="mono">Статус</span>
            <span></span>
          </div>
          {sessions.map((s) => (
            <div className="bil-row !grid-cols-[1.6fr_1fr_.8fr_.7fr] max-[760px]:!grid-cols-[1fr_1fr_.8fr]" key={s.id}>
              <span>{s.notes || "—"}</span>
              <span>{s.scheduledAt ? new Date(s.scheduledAt).toLocaleString("mn-MN") : "—"}</span>
              <span className={s.status === "COMPLETED" ? "bil-ok" : "ab-free"}>{STATUS_LABEL[s.status]}</span>
              <span></span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
