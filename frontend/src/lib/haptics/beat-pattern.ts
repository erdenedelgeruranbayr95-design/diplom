/* Цохилтын чичиргээний хэв маяг — эрчим ба өнгөнөөс.

   ЯАГААД ХОЁР ӨӨР ГАРАЛТ ХЭРЭГТЭЙ ВЭ
   Мэдрэхүйн гаралт хоёр төрлийн сувагтай, тэдгээр нь ӨӨР зүйл удирддаг:

     1. АМПЛИТУД дэмждэг (Android `VibrationEffect.createWaveform`, Capacitor
        дотор) — хүчийг 0–255 түвшнээр шууд өгнө. Хамгийн үнэн.

     2. ЗӨВХӨН ON/OFF (браузерын `navigator.vibrate`, мөн амплитуд дэмждэггүй
        Android мотор) — хүчний ойлголт ОГТ БАЙХГҮЙ. `vibrate(50)` ба
        `vibrate(10)` хоёр ижил хүчтэй, зөвхөн урт нь өөр.

   ⚠️ ХОЁР ДАХЬ ТОХИОЛДЛЫГ АМПЛИТУДААС ХӨРВҮҮЛЖ БОЛОХГҮЙ. Хэрэв амплитудын
   дугтуйг зүгээр л on/off болгож хаявал бүх цохилт ижил урттай болж, эрчмийн
   ялгаа БҮРЭН алга болно — «нэг хэмнэлээр л явна» гэж мэдрэгдэх яг тэр шалтгаан.
   Иймд энэ тохиолдолд эрчмийг ХУГАЦААНД шингээнэ: хүчтэй цохилт урт, сул нь
   богино. Арьс үргэлжлэх хугацааг эрчим гэж тайлбарладаг (Pacinian рецептор
   удаан өдөөлтийг «хүчтэй» гэж кодлодог) тул энэ нь бодит мэдрэмж өгнө. */

/** Хэрэглэгчийн «чичиргээний хүч» түвшний хэлбэр. */
export interface LevelShape {
  /** Оргил амплитудын үржигч 0..1 (амплитудат суваг). */
  peak: number;
  /** Дугтуйн УРТЫН үржигч (хоёулаа суваг). */
  body: number;
}

export interface HapticWaveform {
  /** [хүлээх, чичрэх, ...] мс — Android waveform журам. */
  timings: number[];
  /** Тус бүрийн амплитуд 0–255, `timings`-тэй ижил уртай. */
  amplitudes: number[];
}

/* Мотор бүрэн эргэлдэж амжих доод хугацаа. */
const MIN_STEP_MS = 8;
/* Ихэнх утасны мотор ~45/255-аас доош огт мэдрэгддэггүй. */
const MIN_AMP = 45;

/* Дугтуйн хоёр туйл — `brightness`-ээр шугаман шилжинэ.
   ГҮН (0) бөмбөр/бас: урт, олон алхам, удаан унана.
   ХУРЦ (1) таваг/hi-hat: маш богино, огцом тасарна. */
const DEEP = { totalMs: 120, steps: 5, decay: 0.84 };
const SHARP = { totalMs: 26, steps: 2, decay: 0.34 };

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Амплитуд дэмждэг сувагт — attack–decay дугтуй.
 *
 *  @param intensity  0..1 тухайн цохилтын бодит хүч (дууны анализаас)
 *  @param brightness 0..1 — 0 гүн бас, 1 өндөр давтамж
 *  @param level      хэрэглэгчийн сонгосон түвшин
 *  @param accent     0..1 — цохилт = 1 (тулгуур), онсет < 1 (чимэглэл)
 */
export function beatWaveform(intensity: number, brightness: number, level: LevelShape, accent = 1): HapticWaveform {
  const b = clamp01(brightness);
  const a = clamp01(accent);
  const peak = clamp01(intensity) * clamp01(level.peak) * a;

  const steps = Math.round(lerp(DEEP.steps, SHARP.steps, b));
  const totalMs = lerp(DEEP.totalMs, SHARP.totalMs, b) * Math.max(0.1, level.body) * (0.55 + 0.45 * a);
  const decay = lerp(DEEP.decay, SHARP.decay, b);
  const stepMs = Math.max(MIN_STEP_MS, Math.round(totalMs / steps));

  const timings = [0];
  const amplitudes = [0];

  let envelope = peak;
  for (let i = 0; i < steps; i++) {
    const raw = Math.round(envelope * 255);
    /* Эхний алхам ҮРГЭЛЖ мэдрэгдэнэ — эс бөгөөс сул цохилт бүрмөсөн алга болж
       «чичиргээ ажиллахгүй» мэт санагдана. Дараах алхмууд босгоос доош унавал
       таслана — тэр нь дугтуйн байгалийн төгсгөл. */
    const amp = i === 0 ? Math.max(raw, MIN_AMP) : raw;
    if (amp < MIN_AMP) break;
    timings.push(stepMs);
    amplitudes.push(Math.min(255, amp));
    envelope *= decay;
  }

  return { timings, amplitudes };
}

/* Хугацаагаар кодлох сувгийн хязгаарууд.

   ДООД: 12мс-ээс богино импульсийг ихэнх мотор эргэлдэж ч амжихгүй — мэдрэгдэхгүй.
   ДЭЭД: 130мс-ээс урт нь 120 BPM (цохилт хооронд 500мс) дуунд ч «сунжирсан»
   мэдрэгдэж, дараагийн цохилттой нийлж эхэлнэ. */
const WEB_MIN_MS = 12;
const WEB_MAX_MS = 130;

/** Амплитудгүй сувагт (браузер, эсвэл амплитуд дэмждэггүй мотор) — эрчмийг
 *  ХУГАЦААГААР илэрхийлсэн `navigator.vibrate` хэв маяг.
 *
 *  Гаралт нь [чичрэх] эсвэл [чичрэх, завсар, чичрэх] — сүүлийнх нь зөвхөн маш
 *  хүчтэй, ГҮН цохилтод. Давхар цохилт нь ганц уртаас илүү «хүнд» мэдрэгддэг
 *  (мотор дахин хурдасах үед арьс шинэ өдөөлт гэж мэдэрдэг) тул дээд хязгаарт
 *  хүрсэн хойно ч хүчийг үргэлжлүүлэн илэрхийлэх боломж өгнө. */
export function beatTimingPattern(intensity: number, brightness: number, level: LevelShape, accent = 1): number[] {
  const i = clamp01(intensity);
  const b = clamp01(brightness);
  const a = clamp01(accent);

  /* Суурь урт нь ӨНГӨӨӨС — гүн цохилт урт, хурц нь богино. Дараа нь ЭРЧМЭЭР
     үржинэ: энэ бол «намуухан үед намуухан, хүчтэй үед хүчтэй» гэдгийн гол. */
  const base = lerp(WEB_MAX_MS, 26, b);
  /* Эрчмийг 0.35..1 мужаас 0.25..1 болгож сунгана — анализын хамгийн сул цохилт
     ч 0.35 байдаг тул шууд үржүүлбэл хамгийн сул ба хамгийн хүчтэйн зөрүү
     ердөө 3 дахин байна. Сунгаснаар ялгаа тод мэдрэгдэнэ. */
  const stretched = clamp01((i - 0.3) / 0.7) * 0.75 + 0.25;
  const ms = Math.round(base * stretched * Math.max(0.1, level.body) * (0.55 + 0.45 * a));
  const clamped = Math.max(WEB_MIN_MS, Math.min(WEB_MAX_MS, ms));

  /* Маш хүчтэй, гүн цохилт — давхар импульсээр нэмэлт «жин» өгнө. */
  if (i > 0.82 && b < 0.4 && a > 0.9) {
    return [clamped, 28, Math.max(WEB_MIN_MS, Math.round(clamped * 0.45))];
  }
  return [clamped];
}

/** Хэв маягийн нийт үргэлжлэх хугацаа — оношилгоо/тестэд. */
export function waveformDurationMs(w: HapticWaveform): number {
  return w.timings.reduce((sum, t) => sum + t, 0);
}
