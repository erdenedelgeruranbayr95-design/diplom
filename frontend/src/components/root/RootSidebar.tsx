"use client";

import Icon from "@/components/ui/Icon";
import { ROOT_NAV, ROOT_NAV_GROUPS } from "@/types/root";
import type { RootSection } from "@/types/root";

/* Root Panel-ийн хажуу цэс — Player-ийн `layout/Sidebar.tsx`-тэй ижил визуал хэл
   (идэвхтэй мөрний зүүн aqua зураас, mono бүлгийн гарчиг, 44px hit-area). */
export default function RootSidebar({
  section,
  onSelect,
  email,
}: {
  section: RootSection;
  onSelect: (section: RootSection) => void;
  email: string;
}) {
  return (
    <aside className="w-[248px] flex-none overflow-y-auto flex flex-col gap-5 bg-[rgba(8,11,11,.68)] p-[18px] border-r border-white/[.06] max-nav:w-full max-nav:max-h-[38vh]">
      {ROOT_NAV_GROUPS.map((group) => {
        const items = ROOT_NAV.filter((item) => item.group === group);
        return (
          <nav key={group} className="flex flex-col gap-1" aria-label={group}>
            <span className="mono !text-meta px-3 mb-1">{group}</span>
            {items.map((item) => {
              const active = section === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={
                    "relative flex items-center gap-3 w-full text-left py-2.5 px-3 rounded-xl text-body font-medium min-h-11 transition-[background,color,border-color] duration-150 border focus-visible:outline-none focus-visible:shadow-glow-aqua before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[3px] before:rounded-r-full before:transition-[height] before:duration-200 " +
                    (active
                      ? "bg-aqua/[.11] text-aqua border-aqua/20 before:h-[18px] before:bg-aqua"
                      : "border-transparent text-dim hover:bg-white/[.05] hover:text-ink hover:border-white/[.05] before:h-0")
                  }
                  onClick={() => onSelect(item.id)}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon name={item.icon} size={17} />
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                  {/* Backend API байхгүй хэсгийг ил тэмдэглэнэ — хуурамч тоо хүлээхээс сэргийлнэ. */}
                  {!item.live && (
                    <span className="mono !text-micro !tracking-[.12em] text-faint flex-none" title="Backend API одоогоор байхгүй">
                      API
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        );
      })}

      <p className="mono !text-micro mt-auto pt-4 border-t border-white/[.07] break-all">{email}</p>
    </aside>
  );
}
