/* Вэбийн `frontend/src/lib/player/constants.tsx`-ээс хуулагдсан (зөвхөн UI-гүй хэсэг —
   тэнд JSX икон байдаг тул .tsx, энд .ts). Утга өөрчлөгдвөл хоёр газарт засна. */

export const VIB_LEVELS = [
  { label: "Сул", mult: 0.5 },
  { label: "Дунд", mult: 1 },
  { label: "Хүчтэй", mult: 1.7 },
];

export const DEFAULT_PREFS = {
  vib: 1,
  bands: { bass: true, mid: true, high: true },
  calibrated: false,
};

export type Prefs = typeof DEFAULT_PREFS;
