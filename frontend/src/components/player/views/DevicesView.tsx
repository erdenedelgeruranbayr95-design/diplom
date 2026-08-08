"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MutableRefObject } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useWindowEvents } from "@/hooks/useWindowEvent";
import BackBar from "../BackBar";
import { SectionTitle } from "@/components/ui/PageHeader";
import { ActionButton } from "@/components/ui/ActionGroup";
import { useToast } from "@/components/providers/ToastProvider";
import type { useDeviceSync } from "@/lib/socket/useDeviceSync";
import type { DeviceRouter } from "@/lib/haptics/DeviceRouter";
import { BleVestDevice } from "@/lib/haptics/BleVestDevice";
import { useMicHapticMode } from "@/lib/audio/useMicHapticMode";
import { bandToColor } from "@/lib/player/visualizer-modes";
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
/* Хуучин 3-бүсийн (bass/mid/high) нэрийг Haptic Score-ийн 8-бүсийн индекс (0-7,
   BAND_EDGES_HZ дараалалтай) рүү заана — DeviceRouter.setBand()-т ашиглана. */
const BAND_TO_8ZONE: Record<string, number> = { bass: 1, mid: 4, high: 6 }

export default function DevicesView({
  prefs,
  onUpdatePrefs,
  canVibrate,
  onBack,
  deviceSync,
  hasHapticScore,
  bandLevelsRef,
  deviceRouter,
}: {
  prefs: { deviceMap?: Record<string, string> };
  onUpdatePrefs: (patch: { deviceMap: Record<string, string> }) => void;
  canVibrate: boolean;
  onBack: () => void;
  deviceSync: ReturnType<typeof useDeviceSync>;
  hasHapticScore: boolean;
  bandLevelsRef: MutableRefObject<number[]>;
  deviceRouter: DeviceRouter;
}) {
  const toast = useToast()
  const [gamepad, setGamepad] = useState<Gamepad | null>(null)
  const [justConnected, setJustConnected] = useState(false)
  const [bleConnected, setBleConnected] = useState(() => deviceRouter.all.some((d) => d.id === "ble-vest" && d.isConnected()))
  const map = { ...DEFAULT_MAP, ...(prefs.deviceMap || {}) }

  /* Микрофон (live) горим — гадаад дуу чимээг 8-бүсээр задалж, холбогдсон бүх
     HapticDevice руу шууд дамжуулна (playback-той адил, songId шаардахгүй). */
  const mic = useMicHapticMode((bands) => {
    bands.forEach((level, zone) => deviceRouter.setBand(zone, level))
  })
  function toggleMic() {
    if (mic.active) { mic.stop(); toast.info('Микрофон горим унтарлаа'); return }
    mic.start().then((ok) => {
      if (ok) toast.success('Микрофон горим асаалаа — гадаад дуу чимээг мэдрэх боллоо')
      else toast.error('Микрофонд хандах эрх өгөгдөөгүй байна')
    })
  }

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
    /* Энгийн шаблон chичиргээ (bass→dund→bass) — HapticDevice.pulse() нэг импульс л
       өгдөг тул энд шууд navigator.vibrate-г ашиглана (одоо байгаа зан төлөв хэвээр).
       `navigator.vibrate()` нь `"vibrate" in navigator` (canVibrate) true байсан ч
       `false` буцааж чимээгүй татгалзаж болно (жиш. системийн Дуу/Чичиргээ тохиргоо
       хориглосон, эсвэл хэт олон/урт дуудлага throttle хийгдсэн) — өмнө нь энэ
       тохиолдолд аль ч toast харагдахгvй, товч "юу ч хийхгvй" мэт мэдрэгддэг байв. */
    try {
      const ok = navigator.vibrate([230, 80, 230]);
      if (ok === false) toast.error('Чичиргээ ажиллахгүй байна — системийн тохиргооноос Дуу чимээ/Чичиргээг шалгана уу');
      else toast.success('Утас чичирлээ 📳');
    } catch { toast.error('Чичиргээ ажиллахгүй байна') }
  }

  function testGamepad() {
    const gp = [...(navigator.getGamepads?.() || [])].find(Boolean)
    if (!gp) { toast.error('Gamepad олдсонгүй — холбоод, нэг товч дараарай'); return }
    const gamepadDevice = deviceRouter.all.find((d) => d.id === 'gamepad')
    if (!gamepadDevice) { toast.error('Gamepad хөдөлгүүр бүртгэгдээгүй байна'); return }
    gamepadDevice.pulse(1, 320)
    toast.success('Gamepad чичирлээ 🎮')
  }

  /* Web Bluetooth-ийн browser dialog хэрэглэгчийн шууд дохио (click) дотор дуудагдах
     ёстой тул энд шинээр BleVestDevice үүсгээд DeviceRouter-т register хийнэ —
     амжилтгүй бол (хэрэглэгч цуцалсан/тохирох төхөөрөмж олдоогүй) register хийхгүй. */
  async function connectBLE() {
    if (typeof navigator === 'undefined' || !navigator.bluetooth) {
      toast.error('Web Bluetooth дэмжигдэхгүй — Chrome/Edge (desktop/Android) ашиглана уу')
      return
    }
    const vest = new BleVestDevice()
    const ok = await vest.connect()
    if (!ok) { toast.error('Холбогдож чадсангүй эсвэл тохирох төхөөрөмж олдсонгүй'); return }
    deviceRouter.register(vest)
    setBleConnected(true)
    toast.success('Хантааз холбогдлоо: ' + vest.label)
  }

  async function connectQr() {
    await deviceSync.createSession()
  }

  function setZone(band: string, zone: string) {
    onUpdatePrefs({ deviceMap: { ...map, [band]: zone } })
  }
  function testZone(band: string) {
    /* Одоо холбогдсон бүх HapticDevice руу зэрэг илгээнэ (утас + BLE хантааз гэх
       мэт) — "давтамж → биеийн байрлал оноолт БОДИТООР ажиллана" DoD. BLE хантааз
       (олон моторт) бол тухайн 3-бүсийг төлөөлөх 8-бүсийн индексрүү чиглүүлнэ. */
    deviceRouter.pulse(1, 260)
    const zoneIndex = BAND_TO_8ZONE[band] ?? 0
    deviceRouter.setBand(zoneIndex, 1)
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
      status: bleConnected ? 'Холбогдсон' : (typeof navigator !== 'undefined' && navigator.bluetooth) ? 'Холбоход бэлэн' : 'Браузер дэмжихгүй',
      ok: bleConnected, action: connectBLE, actionLabel: bleConnected ? 'Холбогдсон' : 'Холбох', disabled: bleConnected },
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

      {hasHapticScore && (
        <div className="mt-8 mb-2">
          <SectionTitle
            title="8-бүсийн Haptic Score (preview)"
            description="Одоо тоглож буй дуунд worker (librosa) бэлдсэн 8 давтамжийн бүсийн энерги — тус бүр өөрийн өнгө/өндөртэй, real-time шинэчлэгдэнэ."
          />
          <HapticBandPreview bandLevelsRef={bandLevelsRef} />
        </div>
      )}

      <div className="mt-8 mb-2">
        <SectionTitle
          title="Микрофон (амьд) горим"
          description="Гадаад дуу чимээг (жишээ: тайзны спикер) микрофоноор авч, 8-бүсийн энергийг холбогдсон бүх төхөөрөмж рүү шууд дамжуулна. Апп доторх дуу тоглуулах шаардлагагүй."
          actions={
            <ActionButton variant={mic.active ? "danger" : "primary"} size="sm" onClick={toggleMic}>
              {mic.active ? "Унтраах" : "Асаах"}
            </ActionButton>
          }
        />
        {mic.error && <p className="text-danger text-note mt-2">{mic.error}</p>}
        {mic.active && <HapticBandPreview bandLevelsRef={mic.bandLevelsRef} />}
      </div>

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
          <p className="text-dim text-body leading-[1.5]">
            {canVibrate
              ? 'Компьютер дээр жинхэнэ чичиргээ гарахгүй — зөвхөн гэрлийн пульс. Бүрэн туршихын тулд Android утас эсвэл gamepad холбоно уу.'
              : 'Энэ төхөөрөмж (iOS/Safari гэх мэт) чичиргээ дэмждэггүй тул дэлгэцийн гэрлийн пульсийг ЗОРИУДААР илт тод болгосон — цорын ганц мэдрэх суваг тул. Бүрэн мэдрэхийн тулд QR-аар Android утас, эсвэл BLE хантааз холбоно уу.'}
          </p>
        </div>
      </div>
    </>
  )
}

/* 8 давтамжийн бүсийг (Haptic Score) багана болгож амьд харуулна — DoD-ийн "8 бүс
   тус тусдаа мэдрэгдэж байгааг гараар баталгаажуулах" шаардлагад зориулсан visual
   preview. `useHapticEngine`-ийн ижил хэв маягийг дагана: React re-render хийхгүй,
   RAF loop-оос ref-ээр DOM style-ыг шууд бичнэ (гүйцэтгэл). */
function HapticBandPreview({ bandLevelsRef }: { bandLevelsRef: MutableRefObject<number[]> }) {
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let raf: number;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const bands = bandLevelsRef.current;
      barsRef.current.forEach((el, i) => {
        if (!el) return;
        const level = bands[i] ?? 0;
        el.style.height = Math.max(4, level * 100) + "%";
        el.style.opacity = String(0.35 + level * 0.65);
      });
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [bandLevelsRef]);

  return (
    <div className="flex items-end gap-1.5 h-[120px] bg-white/[.03] border border-white/[.08] rounded-xl p-4 mt-3" aria-hidden="true">
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="flex-1 h-full flex items-end">
          <div
            ref={(el) => {
              barsRef.current[i] = el;
            }}
            className="w-full rounded-t-sm transition-[height,opacity] duration-100 ease-linear"
            style={{ height: "4%", backgroundColor: bandToColor(i, 8) }}
          />
        </div>
      ))}
    </div>
  );
}
