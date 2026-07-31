"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { useIsPlayingTrack, useTrackActions } from "@/components/player/PlayerContext";
import type { PlayerTrack } from "@/types/player";

/* Дууны карт дээрх дугуй "тоглуулах" товч.

   Хэмжээ/байрлал/сүүдэр нь картын төрлөөс хамааран ЯЛГААТАЙ хэвээр (rail 44px,
   санал болголт 42px, grid 48px) — Tailwind-ийн зөрчилдөх утилитуудыг холихгүйн тулд
   визуал класс БҮХЭЛДЭЭ дуудагчаас ирнэ. Энд зөвхөн ДАВТАГДДАГ ЛОГИК (одоо тоглож
   байгаа эсэх, aria-label, onClick, дүрс сонголт) нэгдэв — өмнө нь 5 файлд хуулагдсан. */

export default function TrackPlayButton({
  track,
  className,
  restingClassName,
  glyph = false,
}: {
  track: PlayerTrack;
  /** Товчны бүрэн визуал класс (байрлал, хэмжээ, transition, сүүдэр). */
  className: string;
  /** Тоглоогүй үед НЭМЭГДЭХ класс (hover дээр гарч ирэх нөлөө). */
  restingClassName: string;
  /** `true` бол FontAwesome-ийн оронд ⏸/▶ глиф ашиглана (LibraryView-ийн хэв маяг). */
  glyph?: boolean;
}) {
  const { play } = useTrackActions();
  const { isPlaying } = useIsPlayingTrack(track.id);

  return (
    <button
      type="button"
      className={className + " " + (isPlaying ? "opacity-100" : restingClassName)}
      onClick={() => play(track)}
      aria-label={isPlaying ? `Түр зогсоох: ${track.title}` : `Тоглуулах: ${track.title}`}
    >
      {glyph ? isPlaying ? "⏸" : "▶" : <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />}
    </button>
  );
}

/** Тоглож байгааг илэрхийлэх 3 баганат жижиг equalizer. */
export function NowPlayingEqualizer({ className = "", height }: { className?: string; height?: number }) {
  return (
    <span className={"pl-eq " + className} style={height ? { height } : undefined} aria-hidden="true">
      <u></u>
      <u></u>
      <u></u>
    </span>
  );
}

/** Обложка дээр дарж дэлгэрэнгүй рүү орох товч — 4 газар давтагдаж байсан. */
export function TrackCoverButton({
  track,
  className,
  imgClassName,
  overlayClassName,
}: {
  track: PlayerTrack;
  className: string;
  imgClassName: string;
  overlayClassName: string;
}) {
  const { openDetail } = useTrackActions();
  return (
    <button type="button" className={className} onClick={() => openDetail(track)} aria-label={`${track.title} - дэлгэрэнгүй`}>
      <img src={track.cover} alt="" loading="lazy" className={imgClassName} decoding="async" />
      <span className={overlayClassName} aria-hidden="true" />
    </button>
  );
}
