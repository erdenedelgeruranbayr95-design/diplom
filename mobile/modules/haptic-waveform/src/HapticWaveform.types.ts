export interface HapticWaveformModuleType {
  /** Төхөөрөмж амплитуд (0-255) удирдахыг дэмждэг эсэх. Дэмжихгүй бол чичиргээ
   *  зөвхөн on/off болно — апп үүнийг хэрэглэгчид мэдэгдэх боломжтой. */
  hasAmplitudeControl(): boolean;
  /** @param timings мс, [хүлээх, чичрэх, ...] · @param amplitudes 0-255, timings-тэй ижил уртай */
  vibrateWaveform(timings: number[], amplitudes: number[]): void;
  cancel(): void;
}
