"use client";

/* Дууны карт — бүх дэлгэцэд нэг ижил харагдацтай байлгах зорилготой нэгдсэн компонент
   (Нүүр, Судлах, Миний сан, Жагсаалт бүгд үүнийг ашиглана).

   Хуучин хувилбараас ялгаа: хатуу хүрээ (border) авсан — орчин үеийн музик апп-ууд
   картаа хүрээгүй, зөвхөн hover дээр зөөлөн дэвсгэрээр тэмдэглэдэг. Мөн хяналтын
   товчнууд (♥/хадгалах/ⓘ) нь <button> ДОТОР биш, хажууд нь absolute байрлана —
   өмнө нь товч дотор товч үүрлэсэн байсныг (HTML-д хүчингүй) зассан. */
import type { Track } from "@/types/track";

type CardTrack = Track & { custom?: boolean };

function OverlayBtn({
  label,
  active,
  accent = "aqua",
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
        "w-8 h-8 rounded-full flex items-center justify-center text-[15px] bg-[rgba(5,9,9,.62)] backdrop-blur-sm transition-[color,transform,background] duration-200 hover:scale-110 hover:bg-[rgba(5,9,9,.8)] focus-visible:outline-none focus-visible:shadow-glow-aqua " +
        (active ? activeColor : "text-white/80 hover:text-white")
      }
    >
      {children}
    </button>
  );
}

export default function TrackCard({
  track,
  isCurrent,
  playing,
  liked,
  saved,
  onPlay,
  onToggleLike,
  onToggleSave,
  onInfo,
}: {
  track: CardTrack;
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
    <div className="group relative">
      <button
        type="button"
        onClick={onPlay}
        aria-label={`${track.title} — ${isPlaying ? "түр зогсоох" : "тоглуулах"}`}
        className={
          "w-full text-left p-2.5 rounded-2xl transition-[background,transform] duration-300 ease-[cubic-bezier(.16,.8,.24,1)] hover:-translate-y-1 focus-visible:outline-none focus-visible:shadow-glow-aqua " +
          (isCurrent ? "bg-aqua/[.08]" : "hover:bg-white/[.055]")
        }
      >
        <span className="relative block aspect-square rounded-xl overflow-hidden mb-3 bg-[#0B1211] shadow-[0_10px_26px_rgba(0,0,0,.45)]">
          <img
            src={track.cover}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(.16,.8,.24,1)] group-hover:scale-[1.07]"
          />
          {/* тоглуулах товч — hover дээр доороос мандана */}
          <span
            className={
              "absolute right-2.5 bottom-2.5 w-11 h-11 rounded-full bg-aqua text-[#04100E] flex items-center justify-center text-[15px] shadow-[0_10px_24px_rgba(0,0,0,.5)] transition-[opacity,transform,box-shadow] duration-300 group-hover:shadow-[0_12px_30px_rgba(56,232,206,.45)] " +
              (isPlaying ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2.5 group-hover:opacity-100 group-hover:translate-y-0")
            }
            aria-hidden="true"
          >
            {isPlaying ? "⏸" : "▶"}
          </span>
          {isPlaying && (
            <span className="pl-eq absolute left-2.5 bottom-3" aria-hidden="true">
              <u></u>
              <u></u>
              <u></u>
            </span>
          )}
        </span>

        <b className={"block font-semibold text-[14.5px] tracking-[-.01em] whitespace-nowrap overflow-hidden text-ellipsis " + (isCurrent ? "text-aqua" : "text-ink")}>
          {track.title}
          {track.custom && <em className="not-italic text-[9px] text-aqua border border-aqua/40 rounded-full py-px px-1.5 ml-1.5 align-[1px]">шинэ</em>}
        </b>
        <i className="not-italic block text-xs text-dim mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
          {track.artist}
          {track.genre ? ` · ${track.genre}` : ""}
        </i>
      </button>

      {/* хяналтууд — товч дотор биш, зурган дээр хөвнө */}
      <div className="absolute top-[18px] right-[18px] flex flex-col gap-1.5 opacity-0 translate-x-1 transition-[opacity,transform] duration-200 group-hover:opacity-100 group-hover:translate-x-0 focus-within:opacity-100 focus-within:translate-x-0">
        <OverlayBtn label={liked ? "Дуртайгаас хасах" : "Дуртайд нэмэх"} active={liked} accent="aqua" onClick={onToggleLike}>
          {liked ? "♥" : "♡"}
        </OverlayBtn>
        <OverlayBtn label={saved ? "Хадгалснаас хасах" : "Хадгалах"} active={saved} accent="warm" onClick={onToggleSave}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
            <path d="M6 3h12v18l-6-3.6L6 21V3z" />
          </svg>
        </OverlayBtn>
        <OverlayBtn label={`${track.title} — дэлгэрэнгүй`} accent="plain" onClick={onInfo}>
          ⓘ
        </OverlayBtn>
      </div>
    </div>
  );
}
