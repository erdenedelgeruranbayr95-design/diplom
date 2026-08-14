"use client";

import { useMemo, useState } from "react";
import { TableCard } from "@/components/ui/Surface";
import StatusBadge from "@/components/ui/StatusBadge";
import { Empty } from "@/components/ui/States";
import Icon from "@/components/ui/Icon";
import StatCard from "@/components/player/StatCard";
import { fmt } from "@/lib/player/format";
import RootSection from "../RootSection";
import type { RootData } from "@/lib/root/hooks/useRootMetrics";

/* Дууны сан — GET /songs. Уран бүтээлч, анализын төлөв, онцлох тэмдэг. */
export default function RootSongs({ data }: { data: RootData }) {
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return data.songs;
    return data.songs.filter((s) =>
      (s.title + " " + (s.artist || "") + " " + (s.genre || "")).toLowerCase().includes(term),
    );
  }, [data.songs, query]);

  const analyzed = data.songs.filter((s) => s.analyzedAt).length;
  const totalSec = data.songs.reduce((sum, s) => sum + (s.duration || 0), 0);

  return (
    <RootSection
      title="Дууны сан"
      eyebrow="ROOT"
      description="Каталогийн бүх дуу ба тэдгээрийн анализын төлөв."
      loading={data.loading}
      error={data.error}
      onRetry={data.reload}
    >
      <div className="grid grid-cols-4 max-viz:grid-cols-2 max-nav:grid-cols-1 gap-3.5 mb-6">
        <StatCard icon="music" color="c-aqua" value={data.songs.length.toLocaleString()} label="Нийт дуу" />
        <StatCard icon="activity" color="c-purple" value={analyzed.toLocaleString()} label="Анализтай" />
        <StatCard icon="star" color="c-gold" value={data.songs.filter((s) => s.featured).length.toLocaleString()} label="Онцлох" />
        <StatCard icon="clock" color="c-rose" value={fmt(totalSec)} label="Нийт үргэлжлэх" />
      </div>

      <div className="relative mb-4 max-w-[420px]">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dim pointer-events-none flex" aria-hidden="true">
          <Icon name="search" size={15} />
        </span>
        <input
          className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/[.04] border border-white/[.08] text-ink text-body transition-[border-color,box-shadow,background] duration-250 focus:bg-white/[.06] focus:border-aqua/60 focus-visible:outline-none focus-visible:shadow-glow-aqua placeholder:text-faint"
          placeholder="Нэр, дуучин, төрлөөр хайх…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Дуу хайх"
        />
      </div>

      {rows.length === 0 ? (
        <Empty icon="music" title="Дуу олдсонгүй" hint={query ? "Өөр түлхүүр үгээр хайж үзнэ үү" : "Каталог хоосон байна"} />
      ) : (
        <TableCard>
          <div className="grid grid-cols-[1.5fr_1.1fr_.8fr_.7fr_.8fr] max-nav:grid-cols-[1.4fr_.9fr_.8fr] gap-3 items-center py-3 px-5 border-b border-white/[.08] bg-white/[.02]">
            <span className="mono">Нэр</span>
            <span className="mono max-nav:hidden">Уран бүтээлч</span>
            <span className="mono">Төрөл</span>
            <span className="mono max-nav:hidden">Урт</span>
            <span className="mono">Анализ</span>
          </div>
          {rows.map((s) => (
            <div
              key={s.id}
              className="grid grid-cols-[1.5fr_1.1fr_.8fr_.7fr_.8fr] max-nav:grid-cols-[1.4fr_.9fr_.8fr] gap-3 items-center py-3 px-5 border-b border-white/[.06] last:border-b-0 text-body transition-colors duration-150 hover:bg-white/[.03]"
            >
              <span className="min-w-0 flex items-center gap-2">
                <span className="truncate">{s.title}</span>
                {s.featured && (
                  <span className="text-warm flex-none" title="Онцлох" aria-label="Онцлох">
                    <Icon name="star" size={12} variant="fill" />
                  </span>
                )}
              </span>
              <span className="text-dim truncate max-nav:hidden">{s.artist || s.artistRef?.name || "—"}</span>
              <span className="text-dim truncate">{s.genre || "—"}</span>
              <span className="font-mono text-caption text-faint max-nav:hidden tabular-nums">{s.duration ? fmt(s.duration) : "—"}</span>
              {s.analyzedAt ? (
                <StatusBadge label={`${s.analyzedBpm ?? s.bpm ?? "—"} BPM`} tone="aqua" />
              ) : (
                <StatusBadge label="Хийгдээгүй" tone="faint" />
              )}
            </div>
          ))}
        </TableCard>
      )}
    </RootSection>
  );
}
