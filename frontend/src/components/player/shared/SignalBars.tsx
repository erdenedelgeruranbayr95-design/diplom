"use client";

import type { MutableRefObject } from "react";

/* Амьд давтамжийн багана (спектр). Багануудын өндрийг `useHapticEngine`-ийн ГАНЦ
   RAF loop `signalBarsRef.current[i].style.height`-ээр шууд бичнэ — энд ямар ч
   AudioContext/AnalyserNode үүсэхгүй, зөвхөн ref-ийг DOM-д холбоно.

   ⚠️ `signalBarsRef` нь НЭГ массив тул энэ компонентыг нэг зэрэг ХОЁР газар
   mount хийж болохгүй — сүүлд mount болсон нь өмнөхийн ref-ийг дарж бичих тул
   зөвхөн нэг нь амьдарна. Багана тоо нь чөлөөтэй: RAF loop нь спектрийг
   `signalBarsRef.current.length`-ээр хуваадаг. */

export default function SignalBars({
  signalBarsRef,
  count = 28,
  className = "",
  barClassName = "",
}: {
  signalBarsRef?: MutableRefObject<(HTMLSpanElement | null)[]>;
  count?: number;
  /** Багануудыг агуулах flex контейнерийн класс. Өндөр нь ЗААВАЛ тодорхой байх ёстой
   *  (RAF loop нь `height`-ийг ХУВИАР бичдэг тул эцэг элемент өндөргүй бол харагдахгүй). */
  className?: string;
  barClassName?: string;
}) {
  return (
    <div className={"flex items-end gap-[3px] " + className}>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={
            "relative flex-1 min-h-[6px] h-[6px] rounded-t-bar bg-[linear-gradient(180deg,var(--aqua),rgba(56,232,206,.06))] transition-[height] duration-[90ms] ease-linear motion-reduce:transition-none " +
            barClassName
          }
          ref={(el) => {
            if (signalBarsRef) signalBarsRef.current[i] = el;
          }}
        />
      ))}
    </div>
  );
}
