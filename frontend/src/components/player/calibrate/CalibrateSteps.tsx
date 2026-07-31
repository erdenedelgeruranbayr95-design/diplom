"use client";

import { ActionButton } from "@/components/ui/ActionGroup";
import Icon from "@/components/ui/Icon";
import { BAND_SAMPLES, type CalibrationFlow } from "@/lib/player/hooks/useCalibrationFlow";

/* Калибровкийн 5 дэлгэц (танилцуулга + 4 алхам). Бүх төлөв нь `useCalibrationFlow`-д —
   эдгээр нь цэвэр харагдац. */

const HEADING = "text-[clamp(20px,2.6vw,27px)] font-extrabold tracking-[-.035em]";
const CHOICE_BASE =
  "flex flex-col gap-1 py-[13px] px-2.5 border rounded-chip text-center items-center transition-[border-color,background] duration-250";
const CHOICE_GRID = "grid grid-cols-3 max-[560px]:grid-cols-1 gap-[9px]";
const SUMMARY_TILE = "border border-[rgba(56,232,206,.3)] bg-[rgba(56,232,206,.05)] rounded-chip p-[13px] flex flex-col gap-[5px]";

const VIBRATION_ANSWERS = [
  { label: "Тод мэдэрсэн", hint: "Сул горим тохирно", value: 0 },
  { label: "Бага зэрэг", hint: "Дунд горим тохирно", value: 1 },
  { label: "Мэдрээгүй", hint: "Хүчтэй горим тохирно", value: 2 },
];
const LIGHT_ANSWERS = [
  { label: "Хэт тод байна", hint: "Бүдэг горим", value: 0 },
  { label: "Яг таарсан", hint: "Дунд горим", value: 1 },
  { label: "Бүдэг харагдсан", hint: "Тод горим", value: 2 },
];

export function CalibrateProgress({ step }: { step: number }) {
  if (step === 0) return null;
  return (
    <div className="flex gap-[7px] mb-[26px]" aria-hidden="true">
      {[1, 2, 3, 4].map((s) => (
        <i key={s} className={"flex-1 h-[3px] rounded-chip transition-colors duration-[400ms] " + (step >= s ? "bg-aqua" : "bg-white/[.12]")}></i>
      ))}
    </div>
  );
}

export function CalibrateIntro({ onStart, onSkip }: { onStart: () => void; onSkip: () => void }) {
  return (
    <div className="flex flex-col gap-4">
      <span
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-aqua bg-aqua/[.10] shadow-[inset_0_0_0_1px_rgba(56,232,206,.22)]"
        aria-hidden="true"
      >
        <Icon name="sliders" size={26} />
      </span>
      <h2 className={HEADING}>Мэдрэхүйн калибровк</h2>
      <p className="text-dim text-sm leading-[1.6]">
        Сонсголын мэдрэмж хүн бүрд өөр. Богино тестээр таны <b className="text-ink">мэдрэх босгыг</b> тодорхойлж, чичиргээ болон гэрлийн тохиргоог танд
        яг тааруулж өгье. Ердөө 1 минут зарцуулна.
      </p>
      <div className="flex gap-3 flex-wrap mt-1.5">
        <ActionButton variant="primary" onClick={onStart}>
          Эхлэх
          <Icon name="arrowRight" size={15} />
        </ActionButton>
        <ActionButton variant="secondary" onClick={onSkip}>
          Дараа хийе
        </ActionButton>
      </div>
    </div>
  );
}

export function CalibrateVibrationStep({ flow }: { flow: CalibrationFlow }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="mono">1 / 4 · Чичиргээ</span>
      <h2 className={HEADING}>Чичиргээг мэдэрч үзье</h2>
      {flow.canVibrate ? (
        <p className="text-dim text-sm leading-[1.6]">Утсаа гартаа барьж байгаад доорх товчийг дараарай — 0.3 секундын чичиргээ өгнө.</p>
      ) : (
        <p className="text-dim text-sm leading-[1.6]">
          Энэ төхөөрөмж чичиргээгүй тул дууны туршилт хийнэ. Утсан дээр дахин калибровк хийхэд чичиргээ нэмэгдэнэ.
        </p>
      )}
      <button
        className={
          "p-4 border rounded-xl text-aqua text-lead transition-[background,border-style] duration-250 hover:bg-[rgba(56,232,206,.06)] " +
          (flow.tried ? "border-solid border-[rgba(56,232,206,.4)]" : "border-dashed border-[rgba(56,232,206,.4)]")
        }
        onClick={flow.tryVibration}
      >
        <span className="inline-flex items-center justify-center gap-2">
          <Icon name="vibrate" size={16} />
          {flow.tried ? "Дахин туршиж үзэх" : "Туршиж үзэх"}
        </span>
      </button>
      <div className={CHOICE_GRID}>
        {VIBRATION_ANSWERS.map((answer) => (
          <button
            key={answer.value}
            className={
              CHOICE_BASE +
              " disabled:opacity-40 enabled:hover:border-[rgba(56,232,206,.5)] enabled:hover:bg-[rgba(56,232,206,.05)] " +
              (flow.vibrationChoice === answer.value && flow.tried ? "border-aqua bg-[rgba(56,232,206,.08)]" : "border-line")
            }
            disabled={!flow.tried}
            onClick={() => flow.chooseVibration(answer.value)}
          >
            <b className="text-body font-semibold text-ink">{answer.label}</b>
            <span className="text-meta text-faint">{answer.hint}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function CalibrateLightStep({ flow }: { flow: CalibrationFlow }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="mono">2 / 4 · Гэрэл</span>
      <h2 className={HEADING}>Гэрлийн пульс хэр харагдаж байна?</h2>
      <div className="flex justify-center py-[18px]" aria-hidden="true">
        <span className="w-[110px] h-[110px] rounded-full bg-[radial-gradient(circle,rgba(56,232,206,.6),rgba(56,232,206,.06)_70%)] [animation:calp_1.1s_ease-in-out_infinite]"></span>
      </div>
      <div className={CHOICE_GRID}>
        {LIGHT_ANSWERS.map((answer) => (
          <button
            key={answer.value}
            className={CHOICE_BASE + " border-line hover:border-[rgba(56,232,206,.5)] hover:bg-[rgba(56,232,206,.05)]"}
            onClick={() => flow.chooseLight(answer.value)}
          >
            <b className="text-body font-semibold text-ink">{answer.label}</b>
            <span className="text-meta text-faint">{answer.hint}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function CalibrateBandsStep({ flow }: { flow: CalibrationFlow }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="mono">3 / 4 · Давтамж</span>
      <h2 className={HEADING}>Аль давтамжийг мэдэрдэг вэ?</h2>
      <p className="text-dim text-sm leading-[1.6]">Тус бүрийг туршаад, мэдэрсэн бүсүүдээ идэвхтэй үлдээгээрэй. Идэвхгүй бүс чичиргээ өгөхгүй.</p>
      <div className="flex flex-col gap-[9px]">
        {BAND_SAMPLES.map((sample) => (
          <div
            key={sample.key}
            className={
              "flex items-center gap-3.5 border rounded-xl py-[11px] px-3.5 transition-[border-color,background] duration-250 " +
              (flow.selectedBands[sample.key] ? "border-[rgba(56,232,206,.45)] bg-[rgba(56,232,206,.05)]" : "border-line")
            }
          >
            <button
              className="w-10 h-10 flex-none rounded-full bg-aqua text-on-aqua text-sm flex items-center justify-center hover:bg-aqua-hover"
              onClick={() => flow.trySample(sample)}
              aria-label={sample.label + " туршиж үзэх"}
            >
              ▶
            </button>
            <div className="flex-1">
              <b className="block text-copy font-semibold">{sample.label}</b>
              <span className="mono !text-micro">{sample.hz}</span>
            </div>
            <button
              className={
                "text-note py-2 px-3.5 border rounded-full transition-colors duration-250 " +
                (flow.selectedBands[sample.key] ? "text-aqua border-[rgba(56,232,206,.5)]" : "text-dim border-line")
              }
              onClick={() => flow.toggleBand(sample.key)}
              aria-pressed={flow.selectedBands[sample.key]}
            >
              <span className="inline-flex items-center justify-center gap-1.5">
                {flow.selectedBands[sample.key] && <Icon name="check" size={12} strokeWidth={2.4} />}
                {flow.selectedBands[sample.key] ? "Мэдэрсэн" : "Мэдрээгүй"}
              </span>
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-3 flex-wrap mt-1.5">
        <ActionButton variant="primary" onClick={() => flow.goToStep(4)}>
          Үргэлжлүүлэх
          <Icon name="arrowRight" size={15} />
        </ActionButton>
      </div>
    </div>
  );
}

export function CalibrateSummary({ flow, onFinish }: { flow: CalibrationFlow; onFinish: () => void }) {
  const bands = flow.selectedBands;
  return (
    <div className="flex flex-col gap-4">
      <span className="mono">4 / 4 · Дүгнэлт</span>
      <span
        className="w-14 h-14 rounded-full flex items-center justify-center text-aqua bg-aqua/[.12] shadow-[inset_0_0_0_1px_rgba(56,232,206,.26)]"
        aria-hidden="true"
      >
        <Icon name="check" size={28} strokeWidth={2.2} />
      </span>
      <h2 className={HEADING}>Таны мэдрэхүйн профайл</h2>
      <div className="grid grid-cols-3 max-[560px]:grid-cols-1 gap-2.5">
        <div className={SUMMARY_TILE}>
          <span className="mono">Чичиргээ</span>
          <b className="text-sm text-aqua">{["Сул", "Дунд", "Хүчтэй"][flow.vibrationChoice]}</b>
        </div>
        <div className={SUMMARY_TILE}>
          <span className="mono">Гэрэл</span>
          <b className="text-sm text-aqua">{["Бүдэг", "Дунд", "Тод"][flow.lightChoice]}</b>
        </div>
        <div className={SUMMARY_TILE}>
          <span className="mono">Бүс</span>
          <b className="text-sm text-aqua">{[bands.bass && "Бас", bands.mid && "Дунд", bands.high && "Өндөр"].filter(Boolean).join(" · ")}</b>
        </div>
      </div>
      <p className="text-dim text-xs leading-[1.55]">Тохиргоог хүссэн үедээ тохиргооны цэснээс өөрчилж, дахин калибровк хийж болно.</p>
      <div className="flex gap-3 flex-wrap mt-1.5">
        <ActionButton variant="primary" onClick={onFinish}>
          Хадгалаад эхлэх
          <Icon name="arrowRight" size={15} />
        </ActionButton>
      </div>
    </div>
  );
}
