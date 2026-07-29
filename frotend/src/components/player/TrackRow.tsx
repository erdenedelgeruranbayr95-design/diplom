"use client";

/* Дууны мөр — жагсаалт (нягт) харагдацад. TrackCard-тай хосолж, дэлгэц бүр
   "grid / list" гэсэн 2 горимыг санал болгоно.

   TrackCard-тай ижил зарчим: хяналтын товчнууд үндсэн <button>-ы ДОТОР үүрлэхгүй,
   grid-ийн тусдаа баганад сууна. */
import type { Track } from "@/types/track";

type RowTrack = Track & { custom?: boolean };

function RowBtn({
  label,
  active,
  accent = "plain",
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  accent?: "aqua" | "warm" | "plain";
  onClick: () => void;
  children: React.ReactNode;
}) {
  const activeColor = accent === "warm" ? "text-warm" : accent === "aqua" ? "text-aqua" : "text-ink";
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={
        "w-8 h-8 rounded-full flex items-center justify-center text-[15px] transition-[color,background] duration-150 hover:bg-white/[.08] focus-visible:outline-none focus-visible:shadow-glow-aqua " +
        (active ? activeColor : "text-faint hover:text-ink")
      }
    >
      {children}
    </button>
  );
}

export default function TrackRow({
  track,
  index,
  isCurrent,
  playing,
  liked,
  saved,
  onPlay,
  onToggleLike,
  onToggleSave,
  onInfo,
}: {
  track: RowTrack;
  index: number;
  isCurrent: boolean;
  playing: boolean;
  liked: boolean;
  saved: boolean;
  onPlay: () => void;
  onToggleLike: () => void;
  onToggleSave: () => void;
  onInfo: () => void;
}) {
  const isPlaying = isCurrent && playing;

  return (
    <div
      className={
        "group grid grid-cols-[30px_44px_1fr_auto_auto] max-nav:grid-cols-[44px_1fr_auto] gap-3 items-center py-2 px-2.5 rounded-xl transition-colors duration-150 " +
        (isCurrent ? "bg-aqua/[.08]" : "hover:bg-white/[.045]")
      }
    >
      <span className="mono !text-[10px] max-nav:hidden text-center" aria-hidden="true">
        {isPlaying ? (
          <span className="pl-eq inline-flex" style={{ height: 12 }}>
            <u></u>
            <u></u>
            <u></u>
          </span>
        ) : (
          String(index + 1).padStart(2, "0")
        )}
      </span>

      <button
        type="button"
        onClick={onPlay}
        aria-label={`${track.title} — ${isPlaying ? "түр зогсоох" : "тоглуулах"}`}
        className="relative w-11 h-11 rounded-lg overflow-hidden bg-[#0B1211] shadow-[0_4px_12px_rgba(0,0,0,.3)] focus-visible:outline-none focus-visible:shadow-glow-aqua"
      >
        <img src={track.cover} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        <span
          className={
            "absolute inset-0 flex items-center justify-center bg-black/55 text-white text-[13px] transition-opacity duration-150 " +
            (isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100")
          }
          aria-hidden="true"
        >
          {isPlaying ? "⏸" : "▶"}
        </span>
      </button>

      <button type="button" onClick={onPlay} className="flex flex-col min-w-0 text-left focus-visible:outline-none focus-visible:shadow-glow-aqua rounded-md">
        <b className={"font-semibold text-sm whitespace-nowrap overflow-hidden text-ellipsis " + (isCurrent ? "text-aqua" : "text-ink")}>
          {track.title}
          {track.custom && <em className="not-italic text-[9px] text-aqua border border-aqua/40 rounded-full py-px px-1.5 ml-1.5 align-[1px]">шинэ</em>}
        </b>
        <i className="not-italic text-xs text-dim whitespace-nowrap overflow-hidden text-ellipsis">{track.artist}</i>
      </button>

      <span className="mono !text-[9.5px] max-nav:hidden">{track.genre}</span>

      <div className="flex items-center gap-0.5">
        <RowBtn label={liked ? "Дуртайгаас хасах" : "Дуртайд нэмэх"} active={liked} accent="aqua" onClick={onToggleLike}>
          {liked ? "♥" : "♡"}
        </RowBtn>
        <RowBtn label={saved ? "Хадгалснаас хасах" : "Хадгалах"} active={saved} accent="warm" onClick={onToggleSave}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
            <path d="M6 3h12v18l-6-3.6L6 21V3z" />
          </svg>
        </RowBtn>
        <RowBtn label={`${track.title} — дэлгэрэнгүй`} onClick={onInfo}>
          ⓘ
        </RowBtn>
      </div>
    </div>
  );
}
