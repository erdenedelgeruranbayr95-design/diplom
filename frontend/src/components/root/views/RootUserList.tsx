"use client";

import { useMemo, useState } from "react";
import { TableCard } from "@/components/ui/Surface";
import StatusBadge from "@/components/ui/StatusBadge";
import UserAvatar from "@/components/ui/UserAvatar";
import { Empty } from "@/components/ui/States";
import Icon from "@/components/ui/Icon";
import StaffCreationForm from "@/components/admin/StaffCreationForm";
import { useToast } from "@/components/providers/ToastProvider";
import { createUser } from "@/lib/api/client";
import RootSection from "../RootSection";
import RootUserActions from "../RootUserActions";
import { ROLE_LABEL, ROLE_TONE } from "./RootDashboard";
import type { RootData } from "@/lib/root/hooks/useRootMetrics";
import type { AdminUserRow, UserRole } from "@/types/auth";

/* Хэрэглэгчийн жагсаалтын НЭГ хувилбар — Хэрэглэгчид · Админууд · Уран бүтээлчид ·
   Куратор·Модератор дөрвүүлээ ижил хүснэгт, зөвхөн дүрийн шүүлт нь өөр (Player-ийн
   `LibraryView`-ийн COLLECTION_VIEWS хэв маягтай ижил зарчим). Бүгд GET /users дээр
   суурилна. */
export default function RootUserList({
  data,
  title,
  eyebrow,
  description,
  roles,
  emptyTitle,
  showCreateStaff,
}: {
  data: RootData;
  title: string;
  eyebrow: string;
  description: string;
  /** Харуулах дүрүүд. Хоосон бол ROOT/ADMIN-аас бусад бүгд. */
  roles?: UserRole[];
  emptyTitle: string;
  /** "Админууд" жагсаалт дээр л ажилтан (Админ/Уран бүтээлч) бүртгэх форм харуулна. */
  showCreateStaff?: boolean;
}) {
  const toast = useToast();
  const [query, setQuery] = useState("");
  const [newRole, setNewRole] = useState<"ARTIST" | "ADMIN">("ADMIN");
  const [createMsg, setCreateMsg] = useState("");
  const [creating, setCreating] = useState(false);

  const rows = useMemo(() => {
    const staff = new Set<UserRole>(["ROOT", "ADMIN"]);
    const base = roles ? data.users.filter((u) => roles.includes(u.role)) : data.users.filter((u) => !staff.has(u.role));
    const term = query.trim().toLowerCase();
    if (!term) return base;
    return base.filter((u) => u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term));
  }, [data.users, roles, query]);

  async function createStaff(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCreateMsg("");
    const f = new FormData(e.currentTarget);
    const name = ((f.get("name") as string) || "").trim();
    const email = ((f.get("email") as string) || "").trim();
    const password = (f.get("password") as string) || "";

    if (name.length < 2) {
      setCreateMsg("❌ Нэрээ оруулна уу");
      return;
    }
    if (password.length < 6) {
      setCreateMsg("❌ Нууц үг дор хаяж 6 тэмдэгт байх ёстой");
      return;
    }

    setCreating(true);
    try {
      await createUser({ name, email, password, role: newRole });
      setCreateMsg("✅ Бүртгэгдлээ");
      (e.target as HTMLFormElement).reset();
      toast.success(`${name} ажилтнаар бүртгэгдлээ`);
      data.reload();
    } catch (err) {
      setCreateMsg("❌ " + (err as Error).message);
    } finally {
      setCreating(false);
    }
  }

  return (
    <RootSection
      title={title}
      eyebrow={eyebrow}
      description={description}
      loading={data.loading}
      error={data.error}
      onRetry={data.reload}
      actions={
        <span className="mono !text-meta py-2 px-3.5 rounded-full border border-white/[.08] bg-white/[.03] whitespace-nowrap">
          {rows.length.toLocaleString()} бүртгэл
        </span>
      }
    >
      {showCreateStaff && (
        <StaffCreationForm newRole={newRole} setNewRole={setNewRole} createMsg={createMsg} creating={creating} onSubmit={createStaff} />
      )}

      <div className="relative mb-4 max-w-[420px]">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dim pointer-events-none flex" aria-hidden="true">
          <Icon name="search" size={15} />
        </span>
        <input
          className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/[.04] border border-white/[.08] text-ink text-body transition-[border-color,box-shadow,background] duration-250 focus:bg-white/[.06] focus:border-aqua/60 focus-visible:outline-none focus-visible:shadow-glow-aqua placeholder:text-faint"
          placeholder="Нэр эсвэл имэйлээр хайх…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Хэрэглэгч хайх"
        />
      </div>

      {rows.length === 0 ? (
        <Empty icon="users" title={emptyTitle} hint={query ? "Хайлтад тохирох бүртгэл алга" : undefined} />
      ) : (
        <UserTable rows={rows} onChanged={data.reload} />
      )}
    </RootSection>
  );
}

function UserTable({ rows, onChanged }: { rows: AdminUserRow[]; onChanged: () => void }) {
  return (
    <TableCard>
      <div className="grid grid-cols-[1fr_1.3fr_.6fr_.6fr_.8fr_auto] max-viz:grid-cols-[1fr_.6fr_auto] gap-3 items-center py-3 px-5 border-b border-white/[.08] bg-white/[.02]">
        <span className="mono">Нэр</span>
        <span className="mono max-viz:hidden">Имэйл</span>
        <span className="mono">Дүр</span>
        <span className="mono max-viz:hidden">Төлөв</span>
        <span className="mono max-viz:hidden">Сүүлд нэвтэрсэн</span>
        <span className="mono text-right">Удирдлага</span>
      </div>
      {rows.map((u) => (
        <div
          key={u.id}
          className="grid grid-cols-[1fr_1.3fr_.6fr_.6fr_.8fr_auto] max-viz:grid-cols-[1fr_.6fr_auto] gap-3 items-center py-3 px-5 border-b border-white/[.06] last:border-b-0 text-body transition-colors duration-150 hover:bg-white/[.03]"
        >
          <span className="flex items-center gap-2.5 min-w-0">
            <UserAvatar name={u.name} size="sm" />
            <span className="min-w-0">
              <span className="block truncate">{u.name}</span>
              <span className="block text-caption text-faint truncate max-viz:hidden">{u.email}</span>
            </span>
          </span>
          <span className="text-dim truncate max-viz:hidden">{u.email}</span>
          <StatusBadge label={ROLE_LABEL[u.role]} tone={ROLE_TONE[u.role]} />
          <span className="max-viz:hidden">
            {u.status === "BANNED" ? <StatusBadge label="Түдгэлзсэн" tone="rose" /> : <StatusBadge label="Идэвхтэй" tone="aqua" />}
          </span>
          <span className="text-dim text-caption max-viz:hidden">
            {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString("mn-MN") : "Хэзээ ч нэвтрээгүй"}
          </span>
          <RootUserActions user={u} onChanged={onChanged} />
        </div>
      ))}
    </TableCard>
  );
}
