import { API_URL } from "@/lib/config";
import { NetworkError } from "./offline";
import type {
  AdminUserRow,
  Artist,
  HistoryPage,
  LibraryState,
  ListeningStats,
  Playlist,
  SensoryProfile,
  SessionUser,
  Song,
  TrackAction,
  UserRole,
  UserStatus,
} from "@/types";

/* Вэбийн `frontend/src/lib/api/client.ts`-ийн бүтцийг хадгалсан RN хувилбар.

   Ижил үлдсэн зүйл: санах ойд хадгалагдах access token, 401 дээр НЭГ УДАА refresh
   хийж хүсэлтээ давтах, зэрэг явсан refresh-үүдийг single-flight-аар нийлүүлэх.

   ЯЛГАА — refresh token:
   Backend нь refresh token-ыг ЗӨВХӨН httpOnly cookie-гоор өгдөг, хариуны body-д
   хэзээ ч буцаадаггүй (backend/src/auth/auth.controller.ts). Вэб дээр үүнийг
   браузер өөрөө зөөдөг. RN-д ч гэсэн fetch нь платформын cookie сангаар
   (Android: OkHttp CookieManager, iOS: NSHTTPCookieStorage) дамждаг тул нэмэлт
   код шаардлагагүй — backend-ийг ӨӨРЧЛӨХГҮЙГЭЭР ажиллана.

   ⚠️ Гэхдээ энэ cookie нь системийн санд хадгалагддаг тул апп устгахад алга болно.
   Хэрэв "нэвтэрсэн хэвээр байх" нь тогтворгүй байвал backend-д refresh token-ыг
   body-гоор БАС буцаах сонголт нэмж, expo-secure-store-д хадгалах хэрэгтэй. */

const BASE_URL = API_URL;

let accessToken: string | null = null;
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

/** Сесс дуусахад (refresh ч бүтэлгүйтэхэд) дуудагдана — `_layout.tsx` үүнийг
 *  сонсож нэвтрэх дэлгэц рүү буцаана. Вэб дээрх CustomEvent-ийн орлуулга:
 *  RN-д DOM event байхгүй тул энгийн listener жагсаалт. */
type SessionExpiredListener = () => void;
const sessionExpiredListeners = new Set<SessionExpiredListener>();

export function onSessionExpired(fn: SessionExpiredListener): () => void {
  sessionExpiredListeners.add(fn);
  return () => sessionExpiredListeners.delete(fn);
}

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

  /* `fetch` нь СЕРВЕР ХҮРТЭЛ хүрч чадаагүй үед (сүлжээгүй, DNS, холболт татгалзсан)
     `TypeError: Network request failed` шиддэг. Энэ нь серверийн буцаасан 4xx/5xx
     алдаанаас ҮНДСЭНДЭЭ ӨӨР: тэнд сервер ажиллаж, бодит хариу өгсөн байдаг.

     Хоёуланг нь ялгахгүй бол офлайн кэш нь серверийн жинхэнэ алдааг ч хуучин
     өгөгдлөөр нууж, хэрэглэгчийг төөрөгдүүлнэ. Иймд энд тодорхой төрөл болгоно. */
  let res: Response;
  try {
    res = await fetch(BASE_URL + path, { ...opts, headers, credentials: "include" });
  } catch (e) {
    throw new NetworkError(e);
  }

  if (res.status === 401 && retry && path !== "/auth/refresh") {
    if (tokenGeneration !== sentWithGeneration) return apiFetch<T>(path, opts, false);
    const refreshed = await refresh().catch(() => null);
    if (refreshed) return apiFetch<T>(path, opts, false);
    applyAccessToken(null);
    sessionExpiredListeners.forEach((fn) => fn());
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}) as { message?: string });
    throw new Error(body.message || `Алдаа гарлаа (${res.status})`);
  }

  /* NestJS handler `null` буцаахад 204 биш, ХООСОН body-тай 200 ирдэг — шууд
     res.json() дуудвал "Unexpected end of JSON input" гэж унана. */
  if (res.status === 204) return null as T;
  const text = await res.text();
  if (!text) return null as T;
  return JSON.parse(text) as T;
}

export async function login(email: string, password: string): Promise<SessionUser> {
  const data = await apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  applyAccessToken(data.accessToken);
  return data.user;
}

export async function register(name: string, email: string, password: string, password2: string): Promise<SessionUser> {
  const data = await apiFetch<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password, password2 }),
  });
  applyAccessToken(data.accessToken);
  return data.user;
}

export function refresh(): Promise<SessionUser> {
  if (refreshInFlight) return refreshInFlight;

  const inFlight = (async () => {
    const data = await apiFetch<AuthResponse>("/auth/refresh", { method: "POST" }, false);
    applyAccessToken(data.accessToken);
    return data.user;
  })().finally(() => {
    refreshInFlight = null;
  });

  refreshInFlight = inFlight;
  return inFlight;
}

export async function logout(): Promise<void> {
  await apiFetch<void>("/auth/logout", { method: "POST" }).catch(() => {});
  applyAccessToken(null);
}

export function me(): Promise<SessionUser> {
  return apiFetch<SessionUser>("/auth/me");
}

/* ---- каталог ----

   ⚠️ `/songs/catalog` БИШ. Тэр endpoint нь `@Roles(...CATALOG_ROLES)`-оор хамгаалагдсан
   АДМИНЫ удирдлагын жагсаалт — энгийн USER 403 "Insufficient role" авна.
   Хэрэглэгчид зориулсан нийтийн жагсаалт нь `@Public()` `GET /songs`
   (backend/src/songs/songs.controller.ts:89). */

export function fetchSongs(): Promise<Song[]> {
  return apiFetch<Song[]>("/songs");
}

/** `GET /songs/:id` (@Public) — жагсаалтад ирдэггүй бүрэн талбарууд (ялангуяа
 *  `beatTimestamps`) энд байна. */
export function fetchSong(id: string): Promise<Song> {
  return apiFetch<Song>(`/songs/${id}`);
}

export function fetchArtists(): Promise<Artist[]> {
  return apiFetch<Artist[]>("/artists");
}

export function fetchArtist(id: string): Promise<Artist> {
  return apiFetch<Artist>(`/artists/${id}`);
}

export function fetchArtistSongs(id: string): Promise<Song[]> {
  return apiFetch<Song[]>(`/artists/${id}/songs`);
}

export function fetchFeatured(): Promise<Song[]> {
  return apiFetch<Song[]>("/songs/featured");
}

export function fetchPopular(): Promise<Song[]> {
  return apiFetch<Song[]>("/songs/popular");
}

export function health(): Promise<{ ok: boolean }> {
  return apiFetch<{ ok: boolean }>("/health");
}

/* ---- мэдрэхүйн калибровк (серверт хадгалагдана) ---- */

export function fetchSensoryProfile(): Promise<SensoryProfile> {
  return apiFetch<SensoryProfile>("/me/sensory-profile");
}

/** PUT — хэсэгчилсэн шинэчлэл дэмжинэ (`UpdateSensoryProfileDto` бүх талбар optional). */
export function saveSensoryProfile(patch: Partial<SensoryProfile>): Promise<SensoryProfile> {
  return apiFetch<SensoryProfile>("/me/sensory-profile", { method: "PUT", body: JSON.stringify(patch) });
}

/* ---- миний сан ---- */

export function fetchLibrary(): Promise<LibraryState> {
  return apiFetch<LibraryState>("/me/library");
}

/** Дуртай/хадгалсанд НЭМЭХ. Backend нь `{ songId, action }` хүлээдэг. */
export function addAction(songId: string, action: TrackAction): Promise<void> {
  return apiFetch<void>("/me/actions", { method: "POST", body: JSON.stringify({ songId, action }) });
}

/** ⚠️ POST-оос ЯЛГААТАЙ: backend нь DELETE дээр `@Query('songId')` / `@Query('action')`
 *  уншдаг, body УНШДАГГҮЙ (backend/src/library/library.controller.ts).
 *
 *  Body илгээвэл сервер `undefined`-аар устгах гэж оролдоод, дотроо `.catch(() => {})`
 *  -аар алдааг залгиж **200 буцаана — гэтэл юу ч устгагдахгүй**. Өөрөөр хэлбэл
 *  дуртайгаас хасах нь чимээгүй бүтэлгүйтдэг. Бодитоор туршиж илрүүлсэн. */
export function removeAction(songId: string, action: TrackAction): Promise<void> {
  const qs = `songId=${encodeURIComponent(songId)}&action=${encodeURIComponent(action)}`;
  return apiFetch<void>(`/me/actions?${qs}`, { method: "DELETE" });
}

export function fetchStats(): Promise<ListeningStats> {
  return apiFetch<ListeningStats>("/me/stats");
}

/* Сонсголын түүх бичих. `GET /me/stats` нь БҮХЭЛДЭЭ `ListenHistory`-оос тооцогддог
   (backend/src/library/library.service.ts:81) тул энэ дуудлага байхгүй бол
   Статистик дэлгэц үүрд 0 харуулна.

   `vibrations` нь Статистик дэлгэцийн "чичиргээ" тоолуурыг тэжээнэ
   (`count({ vibrations: true })`) — энэ бол уг төслийн гол хэмжүүр. */
export function postHistory(
  songId: string,
  durationMs: number,
  opts: { bpm?: number | null; vibrations?: boolean } = {},
): Promise<void> {
  return apiFetch<void>("/history", {
    method: "POST",
    body: JSON.stringify({
      songId,
      durationMs: Math.max(0, Math.round(durationMs)),
      ...(opts.bpm ? { bpm: opts.bpm } : {}),
      ...(opts.vibrations !== undefined ? { vibrations: opts.vibrations } : {}),
    }),
  });
}

/** Сонссон түүх. Хариу нь `{ items, total }` — массив БИШ (бодитоор шалгасан). */
export function fetchHistory(page = 1, limit = 30): Promise<HistoryPage> {
  return apiFetch<HistoryPage>(`/history?page=${page}&limit=${limit}`);
}

export function deleteHistory(id: string): Promise<void> {
  return apiFetch<void>(`/history/${id}`, { method: "DELETE" });
}

export function fetchPlaylists(): Promise<Playlist[]> {
  return apiFetch<Playlist[]>("/playlists");
}

export function createPlaylist(name: string): Promise<Playlist> {
  return apiFetch<Playlist>("/playlists", { method: "POST", body: JSON.stringify({ name }) });
}

export function renamePlaylist(id: string, name: string): Promise<Playlist> {
  return apiFetch<Playlist>(`/playlists/${id}`, { method: "PATCH", body: JSON.stringify({ name }) });
}

export function deletePlaylist(id: string): Promise<void> {
  return apiFetch<void>(`/playlists/${id}`, { method: "DELETE" });
}

export function addPlaylistTrack(playlistId: string, songId: string): Promise<void> {
  return apiFetch<void>(`/playlists/${playlistId}/tracks`, {
    method: "POST",
    body: JSON.stringify({ songId }),
  });
}

/** Устгах нь зам дахь параметрээр — `/me/actions`-ээс ЯЛГААТАЙ нь энд body хэрэггүй. */
export function removePlaylistTrack(playlistId: string, songId: string): Promise<void> {
  return apiFetch<void>(`/playlists/${playlistId}/tracks/${songId}`, { method: "DELETE" });
}

/* ---- админ ----

   Эрхийн хил (backend/src/common/guards/roles.guard.ts — ROOT нь бүх @Roles()-ийг давна):
     · GET    /users              → ADMIN
     · PATCH  /users/:id/role     → ЗӨВХӨН ROOT
     · PATCH  /users/:id/status   → ЗӨВХӨН ROOT
   UI эдгээрийг хүндэтгэх ёстой, эс бөгөөс хэрэглэгч 403 авах товч харна. */

export function fetchUsers(): Promise<AdminUserRow[]> {
  return apiFetch<AdminUserRow[]>("/users");
}

/* ⚠️ Эдгээр PATCH-ууд бүтэн `AdminUserRow` БИШ, зөвхөн товч баталгаа буцаадаг
   (бодитоор шалгасан: `{ id, name, email, status }`). Тиймээс дуудагч тал хариуг
   жагсаалтдаа шууд оруулж болохгүй — өөрчилсөн талбараа өөрөө шинэчлэх ёстой. */
export interface UserMutationResult {
  id: string;
  name: string;
  email: string;
  role?: UserRole;
  status?: UserStatus;
}

export function updateUserRole(id: string, role: UserRole): Promise<UserMutationResult> {
  return apiFetch<UserMutationResult>(`/users/${id}/role`, {
    method: "PATCH",
    body: JSON.stringify({ role }),
  });
}

export function updateUserStatus(id: string, status: UserStatus): Promise<UserMutationResult> {
  return apiFetch<UserMutationResult>(`/users/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}
