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
  /* Хатуу 1px хүрээний оронд зөөлөн дүүргэлт — бараан дэвсгэр дээр карт "хайрцаг"
     байхаа больж, гадаргуугийн давхарга болж уншигдана (орчин үеийн dark UI-ийн зарчим). */
  const accentCls =
    accent === "aqua"
      ? "bg-aqua/[.07] hover:bg-aqua/[.09]"
      : accent === "warm"
        ? "bg-warm/[.07] hover:bg-warm/[.09]"
        : accent === "rose"
          ? "bg-rose/[.07] hover:bg-rose/[.09]"
          : "bg-white/[.035] hover:bg-white/[.05]";

  return (
    <div className={"rounded-2xl transition-[background,box-shadow] duration-250 " + accentCls + " " + padCls + " " + className}>
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
