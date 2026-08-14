"use client";

import StatCard from "@/components/player/StatCard";
import { SectionTitle } from "@/components/ui/PageHeader";
import { TableCard } from "@/components/ui/Surface";
import StatusBadge, { type StatusTone } from "@/components/ui/StatusBadge";
import UserAvatar from "@/components/ui/UserAvatar";
import RootSection from "../RootSection";
import type { RootData } from "@/lib/root/hooks/useRootMetrics";
import type { AdminUserRow, UserRole } from "@/types/auth";

const ROLE_LABEL: Record<UserRole, string> = {
  ROOT: "Систем эзэмшигч",
  ADMIN: "Админ",
  CURATOR: "Куратор",
  MODERATOR: "Модератор",
  ARTIST: "Уран бүтээлч",
  USER: "Хэрэглэгч",
};
const ROLE_TONE: Record<UserRole, StatusTone> = {
  ROOT: "rose",
  ADMIN: "aqua",
  CURATOR: "purple",
  MODERATOR: "purple",
  ARTIST: "warm",
  USER: "faint",
};

export default function RootDashboard({ data }: { data: RootData }) {
  const { metrics, users, songs, artists } = data;
  const recent = [...users]
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .slice(0, 6);

  return (
    <RootSection
      title="Хяналтын самбар"
      eyebrow="ROOT"
      description="Системийн ерөнхий үзүүлэлт — бүх тоо бодит өгөгдлөөс шууд тооцоологдоно."
      loading={data.loading}
      error={data.error}
      onRetry={data.reload}
    >
      <div className="grid grid-cols-3 max-viz:grid-cols-2 max-nav:grid-cols-1 gap-3.5">
        <StatCard icon="users" color="c-aqua" value={metrics.totalUsers.toLocaleString()} label="Нийт хэрэглэгч" />
        <StatCard icon="crown" color="c-gold" value={metrics.premiumUsers.toLocaleString()} label="PRO хэрэглэгч" />
        <StatCard icon="money" color="c-gold" value={metrics.revenue.toLocaleString()} label="Орлого (₮)" />
        <StatCard icon="music" color="c-purple" value={metrics.songs.toLocaleString()} label="Дууны сан" />
        <StatCard icon="mic" color="c-purple" value={metrics.artistAccounts.toLocaleString()} label="Уран бүтээлч" />
        <StatCard icon="shield" color="c-rose" value={metrics.catalogStaff.toLocaleString()} label="Каталогийн ажилтан" />
      </div>

      <div className="mt-9">
        <SectionTitle title="Каталогийн тойм" description="Платформ дээрх нийт дуу ба дуучны хуудасны тоо" />
      </div>
      <div className="grid grid-cols-2 max-nav:grid-cols-1 gap-3.5">
        <StatCard icon="disc" color="c-purple" value={songs.length.toLocaleString()} label="Нийт дуу" />
        <StatCard icon="mic" color="c-aqua" value={artists.length.toLocaleString()} label="Дуучны хуудас" />
      </div>

      <div className="mt-9">
        <SectionTitle title="Сүүлд бүртгүүлсэн" description={`${users.length} бүртгэлээс сүүлийн 6`} />
      </div>
      <RecentUsersTable rows={recent} />
    </RootSection>
  );
}

function RecentUsersTable({ rows }: { rows: AdminUserRow[] }) {
  return (
    <TableCard>
      <div className="grid grid-cols-[1.2fr_1.6fr_.9fr_.8fr] max-nav:grid-cols-[1fr_.9fr_.8fr] gap-3 items-center py-3 px-5 border-b border-white/[.08] bg-white/[.02]">
        <span className="mono">Нэр</span>
        <span className="mono max-nav:hidden">Имэйл</span>
        <span className="mono">Дүр</span>
        <span className="mono">Бүртгүүлсэн</span>
      </div>
      {rows.map((u) => (
        <div
          key={u.id}
          className="grid grid-cols-[1.2fr_1.6fr_.9fr_.8fr] max-nav:grid-cols-[1fr_.9fr_.8fr] gap-3 items-center py-3 px-5 border-b border-white/[.06] last:border-b-0 text-body transition-colors duration-150 hover:bg-white/[.03]"
        >
          <span className="flex items-center gap-2.5 min-w-0">
            <UserAvatar name={u.name} size="sm" />
            <span className="truncate">{u.name}</span>
          </span>
          <span className="text-dim truncate max-nav:hidden">{u.email}</span>
          <StatusBadge label={ROLE_LABEL[u.role]} tone={ROLE_TONE[u.role]} />
          <span className="font-mono text-caption text-faint">{new Date(u.createdAt).toLocaleDateString("mn-MN")}</span>
        </div>
      ))}
    </TableCard>
  );
}

export { ROLE_LABEL, ROLE_TONE };
