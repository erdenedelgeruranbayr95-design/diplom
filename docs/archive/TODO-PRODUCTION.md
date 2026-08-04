# МЭДРЭХ® — Дутуу байгаа бүх зүйлийн жагсаалт

> ⚠️ **АРХИВЛАГДСАН (2026-08-04):** Энэ файл 2026-07-31-ний snapshot бөгөөд
> **хуучирсан** — олон checkbox "хийгдээгүй" гэж тэмдэглэгдсэн ч (жиш. CURATOR/
> MODERATOR дүр, UserStatus.BANNED) дараа нь бодитоор хийгдсэн. Одоогийн бодит
> явц, идэвхтэй ажлын жагсаалтыг **`ROADMAP-7-PHASES.md`**-ээс (root) харна уу.
> Энэ файлыг зөвхөн түүхэн лавлагаа болгон хадгалав.

**Огноо:** 2026-07-31 · **Одоогийн байдал:** **54.5 / 85 оноо = 64 %** · **Дутуу: 30.5 оноо = 36 %**

**Эх сурвалж:** `PRODUCTION-DESIGN.md` §3–§18 + кодын шууд шалгалт
**Холбоотой:** `REQUIREMENTS-COVERAGE.md` · `AUDIT.md` · `ARCHITECTURE.md`

> ✅ **Шат A (эвдэрсэн 8 зүйл) — 2026-07-31-нд ДУУССАН.** 23/23 smoke тест давсан;
> `tsc` · `eslint` (0 error) · `next build` · `nest build` дөрвүүлээ ногоон.

> Энэ файл бол **ажлын жагсаалт**. `- [ ]` бүрийг хийсний дараа `- [x]` болгож тэмдэглэ.
> Оноо (`+0.5` гэх мэт) нь 85-оноот production хэмжүүр дээрх нэмэгдэл.

---

# ✅ A. ЭВДЭРСЭН — ДУУССАН (2026-07-31 · +2.5 оноо)

> Эдгээр нь "дутуу" биш — **байгаа мөртлөө ажиллахгүй, эсвэл ХУДАЛ мэдээлэл өгдөг** байсан.
> Бүгд зассан. Доорх тайлбарууд нь **асуудал юу байсныг** тэмдэглэсэн түүх.
>
> **Нэмж олдсон, зассан:** `apiFetch` нь NestJS-ийн `null` хариуг (хоосон body-тай 200)
> `res.json()`-оор задалж унадаг байсан — "Захиалга цуцлах" урсгал зөвхөн дуудагч тал
> алдааг залгидаг байсны ачаар л ажилладаг мэт харагдаж байв (`lib/api/client.ts`).

- [x] **A1 · `<audio>`-ийн event listener хэзээ ч холбогддоггүй** ⛔ `+1.0`
  `frontend/src/lib/player/hooks/useAudioPlayback.ts` — listener effect `[]` deps.
  `Player` нь `open=false`-оор mount болдог → `<audio>` DOM-д байхгүй → effect буцна → дахин ажиллахгүй.
  **Эвдэрсэн 3 функц:** гүйлгэх мөрний цаг (үргэлж 0:00) · үнэгүй горимын 30 сек хязгаар · дуу дуусахад дараагийнх руу шилжих (autoplay/AI-санал).
  **Засвар:** effect-ийг `<audio>` mount болмогц дахин ажиллуулах (`[open]` эсвэл callback-ref). *15 мин*

- [x] **A2 · Нууц үг солих / профайл хадгалах ХУУРАМЧ** `+0.6`
  `components/player/views/ProfileView.tsx:57-75` → `lib/auth/auth-storage.ts`
  Backend дээр endpoint **байхгүй**; frontend нь хоосон localStorage сан дээр ажиллана (`seedAdmin()` хаанаас ч дуудагддаггүй).
  → Нууц үг солих нь **үргэлж "Одоогийн нууц үг буруу"** гэнэ. Профайл refresh хийхэд алга.
  **Засвар:** `PATCH /users/me` + `PATCH /users/me/password` (bcrypt verify+hash). *3–4 цаг*

- [x] **A3 · Админы "PRO эрх олгох/хасах" зөвхөн localStorage** `+0.4`
  `lib/data/admin-sub-overrides.ts` — зөвхөн тухайн админы browser-т бичигдэнэ. Хэрэглэгч эрх авахгүй.
  **Засвар:** `PATCH /users/:id/subscription` (ADMIN-only). *1–2 цаг*

- [x] **A4 · Админы "Зарлал" (broadcast) ХУДАЛ** `+0.3`
  `components/player/views/AdminView.tsx:73` → `pushFeed()` → **localStorage**.
  Зөвхөн админы өөрийнх нь browser-т очно, гэтэл дэлгэц дээр *"✅ Зарлал бүх хэрэглэгчид илгээгдлээ"* гэж бичдэг.
  **Засвар:** `notifications` хүснэгт + `POST /admin/broadcast`. *2–3 цаг*

- [x] **A5 · `TrackButtons.tsx` aria-label mojibake** `+0.2`
  `"Ð”ÑƒÑ€Ñ‚Ð°Ð¹Ð´ Ð½ÑÐ¼ÑÑ…"` ← бодит утга `"Дуртайд нэмэх"`. Давхар кодлогдсон UTF-8.
  Дэлгэц уншигч **утгагүй чимээ уншина** — deaf-first төсөлд ялангуяа эмзэг.
  **Засвар:** файлыг зөв UTF-8-аар дахин хадгалах. *10 мин*

- [x] **A6 · `getMoreByArtist` үхмэл код**
  Backend endpoint ✅ · `lib/api/client.ts:160` ✅ · **frontend-д хэзээ ч дуудагддаггүй**.
  **Засвар:** DetailView-д ашиглах эсвэл устгах. *30 мин*

- [x] **A7 · Default e2e тест унана**
  `backend/test/app.e2e-spec.ts` нь `GET /` → `"Hello World!"` хүлээдэг; тийм route байхгүй (`setGlobalPrefix('api')`).
  **Засвар:** устгах эсвэл бодит тест бичих. *10 мин*

- [x] **A8 · `.gitignore` хуучирсан**
  `web/` гэсэн хавтас байхгүй (`frontend/` болсон). Root `.gitignore`-д `frontend/` мөр алга.
  *(Одоогоор `frontend/.gitignore` аварч байгаа тул эрсдэл бага.)* *5 мин*

---

# §3. Гол хөдөлгүүр — дуу → мэдрэхүй `35 %` (5–7 өдөр · +3.5)

> **Дипломын novelty.** Хамгийн бага хангалттай бүлэг.

- [ ] **B1 · Haptic Score `frames[]` схем** — `duration × sampleRate` ширхэг мөр, мөр бүрд `[8 бүс, onset, beat, rms]`
  Одоо: зөвхөн `beatTimestamps[]` + 3 тоо. `sampleRate` · `sections` · `musicalKey` · `stems` — **байхгүй**
- [ ] **B2 · 3 бүс → 8 бүс** (`sub·bass·lowmid·mid·highmid·presence·brilliance·air`)
  Одоо `lib/audio/analyze.ts` ба `useHapticEngine.ts` хоёулаа **3 бүс** (~8 %/30 %/62 % of 128 bins)
- [ ] **B3 · `HapticDevice` abstraction** (§12-той хамт)
  ```ts
  interface HapticDevice { connect() · pulse({strength,ms}) · setBand(zone,level) · supportsMultiZone · disconnect() }
  ```
  Одоо `navigator.vibrate` шууд дуудагдана, давхарга **огт байхгүй**
- [ ] **B4 · Frame-index scheduler** — `Math.floor(currentTime × sampleRate)`-аар индекслэх
  Одоо `BeatScheduler.poll()` нь зөвхөн timestamp давсан эсэхийг шалгана
- [ ] **B5 · Onset detection** (spectral flux) — одоо зөвхөн energy-based beat
- [ ] **B6 · `musicalKey`** (chroma-based) — байхгүй
- [ ] **B7 · `sections[]`** (intro/verse/chorus/drop) — байхгүй
- [ ] **B8 · `bandToColor()` hsl томьёо** (§3.3) — 8°→308° лог шатлал. Одоо 6 визуалайзер бий ч энэ томьёо биш
- [ ] **B9 · Stem separation** (Demucs/Spleeter) — drums·bass·vocals тусдаа суваг. Эхлээгүй

---

# §4. Дүрүүд ба RBAC `60 %` (4–5 өдөр · +2.5)

- [ ] **C1 · `Content Curator` дүр** — `Role` enum-д нэмэх (одоо `ADMIN·THERAPIST·USER·PARENT` 4 л дүр)
  - [ ] Дуу байршуулах/мета засах эрх (хэрэглэгч устгах эрхгүй)
  - [ ] Haptic Score үүсгэх/шалгах
  - [ ] Дуу нийтлэх/хураах (publish/unpublish)
- [ ] **C2 · `Moderator` дүр**
  - [ ] Гомдол (report) хянах
  - [ ] Контент нуух / анхааруулга
  - [ ] Хэрэглэгч **ban** (устгах биш)
  - [ ] Audit log харах
- [ ] **C3 · Admin: дүр оноох** (`PATCH /admin/users/:id/role`) — одоо байхгүй
- [ ] **C4 · Admin: хэрэглэгч ban** — `users.status` талбар ч байхгүй
- [ ] **C5 · Pro: offline татах** (дуу + Score, PWA cache) — байхгүй
- [ ] **C6 · Pro: олон төхөөрөмж хооронд sync** — одоо бүх өгөгдөл localStorage тул боломжгүй
- [ ] **C7 · Pro: stem-based горим** — B9-с хамаарна
- [ ] **C8 · `Haptic Designer` дүр** *(сонголт)* — timeline editor. Эхлээгүй

---

# §5. Дүр бүрийн UI `70 %` (4–5 өдөр · +2.0)

### Guest
- [ ] **D1 · "Тухай / Хүртээмжийн мэдэгдэл" хуудас** — MSL дохионы хэлний видеотай

### Curator (§5.3)
- [ ] **D2 · Лицензийн талбарууд** — эх сурвалж · зөвшөөрөл · зохиогч · гэрээний дугаар
- [ ] **D3 · Analysis статус UI** — "Задалж байна… / Бэлэн / Алдаа" (job progress)
- [ ] **D4 · Haptic Score preview** — бүс/beat-ийг timeline дээр харах + "Туршиж мэдрэх"
- [ ] **D5 · Каталог импорт** — Jamendo / FMA API-аас хайж импортлох
- [ ] **D6 · Нийтлэх/хураах товч** — `Song.status` талбартай хамт

### Moderator (§5.4) — бүхэлдээ байхгүй
- [ ] **D7 · Гомдлын жагсаалт** (report queue)
- [ ] **D8 · Хэрэглэгчийн профайл + ban/анхааруулга**
- [ ] **D9 · Audit log харагдац**

### Admin (§5.5)
- [ ] **D10 · Аналитик** — DAU/MAU · retention · хамгийн их мэдрэгдсэн дуу · төхөөрөмжийн төрөл
- [ ] **D11 · Тохиргоо / Feature flags** — preview урт · үнэ · онцлох контент
- [ ] **D12 · Санхүү** — захиалга · орлого · буцаалт · webhook лог (одоо "—" харуулдаг)

---

# §6. Дата/дуу ingestion `40 %` (3–4 өдөр · +2.0)

### Эх сурвалж
- [ ] **E1 · Микрофон (live) горим** — `getUserMedia` **огт байхгүй** (баталгаажсан)
- [ ] **E2 · Jamendo / FMA лицензтэй API импорт**
- [ ] **E3 · Spotify Audio Analysis** (зөвхөн мета: beat/tempo)

### Pipeline
- [ ] **E4 · Presigned URL → S3** — одоо multer → локал диск (`backend/uploads/`)
- [ ] **E5 · `Song.status`** (`processing·ready·failed·unpublished`) — талбар **байхгүй**
- [ ] **E6 · Analysis queue** (BullMQ/Celery) — байхгүй
- [ ] **E7 · `score_url`** талбар + S3-д Score хадгалах
- [ ] **E8 · CDN** — одоо шууд серверээс дамжина

### Формат
- [ ] **E9 · HLS / AAC** түгээлт — одоо progressive MP3 л
- [ ] **E10 · Haptic Score бинар формат** (`Float32`/`Uint8` + gzip)
- [ ] **E11 · WebP / AVIF ковер**, олон хэмжээ

---

# §7. DSP pipeline `20 %` (4–5 өдөр · +3.0)

- [ ] **F1 · Python analysis worker** (librosa/Essentia) — **огт байхгүй**, одоо browser `OfflineAudioContext`
- [ ] **F2 · STFT → 8 логарифм бүс** (`edges = [20,60,150,400,1000,2500,6000,12000,20000]`)
- [ ] **F3 · `librosa.onset.onset_detect`**
- [ ] **F4 · `estimate_key()`** (chroma-based)
- [ ] **F5 · Job дараалал** — BullMQ (Node/Redis) эсвэл Celery (Python/Redis)
- [ ] **F6 · Retry + dead-letter + timeout + progress event**
- [ ] **F7 · Idempotent** — файлын hash-аар давхар задлахгүй
- [ ] **F8 · Score кэш + версионлол**
- [ ] **F9 · Real-time горимыг 8–16 бүс болгох** (§7.3)
- [ ] **F10 · AudioWorklet** — main thread чөлөөлөх

---

# §8–§9. Архитектур ба стек `40 % / 55 %` (+1.5)

- [ ] **G1 · Redis** (cache + queue)
- [ ] **G2 · S3 / MinIO** object storage
- [ ] **G3 · CDN** (Cloudflare)
- [ ] **G4 · Worker сервис** (тусдаа процесс)
- [ ] **G5 · Monorepo бүтэц** — `apps/{web,api,worker}` · `packages/{haptic-engine,score-schema,ui}` · `infra/` · `docs/`
- [ ] **G6 · OAuth (Google)** нэвтрэлт
- [ ] **G7 · Capacitor (Android)** — жинхэнэ vibrate амплитуд (0–255)
- [ ] **G8 · PWA** (offline cache, install)

---

# §10. DB schema `30 %` — 🔴 хамгийн эмзэг (3–4 өдөр · +4.0)

> **§10-ийн "localStorage → Postgres" зураглалын 8 мөрөөс 5 нь ОДОО Ч localStorage-д.**
> Хэрэглэгч браузер солиход эдгээр бүгд алга болно.

### Байхгүй хүснэгтүүд
- [ ] **H1 · `sensory_profiles`** 🔴 — калибровкийн үр дүн (`medreh_prefs:*` localStorage-д)
- [ ] **H2 · `user_track_actions`** 🔴 — дуртай/хадгалсан (`medreh_likes:*` · `medreh_saves:*`)
- [ ] **H3 · `playlists`** 🔴 — жагсаалт (`medreh_playlists:*`)
- [ ] **H4 · `payments`** 🔴 — төлбөрийн түүх (`medreh_payments:*`)
- [ ] **H5 · `notifications`** 🔴 — мэдэгдэл/зарлал (`medreh_feed`)
- [ ] **H6 · `subscriptions`** — тусдаа хүснэгт (одоо `User.subActive/subPlan` талбараар) + `provider`·`provider_ref`
- [ ] **H7 · `reports`** — гомдол
- [ ] **H8 · `audit_log`** — админы үйлдлийн мөр

### Дутуу талбарууд
- [ ] **H9 · `users.status`** (`active` / `banned`)
- [ ] **H10 · `users.hearing_profile`** (`deaf`/`hoh`/`hearing` — эмзэг, шифрлэлттэй)
- [ ] **H11 · `tracks.license`** ⚠️ **эрх зүйн эрсдэл** — заавал байх ёстой
- [ ] **H12 · `tracks.license_src`**
- [ ] **H13 · `tracks.status`**
- [ ] **H14 · `tracks.score_url`**
- [ ] **H15 · `tracks.music_key`**
- [ ] **H16 · `listen_events.vibrations`** (мэдэрсэн чичиргээний тоо)
- [ ] **H17 · `listen_events.device`** (`phone`/`gamepad`/`vest`)
- [ ] **H18 · `listen_events.day`** (aggregate)

---

# §11. API `40 %` — 20+ endpoint дутуу (3–4 өдөр · +2.5)

### Auth
- [ ] **I1 · `POST /auth/oauth/google`**
- [ ] **I2 · Имэйл баталгаажуулалт** (verify token)
- [ ] **I3 · Нууц үг сэргээх** (forgot / reset)

### Tracks
- [ ] **I4 · `GET /tracks/:id/score`** (CDN redirect)
- [ ] **I5 · `GET /tracks/:id/stream`** (signed / HLS)
- [ ] **I6 · `POST /tracks`** → presigned upload үүсгэх
- [ ] **I7 · `PUT /tracks/:id`** (мета засах)
- [ ] **I8 · `GET /tracks/:id/analysis-status`**
- [ ] **I9 · `POST /tracks/:id/publish` | `/unpublish`**

### Хэрэглэгчийн өгөгдөл — 🔴 бүхэлдээ дутуу
- [ ] **I10 · `GET/PUT /me/sensory-profile`** (калибровк хадгалах)
- [ ] **I11 · `POST /me/actions`** (like/save)
- [ ] **I12 · `GET /me/library`** (likes/saves/playlists)
- [ ] **I13 · `POST /me/listen-events`** (batch статистик)
- [ ] **I14 · `GET /me/stats`**
- [ ] **I15 · `PATCH /users/me`** (профайл — A2)
- [ ] **I16 · `PATCH /users/me/password`** (нууц үг — A2)

### Playlist
- [ ] **I17 · `POST/GET/PUT/DELETE /playlists`** — бүхэлдээ байхгүй

### Төлбөр
- [ ] **I18 · `POST /billing/subscribe`** → QPay/Stripe checkout
- [ ] **I19 · `POST /webhooks/qpay`** (сервер→сервер)
- [ ] **I20 · `GET /me/payments`**

### Admin
- [ ] **I21 · `PATCH /admin/users/:id/role`**
- [ ] **I22 · `POST /admin/users/:id/ban`**
- [ ] **I23 · `POST /admin/broadcast`** (бодит — A4)
- [ ] **I24 · `GET /admin/analytics`**
- [ ] **I25 · `PATCH /users/:id/subscription`** (ADMIN — A3)

### Moderator
- [ ] **I26 · `GET /moderation/reports`**
- [ ] **I27 · `POST /moderation/reports/:id/resolve`**

---

# §12. Төхөөрөмж `25 %` (4–6 өдөр · +2.5)

- [ ] **J1 · `HapticDevice` interface** (B3-той нэг)
- [ ] **J2 · BLE GATT бодит хэрэгжилт** 🔴 — одоо зөвхөн `requestDevice({acceptAllDevices:true})`.
  Service/characteristic холболт · олон мотор руу бичих — **огт байхгүй**
- [ ] **J3 · Gamepad-ийг тоглуулалттай синхрон болгох** — одоо зөвхөн илрүүлэлт + тест товч.
  `playEffect('dual-rumble', {strongMagnitude: bass, weakMagnitude: high})` beat бүрд
- [ ] **J4 · Capacitor native Android** — `VibrationEffect` амплитуд 0–255
- [ ] **J5 · Bone conduction** дэмжлэг
- [ ] **J6 · Wearable (watch)** companion

---

# §13. Хүртээмж `65 %` (3 өдөр · +1.5)

- [ ] **K1 · MSL дохионы хэлний видео** 🔴 — тусламж · онбординг · чухал заавруудад
- [ ] **K2 · Lyrics / caption** — дуунд үг байвал
- [ ] **K3 · WCAG 2.2 AA бүрэн audit** — axe / Lighthouse тайлан, контраст хэмжилт
- [ ] **K4 · Screen reader-ээр бодит тест** (NVDA / VoiceOver)
- [ ] **K5 · `aria-label` mojibake засах** (A5)

---

# §14. Аюулгүй байдал · нууцлал · эрх зүй `55 %` (2 өдөр · +1.5)

- [ ] **L1 · `JWT_ACCESS_SECRET` · `COOKIE_SECRET`** — одоо `change_me` 🔴 production-д тэсрэх эрсдэл
- [ ] **L2 · Presigned upload** (E4-тэй нэг)
- [ ] **L3 · Track бүрд `license` заавал** ⚠️ **эрх зүйн эрсдэл** (H11)
- [ ] **L4 · Takedown журам** + "би энэ дууг ашиглах эрхтэй" баталгаа
- [ ] **L5 · `hearing_profile` шифрлэлт + GDPR зөвшөөрөл**
- [ ] **L6 · Хэрэглэгч өгөгдлөө татах / устгах эрх**
- [ ] **L7 · CSRF хатууруулах** (одоо зөвхөн `sameSite: lax`)
- [ ] **L8 · 2FA** *(сонголт)*
- [ ] **L9 · `/uploads/*` public хандалт** — signed URL болгох

---

# §16. Тест `0 %` 🔴 (3 өдөр · +2.0)

> **Тест файлын тоо: 0.** Хамгийн том эрсдэл — регресс баригдахгүй.

- [ ] **M1 · Unit (backend)** — auth урсгал · `RolesGuard` · `assertTherapistOwnsPatient` · `assertCanReadUser`
- [ ] **M2 · Unit (frontend)** — `scoreRecommendations` · `BeatScheduler.poll` · `filterTracks` · `toProgressChartData` · `songToPlayerTrack`
- [ ] **M3 · Integration** — register → login → upload → analyze → history бүтэн урсгал
- [ ] **M4 · E2E (Playwright)** — нэвтрэх · дуу тоглуулах · калибровк · QR хослуулах
- [ ] **M5 · DSP валидаци** — мэдэгдэж буй BPM-тэй 10 дуун дээр **F-measure**
- [ ] **M6 · Latency хэмжилт** — beat → vibrate хоцролт (< 40 мс зорилт)
- [ ] **M7 · ⭐ Сонсголын бэрхшээлтэй бодит хүмүүстэй тест** — хэмнэл таних % · дуу ялгах · SUS
  *(Дүлийчүүдийн холбоо / тусгай сургуультай хамтрах — дипломын хамгийн хүчтэй нотолгоо)*

---

# §17. Deploy / DevOps `20 %` 🔴 (3 өдөр · +2.0)

> **Одоо аппыг сервер дээр гаргах боломжгүй.**

- [ ] **N1 · `backend/Dockerfile`**
- [ ] **N2 · `frontend/Dockerfile`**
- [ ] **N3 · Root `docker-compose.yml`** — api + web + postgres + redis + minio
- [ ] **N4 · CI/CD** — GitHub Actions: lint → test → build → deploy
- [ ] **N5 · Nginx / Caddy + TLS** (Let's Encrypt)
- [ ] **N6 · Postgres backup** (cron дамп + S3 versioning)
- [ ] **N7 · Sentry** (алдаа хянах)
- [ ] **N8 · `/health` endpoint**
- [ ] **N9 · Structured logging** (pino / winston)
- [ ] **N10 · Swagger / OpenAPI** баримт
- [ ] **N11 · Secret manager** (vault) — `.env`-ээс шилжих

---

# §18. Дипломын хэмжих үзүүлэлт `0 %` (1 өдөр · +1.0)

> Комисс эдгээрийг заавал асууна. Одоо **ямар ч тоо байхгүй**.

- [ ] **O1 · Beat detection F-measure** — "хэр нарийвчлалтай вэ?"
- [ ] **O2 · Latency (хоцролт) < 40 мс** — "хэдэн мс вэ?"
- [ ] **O3 · Хэмнэл/темп таних нарийвчлал (%)** — хэрэглэгчийн тест
- [ ] **O4 · Дуу ялгах чадвар** — хэрэглэгчийн тест
- [ ] **O5 · SUS (System Usability Scale)** оноо
- [ ] **O6 · "Яагаад 3 бүс, баримтад 8 гэж бичсэн бэ?"** — хариулт бэлдэх эсвэл 8 бүс болгох

---

# 🎁 Q. Non-requirement — дутуу үлдсэн хэсэг

> Баримтад байхгүй ч хийсэн 22 зүйлээс **бүрэн болоогүй нь**:

| # | Зүйл | Одоо | Дутуу |
|---|---|:--:|---|
| Q1 | SocialPay + Admin PRO таб | 55 % | PRO олгох localStorage-д (A3) |
| Q2 | Админы зарлал (broadcast) | 40 % | localStorage-д, худал мессеж (A4) |
| Q3 | `getMoreByArtist` | 30 % | Үхмэл код (A6) |
| Q4 | Client-side анализ | 85 % | 3 бүс (B2) |
| Q5 | a11y дэд бүтэц | 90 % | mojibake (A5) |

---

# 📋 Гүйцэтгэлийн дараалал

| Шат | Ажил | Хугацаа | Оноо | Дүн |
|:--:|---|:--:|:--:|:--:|
| ~~1~~ | ~~**A1–A8 — эвдэрсэнийг засах**~~ | ✅ **ДУУССАН** | **+2.5** | 61 % → **64 %** |
| **2** | **H1–H18 — localStorage → Postgres** | 3–4 өдөр | +4.0 | → **68 %** |
| **3** | **I1–I27 — дутуу endpoint** | 3–4 өдөр | +2.5 | → **71 %** |
| **4** | **B1–B9 — Haptic Score + 8 бүс** | 5–7 өдөр | +3.5 | → **75 %** |
| **5** | **F1–F10 — Python DSP worker** | 4–5 өдөр | +3.0 | → **79 %** |
| **6** | **M1–M7 + O1–O6 — тест ба хэмжилт** | 4 өдөр | +3.0 | → **82 %** |
| **7** | **J1–J6 — төхөөрөмж** | 4–6 өдөр | +2.5 | → **85 %** |
| **8** | **N1–N11 — DevOps** | 3 өдөр | +2.0 | → **88 %** |
| **9** | **C1–C8 + D1–D12 — Curator/Moderator/UI** | 8–10 өдөр | +4.5 | → **93 %** |
| **10** | **E1–E11 + G1–G8 — ingestion/архитектур** | 6–8 өдөр | +3.5 | → **97 %** |
| **11** | **K1–K5 + L1–L9 — a11y/эрх зүй** | 5 өдөр | +3.0 | → **100 %** |

**Нийт: ≈ 45–50 ажлын өдөр** (1 хүн)

---

## ⭐ Дипломын хамгаалалт хүртэл ХАМГИЙН БАГА (6 өдөр)

- [x] ~~Шат 1 бүтэн — эвдэрсэн 5 функц~~ ✅ **ДУУССАН**
- [ ] **O1 + O2** (**1 өдөр**) — F-measure + latency хэмжих
- [ ] **B2** (**2 өдөр**) — 3 бүс → 8 бүс (`Song.beatTimestamps` аль хэдийн `Json` тул schema өөрчлөгдөхгүй)
- [ ] **M1 + M2** (**2 өдөр**) — 20–30 unit тест

→ Дипломын шалгуураар **73 % → 88 %**
