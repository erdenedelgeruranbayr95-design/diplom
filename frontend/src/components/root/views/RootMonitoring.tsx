"use client";

import StatCard from "@/components/player/StatCard";
import { Panel } from "@/components/ui/Surface";
import StatusBadge from "@/components/ui/StatusBadge";
import { useAsyncResource } from "@/hooks/useAsyncResource";
import { getHealth, getHealthDb } from "@/lib/api/client";
import RootSection from "../RootSection";

interface MonitoringSnapshot {
  api: boolean;
  db: boolean;
  latencyMs: number | null;
}

/* Систем ажиллаж байгаа эсэхийг шалгах хамгийн энгийн шалгуур —
   GET /health (public, uptime monitor-той зориулсан), GET /health/db (ROOT). */
export default function RootMonitoring() {
  const { data, loading, error, reload } = useAsyncResource<MonitoringSnapshot>(
    async () => {
      const [api, db] = await Promise.allSettled([getHealth(), getHealthDb()]);
      return {
        api: api.status === "fulfilled",
        db: db.status === "fulfilled",
        latencyMs: db.status === "fulfilled" ? db.value.latencyMs : null,
      };
    },
    [],
    { initialData: { api: false, db: false, latencyMs: null }, errorMessage: "Мониторинг ачаалахад алдаа гарлаа" },
  );

  return (
    <RootSection
      title="Мониторинг"
      eyebrow="ROOT"
      description="Сервер ба өгөгдлийн сангийн холболтын одоогийн төлөв."
      loading={loading}
      error={error}
      onRetry={reload}
    >
      <div className="grid grid-cols-3 max-nav:grid-cols-1 gap-3.5 mb-6">
        <StatCard icon="activity" color="c-aqua" value={data.api ? "OK" : "Алдаа"} label="API сервер" />
        <StatCard icon="disc" color="c-purple" value={data.db ? "OK" : "Алдаа"} label="Өгөгдлийн сан" />
        <StatCard icon="clock" color="c-gold" value={data.latencyMs !== null ? `${data.latencyMs} мс` : "—"} label="DB хариу хугацаа" />
      </div>

      <Panel as="section" className="flex items-center gap-3">
        <StatusBadge label={data.api && data.db ? "Системийн бүх хэсэг хэвийн" : "Асуудал илэрлээ"} tone={data.api && data.db ? "aqua" : "rose"} />
        <span className="text-dim text-body">Дараагийн шат: Sentry/structured logging, uptime alert (Үе шат 7).</span>
      </Panel>
    </RootSection>
  );
}
