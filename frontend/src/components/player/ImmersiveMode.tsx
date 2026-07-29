"use client";

/* Мэдрэх горим (immersive overlay) — Player.tsx-аас тусад нь гаргасан.
   barsRef, pulseRef, flashRef нь Player.tsx-ийн useRef — RAF loop эдгээрт шууд бичдэг тул
   энд ШИНЭ useRef БҮҮ үүсгэ; зөвхөн prop-оор ирсэн ref-үүдийг холбоно.
   levelRef/beatFlashRef мөн адил Player.tsx-ийн useRef — Visualizer-д дамжуулна. */
import type { MutableRefObject } from "react";
import type { Track } from "@/types/track";
import Visualizer from "./Visualizer";
import type { VizMode, VizLevels, BeatFlash } from "@/lib/player/visualizer-modes";

const MODES: { v: VizMode; label: string }[] = [
  { v: "bars", label: "Спектр" },
  { v: "waveform", label: "Долгион" },
  { v: "circular", label: "Тойрог" },
  { v: "beat-pulse", label: "Цохилт" },
  { v: "bass-explosion", label: "Бас дэлбэрэлт" },
  { v: "ambient", label: "Ая тохиролт" },
];

export default function ImmersiveMode({
  track,
  onClose,
  closing,
  barsRef,
  pulseRef,
  flashRef,
  analyser,
  levelRef,
  beatFlashRef,
  playing,
  viz,
  onUpdateViz,
}: {
  track: Track;
  onClose: () => void;
  closing?: boolean;
  barsRef: MutableRefObject<(HTMLElement | null)[]>;
  pulseRef: MutableRefObject<HTMLSpanElement | null>;
  flashRef: MutableRefObject<HTMLSpanElement | null>;
  analyser: AnalyserNode | null;
  levelRef: MutableRefObject<VizLevels>;
  beatFlashRef: MutableRefObject<BeatFlash | null>;
  playing: boolean;
  viz: { mode: VizMode; particles: boolean; glow: number };
  onUpdateViz: (patch: Partial<{ mode: VizMode; particles: boolean; glow: number }>) => void;
}) {
  return (
    <div
      className={
        "fixed inset-0 z-[9500] bg-[#040707] overflow-hidden flex flex-col items-center justify-center cursor-pointer " +
        (closing ? "[animation:aov-out_.22s_ease_forwards]" : "[animation:aov_.45s_ease]")
      }
      onClick={onClose}
      role="dialog"
      aria-label="Мэдрэх горим"
    >
      <img
        className="absolute -inset-10 w-[calc(100%+80px)] h-[calc(100%+80px)] object-cover [filter:blur(60px)_brightness(.4)_saturate(1.3)]"
        src={track.cover}
        alt=""
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 [background:radial-gradient(ellipse_at_50%_45%,transparent_0%,rgba(4,7,7,.72)_78%)]"
        aria-hidden="true"
      ></div>
      <span
        className="absolute inset-0 z-[1] pointer-events-none opacity-0 [background:radial-gradient(ellipse_at_50%_45%,rgba(56,232,206,.5)_0%,rgba(56,232,206,.12)_40%,transparent_72%)] transition-opacity duration-[80ms] ease-linear"
        ref={flashRef}
        aria-hidden="true"
      ></span>

      <Visualizer
        analyser={analyser}
        levelRef={levelRef}
        beatFlashRef={beatFlashRef}
        mode={viz.mode}
        particles={viz.particles}
        glow={viz.glow}
        playing={playing}
      />

      <button
        className="absolute top-[22px] right-6 z-[4] w-[42px] h-[42px] rounded-full flex items-center justify-center cursor-pointer border border-line bg-[rgba(20,28,27,.55)] text-[rgba(242,245,244,.75)] backdrop-blur-sm transition-[color,border-color,background] duration-150 hover:text-ink hover:border-[rgba(56,232,206,.45)] hover:bg-[rgba(56,232,206,.1)]"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Мэдрэх горимоос гарах"
        title="Гарах (ESC)"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <div className="relative flex items-center justify-center mb-[34px]">
        <span
          className="absolute w-[340px] h-[340px] max-[700px]:w-[250px] max-[700px]:h-[250px] rounded-full [background:radial-gradient(circle,rgba(56,232,206,.28)_0%,rgba(56,232,206,.1)_45%,transparent_70%)] border border-[rgba(56,232,206,.25)] opacity-30 transition-[transform,opacity] duration-100 ease-linear"
          ref={pulseRef}
          aria-hidden="true"
        ></span>
        <img
          className="relative w-[230px] h-[230px] max-[700px]:w-[170px] max-[700px]:h-[170px] rounded-lg object-cover shadow-[0_24px_80px_rgba(0,0,0,.7)]"
          src={track.cover}
          alt=""
        />
      </div>
      <div className="relative text-center z-[2]">
        <span className="mono">Мэдрэх горим</span>
        <h2 className="text-[clamp(26px,4vw,42px)] font-extrabold tracking-[-.04em] mt-3">{track.title}</h2>
        <p className="text-dim text-[14.5px] mt-1.5">
          {track.artist} · {track.genre}
        </p>
      </div>
      <div className="absolute left-0 right-0 bottom-0 h-[26vh] flex items-end gap-1.5 px-[5vw] opacity-85" aria-hidden="true">
        {Array.from({ length: 28 }).map((_, i) => (
          <i
            key={i}
            className="flex-1 [background:linear-gradient(180deg,rgba(56,232,206,.85),rgba(56,232,206,.08))] rounded-t-[4px] h-[2%] transition-[height] duration-[90ms] ease-linear"
            ref={(el) => {
              barsRef.current[i] = el;
            }}
          ></i>
        ))}
      </div>

      <div
        className="absolute top-[22px] left-6 right-20 max-[700px]:right-[70px] max-[700px]:top-[76px] z-[4] flex flex-wrap items-center gap-1.5 p-1.5 rounded-full bg-black/20 backdrop-blur-sm cursor-default w-fit"
        onClick={(e) => e.stopPropagation()}
        role="toolbar"
        aria-label="Визуалайзер горим сонгох"
      >
        {MODES.map((m) => (
          <button
            key={m.v}
            className={
              "py-[7px] px-[13px] max-[700px]:py-1.5 max-[700px]:px-2.5 rounded-full text-[12.5px] max-[700px]:text-[11.5px] font-semibold cursor-pointer border border-line bg-[rgba(20,28,27,.55)] text-[rgba(242,245,244,.65)] backdrop-blur-sm transition-[color,border-color,background,box-shadow] duration-150 hover:text-ink hover:border-[rgba(56,232,206,.35)] focus-visible:shadow-glow-aqua " +
              (viz.mode === m.v ? "!text-[#040707] !bg-[rgba(56,232,206,.85)] !border-[rgba(56,232,206,.85)]" : "")
            }
            onClick={() => onUpdateViz({ mode: m.v })}
            aria-pressed={viz.mode === m.v}
          >
            {m.label}
          </button>
        ))}
        <button
          className={
            "py-[7px] px-[13px] max-[700px]:py-1.5 max-[700px]:px-2.5 rounded-full text-[12.5px] max-[700px]:text-[11.5px] font-semibold cursor-pointer border border-line bg-[rgba(20,28,27,.55)] text-[rgba(242,245,244,.65)] backdrop-blur-sm transition-[color,border-color,background,box-shadow] duration-150 hover:text-ink hover:border-[rgba(56,232,206,.35)] focus-visible:shadow-glow-aqua " +
            (viz.particles ? "!text-[#040707] !bg-[rgba(56,232,206,.85)] !border-[rgba(56,232,206,.85)]" : "")
          }
          onClick={() => onUpdateViz({ particles: !viz.particles })}
          aria-pressed={viz.particles}
          title="Тоосонцор эффект"
        >
          ✨ Тоосонцор
        </button>
      </div>

      <span className="mono absolute left-0 right-0 bottom-5 text-center z-[3] !text-[rgba(242,245,244,.4)]">
        ESC эсвэл дэлгэц дээр дарж гарна
      </span>
    </div>
  );
}
