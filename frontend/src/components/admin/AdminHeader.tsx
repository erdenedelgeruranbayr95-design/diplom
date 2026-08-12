"use client";

import Icon from "@/components/ui/Icon";

/* AdminPanel.tsx-ийн толгой хэсэг (гарчиг + таб сэлгэгч) — премиум dashboard header
   (Supabase Studio/Linear tab pattern) руу шинэчлэв, .auth-x/.auth-tabs legacy CSS-ээс
   Tailwind руу хөрвүүлсэн (эх .auth-tabs нь grid-cols 2 байсан ч энд 3 таб байрлуулж байсан
   тул шахагдсан харагдаж байсныг эндээс засав — цэвэр визуал засвар, tab/onClose логик
   хэвээр). tab/setTab/onClose props бүгд хэвээр. */
export type AdminTab = "users" | "tracks" | "assign" | "artists" | "pro";

export default function AdminHeader({ tab, setTab, onClose }: { tab: AdminTab; setTab: (t: AdminTab) => void; onClose: () => void }) {
  const tabs: { v: AdminTab; label: string }[] = [
    { v: "users", label: "Хэрэглэгчид" },
    { v: "assign", label: "Томилолт" },
    { v: "tracks", label: "Дууны сан" },
    { v: "artists", label: "Уран бүтээлч" },
    { v: "pro", label: "PRO" },
  ];
  return (
    <div className="mb-1">
      <button
        className="absolute top-3.5 right-3.5 text-dim text-sm p-1.5 rounded-full transition-colors duration-250 hover:text-ink hover:bg-white/[.06] focus-visible:outline-none focus-visible:shadow-glow-aqua"
        onClick={onClose}
        aria-label="Хаах"
      >
        <Icon name="close" size={15} />
      </button>

      <span className="mono block mb-4">МЭДРЭХ® / Админ самбар</span>

      <div className="grid grid-cols-5 max-nav:grid-cols-3 border border-white/[.08] rounded-xl overflow-hidden mb-5" role="tablist" aria-label="Админ самбарын таб">
        {tabs.map((t) => (
          <button
            key={t.v}
            role="tab"
            aria-selected={tab === t.v}
            className={
              "font-display text-note tracking-[-.02em] py-3 px-2 transition-colors duration-200 focus-visible:outline-none focus-visible:shadow-glow-aqua " +
              (tab === t.v ? "bg-aqua text-on-aqua font-semibold" : "text-dim hover:bg-white/[.05] hover:text-ink")
            }
            onClick={() => setTab(t.v)}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
