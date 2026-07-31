"use client";

/* Нэгдсэн "card" каркас — Therapist/Parent/Progress/Admin гэх мэт олон файлд давхардаж
   бичигдсэн "border border-white/[.08] rounded-2xl p-5/p-6 bg-white/[.02] hover:border-white/
   [.14]" markup-ийг нэгтгэв. header/content/footer тусад нь slot-той — хуучин код бүгд
   энэ л markup-ийг өөр өөрөөр давтаж бичиж байсан тул шинээр нэвтрүүлэхэд визуал ялгаа
   гарахгүй (ижил утгуудыг л ашигласан). */
import type { ReactNode } from "react";

export default function SectionCard({
  title,
  description,
  actions,
  footer,
  accent,
  padding = "md",
  className = "",
  children,
}: {
  title?: string;
  description?: string;
  actions?: ReactNode;
  footer?: ReactNode;
  accent?: "aqua" | "warm" | "rose";
  padding?: "sm" | "md";
  className?: string;
  children: ReactNode;
}) {
  const padCls = padding === "sm" ? "p-5" : "p-6 max-nav:p-5";
  /* Нэг гадаргуугийн хэв: дээд талын hairline highlight + зөөлөн gradient — өмнөх
     хавтгай `bg-white/[.02]`-аас гүн харагдана, харин ямар ч layout хөндөгдөөгүй. */
  const accentCls =
    accent === "aqua"
      ? "border-aqua/[.18] bg-aqua/[.04] shadow-[inset_0_1px_0_rgba(56,232,206,.12)]"
      : accent === "warm"
        ? "border-warm/[.18] bg-warm/[.04] shadow-[inset_0_1px_0_rgba(217,165,76,.14)]"
        : accent === "rose"
          ? "border-rose/[.18] bg-rose/[.04] shadow-[inset_0_1px_0_rgba(240,140,165,.14)]"
          : "border-white/[.07] [background:linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,.01))] shadow-[inset_0_1px_0_rgba(255,255,255,.05)] hover:border-white/[.14]";

  return (
    <div className={"border rounded-2xl transition-[border-color,box-shadow] duration-250 " + accentCls + " " + padCls + " " + className}>
      {(title || actions) && (
        <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
          {title && (
            <div className="min-w-0">
              <b className="block font-display font-semibold text-title tracking-[-.025em] text-ink">{title}</b>
              {description && <p className="text-dim text-body leading-[1.55] mt-1.5 max-w-[62ch]">{description}</p>}
            </div>
          )}
          {actions && <div className="flex items-center gap-2 flex-none flex-wrap">{actions}</div>}
        </div>
      )}
      {children}
      {footer && <div className="mt-5 pt-4 border-t border-white/[.07]">{footer}</div>}
    </div>
  );
}
