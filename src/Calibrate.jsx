import { useEffect, useRef, useState } from 'react'

/* Мэдрэхүйн калибровк — хэрэглэгчийн мэдрэх босгыг 4 алхамтай тестээр тодорхойлж,
   чичиргээний хүч / гэрлийн эрчим / давтамжийн бүсийн тохиргоог автоматаар өгнө. */

const BAND_SAMPLES = [
  { key: 'bass', label: 'Бас', hz: '55 Hz', freq: 55, type: 'sine', dur: .7, vib: [220] },
  { key: 'mid', label: 'Дунд', hz: '330 Hz', freq: 330, type: 'triangle', dur: .45, vib: [60, 40, 60] },
  { key: 'high', label: 'Өндөр', hz: '1.8 kHz', freq: 1800, type: 'square', dur: .3, vib: [15, 20, 15, 20, 15] },
]

export default function Calibrate({ open, onClose, onDone }) {
  const [step, setStep] = useState(0)
  const [vibChoice, setVibChoice] = useState(1)
  const [lightChoice, setLightChoice] = useState(1)
  const [bandsSel, setBandsSel] = useState({ bass: true, mid: true, high: true })
  const [tried, setTried] = useState(false)
  const ctxRef = useRef(null)

  const canVibrate = typeof navigator !== 'undefined' && !!navigator.vibrate

  useEffect(() => {
    if (open) { setStep(0); setTried(false) }
    if (!open && ctxRef.current) { ctxRef.current.close().catch(() => {}); ctxRef.current = null }
  }, [open])

  if (!open) return null

  function tone(freq, dur, type) {
    if (!ctxRef.current) ctxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    const ctx = ctxRef.current
    if (ctx.state === 'suspended') ctx.resume()
    const o = ctx.createOscillator(), g = ctx.createGain()
    o.type = type; o.frequency.value = freq
    g.gain.setValueAtTime(0, ctx.currentTime)
    g.gain.linearRampToValueAtTime(.5, ctx.currentTime + .02)
    g.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + dur)
    o.connect(g); g.connect(ctx.destination)
    o.start(); o.stop(ctx.currentTime + dur + .05)
  }
  function buzz(p) { if (canVibrate) { try { navigator.vibrate(p) } catch { /* noop */ } } }

  function tryVib() {
    setTried(true)
    buzz([300])
    tone(55, .8, 'sine')
  }
  function trySample(s) {
    tone(s.freq, s.dur, s.type)
    buzz(s.vib)
  }
  function toggleBand(k) {
    setBandsSel((prev) => {
      const next = { ...prev, [k]: !prev[k] }
      if (!next.bass && !next.mid && !next.high) return prev // дор хаяж 1 бүс
      return next
    })
  }
  function finish() {
    onDone({ vib: vibChoice, light: lightChoice, bands: bandsSel, calibrated: true })
    onClose()
  }

  const VIB_ANS = [
    { label: 'Тод мэдэрсэн', hint: 'Сул горим тохирно', val: 0 },
    { label: 'Бага зэрэг', hint: 'Дунд горим тохирно', val: 1 },
    { label: 'Мэдрээгүй', hint: 'Хүчтэй горим тохирно', val: 2 },
  ]
  const LIGHT_ANS = [
    { label: 'Хэт тод байна', hint: 'Бүдэг горим', val: 0 },
    { label: 'Яг таарсан', hint: 'Дунд горим', val: 1 },
    { label: 'Бүдэг харагдсан', hint: 'Тод горим', val: 2 },
  ]
  const stepTitles = ['', 'Чичиргээ', 'Гэрэл', 'Давтамж', 'Дүгнэлт']

  return (
    <div className="cal-ov" role="dialog" aria-modal="true" aria-label="Мэдрэхүйн калибровк">
      <div className="cal-box">
        {step > 0 && (
          <div className="cal-prog" aria-hidden="true">
            {[1, 2, 3, 4].map((s) => (
              <i key={s} className={step >= s ? 'on' : ''}></i>
            ))}
          </div>
        )}

        {step === 0 && (
          <div className="cal-step">
            <span className="cal-big" aria-hidden="true">🎛</span>
            <h2>Мэдрэхүйн калибровк</h2>
            <p>
              Сонсголын мэдрэмж хүн бүрд өөр. Богино тестээр таны <b>мэдрэх босгыг</b> тодорхойлж,
              чичиргээ болон гэрлийн тохиргоог танд яг тааруулж өгье. Ердөө 1 минут зарцуулна.
            </p>
            <div className="cal-row">
              <button className="bt bt-a" onClick={() => setStep(1)}>Эхлэх →</button>
              <button className="bt" onClick={onClose}>Дараа хийе</button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="cal-step">
            <span className="mono">1 / 4 · {stepTitles[1]}</span>
            <h2>Чичиргээг мэдэрч үзье</h2>
            {canVibrate ? (
              <p>Утсаа гартаа барьж байгаад доорх товчийг дараарай — 0.3 секундын чичиргээ өгнө.</p>
            ) : (
              <p>Энэ төхөөрөмж чичиргээгүй тул дууны туршилт хийнэ. Утсан дээр дахин калибровк хийхэд чичиргээ нэмэгдэнэ.</p>
            )}
            <button className={'cal-test' + (tried ? ' done' : '')} onClick={tryVib}>
              📳 {tried ? 'Дахин туршиж үзэх' : 'Туршиж үзэх'}
            </button>
            <div className="cal-ans">
              {VIB_ANS.map((a) => (
                <button
                  key={a.val}
                  className={vibChoice === a.val && tried ? 'on' : ''}
                  disabled={!tried}
                  onClick={() => { setVibChoice(a.val); setStep(2) }}
                >
                  <b>{a.label}</b><span>{a.hint}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="cal-step">
            <span className="mono">2 / 4 · {stepTitles[2]}</span>
            <h2>Гэрлийн пульс хэр харагдаж байна?</h2>
            <div className="cal-pulse-wrap" aria-hidden="true">
              <span className="cal-pulse"></span>
            </div>
            <div className="cal-ans">
              {LIGHT_ANS.map((a) => (
                <button key={a.val} onClick={() => { setLightChoice(a.val); setStep(3) }}>
                  <b>{a.label}</b><span>{a.hint}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="cal-step">
            <span className="mono">3 / 4 · {stepTitles[3]}</span>
            <h2>Аль давтамжийг мэдэрдэг вэ?</h2>
            <p>Тус бүрийг туршаад, мэдэрсэн бүсүүдээ идэвхтэй үлдээгээрэй. Идэвхгүй бүс чичиргээ өгөхгүй.</p>
            <div className="cal-bands">
              {BAND_SAMPLES.map((s) => (
                <div key={s.key} className={'cal-band' + (bandsSel[s.key] ? ' on' : '')}>
                  <button className="cal-band-play" onClick={() => trySample(s)} aria-label={s.label + ' туршиж үзэх'}>▶</button>
                  <div className="cal-band-meta"><b>{s.label}</b><span className="mono">{s.hz}</span></div>
                  <button
                    className="cal-band-tgl"
                    onClick={() => toggleBand(s.key)}
                    aria-pressed={bandsSel[s.key]}
                  >{bandsSel[s.key] ? '✓ Мэдэрсэн' : 'Мэдрээгүй'}</button>
                </div>
              ))}
            </div>
            <div className="cal-row">
              <button className="bt bt-a" onClick={() => setStep(4)}>Үргэлжлүүлэх →</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="cal-step">
            <span className="mono">4 / 4 · {stepTitles[4]}</span>
            <span className="cal-big" aria-hidden="true">✓</span>
            <h2>Таны мэдрэхүйн профайл</h2>
            <div className="cal-sum">
              <div><span className="mono">Чичиргээ</span><b>{['Сул', 'Дунд', 'Хүчтэй'][vibChoice]}</b></div>
              <div><span className="mono">Гэрэл</span><b>{['Бүдэг', 'Дунд', 'Тод'][lightChoice]}</b></div>
              <div>
                <span className="mono">Бүс</span>
                <b>{[bandsSel.bass && 'Бас', bandsSel.mid && 'Дунд', bandsSel.high && 'Өндөр'].filter(Boolean).join(' · ')}</b>
              </div>
            </div>
            <p className="cal-note">Тохиргоог хүссэн үедээ ⚙️ цэснээс өөрчилж, дахин калибровк хийж болно.</p>
            <div className="cal-row">
              <button className="bt bt-a" onClick={finish}>Хадгалаад эхлэх →</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
