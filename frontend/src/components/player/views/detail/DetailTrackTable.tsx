"use client";

import { SectionTitle } from "@/components/ui/PageHeader";
import { Empty } from "@/components/ui/States";
import { useTrackActions } from "@/components/player/PlayerContext";
import { fmt } from "@/lib/player/format";
import type { PlayerTrack } from "@/types/player";

/** Альбом/уран бүтээлчийн дуунуудын хүснэгт — мөр дээр дарж яг тухайн дууг тоглуулна. */
export default function DetailTrackTable({
  tracks,
  activeSongId,
  activeTitle,
  isCurrentAlbum,
  fallbackArtistName,
}: {
  tracks: PlayerTrack[];
  /** Одоо нээлттэй байгаа дууны backend id. */
  activeSongId: string | null;
  /** id таарахгүй үед нэрээр таних (статик каталогийн дуу). */
  activeTitle: string;
  isCurrentAlbum: boolean;
  fallbackArtistName?: string;
}) {
  const { play } = useTrackActions();

  return (
    <>
      <div className="mt-8">
        <SectionTitle title="Дуунууд" description="Мөр дээр дарж яг тухайн дууг тоглуулна." />
      </div>
      {tracks.length === 0 ? (
        <Empty icon="music" title="Дуу олдсонгүй" hint="Энэ уран бүтээлчийн каталог хараахан ачаалагдаагүй байна" />
      ) : (
        <div className="overflow-hidden rounded-card border border-white/[.08] bg-white/[.03]">
          <div className="grid grid-cols-[44px_1fr_64px] max-nav:grid-cols-[34px_1fr_54px] gap-3 px-5 max-nav:px-3.5 py-3 border-b border-white/[.06] text-caption uppercase tracking-[.2em] text-faint font-mono">
            <span>#</span>
            <span>Нэр</span>
            <span className="text-right" aria-label="Үргэлжлэх хугацаа">
              ⏱
            </span>
          </div>
          <div className="flex flex-col">
            {tracks.map((song, index) => {
              const active = song.id === activeSongId || (isCurrentAlbum && song.title === activeTitle);
              return (
                <button
                  key={song.id}
                  type="button"
                  aria-current={active ? "true" : undefined}
                  className={
                    /* Идэвхтэй мөр: зүүн талын aqua зураас + өнгө. Өмнө нь зөвхөн бүдэг
                       дэвсгэрээр ялгагддаг байсан нь хажуугаас хараад мэдэгдэхгүй байв. */
                    "relative grid grid-cols-[44px_1fr_64px] max-nav:grid-cols-[34px_1fr_54px] gap-3 items-center px-5 max-nav:px-3.5 py-4 min-h-11 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:shadow-glow-aqua border-t border-white/[.05] " +
                    "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:transition-transform before:duration-200 before:origin-center " +
                    (active ? "bg-aqua/[.08] before:bg-aqua before:scale-y-100" : "hover:bg-white/[.04] before:bg-aqua before:scale-y-0")
                  }
                  onClick={() => play(song)}
                >
                  <span className={"mono text-caption " + (active ? "text-aqua" : "text-dim")}>{String(index + 1).padStart(2, "0")}</span>
                  <span className="min-w-0">
                    <b className={"block font-semibold text-copy truncate " + (active ? "text-aqua" : "")}>{song.title}</b>
                    <i className="not-italic text-note text-dim truncate block">{song.artist || fallbackArtistName}</i>
                  </span>
                  <span className="mono text-caption text-right text-dim tabular-nums">{song.duration ? fmt(song.duration) : "—"}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
