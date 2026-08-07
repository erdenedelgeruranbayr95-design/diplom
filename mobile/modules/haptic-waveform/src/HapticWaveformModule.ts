import { NativeModule, requireNativeModule } from "expo";

import type { HapticWaveformModuleType } from "./HapticWaveform.types";

declare class HapticWaveformModule extends NativeModule<{}> implements HapticWaveformModuleType {
  hasAmplitudeControl(): boolean;
  vibrateWaveform(timings: number[], amplitudes: number[]): void;
  cancel(): void;
}

export default requireNativeModule<HapticWaveformModule>("HapticWaveform");
