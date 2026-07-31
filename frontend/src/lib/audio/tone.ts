"use client";

/* Богино туршилтын дуу (oscillator + gain envelope) гаргах ганц хэрэгсэл.

   Урьд нь ЯГ ижил 14 мөр Player.tsx-ийн `playTone()` болон Calibrate.tsx-ийн `tone()`
   дотор хоёр удаа бичигдсэн байв (ялгаа нь зөвхөн оргил дуу чимээ: .45 vs .5). Хоёулаа
   өөрийн AudioContext-ийг залхуу үүсгэж, хаах үүргээ өөрсдөө хариуцдаг байсан. */

const DEFAULT_PEAK_GAIN = 0.45;

export class ToneGenerator {
  private ctx: AudioContext | null = null;

  /** Тодорхой давтамжийн богино дуу тоглуулна (эхний дуудалтад AudioContext үүснэ). */
  play(frequency: number, durationSec: number, type: OscillatorType, peakGain = DEFAULT_PEAK_GAIN): void {
    if (!this.ctx) this.ctx = new AudioContext();
    const ctx = this.ctx;
    if (ctx.state === "suspended") void ctx.resume();

    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(peakGain, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + durationSec);
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + durationSec + 0.05);
  }

  /** AudioContext-ийг чөлөөлнө — компонент unmount болоход заавал дуудна. */
  close(): void {
    if (!this.ctx) return;
    void this.ctx.close().catch(() => {});
    this.ctx = null;
  }
}

/** Чичиргээ дэмжигдэх эсэх — `navigator.vibrate` шалгалт олон газар давтагдаж байсан. */
export function supportsVibration(): boolean {
  return typeof navigator !== "undefined" && !!navigator.vibrate;
}

/** Чичиргээг аюулгүйгээр дуудна (зарим браузер хориглосон үед шидэлт өгдөг). */
export function vibrate(pattern: number | number[]): void {
  if (!supportsVibration()) return;
  try {
    navigator.vibrate(pattern);
  } catch {
    /* noop — чичиргээ бол нэмэлт мэдрэмж, алдаа нь тоглуулалтыг тасалж болохгүй */
  }
}
