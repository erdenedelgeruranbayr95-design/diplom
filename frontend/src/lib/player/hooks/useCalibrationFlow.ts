"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ToneGenerator, supportsVibration, vibrate } from "@/lib/audio/tone";
import type { CalibrationResult } from "@/types/player";

/* Мэдрэхүйн калибровкийн 4 алхамт урсгалын БҮХ төлөв ба дуу/чичиргээний гаралт.

   Урьд нь Calibrate.tsx-д UI-тай хольцолдож байсан: 5 useState, AudioContext-ийн
   амьдралын мөчлөг, oscillator-ийн 14 мөр (Player.tsx-д мөн ижлээр давхардсан),
   алхам тус бүрийн разметк бүгд нэг файлд. Одоо дуу гаргалт нь `ToneGenerator`-т,
   төлөв нь энд, харагдац нь components/player/calibrate/*-д. */

export interface BandSample {
  key: string;
  label: string;
  hz: string;
  freq: number;
  type: OscillatorType;
  dur: number;
  vib: number[];
}

export const BAND_SAMPLES: BandSample[] = [
  { key: "bass", label: "Бас", hz: "55 Hz", freq: 55, type: "sine", dur: 0.7, vib: [220] },
  { key: "mid", label: "Дунд", hz: "330 Hz", freq: 330, type: "triangle", dur: 0.45, vib: [60, 40, 60] },
  { key: "high", label: "Өндөр", hz: "1.8 kHz", freq: 1800, type: "square", dur: 0.3, vib: [15, 20, 15, 20, 15] },
];

/** Калибровкийн дуу нь туршилтын дохио тул тоглуулагчийн дуунаас арай чанга. */
const CALIBRATION_PEAK_GAIN = 0.5;

export interface CalibrationFlow {
  step: number;
  goToStep: (step: number) => void;
  vibrationChoice: number;
  lightChoice: number;
  selectedBands: Record<string, boolean>;
  /** Чичиргээг нэг ч удаа туршсан эсэх — эс бол хариултын товчнууд идэвхгүй. */
  tried: boolean;
  canVibrate: boolean;
  tryVibration: () => void;
  trySample: (sample: BandSample) => void;
  toggleBand: (key: string) => void;
  chooseVibration: (value: number) => void;
  chooseLight: (value: number) => void;
  result: CalibrationResult;
}

export function useCalibrationFlow(open: boolean): CalibrationFlow {
  const [step, setStep] = useState(0);
  const [vibrationChoice, setVibrationChoice] = useState(1);
  const [lightChoice, setLightChoice] = useState(1);
  const [selectedBands, setSelectedBands] = useState<Record<string, boolean>>({ bass: true, mid: true, high: true });
  const [tried, setTried] = useState(false);
  const toneRef = useRef(new ToneGenerator());

  const canVibrate = supportsVibration();

  useEffect(() => {
    if (open) {
      setStep(0);
      setTried(false);
      return;
    }
    toneRef.current.close();
  }, [open]);

  /* Компонент бүрмөсөн алга болоход AudioContext-ийг заавал чөлөөлнө. */
  const tone = toneRef.current;
  useEffect(() => () => tone.close(), [tone]);

  const tryVibration = useCallback(() => {
    setTried(true);
    vibrate([300]);
    toneRef.current.play(55, 0.8, "sine", CALIBRATION_PEAK_GAIN);
  }, []);

  const trySample = useCallback((sample: BandSample) => {
    toneRef.current.play(sample.freq, sample.dur, sample.type, CALIBRATION_PEAK_GAIN);
    vibrate(sample.vib);
  }, []);

  const toggleBand = useCallback((key: string) => {
    setSelectedBands((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (!next.bass && !next.mid && !next.high) return prev; // дор хаяж 1 бүс
      return next;
    });
  }, []);

  const chooseVibration = useCallback((value: number) => {
    setVibrationChoice(value);
    setStep(2);
  }, []);

  const chooseLight = useCallback((value: number) => {
    setLightChoice(value);
    setStep(3);
  }, []);

  return {
    step,
    goToStep: setStep,
    vibrationChoice,
    lightChoice,
    selectedBands,
    tried,
    canVibrate,
    tryVibration,
    trySample,
    toggleBand,
    chooseVibration,
    chooseLight,
    result: { vib: vibrationChoice, light: lightChoice, bands: selectedBands, calibrated: true },
  };
}
