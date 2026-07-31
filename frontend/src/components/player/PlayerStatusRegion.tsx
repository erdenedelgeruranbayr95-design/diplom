"use client";

import { PREVIEW_SEC } from "@/lib/player/constants";
import type { PlayerTrack } from "@/types/player";

/* Тоглуулагчийн төлөвийн ганц live region.

   Дуу солигдох / тоглох-зогсоох нь ЗӨВХӨН icon (⏸/▶) болон визуал өөрчлөлтөөр
   илэрхийлэгддэг байсан тул дэлгэц уншигч хэрэглэгчид юу болсныг мэдэхгүй байв.
   `polite` — хэрэглэгчийн одоогийн уншилтыг таслахгүй, дараа нь дуулгана.
   Мөн `limitHit` (үнэгүй горимын хязгаар) энд мэдэгдэнэ — өмнө нь зөвхөн
   дэлгэцэн дээрх текстээр харагддаг байв. (WCAG 4.1.3 Status Messages) */
export default function PlayerStatusRegion({
  track,
  playing,
  limitHit,
}: {
  track: PlayerTrack | null;
  playing: boolean;
  limitHit: boolean;
}) {
  return (
    <p className="sr-only" role="status" aria-live="polite">
      {limitHit
        ? `Үнэгүй горимын ${PREVIEW_SEC} секунд дууслаа. Бүтнээр сонсохын тулд PRO эрх шаардлагатай.`
        : track
          ? `${playing ? "Тоглож байна" : "Түр зогссон"}: ${track.title}${track.artist ? " — " + track.artist : ""}`
          : "Дуу сонгогдоогүй байна"}
    </p>
  );
}
