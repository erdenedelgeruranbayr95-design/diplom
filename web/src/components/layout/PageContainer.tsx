/* Player.tsx-ийн үндсэн агуулгын хэсэг (өмнө нь <main className="sp-main">) — Tailwind руу
   хөрвүүлсэн. .sp-main-ийн эффектив (ui.css cascade ялалттай) утгууд: padding нь desktop дээр
   ui.css:213-ийн 34px 42px 44px (medreh.css:481-ийн 26px 36px 34px-г override хийдэг), харин
   ≤860px дээр medreh.css:587 БОЛОН ui.css:387 хоёул адилхан 20px 16px гэж давхар тохируулдаг тул
   энэ mobile утга bodit-оор ажилладаг (dead биш). 19 view компонент дотор нь өөрчлөлтгүй хэвээр.

   `sp-main` classname-ийг ЗОРИУДААР хэвээр үлдээсэн: Tailwind-д native scrollbar-width/
   ::-webkit-scrollbar utility байхгүй (plugin суугаагүй) тул custom scrollbar CSS
   (medreh.css:1111-1116, ui.css:302-309) энэ selector-т тулгуурлаж ажиллаж байна —
   ирээдүйн тусдаа даалгавраар scrollbar plugin нэмж бүрэн Tailwind болгож болно. */
import type { ReactNode } from "react";

export default function PageContainer({ children }: { children: ReactNode }) {
  return (
    <main className="sp-main relative z-[2] flex-1 overflow-y-auto w-full p-[34px_42px_44px] max-nav:p-[20px_16px]">{children}</main>
  );
}
