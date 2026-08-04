"use client";

import { Capacitor, registerPlugin } from "@capacitor/core";
import { supportsVibration, vibrate } from "@/lib/audio/tone";
import type { HapticDevice } from "./HapticDevice";

/* Android native дотор (Capacitor) ажиллаж байвал Web Vibration API-ийн on/off
   хязгаараас давж, `VibrationEffect.createWaveform` (амплитуд 0-255) ашиглана —
   см. docs/CAPACITOR-ANDROID-SETUP.md §3 (HapticWaveformPlugin.java нь энэ
   plugin-ийн native тал, android/ platform нэмэгдсэний дараа бүртгэгдэнэ).
   Web (`Capacitor.isNativePlatform() === false`, өөрөөр хэлбэл ердийн browser)
   орчинд энэ plugin огт дуудагдахгүй, доорх navigator.vibrate() fallback ажиллана. */
interface HapticWaveformPlugin {
  vibrateWaveform(opts: { timings: number[]; amplitudes: number[] }): Promise<void>;
}
const HapticWaveform = registerPlugin<HapticWaveformPlugin>("HapticWaveform");

/* `navigator.vibrate` ороосон HapticDevice хэрэгжилт — энэ төхөөрөмжийн (өөрийн
   утас/таблет) чичиргээ. Нэг моторт тул `supportsMultiZone: false` — 8 бүсийн Score
   ирэхэд хамгийн идэвхтэй (хамгийн өндөр level-тэй) бүсийг сонгож ганц импульс болгоно
   (`setBand` дуудлага бүрийг шууд дуугаргахгүй, RAF loop 170мс interval-аар нэгтгэдэг
   хэвээр — useHapticEngine.ts-ийн одоо байгаа `vibTimer`-тэй ижил хэмнэл).

   Энэ файл нь ЗӨВХӨН `lib/audio/tone.ts`-ийн одоо байгаа функцуудыг HapticDevice
   интерфэйсийн ард нуух adapter — чичиргээний бодит логик (хугацаа/хүч тооцоолол)
   өөрчлөгдөөгүй, useHapticEngine-ийн одоо байгаа `vibrate(...)` дуудлагуудтай нийцтэй. */
export class PhoneDevice implements HapticDevice {
  readonly id = "phone";
  readonly label = "Энэ төхөөрөмж";
  readonly supportsMultiZone = false;

  async connect(): Promise<boolean> {
    if (Capacitor.isNativePlatform()) return true;
    return supportsVibration();
  }

  disconnect(): void {
    this.stop();
  }

  isConnected(): boolean {
    if (Capacitor.isNativePlatform()) return true;
    return supportsVibration();
  }

  /** `durationMs` заавал заасан бол шууд тэр хугацаагаар (мс) чичиргээ өгнө —
   *  дуудагч тал (useHapticEngine) бас/дунд/өндөр бүсийн хугацааг өөрөө тооцоолдог
   *  тул энд дахин `strength`-ээр үржихгүй (dupliate scaling-ээс сэргийлнэ). */
  pulse(strength: number, durationMs?: number): void {
    const ms = durationMs !== undefined ? Math.max(1, Math.round(durationMs)) : Math.max(1, Math.round(60 * Math.max(0.1, strength)));

    if (Capacitor.isNativePlatform()) {
      const amplitude = Math.round(Math.max(0, Math.min(1, strength)) * 255);
      HapticWaveform.vibrateWaveform({ timings: [0, ms], amplitudes: [0, amplitude] }).catch(() => {});
      return;
    }
    vibrate(ms);
  }

  setBand(_zone: number, level: number): void {
    // Ганц моторт төхөөрөмж — бүсийн мэдээллийг үл тоомсорлож, түвшингээр л импульс өгнө.
    if (level > 0.05) this.pulse(level);
  }

  stop(): void {
    if (Capacitor.isNativePlatform()) {
      HapticWaveform.vibrateWaveform({ timings: [0], amplitudes: [0] }).catch(() => {});
      return;
    }
    if (supportsVibration()) navigator.vibrate(0);
  }
}
