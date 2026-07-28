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
    <div
      role="dialog"
      aria-label={label}
      style={{ width }}
      className="absolute top-[52px] right-0 z-[9] max-h-[420px] overflow-y-auto rounded-2xl border border-white/[.10] bg-[#0B1110] shadow-lg [animation:abx_.22s_cubic-bezier(.16,.8,.24,1)] p-2.5 flex flex-col gap-1"
    >
      {children}
    </div>
  );
}
