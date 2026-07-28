"use client";

/* Stripe загварын сарын захиалга — ДЕМО горим (AuthModal.tsx-тэй ижил дизайн хэл).
   Туршилтын карт: 4242 4242 4242 4242, ирээдүйн дуусах хугацаа, дурын CVC.
   Жинхэнэ Stripe холбохдоо энд Stripe.js + backend endpoint залгана.
   .auth-x/.auth-err/.auth-sub/.auth-note legacy CSS-ийг Tailwind болгож, .bt bt-a-г
   ActionButton болгов. submit() validation/pushPayment() логик бүхэлдээ хэвээр. */
import { useEffect, useState } from "react";
import { loadUsers, saveUsers } from "@/lib/auth/auth-storage";
import { pushPayment } from "@/lib/data/library";
import { useClosingTransition } from "@/lib/ui/useClosingTransition";
import { ActionButton } from "@/components/ui/ActionGroup";
import type { SessionUser, UserSub } from "@/types/auth";

const PLAN = { name: "МЭДРЭХ PRO", price: "9'900₮", period: "сар бүр" };
const TEST_CARD = "4242424242424242";

const labelCls = "flex flex-col gap-1.5";
const captionCls = "mono !text-[9px]";
const inputCls =
  "bg-white/[.04] border border-white/[.08] text-ink font-body text-[14.5px] p-[12px_14px] rounded-lg transition-[border-color,background,box-shadow] duration-250 focus:border-aqua focus:bg-aqua/[.05] focus-visible:outline-none focus-visible:shadow-glow-aqua placeholder:text-faint";

function digits(s: string | null) {
  return (s || "").replace(/\D/g, "");
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
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);
  const { closing, handleClose } = useClosingTransition(onClose);

  useEffect(() => {
    if (!open) return;
    setErr("");
    setDone(false);
    setBusy(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !busy) handleClose();
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, onClose, busy]);

  if (!open || !user) return null;
  const currentUser = user;

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    const f = new FormData(e.currentTarget);
    const num = digits(f.get("card") as string);
    const exp = ((f.get("exp") as string) || "").trim();
    const cvc = digits(f.get("cvc") as string);

    if (num.length !== 16) {
      setErr("Картын дугаар 16 оронтой байх ёстой");
      return;
    }
    const m = exp.match(/^(0[1-9]|1[0-2])\s*\/\s*(\d{2})$/);
    if (!m) {
      setErr("Дуусах хугацаа MM/YY хэлбэрээр (ж: 08/27)");
      return;
    }
    const expDate = new Date(2000 + +m[2], +m[1], 1);
    if (expDate <= new Date()) {
      setErr("Картын хугацаа дууссан байна");
      return;
    }
    if (cvc.length < 3) {
      setErr("CVC 3 оронтой байх ёстой");
      return;
    }
    if (num !== TEST_CARD) {
      setErr("Карт татгалзлаа. Демо горим: 4242 4242 4242 4242 ашиглана уу");
      return;
    }

    /* демо "боловсруулалт" */
    setBusy(true);
    setTimeout(() => {
      const now = new Date();
      const renews = new Date(now);
      renews.setMonth(renews.getMonth() + 1);
      const sub: UserSub = { active: true, plan: PLAN.name, since: now.toISOString(), renews: renews.toISOString() };
      const users = loadUsers();
      const u = users.find((x) => x.email === currentUser.email);
      if (u) {
        u.sub = { active: sub.active, plan: sub.plan || "", since: now.getTime(), renews: renews.getTime() };
        saveUsers(users);
      }
      /* төлбөрийн түүхэнд бичнэ (billing хуудсанд харагдана) */
      pushPayment(currentUser.email, {
        id: "inv-" + Date.now(),
        date: now.getTime(),
        amount: PLAN.price,
        plan: PLAN.name,
        method: "Карт •••• 4242",
        status: "Амжилттай",
      });
      setBusy(false);
      setDone(true);
      onSubscribed(sub);
      setTimeout(onClose, 1400);
    }, 1600);
  }

  return (
    <div
      className={
        "fixed inset-0 z-[10000] bg-[rgba(4,7,7,.72)] backdrop-blur-lg flex items-center justify-center p-6 " +
        (closing ? "[animation:aov-out_.2s_ease_forwards]" : "[animation:aov_.3s_ease]")
      }
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !busy) handleClose();
      }}
    >
      <div
        className="relative w-full max-w-[430px] bg-[rgba(9,14,14,.97)] border border-white/[.1] rounded-2xl p-[30px_30px_24px] shadow-lg [animation:abx_.4s_cubic-bezier(.16,.8,.24,1)]"
        role="dialog"
        aria-modal="true"
        aria-label="Сарын захиалга"
      >
        <button
          className="absolute top-3.5 right-3.5 text-dim text-sm p-1.5 rounded-full transition-colors duration-250 hover:text-ink hover:bg-white/[.06] focus-visible:outline-none focus-visible:shadow-glow-aqua"
          onClick={handleClose}
          aria-label="Хаах"
        >
          ✕
        </button>

        <span className="mono block mb-4">МЭДРЭХ® / Захиалга</span>

        <div className="flex justify-between gap-4 border border-aqua/30 bg-aqua/[.04] rounded-xl p-[16px_18px] mb-5">
          <div>
            <b className="font-display text-[15px] block">{PLAN.name}</b>
            <span className="block text-dim text-xs mt-1.5 max-w-[26ch]">Бүх дууг бүрэн сонсох · чичиргээ + гэрлийн горим · шинэ дуу нэмэгдэх бүрд</span>
          </div>
          <div className="text-right flex-none">
            <b className="text-[21px]">{PLAN.price}</b>
            <span className="mono">{PLAN.period}</span>
          </div>
        </div>

        {done ? (
          <div className="text-center p-[26px_0_14px]">
            <b className="font-display text-[19px] text-aqua block mb-2.5">✓ Захиалга идэвхжлээ!</b>
            <p className="text-dim text-[13.5px]">Дараагийн төлбөр: {new Date(Date.now() + 2592000000).toLocaleDateString("mn-MN")}</p>
          </div>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={submit}>
            <label className={labelCls}>
              <span className={captionCls}>Картын дугаар</span>
              <input className={inputCls} name="card" inputMode="numeric" placeholder="4242 4242 4242 4242" autoComplete="cc-number" />
            </label>
            <div className="grid grid-cols-2 gap-3.5">
              <label className={labelCls}>
                <span className={captionCls}>Дуусах хугацаа</span>
                <input className={inputCls} name="exp" inputMode="numeric" placeholder="MM/YY" autoComplete="cc-exp" />
              </label>
              <label className={labelCls}>
                <span className={captionCls}>CVC</span>
                <input className={inputCls} name="cvc" inputMode="numeric" placeholder="123" autoComplete="cc-csc" />
              </label>
            </div>

            {err && (
              <p className="text-[13px] text-[#E88A9B]" role="alert">
                {err}
              </p>
            )}

            <ActionButton type="submit" variant="primary" disabled={busy}>
              {busy ? "Боловсруулж байна…" : PLAN.price + " төлж захиалах"}
            </ActionButton>
          </form>
        )}

        <p className="mono !text-[9px] mt-5 pt-4 border-t border-white/[.07]">Демо горим (Stripe test) — жинхэнэ мөнгө шилжихгүй · туршилтын карт 4242 4242 4242 4242</p>
      </div>
    </div>
  );
}
