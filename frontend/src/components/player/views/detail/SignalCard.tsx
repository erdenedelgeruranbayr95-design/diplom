"use client";

import { SectionTitle } from "@/components/ui/PageHeader";
import type { FeelProfile } from "@/lib/player/constants";

/* "Хэмнэлийн дүрслэл" — бүсийн хуваарилалт + чичиргээний хэв маяг.

   Амьд спектр (багана) нь урьд нь ЭНД байсныг зүүн баганын cover зураг руу нүүлгэв
   (`DetailView` → `SignalBars`). `signalBarsRef` нь ганц массив тул спектрийг хоёр
   газар зэрэг зурвал зөвхөн нэг нь амьдардаг — тиймээс энд давхардуулахгүй. */

export default function SignalCard({
  feel,
  live,
}: {
  feel: FeelProfile;
  /** Одоо тоглож буй дуу энэ мөн эсэх — зөвхөн харагдах төлөв. */
  live: boolean;
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
          description="Амьд давтамжийн долгион нь cover зураг дээр харагдана. Энд тухайн төрлийн бүсийн жин ба чичиргээний хэв маяг."
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
        {/* ---- бүсийн хуваарилалт (төрлийн мэдрэмжийн профайл) ---- */}
        <dl className="grid grid-cols-3 max-nav:grid-cols-1 gap-3">
          {bandMix.map((band) => (
            <div key={band.key} className="rounded-2xl border border-white/[.07] bg-white/[.025] px-3.5 py-3">
              <dt className="text-note font-semibold text-dim">{band.label}</dt>
              <div className="mt-2 h-1.5 rounded-full bg-white/[.07] overflow-hidden">
                <span
                  className="block h-full rounded-full transition-[width] duration-500"
                  style={{ width: Math.min(100, band.value) + "%", background: band.tone }}
                />
              </div>
              <dd className="mono !text-meta !tracking-[.14em] text-ink mt-2">{band.value}%</dd>
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
