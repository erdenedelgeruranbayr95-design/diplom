"use client";

/* Spotify Connect маягийн floating pairing card — Now Playing панелийн дээгүүр
   glassmorphism карт болгон харагдана. Зөвхөн frontend дүрслэл; session/socket
   логик бүхэлдээ useDeviceSync-т хэвээр (deviceSync.qrState/qrToken/disconnect
   аль хэдийн байгаа, backend/WS event шинээр нэмээгүй). */
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import type { useDeviceSync } from "@/lib/socket/useDeviceSync";
import { ActionButton } from "@/components/ui/ActionGroup";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import Icon from "@/components/ui/Icon";

export default function PairingCard({
  open,
  onClose,
  deviceSync,
}: {
  open: boolean;
  onClose: () => void;
  deviceSync: ReturnType<typeof useDeviceSync>;
}) {
  const trapRef = useFocusTrap(open);

  /* Холбогдсоны дараа 3 секундын дараа картыг автоматаар хаана — "🟢 Phone
     Connected" индикатор Now Playing/Header дотор хэвээр үлдэнэ. */
  useEffect(() => {
    if (!open || deviceSync.qrState !== "connected") return;
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [open, deviceSync.qrState, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[20] flex items-end justify-center bg-black/40 backdrop-blur-sm p-4 max-nav:items-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            className="w-full max-w-[380px] mb-[110px] max-nav:mb-[96px] rounded-panel p-7 bg-[rgba(14,20,19,.72)] backdrop-blur-2xl border border-white/[.12] shadow-[0_24px_70px_rgba(0,0,0,.55)]"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            ref={trapRef}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Утас холбох"
          >
            {deviceSync.qrState !== "connected" ? (
              <>
                <div className="flex items-center justify-between mb-5">
                  <b className="font-display font-semibold text-title text-ink flex items-center gap-2">
                    <span className="text-aqua flex" aria-hidden="true"><Icon name="device" size={16} /></span>
                    Утас холбох
                  </b>
                  <button
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-dim hover:text-ink hover:bg-white/[.06] transition-colors duration-150 focus-visible:outline-none focus-visible:shadow-glow-aqua"
                    onClick={onClose}
                    aria-label="Хаах"
                  >
                    <Icon name="close" size={14} />
                  </button>
                </div>

                <p className="text-dim text-body leading-[1.5] mb-5">MEDREH Mobile-оор доорх QR кодыг уншуулна уу</p>

                <div className="flex justify-center mb-5">
                  <motion.span
                    className="bg-white p-4 rounded-2xl inline-flex shadow-lg border border-white/[.08]"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 22 }}
                  >
                    {deviceSync.qrToken ? (
                      <QRCodeSVG value={`${window.location.origin}/mobile/${deviceSync.qrToken}`} size={188} />
                    ) : (
                      <span className="w-[188px] h-[188px] flex items-center justify-center text-dim text-xs">Уншиж байна…</span>
                    )}
                  </motion.span>
                </div>

                <div className="flex items-center justify-center gap-2 text-dim text-note mb-5">
                  <motion.i
                    className="w-[7px] h-[7px] rounded-full bg-aqua flex-none"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                    aria-hidden="true"
                  />
                  Утас хүлээж байна…
                </div>

                <div className="border-t border-white/[.08] pt-4 flex flex-col gap-1.5 mb-5">
                  <span className="text-note text-dim flex items-center gap-2">
                    <span className="text-aqua flex flex-none" aria-hidden="true"><Icon name="check" size={12} strokeWidth={2.4} /></span>
                    Хөгжимтэй синхроноор чичирнэ
                  </span>
                  <span className="text-note text-dim flex items-center gap-2">
                    <span className="text-aqua flex flex-none" aria-hidden="true"><Icon name="check" size={12} strokeWidth={2.4} /></span>
                    Нэмэлт тохиргоо шаардахгүй
                  </span>
                </div>

                <ActionButton variant="secondary" className="w-full" onClick={onClose}>
                  Цуцлах
                </ActionButton>
              </>
            ) : (
              <div className="flex flex-col items-center text-center py-2">
                <motion.span
                  className="w-16 h-16 rounded-full flex items-center justify-center bg-aqua/[.15] text-aqua text-[32px] mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16 }}
                  aria-hidden="true"
                >
                  <Icon name="check" size={32} strokeWidth={2.2} />
                </motion.span>
                <b className="font-display font-semibold text-title text-ink mb-1">Холбогдлоо</b>
                <p className="text-dim text-body mb-1">Гар утас</p>
                <p className="text-aqua text-note mb-6 flex items-center gap-1.5">
                  <Icon name="check" size={13} strokeWidth={2.4} />
                  Амжилттай холбогдлоо
                </p>

                <div className="flex items-center gap-2.5 w-full">
                  <ActionButton
                    variant="danger"
                    className="flex-1"
                    onClick={() => {
                      deviceSync.disconnect();
                      onClose();
                    }}
                  >
                    Салгах
                  </ActionButton>
                  <ActionButton variant="primary" className="flex-1" onClick={onClose}>
                    Нуух
                  </ActionButton>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
