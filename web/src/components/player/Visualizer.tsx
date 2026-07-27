"use client";

/* Canvas 2D визуалайзер — Player.tsx-ийн ctxRef(AnalyserNode)/levelRef/beatFlashRef-ийг
   props-оор л уншина, шинэ AudioContext/AnalyserNode үүсгэхгүй. Өөрийн requestAnimationFrame
   loop-той (Player-ийн DOM-bar RAF loop-той тусдаа) — canvas resize/particle/cleanup өөрөө удирдана. */
import { useEffect, useRef } from "react";
import type { MutableRefObject } from "react";
import {
  drawWaveform,
  drawBars,
  drawCircular,
  drawBeatPulse,
  drawBassExplosion,
  drawAmbient,
  ParticlePool,
  type VizMode,
  type VizLevels,
  type BeatFlash,
} from "@/lib/player/visualizer-modes";

export default function Visualizer({
  analyser,
  levelRef,
  beatFlashRef,
  mode,
  particles: particlesEnabled,
  glow,
  playing,
}: {
  analyser: AnalyserNode | null;
  levelRef: MutableRefObject<VizLevels>;
  beatFlashRef: MutableRefObject<BeatFlash | null>;
  mode: VizMode;
  particles: boolean;
  glow: number;
  playing: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const modeRef = useRef(mode);
  const particlesEnabledRef = useRef(particlesEnabled);
  const glowRef = useRef(glow);
  const playingRef = useRef(playing);
  const analyserRef = useRef(analyser);
  modeRef.current = mode;
  particlesEnabledRef.current = particlesEnabled;
  glowRef.current = glow;
  playingRef.current = playing;
  analyserRef.current = analyser;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;
    const ctx: CanvasRenderingContext2D = ctx2d;

    const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const particlePool = new ParticlePool();
    const freqData = new Uint8Array(1024);
    const timeData = new Uint8Array(1024);

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0;
    let last = performance.now();

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      const dt = now - last;
      last = now;
      if (!canvas) return;
      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) return;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(8, 10, 20, 0.28)";
      ctx.fillRect(0, 0, w, h);

      const an = analyserRef.current;
      const currentMode = modeRef.current;
      const glowLvl = reducedMotion ? 0 : glowRef.current;
      const levels = levelRef.current;
      const flash = beatFlashRef.current;
      const isPlaying = playingRef.current;

      if (an && isPlaying) {
        const bins = an.frequencyBinCount;
        an.getByteFrequencyData(freqData.subarray(0, bins));
        an.getByteTimeDomainData(timeData.subarray(0, bins));
      }

      switch (currentMode) {
        case "waveform":
          if (an && isPlaying) drawWaveform(ctx, w, h, timeData.subarray(0, an.frequencyBinCount), glowLvl);
          break;
        case "bars":
          if (an && isPlaying) drawBars(ctx, w, h, freqData.subarray(0, an.frequencyBinCount), glowLvl);
          break;
        case "circular":
          if (an && isPlaying) drawCircular(ctx, w, h, freqData.subarray(0, an.frequencyBinCount), glowLvl);
          break;
        case "beat-pulse":
          drawBeatPulse(ctx, w, h, levels, flash, now, glowLvl);
          break;
        case "bass-explosion":
          drawBassExplosion(ctx, w, h, levels, flash, now, particlePool, dt, particlesEnabledRef.current && !reducedMotion);
          break;
        case "ambient":
          drawAmbient(ctx, w, h, levels, now / 1000, reducedMotion);
          break;
      }
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [levelRef, beatFlashRef]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[1] pointer-events-none" aria-hidden="true" />;
}
