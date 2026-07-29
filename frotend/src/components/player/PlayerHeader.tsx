"use client";

/* Player.tsx-ийн доод баарын одоо тоглож буй дууны мэдээлэл (.sp-bar-l) — премиум
   playback bar (Spotify/Apple Music) маягаар шинэчлэв: илүү том артwork, тодорхой
   hierarchy. Props/callback бүгд өөрчлөгдөөгүй, зөвхөн визуал давхарга шинэчлэгдсэн. */
import type { PlayerTrack } from "@/components/providers/PlayerProvider";

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
    <div className="flex items-center gap-3 min-w-0">
      {track ? (
        <>
          <img className="w-14 h-14 rounded-xl object-cover flex-none shadow-[0_6px_18px_rgba(0,0,0,.45)]" src={track.cover} alt="" />
          <button
            className="min-w-0 text-left bg-none border-0 p-0 cursor-pointer flex flex-col gap-0.5 rounded-sm transition-colors duration-150 group focus-visible:outline-none focus-visible:shadow-glow-aqua"
            onClick={onToggleNowPlaying}
            aria-expanded={npOpen}
            aria-label={"Мэдрэх самбар — " + track.title}
            title="Мэдрэх самбар"
          >
            <b className="font-semibold text-sm whitespace-nowrap overflow-hidden text-ellipsis transition-colors duration-150 group-hover:text-aqua flex items-center gap-1.5">
              {track.title}
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={"flex-none text-faint transition-transform duration-250 " + (npOpen ? "rotate-180" : "")}
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </b>
            <i className="not-italic text-xs text-dim whitespace-nowrap overflow-hidden text-ellipsis">{track.artist}</i>
          </button>
        </>
      ) : (
        <span className="text-faint text-[13px]">Дуу сонгоогүй байна</span>
      )}
    </div>
  );
}
