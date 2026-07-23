import { useEffect, useRef, useState } from 'react'
import { TRACKS } from './tracks.js'

const PREVIEW_SEC = 30 // захиалгагүй хэрэглэгчийн урьдчилан сонсох хугацаа

function fmt(t) {
  if (!isFinite(t)) return '0:00'
  const m = Math.floor(t / 60), s = Math.floor(t % 60)
  return m + ':' + String(s).padStart(2, '0')
}

export default function Player({ open, onClose, user, subscribed, onSubscribe }) {
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('Бүгд')
  const [recent, setRecent] = useState([])  // саяхан сонссон track id-ууд
  const [cur, setCur] = useState(null)      // одоо тоглож буй track
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [dur, setDur] = useState(0)
  const [vibro, setVibro] = useState(true)
  const [limitHit, setLimitHit] = useState(false)

  const audioRef = useRef(null)
  const ctxRef = useRef(null)   // { ctx, an, data }
  const pulseRef = useRef(null) // гэрлийн пульс элемент
  const levelRef = useRef({ lo: 0, mi: 0, hi: 0 })

  const canVibrate = typeof navigator !== 'undefined' && !!navigator.vibrate

  /* аудио анализатор — эхний тоглуулалтад үүсгэнэ (autoplay бодлого) */
  function ensureCtx() {
    if (ctxRef.current) { ctxRef.current.ctx.resume(); return }
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const src = ctx.createMediaElementSource(audioRef.current)
    const an = ctx.createAnalyser()
    an.fftSize = 256; an.smoothingTimeConstant = .7
    src.connect(an); an.connect(ctx.destination)
    ctxRef.current = { ctx, an, data: new Uint8Array(an.frequencyBinCount) }
  }

  /* давтамжийн түвшин тооцох + гэрлийн пульс + чичиргээ */
  useEffect(() => {
    if (!open) return
    let raf, vibTimer
    const loop = () => {
      raf = requestAnimationFrame(loop)
      const a = ctxRef.current
      if (!a || !playing) return
      a.an.getByteFrequencyData(a.data)
      const n = a.data.length, ai = Math.floor(n * .08), bi = Math.floor(n * .38)
      let lo = 0, mi = 0, hi = 0, i
      for (i = 0; i < ai; i++) lo += a.data[i]
      for (i = ai; i < bi; i++) mi += a.data[i]
      for (i = bi; i < n; i++) hi += a.data[i]
      lo /= ai * 255; mi /= (bi - ai) * 255; hi /= (n - bi) * 255
      levelRef.current = { lo, mi, hi }
      if (pulseRef.current) {
        pulseRef.current.style.opacity = (.1 + lo * .7).toFixed(3)
        pulseRef.current.style.transform = 'translate(-50%,-50%) scale(' + (1 + lo * .5).toFixed(3) + ')'
      }
    }
    loop()
    /* чичиргээ — 170 мс тутам түвшнээс хамаарсан хэв маяг (Android) */
    if (canVibrate) {
      vibTimer = setInterval(() => {
        if (!playing || !vibro) return
        const { lo, mi, hi } = levelRef.current
        if (lo > .45) navigator.vibrate(Math.round(60 + lo * 80))
        else if (mi > .35) navigator.vibrate([30, 30, 30])
        else if (hi > .3) navigator.vibrate(12)
      }, 170)
    }
    return () => { cancelAnimationFrame(raf); clearInterval(vibTimer); if (canVibrate) navigator.vibrate(0) }
  }, [open, playing, vibro, canVibrate])

  /* audio элементийн үйл явдлууд */
  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    const onTime = () => {
      setTime(el.currentTime)
      if (!subscribed && el.currentTime >= PREVIEW_SEC) {
        el.pause(); setLimitHit(true)
      }
    }
    const onMeta = () => setDur(el.duration)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onEnd = () => next()
    el.addEventListener('timeupdate', onTime)
    el.addEventListener('loadedmetadata', onMeta)
    el.addEventListener('play', onPlay)
    el.addEventListener('pause', onPause)
    el.addEventListener('ended', onEnd)
    return () => {
      el.removeEventListener('timeupdate', onTime)
      el.removeEventListener('loadedmetadata', onMeta)
      el.removeEventListener('play', onPlay)
      el.removeEventListener('pause', onPause)
      el.removeEventListener('ended', onEnd)
    }
  })

  /* хаагдахад зогсооно */
  useEffect(() => {
    if (!open && audioRef.current) { audioRef.current.pause() }
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const GENRES = ['Бүгд', ...new Set(TRACKS.map((t) => t.genre))]
  const list = TRACKS.filter((t) => {
    if (genre !== 'Бүгд' && t.genre !== genre) return false
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (t.title + ' ' + t.artist + ' ' + t.genre).toLowerCase().includes(q)
  })
  const recentTracks = recent.map((id) => TRACKS.find((t) => t.id === id)).filter(Boolean)

  function playTrack(t) {
    const el = audioRef.current
    ensureCtx()
    setLimitHit(false)
    if (cur?.id === t.id) { playing ? el.pause() : el.play(); return }
    setCur(t)
    setRecent((r) => [t.id, ...r.filter((id) => id !== t.id)].slice(0, 6))
    el.src = t.file
    el.play()
  }
  function togglePlay() {
    if (!cur) { if (list[0]) playTrack(list[0]); return }
    ensureCtx()
    const el = audioRef.current
    if (playing) el.pause()
    else { if (limitHit) return; el.play() }
  }
  function seek(dt) {
    const el = audioRef.current
    if (!el || !cur) return
    let t = Math.max(0, el.currentTime + dt)
    if (!subscribed) t = Math.min(t, PREVIEW_SEC - 1)
    el.currentTime = Math.min(t, (el.duration || 1) - .5)
  }
  function seekTo(e) {
    const el = audioRef.current
    if (!el || !cur || !dur) return
    const r = e.currentTarget.getBoundingClientRect()
    let p = (e.clientX - r.left) / r.width
    let t = p * dur
    if (!subscribed) t = Math.min(t, PREVIEW_SEC - 1)
    el.currentTime = t
  }
  function step(dir) {
    if (!cur) return
    const i = TRACKS.findIndex((t) => t.id === cur.id)
    const nt = TRACKS[(i + dir + TRACKS.length) % TRACKS.length]
    playTrack(nt)
  }
  function next() { step(1) }

  const pct = dur ? (time / dur) * 100 : 0
  const previewPct = dur && !subscribed ? Math.min(100, (PREVIEW_SEC / dur) * 100) : 100

  return (
    <div className="pl-ov sp">
      <audio ref={audioRef} crossOrigin="anonymous" />
      <div className="pl-glow" ref={pulseRef} aria-hidden="true"></div>

      {/* дээд баар: лого · хайлт · захиалга/хэрэглэгч */}
      <header className="sp-top">
        <span className="sp-logo">МЭДРЭХ<sup>®</sup></span>
        <div className="sp-search">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.5" y2="16.5" />
          </svg>
          <input
            type="search"
            placeholder="Юу сонсмоор байна?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Дуу хайх"
          />
        </div>
        <div className="sp-right">
          {subscribed
            ? <span className="pl-badge mono">PRO</span>
            : <button className="bt bt-a sp-subbtn" onClick={onSubscribe}>Захиалга авах</button>}
          <span className="sp-user" title={user?.email}>{user?.name}</span>
          <button className="auth-x pl-x" onClick={onClose} aria-label="Хаах">✕</button>
        </div>
      </header>

      {/* их бие: зүүн sidebar + үндсэн хэсэг */}
      <div className="sp-shell">
        <aside className="sp-side">
          <span className="mono sp-side-h">Төрөл</span>
          <nav className="sp-side-nav">
            {GENRES.map((g) => (
              <button key={g} className={'sp-chip' + (genre === g ? ' on' : '')} onClick={() => setGenre(g)}>
                {g}
              </button>
            ))}
          </nav>

          {recentTracks.length > 0 && (
            <>
              <span className="mono sp-side-h">Саяхан сонссон</span>
              <div className="sp-side-recent">
                {recentTracks.map((t) => (
                  <button key={t.id} className={'sp-rcard' + (cur?.id === t.id ? ' on' : '')} onClick={() => playTrack(t)}>
                    <img src={t.cover} alt="" />
                    <span>{t.title}</span>
                    {cur?.id === t.id && playing
                      ? <span className="pl-eq sp-req" aria-hidden="true"><u></u><u></u><u></u></span>
                      : <i aria-hidden="true">▶</i>}
                  </button>
                ))}
              </div>
            </>
          )}
        </aside>

        <main className="sp-main">
          <h2 className="sp-h">Тренд дуунууд</h2>
        {list.length === 0 && <p className="adm-empty">"{query}" — олдсонгүй</p>}
        <div className="sp-grid">
          {list.map((t) => {
            const isCur = cur?.id === t.id
            return (
              <button key={t.id} className={'sp-card' + (isCur ? ' on' : '')} onClick={() => playTrack(t)}>
                <span className="sp-cover">
                  <img src={t.cover} alt="" loading="lazy" />
                  <span className={'sp-playbtn' + (isCur && playing ? ' show' : '')} aria-hidden="true">
                    {isCur && playing ? '⏸' : '▶'}
                  </span>
                  {isCur && playing && (
                    <span className="pl-eq sp-eq" aria-hidden="true"><u></u><u></u><u></u></span>
                  )}
                </span>
                <b>{t.title}</b>
                <i>{t.artist} · {t.genre}</i>
              </button>
            )
          })}
        </div>

        {/* бүх дуунууд — жагсаалт хэлбэрээр */}
        {list.length > 0 && (
          <>
            <h2 className="sp-h sp-h2">Бүх дуунууд</h2>
            <div className="sp-list">
              {list.map((t, i) => {
                const isCur = cur?.id === t.id
                return (
                  <button key={t.id} className={'sp-lrow' + (isCur ? ' on' : '')} onClick={() => playTrack(t)}>
                    <span className="sp-lno mono">{String(i + 1).padStart(2, '0')}</span>
                    <img className="sp-lthumb" src={t.cover} alt="" loading="lazy" />
                    <span className="sp-lmeta">
                      <b>{t.title}</b>
                      <i>{t.artist}</i>
                    </span>
                    <span className="sp-lgenre mono">{t.genre}</span>
                    <span className="sp-lact" aria-hidden="true">
                      {isCur && playing
                        ? <span className="pl-eq" style={{ height: 14 }}><u></u><u></u><u></u></span>
                        : '▶'}
                    </span>
                  </button>
                )
              })}
            </div>
          </>
        )}

          {/* PRO баннер */}
          {!subscribed && (
            <div className="sp-banner">
              <div>
                <b>МЭДРЭХ PRO болоорой</b>
                <p>Бүх дууг бүрэн сонсож, чичиргээ + гэрлийн горимыг хязгааргүй мэдэр. Үнэгүй горимд дуу тус бүрээс {PREVIEW_SEC} секунд сонсоно.</p>
              </div>
              <button className="bt bt-a" onClick={onSubscribe}>9'900₮ / сар — Захиалах</button>
            </div>
          )}
        </main>
      </div>

      {/* захиалгын санал */}
      {limitHit && !subscribed && (
        <div className="sp-limit">
          <p>Урьдчилан сонсголт дууслаа — бүтэн дуу сонсохын тулд PRO захиалга аваарай.</p>
          <button className="bt bt-a" onClick={onSubscribe}>Захиалга авах →</button>
        </div>
      )}

      {/* доод тоглуулагчийн баар */}
      <footer className="sp-bar">
        <div className="sp-bar-l">
          {cur ? (
            <>
              <img className="sp-thumb" src={cur.cover} alt="" />
              <div className="sp-bar-meta">
                <b>{cur.title}</b>
                <i>{cur.artist}</i>
              </div>
            </>
          ) : (
            <span className="sp-bar-hint">Дуу сонгоогүй байна</span>
          )}
        </div>

        <div className="sp-bar-c">
          <div className="sp-ctl">
            <button onClick={() => step(-1)} aria-label="Өмнөх дуу">⏮</button>
            <button onClick={() => seek(-10)} aria-label="10 секунд ухраах" className="sp-skip">−10с</button>
            <button className="sp-play" onClick={togglePlay} aria-label={playing ? 'Зогсоох' : 'Тоглуулах'}>
              {playing ? '⏸' : '▶'}
            </button>
            <button onClick={() => seek(10)} aria-label="10 секунд урагшлуулах" className="sp-skip">+10с</button>
            <button onClick={() => step(1)} aria-label="Дараагийн дуу">⏭</button>
          </div>
          <div className="sp-seek">
            <span className="mono">{fmt(time)}</span>
            <div className="pl-bar" onClick={seekTo} role="slider" aria-label="Гүйлгэх"
              aria-valuemin={0} aria-valuemax={Math.round(dur)} aria-valuenow={Math.round(time)}>
              {!subscribed && <i className="pl-lock" style={{ left: previewPct + '%' }}></i>}
              <i className="pl-fill" style={{ width: pct + '%' }}></i>
            </div>
            <span className="mono">{fmt(dur)}</span>
          </div>
        </div>

        <div className="sp-bar-r">
          <button
            className={'sp-vibro' + (vibro ? ' on' : '')}
            onClick={() => setVibro(!vibro)}
            aria-pressed={vibro}
            title={canVibrate ? 'Чичиргээ горим' : 'Утсан дээр чичиргээ ажиллана — энд гэрлийн пульс'}
          >
            📳 {vibro ? 'Асаалттай' : 'Унтраалттай'}
          </button>
        </div>
      </footer>
    </div>
  )
}
