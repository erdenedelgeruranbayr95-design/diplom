"use client";

/* Backend API холбогч — access token-ийг memory-д хадгална (localStorage биш, XSS эрсдэл багасгах үүднээс),
   refresh token нь httpOnly cookie-д, browser автоматаар илгээнэ.
   Access token нь зөвхөн browser tab-ийн module-level хувьсагчид оршдог тул энэ файл болон
   үүнийг ашигладаг бүх код Client Component-т байх ёстой (Server Component-д унших боломжгүй). */
import { APP_EVENTS } from "@/lib/data/events";
import type {
  AdminUserRow,
  ChangePasswordPayload,
  CreatedUser,
  CreateUserPayload,
  NotificationFeed,
  NotificationRow,
  SessionUser,
  UpdateProfilePayload,
  UserSub,
} from "@/types/auth";
import type { AnalyzeSongPayload, Artist, ArtistWithSongs, CreateHistoryPayload, HistoryPage, ListenHistoryRow, Song } from "@/types/song";
import type { QrSessionRow } from "@/types/qr";
import type {
  AssignedPatient,
  CreateProgressPayload,
  CreateTherapySessionPayload,
  LinkedChild,
  Progress,
  TherapySession,
  TherapistAssignmentRow,
  UpdateTherapySessionPayload,
} from "@/types/therapy";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}
export function getAccessToken() {
  return accessToken;
}

interface AuthResponse {
  accessToken: string;
  user: SessionUser;
}

async function apiFetch<T>(path: string, opts: RequestInit = {}, retry = true): Promise<T> {
  const headers: Record<string, string> = { ...((opts.headers as Record<string, string>) || {}) };
  if (!(opts.body instanceof FormData)) headers["Content-Type"] = "application/json";
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;

  const res = await fetch(BASE_URL + path, { ...opts, headers, credentials: "include" });

  if (res.status === 401 && retry && path !== "/auth/refresh") {
    const refreshed = await refresh().catch(() => null);
    if (refreshed) return apiFetch<T>(path, opts, false);
    accessToken = null;
    dispatchEvent(new CustomEvent(APP_EVENTS.sessionExpired));
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `Алдаа гарлаа (${res.status})`);
  }

  /* ⚠️ NestJS handler `null` буцаахад 204 биш, ХООСОН body-тай 200 ирдэг
     (жишээ нь DELETE /users/me/subscription, PATCH /users/:id/subscription идэвхгүй
     болгох үед). Урьд нь энд шууд `res.json()` дуудаж "Unexpected end of JSON input"
     гэж уначихдаг байсан — "Захиалга цуцлах" урсгал зөвхөн дуудагч тал алдааг
     залгидаг байсны ачаар л ажилладаг мэт харагдаж байв. */
  if (res.status === 204) return null as T;
  const text = await res.text();
  if (!text) return null as T;
  return JSON.parse(text) as T;
}

export async function register(name: string, email: string, password: string, password2: string) {
  const data = await apiFetch<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password, password2 }),
  });
  accessToken = data.accessToken;
  return data.user;
}

export async function login(email: string, password: string) {
  const data = await apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  accessToken = data.accessToken;
  return data.user;
}

export async function refresh() {
  const data = await apiFetch<AuthResponse>("/auth/refresh", { method: "POST" }, false);
  accessToken = data.accessToken;
  return data.user;
}

export async function logout() {
  await apiFetch("/auth/logout", { method: "POST" }, false).catch(() => {});
  accessToken = null;
}

export function me() {
  return apiFetch<SessionUser>("/auth/me");
}

export function listUsers() {
  return apiFetch<AdminUserRow[]>("/users");
}

export function deleteUser(id: string) {
  return apiFetch<null>(`/users/${id}`, { method: "DELETE" });
}

export function createUser(payload: CreateUserPayload) {
  return apiFetch<CreatedUser>("/users", { method: "POST", body: JSON.stringify(payload) });
}

/* PRO эрхийг DB-д бодитоор бичнэ (users.controller.ts: PATCH/DELETE /users/me/subscription) —
   refresh/дахин нэвтрэх/өөр tab дээр ч хадгалагдана, зөвхөн React state-д биш. */
export function subscribeMe(plan?: string) {
  return apiFetch<UserSub | null>("/users/me/subscription", { method: "PATCH", body: JSON.stringify({ plan }) });
}

export function cancelSubscriptionMe() {
  return apiFetch<UserSub | null>("/users/me/subscription", { method: "DELETE" });
}

/* Профайл ба нууц үг — өмнө нь эдгээр нь localStorage-ийн хоосон "legacy" сан руу
   бичдэг байсан тул нууц үг солих нь хэзээ ч ажилладаггүй, профайл refresh хийхэд
   алга болдог байв. Одоо Postgres руу бодитоор бичигдэнэ. */
export function updateProfile(payload: UpdateProfilePayload) {
  return apiFetch<Pick<SessionUser, "id" | "name" | "email" | "role" | "avatarColor" | "hearingProfile">>("/users/me", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function changePassword(payload: ChangePasswordPayload) {
  return apiFetch<{ ok: true }>("/users/me/password", { method: "PATCH", body: JSON.stringify(payload) });
}

/* Админ өөр хэрэглэгчийн PRO эрхийг DB-д бодитоор олгоно/хасна. */
export function setUserSubscription(userId: string, active: boolean, plan?: string) {
  return apiFetch<UserSub | null>(`/users/${userId}/subscription`, {
    method: "PATCH",
    body: JSON.stringify({ active, plan }),
  });
}

// ---- Мэдэгдэл (feed) ----
export function listNotifications() {
  return apiFetch<NotificationFeed>("/notifications");
}

export function markNotificationsRead() {
  return apiFetch<{ readAt: string }>("/notifications/read", { method: "POST" });
}

/** Админы зарлал — `userId = null` тул БҮХ хэрэглэгчид хүрнэ. */
export function broadcastNotification(text: string, icon = "📢") {
  return apiFetch<NotificationRow>("/notifications/broadcast", { method: "POST", body: JSON.stringify({ text, icon }) });
}

// ---- Эмч томилолт (admin) ----
export function createTherapistAssignment(therapistId: string, userId: string) {
  return apiFetch<TherapistAssignmentRow>("/assignments/therapists", {
    method: "POST",
    body: JSON.stringify({ therapistId, userId }),
  });
}

export function listTherapistAssignments() {
  return apiFetch<TherapistAssignmentRow[]>("/assignments/therapists");
}

export function removeTherapistAssignment(id: string) {
  return apiFetch<null>(`/assignments/therapists/${id}`, { method: "DELETE" });
}

// ---- Songs ----
export function uploadSong(form: FormData) {
  return apiFetch<Song>("/songs", { method: "POST", body: form });
}

export function listSongs() {
  return apiFetch<Song[]>("/songs");
}

export function getSong(id: string) {
  return apiFetch<Song>(`/songs/${id}`);
}

export function submitAnalysis(id: string, payload: AnalyzeSongPayload) {
  return apiFetch<Song>(`/songs/${id}/analyze`, { method: "POST", body: JSON.stringify(payload) });
}

export function getFeaturedSongs() {
  return apiFetch<Song[]>("/songs/featured");
}

export function getRecentSongs() {
  return apiFetch<Song[]>("/songs/recent");
}

export function getPopularSongs() {
  return apiFetch<Song[]>("/songs/popular");
}


// ---- Artists (дуучид) ----
export function listArtists() {
  return apiFetch<Artist[]>("/artists");
}

export function getArtist(id: string) {
  return apiFetch<ArtistWithSongs>(`/artists/${id}`);
}

export function getArtistSongs(id: string) {
  return apiFetch<Song[]>(`/artists/${id}/songs`);
}

export function createArtist(payload: { name: string; bio?: string; careerInfo?: string; photoUrl?: string }) {
  return apiFetch<Artist>("/artists", { method: "POST", body: JSON.stringify(payload) });
}

// ---- Listen history ----
export function logHistory(entry: CreateHistoryPayload) {
  return apiFetch<ListenHistoryRow>("/history", { method: "POST", body: JSON.stringify(entry) });
}

export function getHistory(page = 1, limit = 20, q?: string) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit), ...(q ? { q } : {}) });
  return apiFetch<HistoryPage>(`/history?${params}`);
}

export function deleteHistoryEntry(id: string) {
  return apiFetch<null>(`/history/${id}`, { method: "DELETE" });
}

// ---- QR (утас холбох) ----
export function createQrSession() {
  return apiFetch<QrSessionRow>("/qr/sessions", { method: "POST" });
}

export function getQrSession(token: string) {
  return apiFetch<QrSessionRow>(`/qr/sessions/${token}`);
}

// ---- Эмчилгээ (therapist) ----
export function listMyPatients() {
  return apiFetch<AssignedPatient[]>("/assignments/my-patients");
}

export function listMyChildren() {
  return apiFetch<LinkedChild[]>("/assignments/my-children");
}

export function createTherapySession(payload: CreateTherapySessionPayload) {
  return apiFetch<TherapySession>("/therapy/sessions", { method: "POST", body: JSON.stringify(payload) });
}

export function listTherapySessions(userId?: string) {
  const params = userId ? `?${new URLSearchParams({ userId })}` : "";
  return apiFetch<TherapySession[]>(`/therapy/sessions${params}`);
}

export function updateTherapySession(id: string, payload: UpdateTherapySessionPayload) {
  return apiFetch<TherapySession>(`/therapy/sessions/${id}`, { method: "PATCH", body: JSON.stringify(payload) });
}

export function createProgress(payload: CreateProgressPayload) {
  return apiFetch<Progress>("/therapy/progress", { method: "POST", body: JSON.stringify(payload) });
}

export function listProgress(userId?: string) {
  const params = userId ? `?${new URLSearchParams({ userId })}` : "";
  return apiFetch<Progress[]>(`/therapy/progress${params}`);
}
