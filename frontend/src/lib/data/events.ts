"use client";

/* Апп доторх `window` дээрх custom event-үүдийн ганц бүртгэл.

   Тарсан мөр литералуудыг ("medreh:library-changed" гэх мэт) нэг газар цуглуулав —
   бичигч болон сонсогч тал үргэлж ижил нэр ашиглана. Event-ийн НЭР өөрчлөгдөөгүй. */

export const APP_EVENTS = {
  libraryChanged: "medreh:library-changed",
  feedChanged: "medreh:feed-changed",
  usersChanged: "medreh:users-changed",
  paymentRequestsChanged: "medreh:payment-requests-changed",
  sessionExpired: "medreh:session-expired",
  motionPreference: "medreh:motion-pref",
} as const;

export type AppEventName = (typeof APP_EVENTS)[keyof typeof APP_EVENTS];

/** Апп доторх custom event дамжуулна. */
export function emitAppEvent(name: AppEventName, detail?: unknown): void {
  if (typeof window === "undefined") return;
  dispatchEvent(detail === undefined ? new CustomEvent(name) : new CustomEvent(name, { detail }));
}
