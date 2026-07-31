export const PREVIEW_SEC = 30; // захиалгагүй хэрэглэгчийн урьдчилан сонсох хугацаа

export const VIB_LEVELS = [
  { label: "Сул", mult: 0.5 },
  { label: "Дунд", mult: 1 },
  { label: "Хүчтэй", mult: 1.7 },
];
export const LIGHT_LEVELS = [
  { label: "Бүдэг", mult: 0.5 },
  { label: "Дунд", mult: 1 },
  { label: "Тод", mult: 1.7 },
];
export const DEFAULT_PREFS = { vib: 1, light: 1, bands: { bass: true, mid: true, high: true }, calibrated: false };

/* Төрөл бүрийн "мэдрэмжийн" профайл — дэлгэрэнгүй хуудсанд харагдана */
export interface FeelProfile {
  bass: number;
  mid: number;
  high: number;
  pattern: number[];
  text: string;
}

export const FEEL: Record<string, FeelProfile> = {
  Электрон: { bass: 78, mid: 52, high: 38, pattern: [230, 80, 230], text: "Гүн бас давамгайлсан — урт, хүчтэй чичиргээ голлон мэдрэгдэнэ. Гар дээр аажуу лугшилт болж бууна." },
  Чилл: { bass: 46, mid: 62, high: 30, pattern: [140, 90, 140, 90], text: "Зөөлөн дунд давтамжтай — намуухан, урсгал мэт хэмнэлтэй чичиргээ. Тайвшруулах мэдрэмж өгнө." },
  "Синт поп": { bass: 58, mid: 72, high: 55, pattern: [80, 50, 80, 50, 120], text: "Тод аялгуу, дунд бүс голлосон — хэмнэлтэй, «дуулж» буй мэт чичиргээ мэдрэгдэнэ." },
  Данс: { bass: 86, mid: 48, high: 52, pattern: [95, 55, 95, 55, 95], text: "Хүчтэй тогтмол цохилт — бүжгийн хэмнэл шиг тэнцүү зайтай, эрчтэй чичиргээ. Хамгийн «мэдрэгддэг» төрөл." },
  Эмбиент: { bass: 36, mid: 56, high: 46, pattern: [300, 220, 300], text: "Уужим, удаан өөрчлөгдөх дуу — маш зөөлөн, урт долгион мэт чичиргээ. Гэрлийн пульс нь гол мэдрэмж." },
  "Электрон рок": { bass: 72, mid: 68, high: 62, pattern: [60, 40, 60, 40, 130], text: "Бүх бүс идэвхтэй — богино түргэн + урт хүчтэй чичиргээ ээлжилнэ. Эрч хүчтэй мэдрэмж." },
};
export const FEEL_DEFAULT: FeelProfile = { bass: 55, mid: 55, high: 45, pattern: [120, 70, 120], text: "Олон төрлийн давтамж холилдсон — дунд зэргийн хэмнэлтэй чичиргээ мэдрэгдэнэ." };

/** Төрлийн мэдрэмжийн профайлыг сонгоно (тодорхойгүй төрөлд өгөгдмөл). */
export function feelProfileFor(genre: string): FeelProfile {
  return FEEL[genre] || FEEL_DEFAULT;
}

/* ---------- статистикийн icon-ууд (SVG) ----------
   Геометр нь одоо src/components/ui/Icon.tsx-ийн нэгдсэн систем дээр тулгуурлана
   (24×24 grid, 1.75 stroke, round cap/join) — өмнө нь энд, Sidebar-т, TopBar-т 3
   өөр зузаан/өнцгийн стандарт зэрэгцэн байсныг нэгтгэв. Хуучин 8 key (users/gem/
   money/music/phones/vibrate/star/horn) БҮГД хэвээр, зөвхөн зураас цэвэршив; доор
   семантик нь тодорхой шинэ key-үүд нэмэгдсэн (stethoscope=эмч, family=эцэг эх,
   crown=PRO, disc=дууны сан гэх мэт) тул дуудагч файлууд эвдрэхгүй. */
import { ICON_PATHS } from "@/components/ui/Icon";

export const ICONS: Record<string, React.ReactNode> = ICON_PATHS;
