"use client";

/* TopBar-ийн 3 dropdown (мэдэгдэл/тохиргоо/профайл)-ийн нийтлэг "panel" shell — legacy
   .sp-dd CSS-ийг Tailwind-аар орлуулав. Зөвхөн визуал каркас: байрлал/хэмжээ/арын дэвсгэр/
   сүүдэр/animation. Дотоод агуулга (items) бүрэн caller-аас ирнэ, ямар ч state/behavior
   энд байхгүй. */
import type { ReactNode } from "react";

export default function DropdownPanel({
  label,
  width = 320,
  children,
}: {
  label: string;
  width?: number;
  children: ReactNode;
}) {
  return (
    /* Гүн + хүрээ: overlay бүр ижил elevation-той байх ёстой (shadow + hairline
       highlight). max-w нь жижиг дэлгэц дээр панел viewport-оос гарахаас сэргийлнэ. */
    <div
      role="dialog"
      aria-label={label}
      style={{ width }}
      className="absolute top-[52px] right-0 z-[9] max-h-[min(420px,72svh)] max-w-[calc(100vw-24px)] overflow-y-auto overscroll-contain rounded-2xl border border-white/[.12] bg-[#0B1110] shadow-[inset_0_1px_0_rgba(255,255,255,.06),0_22px_56px_-12px_rgba(0,0,0,.75)] [animation:abx_.22s_cubic-bezier(.16,.8,.24,1)] p-2.5 flex flex-col gap-1"
    >
      {children}
    </div>
  );
}
