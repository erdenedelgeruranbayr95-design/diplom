"use client";

/* Дэлгэгддэг «Мэдрэх самбар» (Now-Playing) — премиум panel маягаар шинэчлэв.
   Амьд 8 бүсийн meter + чичиргээний хэв маяг + бүс toggle + Мэдрэх горим.
   barsRef нь Player.tsx-ийн useRef — RAF loop 8 баганы өндрийг шууд бичдэг тул
   энд ШИНЭ useRef БҮҮ үүсгэ. Бусад бүх prop/callback хэвээр. */
import type { MutableRefObject } from "react";
import { FEEL, FEEL_DEFAULT } from "@/lib/player/constants";
import { ActionButton } from "@/components/ui/ActionGroup";
import type { Track } from "@/types/track";

const BANDS: [string, string][] = [
  ["bass", "Бас"],
  ["mid", "Дунд"],
  ["high", "Өндөр"],
];

interface Prefs {
  vib: number;
  light: number;
  bands: Record<string, boolean>;
  calibrated: boolean;
}

export default function NowPlayingPanel({
  open,
  track,
  prefs,
  onToggleBand,
  vibro,
  onToggleVibro,
  onImmersive,
  onClose,
  barsRef,
}: {
  open: boolean;
  track: Track | null;
  prefs: Prefs;
  onToggleBand: (k: string) => void;
  vibro: boolean;
  onToggleVibro: () => void;
  onImmersive: () => void;
  onClose: () => void;
  barsRef: MutableRefObject<(HTMLSpanElement | null)[]>;
}) {
  if (!open || !track) return null;
  const f = FEEL[track.genre] || FEEL_DEFAULT;
  const tot = f.pattern.reduce((a, b) => a + b, 0);

  return (
    <div
      className="fixed left-0 right-0 bottom-[86px] max-nav:bottom-[70px] z-[4] bg-[rgba(10,16,15,.97)] backdrop-blur-3xl border-t border-aqua/[.18] shadow-[0_-18px_50px_rgba(0,0,0,.5)] [animation:npup_.28s_cubic-bezier(.16,.8,.24,1)]"
      role="dialog"
      aria-label="Мэдрэх самбар"
    >
      <div className="max-w-[1100px] mx-auto p-5 max-nav:p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="mono">Мэдрэх самбар — амьд</span>
          <button
            className="w-8 h-8 rounded-lg flex items-center justify-center text-dim border border-line bg-transparent cursor-pointer transition-colors duration-150 hover:text-ink hover:border-white/25 focus-visible:outline-none focus-visible:shadow-glow-aqua"
            onClick={onClose}
            aria-label="Самбар хаах"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-[1.25fr_1fr] max-nav:grid-cols-1 gap-6 items-stretch">
          <div className="col-span-full flex items-center gap-3">
            <img src={track.cover} alt="" className="w-[46px] h-[46px] rounded-lg object-cover flex-none" />
            <div>
              <b className="text-[15px] font-semibold block">{track.title}</b>
              <i className="text-[12.5px] text-dim not-italic">
                {track.artist} · {track.genre}
              </i>
            </div>
          </div>

          {/* амьд 8 бүсийн meter — RAF loop-оос удирдагдана */}
          <div
            className="flex items-end gap-2 h-[104px] border border-line rounded-xl p-3.5 bg-black/[.28]"
            aria-label="Амьд давтамжийн спектр"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="flex-1 min-h-[5px] h-[5px] rounded-t-[4px] bg-[linear-gradient(180deg,var(--aqua),rgba(56,232,206,.08))] transition-[height] duration-[90ms] ease-linear"
                ref={(el) => {
                  barsRef.current[i] = el;
                }}
              ></span>
            ))}
          </div>

          <div className="flex flex-col gap-[7px] justify-center">
            <span className="mono !text-[9px]">Чичиргээний хэв маяг</span>
            <div className="flex items-center h-[26px] border border-line rounded-[9px] px-2.5 bg-[rgba(20,28,27,.4)] mb-1" aria-hidden="true">
              {f.pattern.map((ms, i) =>
                i % 2 === 0 ? (
                  <i key={i} className="block h-3 rounded-[3px] bg-aqua shadow-[0_0_8px_rgba(56,232,206,.4)]" style={{ flex: ms / tot + " 0 0" }}></i>
                ) : (
                  <u key={i} className="block h-0.5 bg-[rgba(242,245,244,.18)]" style={{ flex: ms / tot + " 0 0" }}></u>
                ),
              )}
            </div>

            <span className="mono !text-[9px]">Мэдрэх бүс</span>
            <div className="grid grid-cols-3 gap-1.5 mb-1.5" role="group" aria-label="Мэдрэх давтамжийн бүс">
              {BANDS.map(([k, lbl]) => (
                <button
                  key={k}
                  className={
                    "py-2.5 px-1 text-[12.5px] text-dim border border-line rounded-lg transition-colors duration-150 " +
                    (prefs.bands[k] ? "text-aqua border-aqua/50 bg-aqua/[.07]" : "hover:border-white/20 hover:text-ink")
                  }
                  onClick={() => onToggleBand(k)}
                  aria-pressed={prefs.bands[k]}
                >
                  {prefs.bands[k] ? "✓ " : ""}
                  {lbl}
                </button>
              ))}
            </div>

            <div className="flex gap-2.5 flex-wrap [&>button]:flex-1 [&>button]:text-center">
              <button
                className={
                  "text-[12.5px] rounded-full border py-[9px] px-[15px] whitespace-nowrap transition-[border-color,color,background] duration-300 " +
                  (vibro ? "border-[rgba(56,232,206,.45)] text-aqua bg-[rgba(56,232,206,.06)]" : "border-line text-dim")
                }
                onClick={onToggleVibro}
                aria-pressed={vibro}
              >
                📳 {vibro ? "Асаалттай" : "Унтраалттай"}
              </button>
              <ActionButton variant="primary" onClick={onImmersive}>
                ⛶ Мэдрэх горим
              </ActionButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
