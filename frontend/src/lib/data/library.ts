"use client";

/* Админы нэмсэн дууны мета (IndexedDB-той хосолсон, client-талын custom track) +
   сонсолтын статистикийн ОРОН НУТГИЙН КЭШ.

   Үе шат 1 (ROADMAP-7-PHASES.md): дуртай/хадгалсан/playlist/төлбөр эх сурвалжаа
   backend руу (`lib/api/client.ts`) шилжүүлсэн тул тэдгээрийн localStorage функцууд
   энд байхаа больсон. `loadStats`/`saveStats` ЗӨВХӨН session доторх секунд тутмын UI
   тоолуур (`useListeningStats`) — эх сурвалж бол `GET /me/stats` (backend aggregate),
   энэ нь сүлжээгүй үед харуулах сүүлийн мэдэгдэх утга (кэш). */
import { idbDel } from "./idb";
import { APP_EVENTS, emitAppEvent } from "./events";
import { readJson, writeJson } from "./storage";
import { GLOBAL_KEYS, userStorageKey } from "./storage-keys";
import type { ListeningStats, Track } from "@/types/track";
import type { Song } from "@/types/song";

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

/* ---- сонсолтын статистикийн орон нутгийн кэш ---- */
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

/* ---- GET /songs-ийн offline fallback кэш ----
   Сүлжээгүй үед (эсвэл backend түр унтарсан үед) сүүлд амжилттай татсан каталогийг
   харуулах зорилготой — эх сурвалж үргэлж backend, энэ зөвхөн сүлжээгүй үеийн сүүлийн
   мэдэгдэх утга (`loadStats`-тай ижил зарчим, см. дээрх толгойн тайлбар). */
export function loadSongsCache(): Song[] {
  return readJson<Song[]>(GLOBAL_KEYS.songsCache, []);
}
export function saveSongsCache(songs: Song[]) {
  writeJson(GLOBAL_KEYS.songsCache, songs);
}
