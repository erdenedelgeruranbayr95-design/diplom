"use client";

/* Canvas 2D визуалайзерийн зурах цэвэр функцууд — Visualizer.tsx-ийн RAF loop-оос дуудагдана.
   Band-split харьцаа (0.08/0.38) нь Player.tsx-ийн RAF loop болон analyze.ts-ийн
   computeBandEnergy-той ЯГ ИЖИЛ — analyzed өгөгдөлтэй consistency хадгална. */

export type VizMode = "waveform" | "bars" | "circular" | "beat-pulse" | "bass-explosion" | "ambient";

export interface VizLevels {
  lo: number;
  mi: number;
  hi: number;
}

export interface BeatFlash {
  band: "bass" | "mid" | "high";
  level: number;
  at: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  hue: number;
  size: number;
}

const MAX_PARTICLES = 80;

export class ParticlePool {
  private pool: Particle[] = [];
  private active: Particle[] = [];

  spawn(cx: number, cy: number, count: number, hue: number, speed: number) {
    for (let i = 0; i < count; i++) {
      if (this.active.length >= MAX_PARTICLES) {
        const reused = this.active.shift();
        if (reused) this.pool.push(reused);
      }
      const p = this.pool.pop() || ({} as Particle);
      const ang = Math.random() * Math.PI * 2;
      const spd = speed * (0.4 + Math.random() * 0.8);
      p.x = cx;
      p.y = cy;
      p.vx = Math.cos(ang) * spd;
      p.vy = Math.sin(ang) * spd;
      p.life = p.maxLife = 500 + Math.random() * 400;
      p.hue = hue + (Math.random() * 30 - 15);
      p.size = 1.5 + Math.random() * 2.5;
      this.active.push(p);
    }
  }

  update(dtMs: number) {
    for (let i = this.active.length - 1; i >= 0; i--) {
      const p = this.active[i];
      p.life -= dtMs;
      if (p.life <= 0) {
        this.active.splice(i, 1);
        this.pool.push(p);
        continue;
      }
      p.x += p.vx * (dtMs / 16.7);
      p.y += p.vy * (dtMs / 16.7);
      p.vy += 0.015 * (dtMs / 16.7);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (const p of this.active) {
      const a = Math.max(0, p.life / p.maxLife);
      ctx.beginPath();
      ctx.fillStyle = `hsla(${p.hue}, 85%, 62%, ${(a * 0.9).toFixed(3)})`;
      ctx.arc(p.x, p.y, p.size * a, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  get count() {
    return this.active.length;
  }
}

function bandSplit(n: number) {
  return { ai: Math.floor(n * 0.08), bi: Math.floor(n * 0.38) };
}

/* Haptic Score-ийн 8 бүсийг (§3.3) өнгө болгож зураглана — бас (8°, улаан-улбар шар)
   → өндөр (308°, час улаан) хооронд ЛОГАРИФМ HSL hue шилжилт. Логарифм хэрэглэсэн
   шалтгаан: давтамжийн бүсүүд өөрсдөө лог масштабтай (20Hz..20000Hz) тул хэрэглэгчийн
   мэдрэмж дэх "бас нам, өндөр цог" зурган ялгаа шугаман hue-ээс илүү тэнцвэртэй харагдана. */
const HAPTIC_BAND_HUE_START = 8;
const HAPTIC_BAND_HUE_END = 308;

export function bandToColor(bandIndex: number, totalBands: number, opts: { saturation?: number; lightness?: number; alpha?: number } = {}): string {
  const { saturation = 82, lightness = 58, alpha = 1 } = opts;
  const clamped = Math.max(0, Math.min(totalBands - 1, bandIndex));
  /* index=0 → 0, index=totalBands-1 → 1, лог масштабтай (index+1-ийг ашиглаж log(0)-оос зайлсхийнэ). */
  const t = totalBands > 1 ? Math.log(clamped + 1) / Math.log(totalBands) : 0;
  const hue = HAPTIC_BAND_HUE_START + t * (HAPTIC_BAND_HUE_END - HAPTIC_BAND_HUE_START);
  return alpha < 1 ? `hsla(${hue.toFixed(1)}, ${saturation}%, ${lightness}%, ${alpha})` : `hsl(${hue.toFixed(1)}, ${saturation}%, ${lightness}%)`;
}

export function drawWaveform(ctx: CanvasRenderingContext2D, w: number, h: number, timeData: Uint8Array, glow: number) {
  ctx.lineWidth = 2;
  ctx.strokeStyle = `rgba(140, 210, 255, ${0.75 + glow * 0.25})`;
  if (glow > 0) {
    ctx.shadowBlur = 12 * glow;
    ctx.shadowColor = "rgba(140, 210, 255, 0.8)";
  } else {
    ctx.shadowBlur = 0;
  }
  ctx.beginPath();
  const n = timeData.length;
  for (let i = 0; i < n; i++) {
    const x = (i / (n - 1)) * w;
    const v = (timeData[i] - 128) / 128;
    const y = h / 2 + v * (h / 2) * 0.9;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.shadowBlur = 0;
}

export function drawBars(ctx: CanvasRenderingContext2D, w: number, h: number, freqData: Uint8Array, glow: number) {
  const n = freqData.length;
  const { ai, bi } = bandSplit(n);
  const usable = Math.floor(n * 0.72);
  const barCount = 64;
  const gap = 2;
  const bw = w / barCount - gap;
  for (let i = 0; i < barCount; i++) {
    const start = Math.floor((i / barCount) * usable);
    const end = Math.max(start + 1, Math.floor(((i + 1) / barCount) * usable));
    let sum = 0;
    for (let k = start; k < end; k++) sum += freqData[k];
    const v = sum / (end - start) / 255;
    const bh = Math.max(2, v * h);
    const hue = start < ai ? 265 : start < bi ? 200 : 165;
    ctx.fillStyle = `hsla(${hue}, 85%, ${55 + v * 20}%, ${0.85 + glow * 0.15})`;
    if (glow > 0) {
      ctx.shadowBlur = 8 * glow * v;
      ctx.shadowColor = `hsla(${hue}, 85%, 60%, 0.9)`;
    }
    ctx.fillRect(i * (bw + gap), h - bh, bw, bh);
  }
  ctx.shadowBlur = 0;
}

export function drawCircular(ctx: CanvasRenderingContext2D, w: number, h: number, freqData: Uint8Array, glow: number) {
  const cx = w / 2;
  const cy = h / 2;
  const baseR = Math.min(w, h) * 0.22;
  const n = freqData.length;
  const usable = Math.floor(n * 0.72);
  const points = 96;
  ctx.beginPath();
  for (let i = 0; i <= points; i++) {
    const idx = Math.floor((i / points) * usable) % usable;
    const v = freqData[idx] / 255;
    const r = baseR + v * baseR * 1.6;
    const ang = (i / points) * Math.PI * 2 - Math.PI / 2;
    const x = cx + Math.cos(ang) * r;
    const y = cy + Math.sin(ang) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  const grad = ctx.createRadialGradient(cx, cy, baseR * 0.5, cx, cy, baseR * 2.2);
  grad.addColorStop(0, "rgba(180, 140, 255, 0.85)");
  grad.addColorStop(1, "rgba(90, 200, 255, 0.15)");
  ctx.fillStyle = grad;
  ctx.strokeStyle = "rgba(200, 220, 255, 0.9)";
  ctx.lineWidth = 1.5;
  if (glow > 0) {
    ctx.shadowBlur = 18 * glow;
    ctx.shadowColor = "rgba(160, 160, 255, 0.9)";
  }
  ctx.fill();
  ctx.stroke();
  ctx.shadowBlur = 0;
}

export function drawBeatPulse(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  levels: VizLevels,
  flash: BeatFlash | null,
  now: number,
  glow: number
) {
  const cx = w / 2;
  const cy = h / 2;
  const baseR = Math.min(w, h) * 0.18;
  const lvl = Math.max(levels.lo, levels.mi, levels.hi);

  for (let ring = 0; ring < 3; ring++) {
    const r = baseR * (1 + ring * 0.55 + lvl * 0.8);
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(150, 190, 255, ${(0.35 - ring * 0.1) * (0.5 + lvl)})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  if (flash) {
    const age = now - flash.at;
    const decay = Math.max(0, 1 - age / 320);
    if (decay > 0) {
      const hue = flash.band === "bass" ? 265 : flash.band === "mid" ? 200 : 165;
      const r = baseR * (1 + (1 - decay) * 2.2);
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = `hsla(${hue}, 90%, 65%, ${decay * 0.8})`;
      ctx.lineWidth = 3 + decay * 4;
      if (glow > 0) {
        ctx.shadowBlur = 20 * glow * decay;
        ctx.shadowColor = `hsla(${hue}, 90%, 65%, 0.9)`;
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  }

  ctx.beginPath();
  ctx.arc(cx, cy, baseR * (0.7 + lvl * 0.5), 0, Math.PI * 2);
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseR * 1.2);
  grad.addColorStop(0, `rgba(200, 210, 255, ${0.5 + lvl * 0.4})`);
  grad.addColorStop(1, "rgba(120, 140, 255, 0)");
  ctx.fillStyle = grad;
  ctx.fill();
}

export function drawBassExplosion(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  levels: VizLevels,
  flash: BeatFlash | null,
  now: number,
  particles: ParticlePool,
  dtMs: number,
  particlesEnabled: boolean
) {
  const cx = w / 2;
  const cy = h / 2;

  if (particlesEnabled) {
    if (flash && now - flash.at < 40) {
      const hue = flash.band === "bass" ? 265 : flash.band === "mid" ? 200 : 165;
      particles.spawn(cx, cy, Math.round(10 + flash.level * 20), hue, 3 + flash.level * 6);
    }
    particles.update(dtMs);
    particles.draw(ctx);
  }

  const lo = levels.lo;
  const r = Math.min(w, h) * (0.12 + lo * 0.35);
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  grad.addColorStop(0, `rgba(255, 120, 180, ${0.55 + lo * 0.4})`);
  grad.addColorStop(0.6, `rgba(160, 90, 255, ${0.3 + lo * 0.3})`);
  grad.addColorStop(1, "rgba(80, 60, 200, 0)");
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
}

export function drawAmbient(ctx: CanvasRenderingContext2D, w: number, h: number, levels: VizLevels, tSec: number, reducedMotion: boolean) {
  const speed = reducedMotion ? 0.05 : 1;
  const lvl = (levels.lo + levels.mi + levels.hi) / 3;
  const blobs = [
    { hue: 265, x: 0.3 + Math.sin(tSec * 0.15 * speed) * 0.15, y: 0.35 + Math.cos(tSec * 0.12 * speed) * 0.12 },
    { hue: 200, x: 0.7 + Math.cos(tSec * 0.11 * speed) * 0.15, y: 0.6 + Math.sin(tSec * 0.13 * speed) * 0.15 },
    { hue: 330, x: 0.5 + Math.sin(tSec * 0.09 * speed + 1) * 0.2, y: 0.3 + Math.cos(tSec * 0.1 * speed + 1) * 0.15 },
  ];
  for (const b of blobs) {
    const cx = b.x * w;
    const cy = b.y * h;
    const r = Math.min(w, h) * (0.35 + lvl * 0.25);
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    grad.addColorStop(0, `hsla(${b.hue}, 80%, 60%, ${0.22 + lvl * 0.18})`);
    grad.addColorStop(1, "hsla(0, 0%, 0%, 0)");
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  }
}
