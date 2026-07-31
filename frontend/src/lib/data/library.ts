"use client";

/* Дууны сан (админы нэмсэн) + мэдэгдлийн feed + статистик + төлбөр + playlist —
   бүгд localStorage дээр суурилсан.

   Түүхий `localStorage.getItem/JSON.parse` дуудлагууд `lib/data/storage.ts`-т,
   түлхүүрийн нэрс `lib/data/storage-keys.ts`-т, event-ийн нэрс `lib/data/events.ts`-т
   төвлөрөв. Энэ файл нь одоо ЗӨВХӨН домэйн үйлдлүүдийг агуулна. */
import { idbDel } from "./idb";
import { APP_EVENTS, emitAppEvent } from "./events";
import { readJson, writeJson } from "./storage";
import { GLOBAL_KEYS, userStorageKey } from "./storage-keys";
import type { ListeningStats, Payment, Playlist, Track } from "@/types/track";

/* ---- админы нэмсэн дууны мета ---- */
export function loadCustomMeta(): Track[] {
  return readJson<Track[]>(GLOBAL_KEYS.customTracks, []);
}
export function saveCustomMeta(list: Track[]) {
  writeJson(GLOBAL_KEYS.customTracks, list);
  emitAppEvent(APP_EVENTS.libraryChanged);
}
export async function removeCustomTrack(id: string | number) {
  const list = loadCustomMeta().filter((t) => t.id !== id);
  await idbDel("audio-" + id).catch(() => {});
  await idbDel("cover-" + id).catch(() => {});
  saveCustomMeta(list);
}

/* ---- сонсолтын статистик ---- */
const STATS_DEFAULT: ListeningStats = { total: 0, vib: 0, byGenre: {}, byTrack: {}, days: {} };

export function loadStats(email: string): ListeningStats {
  return { ...STATS_DEFAULT, ...readJson<Partial<ListeningStats>>(userStorageKey("stats", email), {}) };
}
export function saveStats(email: string, stats: ListeningStats) {
  writeJson(userStorageKey("stats", email), stats);
}
export function todayKey(d: Date = new Date()) {
  return d.toISOString().slice(0, 10);
}

/* ---- төлбөрийн түүх ---- */
export function loadPayments(email: string): Payment[] {
  return readJson<Payment[]>(userStorageKey("payments", email), []);
}
export function pushPayment(email: string, entry: Payment) {
  writeJson(userStorageKey("payments", email), [entry, ...loadPayments(email)]);
}

/* ---- playlist (хэрэглэгч бүрд) ---- */
export function loadPlaylists(email: string): Playlist[] {
  return readJson<Playlist[]>(userStorageKey("playlists", email), []);
}
function savePlaylists(email: string, list: Playlist[]) {
  writeJson(userStorageKey("playlists", email), list);
  emitAppEvent(APP_EVENTS.playlistsChanged);
}
export function createPlaylist(email: string, name: string) {
  const playlist: Playlist = { id: "pl" + Date.now(), name, tracks: [], created: Date.now() };
  savePlaylists(email, [playlist, ...loadPlaylists(email)]);
  return playlist;
}
export function deletePlaylist(email: string, id: string) {
  savePlaylists(
    email,
    loadPlaylists(email).filter((p) => p.id !== id),
  );
}
export function renamePlaylist(email: string, id: string, name: string) {
  const list = loadPlaylists(email);
  const playlist = list.find((p) => p.id === id);
  if (playlist) {
    playlist.name = name;
    savePlaylists(email, list);
  }
}
export function addToPlaylist(email: string, id: string, trackId: number | string) {
  const list = loadPlaylists(email);
  const playlist = list.find((p) => p.id === id);
  if (playlist && !playlist.tracks.includes(trackId)) {
    playlist.tracks = [trackId, ...playlist.tracks];
    savePlaylists(email, list);
  }
}
export function removeFromPlaylist(email: string, id: string, trackId: number | string) {
  const list = loadPlaylists(email);
  const playlist = list.find((p) => p.id === id);
  if (playlist) {
    playlist.tracks = playlist.tracks.filter((t) => t !== trackId);
    savePlaylists(email, list);
  }
}
