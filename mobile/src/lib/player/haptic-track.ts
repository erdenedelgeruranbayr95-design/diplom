/* Цохилт + онсетыг НЭГ мэдрэхүйн замд нэгтгэнэ.

   ЯАГААД ХЭРЭГТЭЙ ВЭ
   Зөвхөн цохилтоор чичрүүлэхэд метроном шиг мэдрэгддэг: секундэд ердөө 1.6–2.5
   удаа, бүгд ижил зайтай. Хөгжмийн бодит бүтэц — аялгууны нот, гитарын цохилт,
   дуучны үг — бүгд алдагдана.

   Онсет (аливаа шинэ авиа эхлэх мөч) нь цохилтоос 3–6 дахин олон бөгөөд яг тэр
   бүтцийг дагадаг. Түүнийг нэмснээр «нэг хэмнэл» биш, хөгжим өөрөө мэдрэгдэж
   эхэлнэ.

   ⚠️ ГЭХДЭЭ ШҮҮЛТГҮЙГЭЭР БОЛОХГҮЙ
   Бодит дуун дээр хэмжсэн: онсет секундэд 4.5–12, хоорондын зай 35мс хүртэл
   богино. Арьс 50мс-ээс ойрхон хоёр цохилтыг НЭГ тасралтгүй чичиргээ гэж
   мэдэрдэг (хүрэлцэхүйн ялгах хязгаар), мотор ч эргэлдэж амжихгүй. Шүүлтгүй бол
   үр дүн нь «ззз» — одоогийн байдлаас ч дор.

   ⚠️ ЯАГААД СЕРВЕРТ БИШ, ЭНД ШҮҮДЭГ ВЭ
   Тогтмолуудыг тааруулах нь мэдрэхүйн туршилт шаарддаг. Энд шүүвэл APK дахин
   угсрахад л хангалттай; серверт шүүсэн бол 30 дууг дахин шинжлэх шаардлагатай
   болно. */

/** Онсет цохилтод хэр ойр байвал ТУСДАА үйл гэж тооцохгүй вэ.
 *  Ижил цохилтын давхар илрэлт байх магадлалтай — хоёуланг тоглуулбал
 *  эхнийхийг нь таслаад чанга «давхар цохилт» гарна. */
const ONSET_GUARD_MS = 90;

/** Дараалсан хоёр үйлийн хамгийн бага зай. Хэмжсэн 90/100мс тохиргоо нь
 *  секундэд 4.5–7.2 үйл өгсөн — цохилтоос 3–4 дахин олон боловч бүх зай
 *  хүрэлцэхүйн ялгах хязгаараас (~50мс) хангалттай дээгүүр. */
const MIN_GAP_MS = 100;

/** Онсетын хүчний үржигч.
 *
 *  ⚠️ ЭНЭ 1 БАЙЖ БОЛОХГҮЙ. Онсет цохилттой ижил хүчтэй байвал хэмнэлийн
 *  тулгуур алга болж, бүхэлдээ жигд шуугиан болно — засах гэж байгаа яг тэр
 *  асуудал буцаж ирнэ. Цохилт нь тулгуур, онсет нь чимэглэл байх ёстой. */
const ONSET_ACCENT = 0.55;

export interface HapticTrack {
  /** Секундээр, өсөх дарааллаар. */
  times: number[];
  intensity: Float32Array;
  brightness: Float32Array;
  /** `true` = цохилт (хүчтэй), `false` = онсет (хөнгөн). */
  isBeat: boolean[];
  /** Оношилгоо/UI-д: хэдэн онсет үлдсэн. */
  onsetCount: number;
}

interface Source {
  times: number[] | null | undefined;
  intensity: number[] | null | undefined;
  brightness: number[] | null | undefined;
}

/** Массивын урт таарахгүй бол өгөгдөл найдваргүй — индексээр авбал өөр цохилтын
 *  параметр оногдоно. Тийм үед параметргүй (өгөгдмөл) гэж үзнэ. */
function usable(src: Source): boolean {
  const n = src.times?.length ?? 0;
  return n > 0 && src.intensity?.length === n && src.brightness?.length === n;
}

/** Цохилт ба онсетыг нэгтгэж, зайн шаардлагаар шүүнэ.
 *
 *  Цохилт нь ҮРГЭЛЖ үлдэнэ — тэр бол хэмнэлийн тулгуур. Онсет нь зөвхөн
 *  цохилтоос хангалттай хол, өмнөх үйлээс хангалттай хол байвал нэмэгдэнэ. */
export function buildHapticTrack(
  beats: Source,
  onsets: Source,
  defaultBrightness: number,
): HapticTrack | null {
  const beatTimes = beats.times ?? [];
  if (beatTimes.length === 0) return null;

  const beatDyn = usable(beats);
  const onsetDyn = usable(onsets);
  const onsetTimes = onsetDyn ? (onsets.times as number[]) : [];

  const guard = ONSET_GUARD_MS / 1000;
  const minGap = MIN_GAP_MS / 1000;

  const times: number[] = [];
  const intensity: number[] = [];
  const brightness: number[] = [];
  const isBeat: boolean[] = [];

  let bi = 0; // цохилтын заагч
  let oi = 0; // онсетын заагч
  let last = -Infinity;
  let onsetCount = 0;

  const pushBeat = (i: number) => {
    times.push(beatTimes[i]);
    intensity.push(beatDyn ? (beats.intensity as number[])[i] : 1);
    brightness.push(beatDyn ? (beats.brightness as number[])[i] : defaultBrightness);
    isBeat.push(true);
    last = beatTimes[i];
  };

  /* Нэгтгэх гүйлт — хоёр массив хоёулаа эрэмбэлэгдсэн тул нэг дамжилтаар. */
  while (bi < beatTimes.length || oi < onsetTimes.length) {
    const nextBeat = bi < beatTimes.length ? beatTimes[bi] : Infinity;
    const nextOnset = oi < onsetTimes.length ? onsetTimes[oi] : Infinity;

    if (nextBeat <= nextOnset) {
      pushBeat(bi);
      bi++;
      continue;
    }

    /* Онсет: хамгийн ойрын цохилтоос хол эсэхийг шалгана. `bi` нь энэ онсетоос
       ХОЙШХИ эхний цохилтыг заана, `bi-1` нь өмнөхийг — хоёуланг харна. */
    const prevBeat = bi > 0 ? beatTimes[bi - 1] : -Infinity;
    const nearBeat = Math.min(Math.abs(nextOnset - prevBeat), Math.abs(nextBeat - nextOnset));

    if (nearBeat >= guard && nextOnset - last >= minGap) {
      times.push(nextOnset);
      intensity.push((onsets.intensity as number[])[oi]);
      brightness.push((onsets.brightness as number[])[oi]);
      isBeat.push(false);
      last = nextOnset;
      onsetCount++;
    }
    oi++;
  }

  return {
    times,
    intensity: Float32Array.from(intensity),
    brightness: Float32Array.from(brightness),
    isBeat,
    onsetCount,
  };
}

/** Тухайн үйлийн хүчний үржигч — цохилт бүтэн, онсет хөнгөн. */
export function accentFor(isBeat: boolean): number {
  return isBeat ? 1 : ONSET_ACCENT;
}
