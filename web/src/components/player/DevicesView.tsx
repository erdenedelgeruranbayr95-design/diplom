"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import BackBar from "./BackBar";
import { useToast } from "@/components/providers/ToastProvider";
import type { useDeviceSync } from "@/lib/socket/useDeviceSync";

/* Төхөөрөмж холбох — утас / gamepad / BLE хантааз + тест + давтамж→байрлал оноолт.
   Дизайн баримт §12-ийн device abstraction-ий UI хувилбар. */

const ZONES = [
  { v: 'chest', label: 'Цээж' },
  { v: 'ribs', label: 'Хавирга' },
  { v: 'shoulder', label: 'Мөр' },
  { v: 'wrist', label: 'Бугуй' },
]
const DEFAULT_MAP: Record<string, string> = { bass: 'chest', mid: 'ribs', high: 'shoulder' }
const BAND_LABEL: Record<string, string> = { bass: 'Бас (20–250 Hz)', mid: 'Дунд (250–4k)', high: 'Өндөр (4–20k)' }
const BAND_PAT: Record<string, number[]> = { bass: [230, 80, 230], mid: [70, 50, 70, 50, 70], high: [24, 24, 24, 24, 24, 24] }

export default function DevicesView({
  prefs,
  onUpdatePrefs,
  canVibrate,
  onBack,
  deviceSync,
}: {
  prefs: { deviceMap?: Record<string, string> };
  onUpdatePrefs: (patch: { deviceMap: Record<string, string> }) => void;
  canVibrate: boolean;
  onBack: () => void;
  deviceSync: ReturnType<typeof useDeviceSync>;
}) {
  const toast = useToast()
  const [gamepad, setGamepad] = useState<Gamepad | null>(null)
  const [justConnected, setJustConnected] = useState(false)
  const map = { ...DEFAULT_MAP, ...(prefs.deviceMap || {}) }

  /* waiting→connected шилжилтийг ажиглаж, богино "✓" flourish харуулна (шинэ state биш, зөвхөн UI). */
  useEffect(() => {
    if (deviceSync.qrState !== 'connected') return
    setJustConnected(true)
    const t = setTimeout(() => setJustConnected(false), 1600)
    return () => clearTimeout(t)
  }, [deviceSync.qrState])

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
    const act = (gp as any).vibrationActuator
    if (act?.playEffect) {
      act.playEffect('dual-rumble', { duration: 320, strongMagnitude: 1, weakMagnitude: .55 })
      toast.success('Gamepad чичирлээ 🎮')
    } else { toast.error('Энэ gamepad чичиргээ дэмжихгүй') }
  }

  async function connectBLE() {
    if (!(navigator as any).bluetooth) { toast.error('Web Bluetooth дэмжигдэхгүй — Chrome/Edge (desktop/Android) ашиглана уу'); return }
    try {
      const d = await (navigator as any).bluetooth.requestDevice({ acceptAllDevices: true })
      toast.success('Холбогдлоо: ' + (d.name || 'төхөөрөмж'))
    } catch (e: any) {
      if (e.name !== 'NotFoundError') toast.error('Холбогдож чадсангүй')
    }
  }

  async function connectQr() {
    await deviceSync.createSession()
  }

  function setZone(band: string, zone: string) {
    onUpdatePrefs({ deviceMap: { ...map, [band]: zone } })
  }
  function testZone(band: string) {
    if (canVibrate) { try { navigator.vibrate(BAND_PAT[band]) } catch { /* noop */ } }
    toast.info(BAND_LABEL[band] + ' → ' + (ZONES.find((z) => z.v === map[band])?.label))
  }

  const qrStatusLabel: Record<string, string> = {
    idle: 'Холбогдоогүй',
    loading: 'QR үүсгэж байна…',
    waiting: 'Утсаараа уншуулна уу',
    connected: 'Холбогдсон',
    error: 'Алдаа гарлаа',
  }

  const devices = [
    { key: 'phone', icon: '📱', name: 'Утас (чичиргээ)', desc: 'Android Chrome дээр шууд ажиллана. iOS дэмжихгүй.',
      status: canVibrate ? 'Бэлэн' : 'Дэмжигдэхгүй', ok: canVibrate, action: testPhone, actionLabel: 'Тест' },
    { key: 'qr', icon: '🔗', name: 'QR-ээр холбох (алсаас)', desc: 'Гар утсаараа QR уншуулж, тоглуулж буй дуутай синхроноор чичирнэ.',
      status: qrStatusLabel[deviceSync.qrState], ok: deviceSync.qrState === 'connected', action: connectQr, actionLabel: deviceSync.qrState === 'idle' ? 'Холбох' : 'Дахин холбох' },
    { key: 'gamepad', icon: '🎮', name: 'Gamepad (rumble)', desc: 'USB/Bluetooth джойстик — 2 моторт, эрчимтэй чичиргээ.',
      status: gamepad ? ('Холбогдсон: ' + (gamepad.id?.slice(0, 22) || 'gamepad')) : 'Холбогдоогүй', ok: !!gamepad, action: testGamepad, actionLabel: 'Тест' },
    { key: 'ble', icon: '🦺', name: 'BLE хаптик хантааз', desc: 'Олон моторт хантааз/суудал — биеийн бүсээр tonotopic мэдрэмж.',
      status: (navigator as any).bluetooth ? 'Холбоход бэлэн' : 'Браузер дэмжихгүй', ok: !!(navigator as any).bluetooth, action: connectBLE, actionLabel: 'Холбох' },
  ]

  return (
    <>
      <BackBar title="Төхөөрөмж холбох" onBack={onBack} />

      <p className="dv-lead">Хөгжмийг илүү хүчтэй мэдрэхийн тулд төхөөрөмж холбоно. Утас хамгийн энгийн нь — хантааз хамгийн гүн мэдрэмж өгнө.</p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-3.5 mb-3">
        {devices.map((d) => (
          <div
            key={d.key}
            className={
              "flex flex-col items-start gap-2 bg-white/[.03] border rounded-xl p-5 transition-[border-color,box-shadow,transform] duration-250 hover:-translate-y-0.5 hover:shadow-sm " +
              (d.ok ? "border-[rgba(56,232,206,.35)]" : "border-line")
            }
          >
            <span className="text-[30px] leading-none" aria-hidden="true">{d.icon}</span>
            <b className="font-display font-normal text-[15px] text-ink">{d.name}</b>
            <p className="flex-1 m-0 text-dim text-[12.5px] leading-[1.5]">{d.desc}</p>
            <span className={"inline-flex items-center gap-[7px] font-mono text-[10.5px] transition-colors duration-300 " + (d.ok ? "text-aqua" : "text-dim")}>
              <i
                className={
                  "w-[7px] h-[7px] rounded-full transition-[background,box-shadow] duration-300 " +
                  (d.ok ? "bg-aqua shadow-[0_0_8px_var(--aqua)]" : "bg-faint")
                }
                aria-hidden="true"
              ></i>
              {d.status}
            </span>
            <button className="bt bt-a !p-[12px_20px] !text-[13px] !min-h-11" onClick={d.action}>{d.actionLabel}</button>
          </div>
        ))}
      </div>

      {(deviceSync.qrState === 'waiting' || deviceSync.qrState === 'connected') && deviceSync.qrToken && (
        <div
          className={
            "sp-banner !mt-1 " +
            (justConnected ? "!border-[rgba(56,232,206,.45)] !shadow-glow-aqua transition-[border-color,box-shadow] duration-300" : "")
          }
          style={{ display: 'flex', alignItems: 'center', gap: 20 }}
        >
          {deviceSync.qrState === 'waiting' && (
            <span className="bg-white p-3 rounded-xl inline-flex shadow-md border border-white/[.08] [animation:dv-qr-in_.3s_cubic-bezier(.2,.8,.2,1)]">
              <QRCodeSVG value={`${window.location.origin}/mobile/${deviceSync.qrToken}`} size={128} />
            </span>
          )}
          {deviceSync.qrState === 'connected' && (
            <span
              className={
                "w-14 h-14 flex-none rounded-full flex items-center justify-center bg-[rgba(56,232,206,.15)] text-aqua text-2xl font-bold " +
                (justConnected ? "[animation:dv-qr-pop_.5s_cubic-bezier(.2,.8,.2,1)]" : "")
              }
              aria-hidden="true"
            >
              ✓
            </span>
          )}
          <div>
            <b>{deviceSync.qrState === 'connected' ? '✓ Утас холбогдлоо' : 'Утсаараа QR кодыг уншуулна уу'}</b>
            <p>{deviceSync.qrState === 'connected' ? 'Тоглуулж буй дуутай синхроноор чичирнэ.' : 'Камер апп нээгээд кодыг чиглүүлнэ үү — линк автоматаар нээгдэнэ.'}</p>
          </div>
        </div>
      )}

      <h3 className="st-h">Давтамж → биеийн байрлал</h3>
      <p className="dv-lead">Олон моторт төхөөрөмж дээр давтамжийн бүс бүрийг биеийн өөр цэгт оноож болно (чихний дун шиг — «tonotopic»). Дараад туршиж үзээрэй.</p>

      <div className="flex flex-col gap-3 mb-5">
        {['bass', 'mid', 'high'].map((band) => (
          <div className="dv-maprow" key={band}>
            <button
              className="w-11 h-11 flex-[0_0_44px] rounded-full border border-line bg-[rgba(56,232,206,.1)] text-aqua cursor-pointer transition-[background,transform,box-shadow] duration-200 hover:bg-[rgba(56,232,206,.18)] active:scale-[.92] focus-visible:shadow-glow-aqua"
              onClick={() => testZone(band)}
              aria-label={BAND_LABEL[band] + ' туршиж үзэх'}
            >
              ▶
            </button>
            <span className="flex-1 text-sm text-ink">{BAND_LABEL[band]}</span>
            <span className="text-faint" aria-hidden="true">→</span>
            <select
              className="!w-auto !min-w-[120px] !min-h-11 p-[12px_14px] rounded-sm bg-white/[.04] border border-line text-ink text-[14.5px] font-[inherit] transition-[border-color,box-shadow] duration-300 focus:border-aqua focus-visible:outline-none focus-visible:shadow-glow-aqua"
              value={map[band]}
              onChange={(e) => setZone(band, e.target.value)}
              aria-label={BAND_LABEL[band] + ' байрлал'}
            >
              {ZONES.map((z) => <option key={z.v} value={z.v}>{z.label}</option>)}
            </select>
          </div>
        ))}
      </div>

      <div className="sp-banner !mt-1">
        <div>
          <b>Санамж</b>
          <p>Компьютер дээр жинхэнэ чичиргээ гарахгүй — зөвхөн гэрлийн пульс. Бүрэн туршихын тулд Android утас эсвэл gamepad холбоно уу.</p>
        </div>
      </div>
    </>
  )
}
