"use client";

import ActionToolbar from "./ActionToolbar";
import PlaybackControls from "./PlaybackControls";
import PlayerHeader from "./PlayerHeader";
import type { AudioPlayback } from "@/lib/player/hooks/useAudioPlayback";

/* Доод баар — одоо тоглож буй дуу · транспорт · туслах үйлдлүүд.

   Player.tsx-д 30 мөрийн JSX + 12 prop дамжуулалт байсныг нэг блок болгов.
   Гурван дэд компонент нь өөрчлөгдөөгүй, зөвхөн байрлуулалт энд шилжив. */
export default function PlayerFooter({
  playback,
  subscribed,
  vibrationOn,
  onToggleVibration,
  canVibrate,
  nowPlayingOpen,
  onToggleNowPlaying,
  phoneConnected,
  onOpenPairing,
  onStep,
  onTogglePlay,
  onImmersive,
}: {
  playback: AudioPlayback;
  subscribed: boolean;
  vibrationOn: boolean;
  onToggleVibration: () => void;
  canVibrate: boolean;
  nowPlayingOpen: boolean;
  onToggleNowPlaying: () => void;
  phoneConnected: boolean;
  onOpenPairing: () => void;
  onStep: (direction: number) => void;
  /** Дуу сонгогдоогүй үед шүүсэн жагсаалтын эхний дууг эхлүүлэх нөхцөл нь Player-т. */
  onTogglePlay: () => void;
  onImmersive: () => void;
}) {
  return (
    <footer className="relative z-[3] grid grid-cols-[1fr_auto_1fr] max-nav:grid-cols-1 items-center gap-[18px] max-nav:gap-2.5 p-[12px_22px] max-nav:p-[10px_16px_14px] min-h-[92px] max-nav:min-h-0 bg-[rgba(9,12,12,.82)] backdrop-blur-3xl [backdrop-filter:blur(26px)_saturate(1.3)] border-t border-[rgba(255,255,255,.07)]">
      <PlayerHeader
        track={playback.current}
        npOpen={nowPlayingOpen}
        onToggleNowPlaying={onToggleNowPlaying}
        phoneConnected={phoneConnected}
        onOpenPairing={onOpenPairing}
      />

      <PlaybackControls
        playing={playback.playing}
        time={playback.time}
        dur={playback.duration}
        pct={playback.progressPct}
        previewPct={playback.previewPct}
        subscribed={subscribed}
        onTogglePlay={onTogglePlay}
        onStep={onStep}
        onSeek={playback.seekBy}
        onSeekTo={playback.seekToPointer}
      />

      <ActionToolbar
        vibro={vibrationOn}
        onToggleVibro={onToggleVibration}
        canVibrate={canVibrate}
        hasTrack={!!playback.current}
        onImmersive={onImmersive}
      />
    </footer>
  );
}
