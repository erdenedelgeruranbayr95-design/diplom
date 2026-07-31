"use client";

/* PRO Management таб-ын payment request дэлгэрэнгүй side drawer — Framer Motion slide-in,
   focus trap, ESC хаах. Зөвхөн demo layer (admin-payment-requests.ts)-ийн бичлэгийг харуулна,
   ямар ч backend дуудлага энд байхгүй (харах/шийдвэрлэх л). */
import { AnimatePresence, motion } from "framer-motion";
import StatusBadge from "@/components/ui/StatusBadge";
import { ActionButton } from "@/components/ui/ActionGroup";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import type { AdminPaymentRequest } from "@/lib/data/admin-payment-requests";
import Icon from "@/components/ui/Icon";

const STATUS_LABEL: Record<AdminPaymentRequest["status"], string> = {
  PENDING: "Хүлээгдэж байна",
  APPROVED: "Зөвшөөрсөн",
  REJECTED: "Татгалзсан",
};
const STATUS_TONE: Record<AdminPaymentRequest["status"], "aqua" | "warm" | "rose"> = {
  PENDING: "warm",
  APPROVED: "aqua",
  REJECTED: "rose",
};

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

export default function PaymentRequestDrawer({
  request,
  onClose,
  onApprove,
  onReject,
}: {
  request: AdminPaymentRequest | null;
  onClose: () => void;
  onApprove: (r: AdminPaymentRequest) => void;
  onReject: (r: AdminPaymentRequest) => void;
}) {
  const trapRef = useFocusTrap(!!request);

  return (
    <AnimatePresence>
      {request && (
        <>
          <motion.div
            className="fixed inset-0 z-[10001] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onMouseDown={onClose}
          />
          <motion.div
            ref={trapRef}
            className="fixed top-0 right-0 bottom-0 z-[10002] w-full max-w-[380px] max-nav:max-w-full bg-[rgba(9,14,14,.98)] border-l border-white/[.1] shadow-[-24px_0_60px_rgba(0,0,0,.5)] p-6 overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-drawer-title"
            onKeyDown={(e) => {
              if (e.key === "Escape") onClose();
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <span id="payment-drawer-title" className="mono">
                Төлбөрийн хүсэлт
              </span>
              <button
                className="w-8 h-8 rounded-lg flex items-center justify-center text-dim hover:text-ink hover:bg-white/[.06] transition-colors duration-150 focus-visible:outline-none focus-visible:shadow-glow-aqua"
                onClick={onClose}
                aria-label="Хаах"
              >
                <Icon name="close" size={15} />
              </button>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-12 flex-none rounded-full bg-aqua/[.14] text-aqua flex items-center justify-center font-display font-semibold text-lead" aria-hidden="true">
                {initials(request.userName) || "?"}
              </span>
              <div className="min-w-0">
                <b className="block text-lead font-semibold truncate">{request.userName}</b>
                <span className="text-dim text-note truncate block">{request.userEmail}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3.5 text-body">
              <div className="flex items-center justify-between">
                <span className="text-dim">Сонгосон план</span>
                <b>{request.plan}</b>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-dim">Дүн</span>
                <b>{request.amount}</b>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-dim">Төлбөрийн хэрэгсэл</span>
                <span>{request.method}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-dim">Илгээсэн огноо</span>
                <span className="font-mono text-note">{new Date(request.submittedAt).toLocaleString("mn-MN")}</span>
              </div>
              {request.decidedAt && (
                <div className="flex items-center justify-between">
                  <span className="text-dim">Шийдвэрлэсэн</span>
                  <span className="font-mono text-note">{new Date(request.decidedAt).toLocaleString("mn-MN")}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-dim">Төлөв</span>
                <StatusBadge label={STATUS_LABEL[request.status]} tone={STATUS_TONE[request.status]} />
              </div>
            </div>

            {request.note && (
              <div className="mt-5 pt-5 border-t border-white/[.08]">
                <span className="mono !text-micro block mb-1.5">Тэмдэглэл</span>
                <p className="text-dim text-note leading-[1.5]">{request.note}</p>
              </div>
            )}
            {request.reason && (
              <div className="mt-3">
                <span className="mono !text-micro block mb-1.5">Татгалзсан шалтгаан</span>
                <p className="text-danger text-note leading-[1.5]">{request.reason}</p>
              </div>
            )}

            {request.status === "PENDING" && (
              <div className="flex items-center gap-2.5 mt-6 pt-5 border-t border-white/[.08]">
                <ActionButton variant="danger" className="flex-1" onClick={() => onReject(request)}>
                  Татгалзах
                </ActionButton>
                <ActionButton variant="primary" className="flex-1" onClick={() => onApprove(request)}>
                  Зөвшөөрөх
                </ActionButton>
              </div>
            )}

            <p className="mono !text-micro mt-6 pt-4 border-t border-white/[.07]">Демо горим — жинхэнэ мөнгө шилжихгүй.</p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
