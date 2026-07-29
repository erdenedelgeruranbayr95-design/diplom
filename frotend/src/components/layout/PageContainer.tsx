/* Үндсэн агуулгын "арал" (island panel) — өмнө нь ирмэгээс ирмэг хүртэлх <main> байсныг
   тусдаа бүтэн хүрээтэй, дугуйрсан карт болгож шинэчлэв (Spotify 2023+/Linear/Arc маягийн
   floating-panel layout). 19 view компонент дотроо өөрчлөгдөөгүй — зөвхөн бүрхүүл нь.

   `sp-main` classname-ийг ЗОРИУДААР хэвээр үлдээсэн: Tailwind-д native scrollbar-width/
   ::-webkit-scrollbar utility байхгүй (plugin суугаагүй) тул custom scrollbar CSS
   (medreh.css, ui.css) энэ selector-т тулгуурлаж ажиллаж байна. */
import type { ReactNode } from "react";

export default function PageContainer({ children }: { children: ReactNode }) {
  return (
    <main className="sp-main relative z-[2] flex-1 min-w-0 overflow-y-auto rounded-[20px] max-nav:rounded-2xl border border-white/[.06] bg-[rgba(13,17,17,.72)] [background-image:radial-gradient(760px_320px_at_50%_-8%,rgba(56,232,206,.055),transparent_70%)] shadow-md">
      {/* Агуулга самбарын өргөнийг бүтнээр эзэлнэ. Өмнө нь max-w:1180px байсан тул
          том дэлгэц (≥1600px) дээр хоёр талд хоосон зурвас үлддэг байв. Хэт өргөн
          дэлгэцэд мөр хэт урт болохоос сэргийлж 2000px-д л таглана. */}
      <div className="max-w-[2000px] mx-auto p-9 max-nav:p-4">{children}</div>
    </main>
  );
}
