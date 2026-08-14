"use client";

import type { ReactNode } from "react";
import { useTrackActions } from "@/components/player/PlayerContext";
import Icon from "@/components/ui/Icon";
import type { PlayerTrack, ViewName } from "@/types/player";

const NAV_ITEMS: { view: ViewName; label: string; icon: string }[] = [
  { view: "home", label: "Нүүр", icon: "home" },
  { view: "playlists", label: "Жагсаалт", icon: "playlist" },
  { view: "stats", label: "Статистик", icon: "chart" },
  { view: "billing", label: "Захиалга", icon: "card" },
];

/* Ажилтны самбарууд (ROOT · Админ · Куратор). Урьд нь Landing-ийн Dock дээр
   байсан — одоо зөвхөн Тоглуулагчийн хажуугийн цэсэнд, эрхийн дагуу харагдана.
   Товч нь Player-ийн ГАДНА байрлах overlay самбарыг нээдэг тул `view` төлөвт
   оролцохгүй (aria-current-гүй). */
const PANEL_BTN_CLS =
  "flex items-center gap-3.5 w-full text-left py-3 px-3.5 rounded-2xl text-copy font-medium border transition-[background,color,border-color] duration-150 focus-visible:outline-none focus-visible:shadow-glow-aqua max-nav:w-auto max-nav:flex-1 max-nav:basis-0 max-nav:min-w-[96px] max-nav:justify-center max-nav:gap-2 max-nav:px-2.5";

function PanelButton({
  label,
  icon,
  accentClass,
  onClick,
}: {
  label: string;
  icon: string;
  accentClass: string;
  onClick: () => void;
}) {
  return (
    <button className={PANEL_BTN_CLS + " " + accentClass} onClick={onClick} type="button">
      <Icon name={icon} size={18} />
      {label}
    </button>
  );
}

/* Товч дээр дууны ТОО л харагдана — урьд нь товч бүрийн доор `<SideList>`-ээр
   дуунуудын жагсаалт задарч, хажуугийн самбар хэт урт болдог байв. Дуунуудаа
   харах бол товчийг дарж тусдаа дэлгэц рүү орно. */
function CollectionTeaser({
  label,
  count,
  onClick,
  accentClass,
  icon,
}: {
  label: string;
  count: number;
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
      {/* Дэлгэц уншигчид "Дуртай дуунууд, 3 дуу" гэж бүтнээр нь уншина. */}
      <span className="ml-auto flex items-center gap-1.5">
        <span className="mono !text-meta text-faint transition-colors duration-150 group-hover:text-dim">
          {count}
          <span className="sr-only"> дуу</span>
        </span>
        <span
          className="flex items-center text-dim opacity-0 -translate-x-1 transition-[opacity,transform] duration-150 group-hover:opacity-100 group-hover:translate-x-0"
          aria-hidden="true"
        >
          <Icon name="chevronRight" size={13} strokeWidth={2} />
        </span>
      </span>
    </button>
  );
}

export default function Sidebar({
  view,
  likedTracks,
  savedTracks,
  recentTracks,
  isRoot,
  isAdmin,
  isCurator,
  onRoot,
  onAdmin,
  onCurator,
}: {
  view: ViewName;
  likedTracks: PlayerTrack[];
  savedTracks: PlayerTrack[];
  recentTracks: PlayerTrack[];
  /** Систем эзэмшигч — Root Panel-ийн товч зөвхөн түүнд харагдана. */
  isRoot: boolean;
  isAdmin: boolean;
  /** Куратор/модератор — Curator Panel-ийн товч (ADMIN/ROOT-д ч харагдана). */
  isCurator: boolean;
  onRoot: () => void;
  onAdmin: () => void;
  onCurator: () => void;
}) {
  /* Дэлгэц солих нь контекстээс — өмнө нь Player-ээс Sidebar руу prop дамждаг байв. */
  const { setView } = useTrackActions();

  return (
    <aside className="sp-side w-[270px] max-nav:w-full flex-none max-nav:flex-none overflow-y-auto flex flex-col gap-6 max-nav:gap-0 bg-[rgba(8,11,11,.68)] p-[22px] max-nav:p-2.5 border-r border-white/[.06] max-nav:border-r-0 max-nav:border-b">
      <nav className="flex flex-col gap-1 max-nav:grid max-nav:grid-cols-2 max-nav:gap-1.5" aria-label="Үндсэн цэс">
        <span className="mono !text-meta px-3 mb-1 max-nav:hidden">Тоглуулагч</span>
        {NAV_ITEMS.map((item) => {
          const active = view === item.view;
          return (
            <button
              key={item.view}
              className={
                "relative flex items-center gap-3.5 w-full text-left py-3 px-3.5 rounded-2xl text-copy font-medium transition-[background,color,border-color,transform] duration-150 border focus-visible:outline-none focus-visible:shadow-glow-aqua before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[3px] before:rounded-r-full before:transition-[height] before:duration-200 max-nav:before:hidden " +
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

      {/* Ажилтны самбарууд — эрх байгаа үед л. Жинхэнэ хамгаалалт нь backend-ийн
          RolesGuard; энэ нь зөвхөн харагдац. */}
      {(isRoot || isAdmin || isCurator) && (
        <>
          <div className="h-px bg-white/[.06] max-nav:hidden" aria-hidden="true" />
          <nav
            className="flex flex-col gap-1.5 max-nav:flex-row max-nav:flex-wrap max-nav:gap-1.5 max-nav:mt-1.5"
            aria-label="Удирдлагын самбар"
          >
            <span className="mono !text-meta px-3 mb-1 max-nav:hidden">Удирдлага</span>
            {isRoot && (
              <PanelButton
                label="ROOT"
                icon="gem"
                accentClass="text-rose border-rose/25 bg-rose/[.07] hover:bg-rose/[.16] hover:border-rose/45"
                onClick={onRoot}
              />
            )}
            {isAdmin && (
              <PanelButton
                label="Админ"
                icon="sliders"
                accentClass="text-warm border-warm/25 bg-warm/[.07] hover:bg-warm/[.16] hover:border-warm/45"
                onClick={onAdmin}
              />
            )}
            {isCurator && (
              <PanelButton
                label="Куратор"
                icon="playlist"
                accentClass="text-purple border-purple/25 bg-purple/[.07] hover:bg-purple/[.16] hover:border-purple/45"
                onClick={onCurator}
              />
            )}
          </nav>
        </>
      )}

      <div className="h-px bg-white/[.06] max-nav:hidden" aria-hidden="true" />

      <div className="flex flex-col gap-3">
        <span className="mono !text-meta px-1 max-nav:hidden">Миний цуглуулга</span>

        <CollectionTeaser
          label="Дуртай дуунууд"
          count={likedTracks.length}
          accentClass="text-aqua"
          onClick={() => setView("liked")}
          icon={<Icon name="heart" size={11} variant="fill" />}
        />

        <div className="max-nav:hidden">
          <CollectionTeaser
            label="Хадгалсан дуунууд"
            count={savedTracks.length}
            accentClass="text-warm"
            onClick={() => setView("saved")}
            icon={<Icon name="bookmark" size={11} variant="fill" />}
          />
        </div>

        {recentTracks.length > 0 && (
          <div className="max-nav:hidden">
            <CollectionTeaser
              label="Саяхан сонссон"
              count={recentTracks.length}
              accentClass="text-dim"
              onClick={() => setView("recent")}
              icon={<Icon name="clock" size={12} strokeWidth={2} />}
            />
          </div>
        )}
      </div>
    </aside>
  );
}
