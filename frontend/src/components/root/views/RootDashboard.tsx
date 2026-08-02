"use client";

import StatCard from "@/components/player/StatCard";
import { SectionTitle } from "@/components/ui/PageHeader";
import { TableCard } from "@/components/ui/Surface";
import StatusBadge, { type StatusTone } from "@/components/ui/StatusBadge";
import UserAvatar from "@/components/ui/UserAvatar";
import Icon from "@/components/ui/Icon";
import RootSection from "../RootSection";
import type { RootData, RootMetric } from "@/lib/root/hooks/useRootMetrics";
import type { AdminUserRow, UserRole } from "@/types/auth";

const ROLE_LABEL: Record<UserRole, string> = {
  ROOT: "Систем эзэмшигч",
  ADMIN: "Админ",
  CURATOR: "Куратор",
  MODERATOR: "Модератор",
  THERAPIST: "Эмч",
  PARENT: "Эцэг эх",
  USER: "Хэрэглэгч",
};
const ROLE_TONE: Record<UserRole, StatusTone> = {
  ROOT: "rose",
  ADMIN: "aqua",
  CURATOR: "purple",
  MODERATOR: "purple",
  THERAPIST: "purple",
  PARENT: "warm",
  USER: "faint",
};

/* Эх сурвалжгүй метрикийг "—" гэж харуулж, шалтгааныг `title`-д тайлбарлана.
   Хуурамч тоо ХЭЗЭЭ Ч гаргахгүй (одоо байгаа "Сарын орлого → —" зарчимтай ижил). */
function MetricCard({ metric, icon, color, label }: { metric: RootMetric; icon: string; color: string; label: string }) {
  if (metric.value === null) {
    return (
      <span title={metric.unavailableReason} className="contents">
        <StatCard icon={icon} color="" value="—" label={label} />
      </span>
    );
  }
  return <StatCard icon={icon} color={color} value={metric.value.toLocaleString()} label={label} />;
}

export default function RootDashboard({ data }: { data: RootData }) {
  const { metrics, users, songs, artists, assignments } = data;
  const recent = [...users]
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .slice(0, 6);
  const pending = Object.values(metrics).filter((m: RootMetric) => m.value === null).length;

  return (
    <RootSection
      title="Хяналтын самбар"
      eyebrow="ROOT"
      description="Системийн ерөнхий үзүүлэлт — бүх тоо одоо байгаа backend endpoint-оос шууд гарна."
      loading={data.loading}
      error={data.error}
      onRetry={data.reload}
    >
      <div className="grid grid-cols-3 max-viz:grid-cols-2 max-nav:grid-cols-1 gap-3.5">
        <MetricCard metric={metrics.totalUsers} icon="users" color="c-aqua" label="Нийт хэрэглэгч" />
        <MetricCard metric={metrics.onlineUsers} icon="activity" color="c-aqua" label="Онлайн хэрэглэгч" />
        <MetricCard metric={metrics.premiumUsers} icon="crown" color="c-gold" label="PRO хэрэглэгч" />
        <MetricCard metric={metrics.revenue} icon="money" color="c-gold" label="Орлого" />
        <MetricCard metric={metrics.songs} icon="music" color="c-purple" label="Дууны сан" />
        <MetricCard metric={metrics.therapists} icon="stethoscope" color="c-purple" label="Эмч нар" />
        <MetricCard metric={metrics.parents} icon="family" color="c-rose" label="Эцэг эхчүүд" />
        <MetricCard metric={metrics.connectedDevices} icon="device" color="c-rose" label="Холбогдсон төхөөрөмж" />
        <MetricCard metric={metrics.qrSessions} icon="link" color="c-aqua" label="QR сесс" />
      </div>

      {pending > 0 && (
        <p className="mt-4 flex items-start gap-2.5 text-note text-dim leading-[1.55]">
          <span className="text-warm flex-none mt-[2px]" aria-hidden="true">
            <Icon name="alert" size={14} />
          </span>
          <span>
            <b className="text-ink font-semibold">{pending} үзүүлэлт</b> «—» байна — эдгээрийг өгөх backend endpoint одоогоор
            байхгүй. Хуурамч тоо гаргахын оронд хоосон үлдээв (картын дээр очиход шалтгаан харагдана).
          </span>
        </p>
      )}

      <div className="mt-9">
        <SectionTitle title="Каталогийн тойм" description="GET /songs · GET /artists · GET /assignments/therapists" />
      </div>
      <div className="grid grid-cols-3 max-nav:grid-cols-1 gap-3.5">
        <StatCard icon="disc" color="c-purple" value={songs.length.toLocaleString()} label="Нийт дуу" />
        <StatCard icon="mic" color="c-aqua" value={artists.length.toLocaleString()} label="Уран бүтээлч" />
        <StatCard icon="clipboard" color="c-gold" value={assignments.length.toLocaleString()} label="Эмчийн томилолт" />
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
