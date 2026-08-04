"use client";

import { useEffect, useRef, useState } from "react";
import { BeatScheduler } from "@/lib/audio/beat-scheduler";
import { supportsVibration, vibrate } from "@/lib/audio/tone";
import { frameIndexAt } from "@/lib/audio/haptic-score";
import { DeviceRouter } from "@/lib/haptics/DeviceRouter";
import { LIGHT_LEVELS, VIB_LEVELS } from "@/lib/player/constants";
import type { useDeviceSync } from "@/lib/socket/useDeviceSync";
import type { BandLevels, Prefs } from "@/types/player";
import type { BeatFlash } from "@/lib/player/visualizer-modes";
import type { ListeningStats } from "@/types/track";
import type { HapticScore } from "@/types/song";
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
  /** Haptic Score байвал (worker-ийн бэлдсэн) — 8 утгатай массив, 0..1 normalize,
   *  тухайн фрэймд харгалзах. Score байхгүй бол хоосон массив (fallback горимд UI
   *  3-бүсийн `levelRef`-ийг ашиглана, энэ ref-ийг үл тоомсорлоно). */
  bandLevelsRef: React.MutableRefObject<number[]>;
  /** Одоо Score-ээр удирдагдаж байгаа эсэх — UI (жишээ DevicesView) 8-бүсийн preview
   *  харуулах эсэхээ шийдэхэд ашиглана. */
  hasHapticScore: boolean;

  /** Тухайн дууны beatTimestamps-ийг оноох (шинэ дуу эхлэхэд). */
  setBeatTimestamps: (timestamps: number[] | null | undefined) => void;
  /** Тухайн дууны Haptic Score-ийг оноох (worker бэлдсэн бол) — байхгүй бол `null`
   *  дамжуулж 3-бүсийн realtime fallback руу шилжинэ. */
  setHapticScore: (score: HapticScore | null) => void;
  /** Энэ төхөөрөмж чичиргээ дэмжих эсэх. */
  canVibrate: boolean;
  /** Холбогдсон HapticDevice-уудыг удирдах (register/unregister/connected) —
   *  DevicesView-ийн "Холбох"/"Тест" товчнууд үүгээр дамжина. */
  deviceRouter: DeviceRouter;
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
  const bandLevelsRef = useRef<number[]>([]);
  const hapticScoreRef = useRef<HapticScore | null>(null);
  const [hasHapticScore, setHasHapticScore] = useState(false);
  const deviceRouterRef = useRef<DeviceRouter | null>(null);
  if (!deviceRouterRef.current) deviceRouterRef.current = new DeviceRouter();

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
      /* iOS Safari `navigator.vibrate` дэмждэггүй (canVibrate=false) тул чичиргээ
         суваг бүрэн алга болно — дэлгэцийн визуал (гэрлийн пульс) цорын ганц мэдрэх
         суваг үлддэг тул илт тод харагдуулна (§Үе шат 4 "iOS-д визуал сувгийг
         хүчтэй болгох"). Бусад платформд энгийн lightMult хэвээр. */
      const lightMult = LIGHT_LEVELS[p.light].mult * (canVibrate ? 1 : 1.6);

      /* Haptic Score байвал (worker бэлдсэн 8-бүс) — currentTime-аар frame индекслэж
         `bandLevelsRef`-г шинэчилнэ. Энэ бол ЗӨВХӨН 8-бүсийн preview UI (жишээ
         DevicesView)-д ашиглагдана, доорх 3-бүсийн realtime FFT логикийг орлохгүй
         (тэр нь бодит амьд визуал/чичиргээнд хэвээр ажиллана — Score-ийн 60fps frame
         resolution нь RAF-тай ойролцоо ч яг synchronized биш тул хараахан орлуулаагүй). */
      const score = hapticScoreRef.current;
      if (score && playing && audioRef.current) {
        const idx = frameIndexAt(score, audioRef.current.currentTime);
        bandLevelsRef.current = score.frames[idx].b;
      }

      /* Timestamp-driven beat (songId-тэй, analyze хийгдсэн дуу) — ROADMAP-ийн DoD
         "beat → чичиргээ хоцролт < 40мс" шаардлагыг хангахын тулд RAF loop дотор Л
         шалгана (~16.7мс тутам, browser throttle-гүй). Өмнө нь тусдаа setInterval(25)
         дотор байсан ч, event loop дээр RAF-тай өрсөлдөж бодит дуудагдах хоцролт нь
         25мс-ээс хамаагүй том (хэмжсэн: дундаж ~60-80мс, зарим үед 200мс) болж байсныг
         browser дотор туршиж олж, RAF loop руу нүүлгэв. */
      if (playing && vibrationOn) {
        const scheduler = beatSchedulerRef.current;
        if (scheduler.hasTimestamps && audioRef.current) {
          const { fired: crossed, crossedAt } = scheduler.pollDetailed(audioRef.current.currentTime);
          if (crossed) {
            if (
              crossedAt !== undefined &&
              typeof window !== "undefined" &&
              (window as unknown as { __LATENCY_DEBUG?: boolean }).__LATENCY_DEBUG
            ) {
              const latencyMs = (audioRef.current.currentTime - crossedAt) * 1000;
              console.log("LATENCY_DEBUG", JSON.stringify({ latencyMs: Math.round(latencyMs * 100) / 100 }));
            }
            const bp = prefsRef.current;
            const bStrength = VIB_LEVELS[bp.vib].mult;
            const bSync = deviceSyncRef.current;
            const { lo: blo, mi: bmi, hi: bhi } = levelRef.current;
            const band = blo >= bmi && blo >= bhi ? "bass" : bmi >= bhi ? "mid" : "high";
            const level = band === "bass" ? blo : band === "mid" ? bmi : bhi;
            beatFlashRef.current = { band, level, at: performance.now() };
            if (canVibrate) {
              if (band === "bass") deviceRouterRef.current!.pulse(bStrength, Math.round((60 + level * 80) * bStrength));
              else if (band === "mid") vibrate([Math.round(30 * bStrength), 30, Math.round(30 * bStrength)]);
              else deviceRouterRef.current!.pulse(bStrength, Math.max(8, Math.round(12 * bStrength)));
            }
            /* 8-бүсийн Score байвал олон моторт төхөөрөмж (BLE хантааз) бүс тус
               бүрийг тусад нь мэдрүүлнэ — tonotopic мэдрэмж (§Үе шат 4 DoD). */
            if (bandLevelsRef.current.length > 0) {
              bandLevelsRef.current.forEach((lvl, zone) => deviceRouterRef.current!.setBand(zone, lvl));
            }
            /* QR-аар холбогдсон утас руу — Score байвал бүх 8 бүсийн payload,
               эс бол хуучин 3-бүсийн {band,level} (mobile page-ийн fallback хэвээр). */
            if (bSync.isConnected) bSync.emitBeat({ band, level, bands: bandLevelsRef.current.length > 0 ? bandLevelsRef.current : undefined });
            if (statsRef.current) statsRef.current.vib++;
          }
        }
      }

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

    /* Level-threshold fallback (beatTimestamps байхгүй, static demo track) — өмнөх
       170мс cooldown зан төлөв ХЭВЭЭР (threshold-ийн дараагийн шатах хоорондын зай
       товчилвол дуу нэг л bass цохилтод олон удаа чичирнэ — өмнөх найдвартай
       харьцаа энд өөрчлөгдөөгүй). */
    const vibTimer = setInterval(() => {
      if (!playing || !vibrationOn) return;
      const scheduler = beatSchedulerRef.current;
      if (scheduler.hasTimestamps) return; // timestamp-driven салбар RAF loop дотор аль хэдийн шатсан

      const p = prefsRef.current;
      const strength = VIB_LEVELS[p.vib].mult;
      const sync = deviceSyncRef.current;
      const qrConnected = sync.isConnected;

      const { lo, mi, hi } = levelRef.current;
      let fired = false;
      if (p.bands.bass && lo > 0.45) {
        beatFlashRef.current = { band: "bass", level: lo, at: performance.now() };
        if (canVibrate) deviceRouterRef.current!.pulse(strength, Math.round((60 + lo * 80) * strength));
        if (qrConnected) sync.emitBeat({ band: "bass", level: lo });
        fired = true;
      } else if (p.bands.mid && mi > 0.35) {
        beatFlashRef.current = { band: "mid", level: mi, at: performance.now() };
        if (canVibrate) vibrate([Math.round(30 * strength), 30, Math.round(30 * strength)]);
        if (qrConnected) sync.emitBeat({ band: "mid", level: mi });
        fired = true;
      } else if (p.bands.high && hi > 0.3) {
        beatFlashRef.current = { band: "high", level: hi, at: performance.now() };
        if (canVibrate) deviceRouterRef.current!.pulse(strength, Math.max(8, Math.round(12 * strength)));
        if (qrConnected) sync.emitBeat({ band: "high", level: hi });
        fired = true;
      }
      if (fired && statsRef.current) statsRef.current.vib++;
    }, 170);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(vibTimer);
      deviceRouterRef.current?.stop();
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
    bandLevelsRef,
    hasHapticScore,
    setBeatTimestamps: (timestamps) => beatSchedulerRef.current.setTrack(timestamps),
    setHapticScore: (score) => {
      hapticScoreRef.current = score;
      bandLevelsRef.current = score ? new Array(score.bandEdgesHz.length - 1).fill(0) : [];
      setHasHapticScore(!!score);
    },
    canVibrate,
    deviceRouter: deviceRouterRef.current,
  };
}
