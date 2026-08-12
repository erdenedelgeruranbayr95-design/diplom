"use client";

/* Stripe Checkout руу шилжүүлэх захиалгын модал.

   ӨМНӨХ ХУВИЛБАР нь SocialPay QR-ийн ДЕМО дуурайлга байсан: 3.2 секунд хүлээгээд
   `subscribeMe()` дуудаж PRO эрхийг ТӨЛБӨРГҮЙ олгодог байв. Тэр нь танилцуулгад
   тохирох ч бодит систем биш — хэн ч DevTools-оор тэр endpoint-ыг дуудаад PRO
   болж чадна. Одоо бодит Stripe Checkout руу шилжинэ.

   ⚠️ ЭНЭ МОДАЛ PRO ЭРХИЙГ ОЛГОДОГГҮЙ. Түүнийг зөвхөн Stripe-ийн webhook
   (`invoice.paid`, HMAC гарын үсэгтэй) олгоно. Модалын үүрэг нь ердөө:
     1. багцаа харуулах
     2. `POST /payments/checkout` дуудаж Stripe-ийн `url` авах
     3. хөтчийг тийш нь шилжүүлэх
   Буцаж ирэхэд `page.tsx` нь `?status=success`-ыг барьж, session-ыг СЕРВЕРЭЭС
   дахин уншина (см. `refreshSession`).

   Картын дугаар энэ код руу ОГТ ОРЖ ИРЭХГҮЙ — Stripe-ийн хуудсанд л бөглөгдөнө.
   Энэ нь PCI хамрах хүрээг эрс багасгадаг гол шалтгаан. */
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useModalShell } from "@/hooks/useModalShell";
import { ActionButton } from "@/components/ui/ActionGroup";
import { fetchPaymentsConfig, startCheckout } from "@/lib/api/client";
import type { SessionUser } from "@/types/auth";
import Icon from "@/components/ui/Icon";

const PLAN = { name: "МЭДРЭХ PRO", price: "9'900₮", period: "сар бүр" };

const PERKS = [
  "Бүх дуунд бүрэн Haptic Score",
  "8 бүсийн нарийвчилсан чичиргээ",
  "Хязгааргүй тоглуулалт, офлайн жагсаалт",
  "Хэзээ ч цуцалж болно",
];

export default function SubscribeModal({
  open,
  onClose,
  user,
}: {
  open: boolean;
  onClose: () => void;
  user: SessionUser | null;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  /* `null` = хараахан мэдэгдэхгүй. Товчийг идэвхгүй болгохын өмнө хариу хүлээнэ —
     эс бөгөөс тохируулагдсан орчинд ч товч түр "боломжгүй" мэт харагдана. */
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const { closing, handleClose, trapRef, backdropProps } = useModalShell({ open, onClose, durationMs: 200 });

  useEffect(() => {
    if (!open) return;
    setError("");
    setBusy(false);
    fetchPaymentsConfig()
      .then((cfg) => setEnabled(cfg.enabled))
      /* ⚠️ Хүсэлт өөрөө УНАСАН (сүлжээ тасарсан, backend унтарсан, session хугацаа
         дууссан) тохиолдлыг "төлбөр тохируулагдаагүй" гэж ХЭЛЖ БОЛОХГҮЙ — тэр нь
         тохируулга хийчихсэн админыг сервер рүү дэмий хөөж, жинхэнэ шалтгааныг
         (сүлжээ/сесс) нуудаг. Товчийг нээлттэй үлдээж, бодит алдааг «Картаар
         төлөх» дарахад Stripe/backend-ээс ирсэн мессежээр харуулна. */
      .catch(() => {
        setEnabled(null);
        setError("Төлбөрийн тохиргоог уншиж чадсангүй. Сүлжээгээ шалгаад дахин оролдоно уу.");
      });
  }, [open]);

  const pay = useCallback(async () => {
    setError("");
    setBusy(true);
    try {
      /* Буцах хаяг нь ЭНЭ хуудас. Backend нь `CORS_ORIGIN`-ий эсрэг шалгадаг тул
         зөвхөн өөрсдийн origin л нэвтэрнэ (open-redirect хамгаалалт). */
      const { url } = await startCheckout(window.location.origin);
      /* `assign` биш `replace`: буцах товч дарахад Checkout руу дахин орохгүй,
         шууд аппдаа буцна. */
      window.location.replace(url);
    } catch (err) {
      setBusy(false);
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Төлбөрийн хуудас нээгдсэнгүй. Сүлжээгээ шалгаад дахин оролдоно уу.",
      );
    }
  }, []);

  if (!open || !user) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-[rgba(4,7,7,.72)] backdrop-blur-lg flex items-center justify-center p-4 max-nav:items-end max-nav:p-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: closing ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          {...backdropProps}
        >
          <motion.div
            ref={trapRef}
            className="relative w-full max-w-[480px] max-nav:max-w-full bg-[rgba(9,14,14,.97)] border border-white/[.1] rounded-t-panel max-nav:rounded-b-none rounded-b-panel p-[30px_30px_26px] max-nav:p-[26px_22px_30px] shadow-[0_24px_70px_rgba(0,0,0,.55)]"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: closing ? 0 : 1, scale: closing ? 0.96 : 1, y: closing ? 12 : 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="subscribe-modal-title"
          >
            <button
              className="absolute top-3.5 right-3.5 text-dim text-sm p-1.5 rounded-full transition-colors duration-250 hover:text-ink hover:bg-white/[.06] focus-visible:outline-none focus-visible:shadow-glow-aqua"
              onClick={handleClose}
              aria-label="Хаах"
            >
              <Icon name="close" size={15} />
            </button>

            <div className="text-center mb-6">
              <b id="subscribe-modal-title" className="font-display text-heading block mb-1">
                PRO эрх авах
              </b>
              <span className="mono !text-purple">Stripe · картаар</span>
            </div>

            <div className="rounded-panel border border-white/[.1] bg-white/[.04] p-5 mb-5 text-center">
              <b className="font-display text-ink block text-[28px] leading-none tabular-nums">{PLAN.price}</b>
              <span className="text-dim text-note">{PLAN.period}</span>
            </div>

            <ul className="flex flex-col gap-2.5 mb-6 text-body text-ink">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 flex-none rounded-full flex items-center justify-center bg-aqua/[.15] text-aqua mt-px">
                    <Icon name="check" size={12} strokeWidth={2.4} />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>

            {enabled === false && (
              <p className="text-body text-danger mb-3" role="alert">
                Төлбөрийн систем одоогоор тохируулагдаагүй байна. Админтай холбогдоно уу.
              </p>
            )}
            {error && (
              <p className="text-body text-danger mb-3" role="alert">
                {error}
              </p>
            )}

            <ActionButton variant="primary" onClick={pay} disabled={busy || enabled === false} className="w-full">
              {busy ? "Шилжүүлж байна…" : "Картаар төлөх"}
            </ActionButton>

            <p className="mono !text-micro mt-5 pt-4 border-t border-white/[.07] text-center">
              Stripe-ийн аюулгүй хуудас руу шилжинэ. Картын мэдээлэл МЭДРЭХ-ийн сервер рүү очихгүй.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
