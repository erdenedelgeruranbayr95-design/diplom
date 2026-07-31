"use client";

import { useMemo, useState } from "react";
import { TableCard } from "@/components/ui/Surface";
import StatusBadge from "@/components/ui/StatusBadge";
import UserAvatar from "@/components/ui/UserAvatar";
import { Empty } from "@/components/ui/States";
import Icon from "@/components/ui/Icon";
import RootSection from "../RootSection";
import { ROLE_LABEL, ROLE_TONE } from "./RootDashboard";
import type { RootData } from "@/lib/root/hooks/useRootMetrics";
import type { AdminUserRow, UserRole } from "@/types/auth";

/* Хэрэглэгчийн жагсаалтын НЭГ хувилбар — Хэрэглэгчид · Админууд · Эмч нар · Эцэг эхчүүд
   дөрвүүлээ ижил хүснэгт, зөвхөн дүрийн шүүлт нь өөр (Player-ийн `LibraryView`-ийн
   COLLECTION_VIEWS хэв маягтай ижил зарчим). Бүгд GET /users дээр суурилна. */
export default function RootUserList({
  data,
  title,
  eyebrow,
  description,
  roles,
  emptyTitle,
}: {
  data: RootData;
  title: string;
  eyebrow: string;
  description: string;
  /** Харуулах дүрүүд. Хоосон бол ROOT/ADMIN-аас бусад бүгд. */
  roles?: UserRole[];
  emptyTitle: string;
}) {
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const staff = new Set<UserRole>(["ROOT", "ADMIN"]);
    const base = roles ? data.users.filter((u) => roles.includes(u.role)) : data.users.filter((u) => !staff.has(u.role));
    const term = query.trim().toLowerCase();
    if (!term) return base;
    return base.filter((u) => u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term));
  }, [data.users, roles, query]);

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
        <UserTable rows={rows} />
      )}
    </RootSection>
  );
}

function UserTable({ rows }: { rows: AdminUserRow[] }) {
  return (
    <TableCard>
      <div className="grid grid-cols-[1.2fr_1.6fr_.9fr_.7fr_.8fr] max-nav:grid-cols-[1fr_.8fr_.8fr] gap-3 items-center py-3 px-5 border-b border-white/[.08] bg-white/[.02]">
        <span className="mono">Нэр</span>
        <span className="mono max-nav:hidden">Имэйл</span>
        <span className="mono">Дүр</span>
        <span className="mono max-nav:hidden">Захиалга</span>
        <span className="mono">Бүртгүүлсэн</span>
      </div>
      {rows.map((u) => (
        <div
          key={u.id}
          className="grid grid-cols-[1.2fr_1.6fr_.9fr_.7fr_.8fr] max-nav:grid-cols-[1fr_.8fr_.8fr] gap-3 items-center py-3 px-5 border-b border-white/[.06] last:border-b-0 text-body transition-colors duration-150 hover:bg-white/[.03]"
        >
          <span className="flex items-center gap-2.5 min-w-0">
            <UserAvatar name={u.name} size="sm" />
            <span className="truncate">{u.name}</span>
          </span>
          <span className="text-dim truncate max-nav:hidden">{u.email}</span>
          <StatusBadge label={ROLE_LABEL[u.role]} tone={ROLE_TONE[u.role]} />
          <span className="max-nav:hidden">
            {u.subActive ? <StatusBadge label="PRO" tone="aqua" /> : <span className="text-faint text-caption">Үнэгүй</span>}
          </span>
          <span className="font-mono text-caption text-faint">{new Date(u.createdAt).toLocaleDateString("mn-MN")}</span>
        </div>
      ))}
    </TableCard>
  );
}
