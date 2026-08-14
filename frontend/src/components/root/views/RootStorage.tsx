"use client";

/* Файл сан (MinIO) — эзэлсэн хэмжээ, prefix-ээр задаргаа, өнчин файл цэвэрлэх.
   RootAuditLogs.tsx-ийн яг ижил каркас: useAsyncResource + RootSection + TableCard. */
import { useState } from "react";
import { TableCard, Panel } from "@/components/ui/Surface";
import { Empty } from "@/components/ui/States";
import { ActionButton } from "@/components/ui/ActionGroup";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { useToast } from "@/components/providers/ToastProvider";
import { useAsyncResource } from "@/hooks/useAsyncResource";
import { getStorageUsage, cleanupOrphanFiles } from "@/lib/api/client";
import RootSection from "../RootSection";
import type { StorageUsage } from "@/types/song";

const EMPTY: StorageUsage = { totalObjects: 0, totalBytes: 0, byPrefix: {}, orphanCount: 0, orphanBytes: 0 };

function formatBytes(bytes: number): string {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const exp = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)));
  const value = bytes / Math.pow(1024, exp);
  return `${value.toFixed(exp === 0 ? 0 : 1)} ${units[exp]}`;
}

export default function RootStorage() {
  const toast = useToast();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [cleaning, setCleaning] = useState(false);

  const { data, loading, error, reload } = useAsyncResource(() => getStorageUsage(), [], {
    initialData: EMPTY,
    errorMessage: "Файл сангийн мэдээлэл ачаалахад алдаа гарлаа",
  });

  const prefixRows = Object.entries(data.byPrefix).sort((a, b) => b[1].bytes - a[1].bytes);

  async function runCleanup() {
    setCleaning(true);
    try {
      const res = await cleanupOrphanFiles();
      toast.success(`${res.deleted} файл устгагдаж, ${formatBytes(res.bytesFreed)} чөлөөлөгдлөө`);
      setConfirmOpen(false);
      reload();
    } catch (err) {
      toast.error((err as Error).message || "Цэвэрлэхэд алдаа гарлаа");
    } finally {
      setCleaning(false);
    }
  }

  return (
    <RootSection
      title="Файл сан"
      eyebrow="ROOT"
      description="Аудио файл, ковер зураг, Haptic Score-ийн хадгалалт ба эзлэх хэмжээ."
      loading={loading}
      error={error}
      onRetry={reload}
    >
      <div className="grid grid-cols-3 max-viz:grid-cols-1 gap-3 mb-6">
        <Panel>
          <span className="mono block mb-1.5">Нийт файл</span>
          <span className="font-display font-bold text-heading text-ink">{data.totalObjects.toLocaleString("mn-MN")}</span>
        </Panel>
        <Panel>
          <span className="mono block mb-1.5">Нийт хэмжээ</span>
          <span className="font-display font-bold text-heading text-ink">{formatBytes(data.totalBytes)}</span>
        </Panel>
        <Panel className={data.orphanCount > 0 ? "border-warm/40 bg-warm/[.06]" : ""}>
          <span className="mono block mb-1.5">Өнчин файл</span>
          <span className="font-display font-bold text-heading text-ink">
            {data.orphanCount.toLocaleString("mn-MN")} <span className="text-caption text-dim font-body font-normal">({formatBytes(data.orphanBytes)})</span>
          </span>
        </Panel>
      </div>

      <h3 className="font-display font-semibold text-title tracking-[-.03em] text-ink mb-3">Prefix-ээр задаргаа</h3>
      {prefixRows.length === 0 ? (
        <Empty icon="disc" title="Файл алга" hint="Файлын санд одоогоор ямар ч файл байршуулаагүй байна" />
      ) : (
        <TableCard className="mb-6">
          <div className="grid grid-cols-[1fr_.6fr_.6fr] gap-3 items-center py-3 px-5 border-b border-white/[.08] bg-white/[.02]">
            <span className="mono">Prefix</span>
            <span className="mono">Тоо</span>
            <span className="mono">Хэмжээ</span>
          </div>
          {prefixRows.map(([prefix, stat]) => (
            <div
              key={prefix}
              className="grid grid-cols-[1fr_.6fr_.6fr] gap-3 items-center py-3 px-5 border-b border-white/[.06] last:border-b-0 text-body transition-colors duration-150 hover:bg-white/[.03]"
            >
              <span className="font-mono text-caption text-ink/90 truncate">{prefix}</span>
              <span className="text-dim text-caption">{stat.count.toLocaleString("mn-MN")}</span>
              <span className="font-mono text-caption text-faint">{formatBytes(stat.bytes)}</span>
            </div>
          ))}
        </TableCard>
      )}

      <Panel as="section" className={data.orphanCount > 0 ? "border-warm/40 bg-warm/[.06]" : ""}>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="min-w-0">
            <h3 className="font-display font-semibold text-title tracking-[-.03em] text-ink mb-1.5">Өнчин файл цэвэрлэх</h3>
            <p className="text-body text-dim leading-[1.5]">
              Ямар ч Song-ийн fileUrl/coverUrl рүү холбогдоогүй MinIO объектуудыг устгана. Энэ үйлдлийг буцаах боломжгүй.
            </p>
          </div>
          <ActionButton variant="danger" onClick={() => setConfirmOpen(true)} disabled={data.orphanCount === 0}>
            Цэвэрлэх
          </ActionButton>
        </div>
      </Panel>

      <ConfirmDialog
        open={confirmOpen}
        title="Өнчин файлуудыг устгах уу?"
        description={`${data.orphanCount} файл (${formatBytes(data.orphanBytes)}) MinIO-оос бүрмөсөн устана. Энэ үйлдлийг буцаах боломжгүй.`}
        confirmLabel={cleaning ? "Устгаж байна…" : "Цэвэрлэх"}
        tone="danger"
        onConfirm={runCleanup}
        onCancel={() => setConfirmOpen(false)}
      />
    </RootSection>
  );
}
