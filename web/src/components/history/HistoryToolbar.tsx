"use client";

/* HistoryView.tsx-ийн хайлтын форм (.plv-create) — тусад нь гаргасан. CSS/behavior бүгд
   өөрчлөгдөөгүй, зөвхөн component boundary шилжсэн. */
export default function HistoryToolbar({ q, setQ, onSubmit }: { q: string; setQ: (v: string) => void; onSubmit: (e: React.FormEvent) => void }) {
  return (
    <form className="flex gap-2.5 mt-1.5 !mb-5" onSubmit={onSubmit} style={{ marginBottom: 20 }}>
      <input
        className="flex-1 w-full p-[12px_14px] rounded-sm bg-white/[.04] border border-line text-ink text-[14.5px] font-[inherit] transition-[border-color,box-shadow] duration-300 focus:border-aqua focus-visible:outline-none focus-visible:shadow-glow-aqua"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Дуу эсвэл дуучнаар хайх…"
      />
      <button type="submit" className="bt bt-a">
        Хайх
      </button>
    </form>
  );
}
