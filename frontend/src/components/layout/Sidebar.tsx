"use client";

/* Зүүн навигацийн багана — премиум SaaS дизайн руу шинэчлэв (Stripe/Linear/Notion-ийн
   sidebar pattern-аас санаа авсан: grouped sections, pill-style active state, илүү зай).
   Функц/state бүхэлдээ хэвээр: view/setView, likedTracks/savedTracks/recentTracks props,
   тэдгээрийн харагдах логик (эхний удаа хоосон бол empty-state) огт өөрчлөгдөөгүй —
   зөвхөн visual/spacing/grouping шинэчлэгдсэн. .sp-side classname зориудаар хэвээр (custom
   scrollbar CSS-ийн төлөө), бусад бүгд Tailwind. */
import SideList from "@/components/player/SideList";
import type { ViewName, PlayerTrack } from "@/components/player/Player";

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
    view: "stats",
    label: "Статистик",
    icon: (
      <>
        <path d="M3 3v18h18" />
        <path d="M8 17v-5M13 17V9M18 17v-8" />
      </>
    ),
  },
  {
    view: "billing",
    label: "Захиалга",
    icon: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
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

function CollectionTeaser({
  label,
  onClick,
  accentClass,
  icon,
}: {
  label: string;
  onClick: () => void;
  accentClass: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      className="group flex items-center w-full text-left py-1.5 px-1 rounded-md transition-colors duration-150 hover:bg-white/[.04] focus-visible:outline-none focus-visible:shadow-glow-aqua"
      onClick={onClick}
    >
      <span className={"mono !tracking-[.14em] !text-faint flex items-center gap-1.5 group-hover:!text-ink transition-colors duration-150 " + accentClass}>
        {icon}
        {label}
      </span>
      <span className="ml-auto opacity-0 text-[11px] tracking-normal text-dim -translate-x-[3px] transition-[opacity,transform] duration-150 group-hover:opacity-90 group-hover:translate-x-0" aria-hidden="true">
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
    <aside className="sp-side w-[264px] flex-none overflow-y-auto flex flex-col gap-6 bg-[rgba(8,11,11,.6)] p-5 border-r border-white/[.06]">
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
        <span className="mono !text-faint !text-[10px] px-1 max-nav:hidden">Миний цуглуулга</span>

        <div className="flex flex-col gap-2">
          <CollectionTeaser
            label="Дуртай дуунууд"
            accentClass="text-aqua"
            onClick={() => setView("liked")}
            icon={
              <svg className="w-[11px] h-[11px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 21s-7.5-4.9-10-9.2C.3 8.6 2 5 5.5 5c2 0 3.4 1.1 4.2 2.3L12 9.6l2.3-2.3C15.1 6.1 16.5 5 18.5 5 22 5 23.7 8.6 22 11.8 19.5 16.1 12 21 12 21z" />
              </svg>
            }
          />
          {likedTracks.length === 0 ? (
            <div className="flex items-center gap-3 border border-dashed border-white/[.12] rounded-xl p-3.5 bg-white/[.015]">
              <span className="w-10 h-10 flex-none rounded-full flex items-center justify-center text-aqua bg-aqua/10" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21s-7.5-4.9-10-9.2C.3 8.6 2 5 5.5 5c2 0 3.4 1.1 4.2 2.3L12 9.6l2.3-2.3C15.1 6.1 16.5 5 18.5 5 22 5 23.7 8.6 22 11.8 19.5 16.1 12 21 12 21z" />
                </svg>
              </span>
              <p className="text-dim text-[12px] leading-[1.45]">
                <b className="text-ink font-semibold">♥</b> дарсан дуунууд энд харагдана
              </p>
            </div>
          ) : (
            <SideList tracks={likedTracks} curId={curId} playing={playing} onPlay={onPlay} />
          )}
        </div>

        <div className="flex flex-col gap-2 max-nav:hidden">
          <CollectionTeaser
            label="Хадгалсан"
            accentClass="text-warm"
            onClick={() => setView("saved")}
            icon={
              <svg className="w-[11px] h-[11px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6 3h12v18l-6-3.6L6 21V3z" />
              </svg>
            }
          />
          {savedTracks.length === 0 ? (
            <div className="flex items-center gap-3 border border-dashed border-white/[.12] rounded-xl p-3.5 bg-white/[.015]">
              <span className="w-10 h-10 flex-none rounded-full flex items-center justify-center text-warm bg-warm/10" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 2h12a1 1 0 0 1 1 1v19l-7-4.2L5 22V3a1 1 0 0 1 1-1z" />
                </svg>
              </span>
              <p className="text-dim text-[12px] leading-[1.45]">
                <b className="text-ink font-semibold">🔖</b> хадгалсан дуунууд энд харагдана
              </p>
            </div>
          ) : (
            <SideList tracks={savedTracks} curId={curId} playing={playing} onPlay={onPlay} />
          )}
        </div>

        {recentTracks.length > 0 && (
          <div className="flex flex-col gap-2 max-nav:hidden">
            <CollectionTeaser
              label="Саяхан сонссон"
              accentClass="text-dim"
              onClick={() => setView("recent")}
              icon={
                <svg
                  className="w-[11px] h-[11px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7.5V12l3 1.8" />
                </svg>
              }
            />
            <SideList tracks={recentTracks} curId={curId} playing={playing} onPlay={onPlay} />
          </div>
        )}
      </div>
    </aside>
  );
}
