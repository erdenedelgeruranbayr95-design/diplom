/* localStorage-ийн бүх түлхүүрийн ганц бүртгэл.

   Урьд нь "medreh_likes:" + email гэсэн мөрүүд Player.tsx, library.ts, auth-storage.ts,
   admin-sub-overrides.ts зэрэгт тарж бичигдсэн байсан тул нэгийг нь өөрчлөхөд нөгөө нь
   мартагдах эрсдэлтэй байв. Түлхүүрийн УТГА огт өөрчлөгдөөгүй — зөвхөн нэг газар цугларав. */

/** Хэрэглэгчээс хамааралгүй (глобал) түлхүүрүүд. */
export const GLOBAL_KEYS = {
  customTracks: "medreh_custom_tracks",
} as const;

/** Хэрэглэгч тус бүрийн түлхүүрийн угтвар — `<prefix>:<email>` хэлбэрээр ашиглана. */
export const USER_KEY_PREFIX = {
  likes: "medreh_likes",
  saves: "medreh_saves",
  prefs: "medreh_prefs",
  stats: "medreh_stats",
  payments: "medreh_payments",
  playlists: "medreh_playlists",
} as const;

export type UserKeyName = keyof typeof USER_KEY_PREFIX;

/** `medreh_likes:hi@mail.com` маягийн бүрэн түлхүүр үүсгэнэ. */
export function userStorageKey(name: UserKeyName, email: string): string {
  return `${USER_KEY_PREFIX[name]}:${email}`;
}
