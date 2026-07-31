"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import BackBar from "../BackBar";
import { Empty } from "@/components/ui/States";
import { ActionButton } from "@/components/ui/ActionGroup";
import { InfoBtn, LikeBtn, SaveBtn } from "../TrackButtons";
import { useIsPlayingTrack, useTrackActions } from "../PlayerContext";
import TrackPlayButton, { NowPlayingEqualizer, TrackCoverButton } from "../shared/TrackPlayButton";
import type { PlayerTrack } from "@/types/player";

/* Цуглуулгын нэгдсэн харагдац — "Дуртай / Хадгалсан / Саяхан сонссон" гурвуулаа энэ
   компонентоор зурагдана (ялгаа нь зөвхөн гарчиг ба хоосон төлөвийн бичвэр). */

function LibraryCard({ track }: { track: PlayerTrack }) {
  const { likedIds, savedIds, toggleLike, toggleSave, openDetail } = useTrackActions();
  const { isCurrent, isPlaying } = useIsPlayingTrack(track.id);

  return (
    <motion.article
      className={
        "group relative flex flex-col gap-3 rounded-panel border p-[14px] text-left text-ink transition-[transform,background,border-color,box-shadow] duration-[320ms] ease-[cubic-bezier(.16,.8,.24,1)] hover:-translate-y-[4px] hover:shadow-[0_18px_40px_rgba(0,0,0,.34)] focus-visible:outline-none focus-visible:shadow-glow-aqua " +
        (isCurrent
          ? "bg-aqua/[.07] border-aqua/30 shadow-md"
          : "bg-[rgba(11,16,16,.72)] border-white/[.06] hover:bg-[rgba(17,24,23,.92)] hover:border-aqua/15")
      }
    >
      <div className="relative">
        <TrackCoverButton
          track={track}
          className="relative block w-full text-left rounded-lg overflow-hidden aspect-square bg-[#0B1211] shadow-[0_10px_24px_rgba(0,0,0,.34)] focus-visible:outline-none focus-visible:shadow-glow-aqua"
          imgClassName="absolute inset-0 w-full h-full object-cover block transition-transform duration-[600ms] ease-[cubic-bezier(.16,.8,.24,1)] group-hover:scale-[1.06]"
          overlayClassName="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,.10)_52%,rgba(0,0,0,.5))]"
        />
        <LikeBtn id={track.id} active={likedIds.includes(track.id)} onToggle={() => toggleLike(track.id)} />
        <SaveBtn id={track.id} active={savedIds.includes(track.id)} onToggle={() => toggleSave(track.id)} />
        <InfoBtn t={track} onInfo={() => openDetail(track)} />
        <TrackPlayButton
          track={track}
          glyph
          className="absolute right-2.5 bottom-2.5 w-[44px] h-[44px] rounded-full bg-aqua text-on-aqua flex items-center justify-center text-lead transition-[opacity,transform,box-shadow] duration-300 shadow-[0_8px_22px_rgba(0,0,0,.55)] hover:shadow-[0_10px_28px_rgba(56,232,206,.4)] focus-visible:outline-none focus-visible:shadow-glow-aqua"
          restingClassName="opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0"
        />
        {isPlaying && <NowPlayingEqualizer className="absolute left-2.5 bottom-2.5" />}
      </div>
      <div className="min-w-0">
        <b className="block font-semibold text-copy tracking-[-.01em] whitespace-nowrap overflow-hidden text-ellipsis">
          {track.title}
          {track.custom && (
            <em className="not-italic text-micro text-aqua border border-aqua/40 rounded-full py-px px-1.5 ml-1.5 align-[1px]">шинэ</em>
          )}
        </b>
        <i className="not-italic block text-xs text-dim whitespace-nowrap overflow-hidden text-ellipsis">{track.artist}</i>
        <span
          className={
            "mt-2 inline-flex items-center rounded-full border px-2.5 py-1 text-meta font-medium uppercase tracking-[.12em] " +
            (isCurrent ? "border-aqua/25 bg-aqua/[.08] text-aqua" : "border-white/[.08] bg-white/[.03] text-faint")
          }
        >
          {track.genre}
        </span>
      </div>
    </motion.article>
  );
}

export default function LibraryView({
  title,
  tracks,
  onBack,
  emptyIcon = "music",
  emptyTitle = "Хоосон байна",
  emptyHint,
}: {
  title: string;
  tracks: PlayerTrack[];
  onBack: () => void;
  emptyIcon?: string;
  emptyTitle?: string;
  emptyHint?: ReactNode;
}) {
  const { play } = useTrackActions();

  return (
    <>
      <BackBar title={title} onBack={onBack} />

      {tracks.length === 0 ? (
        <Empty icon={emptyIcon} title={emptyTitle} hint={emptyHint as string | undefined} />
      ) : (
        <>
          <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
            <span className="mono">{tracks.length} дуу</span>
            <ActionButton variant="primary" onClick={() => tracks[0] && play(tracks[0])} type="button">
              <span aria-hidden="true">▶</span> Бүгдийг тоглуулах
            </ActionButton>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(196px,1fr))] gap-5 max-nav:grid-cols-[repeat(auto-fill,minmax(152px,1fr))] max-nav:gap-3.5">
            {tracks.map((track) => (
              <LibraryCard key={track.id} track={track} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
