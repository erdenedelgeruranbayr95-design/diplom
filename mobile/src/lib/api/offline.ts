import { storage } from "@/lib/storage";

/* Офлайн горим.

   ЯАГААД ХЭРЭГТЭЙ ВЭ
   Урьд нь сүлжээ тасрахад апп зүгээр л улаан алдаа харуулж, дэлгэц хоосон
   үлддэг байв. Сонсголгүй хэрэглэгчийн хувьд энэ нь ялангуяа муу: тэд аудио
   стриминг бус, аль хэдийн ТАТАГДСАН цохилтын өгөгдөл дээр чичиргээ мэдэрдэг
   тул жагсаалт нь харагдах ёстой.

   ЭНЭ ЮУГ ХИЙДЭГГҮЙ ВЭ
   Аудио файлыг офлайнд хадгалдаггүй. Дуу тоглуулахад сүлжээ л хэрэгтэй хэвээр.
   Энд зөвхөн МЕТАДАТА (дууны жагсаалт, дуучид) кэшлэгдэнэ — хэрэглэгч офлайн
   үедээ ч сангаа үзэж, юу сонсохоо төлөвлөж чадна.

   ⚠️ Шинэ хамаарал (`expo-network`, `netinfo`) ЗОРИУД нэмээгүй. Тэдгээр нь native
   модуль тул одоо байгаа APK дээр import үед л апп унагааж болзошгүй (яг ингэж
   `expo-haptics` дээр тохиолдсон). Оронд нь `fetch`-ийн бүтэлгүйтлээс офлайн
   эсэхийг тогтооно — нэмэлт эрх, нэмэлт build шаардлагагүй. */

/** Сервер хүртэл хүрч ЧАДААГҮЙ (DNS, холболт, timeout). Серверийн буцаасан
 *  алдаанаас (4xx/5xx) ялгаатай — түүнийг кэшээр орлуулах нь БУРУУ, учир нь
 *  сервер ажиллаж байгаа бөгөөд бодит хариу өгсөн. */
export class NetworkError extends Error {
  constructor(cause?: unknown) {
    super("Сүлжээнд холбогдож чадсангүй");
    this.name = "NetworkError";
    this.cause = cause;
  }
}

export function isNetworkError(e: unknown): boolean {
  return e instanceof NetworkError;
}

const PREFIX = "medreh.cache.v1.";

interface Envelope<T> {
  at: number;
  data: T;
}

async function readCache<T>(key: string): Promise<Envelope<T> | null> {
  try {
    const raw = await storage.getItem(PREFIX + key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Envelope<T>;
    // Хуучин/эвдэрсэн бүтэц — кэшгүй мэт үзнэ.
    if (!parsed || typeof parsed.at !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

async function writeCache<T>(key: string, data: T): Promise<void> {
  try {
    await storage.setItem(PREFIX + key, JSON.stringify({ at: Date.now(), data } satisfies Envelope<T>));
  } catch {
    // Диск дүүрсэн ч апп ажиллах ёстой — кэш бол сайжруулалт, шаардлага биш.
  }
}

export interface CachedResult<T> {
  data: T;
  /** Сүлжээ тасарсан тул хадгалсан хуулбараас өглөө. UI үүнийг ХЭЛЭХ ёстой —
   *  хэрэглэгч хуучин өгөгдлийг шинэ гэж эндүүрэх нь болохгүй. */
  fromCache: boolean;
  /** Кэшийн бичигдсэн хугацаа (ms). `fromCache` үнэн үед л утгатай. */
  cachedAt: number | null;
}

/** Сүлжээгээр авахыг оролдоод, ЗӨВХӨН холболтын алдаа гарвал кэш рүү шилжинэ.
 *
 *  Амжилттай бол кэшийг шинэчилнэ. Серверийн алдаа (401, 500 гм) нь ЦААШ
 *  шиднэ — тэр нь бодит асуудал бөгөөд хуучин өгөгдлөөр нуух нь хэрэглэгчийг
 *  төөрөгдүүлнэ. */
export async function cached<T>(key: string, fetcher: () => Promise<T>): Promise<CachedResult<T>> {
  try {
    const data = await fetcher();
    void writeCache(key, data); // хүлээхгүй — дэлгэц шууд гарах ёстой
    return { data, fromCache: false, cachedAt: null };
  } catch (e) {
    if (!isNetworkError(e)) throw e;
    const hit = await readCache<T>(key);
    if (!hit) throw e; // кэш ч байхгүй бол үнэнийг хэлнэ
    return { data: hit.data, fromCache: true, cachedAt: hit.at };
  }
}

/** «5 минутын өмнө» гэх мэт харьцангуй хугацаа. */
export function relativeTime(ms: number | null): string {
  if (!ms) return "";
  const diff = Math.max(0, Date.now() - ms);
  const min = Math.floor(diff / 60_000);
  if (min < 1) return "саяхан";
  if (min < 60) return `${min} минутын өмнө`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} цагийн өмнө`;
  return `${Math.floor(hr / 24)} өдрийн өмнө`;
}
