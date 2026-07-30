"use client";

import type { Track } from "@/types/track";
import type { ListeningStats } from "@/types/track";
import BackBar from "./BackBar";
import StatCard from "./StatCard";
import { SectionTitle } from "@/components/ui/PageHeader";
import { ICONS } from "@/lib/player/constants";
import { fmtDur } from "@/lib/player/format";
import { todayKey } from "@/lib/data/library";

/* Миний статистик — Player.jsx-аас тусад нь гаргасан.
   Props: stats (statsRef.current-ийн snapshot), byId(id)→track, onPlay(track), onBack() */
const EMPTY_STATS: ListeningStats = { total: 0, vib: 0, byGenre: {}, byTrack: {}, days: {} }

export default function StatsView({
  stats,
  byId,
  onPlay,
  onBack,
}: {
  stats: ListeningStats | null | undefined;
  byId: (id: number | string) => Track | undefined;
  onPlay: (t: Track) => void;
  onBack: () => void;
}) {
  const s = stats || EMPTY_STATS
  const topGenre = Object.entries(s.byGenre).sort((a, b) => b[1] - a[1])[0]
  const topTracks = Object.entries(s.byTrack).sort((a, b) => b[1] - a[1]).slice(0, 5)
    .map(([id, sec]) => ({ t: byId(isNaN(+id) ? id : +id), sec })).filter((x): x is { t: Track; sec: number } => !!x.t)
  const days: { label: string; sec: number; today: boolean }[] = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i)
    const k = todayKey(d)
    days.push({ label: ['Ня', 'Да', 'Мя', 'Лх', 'Пү', 'Ба', 'Бя'][d.getDay()], sec: s.days[k] || 0, today: i === 0 })
  }
  const maxDay = Math.max(1, ...days.map((d) => d.sec))

  return (
    <>
      <BackBar title="Миний статистик" onBack={onBack} />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3.5">
        <StatCard icon={ICONS.clock} color="c-aqua" value={fmtDur(s.total)} label="Нийт сонссон" />
        <StatCard icon={ICONS.vibrate} color="c-gold" value={s.vib.toLocaleString()} label="Мэдэрсэн чичиргээ" />
        <StatCard icon={ICONS.music} color="c-purple" value={Object.keys(s.byTrack).length} label="Сонссон дуу" />
        <StatCard icon={ICONS.star} color="c-rose" value={topGenre ? topGenre[0] : '—'} label="Топ төрөл" />
      </div>

      <div className="mt-8">
        <SectionTitle title="Сүүлийн 7 хоног" />
      </div>
      <div className="grid grid-cols-7 gap-2.5 h-[180px] items-end border border-white/[.08] rounded-2xl p-[18px_18px_12px] bg-white/[.02]">
        {days.map((d, i) => (
          <div className="flex flex-col items-center gap-[7px] h-full justify-end" key={i}>
            <span className="mono !text-[9px]">{d.sec ? fmtDur(d.sec) : ""}</span>
            <i
              className={
                "w-full max-w-[44px] rounded-[6px_6px_2px_2px] transition-[height] duration-[600ms] ease-[cubic-bezier(.16,.8,.24,1)] " +
                (d.today
                  ? "bg-[linear-gradient(180deg,var(--aqua),rgba(56,232,206,.4))] shadow-[0_0_14px_rgba(56,232,206,.3)]"
                  : "bg-[linear-gradient(180deg,rgba(56,232,206,.75),rgba(56,232,206,.2))]")
              }
              style={{ height: Math.max(3, (d.sec / maxDay) * 100) + "%" }}
            ></i>
            <span className={"mono" + (d.today ? " !text-aqua" : "")}>{d.label}</span>
          </div>
        ))}
      </div>

      {topTracks.length > 0 && (
        <>
          <div className="mt-8">
            <SectionTitle title="Хамгийн их сонссон" />
          </div>
          <div className="flex flex-col">
            {topTracks.map(({ t, sec }, i) => (
              <button
                key={t.id}
                className="grid grid-cols-[34px_44px_1fr_auto_30px] gap-3 items-center py-2.5 px-3.5 mb-0.5 rounded-[11px] text-ink text-left transition-colors duration-250 hover:bg-white/5"
                onClick={() => onPlay(t)}
              >
                <span className="mono !text-[10px]">{'0' + (i + 1)}</span>
                <img className="w-11 h-11 rounded-lg object-cover shadow-[0_4px_12px_rgba(0,0,0,.3)]" src={t.cover} alt="" />
                <span className="flex flex-col min-w-0">
                  <b className="font-semibold text-sm whitespace-nowrap overflow-hidden text-ellipsis">{t.title}</b>
                  <i className="not-italic text-xs text-dim">{t.artist}</i>
                </span>
                <span className="mono !text-[9.5px] max-nav:hidden">{fmtDur(sec)}</span>
                <span className="text-dim text-xs flex justify-center" aria-hidden="true">▶</span>
              </button>
            ))}
          </div>
        </>
      )}
      {s.total === 0 && <p className="text-faint text-[13.5px] text-center py-6 px-4">Дуу сонсож эхлэхэд статистик энд цуглана</p>}
    </>
  )
}
