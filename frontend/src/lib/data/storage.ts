"use client";

/* localStorage-ийн нэг цэгийн хандалт.

   Урьд нь `JSON.parse(localStorage.getItem(k) || "[]") || []` гэсэн try/catch блок
   library.ts, Player.tsx, auth-storage.ts, admin-payment-requests.ts зэрэгт 10 гаруй
   удаа хуулагдсан байв. Энд нэг л хувилбар үлдэнэ — уншилтын алдаа (SSR, private
   mode, эвдэрсэн JSON) бүгд ижилхэн fallback руу унана. */

/** JSON утга уншина; түлхүүр байхгүй/эвдэрсэн бол `fallback`-ийг буцаана. */
export function readJson<T>(key: string, fallback: T): T {
  if (typeof localStorage === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    const parsed = JSON.parse(raw);
    return (parsed ?? fallback) as T;
  } catch {
    return fallback;
  }
}

/** JSON утга бичнэ; квот дүүрсэн/хориотой үед чимээгүй өнгөрнө. */
export function writeJson(key: string, value: unknown): void {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* квот дүүрсэн эсвэл private mode — хадгалахгүй өнгөрөх нь зөв зан төлөв */
  }
}

/** Тоон утга уншина (feed-ийн уншсан timestamp гэх мэт). */
export function readNumber(key: string, fallback = 0): number {
  if (typeof localStorage === "undefined") return fallback;
  const raw = localStorage.getItem(key);
  if (raw === null) return fallback;
  const n = Number(raw);
  return Number.isFinite(n) ? n : fallback;
}

/** Тоон утга бичнэ. */
export function writeNumber(key: string, value: number): void {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(key, String(value));
  } catch {
    /* noop */
  }
}

/** Хэрэглэгч тус бүрийн түлхүүр — `medreh_likes:hi@mail.com` маягаар. */
export function userKey(namespace: string, email: string): string {
  return `${namespace}:${email}`;
}
