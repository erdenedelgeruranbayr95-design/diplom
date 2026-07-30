"use client";

/* AdminPanel.tsx-ийн хэрэглэгчийн жагсаалт (хайлт + жагсаалт + устгах + PRO эрх удирдах) —
   премиум elevated-card table (Supabase Studio pattern). loading/error/q/setQ/users/onDelete
   бүгд хэвээр. PRO Grant/Remove — backend дээр subActive/subPlan бичих PATCH endpoint
   байхгүй тул (зөвхөн GET /users уншдаг) localStorage demo-override давхарга ашиглана
   (admin-sub-overrides.ts) — Backend/JWT/DB огт хөндөгдөөгүй, зөвхөн энэ admin browser-т
   харагдана. Onclick-ууд stopPropagation хийхгүй ч мөр бүр button биш div тул асуудалгүй. */
import { useMemo, useState } from "react";
import { Skeleton, Empty, ErrorState } from "@/components/ui/States";
import StatusBadge, { type StatusTone } from "@/components/ui/StatusBadge";
import { ActionButton } from "@/components/ui/ActionGroup";
import ConfirmDialog from "./ConfirmDialog";
import { useToast } from "@/components/providers/ToastProvider";
import { setSubOverride } from "@/lib/data/admin-sub-overrides";
import type { AdminUserRow } from "@/types/auth";
import Icon from "@/components/ui/Icon";

const ROLE_LABEL: Record<AdminUserRow["role"], string> = {
  USER: "Хэрэглэгч",
  THERAPIST: "Эмч",
  PARENT: "Эцэг эх",
  ADMIN: "Админ",
};

const ROLE_TONE: Record<AdminUserRow["role"], StatusTone> = {
  USER: "faint",
  THERAPIST: "purple",
  PARENT: "warm",
  ADMIN: "aqua",
};

type SubFilter = "ALL" | "PRO" | "FREE";

export default function UsersTable({
  loading,
  error,
  onRetry,
  q,
  setQ,
  users,
  onDelete,
  onSubChanged,
}: {
  loading: boolean;
  error: string;
  onRetry: () => void;
  q: string;
  setQ: (q: string) => void;
  users: AdminUserRow[];
  onDelete: (u: AdminUserRow) => void;
  /* PRO эрх Grant/Remove хийсний дараа AdminPanel-ийн `users` state-ийг (жагсаалт + KPI)
     шинэчлэхийг мэдэгдэнэ — шинэ fetch биш, зөвхөн localStorage override merge. */
  onSubChanged: () => void;
}) {
  const toast = useToast();
  const [subFilter, setSubFilter] = useState<SubFilter>("ALL");
  const [confirmTarget, setConfirmTarget] = useState<{ u: AdminUserRow; kind: "grant" | "remove" } | null>(null);

  const filtered = useMemo(() => {
    if (subFilter === "PRO") return users.filter((u) => u.subActive);
    if (subFilter === "FREE") return users.filter((u) => !u.subActive);
    return users;
  }, [users, subFilter]);

  if (loading) return <Skeleton variant="row" rows={5} />;
  if (error) return <ErrorState title="Ачаалагдсангүй" hint={error} onRetry={onRetry} />;

  function runDecision() {
    if (!confirmTarget) return;
    const { u, kind } = confirmTarget;
    if (kind === "grant") {
      setSubOverride(u.id, true, "pro");
      toast.success(`${u.name} — PRO эрх олгогдлоо ✓`);
    } else {
      setSubOverride(u.id, false, null);
      toast.success(`${u.name} — PRO эрх цуцлагдлаа`);
    }
    setConfirmTarget(null);
    onSubChanged();
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-2.5 mb-3.5">
        <div className="relative flex-1 min-w-[180px]">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-faint pointer-events-none" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.5" y2="16.5" />
          </svg>
          <input
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/[.04] border border-white/[.08] text-ink text-[13.5px] transition-[border-color,box-shadow,background] duration-250 focus:bg-white/[.06] focus:border-aqua/60 focus-visible:outline-none focus-visible:shadow-glow-aqua placeholder:text-faint"
            placeholder="Нэр эсвэл имэйлээр хайх…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Хэрэглэгч хайх"
          />
        </div>
        <div className="flex gap-1.5" role="group" aria-label="Захиалгаар шүүх">
          {(["ALL", "PRO", "FREE"] as const).map((f) => (
            <button
              key={f}
              className={
                "text-[11.5px] font-mono rounded-full py-2 px-3.5 border transition-colors duration-200 focus-visible:outline-none focus-visible:shadow-glow-aqua " +
                (subFilter === f ? "bg-aqua border-aqua text-[#04100E] font-semibold" : "border-white/[.1] text-dim hover:text-ink hover:bg-white/[.05]")
              }
              onClick={() => setSubFilter(f)}
              aria-pressed={subFilter === f}
            >
              {f === "ALL" ? "Бүгд" : f === "PRO" ? "PRO" : "Free"}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <Empty icon="users" title="Хэрэглэгч олдсонгүй" hint={q ? "Хайлтад тохирох хэрэглэгч алга" : "Одоогоор бүртгүүлсэн хэрэглэгч алга"} />
      ) : (
        <div className="border border-white/[.08] rounded-2xl max-h-[360px] overflow-y-auto [scrollbar-width:thin] [scrollbar-color:var(--faint)_transparent]">
          <div className="grid grid-cols-[1fr_1.5fr_.8fr_.7fr_.8fr_auto] max-[680px]:grid-cols-[1fr_auto] gap-3 items-center py-3 px-4 border-b border-white/[.08] text-[12.5px] bg-white/[.02] sticky top-0 z-[1]">
            <span className="mono">Нэр</span>
            <span className="mono max-[680px]:hidden">Имэйл</span>
            <span className="mono max-[680px]:hidden">Эрх</span>
            <span className="mono max-[680px]:hidden">Огноо</span>
            <span className="mono">Захиалга</span>
            <span></span>
          </div>
          {filtered.map((u, i) => (
            <div
              className="grid grid-cols-[1fr_1.5fr_.8fr_.7fr_.8fr_auto] max-[680px]:grid-cols-[1fr_auto] gap-3 items-center py-3 px-4 border-b border-white/[.06] text-[13.5px] transition-colors duration-150 last:border-b-0 hover:bg-white/[.03] [animation:row-in_.3s_cubic-bezier(.2,.8,.2,1)_backwards]"
              style={{ animationDelay: i >= 1 && i <= 7 ? `${Math.min(i, 7) * 0.03}s` : undefined }}
              key={u.id}
            >
              <span className="whitespace-nowrap overflow-hidden text-ellipsis">{u.name}</span>
              <span className="text-dim overflow-hidden text-ellipsis whitespace-nowrap max-[680px]:hidden">{u.email}</span>
              <StatusBadge label={ROLE_LABEL[u.role]} tone={ROLE_TONE[u.role]} className="max-[680px]:hidden" />
              <span className="font-mono text-[11px] text-faint max-[680px]:hidden">{u.createdAt ? new Date(u.createdAt).toLocaleDateString("mn-MN") : "—"}</span>
              <StatusBadge label={u.subActive ? "PRO" : "Free"} tone={u.subActive ? "aqua" : "faint"} dot />
              <div className="flex items-center gap-1.5 justify-end">
                {u.subActive ? (
                  <ActionButton variant="danger" size="sm" onClick={() => setConfirmTarget({ u, kind: "remove" })}>
                    <Icon name="close" size={13} strokeWidth={2.2} />
                    Remove PRO
                  </ActionButton>
                ) : (
                  <ActionButton variant="primary" size="sm" onClick={() => setConfirmTarget({ u, kind: "grant" })}>
                    <Icon name="crown" size={13} />
                    Make PRO
                  </ActionButton>
                )}
                <button
                  className="text-[11px] text-[#E88A9B] border border-[rgba(232,138,155,.3)] rounded-full py-1 px-2.5 whitespace-nowrap transition-colors duration-250 hover:bg-[#E88A9B] hover:text-[#140306] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(232,138,155,.3)]"
                  onClick={() => onDelete(u)}
                  aria-label={u.email + " устгах"}
                >
                  Устгах
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!confirmTarget}
        title={confirmTarget?.kind === "grant" ? "PRO эрх олгох уу?" : "PRO эрх цуцлах уу?"}
        description={
          confirmTarget?.kind === "grant"
            ? `Та ${confirmTarget.u.name} хэрэглэгчид PRO эрх олгох гэж байна.`
            : confirmTarget
              ? `Та ${confirmTarget.u.name} хэрэглэгчийн PRO эрхийг цуцлах гэж байна.`
              : ""
        }
        confirmLabel={confirmTarget?.kind === "grant" ? "Grant PRO" : "Remove"}
        tone={confirmTarget?.kind === "remove" ? "danger" : "primary"}
        onConfirm={runDecision}
        onCancel={() => setConfirmTarget(null)}
      />
    </>
  );
}
