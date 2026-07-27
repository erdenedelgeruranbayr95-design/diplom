"use client";

import type { ReactNode } from "react";
import type { Track as BaseTrack } from "@/types/track";
import BackBar from "./BackBar";
import { Empty } from "@/components/ui/States";
import { LikeBtn, SaveBtn, InfoBtn } from "./TrackButtons";

type Track = BaseTrack & { custom?: boolean };

/* Дуртай / Хадгалсан / Саяхан сонссон — бүтэн хуудсаар харуулах нийтлэг view.
   HomeView-ийн «Бүх дуунууд» мөрийн бүтцийг дахин ашиглав. */
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
          <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
            <span className="mono">{tracks.length} дуу</span>
            <div className="flex gap-2">
              <button className="bt bt-a" onClick={playAll}>▶ Бүгдийг тоглуулах</button>
            </div>
          </div>

          <div className="flex flex-col">
            {tracks.map((t, i) => {
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
