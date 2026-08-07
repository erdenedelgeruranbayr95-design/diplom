import { useEffect, useRef } from "react";

import { BeatScheduler } from "@/lib/audio/BeatScheduler";
import { DeviceRouter } from "@/lib/haptics/DeviceRouter";
import { VIB_LEVELS } from "@/lib/player/constants";

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

  useEffect(() => {
    if (!enabled || !playing || !vibrationOn) return;

    const scheduler = schedulerRef.current!;
    const router = routerRef.current!;

    const timer = setInterval(() => {
      if (!scheduler.hasTimestamps) return;
      const { fired } = scheduler.pollDetailed(getTimeRef.current());
      if (!fired) return;

      /* Вэб дээр энд FFT-ээс бас/дунд/өндөр бүсийн аль нь давамгайлж байгааг үзэж
         хугацааг ялгадаг. FFT байхгүй тул бүх цохилтыг нэг хэлбэрээр өгнө —
         `bandEnergies` (backend-ийн шинжилгээнд байдаг) ашиглан бүсчлэх нь
         дараагийн алхам. */
      const strength = VIB_LEVELS[vibLevelRef.current]?.mult ?? 1;
      router.pulse(Math.min(1, strength), Math.round(70 * strength));
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
