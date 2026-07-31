"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DEFAULT_PREFS } from "@/lib/player/constants";
import { loadStats } from "@/lib/data/library";
import { readJson, writeJson } from "@/lib/data/storage";
import { userStorageKey } from "@/lib/data/storage-keys";
import type { Prefs } from "@/types/player";
import type { ListeningStats } from "@/types/track";

/* Хэрэглэгчийн локал сан: дуртай · хадгалсан · тохиргоо · сонсолтын статистик.

   Урьд нь Player.tsx дотор 3 түлхүүрийн мөр, 3 try/catch блок, 3 setState, мөн
   toggleLike/toggleSave/updatePrefs гэсэн 3 функц тарсан байдалтай байсан. Эдгээр нь
   бүгд нэг л сэдэв — "нэвтэрсэн хэрэглэгчийн localStorage сан" — тул нэг hook болов. */

export interface UserLibrary {
  /** Нэвтэрсэн хэрэглэгчийн имэйл (сангийн бүх түлхүүрийн хамрах хүрээ). */
  email: string;
  likedIds: (number | string)[];
  savedIds: (number | string)[];
  prefs: Prefs;
  /** localStorage-оос уншиж дуусах хүртэл `false` — калибровкийн санал үүнийг хүлээнэ. */
  prefsReady: boolean;
  /** Сонсолтын статистик — секунд тутам мутаци хийгддэг тул ref (re-render үүсгэхгүй). */
  statsRef: React.MutableRefObject<ListeningStats | null>;
  toggleLike: (id: number | string) => void;
  toggleSave: (id: number | string) => void;
  updatePrefs: (patch: Partial<Prefs>) => void;
}

export function useUserLibrary(email: string): UserLibrary {
  const [likedIds, setLikedIds] = useState<(number | string)[]>([]);
  const [savedIds, setSavedIds] = useState<(number | string)[]>([]);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS as Prefs);
  const [prefsReady, setPrefsReady] = useState(false);
  const statsRef = useRef<ListeningStats | null>(null);

  const likesKey = userStorageKey("likes", email);
  const savesKey = userStorageKey("saves", email);
  const prefsKey = userStorageKey("prefs", email);

  useEffect(() => {
    if (!email) return;
    setLikedIds(readJson<(number | string)[]>(likesKey, []));
    setSavedIds(readJson<(number | string)[]>(savesKey, []));

    const stored = readJson<Partial<Prefs> | null>(prefsKey, null);
    setPrefs(
      stored
        ? ({ ...DEFAULT_PREFS, ...stored, bands: { ...DEFAULT_PREFS.bands, ...stored.bands } } as Prefs)
        : (DEFAULT_PREFS as Prefs),
    );

    statsRef.current = loadStats(email);
    setPrefsReady(true);
  }, [likesKey, savesKey, prefsKey, email]);

  const toggleLike = useCallback(
    (id: number | string) => {
      setLikedIds((prev) => {
        const next = prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev];
        writeJson(likesKey, next);
        return next;
      });
    },
    [likesKey],
  );

  const toggleSave = useCallback(
    (id: number | string) => {
      setSavedIds((prev) => {
        const next = prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev];
        writeJson(savesKey, next);
        return next;
      });
    },
    [savesKey],
  );

  const updatePrefs = useCallback(
    (patch: Partial<Prefs>) => {
      setPrefs((prev) => {
        const next = { ...prev, ...patch, bands: { ...prev.bands, ...(patch.bands || {}) } };
        /* Дор хаяж нэг давтамжийн бүс идэвхтэй байх ёстой — бүгдийг унтраавал
           чичиргээ хэзээ ч ажиллахгүй болно. */
        if (!next.bands.bass && !next.bands.mid && !next.bands.high) return prev;
        writeJson(prefsKey, next);
        return next;
      });
    },
    [prefsKey],
  );

  return { email, likedIds, savedIds, prefs, prefsReady, statsRef, toggleLike, toggleSave, updatePrefs };
}
