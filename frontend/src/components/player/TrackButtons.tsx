"use client";

import type { ReactNode } from "react";
import type { Track } from "@/types/track";
import Icon from "@/components/ui/Icon";

/* Дууны карт/мөр дээрх жижиг үйлдлийн товчнууд — Дуртай · Хадгалах · Дэлгэрэнгүй.

   ⚠️ Энэ файлын `aria-label`-ууд өмнө нь ДАВХАР КОДЛОГДСОН UTF-8 хэлбэрээр
   хадгалагдсан байв ("Ð”ÑƒÑ€Ñ‚Ð°Ð¹Ð´ Ð½ÑÐ¼ÑÑ…" = "Дуртайд нэмэх") тул дэлгэц уншигч
   утгагүй текст уншиж байсан — deaf-first төсөлд ялангуяа эмзэг алдаа. Зассан.

   `row` горим нь хүснэгтийн мөрд (ArtistView) ашиглагдана: `<button>` дотор `<button>`
   орохоос сэргийлж `role="button"`-той `<span>` болж хувирна. */

const BASE =
  "absolute top-[10px] right-[10px] w-[34px] h-[34px] rounded-full flex items-center justify-center text-title text-ink bg-[rgba(7,10,10,.72)] border border-white/[.08] backdrop-blur-md opacity-0 transition-[opacity,color,transform,border-color,background] duration-[250ms] z-[2] hover:scale-[1.08] hover:border-aqua/35 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:shadow-glow-aqua";
const ROW = "!static !w-[32px] !h-[32px] !rounded-xl !bg-white/[.03] !border-white/[.08] !opacity-100 text-faint !text-lead";

/** Товч эсвэл мөр доторх span — үйлдэл нэг, зөвхөн элемент өөр. */
function ActionButton({
  className,
  label,
  row,
  onActivate,
  children,
}: {
  className: string;
  label: string;
  row?: boolean;
  onActivate: () => void;
  children: ReactNode;
}) {
  if (row) {
    return (
      <span
        className={className}
        role="button"
        tabIndex={0}
        aria-label={label}
        onClick={(e) => {
          e.stopPropagation();
          onActivate();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.stopPropagation();
            onActivate();
          }
        }}
      >
        {children}
      </span>
    );
  }

  return (
    <button
      type="button"
      className={className}
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onActivate();
      }}
    >
      {children}
    </button>
  );
}

export function LikeBtn({
  row,
  active,
  onToggle,
}: {
  id: number | string;
  row?: boolean;
  active: boolean;
  onToggle: () => void;
}) {
  const className = BASE + (row ? " " + ROW : "") + (active ? " !opacity-100 text-aqua" : "");

  return (
    <ActionButton className={className} row={row} label={active ? "Дуртайгаас хасах" : "Дуртайд нэмэх"} onActivate={onToggle}>
      <Icon name="heart" size={16} variant={active ? "fill" : "stroke"} />
    </ActionButton>
  );
}

export function SaveBtn({
  row,
  active,
  onToggle,
}: {
  id: number | string;
  row?: boolean;
  active: boolean;
  onToggle: () => void;
}) {
  const className = BASE + (row ? " " + ROW : " !top-12") + (active ? " !opacity-100 text-warm" : "");

  return (
    <ActionButton className={className} row={row} label={active ? "Хадгалснаас хасах" : "Хадгалах"} onActivate={onToggle}>
      <svg
        width={row ? 14 : 15}
        height={row ? 14 : 15}
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      >
        <path d="M6 3h12v18l-6-3.6L6 21V3z" />
      </svg>
    </ActionButton>
  );
}

export function InfoBtn({ t, row, onInfo }: { t: Track; row?: boolean; onInfo: () => void }) {
  const className = BASE + (row ? " " + ROW : " !top-[57px]");

  return (
    <ActionButton className={className} row={row} label={t.title + " — дэлгэрэнгүй"} onActivate={onInfo}>
      <Icon name="info" size={15} />
    </ActionButton>
  );
}
