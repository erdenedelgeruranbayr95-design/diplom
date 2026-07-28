"use client";

/* Нэгдсэн товчны бүлэг — primary/secondary/ghost/danger зэрэглэлийг нэг дор тодорхойлно.
   Одоо байгаа бүх товчны className pattern-уудыг (bg-aqua/border-white/[.16]/text-[#E88A9B])
   яг хэвээр нь ашигласан тул визуал өөрчлөлтгүй. Аль ч callsite шинээр шилжихдээ өөрийн
   onClick/disabled-ээ дамжуулна — энд ямар ч бизнес логик байхгүй, зөвхөн стиль. */
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const VARIANT_CLS: Record<Variant, string> = {
  primary:
    "bg-aqua text-[#04100E] hover:bg-[#6FF3DE] active:scale-[.97] focus-visible:shadow-glow-aqua",
  secondary:
    "border border-white/[.16] text-ink hover:bg-white/[.08] focus-visible:shadow-glow-aqua",
  ghost:
    "text-dim border border-white/[.1] hover:text-aqua hover:border-aqua/40 focus-visible:shadow-glow-aqua",
  danger:
    "text-[#E88A9B] border border-[rgba(232,138,155,.3)] hover:bg-[#E88A9B] hover:text-[#140306] focus-visible:shadow-[0_0_0_3px_rgba(232,138,155,.3)]",
};

const SIZE_CLS = {
  sm: "text-[12px] py-1.5 px-3.5",
  md: "text-[13.5px] py-2.5 px-5",
  lg: "text-[14px] py-3 px-6",
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
        "rounded-full font-semibold whitespace-nowrap transition-[background,color,border-color,transform,box-shadow] duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none " +
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
