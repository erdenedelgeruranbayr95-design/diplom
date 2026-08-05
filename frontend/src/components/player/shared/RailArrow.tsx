"use client";

import Icon from "@/components/ui/Icon";

/* Хэвтээ мөрийн (rail) хоёр талын гүйлгэх сум. `TrackRail`, `ArtistRail` зэрэг бүх
   мөр ижил харагдац, ижил зан төлөвтэй байхын тулд энд нэг л удаа тодорхойлов.
   Гүйлгэлтийн логик нь `hooks/useRailScroll`-д. */

const ARROW_CLS =
  "absolute z-20 w-[38px] h-[38px] rounded-full flex items-center justify-center " +
  "text-ink bg-[rgba(7,10,10,.82)] border border-white/[.1] backdrop-blur-md shadow-[0_8px_22px_rgba(0,0,0,.5)] " +
  "transition-[opacity,transform,color,border-color] duration-[250ms] " +
  "hover:scale-[1.08] hover:text-aqua hover:border-aqua/35 focus-visible:outline-none focus-visible:shadow-glow-aqua";

/** Босоо байрлалын өгөгдмөл — мөрийн яг дунд. */
const DEFAULT_POS = "top-1/2 -translate-y-1/2";

export default function RailArrow({
  side,
  show,
  onClick,
  position = DEFAULT_POS,
}: {
  side: "left" | "right";
  show: boolean;
  onClick: () => void;
  /** Босоо байрлалыг дарж бичих (жишээ нь дугуй зурагтай мөрөнд нэрийн мөрийг тооцохгүй байх). */
  position?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Зүүн тийш гүйлгэх" : "Баруун тийш гүйлгэх"}
      /* Тухайн тал руу гүйлгэх зайгүй бол нуугдана. DOM-оос хасахын оронд идэвхгүй
         болгосон нь tab дараалал гэнэт үсрэхээс сэргийлнэ. */
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      className={
        ARROW_CLS +
        " " +
        position +
        (side === "left" ? " left-1" : " right-1") +
        (show ? " opacity-100" : " opacity-0 pointer-events-none")
      }
    >
      <Icon name="chevronRight" size={18} className={side === "left" ? "rotate-180" : ""} />
    </button>
  );
}
