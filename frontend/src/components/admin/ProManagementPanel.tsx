"use client";

/* Admin dashboard-ийн "💎 PRO" таб — PRO subscription-ий удирдлагын төв. Backend дээр
   Payment/Subscription-ийн write endpoint байхгүй тул (зөвхөн User.subActive/subPlan
   унших боломжтой, GET /users-аар) энэ таб 2 давхарга ашиглана:
     1) Overview-ийн "Нийт хэрэглэгч" / "PRO хэрэглэгч" — БОДИТ GET /users өгөгдөл.
     2) Payment Requests table — localhost demo layer (admin-payment-requests.ts),
        SubscribeModal QR нээгдэх мөчид бичигддэг, Approve/Reject нь зөвхөн энэ demo
        record-ийн статусыг өөрчилдөг. Backend/JWT/DB огт хөндөгдөөгүй.
   "Сарын орлого" backend дээр бодитоор тооцох боломжгүй (Payment бүхэлдээ per-user
   localStorage, cross-user aggregation хийх сервер тал байхгүй) тул "—" харуулна —
   хуурамч тоо зохиомжлохгүй. */
import { useEffect, useMemo, useState } from "react";
import { Empty } from "@/components/ui/States";
import StatusBadge, { type StatusTone } from "@/components/ui/StatusBadge";
import { useToast } from "@/components/providers/ToastProvider";
import ConfirmDialog from "./ConfirmDialog";
import PaymentRequestDrawer from "./PaymentRequestDrawer";
import {
  loadPaymentRequests,
  decidePaymentRequest,
  type AdminPaymentRequest,
  type PaymentRequestStatus,
} from "@/lib/data/admin-payment-requests";
import type { AdminUserRow } from "@/types/auth";

const STATUS_LABEL: Record<PaymentRequestStatus, string> = {
  PENDING: "Хүлээгдэж байна",
  APPROVED: "Зөвшөөрсөн",
  REJECTED: "Татгалзсан",
};
const STATUS_TONE: Record<PaymentRequestStatus, StatusTone> = {
  PENDING: "warm",
  APPROVED: "aqua",
  REJECTED: "rose",
};
type FilterStatus = PaymentRequestStatus | "ALL";
type SortOrder = "newest" | "oldest";

export default function ProManagementPanel({ users }: { users: AdminUserRow[] }) {
  const toast = useToast();
  const [requests, setRequests] = useState<AdminPaymentRequest[]>([]);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("ALL");
  const [sort, setSort] = useState<SortOrder>("newest");
  const [drawerId, setDrawerId] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<{ req: AdminPaymentRequest; kind: "approve" | "reject" } | null>(null);

  function reload() {
    setRequests(loadPaymentRequests());
  }

  useEffect(() => {
    reload();
    const onChange = () => reload();
    addEventListener("medreh:payment-requests-changed", onChange);
    addEventListener("storage", onChange);
    return () => {
      removeEventListener("medreh:payment-requests-changed", onChange);
      removeEventListener("storage", onChange);
    };
  }, []);

  const totalUsers = users.filter((u) => u.role !== "ADMIN").length;
  const proUsers = users.filter((u) => u.subActive).length;
  const pendingCount = requests.filter((r) => r.status === "PENDING").length;

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    let list = requests;
    if (statusFilter !== "ALL") list = list.filter((r) => r.status === statusFilter);
    if (term) {
      list = list.filter(
        (r) => r.userName.toLowerCase().includes(term) || r.userEmail.toLowerCase().includes(term) || r.plan.toLowerCase().includes(term),
      );
    }
    return [...list].sort((a, b) => (sort === "newest" ? b.submittedAt - a.submittedAt : a.submittedAt - b.submittedAt));
  }, [requests, q, statusFilter, sort]);

  const drawerRequest = requests.find((r) => r.id === drawerId) || null;

  function askApprove(r: AdminPaymentRequest) {
    setConfirmAction({ req: r, kind: "approve" });
  }
  function askReject(r: AdminPaymentRequest) {
    setConfirmAction({ req: r, kind: "reject" });
  }

  function runDecision(reason?: string) {
    if (!confirmAction) return;
    const { req, kind } = confirmAction;
    decidePaymentRequest(req.id, kind === "approve" ? "APPROVED" : "REJECTED", reason);
    reload();
    setConfirmAction(null);
    setDrawerId(null);
    toast.success(kind === "approve" ? `${req.userName} — PRO зөвшөөрөгдлөө ✓` : `${req.userName} — хүсэлт татгалзагдлаа`);
  }

  return (
    <>
      <div className="grid grid-cols-4 max-viz:grid-cols-2 gap-3 my-5 mb-6">
        <StatCard icon="👥" value={totalUsers} label="Нийт хэрэглэгч" tone="aqua" />
        <StatCard icon="💎" value={proUsers} label="PRO хэрэглэгч" tone="warm" />
        <StatCard icon="🟡" value={pendingCount} label="Хүлээгдэж буй" tone="warm" />
        <StatCard icon="📈" value="—" label="Сарын орлого" tone="faint" />
      </div>

      <div className="flex flex-wrap items-center gap-2.5 mb-4">
        <div className="relative flex-1 min-w-[180px]">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-faint pointer-events-none" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.5" y2="16.5" />
          </svg>
          <input
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/[.04] border border-white/[.08] text-ink text-[13.5px] transition-[border-color,box-shadow,background] duration-250 focus:bg-white/[.06] focus:border-aqua/60 focus-visible:outline-none focus-visible:shadow-glow-aqua placeholder:text-faint"
            placeholder="Нэр, имэйл, планаар хайх…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Төлбөрийн хүсэлт хайх"
          />
        </div>
        <select
          className="py-2.5 px-3.5 rounded-full bg-white/[.04] border border-white/[.08] text-ink text-[12.5px] font-mono transition-[border-color,box-shadow] duration-250 focus:border-aqua focus-visible:outline-none focus-visible:shadow-glow-aqua"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as FilterStatus)}
          aria-label="Төлөвөөр шүүх"
        >
          <option className="bg-[#0D1414] text-ink" value="ALL">Бүгд</option>
          <option className="bg-[#0D1414] text-ink" value="PENDING">Хүлээгдэж байна</option>
          <option className="bg-[#0D1414] text-ink" value="APPROVED">Зөвшөөрсөн</option>
          <option className="bg-[#0D1414] text-ink" value="REJECTED">Татгалзсан</option>
        </select>
        <select
          className="py-2.5 px-3.5 rounded-full bg-white/[.04] border border-white/[.08] text-ink text-[12.5px] font-mono transition-[border-color,box-shadow] duration-250 focus:border-aqua focus-visible:outline-none focus-visible:shadow-glow-aqua"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOrder)}
          aria-label="Эрэмбэлэх"
        >
          <option className="bg-[#0D1414] text-ink" value="newest">Шинэ нь эхэндээ</option>
          <option className="bg-[#0D1414] text-ink" value="oldest">Хуучин нь эхэндээ</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <Empty icon="💳" title="Одоогоор төлбөр байхгүй." hint={q || statusFilter !== "ALL" ? "Шүүлтэд тохирох хүсэлт алга" : "Хэрэглэгч PRO авахаар хүсэлт илгээмэгц энд харагдана"} />
      ) : (
        <>
          {/* Desktop — бүрэн 7 багана. Tablet (compact, max-viz ≤1020px) — Хэрэгсэл/Огноо
              баганыг нуугаад drawer-т үлдээнэ. Mobile (max-nav ≤860px) — stacked card. */}
          <div className="max-nav:hidden border border-white/[.08] rounded-2xl overflow-hidden bg-white/[.015]">
            <div className="grid grid-cols-[1.1fr_1.3fr_.9fr_.8fr_.9fr_.8fr_auto] max-viz:grid-cols-[1.1fr_1.3fr_.9fr_.8fr_auto] gap-3 items-center py-3 px-5 border-b border-white/[.08] bg-white/[.02]">
              <span className="mono">Хэрэглэгч</span>
              <span className="mono">Имэйл</span>
              <span className="mono">План</span>
              <span className="mono max-viz:hidden">Хэрэгсэл</span>
              <span className="mono max-viz:hidden">Огноо</span>
              <span className="mono">Төлөв</span>
              <span></span>
            </div>
            {filtered.map((r) => (
              <button
                key={r.id}
                className="w-full grid grid-cols-[1.1fr_1.3fr_.9fr_.8fr_.9fr_.8fr_auto] max-viz:grid-cols-[1.1fr_1.3fr_.9fr_.8fr_auto] gap-3 items-center py-3 px-5 border-b border-white/[.06] last:border-b-0 text-[13px] text-left transition-colors duration-150 hover:bg-white/[.03] focus-visible:outline-none focus-visible:bg-white/[.05] focus-visible:shadow-[inset_0_0_0_2px_var(--aqua)]"
                onClick={() => setDrawerId(r.id)}
              >
                <span className="truncate">{r.userName}</span>
                <span className="text-dim truncate">{r.userEmail}</span>
                <span className="truncate">{r.plan}</span>
                <span className="text-dim truncate max-viz:hidden">{r.method}</span>
                <span className="font-mono text-[11px] text-faint max-viz:hidden">{new Date(r.submittedAt).toLocaleDateString("mn-MN")}</span>
                <StatusBadge label={STATUS_LABEL[r.status]} tone={STATUS_TONE[r.status]} />
                <span className="text-faint text-[11px]">Дэлгэрэнгүй →</span>
              </button>
            ))}
          </div>

          <div className="hidden max-nav:flex flex-col gap-2.5">
            {filtered.map((r) => (
              <button
                key={r.id}
                className="text-left border border-white/[.08] rounded-2xl p-4 bg-white/[.03] transition-colors duration-150 hover:bg-white/[.05] focus-visible:outline-none focus-visible:shadow-glow-aqua"
                onClick={() => setDrawerId(r.id)}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <b className="text-[14px] truncate">{r.userName}</b>
                  <StatusBadge label={STATUS_LABEL[r.status]} tone={STATUS_TONE[r.status]} />
                </div>
                <span className="text-dim text-[12px] block mb-2 truncate">{r.userEmail}</span>
                <div className="flex items-center justify-between text-[12px]">
                  <span>{r.plan} · {r.method}</span>
                  <span className="font-mono text-faint">{new Date(r.submittedAt).toLocaleDateString("mn-MN")}</span>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      <PaymentRequestDrawer request={drawerRequest} onClose={() => setDrawerId(null)} onApprove={askApprove} onReject={askReject} />

      <ConfirmDialog
        open={!!confirmAction}
        title={confirmAction?.kind === "approve" ? "PRO эрх зөвшөөрөх үү?" : "Хүсэлтийг татгалзах уу?"}
        description={
          confirmAction
            ? `${confirmAction.req.userName} (${confirmAction.req.userEmail}) — ${confirmAction.req.plan}`
            : ""
        }
        confirmLabel={confirmAction?.kind === "approve" ? "Зөвшөөрөх" : "Татгалзах"}
        tone={confirmAction?.kind === "reject" ? "danger" : "primary"}
        requireReason={confirmAction?.kind === "reject"}
        onConfirm={runDecision}
        onCancel={() => setConfirmAction(null)}
      />
    </>
  );
}

function StatCard({ icon, value, label, tone }: { icon: string; value: number | string; label: string; tone: "aqua" | "warm" | "faint" }) {
  const toneCls = { aqua: "bg-aqua/[.1] text-aqua", warm: "bg-warm/[.1] text-warm", faint: "bg-white/[.06] text-faint" }[tone];
  return (
    <div className="flex items-start gap-3 p-4 rounded-2xl border border-white/[.08] bg-white/[.03] transition-colors duration-200 hover:bg-white/[.05]">
      <span className={"w-10 h-10 flex-none rounded-xl flex items-center justify-center text-[16px] " + toneCls} aria-hidden="true">
        {icon}
      </span>
      <div className="min-w-0">
        <b className="block font-display text-[22px] leading-tight">{value}</b>
        <span className="mono !text-[9px]">{label}</span>
      </div>
    </div>
  );
}
