"use client";

import { supportsVibration, vibrate } from "@/lib/audio/tone";
import type { HapticDevice } from "./HapticDevice";

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
    return supportsVibration();
  }

  disconnect(): void {
    this.stop();
  }

  isConnected(): boolean {
    return supportsVibration();
  }

  /** `durationMs` заавал заасан бол шууд тэр хугацаагаар (мс) чичиргээ өгнө —
   *  дуудагч тал (useHapticEngine) бас/дунд/өндөр бүсийн хугацааг өөрөө тооцоолдог
   *  тул энд дахин `strength`-ээр үржихгүй (dupliate scaling-ээс сэргийлнэ). */
  pulse(strength: number, durationMs?: number): void {
    if (durationMs !== undefined) {
      vibrate(Math.max(1, Math.round(durationMs)));
      return;
    }
    vibrate(Math.max(1, Math.round(60 * Math.max(0.1, strength))));
  }

  setBand(_zone: number, level: number): void {
    // Ганц моторт төхөөрөмж — бүсийн мэдээллийг үл тоомсорлож, түвшингээр л импульс өгнө.
    if (level > 0.05) this.pulse(level);
  }

  stop(): void {
    if (supportsVibration()) navigator.vibrate(0);
  }
}
