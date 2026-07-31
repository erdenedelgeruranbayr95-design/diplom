# МЭДРЭХ® — Requirement хангалтын дүн

**Хэмжсэн эсрэг:** `PRODUCTION-DESIGN.md` v1.1 (§1–§19)
**Огноо:** 2026-07-31 · **Арга:** шаардлага бүрийг эх кодтой мөр мөрөөр тулгасан
**Хамааралтай:** `AUDIT.md` (production бэлэн байдал), `ARCHITECTURE.md` (кодын бүтэц)

---

## 0. ЭЦСИЙН ДҮН

| Хэмжүүр | Үр дүн |
|---|---|
| **Дизайн баримтын шаардлага хангалт** | **≈ 43 %** |
| **Дутуу** | **≈ 57 %** |
| **Баримтад БАЙХГҮЙ, нэмж хийсэн ажил** | **20 зүйл** (≈ баримтын scope-ийн **15 %**-тай дүйцэх хөдөлмөр) |
| **Нийт хийгдсэн бодит хөдөлмөр** (шаардлага + нэмэлт) | **≈ 58 %** |

> ⚠️ **Хоёр өөр тоо байгааг ялгаж ойлгоорой:**
> - `AUDIT.md`-ийн **59 %** = "энэ апп жинхэнэ бүтээгдэхүүн болоход хэр бэлэн вэ"
> - Энэ баримтын **43 %** = "дизайн баримтад бичсэн ЯГ юмнуудын хэдийг нь хийсэн бэ"
>
> Ялгаа гарах шалтгаан: дизайн баримт нь маш өндөр зорилт тавьсан (Haptic Score,
> Python DSP worker, S3, Moderator, QPay, MSL дохионы хэл, stem separation) — эдгээрийн
> ихэнх нь хийгдээгүй. Харин хийгдсэн зүйлс нь **чанартай** тул "бэлэн байдал" илүү өндөр.

---

## 1. Бүлэг тус бүрийн хангалт

| § | Бүлэг | Жин | Хангалт | Жинлэсэн |
|---|---|---:|---:|---:|
| **§3** | Гол хөдөлгүүр (Haptic Score · scheduler · өнгө · stem) | 15 % | **35 %** | 5.25 |
| **§4** | Хэрэглэгчийн дүрүүд ба RBAC | 8 % | **60 %** | 4.80 |
| **§5** | Дүр бүрийн UI дэлгэцүүд | 12 % | **70 %** | 8.40 |
| **§6** | Дата/дуу орж ирэх pipeline | 10 % | **40 %** | 4.00 |
| **§7** | Дуу боловсруулах (DSP worker) | 8 % | **20 %** | 1.60 |
| **§8** | Системийн архитектур | 5 % | **40 %** | 2.00 |
| **§9** | Технологийн стек | 5 % | **55 %** | 2.75 |
| **§10** | Өгөгдлийн загвар (DB schema) | 8 % | **30 %** | 2.40 |
| **§11** | API дизайн | 8 % | **40 %** | 3.20 |
| **§12** | Төхөөрөмжийн интеграци | 7 % | **25 %** | 1.75 |
| **§13** | Хүртээмж (deaf-first) | 5 % | **65 %** | 3.25 |
| **§14** | Аюулгүй байдал · нууцлал · эрх зүй | 5 % | **55 %** | 2.75 |
| **§16** | Туршилтын стратеги | 2 % | **0 %** | 0.00 |
| **§17** | Deploy / DevOps | 2 % | **20 %** | 0.40 |
| | **НИЙТ** | **100 %** | | **42.6 % ≈ 43 %** |

---

## 2. §3 — Гол хөдөлгүүр · **35 %** 🔴

> Энэ бол дипломын **novelty**. Хамгийн бага хангалттай бүлэг.

| Шаардлага | Төлөв | Бодит байдал |
|---|:--:|---|
| §3.1 Haptic Score өгөгдлийн бүтэц (frame-based) | 🔴 20 % | `Song.beatTimestamps` + 4 band energy тоо л бий. **`frames[]` массив, `sampleRate`, `sections`, `musicalKey`, `stems` — байхгүй** |
| §3.1 **8 бүс** (`sub…air`) | 🔴 0 % | Одоо **3 бүс** (lo/mi/hi). Backend-д `bassEnergy/midEnergy/trebleEnergy` — 3 л тоо |
| §3.2 Score-driven scheduler | 🟡 45 % | `BeatScheduler.poll()` бий (timestamp-driven ✅) ч **frame-index биш**, `device.setBand()` байхгүй |
| §3.2 `device` abstraction (олон гаралт руу чиглүүлэх) | 🔴 0 % | `navigator.vibrate` шууд дуудагдана, abstraction давхарга **огт байхгүй** |
| §3.3 Давтамж → өнгө (`bandToColor` hsl томьёо) | 🟡 55 % | 6 визуалайзер горим бий ✅, гэхдээ баримтын **лог-шатлалт 8-бүсийн hue томьёо биш** |
| §3.4 Stem separation (Demucs) | 🔴 0 % | Байхгүй |

**Дутуу ажил:** frame-based Score схем + 8 бүсийн задаргаа + device abstraction ≈ **5–7 өдөр**

---

## 3. §4 — Дүрүүд ба RBAC · **60 %** 🟡

### Баримтад заасан 8 дүр:

| # | Дүр (баримт) | Хэрэгжсэн үү | Тайлбар |
|---|---|:--:|---|
| 1 | **Guest** (Зочин) | ✅ 100 % | Landing, preview, auth modal |
| 2 | **Listener** | ✅ 100 % | `Role.USER` — бүх функц |
| 3 | **Pro Listener** | 🟡 40 % | `subActive` flag ✅. **Offline татах ❌, олон төхөөрөмж sync ❌, stem mode ❌** |
| 4 | **Content Curator** | 🔴 0 % | **Тийм дүр байхгүй.** Дуу нэмэх нь `USER`/`ADMIN`-д. Publish/unpublish, лиценз ❌ |
| 5 | **Moderator** | 🔴 0 % | **Тийм дүр байхгүй.** Report / ban / audit log — гурвуулаа ❌ |
| 6 | **Admin** | ✅ 90 % | Хэрэглэгч удирдах ✅, дүр оноох ❌, ban ❌ |
| 7 | *(сонголт)* Haptic Designer | 🔴 0 % | Эхлээгүй |
| 8 | *(сонголт)* **Therapist/Educator** | ✅ **95 %** | ⭐ **Сонголтот дүрийг бүрэн хэрэгжүүлсэн** — session, progress, assignment, график |

**Хэрэгжсэн: 4 дүр** (`ADMIN` · `THERAPIST` · `USER` · `PARENT`) — баримтын `Curator`/`Moderator` хоёрын оронд.

### §4.3 RBAC эрхийн матриц (12 мөр):

| Үйлдэл | Төлөв |
|---|:--:|
| Демо/preview мэдрэх | ✅ |
| Бүтэн дуу мэдрэх (PRO хязгаар) | 🔴 **Эвдэрсэн** — `<audio>` bug-аас болж 30 сек хязгаар ажиллахгүй |
| Калибровк/тохиргоо | ✅ |
| Like/Save/Playlist **sync** | 🟡 Ажиллана ч **localStorage** — төхөөрөмж хооронд sync ❌ |
| Offline татах | 🔴 ❌ |
| Дуу байршуулах/мета | ✅ |
| Haptic Score үүсгэх/шалгах | 🟡 Анализ ✅, **Score preview ❌** |
| Дуу нийтлэх/хураах | 🔴 ❌ (`status` талбар DB-д байхгүй) |
| Гомдол хянах/контент нуух | 🔴 ❌ |
| Хэрэглэгч ban | 🔴 ❌ |
| Хэрэглэгч устгах / **дүр оноох** | 🟡 Устгах ✅, **дүр оноох ❌** |
| Төлбөр/орлого/тохиргоо | 🔴 ❌ (mock) |

**Хангалт: 4.5 / 12 = 38 %** · Сервер талын эрхийн шалгалт нь хийгдсэн хэсэгтээ **маш чанартай** (`assertTherapistOwnsPatient`, `assertCanReadUser`).

---

## 4. §5 — Дүр бүрийн UI · **70 %** 🟢

| Хэсэг | ★ (одоо байсан) | ➕ (шинээр нэмэх) | Хангалт |
|---|---|---|---:|
| §5.1 Guest | 3/3 ✅ | 0/1 (MSL видеотай "Тухай" ❌) | **75 %** |
| §5.2 Listener | 9/9 ✅ | 2/2 ✅ (Төхөөрөмж, Playlist) | **100 %** |
| §5.3 Curator | 2/2 ✅ | 0/4 ❌ (лиценз, статус, Score preview, каталог импорт) | **33 %** |
| §5.4 Moderator | — | 0/3 ❌ | **0 %** |
| §5.5 Admin | 2/2 ✅ | 0.5/4 (санхүү 🟡; аналитик/flags/дүр оноох ❌) | **45 %** |

**Listener дэлгэцүүд 100 % — энэ бол хамгийн хүчтэй хэсэг.** 20 дэлгэц бүрэн ажиллана.

---

## 5. §6 — Дата/дуу pipeline · **40 %** 🟡

### §6.1 Эх сурвалж (6):
| Эх сурвалж | Төлөв |
|---|:--:|
| Демо каталог (SoundHelix/CC) | ✅ |
| Curator upload | ✅ |
| Хэрэглэгчийн upload | ✅ |
| **Микрофон (live)** | 🔴 ❌ |
| **Лицензтэй API (Jamendo/FMA)** | 🔴 ❌ |
| Spotify Audio Analysis (мета) | 🔴 ❌ |
→ **3/6 = 50 %**

### §6.2 Ingestion pipeline (7 алхам):
| Алхам | Төлөв |
|---|:--:|
| 1. Presigned URL → S3 | 🔴 ❌ (multer → локал диск) |
| 2. `status: processing` | 🔴 ❌ (`Song.status` талбар **байхгүй**) |
| 3. Analysis queue (BullMQ/Celery) | 🔴 ❌ |
| 4. Worker → Haptic Score → S3 | 🔴 ❌ |
| 5. `status: ready`, `score_url` | 🔴 ❌ |
| 6. Feed мэдэгдэл | 🟡 (localStorage feed, backend `notifications` ❌) |
| 7. CDN-ээс татаж тоглуулах | 🟡 (шууд серверээс, CDN ❌) |
→ **1/7 ≈ 15 %**

### §6.3 Формат:
HLS/AAC ❌ · Score бинар ❌ · WebP/AVIF ковер ❌ → **0 %** (progressive MP3 л бий)

### §6.4 End-to-end дүлий туршлага (7 алхам):
audio+score татах 🟡 · frame индекслэх ❌ · beat импульс ✅ · **бас/дунд/өндөр → биеийн 3 цэг** 🔴 (UI-д оноож болно, бодит олон мотор ❌) · дэлгэц ✅ · калибровкийн профайл ✅ · 3 сувгаар зэрэг мэдрэх 🟡
→ **≈ 55 %**

---

## 6. §7 — DSP pipeline · **20 %** 🔴

| Шаардлага | Төлөв |
|---|:--:|
| §7.1 Python worker (librosa/Essentia) | 🔴 **0 %** — оронд нь browser `OfflineAudioContext` |
| §7.1 STFT → 8 лог бүс | 🔴 0 % |
| §7.1 Onset detection | 🔴 0 % (зөвхөн beat) |
| §7.1 Tempo/BPM | ✅ 100 % |
| §7.1 RMS | ✅ 100 % |
| §7.1 Musical key (chroma) | 🔴 0 % |
| §7.2 Queue · retry · idempotent · cache | 🔴 0 % |
| §7.3 Real-time горим 8–16 бүс + AudioWorklet | 🔴 15 % (3 бүс, AudioWorklet ❌) |

> ⚖️ **Шударга тэмдэглэл:** browser-ийн `analyze.ts` нь BPM · beatTimestamps · RMS · peak ·
> 3 band energy · waveformPeaks-ийг бодитоор тооцдог тул "юу ч байхгүй" биш. Гэхдээ
> баримтын шаардсан **сервер талын, 8-бүсийн, frame-based** pipeline биш.

---

## 7. §10 — DB schema · **30 %** 🔴

Баримт **11 хүснэгт** заасан:

| Баримтын хүснэгт | Хэрэгжсэн үү | Тайлбар |
|---|:--:|---|
| `users` | 🟡 80 % | ✅ бий. **`status` (banned) ❌, `hearing_profile` ❌** |
| `tracks` | 🟡 65 % | `Song` бий. **`license` ❌ `license_src` ❌ `status` ❌ `score_url` ❌ `music_key` ❌** |
| `sensory_profiles` | 🔴 **0 %** | **localStorage `medreh_prefs:*` хэвээр** — калибровк төхөөрөмж хооронд дамжихгүй |
| `user_track_actions` | 🔴 **0 %** | **localStorage `medreh_likes/saves` хэвээр** |
| `listen_events` | 🟡 50 % | `ListenHistory` бий. **`vibrations` ❌ `device` ❌ `day` aggregate ❌** |
| `subscriptions` | 🟡 30 % | Тусдаа хүснэгт ❌ — `User.subActive/subPlan` талбараар. `provider`/`provider_ref` ❌ |
| `payments` | 🔴 **0 %** | **localStorage `medreh_payments:*` хэвээр** |
| `notifications` | 🔴 **0 %** | **localStorage `medreh_feed` хэвээр** |
| `reports` | 🔴 0 % | Байхгүй |
| `audit_log` | 🔴 0 % | Байхгүй |
| `playlists` | 🔴 **0 %** | **localStorage хэвээр** |

**→ 3.25 / 11 ≈ 30 %**

🔴 **Хамгийн эмзэг олдвор:** §10-ийн "localStorage → Postgres" зураглалын **8 мөрөөс 5 нь одоо ч localStorage-д** (prefs, likes/saves, payments, feed, playlists). Хэрэглэгч браузер солиход эдгээр бүгд алга болно.

---

## 8. §11 — API дизайн · **40 %** 🟡

| Бүлэг | Хийгдсэн / Нийт |
|---|:--:|
| Auth | **5 / 6** (OAuth Google ❌) |
| Tracks (нийтийн) | **2.5 / 4** (`/score` ❌, `/stream` signed/HLS 🟡) |
| Curator/Admin | **2.5 / 6** (presigned ❌, PUT мета ❌, analysis-status ❌, publish/unpublish ❌) |
| Хэрэглэгчийн өгөгдөл | **0.5 / 5** (sensory-profile ❌, actions ❌, library ❌, stats ❌) |
| Playlist | **0 / 1** |
| Захиалга/төлбөр | **1 / 4** (checkout ❌, webhook ❌, payments ❌) |
| Admin | **1 / 5** (role PATCH ❌, ban ❌, broadcast ❌, analytics ❌) |
| Moderator | **0 / 2** |
| Realtime WS | **1 / 1** ✅ |
| **НИЙТ** | **13.5 / 34 ≈ 40 %** |

**Нэмэлт (баримтад байхгүй) endpoint:** `/songs/featured` · `/songs/recent` · `/songs/popular` · `/songs/:id/more-by-artist` · `/artists/*` · `/qr/*` · `/therapy/*` · `/assignments/*` · `/history/*`

---

## 9. §12 — Төхөөрөмж · **25 %** 🔴

| Төхөөрөмж | Баримт шаардсан | Хэрэгжсэн |
|---|---|:--:|
| `HapticDevice` interface (abstraction) | ✅ шаардсан | 🔴 **0 %** |
| Утас `navigator.vibrate` | ✅ | ✅ **95 %** |
| Native Android (Capacitor, амплитуд 0–255) | ✅ | 🔴 0 % |
| Gamepad `dual-rumble` | ✅ | 🟡 **50 %** (илрүүлэлт + тест ✅, **тоглуулалттай синхрон ❌**) |
| BLE хаптик хантааз (олон мотор) | ✅ гол | 🔴 **10 %** (`requestDevice()` л бий, GATT/characteristic ❌) |
| Bone conduction | ✅ | 🔴 0 % |
| Wearable (watch) | ✅ | 🔴 0 % |

---

## 10. §13 — Хүртээмж · **65 %** 🟢

| Шаардлага | Төлөв |
|---|:--:|
| Аудио дохионд найдахгүй (бүх feedback визуал+хаптик) | ✅ 100 % |
| **MSL дохионы хэлний видео** | 🔴 **0 %** |
| Lyrics / caption | 🔴 0 % |
| WCAG 2.2 AA · контраст · focus ring · keyboard nav | 🟡 **70 %** (сайн хийгдсэн, **бүрэн audit ❌**) |
| Хаптик онбординг (калибровк) | ✅ 100 % |
| `prefers-reduced-motion` | ✅ **110 %** (CSS + framer-motion + апп доторх шилжүүлэгч) |
| "Энэ дуу ямар мэдрэмж төрүүлэх" тэмдэглэгээ | ✅ 100 % (FEEL профайл + Signal карт) |

⚠️ `TrackButtons.tsx`-ийн `aria-label` mojibake-аас болж **дэлгэц уншигч утгагүй текст уншина** (`AUDIT.md` §2.5).

---

## 11. §14 — Аюулгүй байдал · **55 %** 🟡

| Шаардлага | Төлөв |
|---|:--:|
| Нууц үг сервер талд hash (argon2id/bcrypt) | ✅ bcrypt(10) |
| JWT богино + refresh **rotation** | ✅ 15 мин + rotation + sha256 hash |
| HttpOnly cookie | ✅ |
| RBAC **серверт** шалгах | ✅ маш сайн |
| Rate limiting | ✅ (auth 5/мин, global 100/мин) |
| CSRF | 🟡 `sameSite: lax` — хэсэгчлэн |
| Input validation | ✅ `class-validator` + global `ValidationPipe` |
| File type/size шалгалт | ✅ `audio/*` + 25 MB |
| **Presigned upload** | 🔴 ❌ |
| `hearing_profile` шифрлэлт/зөвшөөрөл | 🔴 ❌ (талбар өөрөө байхгүй) |
| Хэрэглэгч өгөгдлөө татах/устгах эрх | 🔴 ❌ |
| Track бүрд `license` заавал | 🔴 **❌ — эрх зүйн эрсдэл** |
| Takedown журам | 🔴 ❌ |

🔴 `JWT_ACCESS_SECRET=change_me` · `COOKIE_SECRET=change_me` — production-д тэсрэх эрсдэл.

---

## 12. §16 — Тест · **0 %** 🔴

| Шаардлага | Төлөв |
|---|:--:|
| Unit (engine маппинг, score parser, RBAC middleware) | 🔴 0 |
| Integration (upload→analyze→score→playback) | 🔴 0 |
| E2E (Playwright: нэвтрэх, тоглуулах, калибровк) | 🔴 0 |
| DSP валидаци (beat detection F-measure) | 🔴 0 |
| ⭐ **Сонсголын бэрхшээлтэй бодит хүмүүстэй тест** | 🔴 0 |

**Тест файлын тоо: 0.** Default `app.e2e-spec.ts` нь `GET /` хүлээдэг ч тийм route байхгүй → **унана**.

---

## 13. §17 — DevOps · **20 %** 🔴

Frontend CDN ❌ · API/worker Docker ❌ · CI/CD ❌ · **Migrations ✅** · Secrets 🟡 (`change_me`) · Backup ❌ · Sentry/uptime/лог ❌ → **1 / 7**

---

# 🎁 II. БАРИМТАД БАЙХГҮЙ — НЭМЖ ХИЙСЭН АЖИЛ (Non-requirement)

> Дизайн баримтад **огт заагаагүй** мөртлөө хийгдсэн зүйлс. Эдгээр нь "илүү ажил" биш —
> ихэнх нь бүтээгдэхүүнийг бодитоор сайжруулсан.

| # | Нэмэлт ажил | Хэмжээ | Үнэ цэн |
|---|---|:--:|---|
| 1 | **PARENT (эцэг эх) дүр** — бүрэн дашбоард, `ParentLink`, зөвхөн-унших хүүхдийн харагдац | Том | ⭐⭐⭐ Баримтын 8 дүрд **огт байхгүй**. Дүлий хүүхдийн эцэг эхэд бодит хэрэгцээ |
| 2 | **THERAPIST дүрийг бүрэн хэрэгжүүлсэн** — `TherapySession`, `Progress`, assignment, график | Том | ⭐⭐⭐ Баримтад зөвхөн *"(сонголт) №8"* гэж бичсэн байсан |
| 3 | **QR-аар утас хослуулах + socket.io beat streaming** (`QRSession`, `SessionGateway`, `/mobile/[token]`) | Том | ⭐⭐⭐ §12-т огт байхгүй. **Компьютер дээр тоглуулж, утсаараа мэдрэх** — бодит шинэлэг тал |
| 4 | **`Artist` сущность + дуучны хуудас** (bio, карьер, зураг, бүх дуу) | Дунд | ⭐⭐ §10-д зөвхөн `artist text` талбар байсан |
| 5 | **AI санал болгол** (`scoreRecommendations` — 6 жинтэй оноолт, шалтгаан тайлбартай) | Дунд | ⭐⭐ Баримтад байхгүй |
| 6 | **6 визуалайзер горим** (bars · waveform · circular · beat-pulse · bass-explosion · ambient) | Дунд | ⭐⭐ §3.3 зөвхөн өнгө маппинг шаардсан |
| 7 | **Signal карт** — DetailView дэх амьд спектр + бүсийн хуваарилалт | Жижиг | ⭐⭐ |
| 8 | **Амжилтууд (Achievements)** дэлгэц | Жижиг | ⭐ |
| 9 | **Хэрэглэгчийн "Миний ахиц"** дэлгэц | Жижиг | ⭐⭐ Баримтад зөвхөн эмчид байсан |
| 10 | **Нүүр дашбоард rails** — Онцлох · Алдартай · Сүүлийн үеийн · Алдартай дуучид (4 backend endpoint) | Дунд | ⭐⭐ |
| 11 | **`/songs/:id/more-by-artist`** endpoint | Жижиг | ⭐ |
| 12 | **Сонссон түүх (ListenHistory) + хайлт/pagination/устгах UI** | Дунд | ⭐⭐ §10-д `listen_events` байсан ч UI заагаагүй |
| 13 | **Client-side анализ** (`OfflineAudioContext`) — Python worker-ийн орлуулагч | Дунд | ⭐⭐ Баримт сервер талд шаардсан; client-side нь ажилладаг түр шийдэл |
| 14 | **Next.js App Router** (Vite биш) + SSR/routing | Дунд | ⭐⭐ §9-д React+Vite байсан — стек сайжруулалт |
| 15 | **WebGL CircularGallery** (ogl) landing галерей | Дунд | ⭐ |
| 16 | **Toast · Motion · Auth провайдер систем** | Жижиг | ⭐⭐ |
| 17 | **Skip-link · focus trap · Escape шатлал · live region** (a11y дэд бүтэц) | Дунд | ⭐⭐⭐ §13-аас илүү гүнзгий |
| 18 | **SocialPay QR демо урсгал + Admin "PRO Management" таб** | Дунд | ⭐ §11 QPay/Stripe шаардсан; энэ нь UI scaffolding |
| 19 | **P6 архитектур рефакторинг** — 13 hook, PlayerContext, давхаргын дүрэм, `ARCHITECTURE.md` | Том | ⭐⭐⭐ Баримтад байхгүй; **цаашид хөгжүүлэх суурь** |
| 20 | **`FRONTEND-PHASES.md`** — P0–P8 гүйцэтгэлийн төлөвлөгөө | Дунд | ⭐⭐ |

**Дүн:** 20 зүйл · үүнээс **5 нь том хэмжээний** (PARENT дүр, THERAPIST бүрэн, QR pairing, архитектур, Artist)

**Хөдөлмөрийн үнэлгээ:** ≈ баримтын нийт scope-ийн **15 %**-тай дүйцэх ажил.

---

# III. НЭГТГЭСЭН ДҮН

```
Дизайн баримтын шаардлага:        43 %  ████████▌░░░░░░░░░░░
Дутуу шаардлага:                  57 %  ░░░░░░░░░░░███████████
Баримтад байхгүй нэмэлт ажил:   + 15 %  ███
─────────────────────────────────────────────────────────────
Нийт бодит хийгдсэн хөдөлмөр:   ≈ 58 %
```

| Асуулт | Хариулт |
|---|---|
| **Requirement-ийн хэдэн хувийг хийсэн бэ?** | **43 %** |
| **Хэдэн хувь дутуу вэ?** | **57 %** |
| **Requirement-д байхгүй юу хийсэн бэ?** | **20 зүйл** (≈ scope-ийн 15 %) |
| **Нийт хөдөлмөрөөр хэдэн хувь вэ?** | **≈ 58 %** |
| **Production-д бэлэн үү?** | **59 %** (`AUDIT.md`) — үгүй |
| **Дипломд бэлэн үү?** | **≈ 85 %** — тийм, 1 өдрийн засвартай |

---

## IV. Дутуу 57 %-ийн задаргаа (юуг хийвэл хэд нэмэгдэх вэ)

| Ажил | Хугацаа | Нэмэгдэх % |
|---|:--:|:--:|
| **§10 localStorage → Postgres** (prefs · likes/saves · playlists · payments · notifications) | 3–4 өдөр | **+8 %** |
| **§3 Haptic Score + 8 бүс + device abstraction** | 5–7 өдөр | **+7 %** |
| **§7 Python DSP worker + queue** | 4–5 өдөр | **+6 %** |
| **§11 дутуу endpoint-ууд** (sensory-profile, actions, library, stats, playlists, admin role/ban/broadcast/analytics) | 3–4 өдөр | **+5 %** |
| **§4 Curator + Moderator дүр** (reports, ban, audit log, publish/unpublish, license) | 4–5 өдөр | **+5 %** |
| **§12 BLE GATT + gamepad синхрон + Capacitor** | 4–6 өдөр | **+5 %** |
| **§17 DevOps** (Dockerfile · CI/CD · S3 · Nginx · Sentry · backup) | 3 өдөр | **+4 %** |
| **§16 Тест** (unit · integration · E2E · DSP валидаци) | 3 өдөр | **+4 %** |
| **§6 Ingestion** (presigned S3, status, HLS, Jamendo импорт, микрофон) | 3–4 өдөр | **+4 %** |
| **§13 MSL дохионы хэл + WCAG audit + caption** | 3 өдөр | **+3 %** |
| **§14 Лиценз · takedown · дата экспорт/устгал · secrets** | 2 өдөр | **+3 %** |
| **§11 жинхэнэ төлбөр** (QPay/Stripe + webhook) | 3 өдөр | **+3 %** |
| §3.4 Stem separation (Demucs) | 3 өдөр | +2 % |
| **⭐ Сонсголын бэрхшээлтэй хүмүүстэй хэрэглэгчийн тест** | 1–2 долоо хоног | **+2 %** (гэхдээ **дипломд хамгийн үнэ цэнтэй**) |

**Нийт: ≈ 45–55 ажлын өдөр** (1 хүн) → 100 %

### Хамгийн өндөр өгөөжтэй 3 алхам
1. **localStorage → Postgres (§10)** — 3–4 өдөр, +8 %. Одоо хэрэглэгчийн өгөгдөл браузарт л байгаа нь бүтээгдэхүүн болох гол саад.
2. **Haptic Score + 8 бүс (§3)** — 5–7 өдөр, +7 %. **Дипломын novelty-г бодитоор баталгаажуулна.**
3. **Тест (§16)** — 3 өдөр, +4 %. Цаашдын бүх ажлыг найдвартай болгоно.
