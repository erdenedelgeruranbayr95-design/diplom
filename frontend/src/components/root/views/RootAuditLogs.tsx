"use client";

import { useState } from "react";
import { TableCard } from "@/components/ui/Surface";
import { Empty } from "@/components/ui/States";
import { useAsyncResource } from "@/hooks/useAsyncResource";
import { listAuditLog } from "@/lib/api/client";
import RootSection from "../RootSection";
import type { AuditLogRow } from "@/types/auth";

const EMPTY: { items: AuditLogRow[]; total: number } = { items: [], total: 0 };

/* Админ/ROOT-ийн хийсэн бүх өөрчлөх (mutating) үйлдлийн мөрдөгдөх бүртгэл —
   GET /audit, `AuditLogInterceptor`-оор автоматаар бичигдсэн мөрүүд. Мөр бүр
   дараах мэдээллийг агуулна: гүйцэтгэгч (нэр+имэйл), үйлдэл, зорилтот, IP,
   browser (user-agent), хүсэлтийн body (meta, нууц үг зэрэг талбар хассан),
   огноо — нийт 7 өгөгдлийн багана, 2 нь давхар мөр (нэр/имэйл) хэлбэрээр. */
export default function RootAuditLogs() {
  const [actorFilter, setActorFilter] = useState("");
  const [actionFilter, setActionFilter] = useState("");
  const { data, loading, error, reload } = useAsyncResource(
    () => listAuditLog({ limit: 100, action: actionFilter || undefined }),
    [actionFilter],
    { initialData: EMPTY, errorMessage: "Аудит лог ачаалахад алдаа гарлаа" },
  );

  const rows = actorFilter
    ? data.items.filter((l) => l.actor.email.toLowerCase().includes(actorFilter.toLowerCase()) || l.actor.name.toLowerCase().includes(actorFilter.toLowerCase()))
    : data.items;

  return (
    <RootSection
      title="Аудит лог"
      eyebrow="ROOT"
      description={`GET /audit — mutating route бүрийг автоматаар бичдэг (${data.total} нийт мөр).`}
      loading={loading}
      error={error}
      onRetry={reload}
    >
      <div className="flex gap-2.5 flex-wrap mb-4">
        <input
          className="flex-1 min-w-[200px] px-4 py-2.5 rounded-full bg-white/[.04] border border-white/[.08] text-ink text-body transition-[border-color,box-shadow,background] duration-250 focus:bg-white/[.06] focus:border-aqua/60 focus-visible:outline-none focus-visible:shadow-glow-aqua placeholder:text-faint"
          placeholder="Гүйцэтгэгчээр шүүх (нэр/имэйл)…"
          value={actorFilter}
          onChange={(e) => setActorFilter(e.target.value)}
          aria-label="Гүйцэтгэгчээр шүүх"
        />
        <input
          className="flex-1 min-w-[200px] px-4 py-2.5 rounded-full bg-white/[.04] border border-white/[.08] text-ink text-body transition-[border-color,box-shadow,background] duration-250 focus:bg-white/[.06] focus:border-aqua/60 focus-visible:outline-none focus-visible:shadow-glow-aqua placeholder:text-faint"
          placeholder="Үйлдлээр шүүх (жишээ: /status)…"
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          aria-label="Үйлдлээр шүүх"
        />
      </div>

      {rows.length === 0 ? (
        <Empty icon="clipboard" title="Аудит бичлэг алга" hint="Дүр/төлөв солих зэрэг үйлдэл хийхэд энд харагдана" />
      ) : (
        <TableCard>
          <div className="grid grid-cols-[1fr_1.2fr_.9fr_.8fr_.8fr_1fr_.8fr] max-viz:grid-cols-[1fr_1fr_.8fr] gap-3 items-center py-3 px-5 border-b border-white/[.08] bg-white/[.02]">
            <span className="mono">Гүйцэтгэгч</span>
            <span className="mono max-viz:hidden">Үйлдэл</span>
            <span className="mono max-viz:hidden">Зорилтот</span>
            <span className="mono max-viz:hidden">IP</span>
            <span className="mono max-viz:hidden">Browser</span>
            <span className="mono max-viz:hidden">Дэлгэрэнгүй</span>
            <span className="mono">Огноо</span>
          </div>
          {rows.map((log) => (
            <div
              key={log.id}
              className="grid grid-cols-[1fr_1.2fr_.9fr_.8fr_.8fr_1fr_.8fr] max-viz:grid-cols-[1fr_1fr_.8fr] gap-3 items-center py-3 px-5 border-b border-white/[.06] last:border-b-0 text-body transition-colors duration-150 hover:bg-white/[.03]"
            >
              <span className="min-w-0">
                <span className="block truncate">{log.actor.name}</span>
                <span className="block text-caption text-faint truncate">{log.actor.email}</span>
              </span>
              <span className="font-mono text-caption text-ink/90 truncate max-viz:hidden">{log.action}</span>
              <span className="text-dim text-caption truncate max-viz:hidden">{log.target || "—"}</span>
              <span className="font-mono text-caption text-faint truncate max-viz:hidden">{log.ip || "—"}</span>
              <span className="text-dim text-caption truncate max-viz:hidden" title={log.userAgent || undefined}>
                {log.userAgent ? log.userAgent.split(" ")[0] : "—"}
              </span>
              <span className="font-mono text-caption text-faint truncate max-viz:hidden" title={log.meta ? JSON.stringify(log.meta) : undefined}>
                {log.meta ? JSON.stringify(log.meta).slice(0, 40) : "—"}
              </span>
              <span className="font-mono text-caption text-faint whitespace-nowrap">{new Date(log.createdAt).toLocaleString("mn-MN")}</span>
            </div>
          ))}
        </TableCard>
      )}
    </RootSection>
  );
}
