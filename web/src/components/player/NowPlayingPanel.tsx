"use client";

/* Дэлгэгддэг «Мэдрэх самбар» (Now-Playing) — доод bar дээр дарж нээнэ.
   Амьд 8 бүсийн meter + чичиргээний хэв маяг + бүс toggle + Мэдрэх горим.
   barsRef нь Player.tsx-ийн useRef — RAF loop 8 баганы өндрийг шууд бичдэг тул
   энд ШИНЭ useRef БҮҮ үүсгэ. */
import type { MutableRefObject } from "react";
import { FEEL, FEEL_DEFAULT } from "@/lib/player/constants";
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
    <div className="sp-np" role="dialog" aria-label="Мэдрэх самбар">
      <div className="sp-np-inner">
        <div className="sp-np-head">
          <span className="mono">Мэдрэх самбар — амьд</span>
          <button className="sp-np-x" onClick={onClose} aria-label="Самбар хаах">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>

        <div className="sp-np-body">
          <div className="sp-np-track">
            <img src={track.cover} alt="" />
            <div>
              <b>{track.title}</b>
              <i>
                {track.artist} · {track.genre}
              </i>
            </div>
          </div>

          {/* амьд 8 бүсийн meter — RAF loop-оос удирдагдана */}
          <div className="sp-np-meter" aria-label="Амьд давтамжийн спектр">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                ref={(el) => {
                  barsRef.current[i] = el;
                }}
              ></span>
            ))}
          </div>

          <div className="sp-np-side">
            <span className="mono">Чичиргээний хэв маяг</span>
            <div className="dt-hap sp-np-hap" aria-hidden="true">
              {f.pattern.map((ms, i) =>
                i % 2 === 0 ? (
                  <i key={i} style={{ flex: ms / tot + " 0 0" }}></i>
                ) : (
                  <u key={i} style={{ flex: ms / tot + " 0 0" }}></u>
                ),
              )}
            </div>

            <span className="mono">Мэдрэх бүс</span>
            <div className="sp-bands sp-np-bands">
              {BANDS.map(([k, lbl]) => (
                <button key={k} className={prefs.bands[k] ? "on" : ""} onClick={() => onToggleBand(k)} aria-pressed={prefs.bands[k]}>
                  {prefs.bands[k] ? "✓ " : ""}
                  {lbl}
                </button>
              ))}
            </div>

            <div className="sp-np-actions">
              <button className={"sp-vibro" + (vibro ? " on" : "")} onClick={onToggleVibro} aria-pressed={vibro}>
                📳 {vibro ? "Асаалттай" : "Унтраалттай"}
              </button>
              <button className="bt bt-a" onClick={onImmersive}>
                ⛶ Мэдрэх горим
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
