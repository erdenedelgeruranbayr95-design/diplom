import Constants from "expo-constants";

/* Backend-ийн хаяг.

   Вэб дээр `/api` гэсэн харьцангуй зам хангалттай байсан (Next.js rewrite нь
   backend руу дамжуулдаг) — гар утсанд ТЭР БОЛОМЖГҮЙ: апп нь өөрөө сервер биш тул
   БҮТЭН хаяг хэрэгтэй. Мөн бодит утаснаас `localhost` нь УТАСНЫ өөрийг нь заана,
   хөгжүүлэгчийн компьютерийг биш.

   Иймд dev үед Metro сервер өөрийн LAN IP-г `hostUri`-д (жиш. "192.168.10.115:8081")
   дамжуулдгийг ашиглаж, тэр IP дээр backend-ийн 3000 портыг заана — хөгжүүлэгч
   IP-гээ гараар бичих шаардлагагүй, сүлжээ солигдоход өөрөө дагана.

   Production-д EAS build-ийн `EXPO_PUBLIC_API_URL` орчны хувьсагчийг ашиглана
   (`eas.json` → `env`). Энэ нэр `EXPO_PUBLIC_` угтвартай байх ЁСТОЙ, эс бөгөөс
   Expo клиент багц руу оруулдаггүй. */

function devApiUrl(): string | null {
  const hostUri = Constants.expoConfig?.hostUri ?? null;
  if (!hostUri) return null;
  const host = hostUri.split(":")[0];
  if (!host) return null;
  return `http://${host}:3000/api`;
}

export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? devApiUrl() ?? "http://localhost:3000/api";

/* Socket.io нь `/api` угтваргүй, серверийн үндэс дээр сонсдог (backend/src/socket). */
export const WS_URL = API_URL.replace(/\/api$/, "");

/* Seed хийсэн дуунуудын аудио файл нь `frontend/public/tracks/`-д байрладаг статик
   асcет — өөрөөр хэлбэл backend (3000) БИШ, Next.js frontend (3001) түүнийг үйлчилдэг.
   Тиймээс `/tracks/...` замыг frontend-ийн эх рүү заана. */
const devWebUrl = (): string | null => {
  const hostUri = Constants.expoConfig?.hostUri ?? null;
  const host = hostUri?.split(":")[0];
  return host ? `http://${host}:3001` : null;
};

export const WEB_URL = process.env.EXPO_PUBLIC_WEB_URL ?? devWebUrl() ?? "http://localhost:3001";

/* Backend нь `fileUrl`/`coverUrl`-ыг ХАРЬЦАНГУЙ замаар (`/tracks/x.mp3`,
   `/uploads/y.mp3`) буцааж болно. Вэб дээр браузер өөрөө одоогийн эхтэй нийлүүлдэг
   тул асуудалгүй байсан — гар утсанд БҮТЭН URL заавал хэрэгтэй, эс бөгөөс
   `expo-audio` файлыг олохгүй, дуу чимээгүй унана.

   `/uploads/...` нь backend-ийн үйлчилдэг (Next.js rewrite ч тэр рүү дамжуулдаг),
   бусад харьцангуй зам нь frontend-ийн статик асcет. */
/* Backend/worker нь заримдаа `localhost`-той БҮТЭН URL буцаадаг.
   Жишээ нь worker нь ковер зургийг MinIO руу хуулаад
   `http://localhost:9000/medreh-media/covers/...webp` гэж бичдэг
   (`S3_PUBLIC_URL`-ийн өгөгдмөл утга).

   Компьютер дээр энэ ажиллана — УТСАН ДЭЭР `localhost` нь УТСЫГ ӨӨРИЙГ нь заана
   тул зураг хэзээ ч ачаалагдахгүй. Бодитоор тохиолдсон: MinIO-д bucket үүсгэмэгц
   `coverThumbUrl` бөглөгдөж эхэлсэн бөгөөд `SongRow` түүнийг илүүд үздэг тул
   өмнө нь харагдаж байсан ковер зургууд утсан дээр алга болсон.

   Иймд localhost руу заасан хостыг dev серверийн бодит IP-гээр СОЛИНО — портыг
   нь хэвээр үлдээнэ (MinIO 9000, backend 3000 гэх мэт өөр өөр порттой). */
function rewriteLocalhost(url: string): string {
  const host = API_URL.match(/^https?:\/\/([^:/]+)/)?.[1];
  if (!host || host === "localhost" || host === "127.0.0.1") return url;
  return url.replace(/^(https?:\/\/)(localhost|127\.0\.0\.1)(?=[:/]|$)/, `$1${host}`);
}

export function absoluteUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return rewriteLocalhost(url);
  const origin = url.startsWith("/uploads/") ? API_URL.replace(/\/api$/, "") : WEB_URL;
  return origin + (url.startsWith("/") ? url : `/${url}`);
}
