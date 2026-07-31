"use client";

import type { MutableRefObject } from "react";
import { SectionTitle } from "@/components/ui/PageHeader";
import Icon from "@/components/ui/Icon";
import type { FeelProfile } from "@/lib/player/constants";

/* "Хэмнэлийн дүрслэл" — амьд спектр + бүсийн хуваарилалт + чичиргээний хэв маяг.

   Амьд багануудыг `useHapticEngine`-ийн ГАНЦ RAF loop тэжээнэ (`signalBarsRef`).
   Энд ямар ч AudioContext/AnalyserNode үүсэхгүй — зөвхөн ref-ийг DOM-д холбоно. */

const BAR_COUNT = 28;

export default function SignalCard({
  feel,
  live,
  signalBarsRef,
}: {
  feel: FeelProfile;
  /** Одоо тоглож буй дуу энэ мөн эсэх — зөвхөн харагдах төлөв. */
  live: boolean;
  signalBarsRef?: MutableRefObject<(HTMLSpanElement | null)[]>;
}) {
  const patternTotal = feel.pattern.reduce((a, b) => a + b, 0);
  const bandMix = [
    { key: "bass", label: "Бас", value: feel.bass, tone: "var(--aqua)" },
    { key: "mid", label: "Дунд", value: feel.mid, tone: "#B49CFF" },
    { key: "high", label: "Өндөр", value: feel.high, tone: "var(--warm)" },
  ];

  return (
    <>
      <div className="mt-10">
        <SectionTitle
          title="Хэмнэлийн дүрслэл"
          description="Тоглуулах үед давтамжийн хэмнэл шууд харагдана — доорх чичиргээний хэв маягтай хамт мэдрэгдэнэ."
          actions={
            <span
              className={
                "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-caption font-semibold tracking-[.06em] uppercase transition-colors duration-200 " +
                (live ? "border-aqua/40 bg-aqua/[.1] text-aqua" : "border-line bg-white/[.03] text-faint")
              }
            >
              <span
                className={
                  "w-1.5 h-1.5 rounded-full " + (live ? "bg-aqua shadow-[0_0_10px_rgba(56,232,206,.7)] motion-safe:animate-pulse" : "bg-faint")
                }
                aria-hidden="true"
              />
              {live ? "Амьд" : "Идэвхгүй"}
            </span>
          }
        />
      </div>

      <section className="rounded-card border border-white/[.08] bg-[linear-gradient(180deg,rgba(255,255,255,.045),rgba(255,255,255,.014))] shadow-[inset_0_1px_0_rgba(255,255,255,.05)] p-5 max-nav:p-4">
        {/* ---- амьд спектр: RAF loop багана бүрийн height-ийг шууд бичнэ ---- */}
        <div
          className="relative flex items-end gap-[3px] h-[148px] max-nav:h-[112px] rounded-panel border border-line bg-[radial-gradient(120%_100%_at_50%_120%,rgba(56,232,206,.09),transparent_62%),rgba(4,10,9,.5)] px-3.5 py-3 overflow-hidden"
          role="img"
          aria-label={live ? "Одоо тоглож буй дууны амьд давтамжийн спектр" : "Давтамжийн спектр — дуу тоглох үед амьд харагдана"}
        >
          {/* тайван суурь шугамууд — гүн мэдрэмж (зөвхөн гоёл) */}
          <span className="absolute inset-x-0 top-1/3 h-px bg-white/[.04] pointer-events-none" aria-hidden="true" />
          <span className="absolute inset-x-0 top-2/3 h-px bg-white/[.04] pointer-events-none" aria-hidden="true" />
          {Array.from({ length: BAR_COUNT }).map((_, i) => (
            <span
              key={i}
              className="relative flex-1 min-h-[6px] h-[6px] rounded-t-bar bg-[linear-gradient(180deg,var(--aqua),rgba(56,232,206,.06))] transition-[height] duration-[90ms] ease-linear motion-reduce:transition-none"
              ref={(el) => {
                if (signalBarsRef) signalBarsRef.current[i] = el;
              }}
            />
          ))}
          {!live && (
            <span className="absolute inset-0 grid place-items-center bg-[rgba(4,10,9,.55)] backdrop-blur-[2px] pointer-events-none">
              <span className="flex items-center gap-2 rounded-full border border-line bg-black/40 px-3.5 py-2 text-note text-dim">
                <Icon name="play" size={13} variant="fill" className="text-aqua" />
                Тоглуулахад хэмнэл энд амьдарна
              </span>
            </span>
          )}
        </div>

        {/* ---- бүсийн хуваарилалт (төрлийн мэдрэмжийн профайл) ---- */}
        <dl className="mt-5 grid grid-cols-3 max-nav:grid-cols-1 gap-3">
          {bandMix.map((band) => (
            <div key={band.key} className="rounded-2xl border border-white/[.07] bg-white/[.025] px-3.5 py-3">
              <div className="flex items-baseline justify-between gap-2">
                <dt className="text-note font-semibold text-dim">{band.label}</dt>
                <dd className="mono !text-meta !tracking-[.14em] text-ink">{band.value}%</dd>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-white/[.07] overflow-hidden">
                <span
                  className="block h-full rounded-full transition-[width] duration-500"
                  style={{ width: Math.min(100, band.value) + "%", background: band.tone }}
                />
              </div>
            </div>
          ))}
        </dl>

        {/* ---- чичиргээний хэв маяг (статик, төрлөөс хамаарна) ---- */}
        {feel.pattern && (
          <div className="mt-5 pt-5 border-t border-white/[.06]">
            <div className="flex items-center justify-between gap-3 mb-2.5">
              <span className="mono !text-meta">Чичиргээний хэв маяг</span>
              <span className="mono !text-meta text-faint">{feel.pattern.join(" · ")} ms</span>
            </div>
            <div
              className="flex items-center h-8 border border-line rounded-chip px-3 bg-[rgba(20,28,27,.45)] gap-px"
              role="img"
              aria-label={"Чичиргээний хэв маяг: " + feel.pattern.join(", ") + " миллисекунд"}
            >
              {feel.pattern.map((ms, i) =>
                i % 2 === 0 ? (
                  <i
                    key={i}
                    className="block h-3.5 rounded-bar bg-aqua shadow-[0_0_8px_rgba(56,232,206,.45)]"
                    style={{ flex: ms / patternTotal + " 0 0" }}
                    title={ms + " ms"}
                  />
                ) : (
                  <u key={i} className="block h-0.5 bg-[rgba(242,245,244,.18)]" style={{ flex: ms / patternTotal + " 0 0" }} title={ms + " ms"} />
                ),
              )}
            </div>
            {feel.text && <p className="mt-3.5 text-body text-dim leading-[1.65] max-w-[64ch] text-pretty">{feel.text}</p>}
          </div>
        )}
      </section>
    </>
  );
}
