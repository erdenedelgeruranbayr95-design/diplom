"use client";

/* Хэрэглэгчийн тохиргоог БОДИТ нөлөө болгож буулгах ганц цэг.

   Урьд нь `theme`, `language`, `largeText`, `reducedMotion`, `notifyFeed` нь
   localStorage-д ХАДГАЛАГДДАГ ч хаана ч уншигддаггүй байв — тохиргооны шилжүүлэгч
   дарагдаж, хадгалагдаж, гэхдээ апп-д юу ч болдоггүй "хуурамч" тохиргоо байсан.

   Энэ hook нь тэдгээрийг <html> элементийн data-attribute болгож буулгана:
     data-large-text="true"      → globals.css: --text-scale: 1.15
     data-reduced-motion="true"  → globals.css: бүх animation/transition зогсоно
   Мөн framer-motion (JS-ээр inline style бичдэг тул CSS хүрэхгүй) дээр нөлөөлөхийн
   тулд өөрчлөлт бүрд `medreh:motion-pref` event дамжуулна — MotionProvider үүнийг
   сонсоод `MotionConfig`-оо шинэчилнэ.

   Attribute-ийг ЗӨВХӨН утга нь `true` үед тавьж, эсрэг тохиолдолд УСТГАНА —
   ингэснээр тохиргоо ачаалагдаагүй/нэвтрээгүй үед өгөгдмөл байдал бүрэн хэвээр. */
import { useEffect } from "react";
import { APP_EVENTS } from "@/lib/data/events";

export const MOTION_PREF_EVENT = APP_EVENTS.motionPreference;

export interface AppliedPreferences {
  largeText?: boolean;
  reducedMotion?: boolean;
}

/** Апп-ын хэмжээнд идэвхтэй байгаа "хөдөлгөөн багасгах" тохиргоог уншина. */
export function readMotionPreference(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.dataset.reducedMotion === "true";
}

export function useAppPreferences({ largeText, reducedMotion }: AppliedPreferences) {
  useEffect(() => {
    const root = document.documentElement;

    if (largeText) root.dataset.largeText = "true";
    else delete root.dataset.largeText;

    const nextMotion = reducedMotion ? "true" : undefined;
    if (root.dataset.reducedMotion !== nextMotion) {
      if (nextMotion) root.dataset.reducedMotion = nextMotion;
      else delete root.dataset.reducedMotion;
      dispatchEvent(new CustomEvent(MOTION_PREF_EVENT, { detail: !!reducedMotion }));
    }
  }, [largeText, reducedMotion]);

  /* Компонент unmount болоход (жишээ нь гарах үед) attribute-уудыг цэвэрлэнэ —
     дараагийн хэрэглэгч өмнөхийнх нь тохиргоог өвлөхгүй. */
  useEffect(() => {
    return () => {
      const root = document.documentElement;
      delete root.dataset.largeText;
      if (root.dataset.reducedMotion) {
        delete root.dataset.reducedMotion;
        dispatchEvent(new CustomEvent(MOTION_PREF_EVENT, { detail: false }));
      }
    };
  }, []);
}
