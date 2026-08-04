/* localStorage-ийн бүх түлхүүрийн ганц бүртгэл.

   Үе шат 1 (ROADMAP-7-PHASES.md): likes/saves/prefs/payments/playlists эх сурвалж
   backend руу шилжсэн тул тэдгээрийн түлхүүрүүд энд байхаа больсон. `stats` ЗӨВХӨН
   session доторх орон нутгийн кэш болгож үлдсэн (`lib/data/library.ts`-ийн толгойн
   комментыг үзнэ үү). */

/** Хэрэглэгчээс хамааралгүй (глобал) түлхүүрүүд. */
export const GLOBAL_KEYS = {
  customTracks: "medreh_custom_tracks",
  songsCache: "medreh_songs_cache",
} as const;

/** Хэрэглэгч тус бүрийн түлхүүрийн угтвар — `<prefix>:<email>` хэлбэрээр ашиглана. */
export const USER_KEY_PREFIX = {
  stats: "medreh_stats",
} as const;

export type UserKeyName = keyof typeof USER_KEY_PREFIX;

/** `medreh_likes:hi@mail.com` маягийн бүрэн түлхүүр үүсгэнэ. */
export function userStorageKey(name: UserKeyName, email: string): string {
  return `${USER_KEY_PREFIX[name]}:${email}`;
}
