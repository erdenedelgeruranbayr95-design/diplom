"use client";

import { useCallback, useRef, useState } from "react";

/* Modal/panel-ийн instant unmount-ийн оронд богино "гарах" animation харуулах ерөнхий hook.
   Player.tsx-ийн closeImmersive() pattern-ийг ерөнхийлсөн. Component `open` prop-оо
   хэвээр удирддаг эцэг компонентоос "бодит хаах" үйлдлийг `onClose`-оор дамжуулна; `handleClose`-г
   UI trigger (close button, backdrop click, ESC) дуудна — эхлээд `closing` тавьж animation ажиллуулаад,
   дараа нь жинхэнэ `onClose`-г дуудна. */
export function useClosingTransition(onClose: () => void, durationMs = 220) {
  const [closing, setClosing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClose = useCallback(() => {
    if (timerRef.current) return; // аль хэдийн хаагдаж байгаа бол давхар бүү дуудаг
    setClosing(true);
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      setClosing(false);
      onClose();
    }, durationMs);
  }, [onClose, durationMs]);

  return { closing, handleClose };
}
