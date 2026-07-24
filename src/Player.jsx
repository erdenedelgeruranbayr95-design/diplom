import { useEffect, useRef, useState } from 'react'
import { TRACKS } from './tracks.js'
import { idbGet } from './idb.js'
import {
  loadCustomMeta, loadFeed, getReadTs, markFeedRead,
  loadStats, saveStats, todayKey,
} from './library.js'
import Calibrate from './Calibrate.jsx'
import { PREVIEW_SEC, VIB_LEVELS, LIGHT_LEVELS, DEFAULT_PREFS, FEEL, FEEL_DEFAULT } from './player/constants.jsx'
import { fmt, relTime } from './player/format.js'
import BackBar from './player/BackBar.jsx'
import SideList from './player/SideList.jsx'
import ProfileView from './player/ProfileView.jsx'
import DevicesView from './player/DevicesView.jsx'
import PlaylistsView from './player/PlaylistsView.jsx'
import HelpView from './player/HelpView.jsx'
import DetailView from './player/DetailView.jsx'
import StatsView from './player/StatsView.jsx'
import AdminView from './player/AdminView.jsx'
import ImmersiveMode from './player/ImmersiveMode.jsx'
import BillingView from './player/BillingView.jsx'
import HomeView from './player/HomeView.jsx'
import LibraryView from './player/LibraryView.jsx'
import NowPlayingPanel from './player/NowPlayingPanel.jsx'

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
  const [npOpen, setNpOpen] = useState(false) // дэлгэгддэг Мэдрэх самбар (Now-Playing)
  const [calibOpen, setCalibOpen] = useState(false)
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
  const immFlashRef = useRef(null)
  const feelBarsRef = useRef([]) // Мэдрэх самбарын амьд 8 багана
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
        if (immFlashRef.current) {
          /* цохилт (хүчтэй бас) дээр богино flash */
          immFlashRef.current.style.opacity = lo > .5 ? Math.min(.55, (lo - .5) * 1.8 * lightMult).toFixed(3) : '0'
        }
        /* Мэдрэх самбарын амьд 8 бүсийн meter — спектрийг 8 бүлэгт хувааж дунджилна */
        feelBarsRef.current.forEach((el, idx) => {
          if (!el) return
          const lenB = feelBarsRef.current.length
          const start = Math.floor(idx / lenB * n * .72)
          const end = Math.max(start + 1, Math.floor((idx + 1) / lenB * n * .72))
          let s = 0
          for (let k = start; k < end; k++) s += a.data[k]
          el.style.height = Math.max(5, (s / (end - start)) / 255 * 100) + '%'
        })
      } else {
        vizRef.current.forEach((el) => { if (el) el.style.height = '3px' })
        if (immFlashRef.current) immFlashRef.current.style.opacity = '0'
        feelBarsRef.current.forEach((el) => { if (el) el.style.height = '5px' })
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
      if (npOpen) { setNpOpen(false); return }
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
  }, [open, onClose, immersive, npOpen, settingsOpen, profileOpen, notifOpen, view, calibOpen])

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
                <button className="sp-prof-btn" onClick={() => { setProfileOpen(false); setView('profile') }}>👤 Профайл засах</button>
                <button className="sp-prof-btn" onClick={() => { setProfileOpen(false); setView('playlists') }}>🎧 Миний жагсаалт</button>
                <button className="sp-prof-btn" onClick={() => { setProfileOpen(false); setView('devices') }}>📱 Төхөөрөмж холбох</button>
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
          <nav className="sp-navcol" aria-label="Үндсэн цэс">
            <button className={'sp-navitem' + (view === 'home' ? ' on' : '')} onClick={() => setView('home')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></svg>
              Нүүр
            </button>
            <button className={'sp-navitem' + (view === 'playlists' ? ' on' : '')} onClick={() => setView('playlists')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 14v-2a9 9 0 0 1 18 0v2" /><rect x="3" y="14" width="4" height="6" rx="2" /><rect x="17" y="14" width="4" height="6" rx="2" /></svg>
              Жагсаалт
            </button>
            <button className={'sp-navitem' + (view === 'stats' ? ' on' : '')} onClick={() => setView('stats')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M8 17v-5M13 17V9M18 17v-8" /></svg>
              Статистик
            </button>
            <button className={'sp-navitem' + (view === 'billing' ? ' on' : '')} onClick={() => setView('billing')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>
              Захиалга
            </button>
          </nav>
          <div className="sp-navdiv" aria-hidden="true"></div>

          <button className="mono sp-side-h sp-side-hbtn" onClick={() => setView('liked')}>
            <svg className="sp-side-ic ic-love" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 21s-7.5-4.9-10-9.2C.3 8.6 2 5 5.5 5c2 0 3.4 1.1 4.2 2.3L12 9.6l2.3-2.3C15.1 6.1 16.5 5 18.5 5 22 5 23.7 8.6 22 11.8 19.5 16.1 12 21 12 21z"/>
            </svg>
            Дуртай дуунууд
            <span className="sp-side-more" aria-hidden="true">→</span>
          </button>
          {likedTracks.length === 0 ? (
            <div className="sp-empty-tile">
              <span className="sp-empty-ic" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21s-7.5-4.9-10-9.2C.3 8.6 2 5 5.5 5c2 0 3.4 1.1 4.2 2.3L12 9.6l2.3-2.3C15.1 6.1 16.5 5 18.5 5 22 5 23.7 8.6 22 11.8 19.5 16.1 12 21 12 21z"/>
                </svg>
              </span>
              <p>Дууны <b><svg className="sp-inl-ic ic-love" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21s-7.5-4.9-10-9.2C.3 8.6 2 5 5.5 5c2 0 3.4 1.1 4.2 2.3L12 9.6l2.3-2.3C15.1 6.1 16.5 5 18.5 5 22 5 23.7 8.6 22 11.8 19.5 16.1 12 21 12 21z"/></svg> зүрхэн</b> дээр дарахад дуртай дуу чинь энд цуглана</p>
            </div>
          ) : <SideList tracks={likedTracks} curId={cur?.id} playing={playing} onPlay={playTrack} />}

          <button className="mono sp-side-h sp-side-hbtn" onClick={() => setView('saved')}>
            <svg className="sp-side-ic ic-save" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6 3h12v18l-6-3.6L6 21V3z"/>
            </svg>
            Хадгалсан
            <span className="sp-side-more" aria-hidden="true">→</span>
          </button>
          {savedTracks.length === 0 ? (
            <div className="sp-empty-tile">
              <span className="sp-empty-ic sp-empty-warm" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 2h12a1 1 0 0 1 1 1v19l-7-4.2L5 22V3a1 1 0 0 1 1-1z"/>
                </svg>
              </span>
              <p>Дууг <b><svg className="sp-inl-ic ic-save" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 3h12v18l-6-3.6L6 21V3z"/></svg> хадгалах</b> товчоор тэмдэглээд дараа нь сонсоорой</p>
            </div>
          ) : <SideList tracks={savedTracks} curId={cur?.id} playing={playing} onPlay={playTrack} />}

          {recentTracks.length > 0 && (
            <>
              <button className="mono sp-side-h sp-side-hbtn" onClick={() => setView('recent')}>
                <svg className="sp-side-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 1.8"/></svg>
                Саяхан сонссон
                <span className="sp-side-more" aria-hidden="true">→</span>
              </button>
              <SideList tracks={recentTracks} curId={cur?.id} playing={playing} onPlay={playTrack} />
            </>
          )}
        </aside>

        <main className="sp-main">
          {view === 'home' && (
            <HomeView
              genres={GENRES}
              genre={genre}
              onGenre={setGenre}
              list={list}
              query={query}
              curId={cur?.id}
              playing={playing}
              onPlay={playTrack}
              likes={likes}
              saves={saves}
              onToggleLike={toggleLike}
              onToggleSave={toggleSave}
              onInfo={openDetail}
              subscribed={subscribed}
              onSubscribe={onSubscribe}
            />
          )}
          {view === 'stats' && (
            <StatsView
              stats={statsRef.current}
              byId={byId}
              onPlay={playTrack}
              onBack={() => setView('home')}
            />
          )}
          {view === 'billing' && (
            <BillingView
              email={email}
              user={user}
              isAdmin={isAdmin}
              subscribed={subscribed}
              renewDate={renewDate}
              onSubscribe={onSubscribe}
              onCancelSub={onCancelSub}
              onBack={() => setView('home')}
            />
          )}
          {view === 'help' && <HelpView onOpenCalibrate={() => setCalibOpen(true)} onBack={() => setView('home')} />}
          {view === 'detail' && (
            <DetailView
              track={detail}
              isCurrent={cur?.id === detail?.id}
              playing={playing}
              onPlay={() => playTrack(detail)}
              onFeelTest={() => feelTest(detail)}
              onBack={() => setView('home')}
              liked={likes.includes(detail?.id)}
              saved={saves.includes(detail?.id)}
              onToggleLike={() => toggleLike(detail.id)}
              onToggleSave={() => toggleSave(detail.id)}
            />
          )}
          {view === 'admin' && isAdmin && (
            <AdminView
              allTracksCount={ALL.length}
              onOpenAdmin={onAdmin}
              onGoHome={() => setView('home')}
            />
          )}
          {view === 'profile' && <ProfileView onBack={() => setView('home')} />}
          {view === 'devices' && <DevicesView prefs={prefs} onUpdatePrefs={updatePrefs} canVibrate={canVibrate} onBack={() => setView('home')} />}
          {view === 'playlists' && <PlaylistsView email={email} tracks={ALL} onPlay={playTrack} curId={cur?.id} playing={playing} onBack={() => setView('home')} />}
          {view === 'liked' && (
            <LibraryView
              title="Дуртай дуунууд" tracks={likedTracks}
              curId={cur?.id} playing={playing} onPlay={playTrack}
              likes={likes} saves={saves} onToggleLike={toggleLike} onToggleSave={toggleSave} onInfo={openDetail}
              onBack={() => setView('home')}
              emptyIcon="♥" emptyTitle="Дуртай дуу алга"
              emptyHint="Дуу дээрх зүрхэн товчийг дарж дуртай дуугаа энд цуглуулаарай"
            />
          )}
          {view === 'saved' && (
            <LibraryView
              title="Хадгалсан" tracks={savedTracks}
              curId={cur?.id} playing={playing} onPlay={playTrack}
              likes={likes} saves={saves} onToggleLike={toggleLike} onToggleSave={toggleSave} onInfo={openDetail}
              onBack={() => setView('home')}
              emptyIcon="🔖" emptyTitle="Хадгалсан дуу алга"
              emptyHint="Дуу дээрх хавчуургыг дарж дараа сонсох дуугаа хадгалаарай"
            />
          )}
          {view === 'recent' && (
            <LibraryView
              title="Саяхан сонссон" tracks={recentTracks}
              curId={cur?.id} playing={playing} onPlay={playTrack}
              likes={likes} saves={saves} onToggleLike={toggleLike} onToggleSave={toggleSave} onInfo={openDetail}
              onBack={() => setView('home')}
              emptyIcon="🕐" emptyTitle="Түүх хоосон"
              emptyHint="Дуу сонсоход энд сонссон түүх чинь үлдэнэ"
            />
          )}
        </main>
      </div>

      {limitHit && !subscribed && (
        <div className="sp-limit">
          <p>Урьдчилан сонсголт дууслаа — бүтэн дуу сонсохын тулд PRO захиалга аваарай.</p>
          <button className="bt bt-a" onClick={onSubscribe}>Захиалга авах →</button>
        </div>
      )}

      {/* дэлгэгддэг Мэдрэх самбар (Now-Playing) */}
      <NowPlayingPanel
        open={npOpen && !!cur}
        track={cur}
        prefs={prefs}
        onToggleBand={(k) => updatePrefs({ bands: { [k]: !prefs.bands[k] } })}
        vibro={vibro}
        onToggleVibro={() => setVibro(!vibro)}
        onImmersive={() => { setNpOpen(false); setImmersive(true) }}
        onClose={() => setNpOpen(false)}
        barsRef={feelBarsRef}
      />

      {/* доод баар */}
      <footer className="sp-bar">
        <div className="sp-bar-l">
          {cur ? (
            <>
              <button
                className={'sp-np-toggle' + (npOpen ? ' on' : '')}
                onClick={() => setNpOpen((o) => !o)}
                aria-expanded={npOpen}
                aria-label="Мэдрэх самбар"
                title="Мэдрэх самбар"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 15l6-6 6 6" />
                </svg>
              </button>
              <img className="sp-thumb" src={cur.cover} alt="" />
              <button className="sp-bar-meta sp-bar-metabtn" onClick={() => setNpOpen((o) => !o)}>
                <b>{cur.title}</b>
                <i>{cur.artist}</i>
              </button>
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
        <ImmersiveMode
          track={cur}
          onClose={() => setImmersive(false)}
          barsRef={immBarsRef}
          pulseRef={immPulseRef}
          flashRef={immFlashRef}
        />
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
