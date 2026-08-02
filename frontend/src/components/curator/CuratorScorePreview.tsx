"use client";

/* Haptic Score урьдчилан харах хугацааны шугам — 8 бүсийн энергийг canvas дээр
   stacked heat bar болгож зурна (X = фрэйм/хугацаа, өнгө = bandToColor, өндөр = энерги).
   Зөвхөн analysisStatus === "READY" үед л дуудагдана (CuratorSongEditor.tsx-ээс). */
import { useEffect, useRef, useState } from "react";
import { Skeleton, ErrorState, Empty } from "@/components/ui/States";
import { loadHapticScore } from "@/lib/audio/haptic-score";
import { bandToColor } from "@/lib/player/visualizer-modes";
import type { HapticScore } from "@/types/song";

export default function CuratorScorePreview({ scoreUrl }: { scoreUrl: string }) {
  const [score, setScore] = useState<HapticScore | null | undefined>(undefined);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let alive = true;
    setScore(undefined);
    loadHapticScore(scoreUrl).then((s) => {
      if (alive) setScore(s);
    });
    return () => {
      alive = false;
    };
  }, [scoreUrl]);

  useEffect(() => {
    if (!score || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const width = canvas.clientWidth || 640;
    const height = canvas.clientHeight || 140;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const frames = score.frames;
    if (frames.length === 0) return;
    const totalBands = frames[0].b.length || 8;
    const colWidth = Math.max(1, width / frames.length);

    frames.forEach((frame, i) => {
      const x = i * colWidth;
      const bandHeight = height / totalBands;
      frame.b.forEach((energy, bandIdx) => {
        const e = Math.max(0, Math.min(1, energy));
        const y = height - (bandIdx + 1) * bandHeight;
        ctx.fillStyle = bandToColor(bandIdx, totalBands, { alpha: 0.18 + e * 0.82 });
        ctx.fillRect(x, y, colWidth + 0.5, bandHeight + 0.5);
      });
      if (frame.beat) {
        ctx.fillStyle = "rgba(255,255,255,.55)";
        ctx.fillRect(x, 0, Math.max(1, colWidth * 0.6), height);
      }
    });
  }, [score]);

  if (score === undefined) return <Skeleton variant="row" rows={2} />;
  if (score === null) return <ErrorState title="Score татагдсангүй" hint="scoreUrl-ээс Haptic Score JSON уншиж чадсангүй" />;
  if (score.frames.length === 0) return <Empty icon="waveform" title="Score хоосон" hint="Worker хараахан фрэйм бичээгүй байна" />;

  return (
    <div>
      <canvas ref={canvasRef} className="w-full h-[140px] rounded-lg border border-white/[.08] bg-black/40 block" aria-label="Haptic Score урьдчилан харах" />
      <div className="flex items-center justify-between gap-3 mt-2 text-caption text-faint font-mono">
        <span>{score.frames.length} фрэйм</span>
        <span>{score.durationSec.toFixed(1)}с</span>
        <span>{score.bandEdgesHz.length} бүс</span>
      </div>
    </div>
  );
}
