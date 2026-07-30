"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type { Track as BaseTrack } from "@/types/track";
import BackBar from "./BackBar";
import { Empty } from "@/components/ui/States";
import { LikeBtn, SaveBtn, InfoBtn } from "./TrackButtons";

type Track = BaseTrack & { custom?: boolean };

export default function LibraryView({
  title,
  tracks,
  curId,
  playing,
  onPlay,
  likes,
  saves,
  onToggleLike,
  onToggleSave,
  onInfo,
  onBack,
  emptyIcon = "music",
  emptyTitle = "Хоосон байна",
  emptyHint,
}: {
  title: string;
  tracks: Track[];
  curId: number | string | null;
  playing: boolean;
  onPlay: (t: Track) => void;
  likes: (number | string)[];
  saves: (number | string)[];
  onToggleLike: (id: number | string) => void;
  onToggleSave: (id: number | string) => void;
  onInfo: (t: Track) => void;
  onBack: () => void;
  emptyIcon?: string;
  emptyTitle?: string;
  emptyHint?: ReactNode;
}) {
  const playAll = () => {
    if (tracks[0]) onPlay(tracks[0]);
  };

  return (
    <>
      <BackBar title={title} onBack={onBack} />

      {tracks.length === 0 ? (
        <Empty icon={emptyIcon} title={emptyTitle} hint={emptyHint as string | undefined} />
      ) : (
        <>
          <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
            <span className="mono">{tracks.length} дуу</span>
            <button
              className="flex items-center gap-2 rounded-full text-[13px] font-semibold bg-aqua text-[#04100E] py-2.5 px-5 transition-[background,transform] duration-200 hover:bg-[#6FF3DE] active:scale-[.97] focus-visible:outline-none focus-visible:shadow-glow-aqua"
              onClick={playAll}
              type="button"
            >
              <span aria-hidden="true">▶</span> Бүгдийг тоглуулах
            </button>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(196px,1fr))] gap-5 max-nav:grid-cols-[repeat(auto-fill,minmax(152px,1fr))] max-nav:gap-3.5">
            {tracks.map((t) => {
              const isCur = curId === t.id;
              return (
                <motion.article
                  key={t.id}
                  className={
                    "group relative flex flex-col gap-3 rounded-[22px] border p-[14px] text-left text-ink transition-[transform,background,border-color,box-shadow] duration-[320ms] ease-[cubic-bezier(.16,.8,.24,1)] hover:-translate-y-[4px] hover:shadow-[0_18px_40px_rgba(0,0,0,.34)] focus-visible:outline-none focus-visible:shadow-glow-aqua " +
                    (isCur ? "bg-aqua/[.07] border-aqua/30 shadow-md" : "bg-[rgba(11,16,16,.72)] border-white/[.06] hover:bg-[rgba(17,24,23,.92)] hover:border-aqua/15")
                  }
                >
                  <div className="relative">
                    <button
                      type="button"
                      className="relative block w-full text-left rounded-[18px] overflow-hidden aspect-square bg-[#0B1211] shadow-[0_10px_24px_rgba(0,0,0,.34)] focus-visible:outline-none focus-visible:shadow-glow-aqua"
                      onClick={() => onInfo(t)}
                      aria-label={`${t.title} - дэлгэрэнгүй`}
                    >
                      <img
                        src={t.cover}
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover block transition-transform duration-[600ms] ease-[cubic-bezier(.16,.8,.24,1)] group-hover:scale-[1.06]"
                      />
                      <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,.10)_52%,rgba(0,0,0,.5))]" aria-hidden="true" />
                    </button>
                    <LikeBtn id={t.id} active={likes.includes(t.id)} onToggle={() => onToggleLike(t.id)} />
                    <SaveBtn id={t.id} active={saves.includes(t.id)} onToggle={() => onToggleSave(t.id)} />
                    <InfoBtn t={t} onInfo={() => onInfo(t)} />
                    <button
                      type="button"
                      className={
                        "absolute right-2.5 bottom-2.5 w-[44px] h-[44px] rounded-full bg-aqua text-[#04100E] flex items-center justify-center text-[15px] transition-[opacity,transform,box-shadow] duration-300 shadow-[0_8px_22px_rgba(0,0,0,.55)] hover:shadow-[0_10px_28px_rgba(56,232,206,.4)] focus-visible:outline-none focus-visible:shadow-glow-aqua " +
                        (isCur && playing ? "opacity-100" : "opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0")
                      }
                      onClick={() => onPlay(t)}
                      aria-label={isCur && playing ? `Түр зогсоох: ${t.title}` : `Тоглуулах: ${t.title}`}
                    >
                      {isCur && playing ? "⏸" : "▶"}
                    </button>
                    {isCur && playing && (
                      <span className="pl-eq absolute left-2.5 bottom-2.5" aria-hidden="true">
                        <u></u>
                        <u></u>
                        <u></u>
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <b className="block font-semibold text-[14.5px] tracking-[-.01em] whitespace-nowrap overflow-hidden text-ellipsis">
                      {t.title}
                      {t.custom && (
                        <em className="not-italic text-[9px] text-aqua border border-aqua/40 rounded-full py-px px-1.5 ml-1.5 align-[1px]">
                          шинэ
                        </em>
                      )}
                    </b>
                    <i className="not-italic block text-xs text-dim whitespace-nowrap overflow-hidden text-ellipsis">
                      {t.artist}
                    </i>
                    <span
                      className={
                        "mt-2 inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[.12em] " +
                        (isCur ? "border-aqua/25 bg-aqua/[.08] text-aqua" : "border-white/[.08] bg-white/[.03] text-faint")
                      }
                    >
                      {t.genre}
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
