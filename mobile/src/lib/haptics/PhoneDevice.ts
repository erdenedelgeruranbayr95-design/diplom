import { HapticWaveform } from "../../../modules/haptic-waveform";
import type { HapticPattern } from "./beat-pattern";
import type { HapticDevice } from "./HapticDevice";

/* ⚠️ `expo-haptics`-ыг ДЭЭД ТҮВШИНД import ХИЙХГҮЙ.

   Энэ нь native модуль. Development build нь JavaScript-ээ Metro-гоос авдаг тул
   JS дотор шинэ native хамаарал нэмэхэд APK-гийн native тал ХОЦОРНО. Тэр үед
   зүгээр import хийхэд л:
       TypeError: Cannot read property 'EventEmitter' of undefined
   гэж уначихдаг — апп огт нээгдэхгүй. (Бодитоор тохиолдсон.)

   Иймд аюулгүй, залхуу ачаална: байхгүй бол `null`, дуудагч тал шалгана. */
type HapticsModule = {
  impactAsync(style: unknown): Promise<void>;
  ImpactFeedbackStyle: { Light: unknown; Medium: unknown; Heavy: unknown };
};

let hapticsChecked = false;
let hapticsModule: HapticsModule | null = null;

function getHaptics(): HapticsModule | null {
  if (hapticsChecked) return hapticsModule;
  hapticsChecked = true;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mod = require("expo-haptics") as HapticsModule | undefined;
    hapticsModule = mod && typeof mod.impactAsync === "function" ? mod : null;
  } catch {
    hapticsModule = null;
  }
  return hapticsModule;
}

/* Утасны чичиргээ — ХОЁР дэд хувилбартай.

   1. AMPLITUDE (бидний build хийсэн апп)
      Өөрсдийн бичсэн native модуль (`HapticWaveform`) нь Android-ийн
      `VibrationEffect.createWaveform`-оор амплитуд 0-255 өгнө. Энэ бол уг
      дипломын гол чадвар — эрчмийн 256 түвшин.

   2. PRESET (Expo Go, эсвэл модульгүй орчин)
      Expo Go бол БЭЛЭН апп тул бидний native модулийг агуулдаггүй. Тэр үед
      `expo-haptics` (стандарт Expo модуль) руу шилжинэ — Light/Medium/Heavy
      гэсэн 3 БЭЛЭН түвшин. 256 биш ч, эрчим ялгаатай гэдгийг үзүүлж чадна.

   ⚠️ Урьд нь модулийг `requireNativeModule`-ээр авдаг байсан тул Expo Go дотор
   импортын агшинд алдаа шидэж, АПП ОГТ НЭЭГДЭХГҮЙ байв. Одоо optional. */

/** Тухайн орчинд аль суваг ажиллаж байгаа — UI үүнийг хэрэглэгчид хэлнэ.
 *
 *  · amplitude — native модуль + утас амплитуд дэмжинэ → эрчмийн 256 түвшин
 *  · waveform  — native модуль БАЙГАА ч утас амплитуд дэмжихгүй. Чичиргээ
 *                АЖИЛЛАНА (Android амплитудыг үл тоомсорлож өгөгдмөл хүчээр),
 *                зөвхөн эрчмийн ялгаа алдагдана. Хугацааны ялгаа хэвээр.
 *  · preset    — модуль байхгүй, `expo-haptics`-ийн 3 бэлэн түвшин
 *  · none      — чичиргээний ямар ч суваг байхгүй
 */
export type HapticBackend = "amplitude" | "waveform" | "preset" | "none";

export class PhoneDevice implements HapticDevice {
  readonly id = "phone";
  readonly label = "Энэ төхөөрөмж";
  readonly supportsMultiZone = false;

  /** Аль суваг ашиглагдаж байгаа. */
  /** Яагаад тухайн суваг сонгогдсоныг ТОДОРХОЙ хэлнэ — оношилгоонд шаардлагатай.
   *  Урьд нь "амплитуд ажиллахгүй" гэдгийг л мэдэж байсан ч ШАЛТГААН нь
   *  (модуль байхгүй юу, эсвэл утас дэмжихгүй юу) мэдэгдэхгүй байв. */
  readonly reason: string = "";

  readonly backend: HapticBackend = (() => {
    /* ⚠️ Модуль БАЙГАА бол түүнийг хэрэглэнэ — `hasAmplitudeControl()` худал
       байсан ч. Android нь амплитудыг үл тоомсорлож өгөгдмөл хүчээр чичирнэ,
       гэхдээ ХУГАЦААНЫ ялгаа хэвээр үлдэнэ (Сул 60мс · Дунд 90 · Хүчтэй 130).
       Урьд нь энэ тохиолдолд `expo-haptics` руу шилждэг байсан бөгөөд тэр нь
       APK-д байхгүй үед чичиргээ БҮРЭН УНТАРДАГ байв. */
    if (HapticWaveform) {
      try {
        if (HapticWaveform.hasAmplitudeControl()) {
          (this as { reason: string }).reason = "утас амплитуд дэмжинэ";
          return "amplitude";
        }
        (this as { reason: string }).reason = "утасны мотор амплитуд дэмжихгүй — зөвхөн хугацаагаар ялгарна";
        return "waveform";
      } catch (e) {
        (this as { reason: string }).reason = `модулийн алдаа: ${e instanceof Error ? e.message : String(e)}`;
        return "waveform"; // дуудлага нь ажиллаж магадгүй
      }
    }
    if (getHaptics()) {
      (this as { reason: string }).reason = "native модуль алга (Expo Go?) — expo-haptics ашиглаж байна";
      return "preset";
    }
    (this as { reason: string }).reason = "native модуль ч, expo-haptics ч алга";
    return "none";
  })();

  /** Эрчмийн 256 түвшин боломжтой эсэх (UI-д харуулна). */
  readonly hasAmplitudeControl: boolean = this.backend === "amplitude";

  async connect(): Promise<boolean> {
    return true;
  }

  disconnect(): void {
    this.stop();
  }

  isConnected(): boolean {
    return true;
  }

  /** `durationMs` заасан бол тэр хугацаагаар — дуудагч тал (useHapticEngine)
   *  хугацааг өөрөө тооцдог тул энд дахин strength-ээр үржихгүй. */
  pulse(strength: number, durationMs?: number): void {
    const ms =
      durationMs !== undefined
        ? Math.max(1, Math.round(durationMs))
        : Math.max(1, Math.round(60 * Math.max(0.1, strength)));
    const clamped = Math.max(0, Math.min(1, strength));

    if (HapticWaveform) {
      try {
        HapticWaveform.vibrateWaveform([0, ms], [0, Math.round(clamped * 255)]);
        return;
      } catch {
        // Доорх preset руу уначина.
      }
    }

    /* `expo-haptics` нь хугацаа хүлээж авдаггүй — эрчмийг л сонгоно. Тиймээс
       богино/урт цохилтын ялгаа энд алдагдана (Android-ийн давуу тал). */
    const h = getHaptics();
    if (!h) return; // чичиргээний ямар ч суваг байхгүй

    /* Босго: 0.35 → Light · 0.7 → Medium · 1.0 → Heavy. Нүүр дэлгэцийн туршилтын
       товчнууд (0.2 · 0.55 · 1.0) болон калибровкийн бүсүүд (1 · 0.65 · 0.35)
       гурван өөр түвшинд тусна.

       ⚠️ Цохилтын чичиргээ энэ замаар ЯВАХГҮЙ — тэр нь `pulsePattern`-аар
       дугтуйн заасан түвшнээр шууд очно. Оргилоос таамаглах нь тэнд ажилладаггүй
       (Дунд 0.95, Хүчтэй 1.0 — хэт ойрхон). */
    const style =
      clamped >= 0.85
        ? h.ImpactFeedbackStyle.Heavy
        : clamped >= 0.5
          ? h.ImpactFeedbackStyle.Medium
          : h.ImpactFeedbackStyle.Light;
    h.impactAsync(style).catch(() => {});
  }

  /** Дугтуйтай импульс — цохилтын хурц эхлэл ба аажим унтралт.
   *
   *  Энэ бол `amplitude` сувгийн ГОЛ давуу тал: `VibrationEffect.createWaveform`
   *  нь алхам бүрд өөр амплитуд өгч чаддаг тул бөмбөрийн цохилтын хэлбэрийг
   *  ойролцоолж болно. `expo-haptics` сувагт ийм зүйл БОЛОМЖГҮЙ — тэнд зөвхөн
   *  оргил хүчээр нь нэг бэлэн импульс өгнө. */
  pulsePattern(pattern: HapticPattern): void {
    if (HapticWaveform) {
      try {
        /* ⚠️ Мотор амплитуд дэмжихгүй бол Android амплитудын массивыг ҮЛ
           ТООМСОРЛОЖ бүх алхмыг ижил хүчээр гаргадаг. Тийм үед дугтуйн `timings`
           нь зөвхөн өнгө/түвшнээс хамаардаг тул эрчмийн ялгаа бүрэн алга болж,
           бүх цохилт ижил мэдрэгддэг байв. Иймд эрчмийг УРТААР илэрхийлсэн
           хувилбарыг өгнө — амплитудгүй ч гэсэн «намуухан үед богино, хүчтэй үед
           урт» гэсэн ялгаа хадгалагдана. */
        if (this.backend === "amplitude") {
          HapticWaveform.vibrateWaveform(pattern.timings, pattern.amplitudes);
        } else {
          const timings = [0, ...pattern.timingOnly];
          /* Хугацааны хэв маягт эхний элемент нь хүлээх зай, дараа нь чичрэх/завсар
             ээлжилнэ. Амплитудыг 255 (чичрэх) / 0 (завсар) гэж өгнө — дэмжигдэхгүй
             үед хэрхэн ч байсан үл тоомсорлогдоно, дэмжигдвэл бүтэн хүчээр. */
          const amplitudes = timings.map((_, idx) => (idx === 0 || idx % 2 === 0 ? 0 : 255));
          HapticWaveform.vibrateWaveform(timings, amplitudes);
        }
        return;
      } catch {
        // Доорх preset руу уначина.
      }
    }

    /* ⚠️ `patternPeak`-ээр БУС, дугтуйн өөрийнх нь заасан түвшнээр. Оргилоос
       таамаглавал Дунд (0.95) ба Хүчтэй (1.0) хоёул Heavy болж, preset сувагт
       гурван түвшин ХОЁР болж хураагддаг байв. */
    const h = getHaptics();
    if (!h) return;
    const style =
      pattern.presetStyle === "heavy"
        ? h.ImpactFeedbackStyle.Heavy
        : pattern.presetStyle === "medium"
          ? h.ImpactFeedbackStyle.Medium
          : h.ImpactFeedbackStyle.Light;
    h.impactAsync(style).catch(() => {});
  }

  setBand(_zone: number, level: number): void {
    // Ганц моторт төхөөрөмж — бүсийн мэдээллийг үл тоомсорлож, түвшингээр л импульс өгнө.
    if (level > 0.05) this.pulse(level);
  }

  stop(): void {
    try {
      HapticWaveform?.cancel();
    } catch {
      // `expo-haptics`-д зогсоох ойлголт байхгүй — импульс нь агшин зуурынх.
    }
  }
}
