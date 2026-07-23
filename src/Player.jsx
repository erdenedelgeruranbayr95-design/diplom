import { useEffect, useRef, useState } from 'react'
import { TRACKS } from './tracks.js'
import { idbGet } from './idb.js'
import {
  loadCustomMeta, loadFeed, getReadTs, markFeedRead,
  loadStats, saveStats, todayKey, loadPayments, pushFeed,
} from './library.js'
import { loadUsers } from './AuthModal.jsx'
import Calibrate from './Calibrate.jsx'
import { PREVIEW_SEC, VIB_LEVELS, LIGHT_LEVELS, DEFAULT_PREFS, FEEL, FEEL_DEFAULT, ICONS } from './player/constants.jsx'
import { fmt, fmtDur, relTime } from './player/format.js'
import StatCard from './player/StatCard.jsx'
import BackBar from './player/BackBar.jsx'
import { LikeBtn, SaveBtn, InfoBtn } from './player/TrackButtons.jsx'
import SideList from './player/SideList.jsx'

export default function Player({ open, onClose, user, subscribed, onSubscribe, isAdmin, onAdmin, onLogout, onCancelSub }) {
  const [view, setView] = useState('home') // home | stats | billing | help | detail
  const [detail, setDetail] = useState(null)
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('Бүгд')
  const [recent, setRecent] = useState([])
  const [likes, setLikes] = useState([])
  const [saves, setSaves] = useState([])
  const [custom, setCustom] = useState([]) // админы нэмсэн дуунууд (IndexedDB)
  const [cur, setCur] = useState(null)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [dur, setDur] = useState(0)
  const [vibro, setVibro] = useState(true)
  const [limitHit, setLimitHit] = useState(false)
  const [prefs, setPrefs] = useState(DEFAULT_PREFS)
  const [prefsReady, setPrefsReady] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [feed, setFeed] = useState([])
  const [readTs, setReadTs] = useState(0)
  const [immersive, setImmersive] = useState(false)
  const [calibOpen, setCalibOpen] = useState(false)
  const [bcast, setBcast] = useState('')       // админы зарлал
  const [bcastOk, setBcastOk] = useState('')
  const [, setUsersTick] = useState(0)         // хэрэглэгч өөрчлөгдөхөд дахин зурна

  const audioRef = useRef(null)
  const ctxRef = useRef(null)
  const toneCtxRef = useRef(null)
  const pulseRef = useRef(null)
  const levelRef = useRef({ lo: 0, mi: 0, hi: 0 })
  const prefsRef = useRef(prefs)
  const curRef = useRef(null)
  const statsRef = useRef(null)
  const vizRef = useRef([])
  const immBarsRef = useRef([])
  const immPulseRef = useRef(null)
  const autoCalRef = useRef(false)
  prefsRef.current = prefs

  const canVibrate = typeof navigator !== 'undefined' && !!navigator.vibrate

  /* ---------- хэрэглэгчийн өгөгдөл ---------- */
  const email = user?.email || ''
  const likesKey = 'medreh_likes:' + email
  const savesKey = 'medreh_saves:' + email
  const prefsKey = 'medreh_prefs:' + email
  useEffect(() => {
    if (!email) return
    try { setLikes(JSON.parse(localStorage.getItem(likesKey)) || []) } catch { setLikes([]) }
    try { setSaves(JSON.parse(localStorage.getItem(savesKey)) || []) } catch { setSaves([]) }
    try {
      const p = JSON.parse(localStorage.getItem(prefsKey))
      setPrefs(p ? { ...DEFAULT_PREFS, ...p, bands: { ...DEFAULT_PREFS.bands, ...p.bands } } : DEFAULT_PREFS)
    } catch { setPrefs(DEFAULT_PREFS) }
    statsRef.current = loadStats(email)
    setReadTs(getReadTs(email))
    setPrefsReady(true)
  }, [likesKey, savesKey, prefsKey, email])

  /* анх удаа орж ирсэн хэрэглэгчид калибровк санал болгоно (админд хэрэггүй) */
  useEffect(() => {
    if (open && prefsReady && !prefs.calibrated && !autoCalRef.current && !isAdmin) {
      autoCalRef.current = true
      setCalibOpen(true)
    }
  }, [open, prefsReady, prefs.calibrated, isAdmin])

  /* нээгдэхэд: админ бол хяналтын самбараас, энгийн хэрэглэгч нүүрээс эхэлнэ */
  useEffect(() => {
    if (open) setView(isAdmin ? 'admin' : 'home')
  }, [open, isAdmin])

  /* админ самбараас хэрэглэгч устгагдахад тоог шинэчилнэ */
  useEffect(() => {
    const onUsers = () => setUsersTick((t) => t + 1)
    addEventListener('medreh:users-changed', onUsers)
    return () => removeEventListener('medreh:users-changed', onUsers)
  }, [])

  /* ---------- админы нэмсэн дуунуудыг IndexedDB-ээс ачаална ---------- */
  useEffect(() => {
    if (!open) return
    let alive = true
    const urls = []
    async function load() {
      const metas = loadCustomMeta()
      const out = []
      for (const m of metas) {
        const audio = await idbGet('audio-' + m.id).catch(() => null)
        if (!audio) continue
        const aUrl = URL.createObjectURL(audio); urls.push(aUrl)
        let cover = null
        if (m.hasCover) {
          const cBlob = await idbGet('cover-' + m.id).catch(() => null)
          if (cBlob) { cover = URL.createObjectURL(cBlob); urls.push(cover) }
        }
        out.push({
          id: m.id, title: m.title,
          artist: m.singer || m.artist || 'Тодорхойгүй',
          composer: m.composer || '',
          genre: m.genre,
          file: aUrl,
          /* обложка: файл → линк → fallback дарааллаар */
          cover: cover || m.coverUrl || TRACKS[Math.abs(m.title.length) % TRACKS.length].cover,
          custom: true,
        })
      }
      if (alive) setCustom(out)
    }
    load()
    const onLib = () => load()
    addEventListener('medreh:library-changed', onLib)
    return () => {
      alive = false
      removeEventListener('medreh:library-changed', onLib)
      urls.forEach((u) => URL.revokeObjectURL(u))
    }
  }, [open])

  /* ---------- мэдэгдлийн feed ---------- */
  useEffect(() => {
    if (!open) return
    setFeed(loadFeed())
    const onFeed = () => setFeed(loadFeed())
    addEventListener('medreh:feed-changed', onFeed)
    addEventListener('storage', onFeed)
    return () => {
      removeEventListener('medreh:feed-changed', onFeed)
      removeEventListener('storage', onFeed)
    }
  }, [open])
  const unread = feed.filter((f) => f.date > readTs).length
  function openNotifs() {
    const next = !notifOpen
    setNotifOpen(next); setSettingsOpen(false); setProfileOpen(false)
    if (next && email) { markFeedRead(email); setTimeout(() => setReadTs(Date.now()), 600) }
  }

  function toggleLike(id) {
    setLikes((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev]
      localStorage.setItem(likesKey, JSON.stringify(next))
      return next
    })
  }
  function toggleSave(id) {
    setSaves((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev]
      localStorage.setItem(savesKey, JSON.stringify(next))
      return next
    })
  }
  function updatePrefs(patch) {
    setPrefs((prev) => {
      const next = { ...prev, ...patch, bands: { ...prev.bands, ...(patch.bands || {}) } }
      if (!next.bands.bass && !next.bands.mid && !next.bands.high) return prev
      localStorage.setItem(prefsKey, JSON.stringify(next))
      return next
    })
  }

  /* ---------- аудио ---------- */
  function ensureCtx() {
    if (ctxRef.current) { ctxRef.current.ctx.resume(); return }
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const src = ctx.createMediaElementSource(audioRef.current)
    const an = ctx.createAnalyser()
    an.fftSize = 256; an.smoothingTimeConstant = .7
    src.connect(an); an.connect(ctx.destination)
    ctxRef.current = { ctx, an, data: new Uint8Array(an.frequencyBinCount) }
  }
  function playTone(freq, d, type) {
    if (!toneCtxRef.current) toneCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    const ctx = toneCtxRef.current
    if (ctx.state === 'suspended') ctx.resume()
    const o = ctx.createOscillator(), g = ctx.createGain()
    o.type = type; o.frequency.value = freq
    g.gain.setValueAtTime(0, ctx.currentTime)
    g.gain.linearRampToValueAtTime(.45, ctx.currentTime + .02)
    g.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + d)
    o.connect(g); g.connect(ctx.destination)
    o.start(); o.stop(ctx.currentTime + d + .05)
  }

  /* RAF: түвшин + пульс + visualizer-ууд; interval: чичиргээ */
  useEffect(() => {
    if (!open) return
    let raf, vibTimer
    const loop = () => {
      raf = requestAnimationFrame(loop)
      const a = ctxRef.current
      const p = prefsRef.current
      const lightMult = LIGHT_LEVELS[p.light].mult
      if (a && playing) {
        a.an.getByteFrequencyData(a.data)
        const n = a.data.length, ai = Math.floor(n * .08), bi = Math.floor(n * .38)
        let lo = 0, mi = 0, hi = 0, i
        for (i = 0; i < ai; i++) lo += a.data[i]
        for (i = ai; i < bi; i++) mi += a.data[i]
        for (i = bi; i < n; i++) hi += a.data[i]
        lo /= ai * 255; mi /= (bi - ai) * 255; hi /= (n - bi) * 255
        levelRef.current = { lo, mi, hi }
        const lvl = Math.max(p.bands.bass ? lo : 0, p.bands.mid ? mi : 0, p.bands.high ? hi : 0)
        if (pulseRef.current) {
          pulseRef.current.style.opacity = Math.min(1, (.1 + lvl * .7) * lightMult).toFixed(3)
          pulseRef.current.style.transform = 'translate(-50%,-50%) scale(' + (1 + lvl * .5 * lightMult).toFixed(3) + ')'
        }
        vizRef.current.forEach((el, idx) => {
          if (!el) return
          const v = a.data[Math.floor(idx / vizRef.current.length * n * .7)] / 255
          el.style.height = Math.max(3, v * 22) + 'px'
        })
        immBarsRef.current.forEach((el, idx) => {
          if (!el) return
          const v = a.data[Math.floor(idx / immBarsRef.current.length * n * .72)] / 255
          el.style.height = Math.max(2, v * 100 * Math.min(1.2, lightMult)) + '%'
        })
        if (immPulseRef.current) {
          immPulseRef.current.style.transform = 'scale(' + (1 + lvl * .9 * lightMult).toFixed(3) + ')'
          immPulseRef.current.style.opacity = Math.min(1, .25 + lvl * .85 * lightMult).toFixed(3)
        }
      } else {
        vizRef.current.forEach((el) => { if (el) el.style.height = '3px' })
      }
    }
    loop()
    if (canVibrate) {
      vibTimer = setInterval(() => {
        if (!playing || !vibro) return
        const { lo, mi, hi } = levelRef.current
        const p = prefsRef.current
        const m = VIB_LEVELS[p.vib].mult
        let fired = false
        if (p.bands.bass && lo > .45) { navigator.vibrate(Math.round((60 + lo * 80) * m)); fired = true }
        else if (p.bands.mid && mi > .35) { navigator.vibrate([Math.round(30 * m), 30, Math.round(30 * m)]); fired = true }
        else if (p.bands.high && hi > .3) { navigator.vibrate(Math.max(8, Math.round(12 * m))); fired = true }
        if (fired && statsRef.current) statsRef.current.vib++
      }, 170)
    }
    return () => { cancelAnimationFrame(raf); clearInterval(vibTimer); if (canVibrate) navigator.vibrate(0) }
  }, [open, playing, vibro, canVibrate])

  /* сонсолтын статистик — секунд тутам хуримтлуулж, 5 сек тутам хадгална */
  useEffect(() => {
    if (!open || !playing || !email) return
    let n = 0
    const iv = setInterval(() => {
      const s = statsRef.current, c = curRef.current
      if (!s || !c) return
      s.total++
      s.byGenre[c.genre] = (s.byGenre[c.genre] || 0) + 1
      s.byTrack[c.id] = (s.byTrack[c.id] || 0) + 1
      const dk = todayKey()
      s.days[dk] = (s.days[dk] || 0) + 1
      if (++n % 5 === 0) saveStats(email, s)
    }, 1000)
    return () => { clearInterval(iv); if (statsRef.current) saveStats(email, statsRef.current) }
  }, [open, playing, email])

  /* audio events */
  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    const onTime = () => {
      setTime(el.currentTime)
      if (!subscribed && el.currentTime >= PREVIEW_SEC) { el.pause(); setLimitHit(true) }
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

  /* хаагдах + cursor + Escape шатлал */
  useEffect(() => {
    if (!open && audioRef.current) { audioRef.current.pause() }
    document.body.classList.toggle('native-cursor', open)
    if (!open) return
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      if (immersive) { setImmersive(false); return }
      if (settingsOpen || profileOpen || notifOpen) {
        setSettingsOpen(false); setProfileOpen(false); setNotifOpen(false); return
      }
      if (calibOpen) return // калибровк өөрөө удирдана
      if (view !== 'home') { setView('home'); return }
      onClose()
    }
    addEventListener('keydown', onKey)
    return () => {
      removeEventListener('keydown', onKey)
      document.body.classList.remove('native-cursor')
    }
  }, [open, onClose, immersive, settingsOpen, profileOpen, notifOpen, view, calibOpen])

  useEffect(() => () => { if (toneCtxRef.current) toneCtxRef.current.close().catch(() => {}) }, [])

  if (!open) return null

  const ALL = [...TRACKS, ...custom]
  const GENRES = ['Бүгд', ...new Set(ALL.map((t) => t.genre))]
  const list = ALL.filter((t) => {
    if (genre !== 'Бүгд' && t.genre !== genre) return false
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (t.title + ' ' + t.artist + ' ' + t.genre).toLowerCase().includes(q)
  })
  const byId = (id) => ALL.find((t) => t.id === id)
  const recentTracks = recent.map(byId).filter(Boolean)
  const likedTracks = likes.map(byId).filter(Boolean)
  const savedTracks = saves.map(byId).filter(Boolean)

  function playTrack(t) {
    const el = audioRef.current
    ensureCtx()
    setLimitHit(false)
    if (cur?.id === t.id) { playing ? el.pause() : el.play(); return }
    setCur(t); curRef.current = t
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
    let t = ((e.clientX - r.left) / r.width) * dur
    if (!subscribed) t = Math.min(t, PREVIEW_SEC - 1)
    el.currentTime = t
  }
  function step(dir) {
    if (!cur) return
    const i = ALL.findIndex((t) => t.id === cur.id)
    const nt = ALL[(i + dir + ALL.length) % ALL.length]
    playTrack(nt)
  }
  function next() { step(1) }
  function openDetail(t) { setDetail(t); setView('detail') }
  function feelTest(t) {
    const f = FEEL[t.genre] || FEEL_DEFAULT
    if (canVibrate) { try { navigator.vibrate(f.pattern) } catch { /* noop */ } }
    const dom = f.bass >= f.mid && f.bass >= f.high ? [55, .7, 'sine']
      : f.mid >= f.high ? [330, .45, 'triangle'] : [1500, .3, 'square']
    playTone(dom[0], dom[1], dom[2])
  }

  const pct = dur ? (time / dur) * 100 : 0
  const previewPct = dur && !subscribed ? Math.min(100, (PREVIEW_SEC / dur) * 100) : 100
  const initial = (user?.name || '?').trim().charAt(0).toUpperCase()
  const renewDate = user?.sub?.renews ? new Date(user.sub.renews).toLocaleDateString('mn-MN') : null


  /* ---------- дэд хуудсууд ---------- */
  function renderStats() {
    const s = statsRef.current || loadStats(email)
    const topGenre = Object.entries(s.byGenre).sort((a, b) => b[1] - a[1])[0]
    const topTracks = Object.entries(s.byTrack).sort((a, b) => b[1] - a[1]).slice(0, 3)
      .map(([id, sec]) => ({ t: byId(isNaN(+id) ? id : +id), sec })).filter((x) => x.t)
    const days = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i)
      const k = todayKey(d)
      days.push({ label: ['Ня', 'Да', 'Мя', 'Лх', 'Пү', 'Ба', 'Бя'][d.getDay()], sec: s.days[k] || 0, today: i === 0 })
    }
    const maxDay = Math.max(1, ...days.map((d) => d.sec))
    return (
      <>
        <BackBar title="Миний статистик" onBack={() => setView('home')} />
        <div className="st-cards">
          <StatCard icon={ICONS.phones} color="c-aqua" value={fmtDur(s.total)} label="Нийт сонссон" />
          <StatCard icon={ICONS.vibrate} color="c-gold" value={s.vib.toLocaleString()} label="Мэдэрсэн чичиргээ" />
          <StatCard icon={ICONS.music} color="c-purple" value={Object.keys(s.byTrack).length} label="Сонссон дуу" />
          <StatCard icon={ICONS.star} color="c-rose" value={topGenre ? topGenre[0] : '—'} label="Топ төрөл" />
        </div>

        <h3 className="st-h">Сүүлийн 7 хоног</h3>
        <div className="st-chart">
          {days.map((d, i) => (
            <div className="st-col" key={i}>
              <span className="st-val mono">{d.sec ? fmtDur(d.sec) : ''}</span>
              <i className={d.today ? 'today' : ''} style={{ height: Math.max(3, (d.sec / maxDay) * 100) + '%' }}></i>
              <span className={'mono' + (d.today ? ' st-today' : '')}>{d.label}</span>
            </div>
          ))}
        </div>

        {topTracks.length > 0 && (
          <>
            <h3 className="st-h">Хамгийн их сонссон</h3>
            <div className="sp-list">
              {topTracks.map(({ t, sec }, i) => (
                <button key={t.id} className="sp-lrow st-toprow" onClick={() => playTrack(t)}>
                  <span className="sp-lno mono">{'0' + (i + 1)}</span>
                  <img className="sp-lthumb" src={t.cover} alt="" />
                  <span className="sp-lmeta"><b>{t.title}</b><i>{t.artist}</i></span>
                  <span className="sp-lgenre mono">{fmtDur(sec)}</span>
                  <span className="sp-lact" aria-hidden="true">▶</span>
                </button>
              ))}
            </div>
          </>
        )}
        {s.total === 0 && <p className="adm-empty">Дуу сонсож эхлэхэд статистик энд цуглана 🎶</p>}
      </>
    )
  }

  function renderBilling() {
    const payments = loadPayments(email)
    const active = user?.sub?.active
    const daysLeft = user?.sub?.renews ? Math.max(0, Math.ceil((user.sub.renews - Date.now()) / 86400000)) : 0
    return (
      <>
        <BackBar title="Захиалгын удирдлага" onBack={() => setView('home')} />
        <div className={'bil-plan' + (active || isAdmin ? ' pro' : '')}>
          <div>
            <span className="mono">Идэвхтэй план</span>
            <b>{isAdmin ? 'Админ — бүх эрх' : active ? 'МЭДРЭХ PRO' : user?.sub ? 'PRO (цуцлагдсан)' : 'Үнэгүй горим'}</b>
            <p>
              {isAdmin ? 'Админ эрхтэй тул төлбөр шаардлагагүй.'
                : active ? `Дараагийн төлбөр: ${renewDate} — ${daysLeft} хоногийн дараа · 9'900₮`
                  : user?.sub ? `${renewDate} хүртэл эрх хадгалагдана, дараа нь үнэгүй горимд шилжинэ.`
                    : `Дуу тус бүрээс ${PREVIEW_SEC} секунд сонсох эрхтэй.`}
            </p>
            {active && !isAdmin && (
              <div className="bil-count" aria-label="Дараагийн төлбөр хүртэл">
                <i style={{ width: Math.min(100, ((30 - daysLeft) / 30) * 100) + '%' }}></i>
              </div>
            )}
          </div>
          <div className="bil-actions">
            {!isAdmin && active && (
              <button className="sp-prof-btn danger" onClick={() => {
                if (confirm('PRO захиалгаа цуцлах уу? ' + renewDate + ' хүртэл эрх чинь хадгалагдана.')) onCancelSub()
              }}>Захиалга цуцлах</button>
            )}
            {!isAdmin && !active && (
              <button className="sp-prof-btn accent" onClick={onSubscribe}>
                {user?.sub ? 'Сэргээх — 9\'900₮/сар' : 'PRO болох — 9\'900₮/сар'}
              </button>
            )}
          </div>
        </div>

        <h3 className="st-h">Төлбөрийн түүх</h3>
        {payments.length === 0 ? (
          <p className="adm-empty">Төлбөрийн түүх хоосон байна</p>
        ) : (
          <div className="bil-table">
            <div className="bil-row bil-head">
              <span className="mono">Огноо</span><span className="mono">План</span>
              <span className="mono">Төлбөрийн хэрэгсэл</span><span className="mono">Дүн</span><span className="mono">Төлөв</span>
            </div>
            {payments.map((p) => (
              <div className="bil-row" key={p.id}>
                <span>{new Date(p.date).toLocaleDateString('mn-MN')}</span>
                <span>{p.plan}</span>
                <span className="bil-mth">{p.method}</span>
                <span><b>{p.amount}</b></span>
                <span className="bil-ok">✓ {p.status}</span>
              </div>
            ))}
          </div>
        )}
        <p className="auth-note mono" style={{ textAlign: 'left' }}>Демо горим — Stripe test. Жинхэнэ мөнгө шилжээгүй.</p>
      </>
    )
  }

  function renderHelp() {
    const items = [
      { ic: '🎵', t: 'Дуу сонгох', d: 'Картан дээр дарахад дуу тоглоно. Хайлт болон төрлийн шүүлтүүрээр хүссэн дуугаа ол.' },
      { ic: '📳', t: 'Чичиргээ мэдрэх', d: 'Утсан дээр нээвэл дууны хэмнэлээр утас чичирнэ. Бас = урт хүчтэй, өндөр = богино түргэн.' },
      { ic: '💡', t: 'Гэрлээр мэдрэх', d: 'Дэлгэцийн гэрэл дууны цохилтоор лугшина. ⛶ товчоор бүтэн дэлгэцийн «Мэдрэх горим» нээгдэнэ.' },
      { ic: '🎛', t: 'Өөрт тааруулах', d: '⚙️ цэснээс чичиргээний хүч, гэрлийн эрчим, давтамжийн бүсээ тохируул. Калибровк дахин хийж болно.' },
      { ic: '♥', t: 'Цуглуулга', d: 'Зүрх дарж дуртай дуугаа, 🔖 дарж дараа сонсох дуугаа хадгал. Зүүн самбарт цуглана.' },
      { ic: '💳', t: 'PRO захиалга', d: 'Үнэгүй горимд 30 сек сонсоно. PRO бол бүрэн эрхтэй — профайл цэснээс захиалгаа удирдаарай.' },
    ]
    return (
      <>
        <BackBar title="Тусламж — Хэрхэн ашиглах вэ?" onBack={() => setView('home')} />
        <div className="hlp-grid">
          {items.map((x) => (
            <div className="hlp-card" key={x.t}>
              <span className="hlp-ic" aria-hidden="true">{x.ic}</span>
              <b>{x.t}</b>
              <p>{x.d}</p>
            </div>
          ))}
        </div>
        <div className="sp-banner" style={{ marginTop: 26 }}>
          <div>
            <b>Мэдрэхүйн калибровк</b>
            <p>Таны мэдрэх босгыг 1 минутын тестээр тодорхойлж, тохиргоог автоматаар тааруулна.</p>
          </div>
          <button className="bt bt-a" onClick={() => setCalibOpen(true)}>🎛 Калибровк эхлүүлэх</button>
        </div>
      </>
    )
  }

  function renderDetail() {
    const t = detail
    if (!t) return null
    const f = FEEL[t.genre] || FEEL_DEFAULT
    const tot = f.pattern.reduce((a, b) => a + b, 0)
    const isCur = cur?.id === t.id
    return (
      <>
        <BackBar title="Дууны дэлгэрэнгүй" onBack={() => setView('home')} />
        <div className="dt-wrap">
          <div className="dt-left">
            <img className="dt-cover" src={t.cover} alt={t.title} />
            <div className="dt-btns">
              <button className="bt bt-a" onClick={() => playTrack(t)}>
                {isCur && playing ? '⏸ Зогсоох' : '▶ Тоглуулах'}
              </button>
              <button className="bt" onClick={() => feelTest(t)}>📳 Туршиж мэдрэх</button>
            </div>
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

            <div className="dt-bands">
              {[['Бас', f.bass, '20—250 Hz'], ['Дунд', f.mid, '250 Hz—4 kHz'], ['Өндөр', f.high, '4—20 kHz']].map(([lbl, v, hz]) => (
                <div className="dt-band" key={lbl}>
                  <div className="dt-band-top"><b>{lbl}</b><span className="mono">{hz}</span><span className="dt-pct">{v}%</span></div>
                  <div className="dt-meter"><i style={{ width: v + '%' }}></i></div>
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

  /* ---------- админы хяналтын самбар ---------- */
  function renderAdmin() {
    const users = loadUsers().filter((u) => u.role !== 'admin')
    const proCount = users.filter((u) => u.sub?.active).length
    const revenue = users.reduce((sum, u) => sum + loadPayments(u.email).length * 9900, 0)
    const recentUsers = [...users].sort((a, b) => (b.created || 0) - (a.created || 0)).slice(0, 5)
    function sendBcast(e) {
      e.preventDefault()
      const text = bcast.trim()
      if (text.length < 3) { setBcastOk('❌ Зарлалын текстээ бичнэ үү'); return }
      pushFeed(text, '📢')
      setBcast('')
      setBcastOk('✅ Зарлал бүх хэрэглэгчид илгээгдлээ')
      setTimeout(() => setBcastOk(''), 3000)
    }
    return (
      <>
        <div className="ab-head">
          <div>
            <span className="mono">Хяналтын самбар</span>
            <h2 className="sp-h" style={{ margin: '8px 0 0' }}>Сайн уу, Админ 🛠</h2>
          </div>
          <button className="bt bt-a" onClick={onAdmin}>Хэрэглэгч · Дуу удирдах →</button>
        </div>

        <div className="st-cards">
          <StatCard icon={ICONS.users} color="c-aqua" value={users.length} label="Нийт хэрэглэгч" />
          <StatCard icon={ICONS.gem} color="c-purple" value={proCount} label="PRO захиалагч" />
          <StatCard icon={ICONS.money} color="c-gold" value={revenue.toLocaleString() + '₮'} label="Нийт орлого (демо)" />
          <StatCard icon={ICONS.music} color="c-rose" value={ALL.length} label="Дууны сан" />
        </div>

        <div className="ab-card">
          <div className="ab-card-h">
            <span className="st-ico c-gold" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                {ICONS.horn}
              </svg>
            </span>
            <div>
              <b>Бүх хэрэглэгчид зарлал илгээх</b>
              <p>Зарлал хэрэглэгч бүрийн хонхонд шууд очно. Дуу нэмэхэд мэдэгдэл автоматаар илгээгддэг.</p>
            </div>
          </div>
          <form className="ab-bcast" onSubmit={sendBcast}>
            <input
              type="text"
              value={bcast}
              onChange={(e) => setBcast(e.target.value)}
              placeholder="ж: Маргааш 20:00 цагт шинэ цомог нэмэгдэнэ!"
              aria-label="Зарлалын текст"
            />
            <button type="submit" className="bt bt-a">Илгээх</button>
          </form>
          {bcastOk && <p className={bcastOk.startsWith('✅') ? 'auth-ok' : 'auth-err'} style={{ fontSize: 13 }}>{bcastOk}</p>}
        </div>

        <h3 className="st-h">Сүүлийн бүртгэлүүд</h3>
        {recentUsers.length === 0 ? (
          <p className="adm-empty">Бүртгүүлсэн хэрэглэгч алга</p>
        ) : (
          <div className="bil-table">
            <div className="bil-row bil-head ab-urow">
              <span className="mono">Хэрэглэгч</span><span className="mono">Имэйл</span>
              <span className="mono">Огноо</span><span className="mono">Статус</span>
            </div>
            {recentUsers.map((u) => (
              <div className="bil-row ab-urow" key={u.email}>
                <span className="ab-uname">
                  <i className="ab-uav" aria-hidden="true">{(u.name || '?').charAt(0).toUpperCase()}</i>
                  {u.name}
                </span>
                <span className="bil-mth">{u.email}</span>
                <span>{u.created ? new Date(u.created).toLocaleDateString('mn-MN') : '—'}</span>
                <span className={u.sub?.active ? 'bil-ok' : 'ab-free'}>{u.sub?.active ? '💎 PRO' : 'Үнэгүй'}</span>
              </div>
            ))}
          </div>
        )}

        <div className="sp-banner" style={{ marginTop: 30 }}>
          <div>
            <b>Тоглуулагч руу шилжих</b>
            <p>Хэрэглэгчийн нүдээр аппаа туршиж, дуу сонсож, мэдрэх горимыг шалгаарай.</p>
          </div>
          <button className="bt" onClick={() => setView('home')}>🎧 Тоглуулагч нээх</button>
        </div>
      </>
    )
  }

  /* ---------- нүүр (home) ---------- */
  function renderHome() {
    return (
      <>
        <div className="sp-chips">
          {GENRES.map((g) => (
            <button key={g} className={'sp-chip' + (genre === g ? ' on' : '')} onClick={() => setGenre(g)}>
              {g}
            </button>
          ))}
        </div>

        <h2 className="sp-h">Тренд дуунууд</h2>
        {list.length === 0 && <p className="adm-empty">"{query}" — олдсонгүй</p>}
        <div className="sp-grid">
          {list.map((t) => {
            const isCur = cur?.id === t.id
            return (
              <button key={t.id} className={'sp-card' + (isCur ? ' on' : '')} onClick={() => playTrack(t)}>
                <span className="sp-cover">
                  <img src={t.cover} alt="" loading="lazy" />
                  <LikeBtn id={t.id} active={likes.includes(t.id)} onToggle={() => toggleLike(t.id)} />
                  <SaveBtn id={t.id} active={saves.includes(t.id)} onToggle={() => toggleSave(t.id)} />
                  <InfoBtn t={t} onInfo={() => openDetail(t)} />
                  <span className={'sp-playbtn' + (isCur && playing ? ' show' : '')} aria-hidden="true">
                    {isCur && playing ? '⏸' : '▶'}
                  </span>
                  {isCur && playing && (
                    <span className="pl-eq sp-eq" aria-hidden="true"><u></u><u></u><u></u></span>
                  )}
                </span>
                <b>{t.title}{t.custom && <em className="sp-new"> шинэ</em>}</b>
                <i>{t.artist} · {t.genre}</i>
              </button>
            )
          })}
        </div>

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
                      <b>{t.title}{t.custom && <em className="sp-new"> шинэ</em>}</b>
                      <i>{t.artist}</i>
                    </span>
                    <span className="sp-lgenre mono">{t.genre}</span>
                    <LikeBtn id={t.id} row active={likes.includes(t.id)} onToggle={() => toggleLike(t.id)} />
                    <SaveBtn id={t.id} row active={saves.includes(t.id)} onToggle={() => toggleSave(t.id)} />
                    <InfoBtn t={t} row onInfo={() => openDetail(t)} />
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

        {!subscribed && (
          <div className="sp-banner">
            <div>
              <b>МЭДРЭХ PRO болоорой</b>
              <p>Бүх дууг бүрэн сонсож, чичиргээ + гэрлийн горимыг хязгааргүй мэдэр. Үнэгүй горимд дуу тус бүрээс {PREVIEW_SEC} секунд сонсоно.</p>
            </div>
            <button className="bt bt-a" onClick={onSubscribe}>9'900₮ / сар — Захиалах</button>
          </div>
        )}
      </>
    )
  }

  return (
    <div className="pl-ov sp">
      <audio ref={audioRef} crossOrigin="anonymous" />
      <div className="pl-glow" ref={pulseRef} aria-hidden="true"></div>

      {/* дээд баар */}
      <header className="sp-top">
        <span className="sp-logo">
          МЭДРЭХ<sup>®</sup>
          {isAdmin && <em className="sp-admchip">АДМИН</em>}
        </span>

        <div className="sp-center">
          <button className={'sp-icbtn' + (view === 'home' ? ' on' : '')} onClick={() => setView('home')} aria-label="Нүүр" title="Нүүр">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" />
            </svg>
          </button>
          <div className="sp-search">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.5" y2="16.5" />
            </svg>
            <input
              type="search"
              placeholder="Юу сонсмоор байна?"
              value={query}
              onFocus={() => setView('home')}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Дуу хайх"
            />
          </div>
          <div className="sp-viz" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <i key={i} ref={(el) => { vizRef.current[i] = el }}></i>
            ))}
          </div>
        </div>

        <div className="sp-right">
          {!subscribed && (
            <button className="bt bt-a sp-subbtn" onClick={onSubscribe}>Захиалга авах</button>
          )}

          {/* админы хяналтын самбар руу */}
          {isAdmin && (
            <button
              className={'sp-icbtn sp-admbtn' + (view === 'admin' ? ' on' : '')}
              onClick={() => setView('admin')}
              aria-label="Хяналтын самбар" title="Хяналтын самбар"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="9" rx="1.5" />
                <rect x="14" y="3" width="7" height="5" rx="1.5" />
                <rect x="14" y="12" width="7" height="9" rx="1.5" />
                <rect x="3" y="16" width="7" height="5" rx="1.5" />
              </svg>
            </button>
          )}

          {/* мэдэгдэл */}
          <div className="sp-dd-wrap">
            <button
              className={'sp-icbtn sp-bell' + (notifOpen ? ' on' : '')}
              onClick={openNotifs}
              aria-label={'Мэдэгдэл' + (unread ? ' — ' + unread + ' шинэ' : '')}
              aria-expanded={notifOpen} title="Мэдэгдэл"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.7 21a2 2 0 0 1-3.4 0" />
              </svg>
              {unread > 0 && <span className="sp-bell-n">{unread > 9 ? '9+' : unread}</span>}
            </button>
            {notifOpen && (
              <div className="sp-dd sp-notifs" role="dialog" aria-label="Мэдэгдлүүд">
                <span className="mono">Мэдэгдэл</span>
                {feed.length === 0 && <p className="sp-side-empty">Мэдэгдэл алга</p>}
                {feed.map((f) => (
                  <div className={'sp-notif' + (f.date > readTs ? ' new' : '')} key={f.id}>
                    <span className="sp-notif-ic" aria-hidden="true">{f.icon}</span>
                    <div>
                      <p>{f.text}</p>
                      <span className="mono">{relTime(f.date)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* мэдрэхүйн тохиргоо */}
          <div className="sp-dd-wrap">
            <button
              className={'sp-icbtn' + (settingsOpen ? ' on' : '')}
              onClick={() => { setSettingsOpen(!settingsOpen); setProfileOpen(false); setNotifOpen(false) }}
              aria-label="Мэдрэхүйн тохиргоо" aria-expanded={settingsOpen} title="Мэдрэхүйн тохиргоо"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.11-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.55-1.11 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34h.09a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.09a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1z" />
              </svg>
            </button>
            {settingsOpen && (
              <div className="sp-dd sp-settings" role="dialog" aria-label="Мэдрэхүйн тохиргоо">
                <span className="mono">Мэдрэхүйн тохиргоо</span>

                <label className="sp-set-l">📳 Чичиргээний хүч</label>
                <div className="sp-seg">
                  {VIB_LEVELS.map((v, i) => (
                    <button key={v.label} className={prefs.vib === i ? 'on' : ''} onClick={() => updatePrefs({ vib: i })}>
                      {v.label}
                    </button>
                  ))}
                </div>

                <label className="sp-set-l">💡 Гэрлийн эрчим</label>
                <div className="sp-seg">
                  {LIGHT_LEVELS.map((v, i) => (
                    <button key={v.label} className={prefs.light === i ? 'on' : ''} onClick={() => updatePrefs({ light: i })}>
                      {v.label}
                    </button>
                  ))}
                </div>

                <label className="sp-set-l">🎚 Мэдрэх давтамжийн бүс</label>
                <div className="sp-bands">
                  {[['bass', 'Бас'], ['mid', 'Дунд'], ['high', 'Өндөр']].map(([k, lbl]) => (
                    <button key={k} className={prefs.bands[k] ? 'on' : ''}
                      onClick={() => updatePrefs({ bands: { [k]: !prefs.bands[k] } })}
                      aria-pressed={prefs.bands[k]}
                    >{prefs.bands[k] ? '✓ ' : ''}{lbl}</button>
                  ))}
                </div>

                <button className="sp-prof-btn" onClick={() => { setSettingsOpen(false); setCalibOpen(true) }}>
                  🎛 Калибровк дахин хийх
                </button>
                <p className="sp-set-note">Сонсголын мэдрэмж хүн бүрд өөр — тохиргоо автоматаар хадгалагдана.</p>
              </div>
            )}
          </div>

          {/* профайл */}
          <div className="sp-dd-wrap">
            <button
              className={'sp-avatar' + (isAdmin ? ' adm' : '') + (profileOpen ? ' on' : '')}
              onClick={() => { setProfileOpen(!profileOpen); setSettingsOpen(false); setNotifOpen(false) }}
              aria-label="Профайл цэс" aria-expanded={profileOpen} title={user?.name}
            >{initial}</button>
            {profileOpen && (
              <div className="sp-dd sp-profile" role="dialog" aria-label="Профайл">
                <div className="sp-prof-top">
                  <span className="sp-avatar sp-avatar-lg" aria-hidden="true">{initial}</span>
                  <div>
                    <b>{user?.name}</b>
                    <i>{user?.email}</i>
                  </div>
                </div>
                <div className={'sp-prof-sub' + (subscribed ? ' pro' : '')}>
                  {isAdmin
                    ? <><b>Админ эрх</b><span>Бүх боломж нээлттэй</span></>
                    : subscribed
                      ? <><b>PRO идэвхтэй</b><span>Дараагийн төлбөр: {renewDate}</span></>
                      : <><b>Үнэгүй горим</b><span>Дуу тус бүрээс {PREVIEW_SEC} сек</span></>}
                </div>
                <button className="sp-prof-btn" onClick={() => { setProfileOpen(false); setView('stats') }}>📊 Миний статистик</button>
                <button className="sp-prof-btn" onClick={() => { setProfileOpen(false); setView('billing') }}>💳 Захиалга удирдах</button>
                <button className="sp-prof-btn" onClick={() => { setProfileOpen(false); setView('help') }}>❓ Тусламж</button>
                {isAdmin && (
                  <button className="sp-prof-btn" onClick={() => { setProfileOpen(false); setView('admin') }}>🛠 Хяналтын самбар</button>
                )}
                <button className="sp-prof-btn danger" onClick={onLogout}>Гарах</button>
              </div>
            )}
          </div>

          <button className="auth-x pl-x" onClick={onClose} aria-label="Хаах">✕</button>
        </div>
      </header>

      {(settingsOpen || profileOpen || notifOpen) && (
        <div className="sp-dd-veil" onClick={() => { setSettingsOpen(false); setProfileOpen(false); setNotifOpen(false) }}></div>
      )}

      {/* их бие */}
      <div className="sp-shell">
        <aside className="sp-side">
          <span className="mono sp-side-h">♥ Дуртай дуунууд</span>
          {likedTracks.length === 0 ? (
            <div className="sp-empty-tile">
              <span className="sp-empty-ic" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21s-7.5-4.9-10-9.2C.3 8.6 2 5 5.5 5c2 0 3.4 1.1 4.2 2.3L12 9.6l2.3-2.3C15.1 6.1 16.5 5 18.5 5 22 5 23.7 8.6 22 11.8 19.5 16.1 12 21 12 21z"/>
                </svg>
              </span>
              <p>Дууны <b>♥ зүрхэн</b> дээр дарахад дуртай дуу чинь энд цуглана</p>
            </div>
          ) : <SideList tracks={likedTracks} curId={cur?.id} playing={playing} onPlay={playTrack} />}

          <span className="mono sp-side-h">Хадгалсан</span>
          {savedTracks.length === 0 ? (
            <div className="sp-empty-tile">
              <span className="sp-empty-ic sp-empty-warm" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 2h12a1 1 0 0 1 1 1v19l-7-4.2L5 22V3a1 1 0 0 1 1-1z"/>
                </svg>
              </span>
              <p>Дууг <b>🔖 хадгалах</b> товчоор тэмдэглээд дараа нь сонсоорой</p>
            </div>
          ) : <SideList tracks={savedTracks} curId={cur?.id} playing={playing} onPlay={playTrack} />}

          {recentTracks.length > 0 && (
            <>
              <span className="mono sp-side-h">Саяхан сонссон</span>
              <SideList tracks={recentTracks} curId={cur?.id} playing={playing} onPlay={playTrack} />
            </>
          )}
        </aside>

        <main className="sp-main">
          {view === 'home' && renderHome()}
          {view === 'stats' && renderStats()}
          {view === 'billing' && renderBilling()}
          {view === 'help' && renderHelp()}
          {view === 'detail' && renderDetail()}
          {view === 'admin' && isAdmin && renderAdmin()}
        </main>
      </div>

      {limitHit && !subscribed && (
        <div className="sp-limit">
          <p>Урьдчилан сонсголт дууслаа — бүтэн дуу сонсохын тулд PRO захиалга аваарай.</p>
          <button className="bt bt-a" onClick={onSubscribe}>Захиалга авах →</button>
        </div>
      )}

      {/* доод баар */}
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
          <button
            className="sp-icbtn sp-immbtn"
            onClick={() => setImmersive(true)}
            disabled={!cur}
            aria-label="Мэдрэх горим — бүтэн дэлгэц"
            title={cur ? 'Мэдрэх горим' : 'Эхлээд дуу сонгоорой'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" />
            </svg>
          </button>
        </div>
      </footer>

      {/* мэдрэх горим */}
      {immersive && cur && (
        <div className="sp-imm" onClick={() => setImmersive(false)} role="dialog" aria-label="Мэдрэх горим">
          <img className="sp-imm-bg" src={cur.cover} alt="" aria-hidden="true" />
          <div className="sp-imm-veil" aria-hidden="true"></div>
          <div className="sp-imm-center">
            <span className="sp-imm-ring" ref={immPulseRef} aria-hidden="true"></span>
            <img className="sp-imm-cover" src={cur.cover} alt="" />
          </div>
          <div className="sp-imm-info">
            <span className="mono">Мэдрэх горим</span>
            <h2>{cur.title}</h2>
            <p>{cur.artist} · {cur.genre}</p>
          </div>
          <div className="sp-imm-bars" aria-hidden="true">
            {Array.from({ length: 28 }).map((_, i) => (
              <i key={i} ref={(el) => { immBarsRef.current[i] = el }}></i>
            ))}
          </div>
          <span className="sp-imm-exit mono">ESC эсвэл дарж гарна</span>
        </div>
      )}

      {/* калибровк */}
      <Calibrate
        open={calibOpen}
        onClose={() => setCalibOpen(false)}
        onDone={(patch) => updatePrefs(patch)}
      />
    </div>
  )
}
