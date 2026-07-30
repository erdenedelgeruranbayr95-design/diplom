"use client";

import Icon from "@/components/ui/Icon";

/* HistoryView.tsx-ийн хайлтын форм — премиум search field (icon + clear button) руу
   шинэчлэв. q/setQ/onSubmit бүгд хэвээр, зөвхөн визуал давхарга шинэчлэгдсэн. */
export default function HistoryToolbar({ q, setQ, onSubmit }: { q: string; setQ: (v: string) => void; onSubmit: (e: React.FormEvent) => void }) {
  return (
    <form className="flex gap-2.5 mb-6" onSubmit={onSubmit}>
      <div className="relative flex-1">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-faint pointer-events-none"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.5" y2="16.5" />
        </svg>
        <input
          className="w-full pl-11 pr-11 py-3 rounded-full bg-white/[.05] border border-white/[.06] text-ink text-[14px] font-[inherit] transition-[border-color,box-shadow,background] duration-300 focus:bg-white/[.08] focus:border-aqua/60 focus-visible:outline-none focus-visible:shadow-glow-aqua placeholder:text-faint"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Дуу эсвэл дуучнаар хайх…"
          aria-label="Сонссон түүхээс хайх"
        />
        {q && (
          <button
            type="button"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-faint transition-colors duration-150 hover:text-ink hover:bg-white/[.08] focus-visible:outline-none focus-visible:shadow-glow-aqua"
            onClick={() => setQ("")}
            aria-label="Хайлт цэвэрлэх"
          >
            <Icon name="close" size={13} />
          </button>
        )}
      </div>
      <button
        type="submit"
        className="flex-none rounded-full text-[13.5px] font-semibold bg-aqua text-[#04100E] py-3 px-6 transition-[background,transform] duration-200 hover:bg-[#6FF3DE] active:scale-[.97] focus-visible:outline-none focus-visible:shadow-glow-aqua"
      >
        Хайх
      </button>
    </form>
  );
}
