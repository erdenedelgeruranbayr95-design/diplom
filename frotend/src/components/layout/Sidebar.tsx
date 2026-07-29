"use client";

/* Зүүн навигацийн багана — премиум SaaS дизайн руу шинэчлэв (Stripe/Linear/Notion-ийн
   sidebar pattern-аас санаа авсан: grouped sections, pill-style active state, илүү зай).
   Функц/state бүхэлдээ хэвээр: view/setView, likedTracks/savedTracks/recentTracks props,
   тэдгээрийн харагдах логик (эхний удаа хоосон бол empty-state) огт өөрчлөгдөөгүй —
   зөвхөн visual/spacing/grouping шинэчлэгдсэн. .sp-side classname зориудаар хэвээр (custom
   scrollbar CSS-ийн төлөө), бусад бүгд Tailwind. */
import SideList from "@/components/player/SideList";
import type { ViewName, PlayerTrack } from "@/components/providers/PlayerProvider";

const NAV_ITEMS: {
  view: ViewName;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    view: "home",
    label: "Нүүр",
    icon: (
      <>
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5" />
      </>
    ),
  },
  {
    view: "browse",
    label: "Судлах",
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.5-4.5" />
      </>
    ),
  },
  {
    view: "playlists",
    label: "Жагсаалт",
    icon: (
      <>
        <path d="M3 14v-2a9 9 0 0 1 18 0v2" />
        <rect x="3" y="14" width="4" height="6" rx="2" />
        <rect x="17" y="14" width="4" height="6" rx="2" />
      </>
    ),
  },
  {
    view: "history",
    label: "Түүх",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7.5V12l3 1.8" />
      </>
    ),
  },
  {
    view: "stats",
    label: "Статистик",
    icon: (
      <>
        <path d="M3 3v18h18" />
        <path d="M8 17v-5M13 17V9M18 17v-8" />
      </>
    ),
  },
];

function NavIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

/* Цуглуулгын мөр — нягт, тоолууртай (өмнөх том тасархай хүрээтэй хоосон карт нь
   240px босоо зай эзэлж, юу ч хэлдэггүй байсныг орлов). */
function CollectionEntry({
  label,
  count,
  onClick,
  tint,
  icon,
}: {
  label: string;
  count: number;
  onClick: () => void;
  tint: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      className="group flex items-center gap-3 w-full text-left py-2 px-2 rounded-lg transition-colors duration-150 hover:bg-white/[.05] focus-visible:outline-none focus-visible:shadow-glow-aqua"
      onClick={onClick}
    >
      <span className={"w-8 h-8 flex-none rounded-lg flex items-center justify-center " + tint} aria-hidden="true">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <b className="block text-[13px] font-medium text-ink whitespace-nowrap overflow-hidden text-ellipsis">{label}</b>
        <i className="not-italic block text-[11px] text-faint">{count > 0 ? `${count} дуу` : "хоосон"}</i>
      </span>
      <span className="text-dim text-[11px] opacity-0 -translate-x-1 transition-[opacity,transform] duration-150 group-hover:opacity-100 group-hover:translate-x-0" aria-hidden="true">
        →
      </span>
    </button>
  );
}

export default function Sidebar({
  view,
  setView,
  likedTracks,
  savedTracks,
  recentTracks,
  curId,
  playing,
  onPlay,
}: {
  view: ViewName;
  setView: (v: ViewName) => void;
  likedTracks: PlayerTrack[];
  savedTracks: PlayerTrack[];
  recentTracks: PlayerTrack[];
  curId: number | string | null;
  playing: boolean;
  onPlay: (t: PlayerTrack) => void;
}) {
  return (
    <aside className="sp-side w-[272px] max-nav:w-full flex-none overflow-y-auto max-nav:overflow-visible flex flex-col gap-6 max-nav:gap-3 rounded-[20px] max-nav:rounded-2xl border border-white/[.06] bg-[rgba(13,17,17,.72)] p-4 shadow-md">
      {/* Үндсэн навигаци */}
      <nav className="flex flex-col gap-0.5 max-nav:flex-row max-nav:flex-wrap max-nav:gap-1.5" aria-label="Үндсэн цэс">
        <span className="mono !text-faint !text-[10px] px-3 mb-1.5 max-nav:hidden">Тоглуулагч</span>
        {NAV_ITEMS.map((item) => {
          const active = view === item.view;
          return (
            <button
              key={item.view}
              className={
                "flex items-center gap-3 w-full max-nav:w-auto text-left py-2.5 px-3 rounded-lg text-[14px] font-medium transition-all duration-150 [&>svg]:w-[18px] [&>svg]:h-[18px] [&>svg]:flex-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua/50 " +
                (active
                  ? "bg-aqua/[.14] text-aqua shadow-[inset_0_0_0_1px_rgba(56,232,206,.22)]"
                  : "text-dim hover:bg-white/[.05] hover:text-ink")
              }
              onClick={() => setView(item.view)}
              aria-current={active ? "page" : undefined}
            >
              <NavIcon>{item.icon}</NavIcon>
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="h-px bg-white/[.06] max-nav:hidden" aria-hidden="true"></div>

      {/* Миний цуглуулга */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2 px-1 mb-0.5 text-dim max-nav:hidden">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-none">
            <path d="M4 4h4v16H4zM11 4h3v16h-3z" />
            <path d="m18.5 5 3 15" />
          </svg>
          <b className="text-[13px] font-semibold tracking-[-.01em] text-ink">Миний цуглуулга</b>
        </div>

        <div className="flex flex-col gap-0.5">
          <CollectionEntry
            label="Дуртай дуунууд"
            count={likedTracks.length}
            tint="bg-aqua/[.14] text-aqua"
            onClick={() => setView("liked")}
            icon={
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21s-7.5-4.9-10-9.2C.3 8.6 2 5 5.5 5c2 0 3.4 1.1 4.2 2.3L12 9.6l2.3-2.3C15.1 6.1 16.5 5 18.5 5 22 5 23.7 8.6 22 11.8 19.5 16.1 12 21 12 21z" />
              </svg>
            }
          />
          <CollectionEntry
            label="Хадгалсан"
            count={savedTracks.length}
            tint="bg-warm/[.14] text-warm"
            onClick={() => setView("saved")}
            icon={
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 3h12v18l-6-3.6L6 21V3z" />
              </svg>
            }
          />
          <CollectionEntry
            label="Саяхан сонссон"
            count={recentTracks.length}
            tint="bg-white/[.07] text-dim"
            onClick={() => setView("recent")}
            icon={
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7.5V12l3 1.8" />
              </svg>
            }
          />
        </div>

        {/* Хамгийн сүүлд сонссон хэдэн дуу — шууд дарж тоглуулах шуурхай зам */}
        {recentTracks.length > 0 && (
          <div className="flex flex-col gap-2 max-nav:hidden">
            <span className="mono !text-faint !text-[9px] px-1">Шуурхай</span>
            <SideList tracks={recentTracks.slice(0, 4)} curId={curId} playing={playing} onPlay={onPlay} />
          </div>
        )}
      </div>
    </aside>
  );
}
