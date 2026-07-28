"use client";

import type { Track as BaseTrack } from "@/types/track";
import { LikeBtn, SaveBtn, InfoBtn } from "./TrackButtons";

type Track = BaseTrack & { custom?: boolean };

/* Нүүр — Player.jsx-аас тусад нь гаргасан (хамгийн олон prop-той view).
   LikeBtn/SaveBtn/InfoBtn-г шууд импортлов (Player-ийн closure-оор биш).
   Props: genres, genre, onGenre, list, query, curId, playing, onPlay,
          likes, saves, onToggleLike, onToggleSave, onInfo */
export default function HomeView({
  genres, genre, onGenre, list, query, curId, playing, onPlay,
  likes, saves, onToggleLike, onToggleSave, onInfo,
}: {
  genres: string[];
  genre: string;
  onGenre: (g: string) => void;
  list: Track[];
  query: string;
  curId: number | string | null;
  playing: boolean;
  onPlay: (t: Track) => void;
  likes: (number | string)[];
  saves: (number | string)[];
  onToggleLike: (id: number | string) => void;
  onToggleSave: (id: number | string) => void;
  onInfo: (t: Track) => void;
}) {
  return (
    <>
      <div className="flex gap-2.5 flex-wrap mb-7">
        {genres.map((g) => (
          <button
            key={g}
            className={
              "text-[13px] rounded-full py-[9px] px-[18px] border transition-[background,border-color,color,box-shadow] duration-250 " +
              (genre === g
                ? "bg-aqua border-aqua text-[#04100E] font-semibold shadow-[0_4px_18px_rgba(56,232,206,.32)]"
                : "bg-white/[.05] border-white/[.05] text-ink hover:bg-white/10")
            }
            onClick={() => onGenre(g)}
          >
            {g}
          </button>
        ))}
      </div>

      <h2 className="sp-h">Тренд дуунууд</h2>
      {list.length === 0 && <p className="adm-empty">&quot;{query}&quot; — олдсонгүй</p>}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(182px,1fr))] gap-[22px] max-nav:grid-cols-[repeat(auto-fill,minmax(140px,1fr))] max-nav:gap-3.5">
        {list.map((t) => {
          const isCur = curId === t.id
          return (
            <button
              key={t.id}
              className={
                "group flex flex-col gap-1 text-left p-3.5 rounded-lg border transition-[transform,background,border-color,box-shadow] duration-[320ms] ease-[cubic-bezier(.16,.8,.24,1)] text-ink hover:-translate-y-[5px] hover:shadow-lg focus-visible:shadow-glow-aqua " +
                (isCur
                  ? "bg-[rgba(56,232,206,.06)] border-[rgba(56,232,206,.4)] shadow-md"
                  : "bg-white/[.028] border-white/[.05] hover:bg-white/[.055] hover:border-white/[.09]")
              }
              onClick={() => onPlay(t)}
            >
              <span className="relative rounded-xl overflow-hidden aspect-square mb-3 bg-[#0B1211] block shadow-[0_8px_22px_rgba(0,0,0,.35)]">
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
                  {isCur && playing ? '⏸' : '▶'}
                </span>
                {isCur && playing && (
                  <span className="pl-eq absolute left-2.5 bottom-2.5" aria-hidden="true"><u></u><u></u><u></u></span>
                )}
              </span>
              <b className="font-semibold text-[15px] tracking-[-.01em] whitespace-nowrap overflow-hidden text-ellipsis">{t.title}{t.custom && <em className="sp-new"> шинэ</em>}</b>
              <i className="not-italic text-xs text-dim whitespace-nowrap overflow-hidden text-ellipsis">{t.artist} · {t.genre}</i>
            </button>
          )
        })}
      </div>

      {list.length > 0 && (
        <>
          <h2 className="sp-h sp-h2">Бүх дуунууд</h2>
          <div className="flex flex-col">
            {list.map((t, i) => {
              const isCur = curId === t.id
              return (
                <button
                  key={t.id}
                  className={
                    "grid grid-cols-[34px_44px_1fr_auto_34px_34px_30px] gap-3 items-center py-2.5 px-3.5 mb-0.5 rounded-[11px] text-ink text-left transition-colors duration-250 " +
                    (isCur ? "bg-[rgba(56,232,206,.08)]" : "hover:bg-white/5")
                  }
                  onClick={() => onPlay(t)}
                >
                  <span className="mono !text-[10px]">{String(i + 1).padStart(2, '0')}</span>
                  <img className="w-11 h-11 rounded-lg object-cover shadow-[0_4px_12px_rgba(0,0,0,.3)]" src={t.cover} alt="" loading="lazy" />
                  <span className="flex flex-col min-w-0">
                    <b className="font-semibold text-sm whitespace-nowrap overflow-hidden text-ellipsis">{t.title}{t.custom && <em className="sp-new"> шинэ</em>}</b>
                    <i className="not-italic text-xs text-dim">{t.artist}</i>
                  </span>
                  <span className="mono !text-[9.5px] max-nav:hidden">{t.genre}</span>
                  <LikeBtn id={t.id} row active={likes.includes(t.id)} onToggle={() => onToggleLike(t.id)} />
                  <SaveBtn id={t.id} row active={saves.includes(t.id)} onToggle={() => onToggleSave(t.id)} />
                  <InfoBtn t={t} row onInfo={() => onInfo(t)} />
                  <span className="text-dim text-xs flex justify-center" aria-hidden="true">
                    {isCur && playing
                      ? <span className="pl-eq" style={{ height: 14 }}><u></u><u></u><u></u></span>
                      : '▶'}
                  </span>
                </button>
              )
            })}
          </div>
        </>
      )}
    </>
  )
}
