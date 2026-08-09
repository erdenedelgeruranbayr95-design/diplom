import { useEffect, useRef } from "react";

import { BeatScheduler } from "@/lib/audio/BeatScheduler";
import { DeviceRouter } from "@/lib/haptics/DeviceRouter";
import { BEAT_PULSE } from "@/lib/player/constants";

/* Мэдрэхүйн хөдөлгүүрийн RN хувилбар.

   ⚠️ ВЭБТЭЙ ХАРЬЦУУЛСАН ГОЛ ЯЛГАА
   Вэбийн `useHapticEngine` хоёр замтай:
     1. `beatTimestamps`-аар (backend-ийн шинжилгээ) — цохилт бүрт яг таг
     2. Web Audio `AnalyserNode`-ийн FFT-ээр бодит цагийн спектр (fallback)

   RN-д 2-р зам БОЛОМЖГҮЙ — `expo-audio` нь спектр (FFT) өгдөггүй, AnalyserNode
   гэж зүйл байхгүй. Тиймээс энэ хувилбар ЗӨВХӨН timestamp-driven замыг хэрэгжүүлнэ.

   Энэ нь алдагдал биш: вэбийн кодын тайлбарт ч timestamp-driven зам нь илүү нарийн
   (хоцролт <40мс) гэж бичсэн, FFT нь зөвхөн шинжилгээгүй демо дуунд зориулсан
   fallback байсан. Харин үүнээс үүдэн `analysisStatus !== "READY"` дуунууд
   гар утсан дээр чичиргээгүй тоглоно — UI үүнийг хэрэглэгчид ХЭЛЭХ ёстой.

   Мөн вэбийн бүх `*Ref` (DOM элементийн style шууд бичдэг визуалайзер) энд байхгүй —
   RN-д DOM байхгүй. Визуал нь тусад нь Reanimated/SVG-ээр хийгдэнэ. */

/** Тоглуулагчийн одоогийн байрлалыг секундээр өгдөг функц. `expo-audio`-ийн
 *  `player.currentTime` нь хамгийн сүүлийн утгыг өгдөг тул шууд дамжуулна. */
export type CurrentTimeGetter = () => number;

export interface HapticEngineOptions {
  /** Хөдөлгүүр ажиллах эсэх (дэлгэц идэвхтэй үед л). */
  enabled: boolean;
  playing: boolean;
  /** Чичиргээний ерөнхий шилжүүлэгч (хэрэглэгчийн товч). */
  vibrationOn: boolean;
  /** Чичиргээний хүчний түвшин — `VIB_LEVELS`-ийн индекс (0/1/2). */
  vibLevel: number;
  getCurrentTime: CurrentTimeGetter;
  /** Цохилт бүрт дуудагдана — визуал пульс үүнээс хөтлөгдөнө.
   *
   *  Чичиргээ болон визуал НЭГ эх сурвалжаас (BeatScheduler) хөтлөгдөх нь зориуд:
   *  сонсголгүй хэрэглэгч цохилтыг зэрэг ХАРЖ, МЭДЭРНЭ. Хоёр тусдаа таймер
   *  ашиглавал хэдэн арван мс зөрж, мэдрэхүйн хоёр суваг сална. */
  onBeat?: () => void;
}

export interface HapticEngine {
  /** Шинэ дуу эхлэхэд цохилтын хугацаануудыг оноох. */
  setBeatTimestamps: (timestamps: number[] | null | undefined) => void;
  /** Seek хийсний дараа cursor-ийг тохируулах. */
  resetCursor: () => void;
  /** Энэ дуу цохилтын өгөгдөлтэй эсэх — UI "чичиргээгүй" анхааруулга харуулахад. */
  hasTimestamps: () => boolean;
  deviceRouter: DeviceRouter;
}

/* Цохилт шалгах давтамж. Вэб дээр энэ нь `requestAnimationFrame` (~16.7мс) дотор
   байсан — RN-д RAF байдаг ч JS thread дээр ажилладаг тул `setInterval` нь илүү
   тогтвортой, бас батарей хэмнэнэ. 16мс нь DoD-ийн "<40мс хоцролт"-д багтана. */
const POLL_MS = 16;

export function useHapticEngine({
  enabled,
  playing,
  vibrationOn,
  vibLevel,
  getCurrentTime,
  onBeat,
}: HapticEngineOptions): HapticEngine {
  const schedulerRef = useRef<BeatScheduler | null>(null);
  if (!schedulerRef.current) schedulerRef.current = new BeatScheduler();

  const routerRef = useRef<DeviceRouter | null>(null);
  if (!routerRef.current) routerRef.current = new DeviceRouter();

  /* Байнга өөрчлөгддөг утгуудыг ref-ээр авна — interval нь `vibLevel` солигдох бүрд
     ДАХИН эхлэх ёсгүй (цохилтын хэмнэл тасарна). Вэб хувилбарын `prefsRef`-тэй ижил. */
  const vibLevelRef = useRef(vibLevel);
  vibLevelRef.current = vibLevel;
  const getTimeRef = useRef(getCurrentTime);
  getTimeRef.current = getCurrentTime;
  const onBeatRef = useRef(onBeat);
  onBeatRef.current = onBeat;

  /* ⚠️ `vibrationOn` нь ЧИЧИРГЭЭГ л удирддаг, визуалыг БИШ. Хэрэглэгч чичиргээг
     унтраасан ч дэлгэцийн пульс ажиллах ёстой — сонсголгүй хүнд визуал нь бие
     даасан мэдрэхүйн суваг. Иймд loop нь `playing` дээр л ажиллаж, дотроо
     чичиргээг нөхцөлтэйгээр өгнө. */
  useEffect(() => {
    if (!enabled || !playing) return;

    const scheduler = schedulerRef.current!;
    const router = routerRef.current!;

    const timer = setInterval(() => {
      if (!scheduler.hasTimestamps) return;
      const { fired } = scheduler.pollDetailed(getTimeRef.current());
      if (!fired) return;

      // Визуал нь чичиргээнээс ҮЛ ХАМААРЧ үргэлж ажиллана.
      onBeatRef.current?.();

      if (!vibrationOn) return;

      /* Вэб дээр энд FFT-ээс бас/дунд/өндөр бүсийн аль нь давамгайлж байгааг үзэж
         хугацааг ялгадаг. FFT байхгүй тул бүх цохилтыг нэг хэлбэрээр өгнө.

         Параметрийг `BEAT_PULSE`-ээс ШУУД авна (тооцоолохгүй) — тайлбарыг
         constants.ts-ээс үзнэ үү. */
      const p = BEAT_PULSE[vibLevelRef.current] ?? BEAT_PULSE[1];
      router.pulse(p.amplitude, p.durationMs);
    }, POLL_MS);

    return () => {
      clearInterval(timer);
      router.stop();
    };
  }, [enabled, playing, vibrationOn]);

  return {
    setBeatTimestamps: (timestamps) => schedulerRef.current!.setTrack(timestamps),
    resetCursor: () => schedulerRef.current!.reset(),
    hasTimestamps: () => schedulerRef.current!.hasTimestamps,
    deviceRouter: routerRef.current!,
  };
}
