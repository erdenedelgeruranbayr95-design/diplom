"use client";

import type { ReactNode } from "react";
import Calibrate from "./Calibrate";
import ImmersiveMode from "./ImmersiveMode";
import NowPlayingPanel from "./NowPlayingPanel";
import PairingCard from "./PairingCard";
import type { HapticEngine } from "@/lib/player/hooks/useHapticEngine";
import type { useDeviceSync } from "@/lib/socket/useDeviceSync";
import type { CalibrationResult, PlayerTrack, Prefs, VizPrefs } from "@/types/player";

/* Тоглуулагчийн дээр давхарлагдах давхаргууд: Мэдрэх самбар · Утас холбох ·
   Мэдрэх горим · Калибровк. Player.tsx-д 70 мөр JSX эзэлж байсныг энд төвлөрүүлэв —
   аль давхарга нээлттэй байх нь Player-ийн state хэвээр, зөвхөн разметк энд шилжив. */

const DEFAULT_VIZ: VizPrefs = { mode: "bars", particles: true, glow: 0.6 };

export default function PlayerOverlays({
  track,
  playing,
  prefs,
  onUpdatePrefs,
  haptics,
  deviceSync,
  analyser,
  vibrationOn,
  onToggleVibration,
  nowPlayingOpen,
  onCloseNowPlaying,
  onOpenImmersive,
  onOpenPairing,
  onTestVibration,
  pairingOpen,
  onClosePairing,
  immersive,
  immersiveClosing,
  onCloseImmersive,
  calibrateOpen,
  onCloseCalibrate,
  onCalibrationDone,
  footer,
}: {
  track: PlayerTrack | null;
  playing: boolean;
  prefs: Prefs;
  onUpdatePrefs: (patch: Partial<Prefs>) => void;
  haptics: HapticEngine;
  deviceSync: ReturnType<typeof useDeviceSync>;
  analyser: AnalyserNode | null;
  vibrationOn: boolean;
  onToggleVibration: () => void;
  nowPlayingOpen: boolean;
  onCloseNowPlaying: () => void;
  onOpenImmersive: () => void;
  onOpenPairing: () => void;
  onTestVibration: () => void;
  pairingOpen: boolean;
  onClosePairing: () => void;
  immersive: boolean;
  immersiveClosing: boolean;
  onCloseImmersive: () => void;
  calibrateOpen: boolean;
  onCloseCalibrate: () => void;
  onCalibrationDone: (result: CalibrationResult) => void;
  /* Доод баар — DOM-ийн дараалал (улмаар Tab-ийн дараалал) хэвээр байлгахын тулд
     Мэдрэх самбар ба Мэдрэх горимын ХООРОНД байрлана. */
  footer: ReactNode;
}) {
  const viz = prefs.viz || DEFAULT_VIZ;

  return (
    <>
      {/* дэлгэгддэг Мэдрэх самбар (Now-Playing) */}
      <NowPlayingPanel
        open={nowPlayingOpen && !!track}
        track={track}
        prefs={prefs}
        onToggleBand={(band) => onUpdatePrefs({ bands: { [band]: !prefs.bands[band] } })}
        vibro={vibrationOn}
        onToggleVibro={onToggleVibration}
        onImmersive={onOpenImmersive}
        onClose={onCloseNowPlaying}
        barsRef={haptics.feelBarsRef}
        deviceSync={deviceSync}
        canVibrate={haptics.canVibrate}
        onTestVibration={onTestVibration}
        onOpenPairing={onOpenPairing}
      />

      <PairingCard open={pairingOpen} onClose={onClosePairing} deviceSync={deviceSync} />

      {footer}

      {/* мэдрэх горим */}
      {immersive && track && (
        <ImmersiveMode
          track={track}
          onClose={onCloseImmersive}
          closing={immersiveClosing}
          barsRef={haptics.immersiveBarsRef}
          pulseRef={haptics.immersivePulseRef}
          flashRef={haptics.immersiveFlashRef}
          analyser={analyser}
          levelRef={haptics.levelRef}
          beatFlashRef={haptics.beatFlashRef}
          playing={playing}
          viz={viz}
          onUpdateViz={(patch) => onUpdatePrefs({ viz: { ...viz, ...patch } })}
        />
      )}

      {/* калибровк */}
      <Calibrate open={calibrateOpen} onClose={onCloseCalibrate} onDone={onCalibrationDone} />
    </>
  );
}
