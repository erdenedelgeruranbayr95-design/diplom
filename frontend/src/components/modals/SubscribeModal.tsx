"use client";

/* SocialPay-маягийн ДЕМО захиалгын урсгал (Монгол-first UX). Өмнөх Stripe-маягийн карт
   формыг QR-pairing дуурайлга болгож солив — БОДИТ төлбөрийн систем/банктай холбогдоогүй,
   зөвхөн UI/UX. Захиалгыг идэвхжүүлэх бизнес логик (loadUsers/saveUsers/pushPayment/
   onSubscribed) бүхэлдээ өмнөхтэй ИЖИЛ хэвээр — зөвхөн "картын дугаар оруулах" алхмыг
   "QR хүлээх таймер" алхмаар сольсон. Нэмэлтээр QR нээгдэх мөчид admin-ий "PRO Management"
   таб-д харагдах ДЕМО pending-хүсэлт бичдэг (pushPaymentRequest, admin-payment-requests.ts) —
   энэ нь зөвхөн admin-side харуулалт, өмнөх автомат-success урсгалтай ЗЭРЭГЦЭЭ ажиллана,
   аль нэгийг нь өөрчлөхгүй. Backend/API/auth огт хөндөгдөөгүй. */
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { loadUsers, saveUsers } from "@/lib/auth/auth-storage";
import { pushPayment } from "@/lib/data/library";
import { pushPaymentRequest } from "@/lib/data/admin-payment-requests";
import { useFocusTrap } from "@/lib/ui/useFocusTrap";
import { ActionButton } from "@/components/ui/ActionGroup";
import { subscribeMe } from "@/lib/api/client";
import type { SessionUser, UserSub } from "@/types/auth";
import Icon from "@/components/ui/Icon";

const PLAN = { name: "МЭДРЭХ PRO", price: "9'900₮", period: "сар бүр" };
const QR_TTL_SEC = 300; // 05:00
/* Демо орчинд "SocialPay апп-аас баталгаажлаа" гэдгийг дуурайх — жинхэнэ банкны
   webhook/API-тай холбогдоогүй, зөвхөн UI-ийн харуулах хугацаа. */
const DEMO_CONFIRM_DELAY_MS = 3200;

type PayState = "waiting" | "success";

function fmtCountdown(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function SubscribeModal({
  open,
  onClose,
  user,
  onSubscribed,
}: {
  open: boolean;
  onClose: () => void;
  user: SessionUser | null;
  onSubscribed: (sub: UserSub) => void;
}) {
  const [payState, setPayState] = useState<PayState>("waiting");
  const [secondsLeft, setSecondsLeft] = useState(QR_TTL_SEC);
  const [qrNonce, setQrNonce] = useState(0);
  const [closing, setClosing] = useState(false);
  const confirmTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trapRef = useFocusTrap(open && !closing);

  const expired = payState === "waiting" && secondsLeft <= 0;

  function handleClose() {
    if (closing) return;
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 200);
  }

  useEffect(() => {
    if (!open) return;
    setPayState("waiting");
    setSecondsLeft(QR_TTL_SEC);
    setQrNonce((n) => n + 1);
    setClosing(false);
    /* Admin "PRO Management" таб-д харагдах ДЕМО "хүлээгдэж буй хүсэлт" бичлэг —
       subscription-ийн жинхэнэ логикт (доор) хамааралгүй, зэрэгцээ admin-side demo. */
    if (user) {
      pushPaymentRequest({
        userEmail: user.email,
        userName: user.name,
        plan: PLAN.name,
        amount: PLAN.price,
        method: "SocialPay",
        note: "SocialPay QR-ээр илгээсэн хүсэлт (демо)",
      });
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  /* QR countdown — 05:00-аас 0 хүртэл секунд тутам буурна. */
  useEffect(() => {
    if (!open || payState !== "waiting" || secondsLeft <= 0) return;
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [open, payState, secondsLeft]);

  /* ДЕМО: QR "уншуулсны" дараах баталгаажилтыг хуурамчаар дуурайна (жинхэнэ SocialPay
     callback/webhook үгүй тул) — гэхдээ идэвхжүүлэлт өөрөө backend руу бодитоор бичигдэнэ
     (PATCH /users/me/subscription, users.controller.ts) тул refresh/дахин нэвтрэх/өөр
     tab дээр ч PRO эрх хадгалагдана. localStorage legacy давхарга (loadUsers/saveUsers)
     хуучин ProfileView/BillingView-той нийцтэй байлгахын тулд зэрэгцээ хэвээр үлдээв. */
  useEffect(() => {
    if (!open || payState !== "waiting" || expired || !user) return;
    confirmTimerRef.current = setTimeout(async () => {
      let sub: UserSub | null;
      try {
        sub = await subscribeMe(PLAN.name);
      } catch {
        return; // сүлжээний алдаа — QR хугацаа дуусах хүртэл дахин оролдоно (таймер дараагийн tick-д)
      }
      if (!sub) return;
      const now = new Date();
      const users = loadUsers();
      const u = users.find((x) => x.email === user.email);
      if (u) {
        u.sub = { active: sub.active, plan: sub.plan || "", since: now.getTime(), renews: sub.renews ? new Date(sub.renews).getTime() : now.getTime() };
        saveUsers(users);
      }
      pushPayment(user.email, {
        id: "inv-" + Date.now(),
        date: now.getTime(),
        amount: PLAN.price,
        plan: PLAN.name,
        method: "SocialPay",
        status: "Амжилттай",
      });
      setPayState("success");
      onSubscribed(sub);
    }, DEMO_CONFIRM_DELAY_MS);
    return () => {
      if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, payState, expired, user, qrNonce]);

  /* Амжилттай төлбөрийн дараа автоматаар хаана — захиалгын state (onSubscribed)
     аль хэдийн эх Player/BillingView-д шинэчлэгдсэн байна. */
  useEffect(() => {
    if (payState !== "success") return;
    const t = setTimeout(handleClose, 1800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payState]);

  function newQr() {
    setSecondsLeft(QR_TTL_SEC);
    setQrNonce((n) => n + 1);
  }

  if (!open || !user) return null;
  const qrValue = `medreh://demo-socialpay/pro?u=${encodeURIComponent(user.email)}&n=${qrNonce}`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-[rgba(4,7,7,.72)] backdrop-blur-lg flex items-center justify-center p-4 max-nav:items-end max-nav:p-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: closing ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <motion.div
            ref={trapRef}
            className="relative w-full max-w-[560px] max-viz:max-w-[90%] max-nav:max-w-full bg-[rgba(9,14,14,.97)] border border-white/[.1] rounded-t-[24px] max-nav:rounded-b-none rounded-b-[24px] p-[30px_30px_26px] max-nav:p-[26px_22px_30px] shadow-[0_24px_70px_rgba(0,0,0,.55)]"
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
              <b id="subscribe-modal-title" className="font-display text-[19px] block mb-1">
                PRO эрх авах
              </b>
              <span className="mono !text-purple">SocialPay Demo</span>
            </div>

            {payState === "success" ? (
              <div className="text-center py-6" aria-live="polite">
                <motion.span
                  className="inline-flex w-16 h-16 rounded-full items-center justify-center bg-aqua/[.15] text-aqua text-[32px] mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16 }}
                  aria-hidden="true"
                >
                  <Icon name="check" size={32} strokeWidth={2.2} />
                </motion.span>
                <b className="font-display text-[18px] text-aqua block mb-1.5">Төлбөр амжилттай</b>
                <p className="text-dim text-[13px]">МЭДРЭХ PRO идэвхжлээ — жагсаалт удахгүй шинэчлэгдэнэ.</p>
              </div>
            ) : (
              <>
                <div className="flex justify-center mb-5">
                  <div className="relative rounded-[24px] p-6 bg-white/[.04] border border-white/[.1] backdrop-blur-xl shadow-[0_0_40px_rgba(56,232,206,.12)]">
                    <div className="relative bg-white p-4 rounded-2xl shadow-lg overflow-hidden">
                      <QRCodeSVG value={qrValue} size={196} />
                      {!expired && (
                        <motion.span
                          className="absolute left-0 right-0 h-[3px] bg-[linear-gradient(90deg,transparent,rgba(56,232,206,.9),transparent)]"
                          initial={{ top: "6%" }}
                          animate={{ top: ["6%", "94%", "6%"] }}
                          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                          aria-hidden="true"
                        />
                      )}
                      {expired && (
                        <div className="absolute inset-0 bg-[rgba(9,14,14,.92)] backdrop-blur-sm flex flex-col items-center justify-center gap-3 rounded-2xl">
                          <span className="text-dim text-[12.5px]">Хугацаа дууссан</span>
                          <ActionButton variant="secondary" size="sm" onClick={newQr}>
                            Шинэ QR
                          </ActionButton>
                        </div>
                      )}
                    </div>
                    <div className="text-center mt-3.5 font-mono text-[13px] text-dim tabular-nums" aria-live="polite">
                      {expired ? "00:00" : fmtCountdown(secondsLeft)}
                    </div>
                  </div>
                </div>

                <ol className="flex flex-col gap-2 mb-5 text-[13px] text-ink">
                  {["SocialPay апп нээнэ", "QR уншуулна", "Төлбөр баталгаажуулна", "PRO автоматаар идэвхжинэ"].map((step, i) => (
                    <li key={step} className="flex items-center gap-2.5">
                      <span className="w-5 h-5 flex-none rounded-full flex items-center justify-center bg-white/[.06] text-[10px] font-mono text-dim">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>

                <div className="flex items-center justify-center gap-2 text-[12.5px] text-dim mb-1" aria-live="polite" role="status">
                  {!expired && (
                    <motion.i
                      className="w-[7px] h-[7px] rounded-full bg-[#E8C86A] flex-none"
                      animate={{ opacity: [1, 0.35, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                      aria-hidden="true"
                    />
                  )}
                  {expired ? "QR хугацаа дууссан" : "Төлбөр хүлээгдэж байна…"}
                </div>
              </>
            )}

            <p className="mono !text-[9px] mt-5 pt-4 border-t border-white/[.07] text-center">
              Демо горим — жинхэнэ мөнгө шилжихгүй, банк/SocialPay-тэй холбогдоогүй.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
