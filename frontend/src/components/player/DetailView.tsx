"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import BackBar from "./BackBar";
import { SectionTitle } from "@/components/ui/PageHeader";
import { ActionButton } from "@/components/ui/ActionGroup";
import { FEEL, FEEL_DEFAULT } from "@/lib/player/constants";
import { useDeviceSync } from "@/lib/socket/useDeviceSync";
import * as songsApi from "@/lib/api/client";
import type { PlayerTrack } from "./Player";

interface MoreByArtistTrack {
  id: string;
  title: string;
  genre: string | null;
  coverUrl: string | null;
}

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
  liked, saved, onToggleLike, onToggleSave, recommendReasons, deviceSync, onOpenArtist,
}: {
  track: PlayerTrack | null | undefined;
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
  /* AI-санал болгосон шалтгаанууд (recommendations.ts) — зөвхөн энэ дуу одоогийн
     "Танд санал болгож байна" жагсаалтад байвал ирнэ, эс бол undefined. */
  recommendReasons?: string[];
  /* Утас QR pairing (session/socket sync) — songId-той дуунд зориулсан хуучин
     QR-ээс ялгаатай, ямар ч дуу дээр (static catalog track ч) ажиллана. */
  deviceSync: ReturnType<typeof useDeviceSync>;
  /* Дуучны нэр дээр дарахад дуучны хуудас руу шилжинэ (зөвхөн artistId-тэй үед л
     идэвхтэй харагдана — static catalog/custom track дээр Artist relation байхгүй). */
  onOpenArtist: (artistId: string) => void;
}) {
  const [whyOpen, setWhyOpen] = useState(false)
  const [moreByArtist, setMoreByArtist] = useState<MoreByArtistTrack[]>([])
  const t = track

  /* "Тухайн дуучны бусад дуунууд" — backend GET /songs/:id/more-by-artist (songId-тэй,
     artistId-тэй дуунд л ажиллана; songId байхгүй бол backend дуудлага хийхгүй). */
  useEffect(() => {
    if (!songId) {
      setMoreByArtist([])
      return
    }
    let alive = true
    songsApi
      .getMoreByArtist(songId)
      .then((rows) => {
        if (alive) setMoreByArtist(rows.map((s) => ({ id: s.id, title: s.title, genre: s.genre, coverUrl: s.coverUrl })))
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [songId])

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

          {/* Утас QR pairing (session/socket, чичиргээ sync) — songId шаардахгүй,
              ямар ч дуу дээр (static demo track ч) ажиллана. deviceSync.qrToken
              өөрчлөгдөхгүй хэвээр л, зөвхөн 1 удаа createSession() дуудна. */}
          <div className="relative rounded-[22px] p-6 mt-5 overflow-hidden border border-aqua/[.16] [background:linear-gradient(165deg,rgba(56,232,206,.1),rgba(9,14,14,.55)_60%)] shadow-[0_20px_50px_rgba(0,0,0,.4)]">
            <div
              className="pointer-events-none absolute -top-16 -right-16 w-52 h-52 rounded-full bg-aqua/[.14] blur-[60px]"
              aria-hidden="true"
            />
            <div className="relative flex flex-col items-center text-center gap-4">
              {deviceSync.qrState === "waiting" && deviceSync.qrToken ? (
                <span className="bg-white p-4 rounded-2xl inline-flex shadow-[0_10px_30px_rgba(0,0,0,.35)]">
                  <QRCodeSVG value={`${window.location.origin}/mobile/${deviceSync.qrToken}`} size={168} />
                </span>
              ) : deviceSync.qrState === "connected" ? (
                <span className="w-[168px] h-[168px] rounded-2xl bg-aqua/[.14] border border-aqua/30 text-aqua flex items-center justify-center text-5xl" aria-hidden="true">
                  🟢
                </span>
              ) : (
                <button
                  className="w-[168px] h-[168px] rounded-2xl border-2 border-dashed border-aqua/30 flex flex-col items-center justify-center gap-2 text-aqua text-[13px] font-semibold transition-colors duration-200 hover:border-aqua/60 hover:bg-aqua/[.06] focus-visible:outline-none focus-visible:shadow-glow-aqua"
                  onClick={() => deviceSync.createSession()}
                >
                  <span className="text-3xl" aria-hidden="true">📱</span>
                  QR үүсгэх
                </button>
              )}
              <div>
                <b className="block font-display font-semibold text-[16px] mb-1.5">
                  {deviceSync.qrState === "connected" ? "🟢 Утас холбогдсон" : "Чичиргээгээ утсандаа авах"}
                </b>
                <p className="text-dim text-[13px] leading-[1.55] max-w-[240px] mx-auto">
                  {deviceSync.qrState === "connected"
                    ? "Одоо тоглуулж буй дуутай синхроноор утас чичирнэ."
                    : "QR кодыг MEDREH mobile-оор уншуулж, чичиргээг утсандаа синхроноор аваарай — дуу солигдоход ч энэ холболт хэвээр үлдэнэ."}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <span className="w-fit inline-block text-[13px] font-semibold rounded-full py-2 px-4 bg-aqua text-[#04100E]">{t.genre}</span>
          <h2 className="text-[clamp(26px,3.4vw,40px)] font-extrabold tracking-[-.04em] mt-3">{t.title}</h2>
          <p className="text-dim text-[14.5px] mt-1">
            Дуучин:{" "}
            {t.artistId ? (
              <button
                className="text-aqua font-semibold hover:underline focus-visible:outline-none focus-visible:shadow-glow-aqua rounded-sm"
                onClick={() => onOpenArtist(t.artistId!)}
              >
                {t.artist}
              </button>
            ) : (
              t.artist
            )}
            {t.composer && <> · Зохиолч: {t.composer}</>}
            {t.releaseYear && <> · {t.releaseYear}</>}
          </p>
          {t.description && <p className="text-dim text-[13.5px] leading-[1.55] max-w-[60ch] mt-2">{t.description}</p>}

          {recommendReasons && recommendReasons.length > 0 && (
            <div className="mt-5 rounded-2xl border border-aqua/[.25] bg-aqua/[.05] overflow-hidden">
              <button
                className="w-full flex items-center justify-between gap-3 py-3 px-4 text-left focus-visible:outline-none focus-visible:shadow-glow-aqua"
                onClick={() => setWhyOpen((o) => !o)}
                aria-expanded={whyOpen}
                aria-controls="why-recommended-panel"
              >
                <span className="flex items-center gap-2 text-[13.5px] font-semibold text-aqua">✨ Яагаад санал болгосон бэ?</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={"text-aqua transition-transform duration-250 " + (whyOpen ? "rotate-180" : "")}
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <AnimatePresence initial={false}>
                {whyOpen && (
                  <motion.div
                    id="why-recommended-panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    style={{ overflow: "hidden" }}
                  >
                    <ul className="flex flex-col gap-1.5 px-4 pb-4 list-none">
                      {recommendReasons.map((r) => (
                        <li key={r} className="text-[12.5px] text-ink flex items-center gap-2">
                          <span className="text-aqua" aria-hidden="true">✓</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

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

          {moreByArtist.length > 0 && (
            <>
              <div className="mt-8">
                <SectionTitle title={`${t.artist} — бусад дуунууд`} />
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 mt-1 [scrollbar-width:thin] [scrollbar-color:var(--faint)_transparent]" role="list" aria-label={`${t.artist}-ийн бусад дуунууд`}>
                {moreByArtist.map((m) => (
                  <button
                    key={m.id}
                    role="listitem"
                    className="flex-none w-[140px] text-left p-2.5 rounded-xl border border-white/[.06] bg-white/[.03] transition-colors duration-200 hover:bg-white/[.06] hover:border-white/[.1] focus-visible:outline-none focus-visible:shadow-glow-aqua"
                    onClick={() => t.artistId && onOpenArtist(t.artistId)}
                  >
                    <span className="relative rounded-lg overflow-hidden aspect-square mb-2 bg-[#0B1211] block">
                      {m.coverUrl && <img src={m.coverUrl} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />}
                    </span>
                    <b className="block font-semibold text-[12.5px] whitespace-nowrap overflow-hidden text-ellipsis">{m.title}</b>
                    <i className="not-italic text-[11px] text-dim whitespace-nowrap overflow-hidden text-ellipsis block">{m.genre}</i>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
