"use client";

/* ParentView.tsx-ийн "Дууссан сессүүд" гарчигтай сессийн жагсаалт — SessionTimeline.tsx-тэй
   ижил timeline-card дизайн, нэгдсэн StatusBadge primitive ашиглав. Гарчиг "Дууссан" гэсэн ч
   эх код бүх төлөвийн session-г харуулдаг (зөвхөн COMPLETED биш) — энэ зан төлөвийг
   өөрчлөлгүй хадгалав. sessions prop хэвээр. */
import StatusBadge, { type StatusTone } from "@/components/ui/StatusBadge";
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

export default function SessionHistoryTable({ sessions }: { sessions: TherapySession[] }) {
  return (
    <>
      <div className="mt-8">
        <SectionTitle title="Дууссан сессүүд" />
      </div>
      {sessions.length === 0 ? (
        <Empty icon="clipboard" title="Одоогоор сесс алга" hint="Эмч эмчилгээний сесс товлоход энд харагдана" />
      ) : (
        <div className="flex flex-col gap-2.5">
          {sessions.map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-4 p-4 rounded-xl border border-white/[.08] bg-white/[.02] transition-colors duration-150 hover:bg-white/[.04] max-nav:flex-wrap"
            >
              <StatusBadge label={STATUS_LABEL[s.status]} tone={STATUS_TONE[s.status]} className="flex-none" />
              <div className="flex-1 min-w-0">
                <p className="text-body text-ink whitespace-nowrap overflow-hidden text-ellipsis">{s.notes || "—"}</p>
                <span className="text-faint font-mono text-caption">{s.scheduledAt ? new Date(s.scheduledAt).toLocaleString("mn-MN") : "—"}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
