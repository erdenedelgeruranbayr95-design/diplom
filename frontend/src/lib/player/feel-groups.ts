import { feelProfileFor } from "@/lib/player/constants";
import type { PlayerTrack } from "@/types/player";

/* Нүүр хуудасны «Хүчтэй дуунууд» ба «Намуухан дуу» секцүүдийн ангилал.

   Эх сурвалж нь тухайн дууны ТӨРӨЛ (`feelProfileFor`) — өөрөөр хэлбэл апп нь
   чичиргээгээ ямар профайлаар гаргадаг, яг тэр профайлаар л ангилна. Ингэснээр
   «Хүчтэй» гэж бичсэн дуу үнэхээр хүчтэй мэдрэгдэж, «Намуухан» нь үнэхээр зөөлөн
   байна — шошго ба бодит мэдрэмж хоёр зөрөхгүй.

   ⚠️ Яагаад дууны бодит `bandEnergies`-ийг ашиглаагүй вэ: тэр талбар Song дээр бий
   ч (`add_song_band_energies` migration) Python worker дуу задлаагүй тул 2026-08-05-ны
   байдлаар 21/21 дуунд NULL байна. Worker ажиллаж эхэлбэл энэ файлыг дуу тус бүрийн
   бодит энерги рүү шилжүүлэх нь илүү нарийвчлалтай болно. */

/** Хүчтэй гэж тооцох бас-ын доод хязгаар. */
export const POWERFUL_MIN_BASS = 70;
/** Намуухан гэж тооцох дээд хязгаарууд — бас БА өндөр давтамж хоёул намхан байх ёстой. */
export const CALM_MAX_BASS = 46;
export const CALM_MAX_HIGH = 50;

/** Хүчтэй мэдрэгддэг дуунууд — бас давамгайлсан төрлүүд (Хип-хоп, Трэп, Данс, Rock…). */
export function pickPowerful(tracks: PlayerTrack[]): PlayerTrack[] {
  return tracks.filter((track) => feelProfileFor(track.genre).bass >= POWERFUL_MIN_BASS);
}

/** Намуухан дуунууд — бас ч, өндөр давтамж ч сул төрлүүд (Балад, Акустик, Чилл…). */
export function pickCalm(tracks: PlayerTrack[]): PlayerTrack[] {
  return tracks.filter((track) => {
    const feel = feelProfileFor(track.genre);
    return feel.bass <= CALM_MAX_BASS && feel.high <= CALM_MAX_HIGH;
  });
}
