"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { useClosingTransition } from "@/lib/ui/useClosingTransition";
import type { SessionUser } from "@/types/auth";

function PassInput({ name, autoComplete, invalid }: { name: string; autoComplete: string; invalid?: boolean }) {
  const [show, setShow] = useState(false);
  return (
    <span className="pass-wrap">
      <input name={name} type={show ? "text" : "password"} placeholder="••••••••" autoComplete={autoComplete} aria-invalid={invalid || undefined} />
      <button
        type="button"
        className="pass-eye"
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
      className={"auth-ov" + (closing ? " closing" : "")}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="auth-box" role="dialog" aria-modal="true" aria-label="Нэвтрэх / Бүртгүүлэх">
        <button className="auth-x" onClick={handleClose} aria-label="Хаах">
          ✕
        </button>

        <span className="mono">МЭДРЭХ® / Хандалт</span>

        <div className="auth-tabs">
          <button
            className={mode === "login" ? "on" : ""}
            onClick={() => {
              setMode("login");
              setErr("");
              setOk("");
            }}
          >
            Нэвтрэх
          </button>
          <button
            className={mode === "register" ? "on" : ""}
            onClick={() => {
              setMode("register");
              setErr("");
              setOk("");
            }}
          >
            Бүртгүүлэх
          </button>
        </div>

        <form onSubmit={submit} key={mode}>
          {mode === "register" && (
            <label>
              <span className="mono">Нэр</span>
              <input name="name" type="text" placeholder="Таны нэр" autoComplete="name" aria-invalid={err.includes("нэрээ") || undefined} />
            </label>
          )}
          <label>
            <span className="mono">Имэйл</span>
            <input
              name="email"
              type="email"
              placeholder="you@mail.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={err.includes("Имэйл") || undefined}
            />
          </label>
          <label>
            <span className="mono">Нууц үг</span>
            <PassInput name="pass" autoComplete={mode === "login" ? "current-password" : "new-password"} invalid={err.includes("Нууц үг") && !err.includes("давтах")} />
          </label>
          {mode === "register" && (
            <label>
              <span className="mono">Нууц үг давтах</span>
              <PassInput name="pass2" autoComplete="new-password" invalid={err.includes("таарахгүй")} />
            </label>
          )}

          {err && <p className="auth-err">{err}</p>}
          {ok && <p className="auth-ok">{ok}</p>}

          <button type="submit" className="bt bt-a auth-sub" disabled={busy}>
            {mode === "login" ? "Нэвтрэх →" : "Бүртгүүлэх →"}
          </button>
        </form>

        <p className="auth-note mono">Session нь серверт JWT-ээр баталгаажина</p>
      </div>
    </div>
  );
}
