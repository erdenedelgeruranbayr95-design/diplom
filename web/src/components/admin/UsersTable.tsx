"use client";

/* AdminPanel.tsx-ийн хэрэглэгчийн жагсаалт (хайлт + жагсаалт + устгах) — тусад нь гаргасан.
   CSS/behavior бүгд өөрчлөгдөөгүй, зөвхөн component boundary шилжсэн. Одоогийн эх кодод
   pagination байхгүй тул энд ч нэмээгүй. */
import { Skeleton, Empty, ErrorState } from "@/components/ui/States";
import type { AdminUserRow } from "@/types/auth";

const ROLE_LABEL: Record<AdminUserRow["role"], string> = {
  USER: "Хэрэглэгч",
  THERAPIST: "Эмч",
  PARENT: "Эцэг эх",
  ADMIN: "Админ",
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
      <form className="plv-create" onSubmit={(e) => e.preventDefault()} style={{ marginBottom: 14 }}>
        <input className="plv-search" placeholder="Нэр эсвэл имэйлээр хайх…" value={q} onChange={(e) => setQ(e.target.value)} />
      </form>

      {users.length === 0 ? (
        <Empty icon="👥" title="Хэрэглэгч олдсонгүй" hint={q ? "Хайлтад тохирох хэрэглэгч алга" : "Одоогоор бүртгүүлсэн хэрэглэгч алга"} />
      ) : (
        <div className="border border-line rounded-sm max-h-[300px] overflow-y-auto [scrollbar-width:thin] [scrollbar-color:var(--faint)_transparent]">
          <div className="grid grid-cols-[1fr_1.5fr_.7fr_.6fr_.6fr_auto] max-[600px]:grid-cols-[1fr_auto] gap-3 items-center py-3 px-4 border-b border-line text-[13.5px] bg-white/[.02] sticky top-0 z-[1]">
            <span className="mono">Нэр</span>
            <span className="mono max-[600px]:hidden">Имэйл</span>
            <span className="mono max-[600px]:hidden">Эрх</span>
            <span className="mono max-[600px]:hidden">Огноо</span>
            <span className="mono">Захиалга</span>
            <span></span>
          </div>
          {users.map((u, i) => (
            <div
              className="grid grid-cols-[1fr_1.5fr_.7fr_.6fr_.6fr_auto] max-[600px]:grid-cols-[1fr_auto] gap-3 items-center py-3 px-4 border-b border-line text-[13.5px] transition-colors duration-150 last:border-b-0 hover:bg-white/[.035] [animation:row-in_.3s_cubic-bezier(.2,.8,.2,1)_backwards]"
              style={{ animationDelay: i >= 1 && i <= 7 ? `${Math.min(i, 7) * 0.03}s` : undefined }}
              key={u.id}
            >
              <span>{u.name}</span>
              <span className="text-dim overflow-hidden text-ellipsis whitespace-nowrap max-[600px]:hidden">{u.email}</span>
              <span className="max-[600px]:hidden">{ROLE_LABEL[u.role]}</span>
              <span className="font-mono text-[11px] text-faint max-[600px]:hidden">{u.createdAt ? new Date(u.createdAt).toLocaleDateString("mn-MN") : "—"}</span>
              <span className={"font-mono text-[10.5px] " + (u.subActive ? "text-aqua" : "text-faint")}>{u.subActive ? "PRO" : "—"}</span>
              <button className="adm-del" onClick={() => onDelete(u)} aria-label={u.email + " устгах"}>
                Устгах
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
