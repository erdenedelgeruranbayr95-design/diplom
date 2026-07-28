"use client";

/* AdminPanel.tsx-ийн хэрэглэгчийн жагсаалт (хайлт + жагсаалт + устгах) — премиум elevated-card
   table (Supabase Studio pattern) руу шинэчлэв, .plv-create/.plv-search legacy CSS-ийг
   Tailwind search pill, role/subscription-г badge/chip болгов. loading/error/q/setQ/users/
   onDelete бүгд хэвээр — pagination эх кодод байхгүй тул энд ч нэмээгүй. */
import { Skeleton, Empty, ErrorState } from "@/components/ui/States";
import StatusBadge, { type StatusTone } from "@/components/ui/StatusBadge";
import type { AdminUserRow } from "@/types/auth";

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

export default function UsersTable({
  loading,
  error,
  onRetry,
  q,
  setQ,
  users,
  onDelete,
}: {
  loading: boolean;
  error: string;
  onRetry: () => void;
  q: string;
  setQ: (q: string) => void;
  users: AdminUserRow[];
  onDelete: (u: AdminUserRow) => void;
}) {
  if (loading) return <Skeleton variant="row" rows={5} />;
  if (error) return <ErrorState title="Ачаалагдсангүй" hint={error} onRetry={onRetry} />;

  return (
    <>
      <div className="relative mb-3.5">
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

      {users.length === 0 ? (
        <Empty icon="👥" title="Хэрэглэгч олдсонгүй" hint={q ? "Хайлтад тохирох хэрэглэгч алга" : "Одоогоор бүртгүүлсэн хэрэглэгч алга"} />
      ) : (
        <div className="border border-white/[.08] rounded-2xl max-h-[320px] overflow-y-auto [scrollbar-width:thin] [scrollbar-color:var(--faint)_transparent]">
          <div className="grid grid-cols-[1fr_1.5fr_.8fr_.7fr_.7fr_auto] max-[600px]:grid-cols-[1fr_auto] gap-3 items-center py-3 px-4 border-b border-white/[.08] text-[12.5px] bg-white/[.02] sticky top-0 z-[1]">
            <span className="mono">Нэр</span>
            <span className="mono max-[600px]:hidden">Имэйл</span>
            <span className="mono max-[600px]:hidden">Эрх</span>
            <span className="mono max-[600px]:hidden">Огноо</span>
            <span className="mono">Захиалга</span>
            <span></span>
          </div>
          {users.map((u, i) => (
            <div
              className="grid grid-cols-[1fr_1.5fr_.8fr_.7fr_.7fr_auto] max-[600px]:grid-cols-[1fr_auto] gap-3 items-center py-3 px-4 border-b border-white/[.06] text-[13.5px] transition-colors duration-150 last:border-b-0 hover:bg-white/[.03] [animation:row-in_.3s_cubic-bezier(.2,.8,.2,1)_backwards]"
              style={{ animationDelay: i >= 1 && i <= 7 ? `${Math.min(i, 7) * 0.03}s` : undefined }}
              key={u.id}
            >
              <span className="whitespace-nowrap overflow-hidden text-ellipsis">{u.name}</span>
              <span className="text-dim overflow-hidden text-ellipsis whitespace-nowrap max-[600px]:hidden">{u.email}</span>
              <StatusBadge label={ROLE_LABEL[u.role]} tone={ROLE_TONE[u.role]} className="max-[600px]:hidden" />
              <span className="font-mono text-[11px] text-faint max-[600px]:hidden">{u.createdAt ? new Date(u.createdAt).toLocaleDateString("mn-MN") : "—"}</span>
              <span className={"font-mono text-[10.5px] " + (u.subActive ? "text-aqua" : "text-faint")}>{u.subActive ? "PRO" : "—"}</span>
              <button
                className="text-[11px] text-[#E88A9B] border border-[rgba(232,138,155,.3)] rounded-full py-1 px-2.5 whitespace-nowrap transition-colors duration-250 hover:bg-[#E88A9B] hover:text-[#140306] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(232,138,155,.3)]"
                onClick={() => onDelete(u)}
                aria-label={u.email + " устгах"}
              >
                Устгах
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
