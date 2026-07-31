"use client";

import type { MouseEvent as ReactMouseEvent, RefObject } from "react";
import { useClosingTransition } from "@/hooks/useClosingTransition";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useWindowEvent } from "@/hooks/useWindowEvent";

/* Модал цонхны 4 давтагдсан үүргийг нэгтгэсэн hook:
     1. гарах animation (`closing`) → жинхэнэ `onClose`
     2. Escape товч
     3. focus trap (Tab нь ард байгаа хуудсанд гарахгүй)
     4. backdrop дээр дарж хаах

   AdminPanel · AuthModal · SubscribeModal гурав нь эдгээрийг тус тусдаа, бага зэрэг
   өөр өөрөөр (заримд нь `closing` шалгалт байхгүй, заримд нь ESC листенер render
   бүрд дахин бүртгэгддэг) бичсэн байв. Одоо гурвуулаа энэ нэг зан төлвийг хуваалцана. */

export interface ModalShell {
  /** Гарах animation явж байгаа эсэх — wrapper-ийн класс сонгоход. */
  closing: boolean;
  /** Хаах хүсэлт — animation тоглуулаад дараа нь `onClose` дуудна. */
  handleClose: () => void;
  /** Модалын хамгийн гадна div-д холбоно (focus trap). */
  trapRef: RefObject<HTMLDivElement | null>;
  /** Backdrop дээр дарж хаах — `<div {...backdropProps}>`. */
  backdropProps: { onMouseDown: (e: ReactMouseEvent<HTMLElement>) => void };
}

export interface ModalShellOptions {
  open: boolean;
  onClose: () => void;
  /** Гарах animation-ий үргэлжлэх хугацаа (мс). */
  durationMs?: number;
  /** Escape товчийг сонсох эсэх (өөрөө удирддаг модалд `false`). */
  closeOnEscape?: boolean;
}

export function useModalShell({ open, onClose, durationMs, closeOnEscape = true }: ModalShellOptions): ModalShell {
  const { closing, handleClose } = useClosingTransition(onClose, durationMs);
  const trapRef = useFocusTrap(open && !closing);

  useWindowEvent(
    "keydown",
    (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    },
    { enabled: open && closeOnEscape },
  );

  return {
    closing,
    handleClose,
    trapRef,
    backdropProps: {
      onMouseDown: (e: ReactMouseEvent<HTMLElement>) => {
        if (e.target === e.currentTarget) handleClose();
      },
    },
  };
}
