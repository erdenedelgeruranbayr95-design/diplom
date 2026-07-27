"use client";

/* TherapistView.tsx-ийн сессийн түүхийн жагсаалт (.bil-table) — тусад нь гаргасан.
   CSS/behavior бүгд өөрчлөгдөөгүй, зөвхөн component boundary шилжсэн. */
import type { SessionStatus, TherapySession } from "@/types/therapy";

const STATUS_LABEL: Record<SessionStatus, string> = {
  SCHEDULED: "Товлогдсон",
  IN_PROGRESS: "Явагдаж буй",
  COMPLETED: "Дууссан",
  CANCELLED: "Цуцлагдсан",
};

export default function SessionTimeline({ sessions, onMarkCompleted }: { sessions: TherapySession[]; onMarkCompleted: (id: string) => void }) {
  return (
    <>
      <h3 className="st-h">Сессийн түүх</h3>
      {sessions.length === 0 ? (
        <p className="adm-empty">Одоогоор сесс алга</p>
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
              {s.status !== "COMPLETED" && s.status !== "CANCELLED" ? (
                <button className="adm-del" onClick={() => onMarkCompleted(s.id)}>
                  Дуусгах
                </button>
              ) : (
                <span></span>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
