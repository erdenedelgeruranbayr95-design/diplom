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
  const padCls = padding === "sm" ? "p-5" : "p-6";
  const accentCls =
    accent === "aqua"
      ? "border-aqua/[.18] bg-aqua/[.04]"
      : accent === "warm"
        ? "border-warm/[.18] bg-warm/[.04]"
        : accent === "rose"
          ? "border-rose/[.18] bg-rose/[.04]"
          : "border-white/[.08] bg-white/[.02] hover:border-white/[.14]";

  return (
    <div className={"border rounded-2xl transition-[border-color,box-shadow] duration-250 " + accentCls + " " + padCls + " " + className}>
      {(title || actions) && (
        <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
          {title && (
            <div>
              <b className="block font-display font-semibold text-[15px] text-ink">{title}</b>
              {description && <p className="text-dim text-[12.5px] mt-0.5">{description}</p>}
            </div>
          )}
          {actions && <div className="flex items-center gap-2 flex-none">{actions}</div>}
        </div>
      )}
      {children}
      {footer && <div className="mt-4 pt-4 border-t border-white/[.07]">{footer}</div>}
    </div>
  );
}
