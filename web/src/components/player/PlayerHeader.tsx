"use client";

/* Player.tsx-ийн доод баарын одоо тоглож буй дууны мэдээлэл (.sp-bar-l) — тусад нь
   гаргасан. CSS/behavior бүгд өөрчлөгдөөгүй, зөвхөн component boundary шилжсэн. */
import type { PlayerTrack } from "@/components/player/Player";

export default function PlayerHeader({
  track,
  npOpen,
  onToggleNowPlaying,
}: {
  track: PlayerTrack | null;
  npOpen: boolean;
  onToggleNowPlaying: () => void;
}) {
  return (
    <div className="flex items-center gap-[13px] min-w-0">
      {track ? (
        <>
          <button
            className={
              "w-8 h-8 rounded-lg flex-none flex items-center justify-center border border-line bg-transparent cursor-pointer transition-[color,border-color,transform] duration-[250ms] " +
              (npOpen ? "text-aqua border-[rgba(56,232,206,.4)] rotate-180" : "text-dim hover:text-aqua hover:border-[rgba(56,232,206,.4)]")
            }
            onClick={onToggleNowPlaying}
            aria-expanded={npOpen}
            aria-label="Мэдрэх самбар"
            title="Мэдрэх самбар"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 15l6-6 6 6" />
            </svg>
          </button>
          <img className="w-14 h-14 rounded-[10px] object-cover flex-none shadow-[0_6px_18px_rgba(0,0,0,.45)]" src={track.cover} alt="" />
          <button
            className="min-w-0 text-left bg-none border-0 p-0 cursor-pointer flex items-center gap-1.5 rounded-sm transition-colors duration-150 group max-nav:after:content-[''] max-nav:after:flex-none max-nav:after:w-[7px] max-nav:after:h-[7px] max-nav:after:border-r-2 max-nav:after:border-t-2 max-nav:after:border-faint max-nav:after:-rotate-45 max-nav:after:ml-0.5"
            onClick={onToggleNowPlaying}
          >
            <b className="font-semibold text-sm whitespace-nowrap overflow-hidden text-ellipsis transition-colors duration-150 group-hover:text-aqua">{track.title}</b>
            <i className="not-italic text-xs text-dim">{track.artist}</i>
          </button>
        </>
      ) : (
        <span className="text-faint text-[13px]">Дуу сонгоогүй байна</span>
      )}
    </div>
  );
}
