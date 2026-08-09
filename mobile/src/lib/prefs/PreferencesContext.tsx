import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { storage, storageIsPersistent } from "@/lib/storage";

/* Хэрэглэгчийн тохиргоо — төхөөрөмж дээр байнга хадгалагдана.

   ЯАГААД ХЭРЭГТЭЙ ВЭ
   Урьд нь чичиргээний хүч (`vibLevel`) тоглуулагчийн дотоод төлөв байсан тул
   дуу солих бүрд "Дунд" рүү тэглэгддэг байв. Сонсголгүй хэрэглэгч өөрт тохирсон
   эрчмээ тааруулсан ч дараагийн дуунд алга болно — энэ апп-д тэр нь ноцтой:
   мэдрэхүйн тохиргоо бол хувь хүний тогтвортой хэрэгцээ, түр сонголт биш.

   Вэб хувилбар үүнийг localStorage-д хадгалдаг (lib/data/storage-keys.ts);
   RN-д AsyncStorage нь тэрхүү эквивалент.

   ⚠️ Фонтын хэмжээг ЗОРИУД оруулаагүй. Вэбэд `--text-scale` тохиргоо байдаг ч
   RN-ийн `<Text>` нь `allowFontScaling` өгөгдмөлөөр асаалттай тул СИСТЕМИЙН
   фонтын хэмжээг аль хэдийн дагадаг. Хэрэглэгч Android-ийн тохиргоонд нэг удаа
   томруулбал бүх аппд үйлчилнэ — апп доторх давхар тохиргоо нь тэрнээс МУУ
   практик (хоёр эх сурвалж зөрнө). */

const STORAGE_KEY = "medreh.prefs.v1";

/* Хадгалалтын аюулгүй ачаалалт нь `src/lib/storage.ts`-д төвлөрсөн — офлайн кэш
   ч мөн түүнийг хуваалцдаг тул энд хуулбарлахгүй. */
export const preferencesArePersistent = storageIsPersistent;

/** Давтах горим. `off` — дараалал дуусахад зогсоно · `all` — эхнээс нь эргэнэ ·
 *  `one` — тухайн дууг дахин давтана. */
export type RepeatMode = "off" | "all" | "one";

export interface Preferences {
  /** Чичиргээ ерөнхийдөө асаалттай эсэх. */
  vibrationOn: boolean;
  /** `VIB_LEVELS`-ийн индекс: 0 = Сул, 1 = Дунд, 2 = Хүчтэй. */
  vibLevel: number;
  /** Цохилтын визуал пульсийг намдаах — вестибуляр мэдрэмтгий хэрэглэгчид. */
  reducedMotion: boolean;

  /* ⚠️ Давтах/холих нь тоглуулагчийн ДОТООД төлөв БАЙЖ БОЛОХГҮЙ. Дуу солиход
     `router.replace("/player/[id]")` дуудагддаг тул дэлгэц бүхэлдээ дахин үүсдэг
     бөгөөд `useState` дэх утга тэглэгдэнэ. Яг ийм шалтгаанаар `vibLevel` дуу бүр
     дээр "Дунд" рүү буцдаг алдаа өмнө нь гарсан. */
  repeat: RepeatMode;
  shuffle: boolean;
  /** Холих дарааллын үр. Хадгалагдсанаар дэлгэц дахин үүсэх бүрд ИЖИЛ дараалал
   *  гарна — эс бөгөөс «өмнөх дуу» товч утгагүй болно. Холихыг дахин асаах бүрд
   *  шинэчлэгдэнэ. */
  shuffleSeed: number;
}

const DEFAULTS: Preferences = {
  vibrationOn: true,
  vibLevel: 1,
  reducedMotion: false,
  repeat: "off",
  shuffle: false,
  shuffleSeed: 1,
};

interface PreferencesContextValue extends Preferences {
  /** Дискнээс уншиж дууссан эсэх — үүнээс өмнө өгөгдмөл утга үйлчилнэ. */
  ready: boolean;
  setPref: <K extends keyof Preferences>(key: K, value: Preferences[K]) => void;
}

const Ctx = createContext<PreferencesContextValue | null>(null);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<Preferences>(DEFAULTS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    storage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (!raw) return;
        // Хадгалсан бүтэц хуучирсан/эвдэрсэн байж болно — өгөгдмөл дээр давхарлана.
        const saved = JSON.parse(raw) as Partial<Preferences>;
        setPrefs((p) => ({ ...p, ...saved }));
      })
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  const setPref = useCallback(<K extends keyof Preferences>(key: K, value: Preferences[K]) => {
    setPrefs((prev) => {
      const next = { ...prev, [key]: value };
      // Бичилт бүтэлгүйтвэл UI-г буцаахгүй — тохиргоо энэ сесст үйлчилсээр байна.
      storage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});
      return next;
    });
  }, []);

  const value = useMemo(() => ({ ...prefs, ready, setPref }), [prefs, ready, setPref]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePreferences(): PreferencesContextValue {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePreferences-ийг PreferencesProvider дотор л дуудна");
  return ctx;
}
