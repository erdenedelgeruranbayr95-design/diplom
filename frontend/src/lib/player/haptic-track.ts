/* Цохилт + онсетыг НЭГ мэдрэхүйн замд нэгтгэнэ.

   ЯАГААД ХЭРЭГТЭЙ ВЭ
   Зөвхөн цохилтоор чичрүүлэхэд метроном шиг мэдрэгддэг: секундэд ердөө 1.6–2.5
   удаа, бүгд ижил зайтай. Хөгжмийн бодит бүтэц — аялгууны нот, гитарын цохилт,
   дуучны үг — бүгд алдагдана.

   Онсет (аливаа шинэ авиа эхлэх мөч) нь цохилтоос 3–6 дахин олон бөгөөд яг тэр
   бүтцийг дагадаг. Түүнийг нэмснээр «нэг хэмнэл» биш, хөгжим өөрөө мэдрэгдэнэ.

   ⚠️ ГЭХДЭЭ ШҮҮЛТГҮЙГЭЭР БОЛОХГҮЙ
   Онсет секундэд 4.5–12 удаа, хоорондын зай 35мс хүртэл богино байдаг. Арьс
   50мс-ээс ойрхон хоёр цохилтыг НЭГ тасралтгүй чичиргээ гэж мэдэрдэг, мотор ч
   эргэлдэж амжихгүй. Шүүлтгүй бол үр дүн нь «ззз» — одоогийн байдлаас ч дор.

   Энэ файл нь `mobile/src/lib/player/haptic-track.ts`-тэй ИЖИЛ логиктой (цэвэр
   TypeScript, DOM-гүй). Хоёр платформ ижил мэдрэмж өгөх ёстой тул тогтмолуудыг
   өөрчлөх үед ХОЁУЛАНГ нь зэрэг өөрчилнө. */

/** Онсет цохилтод хэр ойр байвал ТУСДАА үйл гэж тооцохгүй вэ — ижил цохилтын
 *  давхар илрэл байх магадлалтай. */
const ONSET_GUARD_MS = 90;

/** Дараалсан хоёр үйлийн хамгийн бага зай (хүрэлцэхүйн ялгах хязгаар ~50мс). */
const MIN_GAP_MS = 100;

/** Онсетын хүчний үржигч. ⚠️ 1 БАЙЖ БОЛОХГҮЙ — онсет цохилттой ижил хүчтэй
 *  бол хэмнэлийн тулгуур алга болж, бүхэлдээ жигд шуугиан болно. */
const ONSET_ACCENT = 0.55;

export interface HapticTrack {
  /** Секундээр, өсөх дарааллаар. */
  times: number[];
  intensity: Float32Array;
  brightness: Float32Array;
  /** `true` = цохилт (тулгуур), `false` = онсет (чимэглэл). */
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

/** Цохилт ба онсетыг нэгтгэж, зайн шаардлагаар шүүнэ. Цохилт нь ҮРГЭЛЖ үлдэнэ. */
export function buildHapticTrack(beats: Source, onsets: Source, defaultBrightness: number): HapticTrack | null {
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

  let bi = 0;
  let oi = 0;
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

  return { times, intensity: Float32Array.from(intensity), brightness: Float32Array.from(brightness), isBeat, onsetCount };
}

/** Тухайн үйлийн хүчний үржигч — цохилт бүтэн, онсет хөнгөн. */
export function accentFor(isBeat: boolean): number {
  return isBeat ? 1 : ONSET_ACCENT;
}
