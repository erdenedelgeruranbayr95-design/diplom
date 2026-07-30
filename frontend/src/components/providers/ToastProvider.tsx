"use client";

/* Апп даяар мэдэгдэл (alert()-ийн оронд). useToast().success/error/info */
import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import Icon from "@/components/ui/Icon";

type ToastType = "success" | "error" | "info";
interface ToastItem {
  id: number;
  text: string;
  type: ToastType;
}
interface ToastApi {
  show: (text: string, type?: ToastType, ms?: number) => number;
  success: (text: string, ms?: number) => number;
  error: (text: string, ms?: number) => number;
  info: (text: string, ms?: number) => number;
  dismiss: (id: number) => void;
}

const ToastCtx = createContext<ToastApi | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const remove = useCallback((id: number) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (text: string, type: ToastType = "info", ms = 3800) => {
      const id = Date.now() + Math.random();
      setToasts((list) => [...list, { id, text, type }]);
      if (ms > 0) setTimeout(() => remove(id), ms);
      return id;
    },
    [remove],
  );

  const api: ToastApi = {
    show: push,
    success: (t, ms) => push(t, "success", ms),
    error: (t, ms) => push(t, "error", ms),
    info: (t, ms) => push(t, "info", ms),
    dismiss: remove,
  };

  /* toast-ийн icon: "✓ ⚠ ℹ" текст глиф → нэгдсэн SVG (шрифт/OS-оос хамааралгүй,
     бусад icon-той ижил зузаан). ToastType-ийн утга/логик өөрчлөгдөөгүй. */
  const icon: Record<ToastType, string> = { success: "check", error: "alert", info: "info" };

  return (
    <ToastCtx.Provider value={api}>
      {children}
      <div className="toast-wrap" role="region" aria-label="Мэдэгдэл" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={"toast toast-" + t.type} role="status">
            <span className="toast-ic" aria-hidden="true">
              <Icon name={icon[t.type] || icon.info} size={13} strokeWidth={2.4} />
            </span>
            <p>{t.text}</p>
            <button className="toast-x focus-visible:outline-none focus-visible:shadow-glow-aqua" onClick={() => remove(t.id)} aria-label="Хаах">
              <Icon name="close" size={13} strokeWidth={2.2} />
            </button>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast-ийг ToastProvider дотор ашиглана уу");
  return ctx;
}
