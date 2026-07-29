"use client";

/* Дээд баар — премиум SaaS TopBar руу шинэчлэв (илүү өндөр, тодорхой page-title/logo
   ялгаа, цэвэр search pill, icon товчнуудын нийцтэй зай). notifOpen/settingsOpen/
   profileOpen 3 dropdown-ийн state/ESC-handler логик бүхэлдээ хэвээр — зөвхөн визуал
   давхарга шинэчлэгдсэн, ямар ч prop/callback/wiring өөрчлөгдөөгүй. */
import { useEffect, useState } from "react";
import type { MutableRefObject } from "react";
import type { SessionUser } from "@/types/auth";
import type { FeedItem } from "@/types/track";
import type { ViewName, Prefs } from "@/components/player/Player";
import NotificationDropdown from "@/components/player/NotificationDropdown";
import SettingsDropdown from "@/components/player/SettingsDropdown";
import ProfileDropdown from "@/components/player/ProfileDropdown";

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
  useEffect(() => {
    if (dropdown === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.stopPropagation();
      setDropdown(null);
    };
    addEventListener("keydown", onKey, { capture: true });
    return () => removeEventListener("keydown", onKey, { capture: true });
  }, [dropdown]);

  function toggleNotifs() {
    const opening = dropdown !== "notifs";
    setDropdown(opening ? "notifs" : null);
    if (opening) onOpenNotifs();
  }

  return (
    <>
      <header className="relative z-[6] flex items-center gap-6 max-nav:gap-3 h-[68px] px-7 max-nav:px-4 bg-[rgba(9,12,12,.78)] backdrop-blur-3xl [backdrop-filter:blur(22px)_saturate(1.2)] border-b border-white/[.07]">
        <span className="font-display font-extrabold text-[18px] max-nav:text-[15px] tracking-[-.04em] whitespace-nowrap [&>sup]:font-body [&>sup]:text-[9px] [&>sup]:font-medium [&>sup]:ml-0.5">
          МЭДРЭХ<sup>®</sup>
          {isAdmin && (
            <em className="not-italic font-mono text-[8.5px] tracking-[.2em] text-warm border border-warm/45 rounded-full py-[3px] px-[9px] ml-2.5 align-[3px]">
              АДМИН
            </em>
          )}
        </span>

        <div className="flex-1 flex items-center justify-center gap-3.5 min-w-0">
          <button
            className={
              "w-[42px] h-[42px] max-viz:w-[38px] max-viz:h-[38px] flex-none rounded-full flex items-center justify-center transition-[color,background,box-shadow] duration-250 cursor-none focus-visible:outline-none focus-visible:shadow-glow-aqua disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none " +
              (view === "home" ? "text-aqua bg-aqua/[.12]" : "text-dim bg-white/[.05] hover:text-ink hover:bg-white/10")
            }
            onClick={() => setView("home")}
            aria-label="Нүүр"
            title="Нүүр"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 10.5 12 3l9 7.5" />
              <path d="M5 9.5V21h14V9.5" />
            </svg>
          </button>
          <div className="flex-1 max-w-[460px] max-viz:max-w-none mx-auto flex items-center gap-3 h-11 bg-white/[.05] border border-white/[.06] rounded-full px-4 text-dim transition-[border-color,background,box-shadow] duration-300 focus-within:bg-white/[.08] focus-within:border-aqua/60 focus-within:shadow-glow-aqua">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="flex-none">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.5" y2="16.5" />
            </svg>
            <input
              type="search"
              placeholder="Юу сонсмоор байна?"
              value={query}
              onFocus={() => setView("home")}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Дуу хайх"
              className="flex-1 bg-transparent border-none text-ink font-body text-[14px] cursor-none outline-none placeholder:text-faint [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden appearance-none"
            />
          </div>
          <div className="max-viz:hidden flex items-end gap-[3px] h-6 w-[34px] flex-none" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <i
                key={i}
                className="flex-1 bg-aqua rounded-[2px] h-[3px] opacity-85 transition-[height] duration-100 ease-linear"
                ref={(el) => {
                  vizRef.current[i] = el;
                }}
              ></i>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!subscribed && (
            <button
              className="rounded-full text-[13px] font-semibold border border-aqua bg-aqua text-[#04100E] transition-[background,color,border-color,box-shadow,transform] duration-300 py-2.5 px-5 will-change-transform cursor-none hover:bg-[#6FF3DE] hover:border-[#6FF3DE] hover:text-[#04100E] hover:shadow-sm hover:-translate-y-px active:translate-y-0 focus-visible:outline-none focus-visible:shadow-glow-aqua"
              onClick={onSubscribe}
            >
              Захиалга авах
            </button>
          )}

          {/* админы хяналтын самбар руу */}
          {isAdmin && (
            <button
              className={
                "w-[42px] h-[42px] max-viz:w-[38px] max-viz:h-[38px] flex-none rounded-full flex items-center justify-center transition-[color,background,box-shadow] duration-250 cursor-none focus-visible:outline-none focus-visible:shadow-glow-warm bg-white/[.05] hover:bg-white/10 " +
                (view === "admin" ? "text-warm bg-warm/[.14]" : "text-warm")
              }
              onClick={() => setView("admin")}
              aria-label="Хяналтын самбар"
              title="Хяналтын самбар"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="9" rx="1.5" />
                <rect x="14" y="3" width="7" height="5" rx="1.5" />
                <rect x="14" y="12" width="7" height="9" rx="1.5" />
                <rect x="3" y="16" width="7" height="5" rx="1.5" />
              </svg>
            </button>
          )}

          {/* эмчийн самбар руу */}
          {isTherapist && (
            <button
              className={
                "w-[42px] h-[42px] max-viz:w-[38px] max-viz:h-[38px] flex-none rounded-full flex items-center justify-center transition-[color,background,box-shadow] duration-250 cursor-none focus-visible:outline-none focus-visible:shadow-glow-warm bg-white/[.05] hover:bg-white/10 " +
                (view === "therapist" ? "text-warm bg-warm/[.14]" : "text-warm")
              }
              onClick={() => setView("therapist")}
              aria-label="Эмчийн самбар"
              title="Эмчийн самбар"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </button>
          )}

          {/* эцэг эхийн самбар руу */}
          {isParent && (
            <button
              className={
                "w-[42px] h-[42px] max-viz:w-[38px] max-viz:h-[38px] flex-none rounded-full flex items-center justify-center transition-[color,background,box-shadow] duration-250 cursor-none focus-visible:outline-none focus-visible:shadow-glow-warm bg-white/[.05] hover:bg-white/10 " +
                (view === "parent" ? "text-warm bg-warm/[.14]" : "text-warm")
              }
              onClick={() => setView("parent")}
              aria-label="Эцэг эхийн самбар"
              title="Эцэг эхийн самбар"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20.5s-7-4.35-9.5-8.5C.5 8.5 2.5 5 6 5c2 0 3.5 1 4 2 .5-1 2-2 4-2 3.5 0 5.5 3.5 3.5 7-2.5 4.15-9.5 8.5-9.5 8.5z" />
              </svg>
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

          <button className="w-9 h-9 flex-none rounded-full flex items-center justify-center text-dim text-sm transition-colors duration-250 hover:text-ink hover:bg-white/[.06] focus-visible:outline-none focus-visible:shadow-glow-aqua ml-1" onClick={onClose} aria-label="Хаах">
            ✕
          </button>
        </div>
      </header>

      {dropdown !== null && <div className="fixed inset-0 z-[4]" onClick={() => setDropdown(null)}></div>}
    </>
  );
}
