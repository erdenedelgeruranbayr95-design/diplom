"use client";

import Icon from "@/components/ui/Icon";
import { useIsPlayingTrack, useTrackActions } from "./PlayerContext";
import type { PlayerTrack } from "@/types/player";

/** Хажуу цэсийн жижиг дууны мөр — Дуртай / Хадгалсан / Саяхан сонссон. */

function SideListRow({ track }: { track: PlayerTrack }) {
  const { play } = useTrackActions();
  const { isCurrent, isPlaying } = useIsPlayingTrack(track.id);

  return (
    <button
      type="button"
      className={
        "group flex items-center gap-3.5 rounded-2xl overflow-hidden text-ink text-left transition-[background,border-color,transform,box-shadow] duration-[250ms] pr-3 bg-[rgba(11,16,16,.62)] border border-white/[.06] hover:bg-[rgba(18,26,25,.82)] hover:border-aqua/18 hover:-translate-y-[1px] " +
        (isCurrent ? "border-aqua/28 bg-aqua/[.07] shadow-[0_10px_26px_rgba(0,0,0,.28)]" : "")
      }
      onClick={() => play(track)}
    >
      <img
        src={track.cover}
        alt=""
        className="w-[46px] h-[46px] object-cover flex-none rounded-xl shadow-[0_8px_18px_rgba(0,0,0,.35)]"
        loading="lazy"
        decoding="async"
      />
      <span className="flex min-w-0 flex-1 flex-col py-2">
        <b className="text-note font-semibold whitespace-nowrap overflow-hidden text-ellipsis">{track.title}</b>
        <span className="text-caption text-dim whitespace-nowrap overflow-hidden text-ellipsis">{track.artist}</span>
      </span>
      <span
        className={
          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-meta font-medium uppercase tracking-[.14em] " +
          (isCurrent ? "border-aqua/25 bg-aqua/[.08] text-aqua" : "border-white/[.08] bg-white/[.03] text-faint")
        }
      >
        <span aria-hidden="true">
          <Icon name={isPlaying ? "pause" : "play"} size={11} />
        </span>
        {isPlaying ? "Playing" : "Play"}
      </span>
    </button>
  );
}

export default function SideList({ tracks }: { tracks: PlayerTrack[] }) {
  return (
    <div className="flex flex-col gap-[8px] max-nav:hidden">
      {tracks.map((track) => (
        <SideListRow key={track.id} track={track} />
      ))}
    </div>
  );
}
