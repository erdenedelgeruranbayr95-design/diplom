"use client";

import { motion } from "framer-motion";
import { useIsPlayingTrack, useTrackActions } from "@/components/player/PlayerContext";
import TrackPlayButton, { TrackCoverButton } from "@/components/player/shared/TrackPlayButton";
import RailArrow from "@/components/player/shared/RailArrow";
import { InfoBtn, LikeBtn, SaveBtn } from "@/components/player/TrackButtons";
import { useRailScroll } from "@/hooks";
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
  const { scroller, canLeft, canRight, scrollPage, sync } = useRailScroll<HTMLDivElement>(CARD_STEP, [tracks.length]);

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
