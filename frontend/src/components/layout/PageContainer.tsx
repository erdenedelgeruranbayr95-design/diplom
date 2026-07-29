/* Үндсэн агуулгын хэсэг (өмнө нь <main className="sp-main">) — контент-өргөний тогтолцоо
   (max-width + spacing scale) руу шинэчлэв. 19 view компонент дотор нь өөрчлөлтгүй хэвээр,
   зөвхөн эргэн тойрны padding/scroll behavior шинэчлэгдсэн.

   `sp-main` classname-ийг ЗОРИУДААР хэвээр үлдээсэн: Tailwind-д native scrollbar-width/
   ::-webkit-scrollbar utility байхгүй (plugin суугаагүй) тул custom scrollbar CSS
   (medreh.css, ui.css) энэ selector-т тулгуурлаж ажиллаж байна. */
import type { ReactNode } from "react";

export default function PageContainer({ children }: { children: ReactNode }) {
  return (
    <main className="sp-main relative z-[2] flex-1 overflow-y-auto w-full">
      <div className="max-w-[1180px] mx-auto p-8 max-nav:p-4">{children}</div>
    </main>
  );
}
