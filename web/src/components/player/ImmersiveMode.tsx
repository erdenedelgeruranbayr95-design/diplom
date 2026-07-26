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
    <div className={"sp-imm" + (closing ? " closing" : "")} onClick={onClose} role="dialog" aria-label="Мэдрэх горим">
      <img className="sp-imm-bg" src={track.cover} alt="" aria-hidden="true" />
      <div className="sp-imm-veil" aria-hidden="true"></div>
      <span className="sp-imm-flash" ref={flashRef} aria-hidden="true"></span>

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
        className="sp-imm-x"
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

      <div className="sp-imm-center">
        <span className="sp-imm-ring" ref={pulseRef} aria-hidden="true"></span>
        <img className="sp-imm-cover" src={track.cover} alt="" />
      </div>
      <div className="sp-imm-info">
        <span className="mono">Мэдрэх горим</span>
        <h2>{track.title}</h2>
        <p>
          {track.artist} · {track.genre}
        </p>
      </div>
      <div className="sp-imm-bars" aria-hidden="true">
        {Array.from({ length: 28 }).map((_, i) => (
          <i
            key={i}
            ref={(el) => {
              barsRef.current[i] = el;
            }}
          ></i>
        ))}
      </div>

      <div className="sp-viz-modes" onClick={(e) => e.stopPropagation()} role="toolbar" aria-label="Визуалайзер горим сонгох">
        {MODES.map((m) => (
          <button
            key={m.v}
            className={"sp-viz-mode-btn" + (viz.mode === m.v ? " on" : "")}
            onClick={() => onUpdateViz({ mode: m.v })}
            aria-pressed={viz.mode === m.v}
          >
            {m.label}
          </button>
        ))}
        <button
          className={"sp-viz-mode-btn" + (viz.particles ? " on" : "")}
          onClick={() => onUpdateViz({ particles: !viz.particles })}
          aria-pressed={viz.particles}
          title="Тоосонцор эффект"
        >
          ✨ Тоосонцор
        </button>
      </div>

      <span className="sp-imm-exit mono">ESC эсвэл дэлгэц дээр дарж гарна</span>
    </div>
  );
}
