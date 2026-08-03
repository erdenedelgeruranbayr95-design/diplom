# Дутуу env хувьсагчдыг гараар авах заавар

Энэ баримт нь `backend/.env`, `frontend/.env.local`, `worker/.env`-д одоо байгаа
бүх хувьсагчийг шалгаж, аль нь **хоосон/дутуу**, тэдгээрийг **хаанаас, хэрхэн
гараар авахыг** алхам алхмаар зааж өгнө. Автоматаар (кодоор) авах боломжгүй
зүйлс — Google/Jamendo/Sentry бүгд тухайн компанийн вэбсайт дээр гараар
бүртгүүлж, түлхүүрээ хуулж авах ёстой.

---

## Одоогийн байдал (2026-08-03 байдлаар шалгасан)

| Файл | Хувьсагч | Төлөв |
|---|---|---|
| `backend/.env` | `JAMENDO_CLIENT_ID` | 🔴 Хоосон (заавал биш) |
| `backend/.env` | `SENTRY_DSN` | 🔴 Огт байхгүй (заавал биш) |
| `backend/.env` | `GOOGLE_CLIENT_ID` | ✅ Бүртгэгдсэн |
| `frontend/.env.local` | `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | ✅ Бүртгэгдсэн |
| Бусад бүх хувьсагч | — | ✅ Dev-д хангалттай (доор production-ий шаардлагыг үзнэ үү) |

---

## 1. JAMENDO_CLIENT_ID (заавал биш — нээлттэй эрхийн дуу импортлоход)

**Юунд хэрэгтэй вэ:** Curator Panel-ийн "Jamendo-ноос импортлох" функц (CC
лицензтэй дуу хайх/оруулах) энэ түлхүүргүйгээр ажиллахгүй. Түлхүүргүй үед
Jamendo API "Invalid Client Id" алдаа буцаана — энэ бол алдаа биш, зүгээр л
тохируулаагүй гэсэн үг.

**Хэрхэн авах:**
1. https://developer.jamendo.com/v3.0 руу орно
2. "Sign up" эсвэл "Get API key" товч дарж, имэйлээр үнэгүй бүртгүүлнэ
3. Бүртгэл баталгаажсны дараа Dashboard-с **Client ID**-г хуулна (Client Secret
   хэрэггүй, зөвхөн Client ID)
4. `backend/.env`-ийн `JAMENDO_CLIENT_ID=` мөрөнд тавина:
   ```
   JAMENDO_CLIENT_ID=<таны_авсан_client_id>
   ```
5. Backend-ийг дахин асаана (`npm run start:dev`) — код өөрчлөх шаардлагагүй.

---

## 2. SENTRY_DSN (заавал биш — production алдааны хяналт)

**Юунд хэрэгтэй вэ:** Backend-ийн 500 (гүйцэтгэлийн) алдааг автоматаар Sentry
руу илгээж, dashboard дээр харах боломжтой болгоно. Dev/CI орчинд шаардлагагүй
(тохируулаагүй үед зүгээр л чимээгүй idle байна).

**Хэрхэн авах:**
1. https://sentry.io руу орж, үнэгүй (Developer plan) account үүсгэнэ
2. "Create Project" → Platform: **Node.js** (эсвэл NestJS байвал сонго) сонгоно
3. Project үүсгэсний дараа Sentry танд DSN URL өгнө (жиш.
   `https://xxxxx@o000000.ingest.sentry.io/000000`)
4. `backend/.env`-д шинэ мөр нэмнэ (одоо энэ мөр огт байхгүй байгаа тул шинээр
   бичих хэрэгтэй):
   ```
   SENTRY_DSN=https://xxxxx@o000000.ingest.sentry.io/000000
   ```
5. Backend-ийг дахин асаана — `backend/src/main.ts` энэ хувьсагчийг автоматаар
   таньж Sentry-г идэвхжүүлнэ (кодын өөрчлөлт шаардлагагүй).

---

## 3. GOOGLE_CLIENT_ID / NEXT_PUBLIC_GOOGLE_CLIENT_ID (аль хэдийн бүртгэгдсэн)

Энэ 2 файлд аль хэдийн ижил Client ID бичигдсэн байна — нэмэлт үйлдэл
шаардлагагүй. Хэрэв дахин авах/солих шаардлагатай бол:

1. https://console.cloud.google.com/apis/credentials руу орно
2. "Create Credentials" → "OAuth client ID" → Application type: **Web
   application**
3. "Authorized JavaScript origins"-д frontend-ийн домэйныг нэмнэ
   (`http://localhost:3001` dev-д, жинхэнэ домэйн production-д)
4. Үүссэн **Client ID**-г ХОЁУЛАНД нь адил утгаар бичнэ:
   - `backend/.env` → `GOOGLE_CLIENT_ID=`
   - `frontend/.env.local` → `NEXT_PUBLIC_GOOGLE_CLIENT_ID=`
5. Backend дахин асаах (`npm run start:dev`), frontend **бүрэн дахин build**
   хийх шаардлагатай (`NEXT_PUBLIC_*` нь build-time-д bake хийгддэг тул зөвхөн
   dev server дахин асаахад хангалттай, learn 1450 модулиас дахин compile
   хийгдэнэ — `npm run dev`-ийг зогсоож дахин асаана уу).

---

## 4. Production-д шилжихэд ЗААВАЛ солих secret-үүд

Эдгээр нь одоо dev-зориулсан "жишээ" утгатай (`change_me`, `test_secret_123`,
`dev_local_test_key_12345` гэх мэт) байгаа тул **production дэд бүтэц дээр
ажиллуулахаас өмнө ЗААВАЛ жинхэнэ санамсаргүй утгаар солих ёстой**:

| Хувьсагч | Одоогийн (dev) утга | Production-д яаж үүсгэх |
|---|---|---|
| `JWT_ACCESS_SECRET` | тохируулагдсан (dev) | `openssl rand -base64 48` |
| `COOKIE_SECRET` | тохируулагдсан (dev) | `openssl rand -base64 48` |
| `HAPTIC_CALLBACK_SECRET` | `change_me_dev_secret` | `openssl rand -base64 32` |
| `PAYMENT_WEBHOOK_SECRET` | `test_secret_123` | `openssl rand -base64 32` |
| `HEARING_PROFILE_ENC_KEY` | `dev_local_test_key_12345` | `openssl rand -base64 48` (⚠️ энэ түлхүүрийг ГЭЭХГҮЙ байх ёстой — гээвэл шифрлэгдсэн hearingProfile мэдээлэл сэргээгдэхгүй) |
| `S3_ACCESS_KEY` / `S3_SECRET_KEY` | MinIO dev тестийн утга | Production S3/MinIO серверийн жинхэнэ credential |
| `POSTGRES_PASSWORD` (docker-compose.yml) | `.env.production`-д тохируулна | `openssl rand -base64 32` |

`openssl rand -base64 48` командыг терминалд ажиллуулаад гарсан текстийг
шууд хуулж болно (Windows дээр Git Bash-аас ажиллуулж болно).

---

## 5. QPay/SocialPay жинхэнэ мерчант данс (кодоор бэлдэгдсэн, гэхдээ идэвхжүүлээгүй)

**Юунд хэрэгтэй вэ:** Одоогийн `PAYMENT_WEBHOOK_SECRET` бол зөвхөн webhook
дуудлагыг баталгаажуулах shared-secret — жинхэнэ QPay/SocialPay-тай холбогдох
өөр (илүү том) процесс шаарддаг тул энэ баримтад орохгүй. Хэрэв бодит мөнгөн
гүйлгээ хийх шаардлагатай бол дараах алхмуудыг хийх хэрэгтэй:

1. QPay (https://qpay.mn) эсвэл SocialPay-тай хуулийн этгээдийн мерчант
   гэрээ байгуулна (энэ бол ХҮН/компанийн үйлдэл, кодоор хийх боломжгүй)
2. Тэднээс sandbox → production merchant ID, API key авна
3. `backend/src/payments/`-ийн webhook endpoint-ыг тэдний бодит callback
   форматад тохируулан өргөтгөх (одоогийн `payment-webhook.dto.ts` нь манай
   дотоод норм схем, provider-ийн raw формат биш)

Энэ хэсэг `docs/PRODUCTION-DEPLOYMENT-PLAN.md`-д илүү дэлгэрэнгүй тайлбарлагдсан.
