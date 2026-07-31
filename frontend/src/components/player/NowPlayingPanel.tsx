"use client";

/* Дэлгэрдэг “Мэдрэх самбар” (Now-Playing) — premium drawer styling only.
   Existing state flow, callbacks, and audio logic remain unchanged. */
import type { MutableRefObject } from "react";
import { FEEL, FEEL_DEFAULT } from "@/lib/player/constants";
import { ActionButton } from "@/components/ui/ActionGroup";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import DeviceCard from "./DeviceCard";
import type { Track } from "@/types/track";
import type { useDeviceSync } from "@/lib/socket/useDeviceSync";
import Icon from "@/components/ui/Icon";
import { Panel } from "@/components/ui/Surface";

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
  deviceSync,
  onOpenPairing,
  canVibrate,
  onTestVibration,
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
  deviceSync: ReturnType<typeof useDeviceSync>;
  onOpenPairing: () => void;
  canVibrate: boolean;
  onTestVibration: () => void;
}) {
  /* Hook-ийг эрт буцахаас ӨМНӨ дуудна (Rules of Hooks) */
  const trapRef = useFocusTrap(open && !!track);

  if (!open || !track) return null;
  const f = FEEL[track.genre] || FEEL_DEFAULT;
  const tot = f.pattern.reduce((a, b) => a + b, 0);

  return (
    <div
      ref={trapRef}
      className="fixed left-0 right-0 bottom-[86px] max-nav:bottom-[70px] z-[4] bg-[rgba(10,16,15,.97)] backdrop-blur-3xl border-t border-aqua/[.16] shadow-[0_-18px_50px_rgba(0,0,0,.5)] [animation:npup_.28s_cubic-bezier(.16,.8,.24,1)]"
      role="dialog"
      aria-label="Мэдрэх самбар"
    >
      <div className="max-w-[1180px] mx-auto p-5 max-nav:p-4">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div>
            <span className="mono block mb-1">Одоо тоглож байна</span>
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="font-display font-semibold text-[24px] max-nav:text-[20px] tracking-[-.04em] leading-tight text-ink">
                {track.title}
              </h3>
              <span className={"inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-caption font-medium " + (vibro ? "border-aqua/30 bg-aqua/[.09] text-aqua" : "border-white/[.1] bg-white/[.04] text-dim")}>
                <span className={"w-2 h-2 rounded-full " + (vibro ? "bg-aqua shadow-[0_0_10px_rgba(56,232,206,.45)]" : "bg-faint")} />
                {vibro ? "Тоглож/Мэдэрч байна" : "Түр зогссон"}
              </span>
            </div>
            <p className="mt-1 text-body text-dim">
              {track.artist} · {track.genre}
            </p>
          </div>

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

        <div className="grid grid-cols-[1.1fr_.9fr] max-nav:grid-cols-1 gap-6 items-start">
          <Panel>
            <div className="flex items-center gap-3 mb-4">
              <img src={track.cover || ""} alt="" className="w-14 h-14 rounded-2xl object-cover flex-none shadow-[0_8px_24px_rgba(0,0,0,.35)]" loading="lazy" decoding="async" />
              <div className="min-w-0">
                <b className="block text-lead font-semibold text-ink whitespace-nowrap overflow-hidden text-ellipsis">{track.title}</b>
                <i className="block text-note text-dim not-italic whitespace-nowrap overflow-hidden text-ellipsis">
                  {track.artist} · {track.genre}
                </i>
              </div>
            </div>

            <div className="flex items-end gap-2 h-[104px] border border-line rounded-lg p-3.5 bg-black/[.22]" aria-label="Амьд давтамжийн спектр">
              {Array.from({ length: 8 }).map((_, i) => (
                <span
                  key={i}
                  className="flex-1 min-h-[5px] h-[5px] rounded-t-bar bg-[linear-gradient(180deg,var(--aqua),rgba(56,232,206,.08))] transition-[height] duration-[90ms] ease-linear"
                  ref={(el) => {
                    barsRef.current[i] = el;
                  }}
                />
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-2.5">
              <span className="mono !text-micro">Чичиргээний хэв маяг</span>
              <div className="flex items-center h-[26px] border border-line rounded-chip px-2.5 bg-[rgba(20,28,27,.4)]" aria-hidden="true">
                {f.pattern.map((ms, i) =>
                  i % 2 === 0 ? (
                    <i key={i} className="block h-3 rounded-bar bg-aqua shadow-[0_0_8px_rgba(56,232,206,.4)]" style={{ flex: ms / tot + " 0 0" }} />
                  ) : (
                    <u key={i} className="block h-0.5 bg-[rgba(242,245,244,.18)]" style={{ flex: ms / tot + " 0 0" }} />
                  ),
                )}
              </div>

              <span className="mono !text-micro">Мэдрэх бүс</span>
              <div className="grid grid-cols-3 gap-1.5" role="group" aria-label="Мэдрэх давтамжийн бүс">
                {BANDS.map(([k, lbl]) => (
                  <button
                    key={k}
                    className={
                      "inline-flex items-center justify-center gap-1.5 py-2.5 px-1 min-h-11 text-note text-dim border border-line rounded-lg transition-colors duration-150 " +
                      (prefs.bands[k] ? "text-aqua border-aqua/50 bg-aqua/[.07]" : "hover:border-white/20 hover:text-ink")
                    }
                    onClick={() => onToggleBand(k)}
                    aria-pressed={prefs.bands[k]}
                  >
                    {prefs.bands[k] && <Icon name="check" size={12} strokeWidth={2.4} />}
                    {lbl}
                  </button>
                ))}
              </div>
            </div>
          </Panel>

          <div className="flex flex-col gap-4">
            <Panel>
              <div className="flex gap-2.5 flex-wrap [&>button]:flex-1 [&>button]:justify-center">
                <button
                  className={
                    "inline-flex items-center justify-center gap-2 text-note rounded-full border py-[9px] px-[15px] whitespace-nowrap transition-[border-color,color,background] duration-300 " +
                    (vibro ? "border-[rgba(56,232,206,.45)] text-aqua bg-[rgba(56,232,206,.06)]" : "border-line text-dim hover:text-ink hover:border-white/20")
                  }
                  onClick={onToggleVibro}
                  aria-pressed={vibro}
                >
                  <Icon name="vibrate" size={15} />
                  {vibro ? "Асаалттай" : "Унтраалттай"}
                </button>
                <ActionButton variant="primary" onClick={onImmersive}>
                  <Icon name="expand" size={15} />
                  Мэдрэх горим
                </ActionButton>
              </div>
            </Panel>

            <Panel>
              <div className="flex items-center justify-between gap-3 mb-3">
                <div>
                  <h4 className="font-display font-semibold text-title tracking-[-.03em] text-ink">Утас холбох</h4>
                  <p className="text-note text-dim mt-0.5">Холболтын байдал ба чичиргээний туршилт</p>
                </div>
                <span className="mono !text-micro flex-none">{canVibrate ? "Чичиргээ бэлэн" : "Чичиргээгүй"}</span>
              </div>

              {deviceSync.qrState === "connected" ? (
                <DeviceCard deviceSync={deviceSync} canVibrate={canVibrate} onTestVibration={onTestVibration} />
              ) : (
                <div className="w-full flex items-center gap-3">
                  <i className="w-2 h-2 rounded-full flex-none bg-faint" aria-hidden="true" />
                  <span className="flex-1 text-note text-dim" aria-live="polite">
                    Утас холбогдоогүй
                  </span>
                  <ActionButton variant="ghost" size="sm" onClick={onOpenPairing}>
                    <Icon name="device" size={15} />
                    Утас холбох
                  </ActionButton>
                </div>
              )}
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
}
