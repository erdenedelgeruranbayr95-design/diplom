import { NativeModule, requireOptionalNativeModule } from "expo";

import type { HapticWaveformModuleType } from "./HapticWaveform.types";

declare class HapticWaveformModule extends NativeModule<{}> implements HapticWaveformModuleType {
  hasAmplitudeControl(): boolean;
  vibrateWaveform(timings: number[], amplitudes: number[]): void;
  cancel(): void;
}

/* ⚠️ `requireNativeModule` БИШ, `requireOptionalNativeModule`.

   Эхнийх нь модуль олдохгүй үед ИМПОРТЫН АГШИНД алдаа шиддэг. Энэ модуль нь
   зөвхөн бидний өөрсдийн build хийсэн апп дотор байдаг тул **Expo Go** дотор
   (iPhone дээр үнэгүй туршихад) байхгүй — тэр үед импортын гинж тасарч
   АПП ОГТ НЭЭГДЭХГҮЙ болно.

   Optional хувилбар нь байхгүй үед `null` буцаана. Дуудагч тал
   (`PhoneDevice`) `null` эсэхийг шалгаж `expo-haptics` руу шилжинэ. */
export default requireOptionalNativeModule<HapticWaveformModule>("HapticWaveform");
