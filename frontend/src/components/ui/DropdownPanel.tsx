"use client";

/* TopBar-ийн 3 dropdown (мэдэгдэл/тохиргоо/профайл)-ийн нийтлэг "panel" shell — legacy
   .sp-dd CSS-ийг Tailwind-аар орлуулав. Зөвхөн визуал каркас: байрлал/хэмжээ/арын дэвсгэр/
   сүүдэр/animation. Дотоод агуулга (items) бүрэн caller-аас ирнэ.

   Хүртээмжийн тэмдэглэл:
   · role нь `dialog` БИШ `group`. Dropdown бол модал биш — `dialog` гэж зарлавал дэлгэц
     уншигч "харилцах цонх нээгдлээ" гэж мэдэгдэж, хэрэглэгч гарах гарц хайх болдог.
   · Escape дарахад хаагдана, фокус нээсэн товч руугаа буцна (WCAG 2.1.2 No Keyboard Trap
     + 2.4.3 Focus Order).
   · Фокус панелаас гарвал (Tab-аар цааш явбал) автоматаар хаагдана — dropdown-ы
     ердийн зан төлөв. */
import { useEffect, useRef, type ReactNode } from "react";

export default function DropdownPanel({
  label,
  width = 320,
  onClose,
  children,
}: {
  label: string;
  width?: number;
  /* Дамжуулбал Escape / фокус гарах үед дуудагдана. Дамжуулаагүй үед панел зөвхөн
     визуал бүрхүүл хэвээр (буцах нийцтэй байдал). */
  onClose?: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  /* Нээхээс өмнө фокустай байсан элемент — хаахад энэ рүү буцаана. */
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!onClose) return;
    openerRef.current = document.activeElement as HTMLElement | null;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      e.stopPropagation();
      onClose!();
      openerRef.current?.focus();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  function onBlurCapture(e: React.FocusEvent<HTMLDivElement>) {
    if (!onClose) return;
    const next = e.relatedTarget as Node | null;
    if (next && ref.current?.contains(next)) return; // дотроо шилжсэн — хэвээр
    if (!next) return; // фокус цонхноос гарсан (alt-tab) — хаахгүй
    onClose();
  }

  return (
    /* Гүн + хүрээ: overlay бүр ижил elevation-той байх ёстой (shadow + hairline
       highlight). max-w нь жижиг дэлгэц дээр панел viewport-оос гарахаас сэргийлнэ. */
    <div
      ref={ref}
      role="group"
      aria-label={label}
      onBlurCapture={onBlurCapture}
      style={{ width }}
      className="absolute top-[52px] right-0 z-[9] max-h-[min(420px,72svh)] max-w-[calc(100vw-24px)] overflow-y-auto overscroll-contain rounded-2xl border border-white/[.12] bg-[#0B1110] shadow-[inset_0_1px_0_rgba(255,255,255,.06),0_22px_56px_-12px_rgba(0,0,0,.75)] [animation:abx_.22s_cubic-bezier(.16,.8,.24,1)] p-2.5 flex flex-col gap-1"
    >
      {children}
    </div>
  );
}
