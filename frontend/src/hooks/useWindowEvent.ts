"use client";

import { useEffect, useRef } from "react";

/* `window`-ийн event listener-ийг бүртгэх/салгах хосыг нэг мөр болгосон hook.

   Урьд нь Player.tsx (5 удаа), TopBar, AdminPanel, AuthModal, SubscribeModal,
   PlaylistsView, ProManagementPanel, DevicesView бүгд addEventListener/
   removeEventListener хосыг гараар бичдэг байсан. Хамгийн түгээмэл алдаа нь handler
   нь render бүрд шинээр үүсэж, listener хэрэггүй газраа дахин бүртгэгддэг явдал —
   энд handler-ийг ref-т барьж, бүртгэл ЗӨВХӨН `type`/`enabled`/`capture` өөрчлөгдөхөд
   давтагдана. */

export interface WindowEventOptions {
  /** `false` үед listener огт бүртгэгдэхгүй. */
  enabled?: boolean;
  /** Capture фазад сонсох (ESC-ийн шатлал зэрэгт чухал). */
  capture?: boolean;
}

export function useWindowEvent<K extends keyof WindowEventMap>(
  type: K,
  handler: (event: WindowEventMap[K]) => void,
  options?: WindowEventOptions,
): void;
export function useWindowEvent(type: string, handler: (event: Event) => void, options?: WindowEventOptions): void;
export function useWindowEvent(type: string, handler: (event: never) => void, options: WindowEventOptions = {}): void {
  const { enabled = true, capture = false } = options;
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    const listener = (event: Event) => (handlerRef.current as (e: Event) => void)(event);
    addEventListener(type, listener, capture ? { capture: true } : undefined);
    return () => removeEventListener(type, listener, capture ? { capture: true } : undefined);
  }, [type, enabled, capture]);
}

/** Хэд хэдэн event-ийг НЭГ handler дээр сонсох (жишээ нь `feed-changed` + `storage`). */
export function useWindowEvents(types: string[], handler: (event: Event) => void, options: WindowEventOptions = {}): void {
  const { enabled = true, capture = false } = options;
  const handlerRef = useRef(handler);
  handlerRef.current = handler;
  const key = types.join("|");

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    const listener = (event: Event) => handlerRef.current(event);
    const names = key.split("|").filter(Boolean);
    const opts = capture ? { capture: true } : undefined;
    names.forEach((name) => addEventListener(name, listener, opts));
    return () => names.forEach((name) => removeEventListener(name, listener, opts));
  }, [key, enabled, capture]);
}
