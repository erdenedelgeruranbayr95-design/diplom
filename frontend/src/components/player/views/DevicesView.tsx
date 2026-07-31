"use client";

import { useCallback, useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useWindowEvents } from "@/hooks/useWindowEvent";
import BackBar from "../BackBar";
import { SectionTitle } from "@/components/ui/PageHeader";
import { ActionButton } from "@/components/ui/ActionGroup";
import { useToast } from "@/components/providers/ToastProvider";
import type { useDeviceSync } from "@/lib/socket/useDeviceSync";
import Icon from "@/components/ui/Icon";

/* Төхөөрөмж холбох — утас / gamepad / BLE хантааз + тест + давтамж→байрлал оноолт.
   Дизайн баримт §12-ийн device abstraction-ий UI хувилбар. Премиум dashboard дизайн руу
   шинэчлэв (.dv-lead/.st-h/.dv-maprow/.sp-banner legacy CSS-ийг Tailwind болгов, .bt товчийг
   ActionButton болгов) — testPhone/testGamepad/connectBLE/connectQr/setZone/testZone логик
   бүхэлдээ хэвээр, зөвхөн визуал давхарга шинэчлэгдсэн. */

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

  /* gamepad холболтыг ажиглах — event-үүд шууд мэдэгддэггүй браузер байдаг тул
     1.5 секунд тутмын нөөц шалгалттай хамт явна. */
  const scanGamepads = useCallback(() => {
    const gp = [...(navigator.getGamepads?.() || [])].find(Boolean)
    setGamepad(gp || null)
  }, [])

  useEffect(() => {
    scanGamepads()
    const iv = setInterval(scanGamepads, 1500)
    return () => clearInterval(iv)
  }, [scanGamepads])

  useWindowEvents(['gamepadconnected', 'gamepaddisconnected'], scanGamepads)

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
    { key: 'phone', icon: 'device', name: 'Утас (чичиргээ)', desc: 'Android Chrome дээр шууд ажиллана. iOS дэмжихгүй.',
      status: canVibrate ? 'Бэлэн' : 'Дэмжигдэхгүй', ok: canVibrate, action: testPhone, actionLabel: 'Тест' },
    { key: 'qr', icon: 'link', name: 'QR-ээр холбох (алсаас)', desc: 'Гар утсаараа QR уншуулж, тоглуулж буй дуутай синхроноор чичирнэ.',
      status: qrStatusLabel[deviceSync.qrState], ok: deviceSync.qrState === 'connected', action: connectQr,
      actionLabel: deviceSync.qrState === 'connected' ? 'Холбогдсон' : deviceSync.qrState === 'idle' || deviceSync.qrState === 'error' ? 'Холбох' : 'Хүлээж байна…',
      disabled: deviceSync.qrState === 'connected' || deviceSync.qrState === 'loading' || deviceSync.qrState === 'waiting' },
    { key: 'gamepad', icon: 'gamepad', name: 'Gamepad (rumble)', desc: 'USB/Bluetooth джойстик — 2 моторт, эрчимтэй чичиргээ.',
      status: gamepad ? ('Холбогдсон: ' + (gamepad.id?.slice(0, 22) || 'gamepad')) : 'Холбогдоогүй', ok: !!gamepad, action: testGamepad, actionLabel: 'Тест' },
    { key: 'ble', icon: 'vest', name: 'BLE хаптик хантааз', desc: 'Олон моторт хантааз/суудал — биеийн бүсээр tonotopic мэдрэмж.',
      status: (navigator as any).bluetooth ? 'Холбоход бэлэн' : 'Браузер дэмжихгүй', ok: !!(navigator as any).bluetooth, action: connectBLE, actionLabel: 'Холбох' },
  ]

  return (
    <>
      <BackBar title="Төхөөрөмж холбох" onBack={onBack} />

      <p className="text-dim text-sm leading-[1.55] mb-5 max-w-[640px]">Хөгжмийг илүү хүчтэй мэдрэхийн тулд төхөөрөмж холбоно. Утас хамгийн энгийн нь — хантааз хамгийн гүн мэдрэмж өгнө.</p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-3.5 mb-3">
        {devices.map((d) => (
          <div
            key={d.key}
            className={
              "flex flex-col items-start gap-2 bg-white/[.03] border rounded-2xl p-5 transition-[border-color,box-shadow,transform] duration-250 hover:-translate-y-0.5 hover:shadow-sm " +
              (d.ok ? "border-aqua/35" : "border-white/[.08]")
            }
          >
            <span
              className={
                "w-11 h-11 mb-1 flex-none rounded-xl flex items-center justify-center transition-colors duration-250 " +
                (d.ok
                  ? "text-aqua bg-aqua/[.10] shadow-[inset_0_0_0_1px_rgba(56,232,206,.22)]"
                  : "text-dim bg-white/[.06] shadow-[inset_0_0_0_1px_rgba(255,255,255,.08)]")
              }
              aria-hidden="true"
            >
              <Icon name={d.icon} size={22} />
            </span>
            <b className="font-display font-normal text-lead text-ink">{d.name}</b>
            <p className="flex-1 m-0 text-dim text-note leading-[1.5]">{d.desc}</p>
            <span className={"inline-flex items-center gap-[7px] font-mono text-meta transition-colors duration-300 " + (d.ok ? "text-aqua" : "text-dim")}>
              <i
                className={
                  "w-[7px] h-[7px] rounded-full transition-[background,box-shadow] duration-300 " +
                  (d.ok ? "bg-aqua shadow-[0_0_8px_var(--aqua)]" : "bg-faint")
                }
                aria-hidden="true"
              ></i>
              {d.status}
            </span>
            <ActionButton variant="primary" size="sm" onClick={d.action} disabled={'disabled' in d ? d.disabled : false}>{d.actionLabel}</ActionButton>
          </div>
        ))}
      </div>

      {(deviceSync.qrState === 'waiting' || deviceSync.qrState === 'connected') && deviceSync.qrToken && (
        <div
          className={
            "rounded-2xl p-6 flex items-center gap-5 transition-[border-color,box-shadow] duration-300 [background:linear-gradient(120deg,rgba(56,232,206,.14),rgba(14,92,83,.25)_55%,rgba(9,14,14,.4))] " +
            (justConnected ? "shadow-glow-aqua" : "")
          }
        >
          {deviceSync.qrState === 'waiting' && (
            <span className="bg-white p-3 rounded-xl inline-flex shadow-md border border-white/[.08] [animation:dv-qr-in_.3s_cubic-bezier(.2,.8,.2,1)]">
              <QRCodeSVG value={`${window.location.origin}/mobile/${deviceSync.qrToken}`} size={128} />
            </span>
          )}
          {deviceSync.qrState === 'connected' && (
            <span
              className={
                "w-14 h-14 flex-none rounded-full flex items-center justify-center bg-aqua/[.15] text-aqua text-2xl font-bold " +
                (justConnected ? "[animation:dv-qr-pop_.5s_cubic-bezier(.2,.8,.2,1)]" : "")
              }
              aria-hidden="true"
            >
              <Icon name="check" size={26} strokeWidth={2.4} />
            </span>
          )}
          <div>
            <b className="block font-display font-semibold text-lead mb-1">{deviceSync.qrState === 'connected' ? 'Утас холбогдлоо' : 'Утсаараа QR кодыг уншуулна уу'}</b>
            <p className="text-dim text-body leading-[1.5]">{deviceSync.qrState === 'connected' ? 'Тоглуулж буй дуутай синхроноор чичирнэ.' : 'Камер апп нээгээд кодыг чиглүүлнэ үү — линк автоматаар нээгдэнэ.'}</p>
          </div>
        </div>
      )}

      <div className="mt-8">
        <SectionTitle title="Давтамж → биеийн байрлал" description="Олон моторт төхөөрөмж дээр давтамжийн бүс бүрийг биеийн өөр цэгт оноож болно (чихний дун шиг — «tonotopic»). Дараад туршиж үзээрэй." />
      </div>

      <div className="flex flex-col gap-3 mb-5">
        {['bass', 'mid', 'high'].map((band) => (
          <div className="flex items-center gap-3 bg-white/[.03] border border-white/[.08] rounded-xl py-2.5 px-3.5" key={band}>
            <button
              className="w-11 h-11 flex-none rounded-full border border-white/[.1] bg-aqua/[.1] text-aqua cursor-pointer transition-[background,transform,box-shadow] duration-200 hover:bg-aqua/[.18] active:scale-[.92] focus-visible:outline-none focus-visible:shadow-glow-aqua"
              onClick={() => testZone(band)}
              aria-label={BAND_LABEL[band] + ' туршиж үзэх'}
            >
              <span className="flex items-center justify-center pl-0.5" aria-hidden="true">
                <Icon name="chevronRight" size={16} strokeWidth={2.4} />
              </span>
            </button>
            <span className="flex-1 text-sm text-ink">{BAND_LABEL[band]}</span>
            <span className="text-dim flex" aria-hidden="true"><Icon name="arrowRight" size={14} /></span>
            <select
              className="min-w-[130px] min-h-11 p-[12px_14px] rounded-lg bg-white/[.04] border border-white/[.08] text-ink text-copy font-[inherit] transition-[border-color,box-shadow] duration-300 focus:border-aqua focus-visible:outline-none focus-visible:shadow-glow-aqua"
              value={map[band]}
              onChange={(e) => setZone(band, e.target.value)}
              aria-label={BAND_LABEL[band] + ' байрлал'}
            >
              {ZONES.map((z) => <option className="bg-surface text-ink" key={z.v} value={z.v}>{z.label}</option>)}
            </select>
          </div>
        ))}
      </div>

      <div className="rounded-2xl p-6 flex gap-4 items-start [background:linear-gradient(120deg,rgba(56,232,206,.14),rgba(14,92,83,.25)_55%,rgba(9,14,14,.4))]">
        <div>
          <b className="block font-display font-semibold text-lead mb-1">Санамж</b>
          <p className="text-dim text-body leading-[1.5]">Компьютер дээр жинхэнэ чичиргээ гарахгүй — зөвхөн гэрлийн пульс. Бүрэн туршихын тулд Android утас эсвэл gamepad холбоно уу.</p>
        </div>
      </div>
    </>
  )
}
