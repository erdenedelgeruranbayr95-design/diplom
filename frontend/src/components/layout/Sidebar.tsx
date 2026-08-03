"use client";

import type { ReactNode } from "react";
import SideList from "@/components/player/SideList";
import { useTrackActions } from "@/components/player/PlayerContext";
import Icon from "@/components/ui/Icon";
import type { PlayerTrack, ViewName } from "@/types/player";

const NAV_ITEMS: { view: ViewName; label: string; icon: string }[] = [
  { view: "home", label: "Нүүр", icon: "home" },
  { view: "playlists", label: "Жагсаалт", icon: "playlist" },
  { view: "stats", label: "Статистик", icon: "chart" },
  { view: "billing", label: "Захиалга", icon: "card" },
];

function CollectionTeaser({
  label,
  onClick,
  accentClass,
  icon,
}: {
  label: string;
  onClick: () => void;
  accentClass: string;
  icon: ReactNode;
}) {
  return (
    <button
      className="group flex items-center w-full text-left gap-3 rounded-2xl px-3 py-3 transition-[background,border-color,transform] duration-150 border border-white/[.06] bg-[rgba(10,14,14,.42)] hover:bg-[rgba(16,23,22,.72)] hover:border-aqua/18 focus-visible:outline-none focus-visible:shadow-glow-aqua"
      onClick={onClick}
      type="button"
    >
      <span
        className={
          "flex h-11 w-11 flex-none items-center justify-center rounded-md border border-white/[.08] bg-white/[.04] transition-colors duration-150 " +
          accentClass
        }
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="mono !text-meta !tracking-[.15em] text-dim transition-colors duration-150 group-hover:!text-ink">{label}</span>
      <span
        className="ml-auto flex items-center text-dim opacity-0 -translate-x-1 transition-[opacity,transform] duration-150 group-hover:opacity-100 group-hover:translate-x-0"
        aria-hidden="true"
      >
        <Icon name="chevronRight" size={13} strokeWidth={2} />
      </span>
    </button>
  );
}

export default function Sidebar({
  view,
  likedTracks,
  savedTracks,
  recentTracks,
}: {
  view: ViewName;
  likedTracks: PlayerTrack[];
  savedTracks: PlayerTrack[];
  recentTracks: PlayerTrack[];
}) {
  /* Тоглуулах/идэвхтэй дуу/дэлгэц солих нь контекстээс — өмнө нь Player-ээс Sidebar
     руу, тэндээс SideList руу 4 prop дамжиж байсныг таслав. */
  const { setView } = useTrackActions();

  return (
    <aside className="sp-side w-[270px] max-nav:w-full flex-none max-nav:flex-none overflow-y-auto flex flex-col gap-6 max-nav:gap-0 bg-[rgba(8,11,11,.68)] p-[22px] max-nav:p-2.5 border-r border-white/[.06] max-nav:border-r-0 max-nav:border-b">
      <nav className="flex flex-col gap-1 max-nav:flex-row max-nav:flex-wrap max-nav:gap-1.5 max-nav:justify-center" aria-label="Үндсэн цэс">
        <span className="mono !text-meta px-3 mb-1 max-nav:hidden">Тоглуулагч</span>
        {NAV_ITEMS.map((item) => {
          const active = view === item.view;
          return (
            <button
              key={item.view}
              className={
                "relative flex items-center gap-3.5 w-full max-nav:w-auto text-left py-3 px-3.5 rounded-2xl text-copy font-medium transition-[background,color,border-color,transform] duration-150 border focus-visible:outline-none focus-visible:shadow-glow-aqua before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[3px] before:rounded-r-full before:transition-[height] before:duration-200 max-nav:before:hidden " +
                (active
                  ? "bg-aqua/[.11] text-aqua border-aqua/20 before:h-[18px] before:bg-aqua"
                  : "border-transparent text-dim hover:bg-white/[.05] hover:text-ink hover:border-white/[.05] before:h-0")
              }
              onClick={() => setView(item.view)}
              aria-current={active ? "page" : undefined}
              type="button"
            >
              <Icon name={item.icon} size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="h-px bg-white/[.06] max-nav:hidden" aria-hidden="true" />

      <div className="flex flex-col gap-3">
        <span className="mono !text-meta px-1 max-nav:hidden">Миний цуглуулга</span>

        <div className="flex flex-col gap-2">
          <CollectionTeaser
            label="Дуртай дуунууд"
            accentClass="text-aqua"
            onClick={() => setView("liked")}
            icon={<Icon name="heart" size={11} variant="fill" />}
          />
          {likedTracks.length > 0 && <SideList tracks={likedTracks} />}
        </div>

        <div className="flex flex-col gap-2 max-nav:hidden">
          <CollectionTeaser
            label="Хадгалсан дуунууд"
            accentClass="text-warm"
            onClick={() => setView("saved")}
            icon={<Icon name="bookmark" size={11} variant="fill" />}
          />
          {savedTracks.length > 0 && <SideList tracks={savedTracks} />}
        </div>

        {recentTracks.length > 0 && (
          <div className="flex flex-col gap-2 max-nav:hidden">
            <CollectionTeaser
              label="Саяхан сонссон"
              accentClass="text-dim"
              onClick={() => setView("recent")}
              icon={<Icon name="clock" size={12} strokeWidth={2} />}
            />
            <SideList tracks={recentTracks} />
          </div>
        )}
      </div>
    </aside>
  );
}
