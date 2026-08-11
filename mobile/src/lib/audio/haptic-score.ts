import { absoluteUrl } from "@/lib/config";

/* Haptic Score — Python worker (worker/worker/analysis.py) бэлдсэн, секундэд 60
   фрэйм бүхий спектрийн дараалал. Вэб хувилбар үүнийг аль хэдийн уншдаг
   (`frontend/src/lib/audio/haptic-score.ts`) — гар утасны апп ХЭРЭГЛЭДЭГГҮЙ байв.

   ЯАГААД ЭНЭ ЧУХАЛ ВЭ
   Урьд нь гар утсан дээр цохилт БОЛГОН яг ижил байсан: ижил амплитуд, ижил
   хугацаа. Тайван шүлэг ч, чанга найрал ч ялгаагүй, бөмбөр ч, таваг ч ялгаагүй.
   Тийм чичиргээ нь метроном шиг — хөгжим шиг биш. Score нь цохилт тус бүрийн
   БОДИТ эрчим ба өнгийг өгдөг тул чичиргээ хөгжмийн динамикийг дагана.

   RN-д Web Audio-ийн `AnalyserNode` байхгүй тул амьд FFT боломжгүй — гэвч энэ
   Score нь түүнээс ДЭЭР: серверт урьдчилан, бүтэн нарийвчлалтайгаар бодогдсон
   бөгөөд тоглуулах үед ямар ч тооцоолол шаардахгүй. */

interface ScoreFrame {
  /** 8 бүсийн эрчим, фрэйм доторх ХАМГИЙН ИХ нь 1.0 болж нормчлогдсон. */
  b: number[];
  o: number;
  beat: number;
  rms: number;
}

interface HapticScore {
  sampleRate: number;
  bandEdgesHz: number[];
  durationSec: number;
  frames: ScoreFrame[];
}

/** Цохилт бүрийн мэдрэхүйн параметр — Score-ыг задалсны дараа санах ойд ҮЛДЭХ
 *  цорын ганц зүйл (409 цохилт → ~3 KB; түүхий Score нь 2.6 MB байсан). */
export interface BeatDynamics {
  /** 0..1 — цохилтын хүч. Индекс нь `beatTimestamps`-ийнхтэй ижил. */
  intensity: Float32Array;
  /** 0..1 — 0 гүн бас, 1 өндөр давтамж (дугтуйн хэлбэр). */
  brightness: Float32Array;
}

/* ЯАГААД ТУХАЙН ДУУНЫ ДОТООД ХЭМЖЭЭСЭЭР НОРМЧЛОХ ВЭ

   Score-ийн `rms` нь `min(1, rms*4)` -ээр тайрагддаг. Бодитоор хэмжсэн (4 дуу):
   цохилтын rms-ийн p90 нь БҮХ дуунд 1.00, p10 нь 0.37–0.55 хооронд хэлбэлзэнэ.
   Өөрөөр хэлбэл орчин үеийн чанга mastering-тэй дуунууд дээд хязгаартаа
   наалдсан байдаг тул ҮНЭМЛЭХҮЙ утгаар нь авбал бүх цохилт 1.0 болж, динамик
   бүрэн алга болно.

   Иймд дуу бүрийн ӨӨРИЙНХ нь тархалтыг (p10 → p90) 0..1 руу сунгана. Ингэснээр
   тайван дуу ч, чанга дуу ч моторын бүтэн хүрээг ашиглана — хөгжимд «хүчтэй»
   гэдэг нь үргэлж ХАРЬЦАНГУЙ ойлголт. Тембрийн (`centroid`) хувьд ч ижил:
   p10 ≈ 0.13–0.17, p90 ≈ 0.27–0.39 гэсэн НАРИЙН мужид байдаг тул нормчлохгүй
   бол бүх цохилт «гүн» болж, ялгаа нь алга болно. */
const P_LOW = 0.1;
const P_HIGH = 0.9;

/** Хамгийн сул цохилт ч энэ түвшнээс доош унахгүй — бүрэн алга болбол хэрэглэгч
 *  «цохилт алгасагдлаа» гэж ойлгоно. */
const MIN_INTENSITY = 0.35;

/** Спектрийн төвийн цэг (spectral centroid) 0..1 — бүсийн индексээр жигнэсэн
 *  дундаж. Бага бол энерги нь доод бүсэд (бас), их бол дээд бүсэд (таваг). */
function centroid(bands: number[]): number {
  let weighted = 0;
  let total = 0;
  for (let i = 0; i < bands.length; i++) {
    weighted += bands[i] * i;
    total += bands[i];
  }
  if (total <= 0) return 0;
  return weighted / total / (bands.length - 1);
}

function percentile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0;
  return sorted[Math.min(sorted.length - 1, Math.max(0, Math.floor(p * (sorted.length - 1))))];
}

/** `[p10, p90]` мужийг `[0, 1]` руу сунгах функц үүсгэнэ. Муж хэт нарийн
 *  (бүх утга ойролцоо) бол дунджийг буцаана — 0-д хуваахаас сэргийлнэ. */
function normalizer(values: number[]): (v: number) => number {
  const sorted = [...values].sort((a, b) => a - b);
  const lo = percentile(sorted, P_LOW);
  const hi = percentile(sorted, P_HIGH);
  const span = hi - lo;
  if (span < 1e-6) return () => 0.5;
  return (v) => {
    const t = (v - lo) / span;
    return t < 0 ? 0 : t > 1 ? 1 : t;
  };
}

/** Score болон цохилтын хугацаанаас цохилт бүрийн параметрийг гаргана.
 *  Түүхий Score нь энэ дуудлагын дараа хэрэггүй болно. */
export function buildBeatDynamics(score: HapticScore, beatTimestamps: readonly number[]): BeatDynamics {
  const n = beatTimestamps.length;
  const rawRms: number[] = new Array(n);
  const rawCent: number[] = new Array(n);
  const lastFrame = score.frames.length - 1;

  for (let i = 0; i < n; i++) {
    const idx = Math.max(0, Math.min(lastFrame, Math.floor(beatTimestamps[i] * score.sampleRate)));
    const frame = score.frames[idx];
    rawRms[i] = frame?.rms ?? 0;
    rawCent[i] = frame ? centroid(frame.b) : 0;
  }

  const normRms = normalizer(rawRms);
  const normCent = normalizer(rawCent);

  const intensity = new Float32Array(n);
  const brightness = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    intensity[i] = MIN_INTENSITY + (1 - MIN_INTENSITY) * normRms(rawRms[i]);
    brightness[i] = normCent(rawCent[i]);
  }

  return { intensity, brightness };
}

/* Дуу бүрийн үр дүнг session дотор кэшлэнэ — дахин тоглуулахад 2.6 MB-ыг
   дахин татахгүй. Promise-ыг кэшлэсэн нь зэрэг хоёр дуудлага явахаас сэргийлнэ. */
const cache = new Map<string, Promise<BeatDynamics | null>>();

/** `scoreUrl`-аар Score-ыг татаж, цохилтын параметр болгоно.
 *
 *  ⚠️ Амжилтгүй бол `null` — АЛДАА ШИДЭХГҮЙ. Score байхгүй ч чичиргээ ажиллах
 *  ёстой (тогтмол дугтуйгаар). Энэ бол зөвхөн САЙЖРУУЛАЛТ, урьдчилсан нөхцөл биш.
 *
 *  ⚠️ Дуудах ЦАГ нь чухал: 2.6 MB JSON задлах нь JS урсгалыг хэдэн зуун мс
 *  түгжинэ. Дуу ТОГЛОЖ байх үед хийвэл цохилтын хэмнэл алдагдана. Иймд дуу
 *  ачаалагдмагц, тоглуулж эхлэхээс ӨМНӨ дуудна. */
export function loadBeatDynamics(
  scoreUrl: string,
  beatTimestamps: readonly number[],
): Promise<BeatDynamics | null> {
  const url = absoluteUrl(scoreUrl);
  if (!url || beatTimestamps.length === 0) return Promise.resolve(null);

  const cached = cache.get(url);
  if (cached) return cached;

  const promise = fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`Score татахад алдаа: ${res.status}`);
      return res.json() as Promise<HapticScore>;
    })
    .then((score) => {
      if (!score?.frames?.length) return null;
      return buildBeatDynamics(score, beatTimestamps);
    })
    .catch(() => null);

  cache.set(url, promise);
  return promise;
}

/** Тестэд болон санах ой чөлөөлөхөд. */
export function clearBeatDynamicsCache(): void {
  cache.clear();
}

/** Серверээс ирсэн цохилтын массивуудыг `BeatDynamics` болгоно.
 *
 *  ⚠️ ЭНЭ БОЛ ОДООГИЙН ҮНДСЭН ЗАМ. Урьд нь `loadBeatDynamics()`-ээр 2.6 MB Score
 *  татаж, утсан дээр бодож гаргадаг байсан — гэвч worker нь Score-оо өөрийн
 *  дискэнд бичдэг тул үүлэн дээрх backend түүнийг үйлчилж чаддаггүй (404).
 *  Одоо сервер урьдчилан бодоод DB-д хадгалдаг тул ердөө уншина.
 *
 *  Урт нь `beatTimestamps`-тай таарахгүй бол `null` — буруу индексээр цохилтын
 *  параметр авбал эрчим/өнгө нь өөр цохилтынх болж, санамсаргүй үр дүн өгнө. */
export function beatDynamicsFromSong(
  intensity: number[] | null | undefined,
  brightness: number[] | null | undefined,
  beatCount: number,
): BeatDynamics | null {
  if (!intensity?.length || !brightness?.length) return null;
  if (intensity.length !== beatCount || brightness.length !== beatCount) return null;
  return { intensity: Float32Array.from(intensity), brightness: Float32Array.from(brightness) };
}
