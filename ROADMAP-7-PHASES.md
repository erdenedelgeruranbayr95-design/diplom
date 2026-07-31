# МЭДРЭХ® — Production хүртэлх 7 үе шат

**Огноо:** 2026-07-31 · **Одоогийн байдал:** **55.3 / 85 оноо = 65 %**
**Эх сурвалж:** `AUDIT.md` · `REQUIREMENTS-COVERAGE.md` · `TODO-PRODUCTION.md` + кодын шууд шалгалт

> Энэ баримт «одоо байгаа байдлаас production хүртэл» замыг **7 үе шат** болгон хуваана.
> Үе шат бүрд: Backend юу хийх · Frontend юу хийх · «хүмүүст хэрхэн сонсуулах» талд юу нэмэгдэх ·
> хугацаа · авах оноо · **дуусгах шалгуур (DoD)**.

---

## 📊 Явцын зураглал

| Үе шат | Нэр | Өдөр | Оноо | Дүн |
|:--:|---|:--:|:--:|:--:|
| — | *Одоо* | — | — | **65 %** |
| **1** | Өгөгдлийн нүүлгэлт (localStorage → Postgres) | 4–5 | +3.2 | **69 %** |
| **2** | Удирдлагын давхарга (ROOT/Admin control plane) | 3–4 | +2.6 | **72 %** |
| **3** | ⭐ Дуу → мэдрэхүй хөдөлгүүр (novelty) | 7–9 | +5.5 | **78 %** |
| **4** | ⭐ Төхөөрөмж — «хүмүүст хэрхэн сонсуулах» | 5–7 | +3.5 | **83 %** |
| **5** | Контент · лиценз · ingestion | 5–6 | +3.4 | **87 %** |
| **6** | Чанар — тест · хүртээмж · хэмжилт | 5–7 | +4.5 | **92 %** |
| **7** | Production ажиллагаа (Ops · төлбөр · мониторинг) | 4–5 | +6.5 | **100 %** |
| | **НИЙТ** | **33–43 өдөр** | **+29.7** | |

---

# 🔵 Үе шат 1 — Өгөгдлийн нүүлгэлт

> **Яагаад эхэнд вэ:** одоо хэрэглэгчийн калибровк, дуртай дуу, playlist, төлбөрийн түүх
> бүгд **браузерын localStorage**-д. Хэрэглэгч утас/компьютер солиход бүгд алга болно.
> Энэ засагдтал «олон хэрэглэгчтэй бүтээгдэхүүн» гэж хэлэх боломжгүй.

**Хугацаа:** 4–5 өдөр · **Оноо:** +3.2 → **69 %**

### Backend
- [ ] Prisma: `SensoryProfile` (vibLevel · lightLevel · bands · deviceMap · calibrated)
- [ ] Prisma: `UserTrackAction` (userId · songId · action `LIKE|SAVE`) — `@@id([userId, songId, action])`
- [ ] Prisma: `Playlist` + `PlaylistTrack` (position-той)
- [ ] Prisma: `Payment` (amount · currency · method · status · providerRef)
- [ ] Prisma: `ListenHistory`-д `vibrations` · `device` талбар нэмэх
- [ ] `GET/PUT /me/sensory-profile`
- [ ] `GET /me/library` · `POST/DELETE /me/actions`
- [ ] `GET/POST/PATCH/DELETE /playlists` · `POST/DELETE /playlists/:id/tracks`
- [ ] `GET /me/stats` (listen_events aggregate)
- [ ] `GET /me/payments`

### Frontend
- [ ] `useUserLibrary` → localStorage-ийн оронд API (hook-ийн интерфейс хэвээр)
- [ ] `usePlaylistLibrary` → `/playlists`
- [ ] `useCalibrationFlow`-ийн үр дүн → `PUT /me/sensory-profile`
- [ ] `lib/data/library.ts` — үлдсэн localStorage функцуудыг устгах
- [ ] `BillingView` → `GET /me/payments`
- [ ] Оффлайн fallback: сүлжээгүй үед сүүлийн утгыг кэшлэх (`localStorage` = кэш, эх сурвалж биш)

### ✅ DoD
- Chrome-д нэвтэрч калибровк хийгээд, Firefox-д нэвтрэхэд **ижил тохиргоо** гарна
- `grep -r "localStorage" frontend/src/lib/data` → зөвхөн кэшийн давхарга үлдэнэ
- Root Panel-ийн «Төлбөр» хуудас жинхэнэ дата харуулна

---

# 🔵 Үе шат 2 — Удирдлагын давхарга

> ROOT самбарын 18 хэсгээс 9 нь одоо backend хүлээж байна. Энэ шат тэдгээрийг амьдруулна.

**Хугацаа:** 3–4 өдөр · **Оноо:** +2.6 → **72 %**

### Backend
- [ ] `PATCH /users/:id` — нэр · **дүр солих** (ROOT-only)
- [ ] `PATCH /users/:id/status` — **SUSPEND / ACTIVATE** (`User.status` талбар аль хэдийн бий)
- [ ] `POST /users/:id/reset-password` — түр нууц үг үүсгэж буцаана
- [ ] `GET /users/:id/sessions` · `DELETE /users/:id/sessions` — **force logout** (`RefreshToken` дээр)
- [ ] Prisma: `AuditLog` (actor · action · target · meta · ip · userAgent)
- [ ] NestJS interceptor — mutating route бүрийг автоматаар бичих
- [ ] `GET /audit` (шүүлттэй)
- [ ] Prisma: `Report` + `GET /moderation/reports` · `POST /:id/resolve`
- [ ] `Role.CURATOR` · `Role.MODERATOR` нэмэх (RolesGuard шатлал аль хэдийн бэлэн)
- [ ] `GET /health` · `GET /health/db` — Monitoring хуудсанд

### Frontend
- [ ] `RootUserManagement` — 8 үйлдэл бүгд жинхэнэ болно
- [ ] `RootAdminManagement` — Create/Edit/Delete/Suspend + Last login
- [ ] `RootAuditLogs` — 10 багана бүрэн
- [ ] `RootSecurity` — JWT Sessions · Blocked IP · Failed Login
- [ ] `RootMonitoring` — health endpoint-оос
- [ ] Curator/Moderator дэлгэцүүд

### ✅ DoD
- ROOT-оор хэрэглэгч түдгэлзүүлэхэд тэр хүн **дараагийн хүсэлтэд 403** авна
- Force logout дарахад тухайн хэрэглэгчийн бүх төхөөрөмж гарна
- Админы үйлдэл бүр `AuditLog`-д мөр үлдээнэ

---

# ⭐ Үе шат 3 — Дуу → мэдрэхүй хөдөлгүүр

> **Дипломын гол шинэлэг тал.** Одоо **3 бүс** (баримтад **8** гэж бичсэн), Haptic Score
> байхгүй, чичиргээ нь босго (threshold) дээр ажилладаг. Энэ шат түүнийг бүтнээр хийнэ.

**Хугацаа:** 7–9 өдөр · **Оноо:** +5.5 → **78 %**

### Backend (шинэ `worker/` сервис)
- [ ] Python + `librosa` analysis worker
- [ ] STFT → **8 логарифм бүс** `[20,60,150,400,1000,2500,6000,12000,20000] Hz`
- [ ] `librosa.onset.onset_detect` — onset (одоо зөвхөн energy-beat)
- [ ] `librosa.beat.beat_track` — BPM ба beat frame
- [ ] Chroma → `musicalKey`
- [ ] **Haptic Score** үүсгэх: `frames[]` — мөр бүрд `[8 бүс, onset, beat, rms]`, `sampleRate: 60`
- [ ] Redis + BullMQ дараалал · retry · dead-letter · idempotent (файлын hash)
- [ ] `Song.scoreUrl` · `Song.status` (`processing|ready|failed`)
- [ ] `GET /songs/:id/score` · `GET /songs/:id/analysis-status`

### Frontend
- [ ] `lib/audio/haptic-score.ts` — Score татах · задлах · кэшлэх
- [ ] `useHapticEngine` — **frame-index scheduler** (`currentTime × sampleRate`)
- [ ] 3 бүс → **8 бүс** (`analyze.ts` ба RAF loop хоёулаа)
- [ ] `HapticDevice` abstraction: `connect() · pulse() · setBand(zone, level) · supportsMultiZone`
- [ ] `bandToColor()` — 8°→308° лог hue (§3.3)
- [ ] Score байхгүй үед одоогийн real-time fallback хэвээр

### ✅ DoD
- Мэдэгдэж буй BPM-тэй 10 дуун дээр **beat detection F-measure ≥ 0.85**
- Beat → чичиргээ **хоцролт < 40 мс** (хэмжсэн)
- Нэг дууг 2 удаа upload хийхэд **дахин задлахгүй** (idempotent)
- 8 бүс тус тусдаа мэдрэгдэж байгааг гараар баталгаажуулсан

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
- [ ] `lib/haptics/PhoneDevice.ts` · `GamepadDevice.ts` · `BleVestDevice.ts` — нэг интерфейс
- [ ] `lib/haptics/DeviceRouter.ts` — холбогдсон төхөөрөмж рүү чиглүүлэх
- [ ] `DevicesView` — бүс→биеийн байрлал оноолт **бодитоор** ажиллана
- [ ] Микрофон (live) горим — `getUserMedia` + AudioWorklet
- [ ] iOS-д визуал сувгийг хүчтэй болгох (Safari `vibrate` дэмждэггүй)

### Mobile
- [ ] Capacitor Android wrapper + `VibrationEffect.createWaveform(timings, amplitudes, -1)`

### ✅ DoD
- Нэг дууг **утас + gamepad + дэлгэц** гурав дээр зэрэг, синхроноор мэдрүүлж чадна
- Бас→цээж · дунд→хавирга · өндөр→мөр гэсэн оноолт **бодит моторт** очно
- Хамгаалалтын демо: комиссын гишүүн утсаа барьж **хэмнэлийг мэдэрнэ**

---

# 🟡 Үе шат 5 — Контент · лиценз · ingestion

**Хугацаа:** 5–6 өдөр · **Оноо:** +3.4 → **87 %**

### Backend
- [ ] S3 / MinIO холболт + **presigned upload** (одоо multer → локал диск)
- [ ] `Song.license` · `licenseSrc` **заавал** — ⚠️ эрх зүйн эрсдэл
- [ ] `POST /songs/:id/publish` · `/unpublish`
- [ ] `PUT /songs/:id` — мета засах
- [ ] Jamendo / FMA API импорт
- [ ] HLS / AAC хөрвүүлэлт (bass чухал тул **low-cut хийхгүй**)
- [ ] Ковер → WebP/AVIF, олон хэмжээ
- [ ] Өнчин файл цэвэрлэх job

### Frontend
- [ ] Curator дэлгэц — лицензийн талбар · analysis статус · **Haptic Score preview timeline**
- [ ] Каталог импортын хайлт
- [ ] `RootStorage` — эзэлсэн хэмжээ, файлын тоо

### ✅ DoD
- Лицензгүй дуу **upload хийгдэхгүй** (сервер талд шалгана)
- Takedown хүсэлт → 24 цагт хураах журам баримтжсан
- Файл S3-д, DB-д зөвхөн URL

---

# 🟡 Үе шат 6 — Чанар: тест · хүртээмж · хэмжилт

> **Одоо тест файл = 0.** Дипломын комисс «хэр нарийвчлалтай вэ?» гэж асуувал тоо байхгүй.

**Хугацаа:** 5–7 өдөр · **Оноо:** +4.5 → **92 %**

### Тест
- [ ] Backend unit — auth · `RolesGuard` (ROOT шатлал) · `assertTherapistOwnsPatient` · `assertCanReadUser`
- [ ] Backend integration — register → login → upload → analyze → history
- [ ] Frontend unit — `scoreRecommendations` · `BeatScheduler` · `filterTracks` · `progress-chart` · `songToPlayerTrack`
- [ ] E2E (Playwright) — нэвтрэх · тоглуулах · калибровк · QR хослуулах · ROOT самбар
- [ ] CI-д тест заавал давах

### Хэмжилт (дипломд ЗААВАЛ)
- [ ] **Beat detection F-measure** — мэдэгдэж буй BPM-тэй 10+ дуу
- [ ] **Latency** — beat → vibrate (зорилт < 40 мс)
- [ ] **Хэмнэл таних нарийвчлал (%)** — хэрэглэгчийн тест
- [ ] **SUS** сэтгэл ханамжийн оноо

### Хүртээмж
- [ ] WCAG 2.2 AA бүрэн audit (axe / Lighthouse тайлан)
- [ ] **MSL дохионы хэлний видео** — тусламж · онбординг
- [ ] Lyrics / caption
- [ ] Screen reader-ээр бодит тест (NVDA)
- [ ] ⭐ **Сонсголын бэрхшээлтэй 5–10 хүнтэй туршилт** — дипломын хамгийн хүчтэй нотолгоо

### ✅ DoD
- `npm test` → бүх тест ногоон, coverage ≥ 60 %
- Дипломын хамгаалалтад харуулах **тоон үзүүлэлтийн хүснэгт** бэлэн
- Lighthouse Accessibility ≥ 95

---

# 🟢 Үе шат 7 — Production ажиллагаа

**Хугацаа:** 4–5 өдөр · **Оноо:** +6.5 → **100 %**

### DevOps
- [ ] `backend/Dockerfile` · `frontend/Dockerfile` · `worker/Dockerfile`
- [ ] Root `docker-compose.yml` — api · web · worker · postgres · redis · minio
- [ ] GitHub Actions — lint → test → build → deploy
- [ ] Nginx / Caddy + TLS (Let's Encrypt)
- [ ] Postgres backup cron + S3 versioning + **restore туршилт**
- [ ] Sentry · structured logging (pino) · uptime monitor
- [ ] **Бүх secret солих** (`JWT_ACCESS_SECRET=change_me` → жинхэнэ) 🔴

### Төлбөр
- [ ] QPay / SocialPay интеграци + **webhook**
- [ ] Нэхэмжлэх · буцаалт
- [ ] `Subscription` тусдаа хүснэгт (`provider` · `providerRef` · `renewsAt`)

### Хууль · нууцлал
- [ ] Нууцлалын бодлого · үйлчилгээний нөхцөл
- [ ] Хэрэглэгч өгөгдлөө **татах / устгах** эрх (GDPR)
- [ ] `hearingProfile` шифрлэлт + зөвшөөрөл
- [ ] Дууны лиценз/гэрээ баримтжуулалт

### ✅ DoD
- Домэйн дээр HTTPS-ээр ажиллана
- `git push` → автоматаар deploy
- Өгөгдлийн сан сэргээх туршилт **амжилттай хийгдсэн**
- Жинхэнэ мөнгөн гүйлгээ туршигдсан

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
