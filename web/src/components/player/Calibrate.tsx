"use client";

import { useEffect, useRef, useState } from "react";
import { ActionButton } from "@/components/ui/ActionGroup";

/* Мэдрэхүйн калибровк — хэрэглэгчийн мэдрэх босгыг 4 алхамтай тестээр тодорхойлж,
   чичиргээний хүч / гэрлийн эрчим / давтамжийн бүсийн тохиргоог автоматаар өгнө. */

interface BandSample {
  key: string;
  label: string;
  hz: string;
  freq: number;
  type: OscillatorType;
  dur: number;
  vib: number[];
}

const BAND_SAMPLES: BandSample[] = [
  { key: "bass", label: "Бас", hz: "55 Hz", freq: 55, type: "sine", dur: 0.7, vib: [220] },
  { key: "mid", label: "Дунд", hz: "330 Hz", freq: 330, type: "triangle", dur: 0.45, vib: [60, 40, 60] },
  { key: "high", label: "Өндөр", hz: "1.8 kHz", freq: 1800, type: "square", dur: 0.3, vib: [15, 20, 15, 20, 15] },
];

interface CalibrateResult {
  vib: number;
  light: number;
  bands: Record<string, boolean>;
  calibrated: boolean;
}

export default function Calibrate({
  open,
  onClose,
  onDone,
}: {
  open: boolean;
  onClose: () => void;
  onDone: (result: CalibrateResult) => void;
}) {
  const [step, setStep] = useState(0);
  const [vibChoice, setVibChoice] = useState(1);
  const [lightChoice, setLightChoice] = useState(1);
  const [bandsSel, setBandsSel] = useState<Record<string, boolean>>({ bass: true, mid: true, high: true });
  const [tried, setTried] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);

  const canVibrate = typeof navigator !== "undefined" && !!navigator.vibrate;

  useEffect(() => {
    if (open) {
      setStep(0);
      setTried(false);
    }
    if (!open && ctxRef.current) {
      ctxRef.current.close().catch(() => {});
      ctxRef.current = null;
    }
  }, [open]);

  if (!open) return null;

  function tone(freq: number, dur: number, type: OscillatorType) {
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    const ctx = ctxRef.current;
    if (ctx.state === "suspended") ctx.resume();
    const o = ctx.createOscillator(),
      g = ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + dur + 0.05);
  }
  function buzz(p: number[]) {
    if (canVibrate) {
      try {
        navigator.vibrate(p);
      } catch {
        /* noop */
      }
    }
  }

  function tryVib() {
    setTried(true);
    buzz([300]);
    tone(55, 0.8, "sine");
  }
  function trySample(s: BandSample) {
    tone(s.freq, s.dur, s.type);
    buzz(s.vib);
  }
  function toggleBand(k: string) {
    setBandsSel((prev) => {
      const next = { ...prev, [k]: !prev[k] };
      if (!next.bass && !next.mid && !next.high) return prev; // дор хаяж 1 бүс
      return next;
    });
  }
  function finish() {
    onDone({ vib: vibChoice, light: lightChoice, bands: bandsSel, calibrated: true });
    onClose();
  }

  const VIB_ANS = [
    { label: "Тод мэдэрсэн", hint: "Сул горим тохирно", val: 0 },
    { label: "Бага зэрэг", hint: "Дунд горим тохирно", val: 1 },
    { label: "Мэдрээгүй", hint: "Хүчтэй горим тохирно", val: 2 },
  ];
  const LIGHT_ANS = [
    { label: "Хэт тод байна", hint: "Бүдэг горим", val: 0 },
    { label: "Яг таарсан", hint: "Дунд горим", val: 1 },
    { label: "Бүдэг харагдсан", hint: "Тод горим", val: 2 },
  ];
  const stepTitles = ["", "Чичиргээ", "Гэрэл", "Давтамж", "Дүгнэлт"];

  return (
    <div
      className="fixed inset-0 z-[9700] bg-[rgba(4,7,7,.92)] backdrop-blur-2xl flex items-center justify-center p-[22px] [animation:aov_.35s_ease]"
      role="dialog"
      aria-modal="true"
      aria-label="Мэдрэхүйн калибровк"
    >
      <div className="w-full max-w-[520px] bg-[#0C1313] border border-white/[.12] rounded-2xl p-[34px_34px_30px] [animation:abx_.4s_cubic-bezier(.16,.8,.24,1)]">
        {step > 0 && (
          <div className="flex gap-[7px] mb-[26px]" aria-hidden="true">
            {[1, 2, 3, 4].map((s) => (
              <i key={s} className={"flex-1 h-[3px] rounded-[10px] transition-colors duration-[400ms] " + (step >= s ? "bg-aqua" : "bg-white/[.12]")}></i>
            ))}
          </div>
        )}

        {step === 0 && (
          <div className="flex flex-col gap-4">
            <span className="text-[44px] leading-none" aria-hidden="true">
              🎛
            </span>
            <h2 className="text-[clamp(20px,2.6vw,27px)] font-extrabold tracking-[-.035em]">Мэдрэхүйн калибровк</h2>
            <p className="text-dim text-sm leading-[1.6]">
              Сонсголын мэдрэмж хүн бүрд өөр. Богино тестээр таны <b className="text-ink">мэдрэх босгыг</b> тодорхойлж, чичиргээ болон
              гэрлийн тохиргоог танд яг тааруулж өгье. Ердөө 1 минут зарцуулна.
            </p>
            <div className="flex gap-3 flex-wrap mt-1.5">
              <ActionButton variant="primary" onClick={() => setStep(1)}>
                Эхлэх →
              </ActionButton>
              <ActionButton variant="secondary" onClick={onClose}>
                Дараа хийе
              </ActionButton>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-4">
            <span className="mono">1 / 4 · {stepTitles[1]}</span>
            <h2 className="text-[clamp(20px,2.6vw,27px)] font-extrabold tracking-[-.035em]">Чичиргээг мэдэрч үзье</h2>
            {canVibrate ? (
              <p className="text-dim text-sm leading-[1.6]">Утсаа гартаа барьж байгаад доорх товчийг дараарай — 0.3 секундын чичиргээ өгнө.</p>
            ) : (
              <p className="text-dim text-sm leading-[1.6]">Энэ төхөөрөмж чичиргээгүй тул дууны туршилт хийнэ. Утсан дээр дахин калибровк хийхэд чичиргээ нэмэгдэнэ.</p>
            )}
            <button
              className={
                "p-4 border rounded-xl text-aqua text-[15px] transition-[background,border-style] duration-250 hover:bg-[rgba(56,232,206,.06)] " +
                (tried ? "border-solid border-[rgba(56,232,206,.4)]" : "border-dashed border-[rgba(56,232,206,.4)]")
              }
              onClick={tryVib}
            >
              📳 {tried ? "Дахин туршиж үзэх" : "Туршиж үзэх"}
            </button>
            <div className="grid grid-cols-3 max-[560px]:grid-cols-1 gap-[9px]">
              {VIB_ANS.map((a) => (
                <button
                  key={a.val}
                  className={
                    "flex flex-col gap-1 py-[13px] px-2.5 border rounded-[11px] text-center items-center transition-[border-color,background] duration-250 disabled:opacity-40 enabled:hover:border-[rgba(56,232,206,.5)] enabled:hover:bg-[rgba(56,232,206,.05)] " +
                    (vibChoice === a.val && tried ? "border-aqua bg-[rgba(56,232,206,.08)]" : "border-line")
                  }
                  disabled={!tried}
                  onClick={() => {
                    setVibChoice(a.val);
                    setStep(2);
                  }}
                >
                  <b className="text-[13.5px] font-semibold text-ink">{a.label}</b>
                  <span className="text-[10.5px] text-faint">{a.hint}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <span className="mono">2 / 4 · {stepTitles[2]}</span>
            <h2 className="text-[clamp(20px,2.6vw,27px)] font-extrabold tracking-[-.035em]">Гэрлийн пульс хэр харагдаж байна?</h2>
            <div className="flex justify-center py-[18px]" aria-hidden="true">
              <span className="w-[110px] h-[110px] rounded-full bg-[radial-gradient(circle,rgba(56,232,206,.6),rgba(56,232,206,.06)_70%)] [animation:calp_1.1s_ease-in-out_infinite]"></span>
            </div>
            <div className="grid grid-cols-3 max-[560px]:grid-cols-1 gap-[9px]">
              {LIGHT_ANS.map((a) => (
                <button
                  key={a.val}
                  className="flex flex-col gap-1 py-[13px] px-2.5 border border-line rounded-[11px] text-center items-center transition-[border-color,background] duration-250 hover:border-[rgba(56,232,206,.5)] hover:bg-[rgba(56,232,206,.05)]"
                  onClick={() => {
                    setLightChoice(a.val);
                    setStep(3);
                  }}
                >
                  <b className="text-[13.5px] font-semibold text-ink">{a.label}</b>
                  <span className="text-[10.5px] text-faint">{a.hint}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-4">
            <span className="mono">3 / 4 · {stepTitles[3]}</span>
            <h2 className="text-[clamp(20px,2.6vw,27px)] font-extrabold tracking-[-.035em]">Аль давтамжийг мэдэрдэг вэ?</h2>
            <p className="text-dim text-sm leading-[1.6]">Тус бүрийг туршаад, мэдэрсэн бүсүүдээ идэвхтэй үлдээгээрэй. Идэвхгүй бүс чичиргээ өгөхгүй.</p>
            <div className="flex flex-col gap-[9px]">
              {BAND_SAMPLES.map((s) => (
                <div
                  key={s.key}
                  className={
                    "flex items-center gap-3.5 border rounded-xl py-[11px] px-3.5 transition-[border-color,background] duration-250 " +
                    (bandsSel[s.key] ? "border-[rgba(56,232,206,.45)] bg-[rgba(56,232,206,.05)]" : "border-line")
                  }
                >
                  <button
                    className="w-10 h-10 flex-none rounded-full bg-aqua text-[#04100E] text-sm flex items-center justify-center hover:bg-[#6FF3DE]"
                    onClick={() => trySample(s)}
                    aria-label={s.label + " туршиж үзэх"}
                  >
                    ▶
                  </button>
                  <div className="flex-1">
                    <b className="block text-[14.5px] font-semibold">{s.label}</b>
                    <span className="mono !text-[9px]">{s.hz}</span>
                  </div>
                  <button
                    className={
                      "text-[12.5px] py-2 px-3.5 border rounded-full transition-colors duration-250 " +
                      (bandsSel[s.key] ? "text-aqua border-[rgba(56,232,206,.5)]" : "text-dim border-line")
                    }
                    onClick={() => toggleBand(s.key)}
                    aria-pressed={bandsSel[s.key]}
                  >
                    {bandsSel[s.key] ? "✓ Мэдэрсэн" : "Мэдрээгүй"}
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-3 flex-wrap mt-1.5">
              <ActionButton variant="primary" onClick={() => setStep(4)}>
                Үргэлжлүүлэх →
              </ActionButton>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col gap-4">
            <span className="mono">4 / 4 · {stepTitles[4]}</span>
            <span className="text-[44px] leading-none" aria-hidden="true">
              ✓
            </span>
            <h2 className="text-[clamp(20px,2.6vw,27px)] font-extrabold tracking-[-.035em]">Таны мэдрэхүйн профайл</h2>
            <div className="grid grid-cols-3 max-[560px]:grid-cols-1 gap-2.5">
              <div className="border border-[rgba(56,232,206,.3)] bg-[rgba(56,232,206,.05)] rounded-[11px] p-[13px] flex flex-col gap-[5px]">
                <span className="mono">Чичиргээ</span>
                <b className="text-sm text-aqua">{["Сул", "Дунд", "Хүчтэй"][vibChoice]}</b>
              </div>
              <div className="border border-[rgba(56,232,206,.3)] bg-[rgba(56,232,206,.05)] rounded-[11px] p-[13px] flex flex-col gap-[5px]">
                <span className="mono">Гэрэл</span>
                <b className="text-sm text-aqua">{["Бүдэг", "Дунд", "Тод"][lightChoice]}</b>
              </div>
              <div className="border border-[rgba(56,232,206,.3)] bg-[rgba(56,232,206,.05)] rounded-[11px] p-[13px] flex flex-col gap-[5px]">
                <span className="mono">Бүс</span>
                <b className="text-sm text-aqua">{[bandsSel.bass && "Бас", bandsSel.mid && "Дунд", bandsSel.high && "Өндөр"].filter(Boolean).join(" · ")}</b>
              </div>
            </div>
            <p className="text-faint text-xs">Тохиргоог хүссэн үедээ ⚙️ цэснээс өөрчилж, дахин калибровк хийж болно.</p>
            <div className="flex gap-3 flex-wrap mt-1.5">
              <ActionButton variant="primary" onClick={finish}>
                Хадгалаад эхлэх →
              </ActionButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
