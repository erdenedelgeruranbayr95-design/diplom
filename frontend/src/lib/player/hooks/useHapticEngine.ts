"use client";

import { useEffect, useRef } from "react";
import { BeatScheduler } from "@/lib/audio/beat-scheduler";
import { supportsVibration, vibrate } from "@/lib/audio/tone";
import { LIGHT_LEVELS, VIB_LEVELS } from "@/lib/player/constants";
import type { useDeviceSync } from "@/lib/socket/useDeviceSync";
import type { BandLevels, Prefs } from "@/types/player";
import type { BeatFlash } from "@/lib/player/visualizer-modes";
import type { ListeningStats } from "@/types/track";
import type { AudioAnalyserBundle } from "./useAudioPlayback";

/* Мэдрэхүйн хөдөлгүүр — спектрээс гэрэл (RAF) ба чичиргээ (interval) гаргана.

   ⚠️ Энэ апп-д амьд (audio-reactive) UI элемент нэмэх НЭГ Л ЗӨВ ХЭВ МАЯГ байдаг:
   шинэ `AudioContext`/`AnalyserNode` БҮҮ үүсгэ. Энд ганц RAF loop байдаг бөгөөд тэр нь
   `analyserRef`-ээс спектр уншаад, доорх ref массивуудын DOM элемент бүрийн
   `style.height`-ийг ШУУД бичдэг (React re-render хийхгүй — гүйцэтгэлийн шалтгаанаар).

   Шинэ амьд элемент нэмэх алхам:
     1. энд шинэ ref массив зарлаж, `HapticEngine`-д буцаах
     2. `if (analyser && playing)` салбарт спектрийг багануудад хуваарилах блок нэмэх;
        `else` салбарт анхны өндөрт нь буцаах
     3. компонентод prop-оор дамжуулж `ref={(el) => { arr.current[i] = el; }}`-ээр холбох
     4. CSS `transition-[height] duration-[90ms] ease-linear` + `motion-reduce:transition-none` */

export interface HapticEngine {
  /* --- DOM-д холбогдох амьд ref-үүд --- */
  /** Дэлгэцийн ард байх том гэрлийн пульс (Player-ийн дэвсгэр). */
  pulseRef: React.MutableRefObject<HTMLDivElement | null>;
  /** TopBar-ийн 5 багана. */
  vizRef: React.MutableRefObject<(HTMLElement | null)[]>;
  /** Мэдрэх горимын 28 багана. */
  immersiveBarsRef: React.MutableRefObject<(HTMLElement | null)[]>;
  immersivePulseRef: React.MutableRefObject<HTMLSpanElement | null>;
  immersiveFlashRef: React.MutableRefObject<HTMLSpanElement | null>;
  /** Мэдрэх самбарын амьд 8 багана. */
  feelBarsRef: React.MutableRefObject<(HTMLSpanElement | null)[]>;
  /** Дэлгэрэнгүй хуудасны "Signal" картын багана. */
  signalBarsRef: React.MutableRefObject<(HTMLSpanElement | null)[]>;

  /* --- Визуалайзерт дамждаг агшин зуурын утгууд --- */
  levelRef: React.MutableRefObject<BandLevels>;
  beatFlashRef: React.MutableRefObject<BeatFlash | null>;

  /** Тухайн дууны beatTimestamps-ийг оноох (шинэ дуу эхлэхэд). */
  setBeatTimestamps: (timestamps: number[] | null | undefined) => void;
  /** Энэ төхөөрөмж чичиргээ дэмжих эсэх. */
  canVibrate: boolean;
}

export interface HapticEngineOptions {
  enabled: boolean;
  playing: boolean;
  /** Чичиргээний ерөнхий шилжүүлэгч (доод баарны товч). */
  vibrationOn: boolean;
  prefs: Prefs;
  analyserRef: React.MutableRefObject<AudioAnalyserBundle | null>;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  statsRef: React.MutableRefObject<ListeningStats | null>;
  deviceSync: ReturnType<typeof useDeviceSync>;
}

/** Спектрийн муж (start..end)-ийн дундаж түвшинг 0..1 хооронд буцаана. */
function averageBand(data: Uint8Array, start: number, end: number): number {
  let sum = 0;
  for (let i = start; i < end; i++) sum += data[i];
  return sum / (end - start) / 255;
}

/** Спектрийг `count` ширхэг тэнцүү бүлэгт хувааж, i дэх бүлгийн дунджийг өгнө. */
function bandAverageAt(data: Uint8Array, index: number, count: number, spectrumSpan: number): number {
  const start = Math.floor((index / count) * spectrumSpan);
  const end = Math.max(start + 1, Math.floor(((index + 1) / count) * spectrumSpan));
  return averageBand(data, start, end);
}

export function useHapticEngine({
  enabled,
  playing,
  vibrationOn,
  prefs,
  analyserRef,
  audioRef,
  statsRef,
  deviceSync,
}: HapticEngineOptions): HapticEngine {
  const pulseRef = useRef<HTMLDivElement | null>(null);
  const vizRef = useRef<(HTMLElement | null)[]>([]);
  const immersiveBarsRef = useRef<(HTMLElement | null)[]>([]);
  const immersivePulseRef = useRef<HTMLSpanElement | null>(null);
  const immersiveFlashRef = useRef<HTMLSpanElement | null>(null);
  const feelBarsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const signalBarsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const levelRef = useRef<BandLevels>({ lo: 0, mi: 0, hi: 0 });
  const beatFlashRef = useRef<BeatFlash | null>(null);
  const beatSchedulerRef = useRef(new BeatScheduler());

  const canVibrate = supportsVibration();

  /* Хувьсамтгай утгуудыг ref-ээр авна — RAF loop болон 170мс interval нь
     `playing`/`vibro`/`enabled` гурваас өөр шалтгаанаар ДАХИН эхлэх ёсгүй.
     (`useDeviceSync()` нь render бүрд шинэ объект буцаадаг тул түүнийг dependency
     болговол loop секундэд хэдэн удаа тасарч, чичиргээний хэмнэл зөрнө.) */
  const prefsRef = useRef(prefs);
  prefsRef.current = prefs;
  const deviceSyncRef = useRef(deviceSync);
  deviceSyncRef.current = deviceSync;

  useEffect(() => {
    if (!enabled) return;
    let raf: number;

    const loop = () => {
      raf = requestAnimationFrame(loop);
      /* Таб нуугдсан үед FFT уншиж, DOM style бичих нь утгагүй — хэрэглэгч юу ч
         харахгүй атлаа CPU/батарей зарцуулагдана. Браузер RAF-ийг ихэвчлэн
         удаашруулдаг ч баталгаагүй (2-р дэлгэц, аудио тоглож байх үед үргэлжлэх нь бий).
         `visibilityState`-ээр шууд таслах нь найдвартай. Чичиргээ/аудио нь өөр
         interval дээр тул тоглуулалт тасрахгүй. */
      if (document.visibilityState === "hidden") return;

      const analyser = analyserRef.current;
      const p = prefsRef.current;
      const lightMult = LIGHT_LEVELS[p.light].mult;

      if (analyser && playing) {
        analyser.an.getByteFrequencyData(analyser.data);
        const data = analyser.data;
        const n = data.length;
        const loEnd = Math.floor(n * 0.08);
        const midEnd = Math.floor(n * 0.38);

        const lo = averageBand(data, 0, loEnd);
        const mi = averageBand(data, loEnd, midEnd);
        const hi = averageBand(data, midEnd, n);
        levelRef.current = { lo, mi, hi };

        const level = Math.max(p.bands.bass ? lo : 0, p.bands.mid ? mi : 0, p.bands.high ? hi : 0);

        if (pulseRef.current) {
          pulseRef.current.style.opacity = Math.min(1, (0.1 + level * 0.7) * lightMult).toFixed(3);
          pulseRef.current.style.transform = "translate(-50%,-50%) scale(" + (1 + level * 0.5 * lightMult).toFixed(3) + ")";
        }

        vizRef.current.forEach((el, idx) => {
          if (!el) return;
          const v = data[Math.floor((idx / vizRef.current.length) * n * 0.7)] / 255;
          el.style.height = Math.max(3, v * 22) + "px";
        });

        immersiveBarsRef.current.forEach((el, idx) => {
          if (!el) return;
          const v = data[Math.floor((idx / immersiveBarsRef.current.length) * n * 0.72)] / 255;
          el.style.height = Math.max(2, v * 100 * Math.min(1.2, lightMult)) + "%";
        });

        if (immersivePulseRef.current) {
          immersivePulseRef.current.style.transform = "scale(" + (1 + level * 0.9 * lightMult).toFixed(3) + ")";
          immersivePulseRef.current.style.opacity = Math.min(1, 0.25 + level * 0.85 * lightMult).toFixed(3);
        }
        if (immersiveFlashRef.current) {
          /* цохилт (хүчтэй бас) дээр богино flash */
          immersiveFlashRef.current.style.opacity = lo > 0.5 ? Math.min(0.55, (lo - 0.5) * 1.8 * lightMult).toFixed(3) : "0";
        }

        /* Мэдрэх самбар ба Дэлгэрэнгүйн "Signal" карт — ижил спектр дунджилалт,
           зөвхөн багана тоо болон хамгийн бага өндөр нь ялгаатай. */
        const span = n * 0.72;
        feelBarsRef.current.forEach((el, idx) => {
          if (!el) return;
          el.style.height = Math.max(5, bandAverageAt(data, idx, feelBarsRef.current.length, span) * 100) + "%";
        });
        signalBarsRef.current.forEach((el, idx) => {
          if (!el) return;
          el.style.height = Math.max(6, bandAverageAt(data, idx, signalBarsRef.current.length, span) * 100) + "%";
        });
      } else {
        vizRef.current.forEach((el) => {
          if (el) el.style.height = "3px";
        });
        if (immersiveFlashRef.current) immersiveFlashRef.current.style.opacity = "0";
        feelBarsRef.current.forEach((el) => {
          if (el) el.style.height = "5px";
        });
        signalBarsRef.current.forEach((el) => {
          if (el) el.style.height = "6px";
        });
      }
    };
    loop();

    /* Локал чичиргээ (canVibrate) болон QR-аар холбогдсон утас руу beat event илгээх (deviceSync)
       хоёулаа энэ ижил 170мс интервалд явна — тусдаа шинэ interval үүсгэхгүй. */
    const vibTimer = setInterval(() => {
      if (!playing || !vibrationOn) return;
      const p = prefsRef.current;
      const strength = VIB_LEVELS[p.vib].mult;
      const sync = deviceSyncRef.current;
      const qrConnected = sync.isConnected;

      /* songId-тэй (backend Song, beatTimestamps-тай) дуу бол timestamp-driven scheduler,
         эс бол одоогийн level-threshold логик — аль ч тохиолдолд {band, level} ижил payload. */
      const scheduler = beatSchedulerRef.current;
      if (scheduler.hasTimestamps && audioRef.current) {
        const crossed = scheduler.poll(audioRef.current.currentTime);
        if (crossed) {
          const { lo, mi, hi } = levelRef.current;
          const band = lo >= mi && lo >= hi ? "bass" : mi >= hi ? "mid" : "high";
          const level = band === "bass" ? lo : band === "mid" ? mi : hi;
          beatFlashRef.current = { band, level, at: performance.now() };
          if (canVibrate) {
            if (band === "bass") vibrate(Math.round((60 + level * 80) * strength));
            else if (band === "mid") vibrate([Math.round(30 * strength), 30, Math.round(30 * strength)]);
            else vibrate(Math.max(8, Math.round(12 * strength)));
          }
          if (qrConnected) sync.emitBeat({ band, level });
          if (statsRef.current) statsRef.current.vib++;
        }
        return;
      }

      const { lo, mi, hi } = levelRef.current;
      let fired = false;
      if (p.bands.bass && lo > 0.45) {
        beatFlashRef.current = { band: "bass", level: lo, at: performance.now() };
        if (canVibrate) vibrate(Math.round((60 + lo * 80) * strength));
        if (qrConnected) sync.emitBeat({ band: "bass", level: lo });
        fired = true;
      } else if (p.bands.mid && mi > 0.35) {
        beatFlashRef.current = { band: "mid", level: mi, at: performance.now() };
        if (canVibrate) vibrate([Math.round(30 * strength), 30, Math.round(30 * strength)]);
        if (qrConnected) sync.emitBeat({ band: "mid", level: mi });
        fired = true;
      } else if (p.bands.high && hi > 0.3) {
        beatFlashRef.current = { band: "high", level: hi, at: performance.now() };
        if (canVibrate) vibrate(Math.max(8, Math.round(12 * strength)));
        if (qrConnected) sync.emitBeat({ band: "high", level: hi });
        fired = true;
      }
      if (fired && statsRef.current) statsRef.current.vib++;
    }, 170);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(vibTimer);
      if (canVibrate) navigator.vibrate(0);
    };
    // analyserRef/audioRef/statsRef нь тогтвортой ref объектууд тул dependency болох шаардлагагүй
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, playing, vibrationOn, canVibrate]);

  return {
    pulseRef,
    vizRef,
    immersiveBarsRef,
    immersivePulseRef,
    immersiveFlashRef,
    feelBarsRef,
    signalBarsRef,
    levelRef,
    beatFlashRef,
    setBeatTimestamps: (timestamps) => beatSchedulerRef.current.setTrack(timestamps),
    canVibrate,
  };
}
