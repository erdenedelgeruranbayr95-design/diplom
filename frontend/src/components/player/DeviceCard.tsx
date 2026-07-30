"use client";

/* Холбогдсон утасны "companion panel" — premium glassmorphism карт. Зөвхөн frontend
   дүрслэл; session/socket логик useDeviceSync-т, latency нь useLatency (Engine.IO
   native ping/pong)-оор хэмжигдэнэ — ямар ч шинэ backend event ашиглаагүй.
   Battery API backend дээр байхгүй тул "—" харуулна, хуурамч утга зохиомжлохгүй. */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ActionButton } from "@/components/ui/ActionGroup";
import { useLatency, latencyQuality, type LatencyQuality } from "@/lib/socket/useLatency";
import type { useDeviceSync } from "@/lib/socket/useDeviceSync";
import Icon from "@/components/ui/Icon";

const QUALITY_LABEL: Record<Exclude<LatencyQuality, null>, string> = {
  excellent: "Маш сайн",
  good: "Сайн",
  poor: "Удаан",
};
const QUALITY_CLS: Record<Exclude<LatencyQuality, null>, string> = {
  excellent: "text-aqua bg-aqua/[.12] border-aqua/30",
  good: "text-[#E8C86A] bg-[#E8C86A]/[.12] border-[#E8C86A]/30",
  poor: "text-[#E88A9B] bg-[#E88A9B]/[.12] border-[#E88A9B]/30",
};

function formatElapsed(connectedAt: number | null, nowMs: number): string {
  if (!connectedAt) return "00:00";
  const s = Math.max(0, Math.floor((nowMs - connectedAt) / 1000));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

export default function DeviceCard({
  deviceSync,
  canVibrate,
  onTestVibration,
}: {
  deviceSync: ReturnType<typeof useDeviceSync>;
  canVibrate: boolean;
  onTestVibration: () => void;
}) {
  const latencyMs = useLatency(deviceSync.socket);
  const quality = latencyQuality(latencyMs);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (deviceSync.qrState !== "connected") return;
    const iv = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(iv);
  }, [deviceSync.qrState]);

  return (
    <AnimatePresence>
      {deviceSync.qrState === "connected" && (
        <motion.div
          className="w-full max-w-[340px] max-viz:max-w-none rounded-[24px] p-[1.5px] [background:linear-gradient(135deg,rgba(56,232,206,.55),rgba(56,232,206,.05)_45%,rgba(56,232,206,.4))]"
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          role="region"
          aria-label="Холбогдсон төхөөрөмжийн мэдээлэл"
        >
          <div className="rounded-[22.5px] p-5 bg-[rgba(13,19,18,.78)] backdrop-blur-2xl shadow-[0_18px_50px_rgba(0,0,0,.45)]">
            <div className="flex items-center justify-between mb-4">
              <b className="font-display font-semibold text-[14px] text-ink flex items-center gap-2"><span className="text-aqua flex" aria-hidden="true"><Icon name="device" size={15} /></span>Холбогдсон төхөөрөмж</b>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-aqua" aria-live="polite">
                <motion.i
                  className="w-[7px] h-[7px] rounded-full bg-aqua flex-none"
                  animate={{ opacity: [1, 0.35, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden="true"
                />
                Онлайн
              </span>
            </div>

            <div className="mb-4">
              <b className="block text-[15px] font-semibold text-ink">Гар утас</b>
              <span className="text-dim text-[12px] font-mono">Холбогдсон {formatElapsed(deviceSync.connectedAt, now)}</span>
            </div>

            <div className="border-t border-white/[.08] pt-4 flex flex-col gap-3.5 mb-4">
              <div className="flex items-center justify-between text-[12.5px]">
                <span className="text-dim">Батарей</span>
                <span className="text-faint font-mono" title="Backend батарейн мэдээлэл өгдөггүй">—</span>
              </div>

              <div className="flex items-center justify-between text-[12.5px]">
                <span className="text-dim">Холболт</span>
                {quality ? (
                  <span className={"inline-flex items-center rounded-full border px-2 py-0.5 text-[10.5px] font-semibold " + QUALITY_CLS[quality]}>
                    {QUALITY_LABEL[quality]}
                  </span>
                ) : (
                  <span className="text-faint font-mono">Хэмжиж байна…</span>
                )}
              </div>

              <div className="flex items-center justify-between text-[12.5px]">
                <span className="text-dim">Хоцролт</span>
                <motion.span
                  key={latencyMs ?? "pending"}
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className="text-ink font-mono tabular-nums"
                  aria-live="polite"
                >
                  {latencyMs != null ? `${latencyMs} ms` : "—"}
                </motion.span>
              </div>

              <div className="flex items-center justify-between text-[12.5px]">
                <span className="text-dim">Чичиргээ</span>
                <span className="text-aqua font-mono">Идэвхтэй</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 pt-1 border-t border-white/[.08]">
              <ActionButton variant="secondary" size="sm" className="flex-1" onClick={onTestVibration} disabled={!canVibrate}>
                Чичиргээ турших
              </ActionButton>
              <ActionButton variant="danger" size="sm" className="flex-1" onClick={deviceSync.disconnect}>
                Салгах
              </ActionButton>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
