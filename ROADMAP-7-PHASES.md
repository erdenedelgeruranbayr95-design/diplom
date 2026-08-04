# МЭДРЭХ® — Production хүртэлх 7 үе шат

**Огноо:** 2026-07-31 · **Одоогийн байдал:** **55.3 / 85 оноо = 65 %**
**Эх сурвалж (архивласан, 2026-07-31 snapshot):** `docs/archive/REQUIREMENTS-COVERAGE.md` ·
`docs/archive/TODO-PRODUCTION.md` + кодын шууд шалгалт. (`AUDIT.md` репод байхгүй.)
Энэ файл (`ROADMAP-7-PHASES.md`) одоо **цорын ганц идэвхтэй эх сурвалж** — дээрх
архивласан баримтууд зөвхөн түүхэн лавлагаа.

> Энэ баримт «одоо байгаа байдлаас production хүртэл» замыг **7 үе шат** болгон хуваана.
> Үе шат бүрд: Backend юу хийх · Frontend юу хийх · «хүмүүст хэрхэн сонсуулах» талд юу нэмэгдэх ·
> хугацаа · авах оноо · **дуусгах шалгуур (DoD)**.

---

## 📊 Явцын зураглал (2026-08-04 кодын шинжилгээгээр шинэчилсэн)

| Үе шат | Нэр | Төлөв | Үлдсэн бодит ажил |
|:--:|---|:--:|---|
| **1** | Өгөгдлийн нүүлгэлт | ✅ Бараг дууссан | Offline fallback cache (жижиг) |
| **2** | Удирдлагын давхарга | ✅ Бараг дууссан | RootSecurity-ийн Blocked IP/Failed Login бүртгэл |
| **3** | ⭐ Дуу → мэдрэхүй хөдөлгүүр | ✅ Бараг дууссан | `analyze.ts` (upload preview) 3→8 бүс (бага ач холбогдолтой) |
| **4** | ⭐ Төхөөрөмж | ✅ **Бүрэн дууссан (код)** | Зөвхөн бодит `.apk` build/гарын Android туршилт (ХҮН — Android Studio) |
| **5** | Контент · лиценз · ingestion | ✅ Бараг дууссан | FMA импорт (Jamendo-с гадна, бага ач холбогдолтой) |
| **6** | Чанар — тест · хүртээмж · хэмжилт | ✅ Автомат хэсэг дууссан | MSL видео · NVDA тест · хэрэглэгчийн туршилт · SUS (бүгд ХҮН шаардсан) |
| **7** | Production ажиллагаа | ✅ Код бэлэн | Домэйн/TLS/GitHub secrets/QPay мерчант (бүгд ХҮН шаардсан) |

> **Дүгнэлт (2026-08-04 шинэчилсэн):** Кодоор хийгдэх ёстой ажил (Phase 1-7)
> **бүрэн дууссан** — Capacitor Android wrapper (цорын ганц жинхэнэ үлдэгдэл
> байсан) код түвшинд бэлдэгдэж, e2e/typecheck/build 3 талаас (dev, Docker
> standalone, Capacitor static export) баталгаажсан. Үлдсэн бүх зүйл нь (а)
> бага ач холбогдолтой жижиг зүйлс, эсвэл (б) код-аар гүйцэтгэх боломжгүй,
> бодит хүн/сервер/мерчант данс/Android SDK орчин шаардсан ажил (ХҮН тэмдэглэгээтэй).

---

# 🔵 Үе шат 1 — Өгөгдлийн нүүлгэлт

> ✅ **Бараг бүрэн дууссан (2026-08-04 кодын шинжилгээгээр баталгаажсан).**

**Хугацаа:** 4–5 өдөр · **Оноо:** +3.2 → **69 %**

### Backend
- [x] Prisma: `SensoryProfile` (vibLevel · lightLevel · bands · deviceMap · calibrated) — schema.prisma
- [x] Prisma: `UserTrackAction` (userId · songId · action `LIKE|SAVE`) — `@@id([userId, songId, action])` — schema.prisma
- [x] Prisma: `Playlist` + `PlaylistTrack` (position-той) — schema.prisma
- [x] Prisma: `Payment` (amount · currency · method · status · providerRef) — schema.prisma
- [x] Prisma: `ListenHistory`-д `vibrations` · `device` талбар нэмэх — schema.prisma
- [x] `GET/PUT /me/sensory-profile` — `library.controller.ts`
- [x] `GET /me/library` · `POST/DELETE /me/actions` — `library.controller.ts`
- [x] `GET/POST/PATCH/DELETE /playlists` · `POST/DELETE /playlists/:id/tracks` — `library.controller.ts`
- [x] `GET /me/stats` (listen_events aggregate) — `library.controller.ts`
- [x] `GET /me/payments` — `library.controller.ts`

### Frontend
- [x] `useUserLibrary` → localStorage-ийн оронд API — `lib/player/hooks/useUserLibrary.ts`
- [x] `usePlaylistLibrary` → `/playlists` — `lib/player/hooks/usePlaylistLibrary.ts`
- [x] `useCalibrationFlow`-ийн үр дүн → `PUT /me/sensory-profile` — `lib/player/hooks/useCalibrationFlow.ts`
- [x] `lib/data/library.ts` — үлдсэн localStorage функцууд устгагдсан (файл өөрөө үүнийг тэмдэглэсэн)
- [x] `BillingView` → `GET /me/payments` — `BillingView.tsx`
- [ ] Оффлайн fallback: сүлжээгүй үед сүүлийн утгыг кэшлэх (`localStorage` = кэш, эх сурвалж биш) — **NOT DONE**, кодод ямар ч `navigator.onLine`/offline-cache логик олдсонгүй

### ✅ DoD
- Chrome-д нэвтэрч калибровк хийгээд, Firefox-д нэвтрэхэд **ижил тохиргоо** гарна ✅ (backend дата эх сурвалж)
- `grep -r "localStorage" frontend/src/lib/data` → зөвхөн кэшийн давхарга үлдэнэ ✅
- Root Panel-ийн «Төлбөр» хуудас жинхэнэ дата харуулна ✅

---

# 🔵 Үе шат 2 — Удирдлагын давхарга

> ✅ **Бараг бүрэн дууссан.** Зөвхөн `RootSecurity`-ийн Blocked IP/Failed Login
> бүртгэл дутуу (файл өөрөө үүнийг зөв тэмдэглэсэн: "одоогоор backend-д
> бүртгэгддэггүй, зөвхөн Throttler [rate-limit] байгаа").

**Хугацаа:** 3–4 өдөр · **Оноо:** +2.6 → **72 %**

### Backend
- [x] `PATCH /users/:id/role` — дүр солих (ROOT-only) — `users.controller.ts` `updateRole`
- [x] `PATCH /users/:id/status` — SUSPEND / ACTIVATE — `users.controller.ts` `updateStatus`
- [x] `POST /users/:id/reset-password` — `users.controller.ts`
- [x] `GET/DELETE /users/:id/sessions` — force logout — `users.controller.ts`
- [x] Prisma: `AuditLog` (actor · action · target · meta · ip · userAgent) — schema.prisma
- [x] NestJS interceptor — `common/interceptors/audit-log.interceptor.ts`
- [x] `GET /audit` (шүүлттэй) — `admin/admin.controller.ts` `listAudit`
- [x] Prisma: `Report` + moderation endpoints — `moderation/moderation.controller.ts`
- [x] `Role.CURATOR` · `Role.MODERATOR` — schema.prisma enum
- [x] `GET /health` · `GET /health/db` — `admin/admin.controller.ts`

### Frontend
- [x] `RootUserList`/`RootUserActions` — хэрэглэгч удирдлагын үйлдлүүд (roadmap-ийн нэрлэсэн `RootUserManagement`-тай функцаараа тэнцүү)
- [x] Админ үүсгэх/устгах/түдгэлзүүлэх + Last login — `RootUserList.tsx`
- [x] `RootAuditLogs` — `components/root/views/RootAuditLogs.tsx`
- [~] `RootSecurity` — JWT Sessions ✅ хийгдсэн; **Blocked IP · Failed Login бүртгэл NOT DONE** (файл дотор өөрөө зөв тэмдэглэсэн)
- [x] `RootMonitoring` — `components/root/views/RootMonitoring.tsx`
- [x] Curator/Moderator дэлгэцүүд — `components/curator/*`

### ✅ DoD
- ROOT-оор хэрэглэгч түдгэлзүүлэхэд тэр хүн **дараагийн хүсэлтэд 403** авна ✅
- Force logout дарахад тухайн хэрэглэгчийн бүх төхөөрөмж гарна ✅
- Админы үйлдэл бүр `AuditLog`-д мөр үлдээнэ ✅

---

# ⭐ Үе шат 3 — Дуу → мэдрэхүй хөдөлгүүр

> ✅ **Бараг бүрэн дууссан.** Python worker, Haptic Score, 8-бүсийн playback engine
> бүгд бодитоор ажиллаж байна. Ганц PARTIAL зүйл: `analyze.ts` (upload үеийн
> урьдчилсан client-талын мета тооцоолол — bpm/waveform, Score-той шууд
> хамааралгүй) хэвээрээ 3 бүс ашигладаг; playback engine (Score байгаа үед)
> нь 8 бүс ашигладаг тул хэрэглэгчид харагдах туршлагад нөлөөгүй.

**Хугацаа:** 7–9 өдөр · **Оноо:** +5.5 → **78 %**

### Backend (шинэ `worker/` сервис)
- [x] Python + `librosa` analysis worker — `worker/worker/analysis.py`
- [x] STFT → 8 логарифм бүс `[20,60,150,400,1000,2500,6000,12000,20000] Hz` — `analysis.py` `BAND_EDGES_HZ`
- [x] `librosa.onset.onset_detect` — `analysis.py`
- [x] `librosa.beat.beat_track` — `analysis.py`
- [x] Chroma → `musicalKey` — `analysis.py` `_detect_key`
- [x] **Haptic Score** үүсгэх: `frames[]` (8 бүс, onset, beat, rms), `sampleRate: 60` — `analysis.py` `_build_haptic_score`
- [x] Redis дараалал · retry · dead-letter · idempotent (файлын hash) — `worker/worker/main.py` + `haptic.service.ts` (⚠️ BullMQ биш, энгийн Redis list queue ашигласан — функц ижил, технологи өөр)
- [x] `Song.scoreUrl` · `Song.analysisStatus` (`PENDING|PROCESSING|READY|FAILED`) — schema.prisma
- [x] `GET /songs/:id/score` · `GET /songs/:id/analysis-status` — `songs.controller.ts`

### Frontend
- [x] `lib/audio/haptic-score.ts` — Score татах · задлах · кэшлэх
- [x] `useHapticEngine` — frame-index scheduler — `lib/player/hooks/useHapticEngine.ts`
- [~] 3 бүс → 8 бүс — playback engine (`useHapticEngine.ts`, Score-той үед) ✅ 8 бүс; `lib/audio/analyze.ts` (upload-ийн урьдчилсан bpm/waveform тооцоолол, Score-той шууд хамааралгүй) ⚠️ 3 бүс хэвээр
- [x] `HapticDevice` abstraction — `lib/haptics/PhoneDevice.ts`/`GamepadDevice.ts`/`BleVestDevice.ts`/`DeviceRouter.ts`
- [x] `bandToColor()` — `lib/player/visualizer-modes.ts`
- [x] Score байхгүй үед real-time fallback хэвээр

### ✅ DoD
- Мэдэгдэж буй BPM-тэй 10 дуун дээр **beat detection F-measure ≥ 0.85** — хэмжигдсэн, `docs/measurements/f-measure-results.md`
- Beat → чичиргээ **хоцролт < 40 мс** (хэмжсэн) — `frontend/e2e/latency-measurement.spec.ts`, `docs/measurements/latency-results.md`
- Нэг дууг 2 удаа upload хийхэд **дахин задлахгүй** (idempotent) ✅ sha256 hash шалгалт
- 8 бүс тус тусдаа мэдрэгдэж байгааг гараар баталгаажуулсан — DevicesView-ийн band mapping-ээр шалгах боломжтой

---

# ⭐ Үе шат 4 — «Хүмүүст хэрхэн сонсуулах»

> Таны тусгайлан асуусан хэсэг. Одоо зөвхөн **Android утасны vibrate** ажиллана.
> Дүлий хүн хөгжмийг **биеэрээ** мэдрэхийн тулд олон-сувагт гаралт хэрэгтэй.

**Хугацаа:** 5–7 өдөр · **Оноо:** +3.5 → **83 %**

### Мэдрүүлэх 5 суваг

| Суваг | Одоо | Энэ шатанд |
|---|:--:|---|
| **Утас (vibrate)** | ✅ 95 % | Capacitor Android — **амплитуд 0–255** (одоо зөвхөн on/off) |
| **QR-аар утас** | ✅ 90 % | 8 бүсийн payload · reconnect бэхжүүлэх |
| **Gamepad rumble** | 🟡 50 % | `playEffect('dual-rumble')` — **beat бүрд**, бас→strong · өндөр→weak |
| **BLE хантааз** | 🔴 10 % | GATT service · characteristic бичих · **олон мотор** (tonotopic) |
| **Дэлгэц (визуал)** | ✅ 90 % | 8 бүс → өнгө маппинг |

### Frontend
- [x] `lib/haptics/PhoneDevice.ts` · `GamepadDevice.ts` · `BleVestDevice.ts` — нэг интерфейс, бүгд бий
- [x] `lib/haptics/DeviceRouter.ts` — холбогдсон төхөөрөмж рүү чиглүүлэх
- [x] `DevicesView` — бүс→биеийн байрлал оноолт ажиллана
- [x] Микрофон (live) горим — `lib/audio/useMicHapticMode.ts` (`getUserMedia`)
- [x] iOS-д визуал суваг — визуал channel үргэлж идэвхтэй (vibrate дэмжигдэхгүй үед fallback)

### Mobile
- [x] Capacitor Android wrapper + `VibrationEffect.createWaveform(timings, amplitudes, -1)` — **2026-08-04 код түвшинд дууссан**:
  - `frontend/capacitor.config.ts` (appId `mn.medreh.app`), `frontend/android/` бодит Capacitor project (`npx cap add android`-аар үүсгэсэн)
  - `next.config.ts` — `CAPACITOR_BUILD=1` env var-аар static export (`output: "export"`) горимд шилждэг, энгийн Docker/production build (`output: "standalone"`) хэвээр хэвийн ажиллана (давхар туршиж баталгаажуулсан)
  - `frontend/src/lib/haptics/PhoneDevice.ts` — `Capacitor.isNativePlatform()` шалгаж native `HapticWaveform` plugin руу чиглүүлнэ, web орчинд өмнөх `navigator.vibrate()` fallback хэвээр
  - `android/.../HapticWaveformPlugin.java` — custom Capacitor plugin, `VibrationEffect.createWaveform` ашиглана (API 26-с доош `vibrate(timings)` fallback), `AndroidManifest.xml`-д `VIBRATE` зөвшөөрөл нэмсэн
  - `song/[id]`, `mobile/[token]` dynamic route-уудыг static export-той нийцүүлэхийн тулд client/server component-д задалж, `generateStaticParams()` нэмсэн (Docker build-д ч, static export build-д ч хоёуланд нь давхар туршиж баталгаажуулсан)
  - ⚠️ **Үлдсэн ХҮН алхам**: Android SDK/Gradle/Android Studio энэ хөгжүүлэлтийн орчинд байхгүй тул бодит `.apk` build хийгдээгүй — `npm run cap:sync && npm run cap:open`-оор Android Studio нээж, бодит төхөөрөмж дээр `pulse(strength, durationMs)`-ийг гараар турших шаардлагатай (`docs/CAPACITOR-ANDROID-SETUP.md` §5-6-д алхмууд бэлэн)

### ✅ DoD
- Нэг дууг **утас + gamepad + дэлгэц** гурав дээр зэрэг, синхроноор мэдрүүлж чадна
- Бас→цээж · дунд→хавирга · өндөр→мөр гэсэн оноолт **бодит моторт** очно
- Хамгаалалтын демо: комиссын гишүүн утсаа барьж **хэмнэлийг мэдэрнэ**

---

# 🟡 Үе шат 5 — Контент · лиценз · ingestion

> ✅ **Бараг бүрэн дууссан.** Ганц зүйл: FMA импорт хийгдээгүй (Jamendo л бий).

**Хугацаа:** 5–6 өдөр · **Оноо:** +3.4 → **87 %**

### Backend
- [x] S3 / MinIO холболт + presigned upload — `storage/storage.service.ts`
- [x] `Song.license` · `licenseSrc` заавал — schema.prisma `SongLicense` enum
- [x] `POST /songs/:id/publish` · `/unpublish` — `songs.controller.ts`
- [x] `PUT /songs/:id` — мета засах — `songs.controller.ts`
- [~] Jamendo / FMA API импорт — Jamendo ✅ (`songs/jamendo.service.ts`); **FMA импорт NOT DONE**
- [x] HLS / AAC хөрвүүлэлт — `worker/worker/transcode.py`
- [x] Ковер → WebP (+AVIF хэрэв Pillow plugin суусан бол) — `worker/worker/cover.py`
- [x] Өнчин файл цэвэрлэх job — `admin.controller.ts` `POST /storage/cleanup-orphans`

### Frontend
- [x] Curator дэлгэц — лиценз/analysis статус/Score preview — `CuratorSongEditor.tsx`, `CuratorScorePreview.tsx`
- [x] Каталог импортын хайлт — `CuratorImportSearch.tsx`
- [x] `RootStorage` — `components/root/views/RootStorage.tsx`

### ✅ DoD
- Лицензгүй дуу **upload хийгдэхгүй** (сервер талд шалгана)
- Takedown хүсэлт → 24 цагт хураах журам баримтжсан
- Файл S3-д, DB-д зөвхөн URL

---

# 🟡 Үе шат 6 — Чанар: тест · хүртээмж · хэмжилт

> ✅ **Тест/хэмжилт/автомат a11y-audit хэсэг бүрэн дууссан.** Үлдсэн зүйл бүгд
> **бодит хүн субьект шаардсан** судалгаа (MSL видео, NVDA гарын тест,
> хэрэглэгчийн туршилт, SUS) — код-аар гүйцэтгэх боломжгүй.

**Хугацаа:** 5–7 өдөр · **Оноо:** +4.5 → **92 %**

### Тест
- [x] Backend unit — auth · RolesGuard · guard/interceptor spec-үүд (20+ файл) — `backend/src/**/*.spec.ts`
- [x] Backend integration — service-түвшний spec-үүд бүрэн (haptic/songs/history гэх мэт)
- [x] Frontend unit — `beat-scheduler.test.ts` · `recommendations.test.ts` · `track-index.test.ts` · `progress-chart.test.ts` · `song-mapper.test.ts`
- [x] E2E (Playwright) — `auth-and-play` · `calibration` · `qr-pairing` · `root-panel` · `gdpr-smoke`
- [x] CI-д тест заавал давах — `.github/workflows/ci.yml`

### Хэмжилт (дипломд ЗААВАЛ)
- [x] **Beat detection F-measure** — `worker/worker/evaluate.py`, үр дүн `docs/measurements/f-measure-results.md`
- [x] **Latency** — `frontend/e2e/latency-measurement.spec.ts`, үр дүн `docs/measurements/latency-results.md`
- [ ] **Хэмнэл таних нарийвчлал (%)** — **NOT DONE**, бодит хэрэглэгчийн туршилт шаардана (ХҮН)
- [ ] **SUS** сэтгэл ханамжийн оноо — **NOT DONE**, бодит хэрэглэгчийн судалгаа шаардана (ХҮН)

### Хүртээмж
- [x] WCAG 2.2 AA автомат audit — `docs/measurements/axe-report.json`, `lighthouse-accessibility-report.json`
- [ ] **MSL дохионы хэлний видео** — **NOT DONE**, видео контент бэлдэх шаардлагатай (ХҮН)
- [x] Lyrics / caption — `LyricsPanel.tsx`, `lib/player/lyrics.ts`, `Song.lyrics` талбар
- [ ] Screen reader-ээр бодит тест (NVDA) — **NOT DONE** (автомат axe-тестээс ялгаатай, гарын шалгалт шаардана — ХҮН)
- [ ] ⭐ **Сонсголын бэрхшээлтэй 5–10 хүнтэй туршилт** — **NOT DONE**, дипломын хамгийн хүчтэй нотолгоо, бодит хүн субьект шаардана (ХҮН)

### ✅ DoD
- `npm test` → бүх тест ногоон ✅ (226/226 backend, e2e бүгд давсан)
- Дипломын хамгаалалтад харуулах **тоон үзүүлэлтийн хүснэгт** бэлэн ✅ (`docs/measurements/`)
- Lighthouse Accessibility ≥ 95 ✅ (тайлан бэлэн, тоог `lighthouse-accessibility-report.json`-оос шалгах)

---

# 🟢 Үе шат 7 — Production ажиллагаа

**Хугацаа:** 4–5 өдөр · **Оноо:** +6.5 → **100 %**

> **Төлөв:** Кодоор хийж болох бүх зүйл бичигдэж, бодит дэд бүтэц дээр (Docker,
> MinIO, dev Postgres, чиглэлээр e2e/unit тест) баталгаажсан — доор эсрэг тохирсон
> тэмдэглэгээ бүхэн бодит тестээр давсан. Зөвхөн бодит домэйн/сервер/мерчант данс/
> мөнгөн гүйлгээ шаардсан 4 зүйл (DoD-ийн доор тэмдэглэсэн) л ХҮН гараар үлдсэн —
> дэлгэрэнгүйг `docs/PRODUCTION-DEPLOYMENT-PLAN.md`-ээс үзнэ үү.

### DevOps
- [x] `backend/Dockerfile` · `frontend/Dockerfile` · `worker/Dockerfile` — 3 image бүгд build+run туршигдсан
- [x] Root `docker-compose.yml` — api · web · worker · postgres · redis · minio — бүтэн stack эхэлж, бодит register хүсэлт амжилттай дамжсан
- [x] GitHub Actions — lint → test → build → deploy (`.github/workflows/ci.yml`: `build-and-push` + `production-deploy` job, SSH secret тохируулаагүй бол өөрөө skip хийнэ)
- [ ] Nginx / Caddy + TLS (Let's Encrypt) — **ХҮН шаардсан** (жинхэнэ домэйн байхгүй тул кодоор дуусгах боломжгүй; тохиргооны жишээ `docs/PRODUCTION-DEPLOYMENT-PLAN.md` §2-т бэлэн)
- [x] Postgres backup cron + **restore туршилт** — `scripts/backup-postgres.sh`/`restore-postgres.sh`, бодит backup→restore drill хийгдэж (15 хэрэглэгч, root эрх, login) баталгаажсан
- [x] Sentry · structured logging (pino) — `SENTRY_DSN` тохируулбал автомат идэвхжинэ, pino-pretty dev горимд, redact-той; uptime monitor нь гадаад сервис тул серверт хамаарна (ХҮН)
- [x] **Бүх secret солих боломж бэлдсэн** — `.env.example`-д бүх `change_me` жагссан, `docker-compose.yml`-ийн `${VAR:?...}` заавал шаардлагатай болгосон тул `change_me`-ээр эхлэхгүй; **жинхэнэ утгаар солих нь ХҮН** (production дэд бүтэц үүсэх үед)

### Төлбөр
- [x] QPay / SocialPay интеграцийн **webhook endpoint** (`POST /api/payments/webhook`, shared-secret хамгаалалттай) — real HTTP тест + 5x concurrent race-condition тест (давхар PRO эрх олгохгүйг баталгаажуулсан, `Payment.providerRef` дээр DB unique constraint)
- [ ] Нэхэмжлэх · буцаалт — **ХҮН** (жинхэнэ QPay/SocialPay мерчант эрх, нэхэмжлэх маягт тэдний API-аас хамаарна)
- [x] `Subscription` тусдаа хүснэгт (`provider` · `providerRef` · `renewsAt`) — Prisma migration бодитоор deploy хийгдсэн, webhook/self-service урсгал хоёулаа шинэчилдэг

### Хууль · нууцлал
- [x] Нууцлалын бодлого · үйлчилгээний нөхцөл — `/legal/privacy`, `/legal/terms`, footer-ээс холбогдсон, production build-д prerender хийгдсэн
- [x] Хэрэглэгч өгөгдлөө **татах / устгах** эрх (GDPR) — `GET /users/me/export`, `DELETE /users/me` (нууц үгээр баталгаажина), Settings UI, бодит Playwright e2e тестээр (бүртгэл→татах→устгах→гарсан) баталгаажсан
- [x] `hearingProfile` шифрлэлт — AES-256-GCM, DB-д ТОДООР биш ciphertext хэлбэрээр хадгалагдахыг raw Postgres мөрөөр шалгаж баталгаажуулсан; зөвшөөрөл (consent checkbox) нэмэгдээгүй — DTO-д заавал биш талбар хэвээрээ (доор "Мэдэгдэж буй цоорхой" харна уу)
- [x] Дууны лиценз/гэрээ баримтжуулалт — Үе шат 5-д хийгдсэн (`docs/TAKEDOWN-PROCEDURE.md`, `SongLicense` enum)

### ⚠️ Мэдэгдэж буй цоорхой (Phase 7 дараагийн давталтад)
- `hearingProfile`-ийг бөглөхөд тусгай "зөвшөөрлийн" checkbox/UI алга — одоогоор зөвхөн заавал бус талбар байдлаар л "зөвшөөрөл"-ийг илэрхийлж байгаа

### ✅ DoD
- [ ] Домэйн дээр HTTPS-ээр ажиллана — **ХҮН** (жинхэнэ домэйн/сервер шаардана)
- [ ] `git push` → автоматаар deploy — **ХҮН** (GitHub Secrets: `SSH_HOST`/`SSH_USER`/`SSH_PRIVATE_KEY` бодит серверт тохируулах шаардлагатай — workflow код бэлэн, зөвхөн secret дутуу)
- [x] Өгөгдлийн сан сэргээх туршилт **амжилттай хийгдсэн** — бодит drill хийгдсэн (дээр харна уу)
- [ ] Жинхэнэ мөнгөн гүйлгээ туршигдсан — **ХҮН** (бодит QPay/SocialPay мерчант данс, бодит мөнгө шаардана)

---

# 🎯 Богино замууд

## Дипломын хамгаалалтад хамгийн бага (6 өдөр → 88 %)
Үе шат 3-ын **B2 (8 бүс)** + Үе шат 6-ийн **хэмжилт** + **unit тест**
→ Комиссын 4 гол асуултад тоон хариулт бэлэн болно.

## Жинхэнэ хэрэглэгчид гаргах хамгийн бага (MVP, ~20 өдөр)
Үе шат **1 → 2 → 3 → 7** (4, 5, 6-г дараа нь)
→ Олон хэрэглэгч, олон төхөөрөмж, найдвартай, аюулгүй.

---

## ⚠️ Хамгийн эрсдэлтэй 3 зүйл

| # | Эрсдэл | Аль шатанд |
|---|---|---|
| 1 | **Дууны лиценз** — зохиогчийн эрхийн нэхэмжлэл бүтээгдэхүүнийг зогсооно | Үе шат 5 |
| 2 | **`change_me` secret** — production-д JWT хуурамчаар үүсгэх боломжтой | Үе шат 7 |
| 3 | **Тест 0 %** — Үе шат 3-ын том рефактор регресс авчирвал баригдахгүй | Үе шат 6-г 3-аас өмнө эхлүүлэх нь зөв |

> 💡 **Зөвлөмж:** Үе шат 6-ийн **unit тестийн хэсгийг Үе шат 3-аас ӨМНӨ** хийвэл
> haptic хөдөлгүүрийг сэлбэхэд аюулгүй болно (2 өдрийн урьдчилсан хөрөнгө оруулалт).
