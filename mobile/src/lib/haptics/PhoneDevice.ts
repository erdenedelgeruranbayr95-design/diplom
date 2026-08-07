import { HapticWaveform } from "../../../modules/haptic-waveform";
import type { HapticDevice } from "./HapticDevice";

/* Вэбийн `frontend/src/lib/haptics/PhoneDevice.ts`-ийн RN хувилбар.

   Вэб дээр энэ класс нь Capacitor байгаа эсэхийг шалгаж, байхгүй бол
   `navigator.vibrate()` руу уначихдаг байсан. RN-д ТЭР САЛАА ХЭРЭГГҮЙ — апп үргэлж
   native орчинд ажиллана. Иймд шууд native модуль руу дуудна.

   `pulse()`-ийн тооцоолол (strength → amplitude, durationMs-ийн өгөгдмөл) нь вэб
   хувилбартай ЯГ ИЖИЛ — useHapticEngine-ийн дуудлагууд өөрчлөлтгүй ажиллана. */
export class PhoneDevice implements HapticDevice {
  readonly id = "phone";
  readonly label = "Энэ төхөөрөмж";
  readonly supportsMultiZone = false;

  /** Төхөөрөмж 0-255 амплитуд дэмждэг эсэх — дэмжихгүй бол зөвхөн on/off чичирнэ.
   *  UI үүнийг харуулж, хэрэглэгчид "таны утас эрчим ялгахгүй" гэж мэдэгдэнэ. */
  readonly hasAmplitudeControl: boolean = (() => {
    try {
      return HapticWaveform.hasAmplitudeControl();
    } catch {
      return false;
    }
  })();

  async connect(): Promise<boolean> {
    return true;
  }

  disconnect(): void {
    this.stop();
  }

  isConnected(): boolean {
    return true;
  }

  /** `durationMs` заавал заасан бол шууд тэр хугацаагаар чичиргээ өгнө — дуудагч тал
   *  (useHapticEngine) бүсийн хугацааг өөрөө тооцдог тул энд дахин strength-ээр
   *  үржихгүй (давхар масштаблахаас сэргийлнэ). */
  pulse(strength: number, durationMs?: number): void {
    const ms =
      durationMs !== undefined
        ? Math.max(1, Math.round(durationMs))
        : Math.max(1, Math.round(60 * Math.max(0.1, strength)));
    const amplitude = Math.round(Math.max(0, Math.min(1, strength)) * 255);

    try {
      HapticWaveform.vibrateWaveform([0, ms], [0, amplitude]);
    } catch {
      // Чичиргээгүй төхөөрөмж — дуугүй өнгөрөөнө (вэб хувилбартай ижил зан төлөв).
    }
  }

  setBand(_zone: number, level: number): void {
    // Ганц моторт төхөөрөмж — бүсийн мэдээллийг үл тоомсорлож, түвшингээр л импульс өгнө.
    if (level > 0.05) this.pulse(level);
  }

  stop(): void {
    try {
      HapticWaveform.cancel();
    } catch {
      // no-op
    }
  }
}
