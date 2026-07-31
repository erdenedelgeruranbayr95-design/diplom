"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/PageHeader";
import { Empty } from "@/components/ui/States";
import { useIsPlayingTrack, useTrackActions } from "@/components/player/PlayerContext";
import TrackPlayButton, { NowPlayingEqualizer, TrackCoverButton } from "@/components/player/shared/TrackPlayButton";
import { InfoBtn, LikeBtn, SaveBtn } from "@/components/player/TrackButtons";
import type { PlayerTrack } from "@/types/player";

/** Хайлт/төрлийн шүүлтийн үр дүнгийн торон харагдац. */

function SearchResultCard({ track }: { track: PlayerTrack }) {
  const { likedIds, savedIds, toggleLike, toggleSave, openDetail } = useTrackActions();
  const { isCurrent, isPlaying } = useIsPlayingTrack(track.id);

  return (
    <motion.article
      className={
        "group flex flex-col gap-1.5 text-left p-[15px] rounded-panel border transition-[transform,background,border-color,box-shadow] duration-[320ms] ease-[cubic-bezier(.16,.8,.24,1)] text-ink hover:-translate-y-[5px] hover:shadow-lg focus-visible:outline-none focus-visible:shadow-glow-aqua " +
        (isCurrent
          ? "bg-aqua/[.06] border-aqua/40 shadow-md"
          : "bg-white/[.03] border-white/[.06] hover:bg-white/[.055] hover:border-white/[.1]")
      }
    >
      <div className="relative">
        <TrackCoverButton
          track={track}
          className="relative block w-full text-left rounded-2xl overflow-hidden aspect-square bg-[#0B1211] shadow-[0_8px_22px_rgba(0,0,0,.35)] focus-visible:outline-none focus-visible:shadow-glow-aqua"
          imgClassName="absolute inset-0 w-full h-full object-cover block transition-transform duration-[600ms] ease-[cubic-bezier(.16,.8,.24,1)] group-hover:scale-[1.08]"
          overlayClassName="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,.14)_58%,rgba(0,0,0,.5))]"
        />
        <LikeBtn id={track.id} active={likedIds.includes(track.id)} onToggle={() => toggleLike(track.id)} />
        <SaveBtn id={track.id} active={savedIds.includes(track.id)} onToggle={() => toggleSave(track.id)} />
        <InfoBtn t={track} onInfo={() => openDetail(track)} />
        <TrackPlayButton
          track={track}
          className="absolute right-[9px] bottom-[9px] w-[48px] h-[48px] rounded-full bg-aqua text-on-aqua flex items-center justify-center text-lead transition-[opacity,transform,box-shadow] duration-300 shadow-[0_8px_22px_rgba(0,0,0,.55)] hover:shadow-[0_10px_28px_rgba(56,232,206,.4)] focus-visible:outline-none focus-visible:shadow-glow-aqua"
          restingClassName="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
        />
        {isPlaying && <NowPlayingEqualizer className="absolute left-2.5 bottom-2.5" />}
      </div>
      <b className="font-semibold text-lead tracking-[-.01em] whitespace-nowrap overflow-hidden text-ellipsis">
        {track.title}
        {track.custom && <em className="not-italic text-micro text-aqua border border-aqua/40 rounded-full py-px px-1.5 ml-1.5 align-[1px]">шинэ</em>}
      </b>
      <i className="not-italic text-note text-dim whitespace-nowrap overflow-hidden text-ellipsis">
        {track.artist} · {track.genre}
      </i>
    </motion.article>
  );
}

export default function SearchResultGrid({ tracks, query }: { tracks: PlayerTrack[]; query: string }) {
  return (
    <>
      <SectionTitle title="Бүх дуунуудаас хайх" />
      {tracks.length === 0 && <Empty title={`"${query}" — олдсонгүй`} hint="Өөр түлхүүр үгээр хайж үзнэ үү" />}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-5 max-nav:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] max-nav:gap-3.5">
        {tracks.map((track) => (
          <SearchResultCard key={track.id} track={track} />
        ))}
      </div>
    </>
  );
}
