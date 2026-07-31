"use client";

import type { ReactNode } from "react";
import { ActionButton } from "@/components/ui/ActionGroup";
import Icon from "@/components/ui/Icon";

/* Хүснэгтийн дээд хэсэг — хайлт · шүүлт · CSV экспорт, доор нь сонголтын үйлдлийн зурвас. */

export function RootSearch({
  value,
  onChange,
  placeholder,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  label: string;
}) {
  return (
    <div className="relative flex-1 min-w-[200px]">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dim pointer-events-none flex" aria-hidden="true">
        <Icon name="search" size={15} />
      </span>
      <input
        type="search"
        className="w-full pl-10 pr-9 py-2.5 rounded-full bg-white/[.04] border border-white/[.08] text-ink text-body transition-[border-color,box-shadow,background] duration-250 focus:bg-white/[.07] focus:border-aqua/60 focus-visible:outline-none focus-visible:shadow-glow-aqua placeholder:text-faint [&::-webkit-search-cancel-button]:hidden"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
      />
      {value && (
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-faint hover:text-ink transition-colors duration-150 rounded focus-visible:outline-none focus-visible:shadow-glow-aqua"
          onClick={() => onChange("")}
          aria-label="Хайлт цэвэрлэх"
        >
          <Icon name="close" size={13} />
        </button>
      )}
    </div>
  );
}

/** Дугуй хэлбэрийн шүүлтийн бүлэг (Бүгд · PRO · Үнэгүй гэх мэт). */
export function RootFilter<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div className="flex gap-1.5 flex-wrap" role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          className={
            "text-caption font-mono rounded-full py-2 px-3.5 border transition-colors duration-200 focus-visible:outline-none focus-visible:shadow-glow-aqua " +
            (value === o.value
              ? "bg-aqua border-aqua text-on-aqua font-semibold"
              : "border-white/[.1] text-dim hover:text-ink hover:bg-white/[.05]")
          }
          onClick={() => onChange(o.value)}
          aria-pressed={value === o.value}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function RootExportButton({ onExport, count }: { onExport: () => void; count: number }) {
  return (
    <ActionButton variant="secondary" size="sm" onClick={onExport} disabled={count === 0} title={`${count} мөрийг CSV болгон татах`}>
      <Icon name="upload" size={14} />
      CSV ({count.toLocaleString()})
    </ActionButton>
  );
}

/* Олноор сонгосон үед гарч ирэх үйлдлийн зурвас — sticky, glass, дэлгэц уншигчид мэдэгдэнэ. */
export function RootBulkBar({
  count,
  onClear,
  children,
}: {
  count: number;
  onClear: () => void;
  children: ReactNode;
}) {
  if (count === 0) return null;
  return (
    <div
      className="sticky top-2 z-[3] flex items-center gap-3 flex-wrap mb-4 rounded-2xl border border-aqua/[.28] bg-[rgba(10,22,21,.92)] backdrop-blur-xl px-4 py-3 shadow-[0_12px_32px_-12px_rgba(0,0,0,.7)] [animation:abx_.25s_cubic-bezier(.16,.8,.24,1)] motion-reduce:[animation:none]"
      role="status"
      aria-live="polite"
    >
      <span className="inline-flex items-center gap-2 text-body font-semibold text-aqua">
        <Icon name="check" size={14} strokeWidth={2.4} />
        {count.toLocaleString()} сонгогдсон
      </span>
      <div className="flex items-center gap-1.5 flex-wrap ml-auto">{children}</div>
      <button
        type="button"
        className="w-8 h-8 flex-none rounded-lg flex items-center justify-center text-dim hover:text-ink hover:bg-white/[.07] transition-colors duration-150 focus-visible:outline-none focus-visible:shadow-glow-aqua"
        onClick={onClear}
        aria-label="Сонголт цуцлах"
      >
        <Icon name="close" size={14} />
      </button>
    </div>
  );
}

/* Backend API байхгүй үйлдлүүд — товч харагдана, гэхдээ идэвхгүй ба шалтгаанаа хэлнэ.
   Ингэснээр ROOT-д ЯМАР үйлдэл төлөвлөгдсөн нь ил, гэхдээ хуурамчаар "амжилттай"
   гэж хэлэхгүй (шинэ backend logic зохиомжлохгүй гэсэн шаардлага). */
export function RootBlockedAction({ label, icon, needs }: { label: string; icon: string; needs: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border border-white/[.08] bg-white/[.02] px-3 py-1.5 text-caption text-faint cursor-not-allowed select-none"
      title={`Backend endpoint байхгүй — ${needs}`}
    >
      <Icon name={icon} size={12} />
      {label}
      <Icon name="alert" size={11} />
    </span>
  );
}
