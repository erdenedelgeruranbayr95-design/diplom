"use client";

import { motion } from "framer-motion";
import { useIsPlayingTrack, useTrackActions } from "@/components/player/PlayerContext";
import TrackPlayButton, { TrackCoverButton } from "@/components/player/shared/TrackPlayButton";
import { InfoBtn, LikeBtn, SaveBtn } from "@/components/player/TrackButtons";
import type { PlayerTrack } from "@/types/player";

/* Хэвтээ гүйдэг dashboard мөр — Үргэлжлүүлэн сонсох · Дуртай · Онцлох · Алдартай ·
   Сүүлийн үеийн БҮГД ижил rail загвартай. Урьд нь энэ 5 секц HomeView дотор нэг
   `TrackRail` дуудлагатай байсан ч картын доторх бүх prop гараар дамжиж байв. */

const RAIL_CLS =
  "relative isolate flex gap-4 overflow-x-auto pt-2 pb-2 -mx-1 px-1 [scrollbar-width:thin] [scrollbar-color:var(--faint)_transparent]";

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
  return (
    <div className={RAIL_CLS} role="list" aria-label={ariaLabel}>
      {tracks.map((track) => (
        <RailCard key={track.id} track={track} />
      ))}
    </div>
  );
}
