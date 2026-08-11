"use client";

/* Admin dashboard-ийн "💎 PRO" таб — PRO subscription-ий удирдлагын төв.

   ӨМНӨХ ХУВИЛБАР нь хоёр давхаргатай байв:
     1) Overview статистик — БОДИТ `GET /users` өгөгдөл
     2) "Payment Requests" хүснэгт — localStorage дээрх ДЕМО давхарга
        (`admin-payment-requests.ts`), SubscribeModal-ийн QR нээгдэх мөчид
        бичигддэг, Approve/Reject нь зөвхөн тэр демо бичлэгийн статусыг өөрчилдөг.

   Stripe руу шилжсэнээр тэр демо давхаргын БИЧИГЧ алга болсон (SubscribeModal
   одоо Checkout руу шилжүүлдэг) тул хүснэгт үүрд хоосон үлдэх байв. Одоо DB-гийн
   бодит `Payment` мөрүүдийг `GET /payments`-ээс уншина.

   ⚠️ Approve/Reject товч АЛГА БОЛСОН нь зориуд: Stripe-ээр төлбөр ирэхдээ АЛЬ
   ХЭДИЙН баталгаажсан байдаг (webhook нь HMAC гарын үсэгтэй). Админ зөвшөөрөх
   зүйл байхгүй — энэ бол одоо ТҮҮХИЙН хүснэгт. Хэрэглэгчийн PRO эрхийг гараар
   өөрчлөх нь "Хэрэглэгчид" таб дээр хэвээр (`PATCH /users/:id/subscription`). */
import { useCallback, useEffect, useMemo, useState } from "react";
import { Empty, ErrorState } from "@/components/ui/States";
import StatusBadge, { type StatusTone } from "@/components/ui/StatusBadge";
import Icon from "@/components/ui/Icon";
import { fetchAdminPayments, type AdminPayment, type AdminPaymentStatus } from "@/lib/api/client";
import type { AdminUserRow } from "@/types/auth";
import { TableCard } from "@/components/ui/Surface";
import StatCard from "@/components/player/StatCard";

const STATUS_LABEL: Record<AdminPaymentStatus, string> = {
  SUCCESS: "Амжилттай",
  PENDING: "Хүлээгдэж байна",
  FAILED: "Амжилтгүй",
};
const STATUS_TONE: Record<AdminPaymentStatus, StatusTone> = {
  SUCCESS: "aqua",
  PENDING: "warm",
  FAILED: "rose",
};
type FilterStatus = AdminPaymentStatus | "ALL";
type SortOrder = "newest" | "oldest";

/** Minor unit → харагдах дүн. Валют бүрийн аравтын орон Intl-ээс. */
function formatMinor(totalMinor: number, currency: string): string {
  try {
    const fmt = new Intl.NumberFormat("mn-MN", { style: "currency", currency, maximumFractionDigits: 0 });
    const probe = new Intl.NumberFormat("mn-MN", { style: "currency", currency });
    const decimals = probe.resolvedOptions().maximumFractionDigits ?? 2;
    return fmt.format(totalMinor / 10 ** decimals);
  } catch {
    return `${totalMinor} ${currency}`;
  }
}

export default function ProManagementPanel({ users }: { users: AdminUserRow[] }) {
  const [payments, setPayments] = useState<AdminPayment[] | null>(null);
  const [monthly, setMonthly] = useState<{ currency: string; totalMinor: number; count: number }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("ALL");
  const [sort, setSort] = useState<SortOrder>("newest");

  const reload = useCallback(() => {
    setError(null);
    fetchAdminPayments()
      .then((data) => {
        setPayments(data.payments);
        setMonthly(data.monthly);
      })
      .catch((err: unknown) => setError(err instanceof Error ? err.message : "Төлбөрийн жагсаалт уншигдсангүй"));
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const totalUsers = users.filter((u) => u.role !== "ADMIN").length;
  const proUsers = users.filter((u) => u.subActive).length;
  const monthCount = monthly.reduce((sum, m) => sum + m.count, 0);
  /* Олон валют байвал нэмэх нь утгагүй тул хамгийн том дүнтэйг харуулна. Ганц
     валют (ихэвчлэн MNT) байвал энэ нь яг л нийт орлого. */
  const topRevenue = monthly.length
    ? [...monthly].sort((a, b) => b.totalMinor - a.totalMinor)[0]
    : null;

  const filtered = useMemo(() => {
    if (!payments) return [];
    const term = q.trim().toLowerCase();
    let list = payments;
    if (statusFilter !== "ALL") list = list.filter((p) => p.status === statusFilter);
    if (term) {
      list = list.filter(
        (p) =>
          p.userName.toLowerCase().includes(term) ||
          p.userEmail.toLowerCase().includes(term) ||
          (p.plan ?? "").toLowerCase().includes(term),
      );
    }
    return [...list].sort((a, b) => {
      const diff = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return sort === "newest" ? diff : -diff;
    });
  }, [payments, q, statusFilter, sort]);

  return (
    <>
      <div className="grid grid-cols-4 max-viz:grid-cols-2 gap-3 my-5 mb-6">
        <StatCard icon="users" value={totalUsers} label="Нийт хэрэглэгч" color="c-aqua" />
        <StatCard icon="crown" value={proUsers} label="PRO хэрэглэгч" color="c-gold" />
        <StatCard icon="card" value={monthCount} label="Энэ сарын гүйлгээ" color="c-gold" />
        <StatCard
          icon="trend"
          value={topRevenue ? formatMinor(topRevenue.totalMinor, topRevenue.currency) : "—"}
          label="Сарын орлого"
          color="c-aqua"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2.5 mb-4">
        <div className="relative flex-1 min-w-[180px]">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dim pointer-events-none flex" aria-hidden="true">
            <Icon name="search" size={15} />
          </span>
          <input
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/[.04] border border-white/[.08] text-ink text-body transition-[border-color,box-shadow,background] duration-250 focus:bg-white/[.06] focus:border-aqua/60 focus-visible:outline-none focus-visible:shadow-glow-aqua placeholder:text-faint"
            placeholder="Нэр, имэйл, планаар хайх…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Төлбөр хайх"
          />
        </div>
        <select
          className="py-2.5 px-3.5 rounded-full bg-white/[.04] border border-white/[.08] text-ink text-note font-mono transition-[border-color,box-shadow] duration-250 focus:border-aqua focus-visible:outline-none focus-visible:shadow-glow-aqua"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as FilterStatus)}
          aria-label="Төлөвөөр шүүх"
        >
          <option className="bg-surface text-ink" value="ALL">Бүгд</option>
          <option className="bg-surface text-ink" value="SUCCESS">Амжилттай</option>
          <option className="bg-surface text-ink" value="PENDING">Хүлээгдэж байна</option>
          <option className="bg-surface text-ink" value="FAILED">Амжилтгүй</option>
        </select>
        <select
          className="py-2.5 px-3.5 rounded-full bg-white/[.04] border border-white/[.08] text-ink text-note font-mono transition-[border-color,box-shadow] duration-250 focus:border-aqua focus-visible:outline-none focus-visible:shadow-glow-aqua"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOrder)}
          aria-label="Эрэмбэлэх"
        >
          <option className="bg-surface text-ink" value="newest">Шинэ нь эхэндээ</option>
          <option className="bg-surface text-ink" value="oldest">Хуучин нь эхэндээ</option>
        </select>
      </div>

      {error ? (
        <ErrorState title="Төлбөрийн жагсаалт уншигдсангүй" hint={error} onRetry={reload} />
      ) : filtered.length === 0 ? (
        <Empty
          icon="card"
          title="Одоогоор төлбөр байхгүй."
          hint={
            q || statusFilter !== "ALL"
              ? "Шүүлтэд тохирох гүйлгээ алга"
              : "Хэрэглэгч Stripe-аар PRO авмагц гүйлгээ энд харагдана"
          }
        />
      ) : (
        <>
          {/* Desktop — бүрэн багана. Tablet (max-viz ≤1020px) — Хэрэгсэл/Огноог нууна.
              Mobile (max-nav ≤860px) — stacked card. */}
          <TableCard className="max-nav:hidden">
            <div className="grid grid-cols-[1.1fr_1.3fr_.9fr_.8fr_.9fr_.8fr] max-viz:grid-cols-[1.1fr_1.3fr_.9fr_.8fr] gap-3 items-center py-3 px-5 border-b border-white/[.08] bg-white/[.02]">
              <span className="mono">Хэрэглэгч</span>
              <span className="mono">Имэйл</span>
              <span className="mono">Дүн</span>
              <span className="mono max-viz:hidden">Хэрэгсэл</span>
              <span className="mono max-viz:hidden">Огноо</span>
              <span className="mono">Төлөв</span>
            </div>
            {filtered.map((p) => (
              <div
                key={p.id}
                className="grid grid-cols-[1.1fr_1.3fr_.9fr_.8fr_.9fr_.8fr] max-viz:grid-cols-[1.1fr_1.3fr_.9fr_.8fr] gap-3 items-center py-3 px-5 border-b border-white/[.06] last:border-b-0 text-body"
              >
                <span className="truncate">{p.userName}</span>
                <span className="text-dim truncate">{p.userEmail}</span>
                <span className="truncate tabular-nums">{p.amount}</span>
                <span className="text-dim truncate max-viz:hidden">{p.method}</span>
                <span className="font-mono text-caption text-faint max-viz:hidden">
                  {new Date(p.createdAt).toLocaleDateString("mn-MN")}
                </span>
                <StatusBadge label={STATUS_LABEL[p.status]} tone={STATUS_TONE[p.status]} />
              </div>
            ))}
          </TableCard>

          <div className="hidden max-nav:flex flex-col gap-2.5">
            {filtered.map((p) => (
              <div key={p.id} className="border border-white/[.08] rounded-2xl p-4 bg-white/[.03]">
                <div className="flex items-center justify-between mb-1.5">
                  <b className="text-copy truncate">{p.userName}</b>
                  <StatusBadge label={STATUS_LABEL[p.status]} tone={STATUS_TONE[p.status]} />
                </div>
                <span className="text-dim text-note block mb-2 truncate">{p.userEmail}</span>
                <div className="flex items-center justify-between text-note">
                  <span className="tabular-nums">
                    {p.amount} · {p.method}
                  </span>
                  <span className="font-mono text-faint">{new Date(p.createdAt).toLocaleDateString("mn-MN")}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
