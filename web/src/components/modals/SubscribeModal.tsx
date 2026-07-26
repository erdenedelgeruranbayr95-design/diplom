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
      className={"auth-ov" + (closing ? " closing" : "")}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !busy) handleClose();
      }}
    >
      <div className="auth-box sub-box" role="dialog" aria-modal="true" aria-label="Сарын захиалга">
        <button className="auth-x" onClick={handleClose} aria-label="Хаах">
          ✕
        </button>

        <span className="mono">МЭДРЭХ® / Захиалга</span>

        <div className="sub-plan">
          <div>
            <b>{PLAN.name}</b>
            <span>Бүх дууг бүрэн сонсох · чичиргээ + гэрлийн горим · шинэ дуу нэмэгдэх бүрд</span>
          </div>
          <div className="sub-price">
            <b>{PLAN.price}</b>
            <span className="mono">{PLAN.period}</span>
          </div>
        </div>

        {done ? (
          <div className="sub-done">
            <b>✓ Захиалга идэвхжлээ!</b>
            <p>Дараагийн төлбөр: {new Date(Date.now() + 2592000000).toLocaleDateString("mn-MN")}</p>
          </div>
        ) : (
          <form onSubmit={submit}>
            <label>
              <span className="mono">Картын дугаар</span>
              <input name="card" inputMode="numeric" placeholder="4242 4242 4242 4242" autoComplete="cc-number" />
            </label>
            <div className="sub-row2">
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
