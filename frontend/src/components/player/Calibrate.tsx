"use client";

/* Мэдрэхүйн калибровк — хэрэглэгчийн мэдрэх босгыг 4 алхамтай тестээр тодорхойлж,
   чичиргээний хүч / гэрлийн эрчим / давтамжийн бүсийн тохиргоог автоматаар өгнө.

   Энэ файл ЗӨВХӨН модалын бүрхүүл ба алхмын чиглүүлэлт. Төлөв/дуу/чичиргээ нь
   `useCalibrationFlow`-д, алхам бүрийн харагдац нь `calibrate/CalibrateSteps.tsx`-д. */
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useCalibrationFlow } from "@/lib/player/hooks/useCalibrationFlow";
import {
  CalibrateBandsStep,
  CalibrateIntro,
  CalibrateLightStep,
  CalibrateProgress,
  CalibrateSummary,
  CalibrateVibrationStep,
} from "./calibrate/CalibrateSteps";
import type { CalibrationResult } from "@/types/player";

export default function Calibrate({
  open,
  onClose,
  onDone,
}: {
  open: boolean;
  onClose: () => void;
  onDone: (result: CalibrationResult) => void;
}) {
  /* Hook-уудыг эрт буцахаас ӨМНӨ дуудна (Rules of Hooks). */
  const flow = useCalibrationFlow(open);
  const trapRef = useFocusTrap(true);

  if (!open) return null;

  function finish() {
    onDone(flow.result);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[9700] bg-[rgba(4,7,7,.92)] backdrop-blur-2xl flex items-center justify-center p-[22px] [animation:aov_.35s_ease]"
      role="dialog"
      aria-modal="true"
      aria-label="Мэдрэхүйн калибровк"
    >
      {/* Focus trap — калибровк бол модал урсгал, Tab нь ард байгаа тоглуулагч руу
          гарах ёсгүй (WCAG 2.4.3 Focus Order). */}
      <div
        ref={trapRef}
        className="w-full max-w-[520px] bg-[#0C1313] border border-white/[.12] rounded-2xl p-[34px_34px_30px] [animation:abx_.4s_cubic-bezier(.16,.8,.24,1)]"
      >
        <CalibrateProgress step={flow.step} />

        {flow.step === 0 && <CalibrateIntro onStart={() => flow.goToStep(1)} onSkip={onClose} />}
        {flow.step === 1 && <CalibrateVibrationStep flow={flow} />}
        {flow.step === 2 && <CalibrateLightStep flow={flow} />}
        {flow.step === 3 && <CalibrateBandsStep flow={flow} />}
        {flow.step === 4 && <CalibrateSummary flow={flow} onFinish={finish} />}
      </div>
    </div>
  );
}
