"use client";

/* Player.tsx-ийн доод баарын одоо тоглож буй дууны мэдээлэл (.sp-bar-l) — премиум
   playback bar (Spotify/Apple Music) маягаар шинэчлэв: илүү том артwork, тодорхой
   hierarchy. Props/callback бүгд өөрчлөгдөөгүй, зөвхөн визуал давхарга шинэчлэгдсэн. */
import type { PlayerTrack } from "@/components/player/Player";
import Icon from "@/components/ui/Icon";

export default function PlayerHeader({
  track,
  npOpen,
  onToggleNowPlaying,
  phoneConnected,
  onOpenPairing,
}: {
  track: PlayerTrack | null;
  npOpen: boolean;
  onToggleNowPlaying: () => void;
  phoneConnected: boolean;
  onOpenPairing: () => void;
}) {
  return (
    <div className="flex items-center gap-3.5 min-w-0">
      <button
        className={
          "w-9 h-9 flex-none rounded-full flex items-center justify-center text-[15px] transition-[color,background] duration-200 cursor-pointer focus-visible:outline-none focus-visible:shadow-glow-aqua " +
          (phoneConnected ? "text-aqua bg-aqua/[.12]" : "text-faint hover:text-dim hover:bg-white/[.06]")
        }
        onClick={onOpenPairing}
        aria-label={phoneConnected ? "Утас холбогдсон — удирдах" : "Утас холбох"}
        title={phoneConnected ? "Утас холбогдсон" : "Утас холбох"}
      >
        <Icon name="device" size={16} />
      </button>
      {track ? (
        <>
          <img className="w-16 h-16 rounded-[18px] object-cover flex-none shadow-[0_6px_18px_rgba(0,0,0,.45)]" src={track.cover} alt="" />
          <button
            className="min-w-0 text-left bg-none border-0 p-0 cursor-pointer flex flex-col gap-0.5 rounded-sm transition-colors duration-150 group focus-visible:outline-none focus-visible:shadow-glow-aqua"
            onClick={onToggleNowPlaying}
            aria-expanded={npOpen}
            aria-label={"Мэдрэх самбар — " + track.title}
            title="Мэдрэх самбар"
          >
            <b className="font-semibold text-[14.5px] whitespace-nowrap overflow-hidden text-ellipsis transition-colors duration-150 group-hover:text-aqua flex items-center gap-1.5">
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
            <i className="not-italic text-[12.5px] text-dim whitespace-nowrap overflow-hidden text-ellipsis">{track.artist}</i>
          </button>
        </>
      ) : (
        <span className="text-faint text-[13.5px]">Дуу сонгоогүй байна</span>
      )}
    </div>
  );
}
