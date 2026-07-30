# МЭДРЭХ® — Frontend-ээс эхлэх хөгжүүлэлтийн үе шатууд (Phases)

> Энэ баримт нь `PRODUCTION-DESIGN.md`-ийн **гүйцэтгэлийн төлөвлөгөө**.
> Design doc нь "юу барих вэ"-г, энэ файл нь "ямар дарааллаар барих вэ"-г хэлнэ.
>
> Сүүлд шинэчилсэн: **2026-07-30** · Кодын бодит шинжилгээнд үндэслэв (таамаг биш).

---

## 0. Одоогийн бодит байдал (хэмжсэн үзүүлэлт)

`PRODUCTION-DESIGN.md`-ийн §15/§19 нь Vite прототипийн үеийн мэдээлэл байсан — доорх нь **өнөөдрийн код**.

### Стек

| Давхарга | Технологи | Порт | Төлөв |
|---|---|---|---|
| Frontend | Next.js 15.5 · React 19 · Tailwind v4 · TS 5 | **3001** | Ажиллаж байна |
| Backend | NestJS 11 · Prisma 5 · socket.io | **3000** (`/api`) | Ажиллаж байна |
| DB | PostgreSQL 16 (docker `medreh-pg`) | **5434** | 5 migration, seed бэлэн |

Frontend → backend холболт нь `next.config.ts`-ийн rewrites (`/api/*`, `/uploads/*`) дамжина.
Хөгжүүлэх заавар: доорх **Хавсралт А**.

### Кодын хэмжээ

| Үзүүлэлт | Утга |
|---|---|
| `.tsx` файл | **105** |
| Нийт мөр (tsx) | **12,812** |
| CSS мөр | **1,540** (`medreh` 790 + `polish` 355 + `ui` 305 + `globals` 90) |
| Хамгийн том компонент | `Player.tsx` **1,070** мөр |
| Дараагийнх | `HomeView` 565 · `CircularGallery` 555 · `DetailView` 448 · `Icon` 437 |
| Backend модуль | 9 (`auth` `users` `songs` `artists` `assignments` `therapy` `history` `qr` `socket`) |

### Эрүүл мэндийн шалгалт

| Шалгалт | Үр дүн |
|---|---|
| `npx tsc --noEmit` | ❌ **3 алдаа** (бүгд `DetailView.tsx`) |
| `npx next lint` | ✅ 0 алдаа · ⚠️ ~20 warning (`<img>` → `next/image`) |
| Frontend тест | ❌ **Байхгүй** (`package.json`-д `test` script алга) |
| Legacy CSS ашиглалт | 5 файлд 8 удаа (бараг бүрэн Tailwind руу шилжсэн) |
| `medreh.css` үхмэл selector | **220-аас 131 нь** хаанаас ч дуудагдахгүй (~60%) |

---

## Үе шатуудын тойм

| Phase | Нэр | Хугацаа | Эрсдэл | Заавал юу? |
|---|---|---|---|---|
| **P0** | Blocker засвар | 0.5 өдөр | Бага | 🔴 Заавал |
| **P1** | Дизайн систем бэхжүүлэх | 2–3 өдөр | Бага | 🔴 Заавал |
| **P2** | Дэлгэц бүрийн UI/UX | 5–7 өдөр | Дунд | 🔴 Заавал |
| **P3** | Хүртээмж (deaf-first a11y) | 3–4 өдөр | Бага | 🔴 Заавал (дипломын гол) |
| **P4** | "Хуурамч" тохиргоог амьдруулах | 2–3 өдөр | Дунд | 🟡 Чухал |
| **P5** | Гүйцэтгэл (performance) | 2 өдөр | Бага | 🟡 Чухал |
| **P6** | Архитектур цэвэрлэгээ | 3–4 өдөр | **Өндөр** | 🟢 Сонголт |
| **P7** | Тест | 3 өдөр | Бага | 🟡 Чухал |
| **P8** | Backend залгамж | 4–5 өдөр | Дунд | 🟢 Дараа |

> **Дипломын хамгаалалтын хамгийн бага багц: P0 + P1 + P2 + P3.**
> P6-г хамгаалалтын өмнө бүү хий — эрсдэл өндөр, гадаад төрхөд нөлөөлөхгүй.

---

## 🔴 P0 — Blocker засвар (0.5 өдөр)

**Зорилго:** `npm run build` амжилттай болох. Одоо production build **унана**.

### P0.1 · `DetailView.tsx` — Tracks мөрийн бодит алдаа

`trackList` бол аль хэдийн `PlayerTrack[]`, гэтэл дахин `toTrack()` (энэ нь `Song` хүлээдэг) дуудагдаж байна.

| Мөр | Одоо | Асуудал |
|---|---|---|
| 315 | `onPlayTrack(toTrack(song, t, artist?.name))` | `song.fileUrl` = `undefined` → **дуу тоглохгүй** |
| 326 | `song.duration` | `PlayerTrack`-д `duration` талбар алга → **үргэлж "—"** |

Засвар:

```tsx
// 315
onClick={() => onPlayTrack(song)}

// 326 — эх сурвалж нь albumSongs (Song[]), trackList-тэй 1:1 тохирно
{albumSongs[index]?.duration ? fmtDur(albumSongs[index].duration!) : "—"}
```

> ⚠️ Энэ нь **UI биш, функциональ алдаа**. Дэлгэцийн зурган дээр бүх дуу "—" харагдаж байгаа нь үүний нотолгоо.

### P0.2 · Хүлээн авах шалгуур (DoD)

- [ ] `npx tsc --noEmit` → 0 алдаа
- [ ] `npm run build` → амжилттай
- [ ] Tracks хүснэгтийн мөр дарахад дуу үнэхээр тоглоно
- [ ] Үргэлжлэх хугацаа "—" биш, бодит утга харагдана

---

## 🔴 P1 — Дизайн систем бэхжүүлэх (2–3 өдөр)

**Зорилго:** Нэг токен = нэг эх сурвалж. Хуудас хооронд өнгө/зай/шрифт зөрөхгүй болгох.

> Токены суурь аль хэдийн сайн тавигдсан (`globals.css` `@theme` + `tailwind.config.ts` + `polish.css`).
> Энэ phase бол **шинээр зохиох биш, цэгцлэх**.

### P1.1 · Үхмэл CSS цэвэрлэх

`medreh.css`-ийн 220 selector-оос **131 нь ашиглагдахгүй**. Tailwind руу шилжсэний үлдэгдэл.

1. Ашиглагдаж буй 89-ийг тогтоох (script-ээр)
2. Үлдсэнийг устгах → `medreh.css` ~790 → ~350 мөр
3. Устгасны дараа бүх дэлгэцийг нүдээр шалгах

### P1.2 · Үлдсэн legacy класс шилжүүлэх

Ердөө 5 файл үлдсэн:

- `layout/PageContainer.tsx`
- `layout/Sidebar.tsx`
- `player/BillingView.tsx`
- `player/DevicesView.tsx`
- `player/HelpView.tsx`

### P1.3 · UI primitive-ийн хамрах хүрээ нэмэх

`components/ui/` дэх primitive-үүд бэлэн боловч зарим дэлгэц тэднийг ашиглахгүй, өөрийн `className` бичсэн хэвээр:

| Primitive | Одоогийн байдал |
|---|---|
| `ActionGroup.tsx` (`ActionButton`) | ✅ Бий — гэхдээ олон газар ad-hoc товч |
| `PageHeader.tsx` / `SectionTitle` | ✅ Бий |
| `SectionCard` `StatusBadge` `States` | ✅ Бий |
| `Icon.tsx` | ✅ 60+ icon, нэг 24×24 grid |

**Ажил:** ad-hoc `<button className="inline-flex items-center gap-2 rounded-full …">` бүрийг `<ActionButton>` болгох.
Хайх: `grep -rn 'rounded-full.*px-5.*py-2.5' src/`

### P1.4 · Токен зөрчил

- `borderRadius` нь `tailwind.config.ts`-д 4 утга, гэтэл кодод `rounded-[28px]` `rounded-[30px]` `rounded-[20px]` `rounded-[11px]` гэх мэт **arbitrary утга** тарсан → 2–3 шатлал болгож нэгтгэх (`card` / `panel` / `pill`)
- Мөн адил `text-[13.5px]` `text-[12.5px]` `text-[14.5px]` … → typography scale болгох

### P1.5 · DoD

- [ ] `medreh.css` < 400 мөр
- [ ] Legacy класс 0
- [ ] Arbitrary radius утга ≤ 3 төрөл
- [ ] Бүх товч `ActionButton`-оор

---

## 🔴 P2 — Дэлгэц бүрийн UI/UX (5–7 өдөр)

**Зорилго:** Дэлгэц бүр "нэг систем"-ийн хэсэг мэт харагдах.

### P2.1 · Хэл нэгтгэх (MN/EN хольц)

Одоо нэг дэлгэц дээр Монгол, Англи хоёр холилдсон:

| Файл | Англи үлдэгдэл |
|---|---|
| `DetailView.tsx` | `Signal` · `Tracks` · `Play all` · `Shuffle` · `Artist page` · `About the artist` |
| `NowPlayingSidebar.tsx` | `NOW PLAYING` · `Playing now` · `Selected` · `About the artist` · `LIVE` · `Featured artist` |

**Шийдэл:** бүх хэрэглэгчид харагдах текстийг Монгол болгох.
`Signal` гэх мэт брэндийн нэр томьёог үлдээх бол **зориудаар, тогтмол** үлдээх.

### P2.2 · Давхардсан агуулга (дууны дэлгэрэнгүй хуудас)

Одоогийн `DetailView`-д:

- **"About the artist" 2 удаа** — зүүн баганад карт, баруун sidebar-т дахин
- **Товч давхардсан** — зүүн: `Тоглуулах` / `Санамсаргүй`, баруун: `Play all` / `Shuffle` (ижил үйлдэл)
- **Гарчиг** нь `artist?.name || heroSong.title` → "Дууны дэлгэрэнгүй" гэж бичээд **уран бүтээлчийн нэр** харуулж байна, доор нь дахин ижил нэр

**Шийдэл:** мэдээллийн шатлалыг цэгцлэх — гарчиг = дууны нэр, уран бүтээлч = дэд мөр, "About the artist" 1 газар.

> ⚠️ Энэ нь харагдах агуулгыг өөрчилнө — эзний зөвшөөрөл шаардлагатай.

### P2.3 · Дэлгэц тус бүрийн ажлын жагсаалт

| Дэлгэц | Гол ажил |
|---|---|
| `HomeView` (565 мөр) | Хамгийн том — секц хоорондын зай/шатлал, картын нэгдсэн хэмжээ |
| `DetailView` | P2.2 (давхардал), Signal карт ✅ хийгдсэн |
| `LibraryView` / `PlaylistsView` | Grid нягтрал, hover/active төлөв нэгтгэх |
| `StatsView` / `ProgressView` | Chart өнгө → токен, тэнхлэгийн typography |
| `AdminView` + `admin/*` | Хүснэгтийн нягтрал, үйлдлийн багана, dialog |
| `TherapistView` / `ParentView` | Ижил layout хэв рүү оруулах |
| `Calibrate` (312 мөр) | Алхам бүрийн явцын заалт, дүгнэлт дэлгэц |
| `mobile/[token]` | Утасны дэлгэцэд зориулсан тусдаа шалгалт |

### P2.4 · Responsive

Одоо custom breakpoint 2 л байна: `max-nav` (860px), `max-viz` (1020px).

- [ ] 360px (жижиг утас), 768px (таблет), 1440px, 1920px дээр бүх дэлгэцийг шалгах
- [ ] Хэвтээ scroll гарахгүй байх (хүснэгт `overflow-x: auto` дотор)
- [ ] Touch target ≥ 44px (`polish.css`-д зарим нь бий, бүрэн болгох)

### P2.5 · DoD

- [ ] Дэлгэц бүр 360 / 768 / 1440px дээр эвдрэхгүй
- [ ] Англи текст үлдээгүй (эсвэл зориуд үлдээснийг баримтжуулсан)
- [ ] Давхардсан блок арилсан

---

## 🔴 P3 — Хүртээмж · deaf-first (3–4 өдөр)

**Зорилго:** Энэ бол **сонсголын бэрхшээлтэй хүнд зориулсан** бүтээгдэхүүн. Хүртээмж бол нэмэлт биш, гол шинж.

### P3.1 · Одоо байгаа сайн зүйл (хадгалах)

`polish.css`-д аль хэдийн хийгдсэн:
- `:focus-visible` ring (2px + 5px ореол)
- `@media (prefers-contrast: more)`
- `@media (prefers-reduced-motion: reduce)`
- Touch target 44px (хэсэгчлэн)
- Print styles

### P3.2 · Дутуу зүйл

- [ ] **Keyboard navigation бүрэн шалгалт** — модал (`AuthModal` `SubscribeModal` `AdminPanel`), dropdown (`ProfileDropdown` `SettingsDropdown` `NotificationDropdown`) дотор focus trap ажиллаж байгаа эсэх (`lib/ui/useFocusTrap.ts` бий — хаана хаана хэрэглэгдсэнийг батлах)
- [ ] **Screen reader** — амьд өөрчлөгддөг хэсэгт `aria-live` (тоглож буй дуу, toast, төхөөрөмжийн холболтын төлөв)
- [ ] **Icon-only товч бүрд `aria-label`** — одоо зарим нь дутуу
- [ ] **Skip to content** холбоос
- [ ] **Өнгө бус дохио** — төлөвийг зөвхөн өнгөөр биш, icon/текстээр давхар дамжуулах (өнгө ялгах бэрхшээлтэй хэрэглэгч)
- [ ] **Контраст аудит** — бүх текст ≥ 4.5:1 (жижиг), ≥ 3:1 (том). `--dim: #778583` бараан дэвсгэр дээр хиллэж байна
- [ ] **`prefers-reduced-motion`** — визуалайзер/equalizer-т хүндэтгэх (`Visualizer.tsx`-д бий ✅, шинэ Signal equalizer-т `motion-reduce:` нэмсэн ✅)

### P3.3 · Дохионы хэлний дэмжлэг (design doc §13)

- [ ] MSL видео plaeholder → бодит контентын бүтэц
- [ ] Хялбар хэлний горим (энгийн үг сонголт)

### P3.4 · DoD

- [ ] Хулгана огт хэрэглэхгүйгээр нэвтрэх → дуу тоглуулах → калибровк хийх боломжтой
- [ ] axe DevTools → critical/serious 0
- [ ] Бүх интерактив элемент focus ring-тэй

---

## 🟡 P4 — "Хуурамч" тохиргоог амьдруулах (2–3 өдөр)

**Асуудал:** `PreferenceSettings.tsx`-д хэрэглэгч тохиргоо сонгож, хадгалагдаж ч байна — **гэхдээ юу ч болохгүй**. Тохиргоо нь `prefs`-д бичигдээд хаанаас ч уншигдахгүй.

| Тохиргоо | Зарлагдсан | Хадгалагдана | **Уншигдана** |
|---|---|---|---|
| `theme: "dark" \| "light"` | ✅ | ✅ | ❌ **Хэзээ ч** |
| `language: "mn" \| "en"` | ✅ | ✅ | ❌ **Хэзээ ч** |
| `largeText` | ✅ | ✅ | ❌ **Хэзээ ч** |
| `reducedMotion` | ✅ | ✅ | ❌ **Хэзээ ч** |

> Хүртээмжийн бүтээгдэхүүнд `largeText` / `reducedMotion` ажиллахгүй байх нь **ноцтой**.

### Сонголт

**A. Хэрэгжүүлэх** (зөв, гэхдээ хугацаа авна)
- `largeText` → `<html>` дээр класс, `rem` суурьтай typography
- `reducedMotion` → `prefers-reduced-motion`-той хамт `data-motion` атрибут
- `theme` → light токены багц (одоо `color-scheme: dark` хатуу)
- `language` → i18n (`next-intl` эсвэл энгийн dictionary)

**B. Түр нуух** (шударга, хурдан)
- UI-аас түр авах эсвэл "Удахгүй" badge тавих

> 👉 Дор хаяж `largeText` + `reducedMotion` хоёрыг **хэрэгжүүлэхийг** зөвлөж байна (P3-тэй нийлнэ). `theme`/`language`-ийг B хувилбараар.

---

## 🟡 P5 — Гүйцэтгэл (2 өдөр)

- [ ] **`<img>` → `next/image`** — ~20 warning. Cover зурагнууд LCP-д шууд нөлөөлнө
- [ ] **Code splitting** — `CircularGallery` (555 мөр, WebGL/OGL), `ImmersiveMode`, `AdminPanel` → `next/dynamic`
- [ ] **RAF loop audit** — `Player.tsx`-ийн ганц RAF loop нь DOM-ыг шууд бичдэг (зөв хийсэн). Гэхдээ таб идэвхгүй үед зогсоох (`document.hidden`)
- [ ] **Bundle шинжилгээ** — `@next/bundle-analyzer`, three.js + ogl хоёулаа орсон эсэхийг шалгах
- [ ] **Font loading** — Unbounded / Golos Text / JetBrains Mono → `next/font`, FOUT багасгах

---

## 🟢 P6 — Архитектур цэвэрлэгээ (3–4 өдөр) · ⚠️ Өндөр эрсдэл

> **Хамгаалалтын өмнө бүү хий.** Гадаад төрхөд нөлөөгүй, эвдрэх эрсдэл өндөр.

### P6.1 · `Player.tsx` (1,070 мөр) задлах

Одоо энэ файл дангаараа: view routing, audio context, RAF loop, vibration, stats, likes/saves, prefs, socket, playlists, IndexedDB, backend fetch — **бүгдийг** барьж байна.

Санал болгох хуваалт:

```
hooks/useAudioEngine.ts     — AudioContext, AnalyserNode, RAF loop
hooks/useHaptics.ts         — vibration interval, BeatScheduler
hooks/useLibraryData.ts     — TRACKS + backend songs + custom (IndexedDB)
hooks/useUserPrefs.ts       — likes / saves / prefs / stats (localStorage)
Player.tsx                  — зөвхөн composition + view routing
```

### P6.2 · Давхардсан компонент нэгтгэх

- `parent/StatisticsCards.tsx` ба `progress/StatisticsCards.tsx` — ижил нэр, тусдаа хэрэгжүүлэлт → нэг ерөнхий `<StatCardGrid>`

### P6.3 · Ажлын мод цэвэрлэх

Одоо **72 файл commit хийгдээгүй** (`git status`). Ажлыг үе шатаар commit хийж, эргэж очих цэг үүсгэх.

---

## 🟡 P7 — Тест (3 өдөр)

Frontend-д **тест огт байхгүй** (`package.json`-д script ч алга).

| Түвшин | Хэрэгсэл | Юуг |
|---|---|---|
| Unit | Vitest | `lib/audio/analyze.ts`, `beat-scheduler.ts`, `player/recommendations.ts`, `format.ts` |
| Component | Testing Library | `ActionButton`, `Icon`, `States`, `Calibrate` |
| E2E | Playwright | нэвтрэх → дуу тоглуулах → калибровк → QR хослуулах |
| A11y | `axe-core` + Playwright | дэлгэц бүр |

> Backend-д Jest бэлэн (`test`, `test:e2e` script бий) — түүнтэй ижил хэв рүү оруулах.

---

## 🟢 P8 — Backend залгамж (4–5 өдөр)

Frontend тогтворжсоны дараа:

- [ ] `CORS_ORIGIN=http://localhost:5173` — Vite үеийн үлдэгдэл, одоо frontend 3001 дээр. Proxy ашигладаг тул эвдрээгүй ч **буруу**
- [ ] `docker-compose.yml` (5433) ↔ `.env` (5434) **зөрчил** — нэг утга болгох
- [ ] `JWT_ACCESS_SECRET=change_me` `COOKIE_SECRET=change_me` → production-д бодит нууц үг
- [ ] Haptic Score pipeline (design doc §3) — Python analysis worker
- [ ] `next/image` ажиллуулахын тулд `next.config.ts`-д `images.remotePatterns`

---

## Хавсралт А — Ажиллуулах заавар

```powershell
# 1. DB
docker start medreh-pg          # эсвэл: docker run -d --name medreh-pg -p 5434:5432 `
                                #   -e POSTGRES_USER=medreh -e POSTGRES_PASSWORD=medreh_dev_pw `
                                #   -e POSTGRES_DB=medreh postgres:16

# 2. Backend (Terminal #1) — ЭХЛЭЭД
cd "…\diplom\diplom\backend"
npm run start:dev               # → http://localhost:3000/api

# 3. Frontend (Terminal #2)
cd "…\diplom\diplom\frontend"
npm run dev -- -p 3001          # → http://localhost:3001
```

**Дараалал чухал:** backend 3000-г эхлээд эзэлнэ, эс бол `next.config.ts`-ийн proxy хоосон порт руу цохино.

### Seed бүртгэл

| Дүр | Email | Нууц үг |
|---|---|---|
| ADMIN | `admin@medreh.mn` | `admin123` |
| THERAPIST | `therapist@medreh.mn` | `therapist123` |
| USER | `user@medreh.mn` | `user123` |
| PARENT | `parent@medreh.mn` | `parent123` |

---

## Хавсралт Б — Аль хэдийн хийгдсэн ажил

### ✅ Дизайн систем (өмнөх үе шат)
- `Icon.tsx` — 60+ icon нэг 24×24 grid, 1.75 stroke дээр нэгтгэсэн
- `polish.css` — токен/typography/focus/scrollbar/state/a11y давхарга
- `tailwind.config.ts` + `globals.css @theme` — токен mapping
- `ui/` primitive-үүд: `ActionGroup` `PageHeader` `SectionCard` `StatusBadge` `States` `DropdownPanel` `Divider` `UserAvatar`
- Legacy CSS → Tailwind шилжилт (5 файл үлдсэн)

### ✅ Signal карт — амьд хэмнэл (энэ үе шатанд хийсэн)
Дууны дэлгэрэнгүй хуудасны "Signal" хэсэг өмнө нь **статик** зураас байсныг **амьд equalizer** болгов:

| Файл | Өөрчлөлт |
|---|---|
| `Player.tsx` | `signalBarsRef` нэмсэн; RAF loop-д `feelBarsRef`-тэй ижил спектр дунджилал; `DetailView`-д дамжуулсан |
| `DetailView.tsx` | Signal карт: 28 багана амьд спектр + Live/Idle badge + бүсийн хуваарилалт (бас/дунд/өндөр) + чичиргээний хэв маяг + тайлбар |
| `Icon.tsx` | `play` · `pause` · `shuffle` icon нэмсэн (өмнөх `▶` `↻` текст глифийг орлуулав) |

Зарчим: одоо байгаа `feelBarsRef` (Мэдрэх самбар)-ын хэв маягийг **яг дагасан** — шинэ `AudioContext` үүсгээгүй, тоглуулах логикт хүрээгүй, зөвхөн нэмэлт ref.

---

*МЭДРЭХ® — Чимээгүй байдал хоосон биш. · Frontend phase төлөвлөгөө · v1.0 · 2026-07-30*
