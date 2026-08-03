"use client";

/* Дээд баар — премиум SaaS TopBar руу шинэчлэв (илүү өндөр, тодорхой page-title/logo
   ялгаа, цэвэр search pill, icon товчнуудын нийцтэй зай). notifOpen/settingsOpen/
   profileOpen 3 dropdown-ийн state/ESC-handler логик бүхэлдээ хэвээр — зөвхөн визуал
   давхарга шинэчлэгдсэн, ямар ч prop/callback/wiring өөрчлөгдөөгүй. */
import { useState } from "react";
import type { MutableRefObject } from "react";
import { useWindowEvent } from "@/hooks/useWindowEvent";
import type { SessionUser } from "@/types/auth";
import type { FeedItem } from "@/types/track";
import type { ViewName, Prefs } from "@/types/player";
import NotificationDropdown from "@/components/player/NotificationDropdown";
import SettingsDropdown from "@/components/player/SettingsDropdown";
import ProfileDropdown from "@/components/player/ProfileDropdown";
import Icon from "@/components/ui/Icon";

/* Icon товчнуудын нийтлэг класс — 5 газар (нүүр/админ/эмч/эцэг эх/хаах) бүр өөрөөр
   бичигдсэн байсныг нэгтгэв: ижил хэмжээ, ижил hit-area, ижил transition. */
const ICON_BTN =
  "w-[42px] h-[42px] max-viz:w-[38px] max-viz:h-[38px] flex-none rounded-full flex items-center justify-center transition-[color,background,box-shadow] duration-250 cursor-none focus-visible:outline-none disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none";

export default function TopBar({
  view,
  setView,
  query,
  setQuery,
  vizRef,
  user,
  isAdmin,
  isTherapist,
  isParent,
  subscribed,
  onSubscribe,
  onLogout,
  onClose,
  feed,
  readTs,
  onOpenNotifs,
  prefs,
  updatePrefs,
  setCalibOpen,
  renewDate,
}: {
  view: ViewName;
  setView: (v: ViewName) => void;
  query: string;
  setQuery: (q: string) => void;
  vizRef: MutableRefObject<(HTMLElement | null)[]>;
  user: SessionUser | null;
  isAdmin: boolean;
  isTherapist: boolean;
  isParent: boolean;
  subscribed: boolean;
  onSubscribe: () => void;
  onLogout: () => void;
  onClose: () => void;
  feed: FeedItem[];
  readTs: number;
  onOpenNotifs: () => void;
  prefs: Prefs;
  updatePrefs: (patch: Partial<Prefs>) => void;
  setCalibOpen: (v: boolean) => void;
  renewDate: string;
}) {
  const [dropdown, setDropdown] = useState<"notifs" | "settings" | "profile" | null>(null);

  const unread = feed.filter((f) => f.date > readTs).length;

  /* ESC дарахад энэ dropdown-уудыг эхэлж хаана — Player.tsx-ийн глобал ESC handler-т хүрэхээс
     өмнө stopPropagation хийж, "Нүүр рүү буцах"/цонх хаах шатанд шилжихгүй байхыг баталгаажуулна
     (dropdown нээлттэй үеийн өмнөх зан төлөвийг хадгална). */
  useWindowEvent(
    "keydown",
    (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.stopPropagation();
      setDropdown(null);
    },
    { enabled: dropdown !== null, capture: true },
  );

  function toggleNotifs() {
    const opening = dropdown !== "notifs";
    setDropdown(opening ? "notifs" : null);
    if (opening) onOpenNotifs();
  }

  return (
    <>
      <header className="relative z-[6] flex flex-wrap items-center gap-6 max-nav:gap-y-2.5 max-nav:gap-x-3 max-nav:h-auto max-nav:py-2.5 h-[70px] px-6 max-nav:px-3.5 bg-[rgba(9,12,12,.78)] backdrop-blur-3xl [backdrop-filter:blur(22px)_saturate(1.2)] border-b border-white/[.07]">
        <span className="font-display font-extrabold text-heading max-nav:text-lead tracking-[-.04em] whitespace-nowrap [&>sup]:font-body [&>sup]:text-micro [&>sup]:font-medium [&>sup]:ml-0.5">
          МЭДРЭХ<sup>®</sup>
          {isAdmin && (
            <em className="not-italic font-mono text-micro tracking-[.2em] text-warm border border-warm/45 rounded-full py-[3px] px-[9px] ml-2.5 align-[3px] max-nav:hidden">
              АДМИН
            </em>
          )}
        </span>

        {/* Mobile (≤860px) дээр хайлт бүрэн өргөнөөрөө ДООД эгнээнд шилжинэ — лого +
            эрхийн товчнуудтай нэг эгнээнд багтаахад input хэт нарийсаж, лого/subscribe
            товчтой давхцаж байсныг эндээс засав (order-3 + basis-full). */}
        <div className="flex-1 flex items-center justify-center gap-3.5 min-w-0 max-nav:order-3 max-nav:basis-full max-nav:justify-start">
          <button
            className={
              ICON_BTN +
              " focus-visible:shadow-glow-aqua max-nav:hidden " +
              (view === "home" ? "text-aqua bg-aqua/[.12]" : "text-dim bg-white/[.05] hover:text-ink hover:bg-white/10")
            }
            onClick={() => setView("home")}
            aria-label="Нүүр"
            title="Нүүр"
          >
            <Icon name="home" size={19} />
          </button>
          <div className="flex-1 max-w-[500px] max-viz:max-w-none mx-auto flex items-center gap-3 h-[46px] max-nav:h-10 bg-white/[.05] border border-white/[.07] rounded-full px-[18px] max-nav:px-3.5 text-dim transition-[border-color,background,box-shadow] duration-300 focus-within:bg-white/[.08] focus-within:border-aqua/60 focus-within:shadow-glow-aqua">
            <Icon name="search" size={17} />
            <input
              type="search"
              placeholder="Юу сонсмоор байна?"
              value={query}
              onFocus={() => setView("home")}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Дуу хайх"
              className="flex-1 bg-transparent border-none text-ink font-body text-copy cursor-none outline-none placeholder:text-faint [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden appearance-none"
            />
          </div>
          <div className="max-viz:hidden flex items-end gap-[3px] h-6 w-[34px] flex-none" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <i
                key={i}
                className="flex-1 bg-aqua rounded-bar h-[3px] opacity-85 transition-[height] duration-100 ease-linear"
                ref={(el) => {
                  vizRef.current[i] = el;
                }}
              ></i>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3.5 max-nav:gap-2 max-nav:ml-auto">
          {!subscribed && (
            <button
              className="rounded-full text-body font-semibold border border-aqua bg-aqua text-on-aqua transition-[background,color,border-color,box-shadow,transform] duration-300 py-2.5 px-[22px] max-nav:py-0 max-nav:px-0 max-nav:w-10 max-nav:h-10 max-nav:text-[0px] will-change-transform cursor-none hover:bg-aqua-hover hover:border-aqua-hover hover:text-on-aqua hover:shadow-sm hover:-translate-y-px active:translate-y-0 focus-visible:outline-none focus-visible:shadow-glow-aqua"
              onClick={onSubscribe}
              aria-label="Захиалга авах"
              title="Захиалга авах"
            >
              <span className="max-nav:hidden">Захиалга авах</span>
              <span className="hidden max-nav:inline" aria-hidden="true">
                <Icon name="card" size={17} />
              </span>
            </button>
          )}

          {/* Дүрийн самбарууд — icon-ууд семантикаараа тааруулсан (эмч→стетоскоп,
              эцэг эх→том/жижиг дүр). Өмнө нь эмч дээр "хоёр хүн", эцэг эх дээр "зүрх"
              байсан нь дашбоардын KPI icon-уудтай зөрж байв. */}
          {isAdmin && (
            <button
              className={
                ICON_BTN + " focus-visible:shadow-glow-warm bg-white/[.05] hover:bg-white/10 " + (view === "admin" ? "text-warm bg-warm/[.14]" : "text-warm")
              }
              onClick={() => setView("admin")}
              aria-label="Хяналтын самбар"
              title="Хяналтын самбар"
            >
              <Icon name="grid" size={19} />
            </button>
          )}

          {isTherapist && (
            <button
              className={
                ICON_BTN + " focus-visible:shadow-glow-warm bg-white/[.05] hover:bg-white/10 " + (view === "therapist" ? "text-warm bg-warm/[.14]" : "text-warm")
              }
              onClick={() => setView("therapist")}
              aria-label="Эмчийн самбар"
              title="Эмчийн самбар"
            >
              <Icon name="stethoscope" size={19} />
            </button>
          )}

          {isParent && (
            <button
              className={
                ICON_BTN + " focus-visible:shadow-glow-warm bg-white/[.05] hover:bg-white/10 " + (view === "parent" ? "text-warm bg-warm/[.14]" : "text-warm")
              }
              onClick={() => setView("parent")}
              aria-label="Эцэг эхийн самбар"
              title="Эцэг эхийн самбар"
            >
              <Icon name="family" size={19} />
            </button>
          )}

          <NotificationDropdown open={dropdown === "notifs"} unread={unread} feed={feed} readTs={readTs} onToggle={toggleNotifs} />

          <SettingsDropdown
            open={dropdown === "settings"}
            prefs={prefs}
            updatePrefs={updatePrefs}
            onToggle={() => setDropdown(dropdown === "settings" ? null : "settings")}
            onCalibrate={() => {
              setDropdown(null);
              setCalibOpen(true);
            }}
          />

          <ProfileDropdown
            open={dropdown === "profile"}
            user={user}
            isAdmin={isAdmin}
            isTherapist={isTherapist}
            isParent={isParent}
            subscribed={subscribed}
            renewDate={renewDate}
            setView={setView}
            onLogout={onLogout}
            onToggle={() => setDropdown(dropdown === "profile" ? null : "profile")}
          />

          {/* "✕" текст глиф → SVG: фонт/OS хамаарлаас чөлөөтэй, бусад icon-той ижил
              зузаан/бөөрөнхийлөлт. Hit-area 40px (WCAG 2.5.8 target size). */}
          <button
            className="w-11 h-11 flex-none rounded-full flex items-center justify-center text-dim transition-colors duration-250 hover:text-ink hover:bg-white/[.07] focus-visible:outline-none focus-visible:shadow-glow-aqua ml-0.5"
            onClick={onClose}
            aria-label="Хаах"
            title="Хаах"
          >
            <Icon name="close" size={17} />
          </button>
        </div>
      </header>

      {dropdown !== null && <div className="fixed inset-0 z-[4]" onClick={() => setDropdown(null)}></div>}
    </>
  );
}
