"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DEFAULT_PREFS } from "@/lib/player/constants";
import * as api from "@/lib/api/client";
import type { Prefs } from "@/types/player";
import type { ListeningStats } from "@/types/track";

/* Хэрэглэгчийн сан: дуртай · хадгалсан · тохиргоо · сонсолтын статистик.

   Үе шат 1 (ROADMAP-7-PHASES.md): localStorage-ийн оронд backend API ашиглана —
   `GET/POST/DELETE /me/actions`, `GET /me/stats`, `PUT /me/sensory-profile`-ийн
   `bands`/`calibrated`-г prefs-ийн нэг хэсэг болгон дамжуулна. Hook-ийн ГАДААД
   интерфейс (буцаах утга, функцийн нэр) яг хэвээр — дуудагч тал өөрчлөгдөхгүй.

   Зөвхөн backend Song (cuid-тэй) дээр л like/save хийж болно — static каталог/
   IndexedDB-ийн клиент-талын синтетик ID-тай дуунууд FK холбоо байгуулах
   боломжгүй тул API дуудлагыг чимээгүй алгасна (сонголт нь backend жагсаалт
   руу нарийсах хүртэл түр зуурын хязгаарлалт). */

function isBackendId(id: number | string): id is string {
  return typeof id === "string";
}

export interface UserLibrary {
  /** Нэвтэрсэн хэрэглэгчийн имэйл. */
  email: string;
  likedIds: (number | string)[];
  savedIds: (number | string)[];
  prefs: Prefs;
  /** Backend-ээс уншиж дуусах хүртэл `false` — калибровкийн санал үүнийг хүлээнэ. */
  prefsReady: boolean;
  /** Сонсолтын статистик — секунд тутам мутаци хийгддэг тул ref (re-render үүсгэхгүй). */
  statsRef: React.MutableRefObject<ListeningStats | null>;
  toggleLike: (id: number | string) => void;
  toggleSave: (id: number | string) => void;
  updatePrefs: (patch: Partial<Prefs>) => void;
}

const STATS_DEFAULT: ListeningStats = { total: 0, vib: 0, byGenre: {}, byTrack: {}, days: {} };

export function useUserLibrary(email: string): UserLibrary {
  const [likedIds, setLikedIds] = useState<(number | string)[]>([]);
  const [savedIds, setSavedIds] = useState<(number | string)[]>([]);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS as Prefs);
  const [prefsReady, setPrefsReady] = useState(false);
  const statsRef = useRef<ListeningStats | null>(null);

  useEffect(() => {
    if (!email) return;
    let alive = true;

    Promise.all([api.getLibrary(), api.getSensoryProfile(), api.getMyStats()])
      .then(([library, sensory, stats]) => {
        if (!alive) return;
        setLikedIds(library.likedIds);
        setSavedIds(library.savedIds);
        setPrefs((prev) => ({
          ...prev,
          vib: sensory.vibLevel,
          light: sensory.lightLevel,
          bands: { ...DEFAULT_PREFS.bands, ...sensory.bands },
          calibrated: sensory.calibrated,
          deviceMap: sensory.deviceMap ?? undefined,
        }));
        statsRef.current = { ...STATS_DEFAULT, ...stats };
      })
      .catch(() => {
        if (!alive) return;
        statsRef.current = STATS_DEFAULT;
      })
      .finally(() => {
        if (alive) setPrefsReady(true);
      });

    return () => {
      alive = false;
    };
  }, [email]);

  const toggleLike = useCallback((id: number | string) => {
    setLikedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev];
      if (isBackendId(id)) {
        const action = next.includes(id) ? api.addTrackAction(id, "LIKE") : api.removeTrackAction(id, "LIKE");
        action.catch(() => {});
      }
      return next;
    });
  }, []);

  const toggleSave = useCallback((id: number | string) => {
    setSavedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev];
      if (isBackendId(id)) {
        const action = next.includes(id) ? api.addTrackAction(id, "SAVE") : api.removeTrackAction(id, "SAVE");
        action.catch(() => {});
      }
      return next;
    });
  }, []);

  const updatePrefs = useCallback((patch: Partial<Prefs>) => {
    setPrefs((prev) => {
      const next = { ...prev, ...patch, bands: { ...prev.bands, ...(patch.bands || {}) } };
      /* Дор хаяж нэг давтамжийн бүс идэвхтэй байх ёстой — бүгдийг унтраавал
         чичиргээ хэзээ ч ажиллахгүй болно. */
      if (!next.bands.bass && !next.bands.mid && !next.bands.high) return prev;
      api
        .putSensoryProfile({
          vibLevel: next.vib,
          lightLevel: next.light,
          bands: next.bands,
          deviceMap: next.deviceMap,
          calibrated: next.calibrated,
        })
        .catch(() => {});
      return next;
    });
  }, []);

  return { email, likedIds, savedIds, prefs, prefsReady, statsRef, toggleLike, toggleSave, updatePrefs };
}
