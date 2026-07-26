import * as THREE from 'three'

/* Бүх интерактив логик: preloader, cursor, canvas зураг, аудио, 3D terrain.
   initMedreh() нь mount дээр дуудагдаж, unmount дээр цэвэрлэх функц буцаана. */
export function initMedreh() {
  const cleanups = []
  const on = (target, ev, fn, opts) => {
    target.addEventListener(ev, fn, opts)
    cleanups.push(() => target.removeEventListener(ev, fn, opts))
  }

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  function rng(s) {
    return function () {
      s |= 0; s = s + 0x6D2B79F5 | 0
      let t = Math.imul(s ^ s >>> 15, 1 | s)
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t
      return ((t ^ t >>> 14) >>> 0) / 4294967296
    }
  }

  /* ===== procedural photography ===== */
  const BEAM = [['#7FD8E8', '#1E5F7E'], ['#E8C07F', '#8A5A0B'], ['#D98FA8', '#5E2338'], ['#9FB6E8', '#2A3E7A']]
  function photo(cv, seed, shot) {
    const r = rng(seed * 7919 + 31), dpr = Math.min(devicePixelRatio, 2)
    const w = cv.clientWidth || 300, h = cv.clientHeight || 400
    if (!w || !h) return
    cv.width = w * dpr; cv.height = h * dpr
    const c = cv.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0)
    const canBlur = (typeof c.filter === 'string')
    const bg = c.createLinearGradient(0, 0, 0, h)
    bg.addColorStop(0, '#060A0D'); bg.addColorStop(.5, '#0A1116'); bg.addColorStop(1, '#03060A')
    c.fillStyle = bg; c.fillRect(0, 0, w, h)
    const pair = BEAM[Math.floor(r() * BEAM.length)]
    c.globalCompositeOperation = 'lighter'
    if (canBlur) c.filter = 'blur(' + (w * .012) + 'px)'
    const nb = shot === 'close' ? 2 : 3 + Math.floor(r() * 3)
    for (let i = 0; i < nb; i++) {
      const ox = w * (.08 + r() * .84), spread = w * (.05 + r() * .2), tilt = (r() - .5) * w * .95
      const g = c.createLinearGradient(ox, 0, ox + tilt, h * .9), col = i % 2 ? pair[0] : pair[1]
      g.addColorStop(0, col); g.addColorStop(.3, col); g.addColorStop(1, 'rgba(0,0,0,0)')
      c.globalAlpha = .1 + r() * .14; c.fillStyle = g
      c.beginPath(); c.moveTo(ox - 3, -h * .05); c.lineTo(ox + 3, -h * .05)
      c.lineTo(ox + tilt + spread, h * .95); c.lineTo(ox + tilt - spread, h * .95); c.closePath(); c.fill()
    }
    if (canBlur) c.filter = 'none'
    const hz = c.createRadialGradient(w * .5, h * .3, 0, w * .5, h * .3, h * .8)
    hz.addColorStop(0, pair[0]); hz.addColorStop(1, 'rgba(0,0,0,0)')
    c.globalAlpha = .07; c.fillStyle = hz; c.fillRect(0, 0, w, h)
    const nbk = shot === 'close' ? 42 : 26
    for (let b = 0; b < nbk; b++) {
      const rr = (shot === 'close' ? 5 : 3) + r() * (shot === 'close' ? 24 : 14)
      if (canBlur) c.filter = 'blur(' + (rr * .28) + 'px)'
      const bx = r() * w, by = r() * h * .78
      const g2 = c.createRadialGradient(bx, by, 0, bx, by, rr), bc = r() > .55 ? pair[0] : '#FFF0D2'
      g2.addColorStop(0, bc); g2.addColorStop(.6, bc); g2.addColorStop(1, 'rgba(0,0,0,0)')
      c.globalAlpha = .04 + r() * .16; c.fillStyle = g2
      c.beginPath(); c.arc(bx, by, rr, 0, Math.PI * 2); c.fill()
    }
    if (canBlur) c.filter = 'none'
    c.globalCompositeOperation = 'source-over'; c.globalAlpha = 1
    function head(x, y, s, alpha) {
      c.fillStyle = 'rgba(2,4,6,' + alpha + ')'
      c.beginPath(); c.arc(x, y, s, 0, Math.PI * 2); c.fill()
      c.beginPath(); c.moveTo(x - s * 2.1, y + s * 3.6)
      c.quadraticCurveTo(x - s * 1.85, y + s * 1.02, x, y + s * .92)
      c.quadraticCurveTo(x + s * 1.85, y + s * 1.02, x + s * 2.1, y + s * 3.6)
      c.closePath(); c.fill()
    }
    if (shot !== 'close') {
      const rows = shot === 'crowd' ? 3 : 2
      for (let row = 0; row < rows; row++) {
        const depth = row / (rows - 1 || 1)
        if (canBlur) c.filter = 'blur(' + ((1 - depth) * w * .012) + 'px)'
        const baseY = h * (shot === 'crowd' ? (.7 + depth * .28) : (.84 + depth * .17))
        const sz = w * (shot === 'crowd' ? (.026 + depth * .05) : (.017 + depth * .024))
        const alpha = .4 + depth * .55
        let x = -sz * 2
        while (x < w + sz * 2) { head(x, baseY - sz * (1.4 + r() * .5), sz * (.85 + r() * .35), alpha); x += sz * (2.9 + r() * 1.8) }
      }
      if (canBlur) c.filter = 'none'
      if (shot === 'stage') {
        const fx = w * (.36 + r() * .28), fs = w * .07, fy = h * .56
        c.fillStyle = 'rgba(1,3,5,.97)'
        c.beginPath(); c.arc(fx, fy, fs, 0, Math.PI * 2); c.fill()
        c.beginPath(); c.moveTo(fx - fs * 2.4, fy + fs * 4.8)
        c.quadraticCurveTo(fx - fs * 2.05, fy + fs * 1.05, fx, fy + fs * .95)
        c.quadraticCurveTo(fx + fs * 2.05, fy + fs * 1.05, fx + fs * 2.4, fy + fs * 4.8)
        c.closePath(); c.fill()
        c.lineWidth = fs * .6; c.lineCap = 'round'; c.strokeStyle = 'rgba(1,3,5,.97)'
        c.beginPath(); c.moveTo(fx - fs * 1.5, fy + fs * 1.7); c.lineTo(fx - fs * 2.7, fy - fs * 1.8); c.stroke()
        c.beginPath(); c.moveTo(fx + fs * 1.5, fy + fs * 1.7); c.lineTo(fx + fs * 2.8, fy - fs * 1.1); c.stroke()
      }
    } else {
      c.globalCompositeOperation = 'lighter'
      for (let s2 = 0; s2 < 3; s2++) {
        const sy2 = h * (.22 + r() * .55), g3 = c.createLinearGradient(0, sy2, w, sy2 + (r() - .5) * h * .18)
        g3.addColorStop(0, 'rgba(0,0,0,0)'); g3.addColorStop(.5, pair[0]); g3.addColorStop(1, 'rgba(0,0,0,0)')
        c.globalAlpha = .13; c.fillStyle = g3; c.fillRect(0, sy2 - 1, w, 2)
      }
      c.globalCompositeOperation = 'source-over'; c.globalAlpha = 1
    }
    const vg = c.createRadialGradient(w / 2, h * .44, Math.min(w, h) * .2, w / 2, h * .5, Math.max(w, h) * .82)
    vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.82)')
    c.fillStyle = vg; c.fillRect(0, 0, w, h)
    try {
      const id = c.getImageData(0, 0, cv.width, cv.height), d = id.data
      for (let p = 0; p < d.length; p += 4) { const n = (r() - .5) * 24; d[p] += n; d[p + 1] += n; d[p + 2] += n }
      c.putImageData(id, 0, 0)
    } catch (e) { /* taint / security errors — үл тоомсорлоно */ }
  }
  function drawPhotos() {
    document.querySelectorAll('canvas[data-shot]').forEach((cv) => photo(cv, +cv.dataset.seed, cv.dataset.shot))
  }

  /* ===== wordmark ===== */
  const wm = document.getElementById('wm'), fitbox = document.getElementById('fitbox'), slash = document.getElementById('slash')
  const glyphs = wm.querySelectorAll('em>i')
  function fitWord() {
    wm.style.transform = 'scale(1)'
    const w = wm.offsetWidth, h = wm.offsetHeight
    if (!w) return
    const pad = innerWidth > 1240 ? .76 : .9, s = Math.min((innerWidth * pad) / w, 1.4)
    wm.style.transform = 'scale(' + s + ')'; fitbox.style.height = (h * s) + 'px'
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitWord)
  on(window, 'load', () => { fitWord(); drawPhotos() })
  const t0 = setTimeout(() => { fitWord(); drawPhotos() }, 260)
  cleanups.push(() => clearTimeout(t0))
  let rt
  on(window, 'resize', () => { clearTimeout(rt); rt = setTimeout(() => { fitWord(); drawPhotos() }, 250) })
  cleanups.push(() => clearTimeout(rt))
  // React рендер дууссаны дараа шууд нэг удаа зурна
  fitWord(); drawPhotos()

  /* per-letter drift */
  const hero = document.getElementById('hero')
  on(hero, 'mousemove', (e) => {
    if (reduced) return
    glyphs.forEach((g) => {
      const r = g.getBoundingClientRect(), gx = r.left + r.width / 2, gy = r.top + r.height / 2
      const dx = (e.clientX - gx) / innerWidth, dy = (e.clientY - gy) / innerHeight
      g.style.transform = 'translate(' + (dx * -16) + 'px,' + (dy * -10) + 'px)'
    })
  })
  on(hero, 'mouseleave', () => glyphs.forEach((g) => { g.style.transform = '' }))

  /* ===== preloader ===== */
  const pct = document.getElementById('pct'), pbar = document.getElementById('pbar'), pre = document.getElementById('pre')
  let v = 0
  wm.querySelectorAll('em').forEach((s, i) => { s.style.transitionDelay = (i * .07) + 's' })
  const pt = setInterval(() => {
    v += Math.random() * 12
    if (v >= 100) {
      v = 100; clearInterval(pt)
      setTimeout(() => { pre.classList.add('done'); wm.classList.add('on'); fitWord(); drawPhotos() }, 350)
    }
    pct.textContent = Math.round(v); pbar.style.width = v + '%'
  }, 105)
  cleanups.push(() => clearInterval(pt))

  /* ===== cursor / magnetic ===== */
  const cd = document.getElementById('cd'), cr = document.getElementById('cr')
  let tx = 0, ty = 0, rx = 0, ry = 0
  on(window, 'mousemove', (e) => { tx = e.clientX; ty = e.clientY; cd.style.left = tx + 'px'; cd.style.top = ty + 'px' })
  let cursorRaf
  ;(function cl() {
    rx += (tx - rx) * .14; ry += (ty - ry) * .14
    cr.style.left = rx + 'px'; cr.style.top = ry + 'px'
    cursorRaf = requestAnimationFrame(cl)
  })()
  cleanups.push(() => cancelAnimationFrame(cursorRaf))
  // Delegation — дараа нь үүссэн элементүүд (auth modal г.м.) дээр ч ажиллана
  on(document, 'mouseover', (e) => {
    if (e.target.closest('a,button,input,.crow,.slide')) cr.classList.add('on')
    else cr.classList.remove('on')
  })
  document.querySelectorAll('.mag').forEach((b) => {
    on(b, 'mousemove', (e) => {
      const r = b.getBoundingClientRect()
      b.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * .22) + 'px,' + ((e.clientY - r.top - r.height / 2) * .32) + 'px)'
    })
    on(b, 'mouseleave', () => { b.style.transform = '' })
  })

  /* ===== reveal / anchors ===== */
  const io = new IntersectionObserver((es) => {
    es.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('in'), i * 90)
        io.unobserve(e.target)
      }
    })
  }, { threshold: .12 })
  document.querySelectorAll('.rv,.head').forEach((el) => io.observe(el))
  cleanups.push(() => io.disconnect())
  document.querySelectorAll('[data-go]').forEach((b) => {
    on(b, 'click', () => document.querySelector(b.dataset.go).scrollIntoView())
  })

  /* ===== scroll ===== */
  const galOuter = document.getElementById('gal'), track = document.getElementById('track')
  const parx = document.querySelectorAll('[data-sp]')
  const galbar = document.getElementById('galbar'), galno = document.getElementById('galno')
  let sy = 0, ticking = false
  function onScroll() { sy = scrollY; if (!ticking) { requestAnimationFrame(apply); ticking = true } }
  function apply() {
    ticking = false
    if (!reduced) parx.forEach((el) => { el.style.transform = 'translateY(' + (sy * +el.dataset.sp) + 'px)' })
    if (!reduced && galOuter) {
      const tot = galOuter.offsetHeight - innerHeight
      if (tot > 0) {
        const r = galOuter.getBoundingClientRect()
        const p = Math.min(1, Math.max(0, -r.top / tot)), max = track.scrollWidth - innerWidth + 64
        track.style.transform = 'translateX(' + (-p * Math.max(0, max)) + 'px)'
        galbar.style.width = (p * 100) + '%'
        galno.textContent = '0' + Math.min(6, Math.floor(p * 6) + 1)
      } else {
        track.style.transform = 'none'
      }
    }
  }
  on(window, 'scroll', onScroll, { passive: true })
  on(window, 'resize', apply)
  apply()

  /* ===== haptic strips ===== */
  const pat = { bass: [230, 80, 230], mid: [70, 50, 70, 50, 70], high: [24, 24, 24, 24, 24, 24, 24, 24, 24] }
  document.querySelectorAll('.hap').forEach((el) => {
    el.innerHTML = ''
    const p = pat[el.dataset.band], tot = p.reduce((a, b) => a + b, 0)
    p.forEach((ms, i) => {
      const n = document.createElement(i % 2 ? 'u' : 'i')
      n.style.flex = (ms / tot) + ' 0 0'
      el.appendChild(n)
    })
  })

  /* ===== scopes ===== */
  const scopes = []
  document.querySelectorAll('.scope').forEach((cv) => scopes.push({ cv, band: cv.dataset.band, boost: 0 }))
  function drawScope(s, t) {
    const cv = s.cv, dpr = Math.min(devicePixelRatio, 2), w = cv.clientWidth, h = cv.clientHeight
    if (!w) return
    if (cv.width !== w * dpr) { cv.width = w * dpr; cv.height = h * dpr }
    const c = cv.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, w, h)
    c.strokeStyle = 'rgba(242,245,244,.06)'; c.lineWidth = 1
    c.beginPath(); c.moveTo(0, h / 2); c.lineTo(w, h / 2); c.stroke()
    const k = Math.min(1, s.boost), A = h * .32 * (.5 + s.boost * .7)
    c.beginPath(); c.lineWidth = 1.1
    c.strokeStyle = 'rgba(' + Math.round(242 - 186 * k) + ',' + Math.round(245 - 13 * k) + ',' + Math.round(244 - 38 * k) + ',' + (.42 + .5 * k) + ')'
    for (let x = 0; x <= w; x++) {
      let y
      if (s.band === 'bass') y = h / 2 + Math.sin(x * .035 + t * 2.1) * A
      else if (s.band === 'mid') y = h / 2 + (Math.sin(x * .12 + t * 3) * .65 + Math.sin(x * .31 - t * 2) * .35) * A
      else y = h / 2 + Math.sin(x * .55 + t * 6) * A * (.55 + .45 * Math.abs(Math.sin(x * .05 + t)))
      x === 0 ? c.moveTo(x, y) : c.lineTo(x, y)
    }
    c.stroke(); s.boost *= .94
  }

  /* ===== hero slash ===== */
  function drawSlash(t) {
    if (!slash) return
    const dpr = Math.min(devicePixelRatio, 2), w = slash.clientWidth, h = slash.clientHeight
    if (!w) return
    if (slash.width !== w * dpr) { slash.width = w * dpr; slash.height = h * dpr }
    const c = slash.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, w, h)
    for (let L = 0; L < 3; L++) {
      c.beginPath(); c.lineWidth = L === 0 ? 1.4 : .8
      c.strokeStyle = 'rgba(56,232,206,' + (L === 0 ? .45 : .15) + ')'
      for (let x = 0; x <= w; x += 2) {
        const env = Math.sin(Math.PI * x / w)
        const y = h / 2 + Math.sin(x * .012 + t * 1.4 + L * 1.2) * h * .3 * env + Math.sin(x * .05 - t * 2.2) * h * .1 * env
        x === 0 ? c.moveTo(x, y) : c.lineTo(x, y)
      }
      c.stroke()
    }
  }

  /* ===== live monitor ===== */
  const monEl = document.getElementById('mon'), monCv = document.getElementById('monwave')
  function drawMon(t) {
    if (!monCv) return
    const dpr = Math.min(devicePixelRatio, 2), w = monCv.clientWidth, h = monCv.clientHeight
    if (!w) return
    if (monCv.width !== w * dpr) { monCv.width = w * dpr; monCv.height = h * dpr }
    const c = monCv.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, w, h)
    const n = 34, bw = w / n
    for (let i = 0; i < n; i++) {
      let lvl
      if (an && playing) { lvl = data[Math.floor(i / n * data.length * .6)] / 255 }
      else { lvl = .06 + Math.abs(Math.sin(t * 1.6 + i * .42)) * .14 }
      const bh = Math.max(2, lvl * h)
      c.fillStyle = playing ? 'rgba(56,232,206,' + (.35 + lvl * .65) + ')' : 'rgba(242,245,244,.26)'
      c.fillRect(i * bw + 1, (h - bh) / 2, bw - 2, bh)
    }
  }

  /* ===== audio ===== */
  let ctx, an, data, playing = false, master, timer, step = 0
  function initAudio() {
    ctx = new (window.AudioContext || window.webkitAudioContext)()
    an = ctx.createAnalyser(); an.fftSize = 512; an.smoothingTimeConstant = .8
    data = new Uint8Array(an.frequencyBinCount)
    master = ctx.createGain(); master.gain.value = .42; master.connect(an); an.connect(ctx.destination)
  }
  function tone(f, d, ty, vol) {
    const o = ctx.createOscillator(), g = ctx.createGain()
    o.type = ty || 'sine'; o.frequency.value = f
    g.gain.setValueAtTime(0, ctx.currentTime)
    g.gain.linearRampToValueAtTime(vol || .5, ctx.currentTime + .012)
    g.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + d)
    o.connect(g); g.connect(master); o.start(); o.stop(ctx.currentTime + d + .05)
  }
  function noise(d, vol) {
    const l = Math.floor(ctx.sampleRate * d), b = ctx.createBuffer(1, l, ctx.sampleRate), ch = b.getChannelData(0)
    for (let i = 0; i < l; i++) ch[i] = (Math.random() * 2 - 1) * (1 - i / l)
    const s = ctx.createBufferSource(); s.buffer = b
    const f = ctx.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 6500
    const g = ctx.createGain(); g.gain.value = vol || .2
    s.connect(f); f.connect(g); g.connect(master); s.start()
  }
  function buzz(p) { if (navigator.vibrate && !reduced) { try { navigator.vibrate(p) } catch (e) { /* noop */ } } }
  const mel = [0, 3, 7, 10, 7, 3, 5, 10]
  function loop() {
    const b = step % 8
    if (b === 0 || b === 4) { tone(50, .45, 'sine', .95); buzz([95]) }
    if (b === 2 || b === 6) { tone(170, .15, 'triangle', .3) }
    if (b % 2 === 1) noise(.055, .15)
    tone(220 * Math.pow(2, mel[step % mel.length] / 12), .3, 'sawtooth', .09)
    step++
  }
  const disc = document.getElementById('disc')
  function toggle() {
    if (!ctx) initAudio()
    if (ctx.state === 'suspended') ctx.resume()
    if (playing) {
      clearInterval(timer); playing = false
      disc.classList.remove('spin'); monEl && monEl.classList.remove('live')
    } else {
      loop(); timer = setInterval(loop, 300); playing = true
      disc.classList.add('spin'); monEl && monEl.classList.add('live')
    }
  }
  on(disc, 'click', toggle)
  if (monEl) on(monEl, 'click', toggle)
  cleanups.push(() => { clearInterval(timer); if (ctx) ctx.close() })

  const ptn = { bass: [56, .5, 'sine'], mid: [300, .28, 'triangle'], high: [1500, .16, 'square'] }
  document.querySelectorAll('.crow').forEach((p) => {
    on(p, 'click', () => {
      const b = p.dataset.band
      buzz(pat[b])
      p.classList.remove('hit'); void p.offsetWidth; p.classList.add('hit')
      scopes.forEach((s) => { if (s.band === b) s.boost = 1.15 })
      if (!ctx) initAudio()
      if (ctx.state === 'suspended') ctx.resume()
      const t = ptn[b]; tone(t[0], t[1], t[2], .5)
    })
    on(p, 'mouseenter', () => scopes.forEach((s) => { if (s.band === p.dataset.band) s.boost = .5 }))
  })

  const barsEl = document.getElementById('bars'), bars = []
  barsEl.innerHTML = ''
  for (let i = 0; i < 72; i++) { const el = document.createElement('i'); barsEl.appendChild(el); bars.push(el) }

  /* ===== 3D contour wave terrain ===== */
  const cv3 = document.getElementById('stage')
  const rd = new THREE.WebGLRenderer({ canvas: cv3, antialias: true, alpha: true })
  rd.setPixelRatio(Math.min(devicePixelRatio, 1.75))
  const sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(46, 1, .1, 200)
  cam.position.set(0, 5.4, 17); cam.lookAt(0, 1.2, -10)

  const LINES = 58, PTS = 170, SX = 62, ZNEAR = 6, ZFAR = -62
  const rows = []
  for (let li = 0; li < LINES; li++) {
    const zt = li / (LINES - 1), z = ZNEAR + (ZFAR - ZNEAR) * zt
    const pa = new Float32Array(PTS * 3), ca = new Float32Array(PTS * 3)
    for (let j = 0; j < PTS; j++) { pa[j * 3] = -SX / 2 + SX * (j / (PTS - 1)); pa[j * 3 + 1] = 0; pa[j * 3 + 2] = z }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pa, 3))
    g.setAttribute('color', new THREE.BufferAttribute(ca, 3))
    const m = new THREE.LineBasicMaterial({
      vertexColors: true, transparent: true, opacity: .95,
      blending: THREE.AdditiveBlending, depthWrite: false,
    })
    const line = new THREE.Line(g, m)
    sc.add(line)
    rows.push({ g, m, z, zt })
  }
  cleanups.push(() => {
    rows.forEach((row) => { row.g.dispose(); row.m.dispose() })
    rd.dispose()
  })
  const C_A = { r: .22, g: .91, b: .81 }, C_W = { r: .85, g: .65, b: .30 }
  let lo = .08, mi = .06, hi = .05, T = 0, mxp = 0, myp = 0
  on(window, 'mousemove', (e) => { mxp = e.clientX / innerWidth - .5; myp = e.clientY / innerHeight - .5 })
  function fit3() {
    const w = cv3.clientWidth, h = cv3.clientHeight
    if (cv3.width !== w || cv3.height !== h) { rd.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix() }
  }

  function drawField() {
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i], p = row.g.attributes.position.array, c = row.g.attributes.color.array
      const z = row.z, depthFade = Math.pow(1 - row.zt, .9)
      for (let j = 0; j < PTS; j++) {
        const x = p[j * 3]
        const d = Math.sqrt(x * x + z * z)
        const y = Math.sin(d * .30 - T * 2.0) * (1.0 + lo * 5.2) / (1 + d * .055)
          + Math.sin(x * .16 + T * .9) * Math.cos(z * .13 - T * .6) * (.35 + mi * 2.2)
          + Math.sin(x * .62 + T * 3.4) * (hi * .55)
        p[j * 3 + 1] = y
        let edge = 1 - Math.pow(Math.abs(x) / (SX / 2), 2.2)
        if (edge < 0) edge = 0
        const amp = Math.min(1, Math.abs(y) * .5 + .1)
        const mixw = Math.min(1, lo * 1.4)
        const k = (.16 + amp * .9) * edge * depthFade
        c[j * 3] = (C_A.r + (C_W.r - C_A.r) * mixw) * k
        c[j * 3 + 1] = (C_A.g + (C_W.g - C_A.g) * mixw) * k
        c[j * 3 + 2] = (C_A.b + (C_W.b - C_A.b) * mixw) * k
      }
      row.g.attributes.position.needsUpdate = true
      row.g.attributes.color.needsUpdate = true
    }
  }

  let tickRaf
  function tick(t) {
    tickRaf = requestAnimationFrame(tick)
    const tt = (t || 0) / 1000
    scopes.forEach((s) => drawScope(s, tt))
    T += reduced ? .0022 : .0105
    if (an && playing) {
      an.getByteFrequencyData(data)
      const n = data.length, ai = Math.floor(n * .06), bi = Math.floor(n * .34)
      let a = 0, b = 0, csum = 0, i
      for (i = 0; i < ai; i++) a += data[i]
      for (i = ai; i < bi; i++) b += data[i]
      for (i = bi; i < n; i++) csum += data[i]
      lo = lo * .6 + (a / ai / 255) * .4; mi = mi * .6 + (b / (bi - ai) / 255) * .4; hi = hi * .6 + (csum / (n - bi) / 255) * .4
      for (i = 0; i < 72; i++) bars[i].style.height = (2 + data[Math.floor(i / 72 * n * .72)] / 255 * 98) + '%'
    } else {
      lo = lo * .95 + .08 * .05; mi = mi * .95 + .06 * .05; hi = hi * .95 + .05 * .05
      for (let j = 0; j < 72; j++) bars[j].style.height = (2 + Math.abs(Math.sin(T * 2.2 + j * .28)) * 9) + '%'
    }
    if (scrollY > innerHeight * 1.2) return
    drawSlash(tt); drawMon(tt)
    fit3(); drawField()
    cam.position.x += (mxp * 3.4 - cam.position.x) * .035
    cam.position.y += (5.4 - myp * 1.8 - cam.position.y) * .035
    cam.lookAt(0, 1.2, -10)
    rd.render(sc, cam)
  }
  tickRaf = requestAnimationFrame(tick)
  cleanups.push(() => cancelAnimationFrame(tickRaf))

  return () => cleanups.forEach((fn) => fn())
}
