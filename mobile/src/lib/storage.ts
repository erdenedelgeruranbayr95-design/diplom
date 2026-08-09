/* Төхөөрөмж дээрх байнгын хадгалалт.

   ЯАГААД ТУСДАА ФАЙЛ ВЭ
   Энэ логик урьд нь `PreferencesContext.tsx` дотор нуугдаж байсан. Офлайн кэш ч
   мөн ижил хадгалалт шаарддаг тул хоёр газар хуулбарлавал нэгийг нь засахад
   нөгөө нь хоцорно.

   ⚠️ AsyncStorage бол NATIVE модуль. Development build нь JavaScript-ээ Metro-гоос
   авдаг тул JS шинэчлэгдэхэд native тал ХОЦРОХ боломжтой: энэ багцыг нэмэхээс
   ӨМНӨ хийсэн APK дээр ажиллуулбал import үед л апп унана. Мөн Expo Go дотор
   байхгүй байж болзошгүй.

   Иймд шууд import хийхгүй, аюулгүй ачаална. Байхгүй бол санах ойд хадгална —
   тохиргоо тухайн сесст ажиллаж, апп унахгүй. */

export interface KeyValueStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem?(key: string): Promise<void>;
}

const memory = new Map<string, string>();
const memoryStorage: KeyValueStorage = {
  getItem: async (k) => memory.get(k) ?? null,
  setItem: async (k, v) => void memory.set(k, v),
  removeItem: async (k) => void memory.delete(k),
};

function load(): KeyValueStorage {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mod = require("@react-native-async-storage/async-storage");
    const impl = (mod?.default ?? mod) as KeyValueStorage | undefined;
    return impl && typeof impl.getItem === "function" ? impl : memoryStorage;
  } catch {
    return memoryStorage;
  }
}

export const storage: KeyValueStorage = load();

/** Хадгалалт нь аппыг хаасны дараа ч үлдэх эсэх. `false` бол зөвхөн санах ойд —
 *  офлайн кэш тухайн сесст л ажиллана. */
export const storageIsPersistent = storage !== memoryStorage;
