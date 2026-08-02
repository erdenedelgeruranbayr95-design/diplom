"use client";

import StatCard from "@/components/player/StatCard";
import { TableCard } from "@/components/ui/Surface";
import StatusBadge, { type StatusTone } from "@/components/ui/StatusBadge";
import { Empty } from "@/components/ui/States";
import { useAsyncResource } from "@/hooks/useAsyncResource";
import { listAllPayments } from "@/lib/api/client";
import RootSection from "../RootSection";
import type { PaymentRow } from "@/types/song";

type Row = PaymentRow & { user: { id: string; name: string; email: string } };

const STATUS_TONE: Record<PaymentRow["status"], StatusTone> = { SUCCESS: "aqua", PENDING: "warm", FAILED: "rose" };
const STATUS_LABEL: Record<PaymentRow["status"], string> = { SUCCESS: "Амжилттай", PENDING: "Хүлээгдэж байна", FAILED: "Амжилтгүй" };

/* Бүх хэрэглэгчийн төлбөрийн түүх — GET /payments (ROOT/ADMIN). Payment мөр
   `PATCH /users/me/subscription`-ийн transaction дотор автоматаар үүсдэг
   (users.service.ts: subscribe()) тул энд ямар ч client-side тооцоолол хийхгүй. */
export default function RootPayments() {
  const { data: rows, loading, error, reload } = useAsyncResource<Row[]>(() => listAllPayments(), [], {
    initialData: [],
    errorMessage: "Төлбөрийн түүх ачаалахад алдаа гарлаа",
  });

  const successCount = rows.filter((r) => r.status === "SUCCESS").length;

  return (
    <RootSection
      title="Төлбөр"
      eyebrow="ROOT"
      description="GET /payments — захиалгын түүх DB-ээс шууд гарна (демо SocialPay урсгал, жинхэнэ мөнгөн гүйлгээгүй)."
      loading={loading}
      error={error}
      onRetry={reload}
    >
      <div className="grid grid-cols-2 max-nav:grid-cols-1 gap-3.5 mb-6">
        <StatCard icon="money" color="c-gold" value={successCount.toLocaleString()} label="Амжилттай гүйлгээ" />
        <StatCard icon="crown" color="c-aqua" value={rows.length.toLocaleString()} label="Нийт бичлэг" />
      </div>

      {rows.length === 0 ? (
        <Empty icon="card" title="Төлбөрийн бичлэг алга" />
      ) : (
        <TableCard>
          <div className="grid grid-cols-[1fr_1fr_.7fr_.7fr_.8fr] max-nav:grid-cols-[1fr_.7fr_.8fr] gap-3 items-center py-3 px-5 border-b border-white/[.08] bg-white/[.02]">
            <span className="mono">Хэрэглэгч</span>
            <span className="mono max-nav:hidden">План</span>
            <span className="mono max-nav:hidden">Төлөв</span>
            <span className="mono">Огноо</span>
            <span className="mono text-right">Дүн</span>
          </div>
          {rows.map((p) => (
            <div
              key={p.id}
              className="grid grid-cols-[1fr_1fr_.7fr_.7fr_.8fr] max-nav:grid-cols-[1fr_.7fr_.8fr] gap-3 items-center py-3 px-5 border-b border-white/[.06] last:border-b-0 text-body transition-colors duration-150 hover:bg-white/[.03]"
            >
              <span className="min-w-0">
                <span className="block truncate">{p.user.name}</span>
                <span className="block text-caption text-faint truncate">{p.user.email}</span>
              </span>
              <span className="text-dim truncate max-nav:hidden">{p.plan || "—"}</span>
              <span className="max-nav:hidden">
                <StatusBadge label={STATUS_LABEL[p.status]} tone={STATUS_TONE[p.status]} />
              </span>
              <span className="font-mono text-caption text-faint whitespace-nowrap">{new Date(p.createdAt).toLocaleDateString("mn-MN")}</span>
              <b className="text-right tabular-nums whitespace-nowrap">{p.amount}</b>
            </div>
          ))}
        </TableCard>
      )}
    </RootSection>
  );
}
