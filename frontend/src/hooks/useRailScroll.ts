"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* Хэвтээ гүйдэг мөрийг (rail) сум товчоор удирдах логик — mouse drag/trackpad-гүй
   хэрэглэгч ч мөрийг гүйлгэх боломжтой болно.

   Урьд нь энэ бүхэн `TrackRail.tsx` дотор шууд бичигдсэн байсан тул `ArtistRail`
   зэрэг бусад мөр сумгүй үлдэж байв. Домэйноос хамааралгүй цэвэр DOM логик учир
   `lib/player/`-т биш энд байрлана. */

export interface RailScroll<T extends HTMLElement> {
  /** Гүйдэг контейнерт залгах ref. */
  scroller: React.RefObject<T | null>;
  /** Тухайн тал руу гүйлгэх зай үлдсэн эсэх — сумыг харуулах/нуухад ашиглана. */
  canLeft: boolean;
  canRight: boolean;
  /** Багтах бүтэн картын тоогоор нэг "хуудас" гүйлгэнэ. */
  scrollPage: (direction: 1 | -1) => void;
  /** Контейнерийн `onScroll`-д залгана. */
  sync: () => void;
}

/**
 * @param cardStep Картын өргөн + gap (px). Гүйлгэлтийг үүгээр тоймлож бүтэн картаар зогсооно.
 * @param deps Элементийн тоо зэрэг өөрчлөгдөхөд дахин тооцоолохын тулд дамжуулна.
 */
export function useRailScroll<T extends HTMLElement>(cardStep: number, deps: unknown[] = []): RailScroll<T> {
  const scroller = useRef<T>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const sync = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    /* 1px тэвчээр — зуум/subpixel үед scrollLeft бутархай гарч, төгсгөлд хүрсэн
       атлаа сум идэвхтэй хэвээр үлдэхээс сэргийлнэ. */
    setCanLeft(el.scrollLeft > 1);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    sync();
    /* Цонхны өргөн (эсвэл sidebar) өөрчлөгдөхөд гүйлгэх зай нь өөрчлөгдөнө —
       resize болгонд дахин тооцно. */
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sync, ...deps]);

  const scrollPage = useCallback(
    (direction: 1 | -1) => {
      const el = scroller.current;
      if (!el) return;
      const page = Math.max(cardStep, Math.floor(el.clientWidth / cardStep) * cardStep);
      el.scrollBy({ left: direction * page, behavior: "smooth" });
    },
    [cardStep],
  );

  return { scroller, canLeft, canRight, scrollPage, sync };
}
