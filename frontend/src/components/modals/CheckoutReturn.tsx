"use client";

/* Stripe Checkout-аас буцаж ирэхэд гарах мэдэгдэл.

   Stripe нь `success_url`/`cancel_url` руу `?status=success|cancel` нэмж буцаадаг
   (backend-ийн `stripe-subscriptions.service.ts` тэгж бүтээсэн).

   ⚠️ `?status=success` нь ТӨЛБӨР ХИЙГДСЭНИЙГ БАТЛАХГҮЙ. Тэр бол зүгээр л хөтчийн
   redirect — хэрэглэгч гараар бичээд ч ороод ирж чадна. Жинхэнэ эрхийг Stripe-ийн
   webhook олгодог тул энд бид зөвхөн СЕРВЭРЭЭС session-ыг дахин уншиж, сервер юу
   гэж хэлснийг л харуулна.

   ⚠️ Webhook нь redirect-ээс ХОЦРОХ боломжтой (Stripe хоёуланг зэрэг явуулдаг,
   дараалал баталгаагүй). Иймд нэг удаа уншаад "төлөгдөөгүй" гэж дүгнэхгүй —
   хэдэн секунд дахин оролдоно. Тэр хугацаанд "баталгаажуулж байна…" гэж ил
   хэлнэ, эс бөгөөс төлсөн хэрэглэгч "мөнгө алга болов" гэж сандарна. */
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/components/providers/AuthProvider";
import Icon from "@/components/ui/Icon";

/** Webhook хүлээх нийт хугацаа ба давтамж. */
const POLL_INTERVAL_MS = 1500;
const POLL_ATTEMPTS = 8; // ~12 секунд

type Phase = "idle" | "verifying" | "active" | "pending" | "canceled";

export default function CheckoutReturn() {
  const { refreshSession } = useAuth();
  const [phase, setPhase] = useState<Phase>("idle");
  /* React 18 dev-ийн давхар mount (StrictMode) дээр polling хоёр удаа
     эхлэхээс сэргийлнэ. */
  const startedRef = useRef(false);

  /** URL-аас төлбөрийн параметрүүдийг АРИЛГАНА — reload/түүхэнд үлдвэл дараагийн
   *  ачаалалт бүрд "төлбөр амжилттай" дахин гарч ирнэ. */
  const clearParams = useCallback(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete("status");
    url.searchParams.delete("session_id");
    window.history.replaceState({}, "", url.pathname + url.search + url.hash);
  }, []);

  useEffect(() => {
    if (startedRef.current) return;
    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");
    if (status !== "success" && status !== "cancel") return;

    startedRef.current = true;
    clearParams();

    if (status === "cancel") {
      setPhase("canceled");
      return;
    }

    setPhase("verifying");
    let cancelled = false;

    (async () => {
      for (let attempt = 0; attempt < POLL_ATTEMPTS; attempt++) {
        const user = await refreshSession();
        if (cancelled) return;
        if (user?.sub?.active) {
          setPhase("active");
          return;
        }
        await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
        if (cancelled) return;
      }
      /* Хугацаа дуусав. Төлбөр амжилтгүй БАЙХ АЛБАГҮЙ — webhook удаашралтай ч
         байж болно. Тиймээс "амжилтгүй" ГЭЖ ХЭЛЭХГҮЙ, юу болж байгааг үнэнээр
         хэлж, хэрэглэгчид дараагийн алхмыг зөвлөнө. */
      setPhase("pending");
    })();

    return () => {
      cancelled = true;
    };
  }, [refreshSession, clearParams]);

  /* Амжилттай мэдэгдлийг автоматаар хаана — цуцлагдсан/хүлээгдэж буйг нь
     хэрэглэгч өөрөө уншаад хаана. */
  useEffect(() => {
    if (phase !== "active") return;
    const t = setTimeout(() => setPhase("idle"), 5000);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "idle") return null;

  const content = {
    verifying: {
      icon: "device",
      tone: "text-dim",
      title: "Төлбөрийг баталгаажуулж байна…",
      body: "Stripe-аас баталгаа хүлээж байна. Энэ хуудсыг хаахгүй байна уу.",
    },
    active: {
      icon: "check",
      tone: "text-aqua",
      title: "МЭДРЭХ PRO идэвхжлээ",
      body: "Баярлалаа. Бүх дуунд бүрэн Haptic Score нээгдлээ.",
    },
    pending: {
      icon: "device",
      tone: "text-warm",
      title: "Баталгаажуулалт хүлээгдэж байна",
      body: "Төлбөр амжилттай бол хэдхэн минутын дотор PRO эрх автоматаар нээгдэнэ. Хуудсаа дахин ачаална уу.",
    },
    canceled: {
      icon: "close",
      tone: "text-dim",
      title: "Төлбөр цуцлагдлаа",
      body: "Мөнгө татагдаагүй. Хүсвэл дахин оролдож болно.",
    },
  }[phase];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed left-1/2 bottom-6 z-[10001] w-[calc(100%-32px)] max-w-[420px] -translate-x-1/2 rounded-panel border border-white/[.12] bg-[rgba(9,14,14,.97)] p-4 shadow-[0_18px_50px_rgba(0,0,0,.5)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        role="status"
        aria-live="polite"
      >
        <div className="flex items-start gap-3">
          <span className={`mt-0.5 flex-none ${content.tone}`}>
            <Icon name={content.icon} size={18} />
          </span>
          <div className="flex-1">
            <b className={`font-display text-note block mb-0.5 ${content.tone}`}>{content.title}</b>
            <p className="text-dim text-body leading-5">{content.body}</p>
          </div>
          <button
            className="flex-none text-dim p-1 rounded-full transition-colors duration-200 hover:text-ink hover:bg-white/[.06] focus-visible:outline-none focus-visible:shadow-glow-aqua"
            onClick={() => setPhase("idle")}
            aria-label="Хаах"
          >
            <Icon name="close" size={13} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
