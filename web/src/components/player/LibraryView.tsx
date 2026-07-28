"use client";

/* Дуртай / Хадгалсан / Саяхан сонссон — бүтэн хуудсаар харуулах нийтлэг view. Премиум
   music-library card grid (Spotify/Apple Music Library pattern) руу шинэчлэв: HomeView-ийн
   "Тренд дуунууд" грид карттай ижил дизайн хэлээр. onPlay/onToggleLike/onToggleSave/onInfo
   callback бүгд хэвээр, зөвхөн визуал давхарга (list → card grid) шинэчлэгдсэн. */
import type { ReactNode } from "react";
import type { Track as BaseTrack } from "@/types/track";
import BackBar from "./BackBar";
import { Empty } from "@/components/ui/States";
import { LikeBtn, SaveBtn, InfoBtn } from "./TrackButtons";

type Track = BaseTrack & { custom?: boolean };

export default function LibraryView({
  title, tracks, curId, playing, onPlay,
  likes, saves, onToggleLike, onToggleSave, onInfo, onBack,
  emptyIcon = '🎵', emptyTitle = 'Хоосон байна', emptyHint,
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
  const playAll = () => { if (tracks[0]) onPlay(tracks[0]) }
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
            >
              <span aria-hidden="true">▶</span> Бүгдийг тоглуулах
            </button>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(182px,1fr))] gap-5 max-nav:grid-cols-[repeat(auto-fill,minmax(140px,1fr))] max-nav:gap-3.5">
            {tracks.map((t) => {
              const isCur = curId === t.id
              return (
                <button
                  key={t.id}
                  className={
                    "group flex flex-col gap-1 text-left p-3.5 rounded-xl border transition-[transform,background,border-color,box-shadow] duration-[320ms] ease-[cubic-bezier(.16,.8,.24,1)] text-ink hover:-translate-y-[5px] hover:shadow-lg focus-visible:outline-none focus-visible:shadow-glow-aqua " +
                    (isCur
                      ? "bg-aqua/[.06] border-aqua/40 shadow-md"
                      : "bg-white/[.03] border-white/[.06] hover:bg-white/[.055] hover:border-white/[.1]")
                  }
                  onClick={() => onPlay(t)}
                >
                  <span className="relative rounded-lg overflow-hidden aspect-square mb-3 bg-[#0B1211] block shadow-[0_8px_22px_rgba(0,0,0,.35)]">
                    <img
                      src={t.cover}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover block transition-transform duration-[600ms] ease-[cubic-bezier(.16,.8,.24,1)] group-hover:scale-[1.08]"
                    />
                    <LikeBtn id={t.id} active={likes.includes(t.id)} onToggle={() => onToggleLike(t.id)} />
                    <SaveBtn id={t.id} active={saves.includes(t.id)} onToggle={() => onToggleSave(t.id)} />
                    <InfoBtn t={t} onInfo={() => onInfo(t)} />
                    <span
                      className={
                        "absolute right-[9px] bottom-[9px] w-[46px] h-[46px] rounded-full bg-aqua text-[#04100E] flex items-center justify-center text-[15px] transition-[opacity,transform,box-shadow] duration-300 shadow-[0_8px_22px_rgba(0,0,0,.55)] group-hover:shadow-[0_10px_28px_rgba(56,232,206,.4)] " +
                        (isCur && playing ? "opacity-100" : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0")
                      }
                      aria-hidden="true"
                    >
                      {isCur && playing ? "⏸" : "▶"}
                    </span>
                    {isCur && playing && (
                      <span className="pl-eq absolute left-2.5 bottom-2.5" aria-hidden="true">
                        <u></u>
                        <u></u>
                        <u></u>
                      </span>
                    )}
                  </span>
                  <b className="font-semibold text-[14.5px] tracking-[-.01em] whitespace-nowrap overflow-hidden text-ellipsis">
                    {t.title}
                    {t.custom && <em className="not-italic text-[9px] text-aqua border border-aqua/40 rounded-full py-px px-1.5 ml-1.5 align-[1px]">шинэ</em>}
                  </b>
                  <i className="not-italic text-xs text-dim whitespace-nowrap overflow-hidden text-ellipsis">
                    {t.artist} · {t.genre}
                  </i>
                </button>
              )
            })}
          </div>
        </>
      )}
    </>
  )
}
