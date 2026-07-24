import { useEffect, useState } from 'react'
import BackBar from './BackBar.jsx'
import { useToast } from '../ui/Toast.jsx'

/* Төхөөрөмж холбох — утас / gamepad / BLE хантааз + тест + давтамж→байрлал оноолт.
   Дизайн баримт §12-ийн device abstraction-ий UI хувилбар. */

const ZONES = [
  { v: 'chest', label: 'Цээж' },
  { v: 'ribs', label: 'Хавирга' },
  { v: 'shoulder', label: 'Мөр' },
  { v: 'wrist', label: 'Бугуй' },
]
const DEFAULT_MAP = { bass: 'chest', mid: 'ribs', high: 'shoulder' }
const BAND_LABEL = { bass: 'Бас (20–250 Hz)', mid: 'Дунд (250–4k)', high: 'Өндөр (4–20k)' }
const BAND_PAT = { bass: [230, 80, 230], mid: [70, 50, 70, 50, 70], high: [24, 24, 24, 24, 24, 24] }

export default function DevicesView({ prefs, onUpdatePrefs, canVibrate, onBack }) {
  const toast = useToast()
  const [gamepad, setGamepad] = useState(null)
  const map = { ...DEFAULT_MAP, ...(prefs.deviceMap || {}) }

  /* gamepad холболтыг ажиглах */
  useEffect(() => {
    const scan = () => {
      const gp = [...(navigator.getGamepads?.() || [])].find(Boolean)
      setGamepad(gp || null)
    }
    scan()
    addEventListener('gamepadconnected', scan)
    addEventListener('gamepaddisconnected', scan)
    const iv = setInterval(scan, 1500)
    return () => {
      removeEventListener('gamepadconnected', scan)
      removeEventListener('gamepaddisconnected', scan)
      clearInterval(iv)
    }
  }, [])

  function testPhone() {
    if (!canVibrate) { toast.error('Энэ төхөөрөмж чичиргээ дэмжихгүй — Android утсан дээр туршина уу'); return }
    try { navigator.vibrate([230, 80, 230]); toast.success('Утас чичирлээ 📳') } catch { toast.error('Чичиргээ ажиллахгүй байна') }
  }

  function testGamepad() {
    const gp = [...(navigator.getGamepads?.() || [])].find(Boolean)
    if (!gp) { toast.error('Gamepad олдсонгүй — холбоод, нэг товч дараарай'); return }
    const act = gp.vibrationActuator
    if (act?.playEffect) {
      act.playEffect('dual-rumble', { duration: 320, strongMagnitude: 1, weakMagnitude: .55 })
      toast.success('Gamepad чичирлээ 🎮')
    } else { toast.error('Энэ gamepad чичиргээ дэмжихгүй') }
  }

  async function connectBLE() {
    if (!navigator.bluetooth) { toast.error('Web Bluetooth дэмжигдэхгүй — Chrome/Edge (desktop/Android) ашиглана уу'); return }
    try {
      const d = await navigator.bluetooth.requestDevice({ acceptAllDevices: true })
      toast.success('Холбогдлоо: ' + (d.name || 'төхөөрөмж'))
    } catch (e) {
      if (e.name !== 'NotFoundError') toast.error('Холбогдож чадсангүй')
    }
  }

  function setZone(band, zone) {
    onUpdatePrefs({ deviceMap: { ...map, [band]: zone } })
  }
  function testZone(band) {
    if (canVibrate) { try { navigator.vibrate(BAND_PAT[band]) } catch { /* noop */ } }
    toast.info(BAND_LABEL[band] + ' → ' + (ZONES.find((z) => z.v === map[band])?.label))
  }

  const devices = [
    { key: 'phone', icon: '📱', name: 'Утас (чичиргээ)', desc: 'Android Chrome дээр шууд ажиллана. iOS дэмжихгүй.',
      status: canVibrate ? 'Бэлэн' : 'Дэмжигдэхгүй', ok: canVibrate, action: testPhone, actionLabel: 'Тест' },
    { key: 'gamepad', icon: '🎮', name: 'Gamepad (rumble)', desc: 'USB/Bluetooth джойстик — 2 моторт, эрчимтэй чичиргээ.',
      status: gamepad ? ('Холбогдсон: ' + (gamepad.id?.slice(0, 22) || 'gamepad')) : 'Холбогдоогүй', ok: !!gamepad, action: testGamepad, actionLabel: 'Тест' },
    { key: 'ble', icon: '🦺', name: 'BLE хаптик хантааз', desc: 'Олон моторт хантааз/суудал — биеийн бүсээр tonotopic мэдрэмж.',
      status: navigator.bluetooth ? 'Холбоход бэлэн' : 'Браузер дэмжихгүй', ok: !!navigator.bluetooth, action: connectBLE, actionLabel: 'Холбох' },
  ]

  return (
    <>
      <BackBar title="Төхөөрөмж холбох" onBack={onBack} />

      <p className="dv-lead">Хөгжмийг илүү хүчтэй мэдрэхийн тулд төхөөрөмж холбоно. Утас хамгийн энгийн нь — хантааз хамгийн гүн мэдрэмж өгнө.</p>

      <div className="dv-grid">
        {devices.map((d) => (
          <div className={'dv-card' + (d.ok ? ' ok' : '')} key={d.key}>
            <span className="dv-ic" aria-hidden="true">{d.icon}</span>
            <b>{d.name}</b>
            <p>{d.desc}</p>
            <span className={'dv-status' + (d.ok ? ' on' : '')}>
              <i className="dv-dot" aria-hidden="true"></i>{d.status}
            </span>
            <button className="bt bt-a dv-btn" onClick={d.action}>{d.actionLabel}</button>
          </div>
        ))}
      </div>

      <h3 className="st-h">Давтамж → биеийн байрлал</h3>
      <p className="dv-lead">Олон моторт төхөөрөмж дээр давтамжийн бүс бүрийг биеийн өөр цэгт оноож болно (чихний дун шиг — «tonotopic»). Дараад туршиж үзээрэй.</p>

      <div className="dv-map">
        {['bass', 'mid', 'high'].map((band) => (
          <div className="dv-maprow" key={band}>
            <button className="dv-testz" onClick={() => testZone(band)} aria-label={BAND_LABEL[band] + ' туршиж үзэх'}>▶</button>
            <span className="dv-band">{BAND_LABEL[band]}</span>
            <span className="dv-arrow" aria-hidden="true">→</span>
            <select className="dv-select" value={map[band]} onChange={(e) => setZone(band, e.target.value)} aria-label={BAND_LABEL[band] + ' байрлал'}>
              {ZONES.map((z) => <option key={z.v} value={z.v}>{z.label}</option>)}
            </select>
          </div>
        ))}
      </div>

      <div className="sp-banner dv-note">
        <div>
          <b>Санамж</b>
          <p>Компьютер дээр жинхэнэ чичиргээ гарахгүй — зөвхөн гэрлийн пульс. Бүрэн туршихын тулд Android утас эсвэл gamepad холбоно уу.</p>
        </div>
      </div>
    </>
  )
}
