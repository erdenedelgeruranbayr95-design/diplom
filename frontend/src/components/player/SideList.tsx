import type { Track } from "@/types/track";
import Icon from "@/components/ui/Icon";

export default function SideList({
  tracks,
  curId,
  playing,
  onPlay,
}: {
  tracks: Track[];
  curId: number | string | null;
  playing: boolean;
  onPlay: (t: Track) => void;
}) {
  return (
    <div className="flex flex-col gap-[8px] max-nav:hidden">
      {tracks.map((t) => {
        const active = curId === t.id;
        return (
          <button
            key={t.id}
            type="button"
            className={
              "group flex items-center gap-3.5 rounded-[16px] overflow-hidden text-ink text-left transition-[background,border-color,transform,box-shadow] duration-[250ms] pr-3 bg-[rgba(11,16,16,.62)] border border-white/[.06] hover:bg-[rgba(18,26,25,.82)] hover:border-aqua/18 hover:-translate-y-[1px] " +
              (active ? "border-aqua/28 bg-aqua/[.07] shadow-[0_10px_26px_rgba(0,0,0,.28)]" : "")
            }
            onClick={() => onPlay(t)}
          >
            <img
              src={t.cover}
              alt=""
              className="w-[46px] h-[46px] object-cover flex-none rounded-[12px] shadow-[0_8px_18px_rgba(0,0,0,.35)]"
            />
            <span className="flex min-w-0 flex-1 flex-col py-2">
              <b className="text-[12.8px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis">{t.title}</b>
              <span className="text-[11.2px] text-dim whitespace-nowrap overflow-hidden text-ellipsis">{t.artist}</span>
            </span>
            <span
              className={
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[.14em] " +
                (active ? "border-aqua/25 bg-aqua/[.08] text-aqua" : "border-white/[.08] bg-white/[.03] text-faint")
              }
            >
              <span aria-hidden="true">
                <Icon name={active && playing ? "pause" : "play"} size={11} />
              </span>
              {active && playing ? "Playing" : "Play"}
            </span>
          </button>
        );
      })}
    </div>
  );
}
