"use client";

import { useEffect } from "react";

/** `document.body`-д класс нэмэх/хасах — идэвхгүй болоход болон unmount-д цэвэрлэнэ. */
export function useBodyClass(className: string, active: boolean): void {
  useEffect(() => {
    document.body.classList.toggle(className, active);
    return () => document.body.classList.remove(className);
  }, [className, active]);
}
