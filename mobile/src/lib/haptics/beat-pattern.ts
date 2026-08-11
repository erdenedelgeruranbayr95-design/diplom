/* Цохилтын чичиргээний ДУГТУЙ (envelope).

   ЯАГААД ХЭРЭГТЭЙ ВЭ
   Урьд нь цохилт бүр ТЭГШ ӨНЦӨГТ импульс байв: 90мс турш амплитуд 179 тогтмол,
   дараа нь шууд 0. Мотор тийм дохиог «ззз» гэсэн ЖИГД ЧИЧИРГЭЭ болгож гаргадаг —
   хөгжмийн цохилт огт тийм биш. Бодит бөмбөр цохих үед:

       эрчим ▲
             │▐▖
             │▐▝▖▖
             │▐  ▝▀▄▄▖▁▁▁
             └──────────────▶ хугацаа
             хурц цохилт  →  аажим унтрах

   Тэр хэлбэрийг «attack–decay» гэдэг. Арьсны механик рецептор (Pacinian corpuscle)
   нь ТОГТМОЛ түвшинд хурдан дасдаг ч ГЭНЭТИЙН ӨӨРЧЛӨЛТӨД маш мэдрэг. Иймд ижил
   энерги зарцуулсан ч уналттай дугтуй нь тэгш өнцөгтөөс хамаагүй тод «цохилт»
   мэт мэдрэгдэнэ.

   Android-ийн `VibrationEffect.createWaveform` нь ийм алхамт дугтуйг шууд
   дэмждэг — native тал ӨӨРЧЛӨХ ШААРДЛАГАГҮЙ, зөвхөн дамжуулах массиваа
   өөрчилнө. (Одоогийн APK-г дахин build хийхгүйгээр ажиллана.) */

/** `expo-haptics`-ийн 3 бэлэн түвшин — дугтуй дэмждэггүй сувагт үүнийг л өгнө. */
export type PresetStyle = "light" | "medium" | "heavy";

export interface HapticPattern {
  /** [хүлээх, чичрэх, ...] мс — Android-ийн waveform журам. */
  timings: number[];
  /** Тус бүрийн амплитуд 0–255, `timings`-тэй ИЖИЛ уртай. */
  amplitudes: number[];
  /** Preset сувагт ямар түвшин болж хураагдах.
   *
   *  ⚠️ ЯАГААД ОРГИЛООС ТААМАГЛАЖ БОЛОХГҮЙ ВЭ
   *  Дугтуйн оргилууд нь 0.65 · 0.95 · 1.0 — Дунд ба Хүчтэй хоёрын хооронд
   *  ердөө 0.05 зөрүү. Ямар ч босго тэднийг найдвартай салгаж чадахгүй тул
   *  хоёул Heavy болж, preset сувагт (Expo Go, iOS) «гурван түвшин» гэсэн
   *  санаа ХОЁР болж сүйддэг. Иймд түвшнийг таамаглахгүй, ШУУД дамжуулна. */
  presetStyle: PresetStyle;
}

/* Мотор бүрэн эргэлдэж амжих доод хугацаа. Үүнээс богино алхам нь физикээр
   гарч чадахгүй — дугтуй нь ялгаагүй болно. */
const MIN_STEP_MS = 8;

/* Мэдрэгдэх доод амплитуд. Ихэнх утасны мотор ~40/255-аас доош огт мэдрэгддэггүй
   тул түүнээс сул алхмыг үргэлжлүүлэх нь дэмий — тэр хэсэгт дугтуйг таслана. */
const MIN_AMP = 45;

/* Дугтуйн хоёр туйл. Хооронд нь `brightness`-ээр шугаман шилжинэ.

   ГҮН (brightness = 0) — бөмбөр/бас: урт, олон алхамтай, удаан унана.
   ХУРЦ (brightness = 1) — таваг/hi-hat: маш богино, хоёр алхам, огцом тасарна.

   Утгууд нь дууны цохилтын дундаж зайд (120 BPM → 500мс) багтах ёстой: хамгийн
   урт нь 110мс тул хамгийн хурдан (200 BPM → 300мс) дуунд ч давхцахгүй. */
const DEEP = { totalMs: 120, steps: 5, decay: 0.84 };
const SHARP = { totalMs: 26, steps: 2, decay: 0.34 };

/** Хэрэглэгчийн «чичиргээний хүч» түвшний нөлөө. */
export interface LevelShape {
  /** Оргил амплитудын үржигч 0..1. */
  peak: number;
  /** Дугтуй дэмждэггүй сувагт энэ түвшин ямар бэлэн импульс болох. */
  preset: PresetStyle;
  /** Дугтуйн УРТЫН үржигч.
   *
   *  ⚠️ Яагаад зөвхөн амплитудаар зогсохгүй вэ: уналттай дугтуй нь тэгш өнцөгт
   *  импульстэй ижил оргилтой ч НИЙТ энерги нь бага (уналтын доорх талбай
   *  бага). Урьдын «Хүчтэй» нь 130мс турш 255 тогтмол байсан тул зөвхөн
   *  хэлбэрийг сольвол мэдэгдэхүйц СУЛАРЧ мэдрэгдэнэ. Иймд хүчтэй түвшинд
   *  дугтуйг сунгаж, энергийг ойролцоо түвшинд барина. */
  body: number;
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Цохилтын чичиргээний хэв маягийг үүсгэнэ.
 *
 *  @param intensity  0..1 — тухайн цохилтын хүч (дууны бодит эрчмээс).
 *  @param brightness 0..1 — 0 гүн бас, 1 өндөр давтамж. Дугтуйн ХЭЛБЭРийг заана.
 *  @param level      хэрэглэгчийн сонгосон түвшний оргил/урт.
 */
export function beatPattern(intensity: number, brightness: number, level: LevelShape): HapticPattern {
  const b = clamp01(brightness);
  const peak = clamp01(intensity) * clamp01(level.peak);

  const steps = Math.round(lerp(DEEP.steps, SHARP.steps, b));
  const totalMs = lerp(DEEP.totalMs, SHARP.totalMs, b) * Math.max(0.1, level.body);
  const decay = lerp(DEEP.decay, SHARP.decay, b);
  const stepMs = Math.max(MIN_STEP_MS, Math.round(totalMs / steps));

  /* Эхний элемент нь ХҮЛЭЭХ хугацаа (0мс) — Android-ийн waveform журам. */
  const timings = [0];
  const amplitudes = [0];

  /* `envelope` нь дугтуйн одоогийн түвшин — алхам бүрд `decay`-ээр буурна.
     (Нэрийг `level` гэж болохгүй: `level` бол хэрэглэгчийн түвшний параметр.) */
  let envelope = peak;
  for (let i = 0; i < steps; i++) {
    const raw = Math.round(envelope * 255);
    /* Эхний алхам нь ҮРГЭЛЖ мэдрэгдэх ёстой: цохилт бүрэн алга болвол хэрэглэгч
       «чичиргээ ажиллахгүй байна» гэж ойлгоно. Харин ДАРААХ алхмууд мэдрэгдэх
       босгоос доош унавал таслана — тэр нь дугтуйн байгалийн төгсгөл. */
    const amp = i === 0 ? Math.max(raw, MIN_AMP) : raw;
    if (amp < MIN_AMP) break;
    timings.push(stepMs);
    amplitudes.push(Math.min(255, amp));
    envelope *= decay;
  }

  return { timings, amplitudes, presetStyle: level.preset };
}

/** Хэв маягийн нийт үргэлжлэх хугацаа — оношилгоо/тестэд. */
export function patternDurationMs(p: HapticPattern): number {
  return p.timings.reduce((sum, t) => sum + t, 0);
}

/** Хэв маягийн оргил амплитуд 0..1 — дугтуй дэмждэггүй сувагт (expo-haptics)
 *  ганц импульс болгож хураахад. */
export function patternPeak(p: HapticPattern): number {
  return Math.max(0, ...p.amplitudes) / 255;
}
