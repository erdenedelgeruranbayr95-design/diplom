import { registerWebModule, NativeModule } from "expo";

import type { HapticWaveformModuleType } from "./HapticWaveform.types";

/* Вэб (Expo web / браузер) — Vibration API нь амплитуд ОГТ дэмждэггүй тул
   `amplitudes` үл тоомсорлогдож, зөвхөн `timings` хэв маягаар on/off чичирнэ.
   Энэ бол яг вэб хувилбарын одоогийн зан төлөв (frontend/src/lib/audio/tone.ts). */
class HapticWaveformModule extends NativeModule<{}> implements HapticWaveformModuleType {
  hasAmplitudeControl(): boolean {
    return false;
  }

  vibrateWaveform(timings: number[], amplitudes: number[]): void {
    if (typeof navigator === "undefined" || !navigator.vibrate) return;
    if (amplitudes.every((a) => a === 0)) {
      navigator.vibrate(0);
      return;
    }
    navigator.vibrate(timings);
  }

  cancel(): void {
    if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(0);
  }
}

export default registerWebModule(HapticWaveformModule, "HapticWaveformModule");
