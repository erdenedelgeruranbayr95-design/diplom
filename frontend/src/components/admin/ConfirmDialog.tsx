"use client";

/* PRO Management таб-ын Approve/Reject/Cancel үйлдлүүдэд ашиглах баталгаажуулах диалог —
   өмнөх кодын `confirm()` browser-native pattern-ийг (AdminPanel.tsx-д хэвээр байгаа) солихгүй,
   зөвхөн шинэ таб дотор premium UI-тай хувилбар. Optional textarea (reject reason). */
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ActionButton } from "@/components/ui/ActionGroup";
import { useFocusTrap } from "@/hooks/useFocusTrap";

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  tone = "primary",
  requireReason,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  tone?: "primary" | "danger";
  requireReason?: boolean;
  onConfirm: (reason?: string) => void;
  onCancel: () => void;
}) {
  const [reason, setReason] = useState("");
  const trapRef = useFocusTrap(open);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[10001] bg-[rgba(4,7,7,.72)] backdrop-blur-md flex items-center justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onCancel();
          }}
        >
          <motion.div
            ref={trapRef}
            className="w-full max-w-[400px] bg-[rgba(9,14,14,.98)] border border-white/[.1] rounded-2xl p-6 shadow-[0_24px_70px_rgba(0,0,0,.55)]"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-dialog-title"
            onKeyDown={(e) => {
              if (e.key === "Escape") onCancel();
            }}
          >
            <b id="confirm-dialog-title" className="font-display text-title block mb-2">
              {title}
            </b>
            <p className="text-dim text-body leading-[1.5] mb-4">{description}</p>

            {requireReason && (
              <label className="flex flex-col gap-1.5 mb-4">
                <span className="mono !text-micro">Шалтгаан</span>
                <textarea
                  className="bg-white/[.04] border border-white/[.08] text-ink font-body text-body p-[10px_12px] rounded-lg min-h-[80px] resize-none transition-[border-color,background,box-shadow] duration-250 focus:border-aqua focus:bg-aqua/[.05] focus-visible:outline-none focus-visible:shadow-glow-aqua placeholder:text-faint"
                  placeholder="Татгалзсан шалтгаанаа бичнэ үү…"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  autoFocus
                />
              </label>
            )}

            <div className="flex items-center gap-2.5">
              <ActionButton variant="secondary" className="flex-1" onClick={onCancel}>
                Болих
              </ActionButton>
              <ActionButton
                variant={tone === "danger" ? "danger" : "primary"}
                className="flex-1"
                onClick={() => onConfirm(requireReason ? reason : undefined)}
                disabled={requireReason && !reason.trim()}
              >
                {confirmLabel}
              </ActionButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
