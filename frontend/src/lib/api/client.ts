"use client";

/* Backend API холбогч — access token-ийг memory-д хадгална (localStorage биш, XSS эрсдэл багасгах үүднээс),
   refresh token нь httpOnly cookie-д, browser автоматаар илгээнэ.
   Access token нь зөвхөн browser tab-ийн module-level хувьсагчид оршдог тул энэ файл болон
   үүнийг ашигладаг бүх код Client Component-т байх ёстой (Server Component-д унших боломжгүй). */
import { APP_EVENTS } from "@/lib/data/events";
import type {
  AdminUserRow,
  AuditLogRow,
  ChangePasswordPayload,
  CreatedUser,
  CreateUserPayload,
  NotificationFeed,
  NotificationRow,
  ReportRow,
  SessionUser,
  UpdateProfilePayload,
  UserSub,
} from "@/types/auth";
import type {
  AnalyzeSongPayload,
  Artist,
  ArtistWithSongs,
  CreateHistoryPayload,
  FmaSearchResult,
  HistoryPage,
  JamendoSearchResult,
  ListenHistoryRow,
  ListeningStatsRow,
  PaymentRow,
  PlaylistRow,
  SensoryProfile,
  Song,
  SongLicense,
  StorageUsage,
  UpdateSensoryProfilePayload,
  UpdateSongPayload,
  UploadUrlResponse,
  UserLibraryRow,
} from "@/types/song";
import type { QrSessionRow } from "@/types/qr";
import type {
  AssignedPatient,
  CreateProgressPayload,
  CreateTherapySessionPayload,
  LinkedChild,
  ParentLinkRow,
  Progress,
  TherapySession,
  TherapistAssignmentRow,
  UpdateTherapySessionPayload,
} from "@/types/therapy";

// Vercel deploy: NEXT_PUBLIC_API_URL production backend рүү заасан эсэхийг баталгаажуулах
// зорилгоор cache-invalidate хийсэн жижиг тайлбар мөр (build cache хуучин utga-г
// дахин ашиглахаас сэргийлнэ).
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

let accessToken: string | null = null;

/* Токен солигдох бүрд нэмэгддэг тоолуур. Хүсэлт илгээгдсэнээс хойш ӨӨР хүсэлт аль
   хэдийн токеныг сэргээсэн эсэхийг үүгээр мэдэж, шаардлагагүй refresh-ээс сэргийлнэ. */
let tokenGeneration = 0;

function applyAccessToken(token: string | null) {
  accessToken = token;
  tokenGeneration++;
}

export function setAccessToken(token: string | null) {
  applyAccessToken(token);
}
export function getAccessToken() {
  return accessToken;
}

/* Сервер талд refresh нь токеныг ЭРГҮҮЛДЭГ — хуучныг `revoked=true` болгож шинийг
   олгоно (auth.service.ts). Тиймээс хоёр refresh зэрэг явбал нэг нь заавал хуучин
   (аль хэдийн хүчингүй болсон) cookie-гоор очиж 401 авна. Практикт үүнийг StrictMode
   өдөөдөг: AuthProvider-ийн mount effect dev үед 2 удаа ажиллаж, хуудас ачаалах бүрд
   2 refresh зэрэг явуулдаг байв. Доорх single-flight нь зэрэг дуудалтуудыг НЭГ хүсэлт
   болгон нийлүүлж, бүгдэд нь ижил үр дүнг өгнө. */
let refreshInFlight: Promise<SessionUser> | null = null;

interface AuthResponse {
  accessToken: string;
  user: SessionUser;
}

async function apiFetch<T>(path: string, opts: RequestInit = {}, retry = true): Promise<T> {
  const headers: Record<string, string> = { ...((opts.headers as Record<string, string>) || {}) };
  if (!(opts.body instanceof FormData)) headers["Content-Type"] = "application/json";
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
  const sentWithGeneration = tokenGeneration;

  const res = await fetch(BASE_URL + path, { ...opts, headers, credentials: "include" });

  if (res.status === 401 && retry && path !== "/auth/refresh") {
    /* Энэ хүсэлт явсны дараа өөр хүсэлт аль хэдийн токеныг шинэчилсэн бол дахин
       refresh хийх шаардлагагүй (илүү эргүүлэлт хийхгүй) — шинэ токеноор шууд
       дахин оролдоно. */
    if (tokenGeneration !== sentWithGeneration) return apiFetch<T>(path, opts, false);
    const refreshed = await refresh().catch(() => null);
    if (refreshed) return apiFetch<T>(path, opts, false);
    applyAccessToken(null);
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
  applyAccessToken(data.accessToken);
  return data.user;
}

export async function login(email: string, password: string) {
  const data = await apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  applyAccessToken(data.accessToken);
  return data.user;
}

export async function loginWithGoogle(idToken: string) {
  const data = await apiFetch<AuthResponse>("/auth/google", {
    method: "POST",
    body: JSON.stringify({ idToken }),
  });
  applyAccessToken(data.accessToken);
  return data.user;
}

export function refresh(): Promise<SessionUser> {
  /* Аль хэдийн явж буй refresh байвал ШИНЭ хүсэлт үүсгэхгүй, түүнийг нь хуваалцана. */
  if (refreshInFlight) return refreshInFlight;

  const inFlight = (async () => {
    const data = await apiFetch<AuthResponse>("/auth/refresh", { method: "POST" }, false);
    applyAccessToken(data.accessToken);
    return data.user;
  })().finally(() => {
    /* Амжилттай ч, алдаатай ч цоожийг тавина — дараагийн ЖИНХЭНЭ шаардлагатай
       refresh (жишээ нь 15 минутын дараа access token дуусахад) хийгдэх ёстой. */
    refreshInFlight = null;
  });

  refreshInFlight = inFlight;
  return inFlight;
}

export async function logout() {
  await apiFetch("/auth/logout", { method: "POST" }, false).catch(() => {});
  applyAccessToken(null);
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

/* GDPR: өөрийн бүх мэдээллийг JSON болгож татах (Нууцлалын бодлого §5). */
export function exportMyData() {
  return apiFetch<Record<string, unknown>>("/users/me/export");
}

/* GDPR: бүртгэлээ бүрэн устгах — нууц үгээр баталгаажина. */
export function deleteMyAccount(password: string) {
  return apiFetch<{ ok: true }>("/users/me", { method: "DELETE", body: JSON.stringify({ password }) });
}

/* Админ өөр хэрэглэгчийн PRO эрхийг DB-д бодитоор олгоно/хасна. */
export function setUserSubscription(userId: string, active: boolean, plan?: string) {
  return apiFetch<UserSub | null>(`/users/${userId}/subscription`, {
    method: "PATCH",
    body: JSON.stringify({ active, plan }),
  });
}

// ---- ROOT: дүр/төлөв/эрх удирдлага ----
export function setUserRole(userId: string, role: AdminUserRow["role"]) {
  return apiFetch<Pick<AdminUserRow, "id" | "name" | "email" | "role">>(`/users/${userId}/role`, {
    method: "PATCH",
    body: JSON.stringify({ role }),
  });
}

export function setUserStatus(userId: string, status: "ACTIVE" | "BANNED") {
  return apiFetch<Pick<AdminUserRow, "id" | "name" | "email" | "status">>(`/users/${userId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export function resetUserPassword(userId: string) {
  return apiFetch<{ tempPassword: string }>(`/users/${userId}/reset-password`, { method: "POST" });
}

export function listUserSessions(userId: string) {
  return apiFetch<{ id: string; createdAt: string; expiresAt: string }[]>(`/users/${userId}/sessions`);
}

export function revokeUserSessions(userId: string) {
  return apiFetch<{ ok: true }>(`/users/${userId}/sessions`, { method: "DELETE" });
}

// ---- ROOT: аудит лог ----
export function listAuditLog(params?: { actorId?: string; action?: string; page?: number; limit?: number }) {
  const qs = new URLSearchParams();
  if (params?.actorId) qs.set("actorId", params.actorId);
  if (params?.action) qs.set("action", params.action);
  if (params?.page) qs.set("page", String(params.page));
  if (params?.limit) qs.set("limit", String(params.limit));
  const suffix = qs.toString() ? `?${qs}` : "";
  return apiFetch<{ items: AuditLogRow[]; total: number }>(`/audit${suffix}`);
}

// ---- ROOT: файл сан (storage) ----
export function getStorageUsage() {
  return apiFetch<StorageUsage>("/storage/usage");
}

export function cleanupOrphanFiles() {
  return apiFetch<{ deleted: number; bytesFreed: number }>("/storage/cleanup-orphans", { method: "POST" });
}

// ---- ROOT: health/monitoring ----
export function getHealth() {
  return apiFetch<{ ok: true }>("/health");
}

export function getHealthDb() {
  return apiFetch<{ ok: true; latencyMs: number }>("/health/db");
}

export function getRevenue() {
  return apiFetch<{ total: number; count: number }>("/revenue");
}

// ---- ROOT: аюулгүй байдал (Blocked IP · Failed Login) ----
export interface BlockedIpRow {
  ip: string;
  failedCount: number;
  distinctEmails: number;
  lastAttemptAt: string;
}
export interface FailedLoginRow {
  id: string;
  email: string;
  ip: string | null;
  userAgent: string | null;
  createdAt: string;
}
export function getSecurityOverview() {
  return apiFetch<{ blockedIps: BlockedIpRow[]; recentFailedLogins: FailedLoginRow[]; windowMinutes: number }>("/security-overview");
}

export function listAllPayments() {
  return apiFetch<(PaymentRow & { user: { id: string; name: string; email: string } })[]>("/payments");
}

// ---- Moderation ----
export function createReport(payload: { targetType: "song" | "user"; targetId: string; reason: string }) {
  return apiFetch<ReportRow>("/moderation/reports", { method: "POST", body: JSON.stringify(payload) });
}

export function listReports(status?: "OPEN" | "RESOLVED" | "DISMISSED") {
  const suffix = status ? `?status=${status}` : "";
  return apiFetch<ReportRow[]>(`/moderation/reports${suffix}`);
}

export function resolveReport(id: string, status: "RESOLVED" | "DISMISSED") {
  return apiFetch<ReportRow>(`/moderation/reports/${id}/resolve`, { method: "PATCH", body: JSON.stringify({ status }) });
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

// ---- Эцэг эх-хvvхэд холбоос (admin) ----
export function createParentLink(parentId: string, childUserId: string) {
  return apiFetch<ParentLinkRow>("/assignments/parents", {
    method: "POST",
    body: JSON.stringify({ parentId, childUserId }),
  });
}

export function listParentLinks() {
  return apiFetch<ParentLinkRow[]>("/assignments/parents");
}

export function removeParentLink(id: string) {
  return apiFetch<null>(`/assignments/parents/${id}`, { method: "DELETE" });
}

// ---- Songs ----
/** Presigned MinIO upload (эсвэл sourceUrl) дуусаад Song мөр үүсгэнэ — файлын байт
 *  backend дундуур дамжихгүй, зөвхөн `storageKey`/`sourceUrl` (URL) илгээнэ. */
export function createSong(payload: {
  title: string;
  artist?: string;
  genre?: string;
  storageKey?: string;
  sourceUrl?: string;
  license: SongLicense;
  licenseSrc?: string;
}) {
  return apiFetch<Song>("/songs", { method: "POST", body: JSON.stringify(payload) });
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

// ---- Songs: лиценз · нийтлэл · Curator каталог (Phase 5) ----
export function getUploadUrl(filename: string, contentType: string) {
  return apiFetch<UploadUrlResponse>("/songs/upload-url", {
    method: "POST",
    body: JSON.stringify({ filename, contentType }),
  });
}

/** CURATOR/MODERATOR/ADMIN/ROOT — нийтлээгүй drafts-ыг ч оруулаад БҮХ дууг буцаана. */
export function getSongCatalog() {
  return apiFetch<Song[]>("/songs/catalog");
}

export function updateSong(id: string, payload: UpdateSongPayload) {
  return apiFetch<Song>(`/songs/${id}`, { method: "PUT", body: JSON.stringify(payload) });
}

export function publishSong(id: string) {
  return apiFetch<Song>(`/songs/${id}/publish`, { method: "POST" });
}

export function unpublishSong(id: string) {
  return apiFetch<Song>(`/songs/${id}/unpublish`, { method: "POST" });
}

export function getSongScore(id: string) {
  return apiFetch<{ scoreUrl: string | null; analysisStatus: Song["analysisStatus"] }>(`/songs/${id}/score`);
}

/** CURATOR/MODERATOR/ADMIN/ROOT — Jamendo каталогоос хайх. `client_id` тохируулаагүй бол backend 400 буцаана. */
export function searchJamendo(q: string, limit = 20) {
  const params = new URLSearchParams({ q, limit: String(limit) });
  return apiFetch<JamendoSearchResult[]>(`/songs/jamendo/search?${params}`);
}

/** Ижил jamendoId-г 2 дахь удаа импортлоход одоо байгаа Song-ийг idempotent-ээр буцаана. */
export function importJamendoTrack(jamendoId: string) {
  return apiFetch<Song>("/songs/jamendo/import", { method: "POST", body: JSON.stringify({ jamendoId }) });
}

/** CURATOR/MODERATOR/ADMIN/ROOT — Free Music Archive каталогоос хайх. `FMA_API_KEY` тохируулаагүй бол backend 400 буцаана. */
export function searchFma(q: string, limit = 20) {
  const params = new URLSearchParams({ q, limit: String(limit) });
  return apiFetch<FmaSearchResult[]>(`/songs/fma/search?${params}`);
}

/** Ижил fmaId-г 2 дахь удаа импортлоход одоо байгаа Song-ийг idempotent-ээр буцаана. */
export function importFmaTrack(fmaId: string) {
  return apiFetch<Song>("/songs/fma/import", { method: "POST", body: JSON.stringify({ fmaId }) });
}

// ---- Haptic Score (Python worker, librosa) ----
export function getAnalysisStatus(id: string) {
  return apiFetch<{ analysisStatus: "PENDING" | "PROCESSING" | "READY" | "FAILED"; analysisError: string | null; scoreUrl: string | null }>(
    `/songs/${id}/analysis-status`,
  );
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

// ---- Мэдрэхүйн тохиргоо (калибровк) ----
export function getSensoryProfile() {
  return apiFetch<SensoryProfile>("/me/sensory-profile");
}

export function putSensoryProfile(payload: UpdateSensoryProfilePayload) {
  return apiFetch<SensoryProfile>("/me/sensory-profile", { method: "PUT", body: JSON.stringify(payload) });
}

// ---- Дуртай / хадгалсан ----
export function getLibrary() {
  return apiFetch<UserLibraryRow>("/me/library");
}

export function addTrackAction(songId: string, action: "LIKE" | "SAVE") {
  return apiFetch<{ ok: true }>("/me/actions", { method: "POST", body: JSON.stringify({ songId, action }) });
}

export function removeTrackAction(songId: string, action: "LIKE" | "SAVE") {
  const params = new URLSearchParams({ songId, action });
  return apiFetch<{ ok: true }>(`/me/actions?${params}`, { method: "DELETE" });
}

// ---- Сонсолтын статистик ----
export function getMyStats() {
  return apiFetch<ListeningStatsRow>("/me/stats");
}

// ---- Төлбөрийн түүх ----
export function getMyPayments() {
  return apiFetch<PaymentRow[]>("/me/payments");
}

// ---- Playlist ----
export function listPlaylists() {
  return apiFetch<PlaylistRow[]>("/playlists");
}

export function createPlaylistApi(name: string) {
  return apiFetch<PlaylistRow>("/playlists", { method: "POST", body: JSON.stringify({ name }) });
}

export function renamePlaylistApi(id: string, name: string) {
  return apiFetch<PlaylistRow>(`/playlists/${id}`, { method: "PATCH", body: JSON.stringify({ name }) });
}

export function deletePlaylistApi(id: string) {
  return apiFetch<null>(`/playlists/${id}`, { method: "DELETE" });
}

export function addPlaylistTrackApi(id: string, songId: string) {
  return apiFetch<PlaylistRow>(`/playlists/${id}/tracks`, { method: "POST", body: JSON.stringify({ songId }) });
}

export function removePlaylistTrackApi(id: string, songId: string) {
  return apiFetch<{ ok: true }>(`/playlists/${id}/tracks/${songId}`, { method: "DELETE" });
}
