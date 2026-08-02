"use client";

import { useState } from "react";
import BackBar from "../../BackBar";
import { Empty } from "@/components/ui/States";
import { ActionButton } from "@/components/ui/ActionGroup";
import { useToast } from "@/components/providers/ToastProvider";
import { useIsPlayingTrack, useTrackActions } from "../../PlayerContext";
import { NowPlayingEqualizer } from "../../shared/TrackPlayButton";
import { resolveTracks } from "@/lib/player/track-index";
import type { PlayerTrack } from "@/types/player";
import type { Playlist } from "@/types/track";

/** Нээсэн жагсаалт — дуунуудын мөр + "дуу нэмэх" хайлт. */
export default function PlaylistDetail({
  playlist,
  trackIndex,
  allTracks,
  onAddTrack,
  onRemoveTrack,
  onClose,
}: {
  playlist: Playlist;
  trackIndex: Map<string, PlayerTrack>;
  allTracks: PlayerTrack[];
  onAddTrack: (songId: string) => void;
  onRemoveTrack: (songId: string) => void;
  onClose: () => void;
}) {
  const toast = useToast();
  const { play } = useTrackActions();
  const [adding, setAdding] = useState(false);
  const [query, setQuery] = useState("");

  const items = resolveTracks(playlist.tracks, trackIndex);
  const candidates = allTracks.filter(
    (t) => !playlist.tracks.includes(t.id) && (t.title + " " + t.artist).toLowerCase().includes(query.trim().toLowerCase()),
  );

  function playAll() {
    if (items[0]) play(items[0]);
    else toast.error("Жагсаалт хоосон байна");
  }

  return (
    <>
      <BackBar
        title={playlist.name}
        onBack={() => {
          onClose();
          setAdding(false);
        }}
      />
      <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
        <span className="mono">{items.length} дуу</span>
        <div className="flex gap-2.5">
          <ActionButton variant="primary" onClick={playAll} disabled={!items.length}>
            <span aria-hidden="true">▶</span> Бүгдийг тоглуулах
          </ActionButton>
          <ActionButton variant="secondary" onClick={() => setAdding((a) => !a)}>
            {adding ? "Хаах" : "＋ Дуу нэмэх"}
          </ActionButton>
        </div>
      </div>

      {adding && (
        <div className="mb-6 border border-white/[.08] rounded-2xl p-4 bg-white/[.02]">
          <div className="relative mb-3">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-faint pointer-events-none"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.5" y2="16.5" />
            </svg>
            <input
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white/[.05] border border-white/[.06] text-ink text-copy font-[inherit] transition-[border-color,box-shadow,background] duration-300 focus:bg-white/[.08] focus:border-aqua/60 focus-visible:outline-none focus-visible:shadow-glow-aqua placeholder:text-faint"
              placeholder="Дуу хайх…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Нэмэх дуу хайх"
            />
          </div>
          <div className="flex flex-col gap-1 max-h-[360px] overflow-y-auto">
            {candidates.length === 0 && <Empty icon="search" title="Нэмэх дуу алга" hint="Өөр түлхүүр үгээр хайж үзнэ үү" />}
            {candidates.slice(0, 20).map((track) => (
              <div
                key={track.id}
                className="flex items-center gap-3 py-2 px-2.5 rounded-lg text-ink text-left hover:bg-white/[.04] transition-colors duration-150"
              >
                <img
                  className="w-10 h-10 rounded-md object-cover shadow-[0_4px_12px_rgba(0,0,0,.3)] flex-none"
                  src={track.cover}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <span className="flex flex-col min-w-0 flex-1">
                  <b className="font-semibold text-sm whitespace-nowrap overflow-hidden text-ellipsis">{track.title}</b>
                  <i className="not-italic text-xs text-dim">{track.artist}</i>
                </span>
                <button
                  className="w-8 h-8 flex-none rounded-full flex items-center justify-center bg-aqua text-on-aqua text-base transition-transform duration-150 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:shadow-glow-aqua"
                  onClick={() => {
                    if (typeof track.id !== "string") {
                      toast.error("Энэ дууг жагсаалтад нэмэх боломжгүй байна");
                      return;
                    }
                    onAddTrack(track.id);
                    toast.success("Нэмэгдлээ");
                  }}
                  aria-label={track.title + " нэмэх"}
                >
                  ＋
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <Empty icon="phones" title="Жагсаалт хоосон" hint="«＋ Дуу нэмэх» товчоор дуу нэмээрэй" />
      ) : (
        <div className="flex flex-col gap-0.5">
          {items.map((track, i) => (
            <PlaylistRow key={track.id} track={track} index={i} onRemove={() => typeof track.id === "string" && onRemoveTrack(track.id)} />
          ))}
        </div>
      )}
    </>
  );
}

function PlaylistRow({
  track,
  index,
  onRemove,
}: {
  track: PlayerTrack;
  index: number;
  onRemove: () => void;
}) {
  const toast = useToast();
  const { play } = useTrackActions();
  const { isCurrent, isPlaying } = useIsPlayingTrack(track.id);

  return (
    <div
      className={
        "grid grid-cols-[28px_44px_1fr_auto_auto_28px] gap-3 items-center py-2.5 px-3 rounded-lg text-ink text-left transition-colors duration-200 " +
        (isCurrent ? "bg-aqua/[.08]" : "hover:bg-white/[.04]")
      }
    >
      <span className="mono !text-meta">{String(index + 1).padStart(2, "0")}</span>
      <img
        className="w-11 h-11 rounded-md object-cover shadow-[0_4px_12px_rgba(0,0,0,.3)]"
        src={track.cover}
        alt=""
        loading="lazy"
        decoding="async"
      />
      <button
        className="flex flex-col min-w-0 text-left bg-none border-none cursor-pointer focus-visible:outline-none"
        onClick={() => play(track)}
      >
        <b className="font-semibold text-sm whitespace-nowrap overflow-hidden text-ellipsis">{track.title}</b>
        <i className="not-italic text-xs text-dim">{track.artist}</i>
      </button>
      <span className="mono !text-micro max-nav:hidden">{track.genre}</span>
      <button
        className="text-caption text-danger border border-[rgba(232,138,155,.3)] rounded-full py-1.5 px-3.5 transition-colors duration-250 hover:bg-danger hover:text-danger-ink focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(232,138,155,.3)]"
        onClick={() => {
          onRemove();
          toast.info("Хасагдлаа");
        }}
      >
        Хасах
      </button>
      <span className="text-dim text-xs flex justify-center" aria-hidden="true">
        {isPlaying ? <NowPlayingEqualizer height={14} /> : "▶"}
      </span>
    </div>
  );
}
