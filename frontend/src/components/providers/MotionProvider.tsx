"use client";

/* Хөдөлгөөн багасгах — framer-motion-ий ГЛОБАЛ тохиргоо.

   CSS дэх `@media (prefers-reduced-motion: reduce)` болон `html[data-reduced-motion]`
   дүрмүүд нь ЗӨВХӨН CSS animation/transition-д нөлөөлдөг. Харин энэ апп-д
   framer-motion (`motion.*`, `whileHover`, `AnimatePresence`) нь JavaScript-ээр
   inline style бичдэг тул тэдгээр дүрмээс БҮРЭН гадуур үлддэг байв.

   Энд 2 эх сурвалжийг нэгтгэнэ:
     · үйлдлийн системийн тохиргоо  → reducedMotion="user"
     · апп доторх "Хөдөлгөөн багасгах" шилжүүлэгч → reducedMotion="always"
   Аль нэг нь асаалттай бол хөдөлгөөн зогсоно (transform/layout animation унтарч,
   opacity/өнгө хэвээр — агуулга хэзээ ч алга болохгүй). */
import { MotionConfig } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { MOTION_PREF_EVENT, readMotionPreference } from "@/hooks/useAppPreferences";

export default function MotionProvider({ children }: { children: ReactNode }) {
  const [appReduced, setAppReduced] = useState(false);

  useEffect(() => {
    setAppReduced(readMotionPreference());
    const onPref = (e: Event) => setAppReduced(!!(e as CustomEvent<boolean>).detail);
    addEventListener(MOTION_PREF_EVENT, onPref);
    return () => removeEventListener(MOTION_PREF_EVENT, onPref);
  }, []);

  return <MotionConfig reducedMotion={appReduced ? "always" : "user"}>{children}</MotionConfig>;
}
