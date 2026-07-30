"use client";

/* TherapistView.tsx-ийн сессийн түүхийн жагсаалт — timeline-маягийн карт (Apple Health/
   GitHub Insights pattern), нэгдсэн StatusBadge/ActionButton/Empty primitive ашиглав (өмнө
   нь энэ файл өөрийн STATUS_CLS mapping + inline <p> empty state-тэй байсан бол
   SessionHistoryTable.tsx (Parent тал) Empty ашигладаг байсан зөрүүг эндээс жигдэлж, тэдгээр
   primitive-ийн адилхан өнгөний толь бичгийг ашиглав). sessions/onMarkCompleted props болон
   status тооцоолол хэвээр. */
import StatusBadge, { type StatusTone } from "@/components/ui/StatusBadge";
import { ActionButton } from "@/components/ui/ActionGroup";
import { Empty } from "@/components/ui/States";
import { SectionTitle } from "@/components/ui/PageHeader";
import type { SessionStatus, TherapySession } from "@/types/therapy";

const STATUS_LABEL: Record<SessionStatus, string> = {
  SCHEDULED: "Товлогдсон",
  IN_PROGRESS: "Явагдаж буй",
  COMPLETED: "Дууссан",
  CANCELLED: "Цуцлагдсан",
};

const STATUS_TONE: Record<SessionStatus, StatusTone> = {
  SCHEDULED: "warm",
  IN_PROGRESS: "aqua",
  COMPLETED: "aqua",
  CANCELLED: "faint",
};

export default function SessionTimeline({ sessions, onMarkCompleted }: { sessions: TherapySession[]; onMarkCompleted: (id: string) => void }) {
  return (
    <>
      <div className="mt-8">
        <SectionTitle title="Сессийн түүх" />
      </div>
      {sessions.length === 0 ? (
        <Empty icon="clipboard" title="Одоогоор сесс алга" hint="Шинэ сесс үүсгэхэд энд харагдана" />
      ) : (
        <div className="flex flex-col gap-2.5">
          {sessions.map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-4 p-4 rounded-xl border border-white/[.08] bg-white/[.02] transition-colors duration-150 hover:bg-white/[.04] max-nav:flex-wrap"
            >
              <StatusBadge label={STATUS_LABEL[s.status]} tone={STATUS_TONE[s.status]} className="flex-none" />
              <div className="flex-1 min-w-0">
                <p className="text-[13.5px] text-ink whitespace-nowrap overflow-hidden text-ellipsis">{s.notes || "—"}</p>
                <span className="text-faint font-mono text-[11px]">{s.scheduledAt ? new Date(s.scheduledAt).toLocaleString("mn-MN") : "—"}</span>
              </div>
              {s.status !== "COMPLETED" && s.status !== "CANCELLED" && (
                <ActionButton variant="danger" size="sm" className="flex-none" onClick={() => onMarkCompleted(s.id)}>
                  Дуусгах
                </ActionButton>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
