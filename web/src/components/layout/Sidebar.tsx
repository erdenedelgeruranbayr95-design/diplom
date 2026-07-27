"use client";

/* Player.tsx-ийн зүүн навигацийн багана (.sp-side/.sp-navcol) — Tailwind руу хөрвүүлсэн.
   likes/saves/recent-тэй холбоотой тул Player.tsx бодогдсон likedTracks/savedTracks/
   recentTracks derived array-уудыг props-оор авна.

   Cascade судалгааны дүгнэлт (эффектив утгууд):
   - .sp-side: ui.css:234-237-ийн unconditional дүрэм (w=256px, bg=rgba(6,8,8,.55),
     border-right=rgba(255,255,255,.05), padding=28px 16px) нь medreh.css-ийн 860px mobile
     responsive override-г бүхэлд нь "үхмэл" болгодог (ui.css нь дараа импортлогддог бөгөөд
     mobile override нэмээгүй тул desktop утга бүх өргөнд хэвээр үлдэнэ) — тиймээс энд ямар ч
     responsive variant ХЭРЭГГҮЙ.
   - .sp-navcol/.sp-navitem/.sp-navdiv: цэвэр ui.css-ийн класс (medreh.css-д байхгүй), 860px
     mobile-д bodit-оор өөрчлөгддөг (ui.css:390-392) тул энд max-nav: variant хэрэгтэй.
   - .sp-side-h: .mono-ийн letter-spacing(.24em)/color(dim) дээр ui.css:238 override хийж
     .18em/faint болгодог — эффектив утгыг шууд ашигласан.
   - `sp-side`/`sp-main` classname-үүд custom scrollbar CSS (webkit-scrollbar)-ийн төлөө
     ЗОРИУДААР хэвээр үлдсэн (Tailwind-д native scrollbar utility байхгүй). */
import SideList from "@/components/player/SideList";
import type { ViewName, PlayerTrack } from "@/components/player/Player";

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
    <aside className="sp-side w-[256px] flex-none overflow-y-auto flex flex-col gap-3 bg-[rgba(6,8,8,.55)] p-[28px_16px] border-r border-[rgba(255,255,255,.05)]">
      <nav className="flex flex-col gap-1 max-nav:flex-row max-nav:flex-wrap" aria-label="Үндсэн цэс">
        <button
          className={
            "flex items-center gap-[13px] w-full max-nav:w-auto text-left py-[11px] px-3.5 rounded-xl text-[14.5px] font-medium transition-[background,color] duration-200 [&>svg]:w-5 [&>svg]:h-5 [&>svg]:flex-none " +
            (view === "home" ? "bg-[rgba(56,232,206,.13)] text-aqua" : "text-dim hover:bg-white/[.06] hover:text-ink")
          }
          onClick={() => setView("home")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 10.5 12 3l9 7.5" />
            <path d="M5 9.5V21h14V9.5" />
          </svg>
          Нүүр
        </button>
        <button
          className={
            "flex items-center gap-[13px] w-full max-nav:w-auto text-left py-[11px] px-3.5 rounded-xl text-[14.5px] font-medium transition-[background,color] duration-200 [&>svg]:w-5 [&>svg]:h-5 [&>svg]:flex-none " +
            (view === "playlists" ? "bg-[rgba(56,232,206,.13)] text-aqua" : "text-dim hover:bg-white/[.06] hover:text-ink")
          }
          onClick={() => setView("playlists")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 14v-2a9 9 0 0 1 18 0v2" />
            <rect x="3" y="14" width="4" height="6" rx="2" />
            <rect x="17" y="14" width="4" height="6" rx="2" />
          </svg>
          Жагсаалт
        </button>
        <button
          className={
            "flex items-center gap-[13px] w-full max-nav:w-auto text-left py-[11px] px-3.5 rounded-xl text-[14.5px] font-medium transition-[background,color] duration-200 [&>svg]:w-5 [&>svg]:h-5 [&>svg]:flex-none " +
            (view === "stats" ? "bg-[rgba(56,232,206,.13)] text-aqua" : "text-dim hover:bg-white/[.06] hover:text-ink")
          }
          onClick={() => setView("stats")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v18h18" />
            <path d="M8 17v-5M13 17V9M18 17v-8" />
          </svg>
          Статистик
        </button>
        <button
          className={
            "flex items-center gap-[13px] w-full max-nav:w-auto text-left py-[11px] px-3.5 rounded-xl text-[14.5px] font-medium transition-[background,color] duration-200 [&>svg]:w-5 [&>svg]:h-5 [&>svg]:flex-none " +
            (view === "billing" ? "bg-[rgba(56,232,206,.13)] text-aqua" : "text-dim hover:bg-white/[.06] hover:text-ink")
          }
          onClick={() => setView("billing")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <path d="M2 10h20" />
          </svg>
          Захиалга
        </button>
      </nav>
      <div className="h-px bg-[rgba(255,255,255,.07)] m-[14px_6px_6px] max-nav:hidden" aria-hidden="true"></div>

      <button
        className="mono !tracking-[.18em] !text-faint mt-2.5 first:mt-0 flex items-center w-full bg-none border-0 py-0.5 px-0 cursor-pointer transition-colors duration-150 hover:text-ink group"
        onClick={() => setView("liked")}
      >
        <svg className="w-[11px] h-[11px] align-[-1px] mr-1 text-aqua" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 21s-7.5-4.9-10-9.2C.3 8.6 2 5 5.5 5c2 0 3.4 1.1 4.2 2.3L12 9.6l2.3-2.3C15.1 6.1 16.5 5 18.5 5 22 5 23.7 8.6 22 11.8 19.5 16.1 12 21 12 21z" />
        </svg>
        Дуртай дуунууд
        <span className="ml-auto opacity-0 text-[11px] tracking-normal -translate-x-[3px] transition-[opacity,transform] duration-150 group-hover:opacity-90 group-hover:translate-x-0" aria-hidden="true">
          →
        </span>
      </button>
      {likedTracks.length === 0 ? (
        <div className="flex items-center gap-[13px] border border-dashed border-[rgba(242,245,244,.18)] rounded-[11px] p-[15px_14px] bg-white/[.015]">
          <span className="w-[46px] h-[46px] flex-none rounded-full flex items-center justify-center text-aqua bg-[rgba(56,232,206,.1)] shadow-[0_0_22px_rgba(56,232,206,.14)]" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21s-7.5-4.9-10-9.2C.3 8.6 2 5 5.5 5c2 0 3.4 1.1 4.2 2.3L12 9.6l2.3-2.3C15.1 6.1 16.5 5 18.5 5 22 5 23.7 8.6 22 11.8 19.5 16.1 12 21 12 21z" />
            </svg>
          </span>
          <p className="text-dim text-[12.5px] leading-[1.5]">
            Дууны{" "}
            <b className="text-ink font-semibold">
              <svg className="w-[13px] h-[13px] align-[-2px] mr-px text-aqua" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 21s-7.5-4.9-10-9.2C.3 8.6 2 5 5.5 5c2 0 3.4 1.1 4.2 2.3L12 9.6l2.3-2.3C15.1 6.1 16.5 5 18.5 5 22 5 23.7 8.6 22 11.8 19.5 16.1 12 21 12 21z" />
              </svg>{" "}
              зүрхэн
            </b>{" "}
            дээр дарахад дуртай дуу чинь энд цуглана
          </p>
        </div>
      ) : (
        <SideList tracks={likedTracks} curId={curId} playing={playing} onPlay={onPlay} />
      )}

      <button
        className="mono !tracking-[.18em] !text-faint mt-2.5 flex items-center w-full bg-none border-0 py-0.5 px-0 cursor-pointer transition-colors duration-150 hover:text-ink group max-nav:hidden"
        onClick={() => setView("saved")}
      >
        <svg className="w-[11px] h-[11px] align-[-1px] mr-1 text-warm" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M6 3h12v18l-6-3.6L6 21V3z" />
        </svg>
        Хадгалсан
        <span className="ml-auto opacity-0 text-[11px] tracking-normal -translate-x-[3px] transition-[opacity,transform] duration-150 group-hover:opacity-90 group-hover:translate-x-0" aria-hidden="true">
          →
        </span>
      </button>
      {savedTracks.length === 0 ? (
        <div className="flex items-center gap-[13px] border border-dashed border-[rgba(242,245,244,.18)] rounded-[11px] p-[15px_14px] bg-white/[.015]">
          <span className="w-5 h-5 flex-none rounded-full flex items-center justify-center text-warm bg-[rgba(217,165,76,.12)] shadow-[0_0_22px_rgba(217,165,76,.14)]" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 2h12a1 1 0 0 1 1 1v19l-7-4.2L5 22V3a1 1 0 0 1 1-1z" />
            </svg>
          </span>
          <p className="text-dim text-[12.5px] leading-[1.5]">
            Дууг{" "}
            <b className="text-ink font-semibold">
              <svg className="w-[13px] h-[13px] align-[-2px] mr-px text-warm" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6 3h12v18l-6-3.6L6 21V3z" />
              </svg>{" "}
              хадгалах
            </b>{" "}
            товчоор тэмдэглээд дараа нь сонсоорой
          </p>
        </div>
      ) : (
        <SideList tracks={savedTracks} curId={curId} playing={playing} onPlay={onPlay} />
      )}

      {recentTracks.length > 0 && (
        <>
          <button
            className="mono !tracking-[.18em] !text-faint mt-2.5 flex items-center w-full bg-none border-0 py-0.5 px-0 cursor-pointer transition-colors duration-150 hover:text-ink group max-nav:hidden"
            onClick={() => setView("recent")}
          >
            <svg
              className="w-[11px] h-[11px] align-[-1px] mr-1"
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
            Саяхан сонссон
            <span className="ml-auto opacity-0 text-[11px] tracking-normal -translate-x-[3px] transition-[opacity,transform] duration-150 group-hover:opacity-90 group-hover:translate-x-0" aria-hidden="true">
              →
            </span>
          </button>
          <SideList tracks={recentTracks} curId={curId} playing={playing} onPlay={onPlay} />
        </>
      )}
    </aside>
  );
}
