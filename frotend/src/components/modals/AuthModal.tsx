"use client";

/* Нэвтрэх / Бүртгүүлэх modal — премиум auth card (AdminPanel.tsx-ийн эцэг wrapper-тэй ижил
   дизайн хэл) руу шинэчлэв. .auth-x/.auth-tabs/.auth-err/.auth-ok/.auth-sub/.auth-note
   legacy CSS-ийг Tailwind болгож, input/label-ийг эцэг wrapper-ийн descendant selector-оос
   үл хамааран өөрөө бүрэн загварчилсан, .bt bt-a-г ActionButton болгов. login()/register()/
   submit() validation логик, useClosingTransition, ESC handler бүхэлдээ хэвээр — зөвхөн
   визуал давхарга шинэчлэгдсэн. */
import { useEffect, useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { useClosingTransition } from "@/lib/ui/useClosingTransition";
import { ActionButton } from "@/components/ui/ActionGroup";
import type { SessionUser } from "@/types/auth";

const labelCls = "flex flex-col gap-1.5";
const captionCls = "mono !text-[9px]";
const inputCls =
  "bg-white/[.04] border border-white/[.08] text-ink font-body text-[14.5px] p-[12px_14px] rounded-lg transition-[border-color,background,box-shadow] duration-250 focus:border-aqua focus:bg-aqua/[.05] focus-visible:outline-none focus-visible:shadow-glow-aqua placeholder:text-faint aria-[invalid=true]:border-[#E88A9B] aria-[invalid=true]:bg-[rgba(232,138,155,.06)] aria-[invalid=true]:[animation:auth-shake_.3s] aria-[invalid=true]:focus-visible:shadow-[0_0_0_3px_rgba(232,138,155,.3)]";

function PassInput({ name, autoComplete, invalid }: { name: string; autoComplete: string; invalid?: boolean }) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative flex">
      <input
        className={inputCls + " w-full pr-11"}
        name={name}
        type={show ? "text" : "password"}
        placeholder="••••••••"
        autoComplete={autoComplete}
        aria-invalid={invalid || undefined}
      />
      <button
        type="button"
        className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 text-faint flex items-center transition-colors duration-250 hover:text-aqua focus-visible:outline-none focus-visible:shadow-glow-aqua rounded-md"
        onClick={() => setShow(!show)}
        aria-label={show ? "Нууц үг нуух" : "Нууц үг харах"}
        title={show ? "Нуух" : "Харах"}
      >
        {show ? (
          /* нээлттэй нүд */
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z" />
            <circle cx="12" cy="12" r="2.6" />
          </svg>
        ) : (
          /* дарсан нүд */
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z" />
            <circle cx="12" cy="12" r="2.6" />
            <line x1="4" y1="20" x2="20" y2="4" />
          </svg>
        )}
      </button>
    </span>
  );
}

export default function AuthModal({
  open,
  onClose,
  onAuth,
}: {
  open: boolean;
  onClose: () => void;
  onAuth: (u: SessionUser) => void;
}) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState(""); // таб солиход арилахгүйн тулд controlled
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");
  const [busy, setBusy] = useState(false);
  const { closing, handleClose } = useClosingTransition(onClose);

  useEffect(() => {
    if (!open) return;
    setMode("login"); // нээгдэх бүрд "Нэвтрэх" табаас эхэлнэ
    setEmail("");
    setErr("");
    setOk("");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, onClose]);

  if (!open) return null;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    setOk("");
    const f = new FormData(e.currentTarget);
    const mail = email.trim().toLowerCase();
    const pass = (f.get("pass") as string) || "";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
      setErr("Имэйл хаяг буруу байна");
      return;
    }
    if (pass.length < 6) {
      setErr("Нууц үг дор хаяж 6 тэмдэгт байх ёстой");
      return;
    }

    setBusy(true);
    try {
      if (mode === "register") {
        const name = ((f.get("name") as string) || "").trim();
        const pass2 = (f.get("pass2") as string) || "";
        if (name.length < 2) {
          setErr("Нэрээ оруулна уу");
          setBusy(false);
          return;
        }
        if (pass !== pass2) {
          setErr("Нууц үг таарахгүй байна");
          setBusy(false);
          return;
        }

        const u = await register(name, mail, pass, pass2);
        setOk("Тавтай морил, " + u.name + "!");
        onAuth(u);
        setTimeout(onClose, 700);
      } else {
        const u = await login(mail, pass);
        setOk("Тавтай морил, " + u.name + "!");
        onAuth(u);
        setTimeout(onClose, 700);
      }
    } catch (e2) {
      setErr((e2 as Error).message || "Алдаа гарлаа");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className={
        "fixed inset-0 z-[10000] bg-[rgba(4,7,7,.72)] backdrop-blur-lg flex items-center justify-center p-6 " +
        (closing ? "[animation:aov-out_.2s_ease_forwards]" : "[animation:aov_.3s_ease]")
      }
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className="relative w-full max-w-[400px] bg-[rgba(9,14,14,.97)] border border-white/[.1] rounded-2xl p-[30px_30px_24px] shadow-lg [animation:abx_.4s_cubic-bezier(.16,.8,.24,1)]"
        role="dialog"
        aria-modal="true"
        aria-label="Нэвтрэх / Бүртгүүлэх"
      >
        <button
          className="absolute top-3.5 right-3.5 text-dim text-sm p-1.5 rounded-full transition-colors duration-250 hover:text-ink hover:bg-white/[.06] focus-visible:outline-none focus-visible:shadow-glow-aqua"
          onClick={handleClose}
          aria-label="Хаах"
        >
          ✕
        </button>

        <span className="mono block mb-4">МЭДРЭХ® / Хандалт</span>

        <div className="grid grid-cols-2 border border-white/[.08] rounded-xl overflow-hidden mb-5" role="tablist" aria-label="Нэвтрэх/Бүртгүүлэх сонгох">
          <button
            role="tab"
            aria-selected={mode === "login"}
            className={
              "font-display text-[12px] tracking-[-.02em] py-3 px-2 transition-colors duration-200 focus-visible:outline-none focus-visible:shadow-glow-aqua " +
              (mode === "login" ? "bg-aqua text-[#04100E] font-semibold" : "text-dim hover:bg-white/[.05] hover:text-ink")
            }
            onClick={() => {
              setMode("login");
              setErr("");
              setOk("");
            }}
          >
            Нэвтрэх
          </button>
          <button
            role="tab"
            aria-selected={mode === "register"}
            className={
              "font-display text-[12px] tracking-[-.02em] py-3 px-2 transition-colors duration-200 focus-visible:outline-none focus-visible:shadow-glow-aqua " +
              (mode === "register" ? "bg-aqua text-[#04100E] font-semibold" : "text-dim hover:bg-white/[.05] hover:text-ink")
            }
            onClick={() => {
              setMode("register");
              setErr("");
              setOk("");
            }}
          >
            Бүртгүүлэх
          </button>
        </div>

        <form className="flex flex-col gap-4" onSubmit={submit} key={mode}>
          {mode === "register" && (
            <label className={labelCls}>
              <span className={captionCls}>Нэр</span>
              <input className={inputCls} name="name" type="text" placeholder="Таны нэр" autoComplete="name" aria-invalid={err.includes("нэрээ") || undefined} />
            </label>
          )}
          <label className={labelCls}>
            <span className={captionCls}>Имэйл</span>
            <input
              className={inputCls}
              name="email"
              type="email"
              placeholder="you@mail.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={err.includes("Имэйл") || undefined}
            />
          </label>
          <label className={labelCls}>
            <span className={captionCls}>Нууц үг</span>
            <PassInput name="pass" autoComplete={mode === "login" ? "current-password" : "new-password"} invalid={err.includes("Нууц үг") && !err.includes("давтах")} />
          </label>
          {mode === "register" && (
            <label className={labelCls}>
              <span className={captionCls}>Нууц үг давтах</span>
              <PassInput name="pass2" autoComplete="new-password" invalid={err.includes("таарахгүй")} />
            </label>
          )}

          {err && (
            <p className="text-[13px] text-[#E88A9B]" role="alert">
              {err}
            </p>
          )}
          {ok && (
            <p className="text-[13px] text-aqua" role="status">
              {ok}
            </p>
          )}

          <ActionButton type="submit" variant="primary" disabled={busy}>
            {mode === "login" ? "Нэвтрэх →" : "Бүртгүүлэх →"}
          </ActionButton>
        </form>

        <p className="mono !text-[9px] mt-5 pt-4 border-t border-white/[.07]">Session нь серверт JWT-ээр баталгаажина</p>
      </div>
    </div>
  );
}
