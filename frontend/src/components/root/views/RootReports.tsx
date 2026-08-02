"use client";

import { useState } from "react";
import { ActionButton } from "@/components/ui/ActionGroup";
import { TableCard } from "@/components/ui/Surface";
import StatusBadge, { type StatusTone } from "@/components/ui/StatusBadge";
import { Empty } from "@/components/ui/States";
import { useToast } from "@/components/providers/ToastProvider";
import { useAsyncResource } from "@/hooks/useAsyncResource";
import { listReports, resolveReport } from "@/lib/api/client";
import RootSection from "../RootSection";
import type { ReportRow } from "@/types/auth";

const STATUS_TONE: Record<ReportRow["status"], StatusTone> = { OPEN: "warm", RESOLVED: "aqua", DISMISSED: "faint" };
const STATUS_LABEL: Record<ReportRow["status"], string> = { OPEN: "Нээлттэй", RESOLVED: "Шийдвэрлэсэн", DISMISSED: "Цуцалсан" };

/* Хэрэглэгчийн мэдүүлсэн зөрчлийн бүртгэл — GET/PATCH /moderation/reports.
   MODERATOR/ADMIN/ROOT эрхтэй хэрэглэгч л шийдвэрлэх боломжтой. */
export default function RootReports() {
  const toast = useToast();
  const [busyId, setBusyId] = useState<string | null>(null);
  const { data: reports, loading, error, reload } = useAsyncResource<ReportRow[]>(() => listReports(), [], {
    initialData: [],
    errorMessage: "Гомдол ачаалахад алдаа гарлаа",
  });

  async function resolve(id: string, status: "RESOLVED" | "DISMISSED") {
    setBusyId(id);
    try {
      await resolveReport(id, status);
      toast.success(status === "RESOLVED" ? "Гомдол шийдвэрлэгдлээ" : "Гомдол цуцлагдлаа");
      reload();
    } catch (err) {
      toast.error((err as Error).message || "Шийдвэрлэхэд алдаа гарлаа");
    } finally {
      setBusyId(null);
    }
  }

  const open = reports.filter((r) => r.status === "OPEN");

  return (
    <RootSection
      title="Гомдол"
      eyebrow="ROOT"
      description={`GET /moderation/reports — ${open.length} нээлттэй гомдол.`}
      loading={loading}
      error={error}
      onRetry={reload}
    >
      {reports.length === 0 ? (
        <Empty icon="alert" title="Гомдол алга" hint="Хэрэглэгчийн мэдүүлсэн зөрчил энд харагдана" />
      ) : (
        <TableCard>
          <div className="grid grid-cols-[.7fr_1.3fr_1fr_.7fr_auto] max-viz:grid-cols-[.7fr_1fr_.7fr_auto] gap-3 items-center py-3 px-5 border-b border-white/[.08] bg-white/[.02]">
            <span className="mono">Төрөл</span>
            <span className="mono">Шалтгаан</span>
            <span className="mono max-viz:hidden">Мэдүүлэгч</span>
            <span className="mono">Төлөв</span>
            <span></span>
          </div>
          {reports.map((r) => (
            <div
              key={r.id}
              className="grid grid-cols-[.7fr_1.3fr_1fr_.7fr_auto] max-viz:grid-cols-[.7fr_1fr_.7fr_auto] gap-3 items-center py-3 px-5 border-b border-white/[.06] last:border-b-0 text-body transition-colors duration-150 hover:bg-white/[.03]"
            >
              <span className="text-dim text-caption">{r.targetType === "song" ? "Дуу" : "Хэрэглэгч"}</span>
              <span className="min-w-0 truncate">{r.reason}</span>
              <span className="text-dim truncate max-viz:hidden">{r.reporter?.email || "—"}</span>
              <StatusBadge label={STATUS_LABEL[r.status]} tone={STATUS_TONE[r.status]} />
              {r.status === "OPEN" ? (
                <div className="flex gap-1.5 justify-self-end">
                  <ActionButton variant="primary" size="sm" disabled={busyId === r.id} onClick={() => resolve(r.id, "RESOLVED")}>
                    Шийдэх
                  </ActionButton>
                  <ActionButton variant="secondary" size="sm" disabled={busyId === r.id} onClick={() => resolve(r.id, "DISMISSED")}>
                    Цуцлах
                  </ActionButton>
                </div>
              ) : (
                <span></span>
              )}
            </div>
          ))}
        </TableCard>
      )}
    </RootSection>
  );
}
