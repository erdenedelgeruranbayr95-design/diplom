/* Цохилтын нягтрал — дууг тэнцүү хэсэгт хувааж, хэсэг тус бүрд ногдох цохилтын
   тоог гаргана.

   ЯАГААД ХЭРЭГТЭЙ ВЭ
   Сонсголгүй хэрэглэгч дуу «хаана эрчимжиж, хаана намжихыг» урьдчилж ХАРЖ
   чадвал юу мэдрэхээ мэдэж, аппад итгэх итгэл нэмэгдэнэ. Мөн энэ нь дипломын
   гол механизмыг (цохилт → чичиргээ) нүдэнд харагдуулна: багана өндөр байх
   хэсэгт утас олон удаа чичирнэ.

   `beatTimestamps` нь ЖИНХЭНЭ өгөгдөл (worker-ийн librosa шинжилгээ) тул энэ
   график чимэглэл биш — бодит хэмжилт. */

/** Цохилтын хугацаануудыг `buckets` ширхэг хэсэгт хуваан тоолно.
 *
 *  Буцаах массивын утга бүр 0..1 хооронд normalize хийгдсэн (хамгийн нягт хэсэг
 *  = 1). Ингэснээр UI нь өндрийг шууд хувь болгон ашиглана.
 *
 *  Цохилтгүй эсвэл хугацаа мэдэгдэхгүй бол хоосон массив — дуудагч тал графикийг
 *  ОГТ харуулахгүй (хуурамч хавтгай багана зурахгүй). */
export function beatDensity(
  timestamps: readonly number[] | null | undefined,
  durationSec: number | null | undefined,
  buckets = 40,
): number[] {
  if (!timestamps || timestamps.length === 0) return [];
  if (!durationSec || !Number.isFinite(durationSec) || durationSec <= 0) return [];
  if (buckets <= 0) return [];

  const counts = new Array<number>(buckets).fill(0);
  for (const t of timestamps) {
    if (!Number.isFinite(t) || t < 0) continue;
    // Яг төгсгөлд буй цохилт `buckets` индекс өгөхөөс сэргийлж хязгаарлана.
    const i = Math.min(buckets - 1, Math.floor((t / durationSec) * buckets));
    counts[i]++;
  }

  const max = Math.max(...counts);
  if (max === 0) return [];
  return counts.map((c) => c / max);
}

/** Секундийн тоог `м:сс` болгоно. */
export function formatDuration(seconds: number | null | undefined): string {
  if (!seconds || !Number.isFinite(seconds) || seconds < 0) return "—";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/** Лицензийн кодыг хүнд ойлгомжтой нэр болгоно.
 *
 *  Утгууд нь Prisma-гийн `enum SongLicense`-тэй ЯГ таарна (6 утга). Байхгүй
 *  утгыг урьдчилан бичихгүй — хэзээ ч ажиллахгүй код нь уншигчийг төөрөгдүүлнэ. */
export function licenseLabel(code: string | null | undefined): string {
  if (!code) return "Тодорхойгүй";
  const MAP: Record<string, string> = {
    CC_BY: "Creative Commons — Нэр заавал",
    CC_BY_SA: "Creative Commons — Нэр заавал · Ижлээр түгээх",
    CC_BY_NC: "Creative Commons — Нэр заавал · Ашгийн бус",
    CC0: "CC0 — Нийтийн эзэмшил",
    ORIGINAL: "Зохиогчийн өөрийн бүтээл",
    LICENSED: "Гэрээгээр авсан",
  };
  return MAP[code] ?? code;
}
