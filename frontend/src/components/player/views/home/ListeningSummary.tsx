"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { SectionTitle } from "@/components/ui/PageHeader";
import QuickAction from "@/components/player/shared/QuickAction";
import { useTrackActions } from "@/components/player/PlayerContext";
import { fmtDur } from "@/lib/player/format";
import type { ListeningStats } from "@/types/track";

/* Нүүр дэх статистикийн хураангуй — 3 тоон карт. Дэлгэрэнгүй нь StatsView-д. */

function SummaryTile({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="flex flex-row items-center gap-[18px] p-[20px_22px] rounded-lg bg-[linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,.01))] border border-white/[.09]">
      <span className="flex flex-col gap-0.5 min-w-0">
        <b className="text-[clamp(18px,2vw,24px)] leading-[1.15] whitespace-nowrap overflow-hidden text-ellipsis">{value}</b>
        <span className="mono !text-meta !tracking-[.18em]">{label}</span>
      </span>
    </div>
  );
}

export default function ListeningSummary({ stats }: { stats: ListeningStats | null | undefined }) {
  const { setView } = useTrackActions();
  if (!stats || stats.total <= 0) return null;

  const topGenre = Object.entries(stats.byGenre).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="mb-9">
      <SectionTitle
        title="Миний статистик"
        actions={<QuickAction icon={<FontAwesomeIcon icon={faChartLine} />} label="Дэлгэрэнгүй" onClick={() => setView("stats")} />}
      />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-4">
        <SummaryTile value={fmtDur(stats.total)} label="Нийт сонссон" />
        <SummaryTile value={Object.keys(stats.byTrack).length} label="Сонссон дуу" />
        <SummaryTile value={topGenre ? topGenre[0] : "—"} label="Топ төрөл" />
      </div>
    </div>
  );
}
