# Production байршуулалтын төлөвлөгөө (Үе шат 7)

> Роадмапын Үе шат 7 (Production ажиллагаа)-ийн код-аар хийгдэх боломжтой бүх хэсэг
> (Dockerfile-ууд, docker-compose, CI/CD workflow, backup/restore script, structured
> logging + Sentry, S3 тохиргоо, QPay/SocialPay webhook, Subscription загвар, Нууцлалын
> бодлого хуудас, GDPR export/delete, hearingProfile шифрлэлт) бүгд бичигдэж, бодит
> дэд бүтэц дээр (локал Docker, MinIO, Postgres) туршигдаж баталгаажсан. Энэ баримт нь
> **зөвхөн ХҮН гараар хийх ёстой** үлдсэн алхмуудыг тодорхойлно — код бичих боломжгүй
> зүйлс: жинхэнэ домэйн, жинхэнэ сервер, жинхэнэ мерчант бүртгэл, жинхэнэ мөнгөн гүйлгээ.

## 1. Домэйн ба сервер (заавал, хамгийн эхэнд)

**Хэрэгтэй:**
- Домэйн нэр (жиш. `medreh.mn` эсвэл `.com`) — DNS A/AAAA бичлэгээ серверийн IP рүү заана.
- VPS/сервер (жиш. AWS EC2, DigitalOcean Droplet, Alibaba Cloud) — доод тал нь 2 vCPU / 4GB RAM
  (Postgres + Redis + MinIO + api + web + worker зэрэг ажиллуулах).
- Docker + Docker Compose суулгасан байх (`curl -fsSL https://get.docker.com | sh`).

**Алхмууд:**
1. Сервер түрээслэх, SSH түлхүүрээр нэвтрэх эрх тохируулах.
2. Домэйн худалдаж авсан бол DNS A бичлэгийг серверийн IP рүү чиглүүлэх (`medreh.mn` → сервер).
3. `/opt/medreh` лавлахад энэ repo-г clone хийх (эсвэл зөвхөн `docker-compose.yml` + `.env.production`
   хуулах — CI/CD image-уудыг GHCR-ээс татна тул бүх эх код шаардлагагүй).

## 2. TLS/HTTPS (заавал)

Одоогийн `docker-compose.yml` дотор Nginx reverse-proxy эсвэл TLS termination **байхгүй**
(зөвхөн api/web container-уудыг дотоод Docker сүлжээнд ажиллуулна). Production-д HTTPS
заавал шаардлагатай (JWT cookie, төлбөрийн урсгал):

**Санал болгож буй арга: Caddy (автомат Let's Encrypt)**
```
# /opt/medreh/Caddyfile
medreh.mn {
    reverse_proxy web:3001
}
api.medreh.mn {
    reverse_proxy api:3000
}
```
`docker-compose.yml`-д Caddy service нэмж (`caddy:2-alpine` image, 80/443 port map,
`Caddyfile`-г mount хийх), `web`/`api` service-үүдийн host port mapping-ийг хасаад
зөвхөн Docker дотоод сүлжээгээр Caddy-тай холбоно. Caddy сертификатыг автоматаар
шинэчилнэ (гараар хийх зүйл байхгүй, зөвхөн анхны тохиргоо).

**Alternative: Nginx + Certbot** — илүү удаан тохиргоотой ч илүү танил бол ашиглаж болно.

## 3. GitHub Secrets тохиргоо (CI/CD-г идэвхжүүлэх)

`.github/workflows/ci.yml`-ийн `production-deploy` job нь `secrets.SSH_HOST` хоосон бол
өөрөө skip хийж, ямар ч алдаа гаргахгүй (см. workflow-ийн `check-ssh-secret` алхам).
Жинхэнэ серверт автомат deploy идэвхжүүлэхийн тулд GitHub repo Settings → Secrets and
variables → Actions хэсэгт дараах secret-уудыг нэмнэ:

| Secret нэр | Утга |
|---|---|
| `SSH_HOST` | Серверийн IP эсвэл домэйн |
| `SSH_USER` | SSH хэрэглэгчийн нэр (жиш. `deploy`) |
| `SSH_PRIVATE_KEY` | Deploy хийх SSH private key (зөвхөн `/opt/medreh` дэх docker compose pull/up эрхтэй, root биш) |

Секретүүд нэмэгдсэний дараа `main` branch руу push хийх бүрд `build-and-push` job
(GHCR image build/push) → `production-deploy` job (SSH → `docker compose pull && up -d`)
автоматаар ажиллана.

## 4. Production `.env.production` файл бэлдэх

`backend/.env.example`-д жагссан бүх `change_me` утгыг **жинхэнэ, санамсаргүй үүсгэсэн**
утгаар солино (жиш. `openssl rand -base64 48`):

- `JWT_ACCESS_SECRET`, `COOKIE_SECRET`, `HAPTIC_CALLBACK_SECRET`, `PAYMENT_WEBHOOK_SECRET`,
  `HEARING_PROFILE_ENC_KEY` — тус бүр өөр, дор хаяж 32 байт санамсаргүй мөр.
- `HEARING_PROFILE_ENC_KEY`-г ҮҮСГЭСНИЙ дараа хэзээ ч бүү соль, бүү гээ — энэ түлхүүр
  алга болвол одоо байгаа шифрлэгдсэн `hearingProfile` мэдээлэл сэргээгдэхгүй болно.
  Аюулгүй газар (жиш. password manager) нөөцөлж хадгал.
- `DATABASE_URL` — production Postgres-ийн жинхэнэ хандах мэдээлэл.
- `S3_ACCESS_KEY`/`S3_SECRET_KEY` — MinIO-г бодит эрх зөвшөөрлөөр (backend `StorageService`
  production горимд эдгээр байхгүй бол эхлэхээс ЗАЛХААНА — см. `storage.service.ts`).
- `CORS_ORIGIN` — жинхэнэ домэйн (`https://medreh.mn`), localhost биш.
- `SENTRY_DSN` — Алдааны хяналт хүсвэл (доор §7 үзнэ үү).

Файлыг серверт `/opt/medreh/.env.production` замд байрлуулж, `docker compose --env-file
.env.production up -d --build` командаар эхлүүлнэ. **Энэ файлыг git-д commit хийхгүй.**

## 5. QPay/SocialPay мерчант бүртгэл (мөнгөн гүйлгээ — хамгийн эрсдэлтэй хэсэг)

Одоогийн backend-д `src/payments/` модуль (webhook endpoint, `PaymentWebhookGuard`,
`Subscription` загвар) бүрэн бичигдэж, shared-secret хамгаалалттайгаар бодитоор
туршигдсан (`POST /api/payments/webhook`) — гэхдээ энэ нь ЗӨВХӨН манай серверийн бодит
өгөгдлийн сан руу зөв бичигдэж байгааг батална, QPay/SocialPay-тай жинхэнэ холболт биш.

**Хүн гараар хийх ёстой:**
1. QPay (https://qpay.mn) эсвэл SocialPay-д хуулийн этгээдийн мэдээллээр мерчант
   бүртгэл үүсгэх (энэ бол байгууллагын бизнес процесс, кодоор хийх боломжгүй).
2. Sandbox эрх авч, тэдний webhook payload-ийн бодит бүтцийг судлах — манайх дотоод
   normalized схем ашигладаг тул (`PaymentWebhookDto`: `userId`, `provider`,
   `providerRef`, `status`, `plan`, `amount`) provider-ийн raw callback-ийг энэ хэлбэрт
   хөрвүүлэх **тусгай mapper функц бичих шаардлагатай** (`src/payments/payments.service.ts`
   дотор, эсвэл тусдаа `qpay-mapper.ts`/`socialpay-mapper.ts` файлаар).
3. `PaymentWebhookGuard`-ийн одоогийн энгийн shared-secret шалгалтыг QPay/SocialPay-ийн
   ЖИНХЭНЭ signature баталгаажуулалтаар (тэд өгсөн public key/HMAC secret-ээр) солих —
   энэ бол аюулгүй байдлын хувьд ЗААВАЛ (эс бол хэн ч хуурамч webhook илгээж чөлөөт
   PRO эрх авах боломжтой болно).
4. Production мерчант эрх авахад тэд ихэвчлэн бодит бизнес бүртгэл, банкны данс
   шаарддаг (sandbox-аас илүү урт процесс).
5. Эхний БОДИТ мөнгөн гүйлгээг гар аргаар (жиш. өөрийн картаар 100₮ гэх мэт бага дүнгээр)
   хийж, webhook ирж PRO эрх зөв идэвхждэгийг баталгаажуулах — энэ бол код унит тестээр
   орлуулшгүй, бодит мөнгө ашигласан эцсийн шалгалт.

## 6. Postgres production тохиргоо

- `scripts/backup-postgres.sh`-г cron job болгож өдөр бүр ажиллуулах:
  ```
  0 3 * * * /opt/medreh/scripts/backup-postgres.sh >> /var/log/medreh-backup.log 2>&1
  ```
- `BACKUP_S3_BUCKET` env var тохируулж нөөцлөлтийг MinIO/S3-руу оффсайт хадгалуулах
  зөвлөмжтэй (серверийн диск бүрэн алдагдвал локал backup ч алга болно).
- `scripts/restore-postgres.sh`-ийг ЯМАР Ч ҮЕД тест орчинд туршилгүйгээр production дээр
  БҮҮ ажиллуул (`--yes` флаг ЗААВАЛ, одоо байгаа бүх өгөгдлийг устгана).

## 7. Алдааны хяналт (Sentry) — заавал биш, санал болгосон

`SENTRY_DSN` env var тохируулбал `backend/src/main.ts` автоматаар Sentry-г идэвхжүүлнэ
(кодын өөрчлөлт шаардлагагүй). Хийх зүйл: sentry.io дээр account үүсгэж, project-ийн
DSN-ийг `.env.production`-д тавих л хангалттай.

## 8. Дуусаад шалгах жагсаалт (production launch checklist)

- [ ] Домэйн DNS серверийн IP рүү заасан
- [ ] HTTPS ажиллаж байгаа (Caddy/Nginx + сертификат)
- [ ] `.env.production`-ийн бүх `change_me` жинхэнэ утгаар солигдсон
- [ ] `HEARING_PROFILE_ENC_KEY` аюулгүй газар нөөцлөгдсөн
- [ ] GitHub Secrets (`SSH_HOST`/`SSH_USER`/`SSH_PRIVATE_KEY`) тохируулагдсан, CI/CD deploy амжилттай ажилласан
- [ ] Postgres cron backup идэвхтэй, дор хаяж нэг удаа restore drill хийгдсэн (production дата дээр биш, тусдаа тест орчинд)
- [ ] QPay/SocialPay production мерчант эрх авагдсан, webhook mapper бичигдсэн, чанга шифрлэлт (HMAC/signature) хийгдсэн
- [ ] Бодит бага дүнтэй (жиш. 100₮) төлбөрийн гүйлгээ амжилттай туршигдсан
- [ ] Sentry (сонголтоор) тохируулагдсан
- [ ] `docs/TAKEDOWN-PROCEDURE.md`-д заасан хариуцагч хүмүүс тодорхойлогдсон
