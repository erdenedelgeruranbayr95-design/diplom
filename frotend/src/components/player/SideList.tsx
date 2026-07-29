import type { Track } from "@/types/track";

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
    <div className="flex flex-col gap-[7px] max-nav:hidden">
      {tracks.map((t) => (
        <button
          key={t.id}
          className={
            "flex items-center gap-3 rounded-[11px] overflow-hidden text-ink text-left transition-colors duration-[250ms] pr-2.5 bg-white/[.03] hover:bg-white/[.07] " +
            (curId === t.id ? "shadow-[inset_0_0_0_1px_rgba(56,232,206,.4)]" : "")
          }
          onClick={() => onPlay(t)}
        >
          <img src={t.cover} alt="" className="w-[42px] h-[42px] object-cover flex-none" />
          <span className="text-[12.5px] font-semibold flex-1 whitespace-nowrap overflow-hidden text-ellipsis">{t.title}</span>
          {curId === t.id && playing ? (
            <span className="pl-eq sp-req" aria-hidden="true">
              <u></u>
              <u></u>
              <u></u>
            </span>
          ) : (
            <i aria-hidden="true" className="not-italic text-[11px] text-dim">
              ▶
            </i>
          )}
        </button>
      ))}
    </div>
  );
}
