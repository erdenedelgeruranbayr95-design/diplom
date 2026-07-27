"use client";

/* Player.tsx-ийн дээд баар (.sp-top) — Tailwind руу хөрвүүлсэн. notifOpen/settingsOpen/
   profileOpen 3 dropdown-ийн төлөв энд бүрэн internalize хийгдсэн.

   Cascade судалгааны дүгнэлт (эффектив утгууд):
   - .sp-top: ui.css:218-223 нь padding/background-г override хийж, шинэ backdrop-filter blur
     + border-bottom нэмдэг. ≤860px дээр ui.css:389 padding-г дахин override хийдэг ч
     medreh.css:588-ийн gap:12px хэвээр (ui.css mobile блок үүнийг хөндөөгүй).
   - .sp-logo: ui.css:224 desktop font-size-г 19px болгодог, гэхдээ ≤860px дээр ui.css-д
     өрсөлдөгч дүрэм байхгүй тул medreh.css:589-ийн 15px хэвээр ажиллана (max-nav variant хэрэгтэй).
   - .sp-icbtn: ui.css:230-231 background/hover-background override хийнэ; ≤1020px дээр
     38px×38px болдог (medreh.css:807, ui.css-д өрсөлдөгч байхгүй — max-viz variant хэрэгтэй).
   - .sp-search: ui.css:225-229 background/radius/padding/focus-states бүрэн override хийдэг
     (pill 100px → radius-md 13px болж хувирна); ≤1020px дээр max-width:none болдог.
   - .sp-viz: ≤1020px дээр бүрэн disappear (max-viz:hidden).
   - .sp-admbtn: .sp-icbtn дээр нэмэгддэг цэвэр CSS override (background нь .sp-icbtn-ээс,
     color нь .sp-admbtn-ээс), .on үед бүрэн warm өнгөөр солигдоно (aqua-г бүрэн дарна).
   - Dropdown children (NotificationDropdown/SettingsDropdown/ProfileDropdown) болон
     .sp-dd-veil энэ даалгаварт ХАМААГҮЙ — тэдгээрийн дотоод CSS энд хөндөгдөөгүй. */
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
      <header className="sp-top relative z-[6] flex items-center gap-5 max-nav:gap-3 p-[15px_28px] max-nav:p-[12px_16px] bg-[rgba(9,12,12,.72)] backdrop-blur-3xl [backdrop-filter:blur(22px)_saturate(1.2)] border-b border-[rgba(255,255,255,.06)]">
        <span className="font-display font-extrabold text-[19px] max-nav:text-[15px] tracking-[-.04em] whitespace-nowrap [&>sup]:font-body [&>sup]:text-[9px] [&>sup]:font-medium [&>sup]:ml-0.5">
          МЭДРЭХ<sup>®</sup>
          {isAdmin && (
            <em className="not-italic font-mono text-[8.5px] tracking-[.2em] text-warm border border-[rgba(217,165,76,.45)] rounded-full py-[3px] px-[9px] ml-2.5 align-[3px]">
              АДМИН
            </em>
          )}
        </span>

        <div className="flex-1 flex items-center justify-center gap-3.5 min-w-0">
          <button
            className={
              "w-[42px] h-[42px] max-viz:w-[38px] max-viz:h-[38px] flex-none rounded-full flex items-center justify-center transition-[color,background,box-shadow] duration-[250ms] cursor-none focus-visible:shadow-glow-aqua disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none " +
              (view === "home" ? "text-aqua bg-[rgba(56,232,206,.12)]" : "text-dim bg-white/[.05] hover:text-ink hover:bg-white/10")
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
          <div className="flex-1 max-w-[440px] max-viz:max-w-none mx-auto flex items-center gap-3 bg-white/[.055] border border-transparent rounded-md p-[12px_18px] text-dim transition-[border-color,background,box-shadow] duration-300 focus-within:bg-white/[.085] focus-within:border-[rgba(56,232,206,.6)] focus-within:shadow-glow-aqua">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
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
              className="flex-1 bg-none border-none text-ink font-body text-[14.5px] cursor-none outline-none placeholder:text-faint"
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

        <div className="flex items-center gap-3.5">
          {!subscribed && (
            <button
              className="rounded-full text-[13px] font-semibold border border-aqua bg-aqua text-[#04100E] transition-[background,color,border-color,box-shadow,transform] duration-300 py-2.5 px-5 will-change-transform cursor-none hover:bg-[#6FF3DE] hover:border-[#6FF3DE] hover:text-[#04100E] hover:shadow-sm hover:-translate-y-px active:translate-y-0 focus-visible:shadow-glow-aqua"
              onClick={onSubscribe}
            >
              Захиалга авах
            </button>
          )}

          {/* админы хяналтын самбар руу */}
          {isAdmin && (
            <button
              className={
                "w-[42px] h-[42px] max-viz:w-[38px] max-viz:h-[38px] flex-none rounded-full flex items-center justify-center transition-[color,background,box-shadow] duration-[250ms] cursor-none focus-visible:shadow-glow-aqua bg-white/[.05] hover:bg-white/10 " +
                (view === "admin" ? "text-warm bg-[rgba(217,165,76,.14)]" : "text-warm")
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
                "w-[42px] h-[42px] max-viz:w-[38px] max-viz:h-[38px] flex-none rounded-full flex items-center justify-center transition-[color,background,box-shadow] duration-[250ms] cursor-none focus-visible:shadow-glow-aqua bg-white/[.05] hover:bg-white/10 " +
                (view === "therapist" ? "text-warm bg-[rgba(217,165,76,.14)]" : "text-warm")
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
                "w-[42px] h-[42px] max-viz:w-[38px] max-viz:h-[38px] flex-none rounded-full flex items-center justify-center transition-[color,background,box-shadow] duration-[250ms] cursor-none focus-visible:shadow-glow-aqua bg-white/[.05] hover:bg-white/10 " +
                (view === "parent" ? "text-warm bg-[rgba(217,165,76,.14)]" : "text-warm")
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

          <button className="static text-dim text-sm p-1.5 transition-colors duration-[250ms] hover:text-ink" onClick={onClose} aria-label="Хаах">
            ✕
          </button>
        </div>
      </header>

      {dropdown !== null && <div className="fixed inset-0 z-[4]" onClick={() => setDropdown(null)}></div>}
    </>
  );
}
