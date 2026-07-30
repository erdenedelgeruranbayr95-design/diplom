"use client";

/* Нэгдсэн товчны бүлэг — primary/secondary/ghost/danger зэрэглэлийг нэг дор тодорхойлно.
   Одоо байгаа бүх товчны className pattern-уудыг (bg-aqua/border-white/[.16]/text-[#E88A9B])
   яг хэвээр нь ашигласан тул визуал өөрчлөлтгүй. Аль ч callsite шинээр шилжихдээ өөрийн
   onClick/disabled-ээ дамжуулна — энд ямар ч бизнес логик байхгүй, зөвхөн стиль. */
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

/* primary дээр нимгэн top-highlight + өнгөт elevation нэмэв (дүүргэсэн товч "хавтгай
   өнгөт тэгш дөрвөлжин" биш, гадаргуу мэт мэдрэгдэнэ). secondary/ghost-ийн hover нь
   зөвхөн дэвсгэр биш хүрээгээ ч тодруулна — hover-ийн хариу үйлдэл илүү тод. */
const VARIANT_CLS: Record<Variant, string> = {
  primary:
    "bg-aqua text-[#04100E] shadow-[inset_0_1px_0_rgba(255,255,255,.35),0_4px_14px_-4px_rgba(56,232,206,.5)] hover:bg-[#6FF3DE] hover:shadow-[inset_0_1px_0_rgba(255,255,255,.4),0_6px_20px_-4px_rgba(56,232,206,.6)] active:scale-[.97] focus-visible:shadow-glow-aqua",
  secondary:
    "border border-white/[.16] text-ink hover:bg-white/[.08] hover:border-white/[.26] active:scale-[.98] focus-visible:shadow-glow-aqua",
  ghost:
    "text-dim border border-white/[.1] hover:text-aqua hover:border-aqua/40 hover:bg-aqua/[.05] active:scale-[.98] focus-visible:shadow-glow-aqua",
  danger:
    "text-[#E88A9B] border border-[rgba(232,138,155,.3)] hover:bg-[#E88A9B] hover:text-[#140306] active:scale-[.98] focus-visible:shadow-[0_0_0_2px_rgba(232,138,155,.6),0_0_0_5px_rgba(232,138,155,.18)]",
};

/* min-h нь хүрэлцэх төхөөрөмж дээрх hit-target-ийг хамгаална (WCAG 2.5.8) */
const SIZE_CLS = {
  sm: "text-[12px] py-1.5 px-3.5 min-h-[30px]",
  md: "text-[13.5px] py-2.5 px-5 min-h-[38px]",
  lg: "text-[14px] py-3 px-6 min-h-[44px]",
};

export function ActionButton({
  variant = "secondary",
  size = "md",
  className = "",
  children,
  ...rest
}: {
  variant?: Variant;
  size?: keyof typeof SIZE_CLS;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[background,color,border-color,transform,box-shadow] duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none motion-reduce:active:scale-100 " +
        VARIANT_CLS[variant] +
        " " +
        SIZE_CLS[size] +
        " " +
        className
      }
      {...rest}
    >
      {children}
    </button>
  );
}

export default function ActionGroup({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={"flex items-center gap-2.5 flex-wrap " + className}>{children}</div>;
}
