"use client";

import { QRCodeSVG } from "qrcode.react";
import type { Track } from "@/types/track";
import BackBar from "./BackBar";
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
      <div className="dt-wrap">
        <div className="dt-left">
          <img className="dt-cover" src={t.cover} alt={t.title} />
          <div className="dt-btns">
            <button className="bt bt-a" onClick={onPlay}>
              {isCurrent && playing ? '⏸ Зогсоох' : '▶ Тоглуулах'}
            </button>
            <button className="bt" onClick={onFeelTest}>📳 Туршиж мэдрэх</button>
            <div className="dt-collect">
              <button
                className={'dt-cbtn' + (liked ? ' on love' : '')}
                onClick={onToggleLike}
                aria-pressed={liked}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
                  <path d="M12 21s-7.5-4.9-10-9.2C.3 8.6 2 5 5.5 5c2 0 3.4 1.1 4.2 2.3L12 9.6l2.3-2.3C15.1 6.1 16.5 5 18.5 5 22 5 23.7 8.6 22 11.8 19.5 16.1 12 21 12 21z"/>
                </svg>
                Дуртай
              </button>
              <button
                className={'dt-cbtn' + (saved ? ' on save' : '')}
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
            <div className="sp-banner dv-note" style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 20 }}>
              <span style={{ background: "#fff", padding: 10, borderRadius: 8, display: "inline-flex" }}>
                <QRCodeSVG value={`${window.location.origin}/song/${songId}`} size={112} />
              </span>
              <div>
                <b>Утсаараа сонсох</b>
                <p>QR кодыг уншуулж энэ дууг утсан дээрээ шууд нээж сонсоно уу.</p>
              </div>
            </div>
          )}
        </div>
        <div className="dt-right">
          <span className="sp-chip on dt-genre">{t.genre}</span>
          <h2 className="dt-title">{t.title}</h2>
          <p className="dt-artist">
            Дуучин: {t.artist}
            {t.composer && <> · Зохиолч: {t.composer}</>}
          </p>

          <h3 className="st-h">Энэ дуу хэрхэн мэдрэгдэх вэ?</h3>
          <p className="dt-feel">{f.text}</p>

          <h3 className="st-h">Давтамжийн спектр — 8 бүс</h3>
          <div className="dt-bands">
            {BANDS8.map(([lbl, hz], i) => (
              <div className="dt-band" key={lbl}>
                <div className="dt-band-top"><b>{lbl}</b><span className="mono">{hz}</span><span className="dt-pct">{bands[i]}%</span></div>
                <div className="dt-meter"><i style={{ width: bands[i] + '%' }}></i></div>
              </div>
            ))}
          </div>

          <h3 className="st-h">Чичиргээний хэв маяг</h3>
          <div className="dt-hap" aria-label="Чичиргээний хэв маяг">
            {f.pattern.map((ms, i) => (
              i % 2 === 0
                ? <i key={i} style={{ flex: ms / tot + ' 0 0' }} title={ms + ' мс чичиргээ'}></i>
                : <u key={i} style={{ flex: ms / tot + ' 0 0' }}></u>
            ))}
          </div>
          <p className="dt-hap-lb mono">{f.pattern.join(' · ')} мс</p>
        </div>
      </div>
    </>
  )
}
