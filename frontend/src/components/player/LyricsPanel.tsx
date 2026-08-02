"use client";

import { useMemo } from "react";
import { parseLyrics, hasTimestamps, activeLyricIndex } from "@/lib/player/lyrics";

/* Уг үг (lyrics) харуулах — Үе шат 6 хүртээмжийн шаардлага (roadmap: "Lyrics /
   caption"): сонсголын бэрхшээлтэй хэрэглэгч аудиогүйгээр ч хөгжмийн агуулгыг
   унших боломжтой байх ёстой. LRC-төстэй цаг тэмдэглэгээтэй бол одоо тоглож
   буй мөрийг тодруулна, эс бол бүх мөрийг тэгш жагсаана. */
export default function LyricsPanel({ lyrics, currentTime }: { lyrics: string | null | undefined; currentTime: number }) {
  const lines = useMemo(() => (lyrics ? parseLyrics(lyrics) : []), [lyrics]);
  if (lines.length === 0) return null;

  const synced = hasTimestamps(lines);
  const activeIndex = synced ? activeLyricIndex(lines, currentTime) : -1;

  return (
    <section className="flex flex-col gap-3 rounded-panel border border-white/[.08] bg-white/[.03] p-4">
      <div>
        <h5 className="font-display font-semibold text-title tracking-[-.03em] text-ink">Уг үг</h5>
        <p className="text-note text-dim mt-0.5">{synced ? "Тоглож буй мөр тодруулагдана" : "Бүтэн текст"}</p>
      </div>
      <div className="flex flex-col gap-1.5 max-h-[280px] overflow-y-auto pr-1" aria-live={synced ? "polite" : undefined}>
        {lines.map((line, i) => (
          <p
            key={i}
            className={
              "text-body leading-[1.6] transition-colors duration-200 " +
              (i === activeIndex ? "text-aqua font-semibold" : "text-dim")
            }
          >
            {line.text}
          </p>
        ))}
      </div>
    </section>
  );
}
