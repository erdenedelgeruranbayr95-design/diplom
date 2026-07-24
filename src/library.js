/* Дууны сан (админы нэмсэн) + мэдэгдлийн feed-ийн туслах функцууд */
import { idbDel } from './idb.js'

const META_KEY = 'medreh_custom_tracks'
const FEED_KEY = 'medreh_feed'

/* ---- админы нэмсэн дууны мета ---- */
export function loadCustomMeta() {
  try { return JSON.parse(localStorage.getItem(META_KEY)) || [] } catch { return [] }
}
export function saveCustomMeta(list) {
  localStorage.setItem(META_KEY, JSON.stringify(list))
  dispatchEvent(new CustomEvent('medreh:library-changed'))
}
export async function removeCustomTrack(id) {
  const list = loadCustomMeta().filter((t) => t.id !== id)
  await idbDel('audio-' + id).catch(() => {})
  await idbDel('cover-' + id).catch(() => {})
  saveCustomMeta(list)
}

/* ---- мэдэгдлийн feed (бүх хэрэглэгчид харагдана) ---- */
export function loadFeed() {
  try { return JSON.parse(localStorage.getItem(FEED_KEY)) || [] } catch { return [] }
}
export function pushFeed(text, icon = '🎵') {
  const list = [{ id: Date.now(), text, icon, date: Date.now() }, ...loadFeed()].slice(0, 30)
  localStorage.setItem(FEED_KEY, JSON.stringify(list))
  dispatchEvent(new CustomEvent('medreh:feed-changed'))
}
export function seedFeed() {
  if (loadFeed().length === 0) {
    pushFeed('МЭДРЭХ-д тавтай морил! Дуугаа сонгоод мэдэрч эхлээрэй', '🎉')
  }
}
export function getReadTs(email) {
  return +(localStorage.getItem('medreh_feed_read:' + email) || 0)
}
export function markFeedRead(email) {
  localStorage.setItem('medreh_feed_read:' + email, String(Date.now()))
}

/* ---- сонсолтын статистик ---- */
const STATS_DEFAULT = { total: 0, vib: 0, byGenre: {}, byTrack: {}, days: {} }
export function loadStats(email) {
  try {
    return { ...STATS_DEFAULT, ...(JSON.parse(localStorage.getItem('medreh_stats:' + email)) || {}) }
  } catch { return { ...STATS_DEFAULT } }
}
export function saveStats(email, stats) {
  localStorage.setItem('medreh_stats:' + email, JSON.stringify(stats))
}
export function todayKey(d = new Date()) {
  return d.toISOString().slice(0, 10)
}

/* ---- төлбөрийн түүх ---- */
export function loadPayments(email) {
  try { return JSON.parse(localStorage.getItem('medreh_payments:' + email)) || [] } catch { return [] }
}
export function pushPayment(email, entry) {
  const list = [entry, ...loadPayments(email)]
  localStorage.setItem('medreh_payments:' + email, JSON.stringify(list))
}

/* ---- playlist (хэрэглэгч бүрд) ---- */
const plKey = (email) => 'medreh_playlists:' + email
export function loadPlaylists(email) {
  try { return JSON.parse(localStorage.getItem(plKey(email))) || [] } catch { return [] }
}
function savePlaylists(email, list) {
  localStorage.setItem(plKey(email), JSON.stringify(list))
  dispatchEvent(new CustomEvent('medreh:playlists-changed'))
}
export function createPlaylist(email, name) {
  const pl = { id: 'pl' + Date.now(), name, tracks: [], created: Date.now() }
  savePlaylists(email, [pl, ...loadPlaylists(email)])
  return pl
}
export function deletePlaylist(email, id) {
  savePlaylists(email, loadPlaylists(email).filter((p) => p.id !== id))
}
export function renamePlaylist(email, id, name) {
  const list = loadPlaylists(email)
  const p = list.find((x) => x.id === id)
  if (p) { p.name = name; savePlaylists(email, list) }
}
export function addToPlaylist(email, id, trackId) {
  const list = loadPlaylists(email)
  const p = list.find((x) => x.id === id)
  if (p && !p.tracks.includes(trackId)) { p.tracks = [trackId, ...p.tracks]; savePlaylists(email, list) }
}
export function removeFromPlaylist(email, id, trackId) {
  const list = loadPlaylists(email)
  const p = list.find((x) => x.id === id)
  if (p) { p.tracks = p.tracks.filter((t) => t !== trackId); savePlaylists(email, list) }
}
