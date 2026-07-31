"use client";

import { useMemo } from "react";
import StatCard from "@/components/player/StatCard";
import { SectionTitle } from "@/components/ui/PageHeader";
import { Panel } from "@/components/ui/Surface";
import RootSection from "../RootSection";
import type { RootData } from "@/lib/root/hooks/useRootMetrics";
import type { UserRole } from "@/types/auth";

/* Аналитик — ЗӨВХӨН GET /users ба GET /songs дээр тооцоологдоно.
   DAU/MAU/retention нь `listen_events` хүснэгт шаарддаг тул энд ОРОЛЦООГҮЙ —
   хуурамч график зурахгүй (шинэ API зохиомжлохгүй). */

const ROLE_ORDER: UserRole[] = ["USER", "THERAPIST", "PARENT", "ADMIN", "ROOT"];
const ROLE_TEXT: Record<UserRole, string> = {
  USER: "Хэрэглэгч",
  THERAPIST: "Эмч",
  PARENT: "Эцэг эх",
  ADMIN: "Админ",
  ROOT: "Систем эзэмшигч",
};

function Bar({ label, value, max, tone }: { label: string; value: number; max: number; tone: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 mb-1.5">
        <b className="text-body font-semibold text-ink">{label}</b>
        <span className="mono !text-meta text-dim tabular-nums">
          {value.toLocaleString()} · {pct}%
        </span>
      </div>
      <div className="h-[7px] rounded-full bg-white/[.07] overflow-hidden">
        <div className="h-full rounded-full transition-[width] duration-500" style={{ width: `${pct}%`, background: tone }} />
      </div>
    </div>
  );
}

export default function RootAnalytics({ data }: { data: RootData }) {
  const { users, songs } = data;

  const byRole = useMemo(() => {
    const counts = new Map<UserRole, number>();
    users.forEach((u) => counts.set(u.role, (counts.get(u.role) || 0) + 1));
    return ROLE_ORDER.map((role) => ({ role, count: counts.get(role) || 0 })).filter((r) => r.count > 0);
  }, [users]);

  const byGenre = useMemo(() => {
    const counts = new Map<string, number>();
    songs.forEach((s) => {
      const genre = s.genre || "Бусад";
      counts.set(genre, (counts.get(genre) || 0) + 1);
    });
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [songs]);

  const analyzed = songs.filter((s) => s.analyzedAt).length;
  const featured = songs.filter((s) => s.featured).length;
  const withArtist = songs.filter((s) => s.artistId).length;
  const proShare = users.length ? Math.round((users.filter((u) => u.subActive).length / users.length) * 100) : 0;

  const maxRole = Math.max(1, ...byRole.map((r) => r.count));
  const maxGenre = Math.max(1, ...byGenre.map(([, n]) => n));

  return (
    <RootSection
      title="Аналитик"
      eyebrow="ROOT"
      description="GET /users ба GET /songs дээр тооцоологдсон бодит хуваарилалт. DAU/MAU/retention нь listen_events хүснэгт шаарддаг тул энд ороогүй."
      loading={data.loading}
      error={data.error}
      onRetry={data.reload}
    >
      <div className="grid grid-cols-4 max-viz:grid-cols-2 max-nav:grid-cols-1 gap-3.5">
        <StatCard icon="chart" color="c-aqua" value={`${proShare}%`} label="PRO эзлэх хувь" />
        <StatCard icon="activity" color="c-purple" value={`${songs.length ? Math.round((analyzed / songs.length) * 100) : 0}%`} label="Анализ хийгдсэн" />
        <StatCard icon="star" color="c-gold" value={featured.toLocaleString()} label="Онцлох дуу" />
        <StatCard icon="mic" color="c-rose" value={withArtist.toLocaleString()} label="Уран бүтээлчтэй дуу" />
      </div>

      <div className="mt-9">
        <SectionTitle title="Дүрийн хуваарилалт" description={`Нийт ${users.length} бүртгэл`} />
      </div>
      <Panel as="section">
        <div className="flex flex-col gap-4">
          {byRole.map(({ role, count }) => (
            <Bar key={role} label={ROLE_TEXT[role]} value={count} max={maxRole} tone="var(--aqua)" />
          ))}
        </div>
      </Panel>

      <div className="mt-9">
        <SectionTitle title="Төрлийн хуваарилалт" description={`Хамгийн олон дуутай ${byGenre.length} төрөл`} />
      </div>
      <Panel as="section">
        <div className="flex flex-col gap-4">
          {byGenre.map(([genre, count]) => (
            <Bar key={genre} label={genre} value={count} max={maxGenre} tone="#B49CFF" />
          ))}
        </div>
      </Panel>
    </RootSection>
  );
}
