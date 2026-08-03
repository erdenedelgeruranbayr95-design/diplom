/* Үндсэн агуулгын хэсэг (өмнө нь <main className="sp-main">) — контент-өргөний тогтолцоо
   (max-width + spacing scale) руу шинэчлэв. 19 view компонент дотор нь өөрчлөлтгүй хэвээр,
   зөвхөн эргэн тойрны padding/scroll behavior шинэчлэгдсэн.

   `sp-main` classname-ийг ЗОРИУДААР хэвээр үлдээсэн: Tailwind-д native scrollbar-width/
   ::-webkit-scrollbar utility байхгүй (plugin суугаагүй) тул custom scrollbar CSS
   (medreh.css, ui.css) энэ selector-т тулгуурлаж ажиллаж байна. */
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

export default function PageContainer({ scrollKey, children }: { scrollKey?: string | number; children: ReactNode }) {
  const ref = useRef<HTMLElement | null>(null);

  /* Жагсаалт дунд scroll хийсэн хэрэглэгч өөр view рүү шилжихэд (жиш. Home →
     DetailView) шинэ хуудас хуучин scroll offset-той нээгдэж, дээд агуулга
     (зураг, гарчиг) дэлгэцээс дээш "тасарч" харагдаж байсныг эндээс засав. */
  useEffect(() => {
    ref.current?.scrollTo({ top: 0 });
  }, [scrollKey]);

  return (
    // tabIndex=0 (-1 биш): энэ бүс өөрөө scroll хийдэг (overflow-y-auto) тул гар
    // товчлуураар (Tab/Page Down) хүрч чадах ёстой — WCAG 2.1.1, axe
    // "scrollable-region-focusable" дүрэм. "Шууд агуулга руу очих" skip-link
    // (layout.tsx) энэ рүү focus() дуудахад ч ямар ч нөлөөгүй.
    <main id="main" ref={ref} tabIndex={0} className="sp-main relative z-[2] flex-1 overflow-y-auto w-full">
      {/* Өргөн (≥1600px) дэлгэц дээр 2 баганат grid-үүд (жиш. DetailView-ийн
          зураг+товч 300-360px багана, дараа нь 1fr багана) хэт сунаж, зурган
          баганы дараа асар их хоосон зай гарч байсныг эндээс хязгаарласан. */}
      <div className="w-full min-w-0 max-w-[1400px] mx-auto">{children}</div>
    </main>
  );
}
