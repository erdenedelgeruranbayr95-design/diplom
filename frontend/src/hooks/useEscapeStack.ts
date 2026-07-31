"use client";

import { useWindowEvent } from "@/hooks/useWindowEvent";

/* Escape товчны ШАТЛАЛ — хамгийн дээд давхаргаас доош нэг л удаа хаана.

   Player.tsx-д энэ нь 15 мөрийн `if/return` шат байсан бөгөөд шинэ давхарга (модал,
   самбар) нэмэх бүрд гар аргаар засах шаардлагатай байв. Одоо дараалал нь ЖАГСААЛТ —
   уншихад ч, өөрчлөхөд ч ойлгомжтой. */

export interface EscapeLayer {
  /** Энэ давхарга одоо нээлттэй эсэх. */
  active: boolean;
  /** Хаах үйлдэл. `null` бол "энэ давхарга өөрөө удирдана" — шатлал энд зогсоно. */
  onEscape: (() => void) | null;
}

/**
 * Escape дарахад эхний `active` давхаргын `onEscape`-ийг дуудна.
 * Дараалал нь ЧУХАЛ — хамгийн дээд (сүүлд нээгдсэн) давхаргыг эхэнд бичнэ.
 */
export function useEscapeStack(layers: EscapeLayer[], { enabled = true }: { enabled?: boolean } = {}): void {
  useWindowEvent(
    "keydown",
    (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const layer = layers.find((l) => l.active);
      if (!layer) return;
      layer.onEscape?.();
    },
    { enabled },
  );
}
