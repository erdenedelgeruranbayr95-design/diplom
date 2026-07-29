"use client";

import { QRCodeSVG } from "qrcode.react";
import type { Track } from "@/types/track";
import BackBar from "./BackBar";
import { SectionTitle } from "@/components/ui/PageHeader";
import { ActionButton } from "@/components/ui/ActionGroup";
import { FEEL, FEEL_DEFAULT } from "@/lib/player/constants";

/* Дууны дэлгэрэнгүй — Player.jsx-аас тусад нь гаргасан.
   Props: track, isCurrent, playing, onPlay(), onFeelTest(), onBack(),
          liked, saved, onToggleLike(), onToggleSave() */

/* Дизайн баримт §3.1-ийн 8 давтамжийн бүс. Утгыг FEEL-ийн 3 бүсээс (бас/дунд/өндөр)
   тодорхой дүрмээр гарган авна — тусдаа дата зохиох шаардлагагүй, custom дуунд ч ажиллана. */
const BANDS8: [string, string][] = [
  ['Sub-бас', '20–60 Hz'],
  ['Бас', '60–150 Hz'],
  ['Доод дунд', '150–400 Hz'],
  ['Дунд', '400 Hz–1 kHz'],
  ['Дээд дунд', '1–2.5 kHz'],
  ['Present', '2.5–6 kHz'],
  ['Гялбаа', '6–12 kHz'],
  ['Агаар', '12–20 kHz'],
]
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const clampPct = (v: number) => Math.round(Math.max(6, Math.min(100, v)))

function to8Bands(f: { bass: number; mid: number; high: number }) {
  const raw = [
    f.bass * 1.05,          // sub
    f.bass,                 // bass
    lerp(f.bass, f.mid, .5),// low-mid
    f.mid,                  // mid
    lerp(f.mid, f.high, .4),// high-mid
    lerp(f.mid, f.high, .7),// presence
    f.high,                 // brilliance
    f.high * .82,           // air
  ]
  return raw.map(clampPct)
}

export default function DetailView({
  track, songId, isCurrent, playing, onPlay, onFeelTest, onBack,
  liked, saved, onToggleLike, onToggleSave,
}: {
  track: Track | null | undefined;
  songId?: string;
  isCurrent: boolean;
  playing: boolean;
  onPlay: () => void;
  onFeelTest: () => void;
  onBack: () => void;
  liked: boolean;
  saved: boolean;
  onToggleLike: () => void;
  onToggleSave: () => void;
}) {
  const t = track
  if (!t) return null
  const f = FEEL[t.genre] || FEEL_DEFAULT
  const tot = f.pattern.reduce((a, b) => a + b, 0)
  const bands = to8Bands(f)

  return (
    <>
      <BackBar title="Дууны дэлгэрэнгүй" onBack={onBack} />
      <div className="grid grid-cols-[300px_1fr] max-nav:grid-cols-1 gap-[34px] items-start">
        <div>
          <img
            className="w-full aspect-square object-cover rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,.55)] max-nav:max-w-[280px]"
            src={t.cover}
            alt={t.title}
          />
          <div className="flex flex-col gap-2.5 mt-4">
            <ActionButton variant="primary" className="w-full text-center" onClick={onPlay}>
              {isCurrent && playing ? '⏸ Зогсоох' : '▶ Тоглуулах'}
            </ActionButton>
            <ActionButton variant="secondary" className="w-full text-center" onClick={onFeelTest}>📳 Туршиж мэдрэх</ActionButton>
            <div className="flex gap-2.5 mt-0.5">
              <button
                className={
                  "flex-1 flex items-center justify-center gap-[7px] border rounded-full py-2.5 px-2 text-[12.5px] font-semibold cursor-pointer transition-[color,border-color,background] duration-150 " +
                  (liked
                    ? "text-aqua border-[rgba(56,232,206,.4)] bg-[rgba(56,232,206,.08)]"
                    : "text-dim border-line bg-[rgba(20,28,27,.4)] hover:text-ink hover:border-[rgba(242,245,244,.24)]")
                }
                onClick={onToggleLike}
                aria-pressed={liked}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
                  <path d="M12 21s-7.5-4.9-10-9.2C.3 8.6 2 5 5.5 5c2 0 3.4 1.1 4.2 2.3L12 9.6l2.3-2.3C15.1 6.1 16.5 5 18.5 5 22 5 23.7 8.6 22 11.8 19.5 16.1 12 21 12 21z"/>
                </svg>
                Дуртай
              </button>
              <button
                className={
                  "flex-1 flex items-center justify-center gap-[7px] border rounded-full py-2.5 px-2 text-[12.5px] font-semibold cursor-pointer transition-[color,border-color,background] duration-150 " +
                  (saved
                    ? "text-warm border-[rgba(217,165,76,.4)] bg-[rgba(217,165,76,.08)]"
                    : "text-dim border-line bg-[rgba(20,28,27,.4)] hover:text-ink hover:border-[rgba(242,245,244,.24)]")
                }
                onClick={onToggleSave}
                aria-pressed={saved}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
                  <path d="M6 3h12v18l-6-3.6L6 21V3z"/>
                </svg>
                {saved ? 'Хадгалсан' : 'Хадгалах'}
              </button>
            </div>
          </div>

          {songId && (
            <div className="rounded-2xl p-5 mt-5 flex items-center gap-5 [background:linear-gradient(120deg,rgba(56,232,206,.14),rgba(14,92,83,.25)_55%,rgba(9,14,14,.4))]">
              <span className="bg-white p-2.5 rounded-lg inline-flex">
                <QRCodeSVG value={`${window.location.origin}/song/${songId}`} size={112} />
              </span>
              <div>
                <b className="block font-display font-semibold text-[15px] mb-1">Утсаараа сонсох</b>
                <p className="text-dim text-[13px] leading-[1.5]">QR кодыг уншуулж энэ дууг утсан дээрээ шууд нээж сонсоно уу.</p>
              </div>
            </div>
          )}
        </div>
        <div>
          <span className="w-fit inline-block text-[13px] font-semibold rounded-full py-2 px-4 bg-aqua text-[#04100E]">{t.genre}</span>
          <h2 className="text-[clamp(26px,3.4vw,40px)] font-extrabold tracking-[-.04em] mt-3">{t.title}</h2>
          <p className="text-dim text-[14.5px] mt-1">
            Дуучин: {t.artist}
            {t.composer && <> · Зохиолч: {t.composer}</>}
          </p>

          <div className="mt-8">
            <SectionTitle title="Энэ дуу хэрхэн мэдрэгдэх вэ?" />
          </div>
          <p className="text-ink text-[14.5px] leading-[1.65] max-w-[60ch]">{f.text}</p>

          <div className="mt-8">
            <SectionTitle title="Давтамжийн спектр — 8 бүс" />
          </div>
          <div className="flex flex-col gap-[13px] mt-1">
            {BANDS8.map(([lbl, hz], i) => (
              <div key={lbl}>
                <div className="flex items-baseline gap-3 mb-1.5">
                  <b className="text-[13.5px] font-semibold min-w-[44px]">{lbl}</b>
                  <span className="mono !text-[9px]">{hz}</span>
                  <span className="ml-auto font-mono text-[11px] text-aqua">{bands[i]}%</span>
                </div>
                <div className="h-[7px] rounded-[10px] bg-white/[.09] overflow-hidden">
                  <i
                    className="block h-full rounded-[10px] bg-[linear-gradient(90deg,rgba(56,232,206,.5),var(--aqua))] transition-[width] duration-[800ms] ease-[cubic-bezier(.16,.8,.24,1)]"
                    style={{ width: bands[i] + '%' }}
                  ></i>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <SectionTitle title="Чичиргээний хэв маяг" />
          </div>
          <div className="flex items-center h-[26px] border border-line rounded-[9px] px-2.5 bg-[rgba(20,28,27,.4)]" aria-label="Чичиргээний хэв маяг">
            {f.pattern.map((ms, i) => (
              i % 2 === 0
                ? (
                  <i
                    key={i}
                    className="block h-3 rounded-[3px] bg-aqua shadow-[0_0_8px_rgba(56,232,206,.4)]"
                    style={{ flex: ms / tot + ' 0 0' }}
                    title={ms + ' мс чичиргээ'}
                  ></i>
                )
                : <u key={i} className="block h-0.5 bg-[rgba(242,245,244,.18)]" style={{ flex: ms / tot + ' 0 0' }}></u>
            ))}
          </div>
          <p className="mono !text-[9px] mt-2">{f.pattern.join(' · ')} мс</p>
        </div>
      </div>
    </>
  )
}
