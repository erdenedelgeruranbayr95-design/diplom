"use client";

/* ХУУЧИРСАН: жинхэнэ auth (register/login/session) одоо backend JWT дээр суурилна — lib/api/client.ts, lib/auth/auth-context.tsx.
   Энэ файл зөвхөн backend руу хараахан шилжээгүй хуучин модулиудад (ProfileView, AdminView, SubscribeModal —
   Phase 2-т backend-жих) түр зуур localStorage дэмжлэг үзүүлж байна. */
const USERS_KEY = "medreh_users";
const SESSION_KEY = "medreh_user";

export interface LegacyUser {
  name: string;
  email: string;
  pass: string;
  role: "admin" | "user";
  created?: number;
  sub?: { active: boolean; plan: string; since: number; renews: number } | null;
}

export function loadUsers(): LegacyUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]") || [];
  } catch {
    return [];
  }
}
export function saveUsers(users: LegacyUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/* Анхны админ бүртгэл — байхгүй бол үүсгэнэ (демо: admin@medreh.mn / admin123) */
export function seedAdmin() {
  const users = loadUsers();
  if (!users.some((u) => u.role === "admin")) {
    users.unshift({ name: "Админ", email: "admin@medreh.mn", pass: scramble("admin123"), role: "admin" });
    saveUsers(users);
  }
}
// Демо тул энгийн обфускаци — жинхэнэ систем дээр серверт хэшлэх ёстой
function scramble(s: string) {
  return btoa(unescape(encodeURIComponent(s + "·medreh")));
}

/* ---- профайл засах туслахууд (scramble-ийг энд нууц үлдээнэ) ---- */
export function updateUserFields(email: string, fields: Partial<LegacyUser>) {
  const users = loadUsers();
  const u = users.find((x) => x.email === email);
  if (!u) return false;
  Object.assign(u, fields);
  saveUsers(users);
  return true;
}
export function verifyPassword(email: string, pass: string) {
  const u = loadUsers().find((x) => x.email === email);
  return !!u && u.pass === scramble(pass);
}
export function setPassword(email: string, newPass: string) {
  return updateUserFields(email, { pass: scramble(newPass) });
}

export function loadSession(): LegacyUser | null {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  } catch {
    return null;
  }
}
export function saveSession(user: LegacyUser | null) {
  if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  else localStorage.removeItem(SESSION_KEY);
}
