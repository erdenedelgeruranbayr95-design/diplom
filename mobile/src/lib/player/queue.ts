import type { RepeatMode } from "@/lib/prefs/PreferencesContext";

/* Тоглуулагчийн дараалал — холих ба давтах.

   ЯАГААД ТУСДАА ФАЙЛ ВЭ
   Тоглуулагчийн дэлгэц дуу солих бүрд бүхэлдээ дахин үүсдэг (`router.replace`).
   Дарааллын логик тэр дотор байвал шалгахад хэцүү бөгөөд алдаа нь зөвхөн бодит
   төхөөрөмж дээр илэрнэ. Энд бүгд ЦЭВЭР ФУНКЦ — оролт нэг бол гаралт үргэлж нэг. */

/** Тодорхойлогдсон (seeded) псевдо-санамсаргүй тоо үүсгэгч.
 *
 *  `Math.random()` БОЛОХГҮЙ: дэлгэц дуу бүр дээр дахин үүсдэг тул дуудалт болгонд
 *  өөр дараалал гарч, «өмнөх дуу» товч огт өөр дуу руу үсэрнэ. Үртэй генератор нь
 *  ижил үрээс ижил дарааллыг баталгаатай өгнө. */
function seededRandom(seed: number): () => number {
  // Numerical Recipes-ийн LCG параметрүүд. Криптографид тохирохгүй ч дуу холиход
  // хангалттай жигд тархалттай.
  let state = Math.abs(Math.trunc(seed)) || 1;
  return () => {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };
}

/** Fisher–Yates холилт — үрээс хамаарч тогтвортой үр дүн өгнө. */
export function shuffledOrder<T>(items: readonly T[], seed: number): T[] {
  const out = [...items];
  const rand = seededRandom(seed);
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Одоогийн байрлалаас хөрш дуу руу шилжих индекс.
 *
 *  `null` буцаавал шилжих газаргүй (товч идэвхгүй болно).
 *
 *  · `repeat === "all"` үед хоёр үзүүрээр эргэлдэнэ
 *  · `repeat === "one"` нь ЭНД нөлөөлөхгүй — тэр нь зөвхөн дуу ӨӨРӨӨ дуусахад
 *    үйлчилнэ. Хэрэглэгч «дараагийн» товчийг зориудаар дарвал дараагийн дуунд
 *    очих ёстой, нэг дууны дотор түгжигдэх нь эвгүй. */
export function neighborIndex(
  current: number,
  total: number,
  direction: 1 | -1,
  repeat: RepeatMode,
): number | null {
  if (total <= 0 || current < 0) return null;
  const next = current + direction;
  if (next >= 0 && next < total) return next;
  if (repeat === "all") return direction === 1 ? 0 : total - 1;
  return null;
}

/** Дуу ӨӨРӨӨ дуусахад дараа нь юу тоглох вэ.
 *
 *  `"replay"` — ижил дууг эхнээс нь (repeat "one")
 *  `number`   — тухайн индекс дэх дуу
 *  `null`     — юу ч биш, зогсоно */
export function afterTrackEnd(
  current: number,
  total: number,
  repeat: RepeatMode,
): "replay" | number | null {
  if (repeat === "one") return "replay";
  return neighborIndex(current, total, 1, repeat);
}
