"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useIsPlayingTrack, useTrackActions } from "@/components/player/PlayerContext";
import TrackPlayButton, { TrackCoverButton } from "@/components/player/shared/TrackPlayButton";
import { InfoBtn, LikeBtn, SaveBtn } from "@/components/player/TrackButtons";
import Icon from "@/components/ui/Icon";
import type { PlayerTrack } from "@/types/player";

/* Хэвтээ гүйдэг dashboard мөр — Үргэлжлүүлэн сонсох · Дуртай · Онцлох · Алдартай
   БҮГД ижил rail загвартай. Урьд нь энэ секцүүд HomeView дотор нэг `TrackRail`
   дуудлагатай байсан ч картын доторх бүх prop гараар дамжиж байв.

   Хоёр талын сум товч нь mouse drag/trackpad-гүй хэрэглэгчид ч мөрийг гүйлгэх
   боломж өгнө — төгсгөлд хүрмэгц харгалзах тал нь бүдгэрч, дарагдахгүй болно. */

const RAIL_CLS =
  "relative isolate flex gap-4 overflow-x-auto pt-2 pb-2 -mx-1 px-1 [scrollbar-width:thin] [scrollbar-color:var(--faint)_transparent]";

/** Карт (186px) + gap (16px). Гүйлгэлтийг үүгээр тоймлож бүтэн картаар зогсооно. */
const CARD_STEP = 202;

const ARROW_CLS =
  "absolute top-1/2 -translate-y-1/2 z-20 w-[38px] h-[38px] rounded-full flex items-center justify-center " +
  "text-ink bg-[rgba(7,10,10,.82)] border border-white/[.1] backdrop-blur-md shadow-[0_8px_22px_rgba(0,0,0,.5)] " +
  "transition-[opacity,transform,color,border-color] duration-[250ms] " +
  "hover:scale-[1.08] hover:text-aqua hover:border-aqua/35 focus-visible:outline-none focus-visible:shadow-glow-aqua";

function RailArrow({ side, show, onClick }: { side: "left" | "right"; show: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Зүүн тийш гүйлгэх" : "Баруун тийш гүйлгэх"}
      /* Тухайн тал руу гүйлгэх зайгүй бол нуугдана. DOM-оос хасахын оронд идэвхгүй
         болгосон нь tab дараалал гэнэт үсрэхээс сэргийлнэ. */
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      className={
        ARROW_CLS +
        (side === "left" ? " left-1" : " right-1") +
        (show ? " opacity-100" : " opacity-0 pointer-events-none")
      }
    >
      <Icon name="chevronRight" size={18} className={side === "left" ? "rotate-180" : ""} />
    </button>
  );
}

function RailCard({ track }: { track: PlayerTrack }) {
  const { likedIds, savedIds, toggleLike, toggleSave, openDetail } = useTrackActions();
  const { isCurrent } = useIsPlayingTrack(track.id);

  return (
    <motion.article
      role="listitem"
      className={
        "group relative flex-none w-[186px] text-left p-[14px] rounded-panel border transition-[transform,background,border-color,box-shadow] duration-[320ms] ease-[cubic-bezier(.16,.8,.24,1)] hover:-translate-y-[4px] hover:z-10 focus-visible:z-10 focus-visible:outline-none focus-visible:shadow-glow-aqua " +
        (isCurrent
          ? "bg-aqua/[.07] border-aqua/35 shadow-md"
          : "bg-[rgba(11,16,16,.72)] border-white/[.06] hover:bg-[rgba(17,24,23,.92)] hover:border-aqua/15")
      }
    >
      <div className="relative">
        <TrackCoverButton
          track={track}
          className="relative block w-full text-left rounded-lg overflow-hidden aspect-square bg-[#0B1211] shadow-[0_10px_24px_rgba(0,0,0,.34)] focus-visible:outline-none focus-visible:shadow-glow-aqua"
          imgClassName="absolute inset-0 w-full h-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(.16,.8,.24,1)] group-hover:scale-[1.06]"
          overlayClassName="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,.1)_52%,rgba(0,0,0,.5))]"
        />

        <LikeBtn id={track.id} active={likedIds.includes(track.id)} onToggle={() => toggleLike(track.id)} />
        <SaveBtn id={track.id} active={savedIds.includes(track.id)} onToggle={() => toggleSave(track.id)} />
        <InfoBtn t={track} onInfo={() => openDetail(track)} />
        <TrackPlayButton
          track={track}
          className="absolute right-2.5 bottom-2.5 w-[44px] h-[44px] rounded-full bg-aqua text-on-aqua flex items-center justify-center text-lead transition-[opacity,transform,box-shadow] duration-300 shadow-[0_8px_22px_rgba(0,0,0,.55)] hover:shadow-[0_10px_28px_rgba(56,232,206,.4)] focus-visible:outline-none focus-visible:shadow-glow-aqua"
          restingClassName="opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0"
        />
      </div>
      <b className="mt-3 block font-semibold text-copy whitespace-nowrap overflow-hidden text-ellipsis">{track.title}</b>
      <i className="not-italic text-note text-dim whitespace-nowrap overflow-hidden text-ellipsis block">{track.artist}</i>
    </motion.article>
  );
}

export default function TrackRail({ tracks, ariaLabel }: { tracks: PlayerTrack[]; ariaLabel: string }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const sync = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    /* 1px тэвчээр — зуум/subpixel үед scrollLeft бутархай гарч, төгсгөлд хүрсэн
       атлаа сум идэвхтэй хэвээр үлдэхээс сэргийлнэ. */
    setCanLeft(el.scrollLeft > 1);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    sync();
    /* Цонхны өргөн (эсвэл sidebar) өөрчлөгдөхөд гүйлгэх зай нь өөрчлөгдөнө —
       resize болгонд дахин тооцно. */
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => observer.disconnect();
  }, [sync, tracks.length]);

  const scrollPage = (direction: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    /* Багтах бүтэн картын тоогоор гүйлгэнэ — карт дундуураа тасарч зогсохгүй. */
    const page = Math.max(CARD_STEP, Math.floor(el.clientWidth / CARD_STEP) * CARD_STEP);
    el.scrollBy({ left: direction * page, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div ref={scroller} className={RAIL_CLS} role="list" aria-label={ariaLabel} onScroll={sync}>
        {tracks.map((track) => (
          <RailCard key={track.id} track={track} />
        ))}
      </div>

      <RailArrow side="left" show={canLeft} onClick={() => scrollPage(-1)} />
      <RailArrow side="right" show={canRight} onClick={() => scrollPage(1)} />
    </div>
  );
}
