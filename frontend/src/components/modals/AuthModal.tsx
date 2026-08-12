"use client";

/* Нэвтрэх / Бүртгүүлэх modal — премиум auth card (AdminPanel.tsx-ийн эцэг wrapper-тэй ижил
   дизайн хэл) руу шинэчлэв. .auth-x/.auth-tabs/.auth-err/.auth-ok/.auth-sub/.auth-note
   legacy CSS-ийг Tailwind болгож, input/label-ийг эцэг wrapper-ийн descendant selector-оос
   үл хамааран өөрөө бүрэн загварчилсан, .bt bt-a-г ActionButton болгов. login()/register()/
   submit() validation логик, useClosingTransition, ESC handler бүхэлдээ хэвээр — зөвхөн
   визуал давхарга шинэчлэгдсэн. */
import { useEffect, useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { useModalShell } from "@/hooks/useModalShell";
import { ActionButton } from "@/components/ui/ActionGroup";
import { FIELD_LABEL_CLS, FIELD_CAPTION_CLS, VALIDATED_INPUT_CLS } from "@/components/ui/form-styles";
import type { SessionUser } from "@/types/auth";
import type { RegisterRole } from "@/lib/api/client";
import Icon from "@/components/ui/Icon";
import GoogleSignInButton from "./GoogleSignInButton";

const labelCls = FIELD_LABEL_CLS;
const captionCls = FIELD_CAPTION_CLS;
const inputCls = VALIDATED_INPUT_CLS;

function PassInput({ name, autoComplete, invalid }: { name: string; autoComplete: string; invalid?: boolean }) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative flex">
      {/* `has-reveal` — доорх өөрийн нүд товчтой давхардах хөтчийн натив харах товчийг
          нуух CSS дэгээ (polish.css). */}
      <input
        className={inputCls + " has-reveal w-full pr-11"}
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
  const { login, register, loginWithGoogle } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  /* Бүртгэлийн дүр. Уран бүтээлч сонгосон үед нэмэлт талбар гарч, бүртгэл нь
     админы баталгаажуулалт хүлээнэ. */
  const [regRole, setRegRole] = useState<RegisterRole>("USER");
  const [email, setEmail] = useState(""); // таб солиход арилахгүйн тулд controlled
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");
  const [busy, setBusy] = useState(false);
  /* Гарах animation · Escape · focus trap · backdrop-click — дөрвүүлээ нэг hook-т
     (WCAG 2.4.3: нээгдэхэд эхний оролт руу фокус шилжиж, Tab нь модалаас гарахгүй). */
  const { closing, handleClose, trapRef, backdropProps } = useModalShell({ open, onClose });

  useEffect(() => {
    if (!open) return;
    setMode("login"); // нээгдэх бүрд "Нэвтрэх" табаас эхэлнэ
    setEmail("");
    setErr("");
    setOk("");
  }, [open]);

  if (!open) return null;

  /* Таб солиход имэйлийг ЦЭВЭРЛЭНЭ. Урьд нь `email` state зөвхөн модал нээгдэхэд
     цэвэрлэгддэг байсан тул: Chrome "Нэвтрэх" табыг login форм гэж танин хадгалсан
     имэйлээ autofill хийж (polish.css нь autofill-ийн шар дэвсгэрийг бараан болгодог
     учир НҮДЭЭР ЯЛГАРАХГҮЙ), Бүртгүүлэх рүү шилжихэд өөр хүний имэйл дагаж үлддэг байв.
     Нууц үгнүүд `key={mode}` remount-аар аль хэдийн цэвэрлэгддэг тул имэйлийг ч
     цэвэрлэх нь тууштай зан төлөв. */
  function switchMode(next: "login" | "register") {
    setMode(next);
    setEmail("");
    setErr("");
    setOk("");
  }

  async function handleGoogleCredential(idToken: string) {
    setErr("");
    setOk("");
    setBusy(true);
    try {
      const u = await loginWithGoogle(idToken);
      setOk("Тавтай морил, " + u.name + "!");
      onAuth(u);
      setTimeout(onClose, 700);
    } catch (e2) {
      setErr((e2 as Error).message || "Google нэвтрэлт амжилтгүй боллоо");
    } finally {
      setBusy(false);
    }
  }

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

        /* Уран бүтээлчээр бүртгүүлэхэд профайлын нэр ЗААВАЛ — backend тэрийг
           шаарддаг (Artist.name нь unique тул хоосон байж болохгүй). */
        const artistName = ((f.get("artistName") as string) || "").trim();
        if (regRole === "ARTIST" && artistName.length < 2) {
          setErr("Уран бүтээлчийн нэрээ оруулна уу");
          setBusy(false);
          return;
        }

        const u = await register(name, mail, pass, pass2, regRole, artistName || undefined);
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
      {...backdropProps}
    >
      <div
        ref={trapRef}
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
          <Icon name="close" size={15} />
        </button>

        <span className="mono block mb-4">МЭДРЭХ® / Хандалт</span>

        <div className="grid grid-cols-2 border border-white/[.08] rounded-xl overflow-hidden mb-5" role="tablist" aria-label="Нэвтрэх/Бүртгүүлэх сонгох">
          <button
            role="tab"
            aria-selected={mode === "login"}
            className={
              "font-display text-note tracking-[-.02em] py-3 px-2 transition-colors duration-200 focus-visible:outline-none focus-visible:shadow-glow-aqua " +
              (mode === "login" ? "bg-aqua text-on-aqua font-semibold" : "text-dim hover:bg-white/[.05] hover:text-ink")
            }
            onClick={() => switchMode("login")}
          >
            Нэвтрэх
          </button>
          <button
            role="tab"
            aria-selected={mode === "register"}
            className={
              "font-display text-note tracking-[-.02em] py-3 px-2 transition-colors duration-200 focus-visible:outline-none focus-visible:shadow-glow-aqua " +
              (mode === "register" ? "bg-aqua text-on-aqua font-semibold" : "text-dim hover:bg-white/[.05] hover:text-ink")
            }
            onClick={() => switchMode("register")}
          >
            Бүртгүүлэх
          </button>
        </div>

        <GoogleSignInButton onCredential={handleGoogleCredential} />

        <div className="flex items-center gap-3 my-4 text-faint text-caption">
          <span className="h-px flex-1 bg-white/[.08]" aria-hidden="true" />
          эсвэл
          <span className="h-px flex-1 bg-white/[.08]" aria-hidden="true" />
        </div>

        <form className="flex flex-col gap-4" onSubmit={submit} key={mode}>
          {mode === "register" && (
            <>
              {/* Дүрийн сонголт. Хоёр л сонголт байна — админ, куратор зэргийг
                  ЭНД санал болгож БОЛОХГҮЙ (backend ч татгалздаг). */}
              <div>
                <span className={captionCls}>Та хэн бэ?</span>
                <div
                  className="grid grid-cols-2 gap-2 mt-1.5"
                  role="radiogroup"
                  aria-label="Бүртгэлийн төрөл"
                >
                  {(
                    [
                      { v: "USER" as const, label: "Сонсогч", hint: "Хөгжим сонсох" },
                      { v: "ARTIST" as const, label: "Уран бүтээлч", hint: "Дуугаа нийтлэх" },
                    ]
                  ).map((o) => (
                    <button
                      key={o.v}
                      type="button"
                      role="radio"
                      aria-checked={regRole === o.v}
                      onClick={() => setRegRole(o.v)}
                      className={
                        "rounded-xl border px-3 py-2.5 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:shadow-glow-aqua " +
                        (regRole === o.v
                          ? "border-aqua bg-aqua/[.08]"
                          : "border-white/[.1] hover:bg-white/[.04]")
                      }
                    >
                      <b className={"block text-body " + (regRole === o.v ? "text-aqua" : "text-ink")}>
                        {o.label}
                      </b>
                      <i className="not-italic text-dim text-note">{o.hint}</i>
                    </button>
                  ))}
                </div>
              </div>

              <label className={labelCls}>
                <span className={captionCls}>Нэр</span>
                <input className={inputCls} name="name" type="text" placeholder="Таны нэр" autoComplete="name" aria-invalid={err.includes("нэрээ") || undefined} />
              </label>

              {regRole === "ARTIST" && (
                <label className={labelCls}>
                  <span className={captionCls}>Уран бүтээлчийн нэр</span>
                  <input
                    className={inputCls}
                    name="artistName"
                    type="text"
                    placeholder="Тайзны нэр"
                    aria-invalid={err.includes("Уран бүтээлчийн") || undefined}
                  />
                  {/* Хүлээлтийг УРЬДЧИЛАН хэлнэ — эс бөгөөс хэрэглэгч бүртгүүлээд
                      дуу нэмэх гэж оролдоод «яагаад болохгүй байна» гэж эргэлзэнэ. */}
                  <i className="not-italic text-faint text-note mt-1 block leading-4">
                    Бүртгэл админы баталгаажуулалт хүлээнэ. Баталгаажсаны дараа дуу, цомгоо
                    чөлөөтэй нэмнэ.
                  </i>
                </label>
              )}
            </>
          )}
          <label className={labelCls}>
            <span className={captionCls}>Имэйл</span>
            {/* Бүртгүүлэх үед браузер/нууц үгийн менежерийн autofill-ийг унтраана —
                хадгалсан ӨӨР бүртгэлийн имэйл шинэ бүртгэлийн формд орж ирэх нь
                утгагүй (тэр имэйл аль хэдийн бүртгэлтэй тул алдаа л өгнө). Нэвтрэх
                үед харин autofill ХЭРЭГТЭЙ тул хэвээр үлдээв.
                `name`-ийг ч сольсон нь Chrome-ийн эвристик таних (autocomplete="off"-ыг
                үл тоох) тохиолдлыг бас хаана — submit() имэйлийг `email` state-ээс
                уншдаг тул FormData-ийн түлхүүр өөрчлөгдөх нь аюулгүй. */}
            <input
              className={inputCls}
              name={mode === "login" ? "email" : "reg-email"}
              type="email"
              placeholder="you@mail.com"
              autoComplete={mode === "login" ? "email" : "off"}
              data-lpignore={mode === "register" ? "true" : undefined}
              data-1p-ignore={mode === "register" ? "" : undefined}
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
            <p className="text-body text-danger" role="alert">
              {err}
            </p>
          )}
          {ok && (
            <p className="text-body text-aqua" role="status">
              {ok}
            </p>
          )}

          <ActionButton type="submit" variant="primary" disabled={busy}>
            {mode === "login" ? "Нэвтрэх" : "Бүртгүүлэх"}
            <Icon name="arrowRight" size={15} />
          </ActionButton>
        </form>

        <p className="mono !text-micro mt-5 pt-4 border-t border-white/[.07]">Session нь серверт JWT-ээр баталгаажина</p>
      </div>
    </div>
  );
}
