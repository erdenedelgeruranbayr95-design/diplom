"use client";

import { useEffect, useState } from "react";
import { loadUsers, saveUsers } from "@/lib/auth/auth-storage";
import { pushPayment } from "@/lib/data/library";
import { useClosingTransition } from "@/lib/ui/useClosingTransition";
import type { SessionUser, UserSub } from "@/types/auth";

/* Stripe загварын сарын захиалга — ДЕМО горим.
   Туршилтын карт: 4242 4242 4242 4242, ирээдүйн дуусах хугацаа, дурын CVC.
   Жинхэнэ Stripe холбохдоо энд Stripe.js + backend endpoint залгана. */

const PLAN = { name: "МЭДРЭХ PRO", price: "9'900₮", period: "сар бүр" };
const TEST_CARD = "4242424242424242";

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
        className={
          "relative w-full max-w-[430px] bg-[rgba(9,14,14,.96)] border border-white/[.13] p-[30px_30px_24px] [animation:abx_.4s_cubic-bezier(.16,.8,.24,1)] " +
          "[&_form]:flex [&_form]:flex-col [&_form]:gap-4 [&_label]:flex [&_label]:flex-col [&_label]:gap-[7px] " +
          "[&_input]:bg-white/[.04] [&_input]:border [&_input]:border-line [&_input]:text-ink [&_input]:font-body [&_input]:text-[14.5px] [&_input]:p-[12px_14px] [&_input]:cursor-none [&_input]:rounded-sm [&_input]:transition-[border-color,background,box-shadow] [&_input]:duration-300 " +
          "[&_input:focus]:border-aqua [&_input:focus]:bg-[rgba(56,232,206,.05)] [&_input:focus-visible]:shadow-glow-aqua [&_input::placeholder]:text-faint"
        }
        role="dialog"
        aria-modal="true"
        aria-label="Сарын захиалга"
      >
        <button className="auth-x" onClick={handleClose} aria-label="Хаах">
          ✕
        </button>

        <span className="mono">МЭДРЭХ® / Захиалга</span>

        <div className="flex justify-between gap-4 border border-[rgba(56,232,206,.3)] bg-[rgba(56,232,206,.04)] p-[16px_18px] my-5 mb-[22px]">
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
          <form onSubmit={submit}>
            <label>
              <span className="mono">Картын дугаар</span>
              <input name="card" inputMode="numeric" placeholder="4242 4242 4242 4242" autoComplete="cc-number" />
            </label>
            <div className="grid grid-cols-2 gap-3.5">
              <label>
                <span className="mono">Дуусах хугацаа</span>
                <input name="exp" inputMode="numeric" placeholder="MM/YY" autoComplete="cc-exp" />
              </label>
              <label>
                <span className="mono">CVC</span>
                <input name="cvc" inputMode="numeric" placeholder="123" autoComplete="cc-csc" />
              </label>
            </div>

            {err && <p className="auth-err">{err}</p>}

            <button type="submit" className="bt bt-a auth-sub" disabled={busy}>
              {busy ? "Боловсруулж байна…" : PLAN.price + " төлж захиалах"}
            </button>
          </form>
        )}

        <p className="auth-note mono">Демо горим (Stripe test) — жинхэнэ мөнгө шилжихгүй · туршилтын карт 4242 4242 4242 4242</p>
      </div>
    </div>
  );
}
