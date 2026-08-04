# Баримт бичгийн индекс — репо доторх бүх `.md` тайлбар

> Энэ файл нь репо доторх бүх markdown баримт бичгийг нэг доор жагсааж, тус
> бүрийн зорилго, идэвхтэй/архивлагдсан эсэхийг тодорхойлно.

---

## 🟢 Идэвхтэй, одоо ашиглагдаж буй баримтууд

| Файл | Зорилго |
|---|---|
| **[`ROADMAP-7-PHASES.md`](../ROADMAP-7-PHASES.md)** (root) | **Цорын ганц идэвхтэй эх сурвалж** — Phase 1-7-ийн бодит явц, checkbox бүхэн 2026-08-04-нд кодтой мөр мөрөөр тулгагдсан. Ямар нэг зүйл "хийгдсэн үү?" гэдгийг мэдэхийг хүсвэл эхлээд эндээс хар. |
| **[`docs/HUMAN-REQUIRED-CHECKLIST.md`](./HUMAN-REQUIRED-CHECKLIST.md)** | ROADMAP-д тэмдэглэгдсэн **бүх ХҮН-шаардсан (код-аар хийх боломжгүй) зүйлийг** нэг газраас нэгтгэсэн жагсаалт — дутуу env хувьсагч, Android build, хэрэглэгчийн туршилт, production дэд бүтэц. |
| **[`docs/ENV-MISSING-KEYS-GUIDE.md`](./ENV-MISSING-KEYS-GUIDE.md)** | `.env`-д дутуу байгаа хувьсагчийг (JAMENDO_CLIENT_ID, SENTRY_DSN) хаанаас, хэрхэн авахыг алхам алхмаар заана. Мөн production-д заавал солих ёстой dev-secret-үүдийн жагсаалт. |
| **[`docs/PRODUCTION-DEPLOYMENT-PLAN.md`](./PRODUCTION-DEPLOYMENT-PLAN.md)** | Phase 7 (Production ажиллагаа)-ийн ХҮН гараар хийх алхмууд: домэйн, TLS, GitHub Secrets, QPay/SocialPay мерчант бүртгэл, бодит мөнгөн гүйлгээ. |
| **[`docs/HUMAN-TESTING-PLAN.md`](./HUMAN-TESTING-PLAN.md)** | Phase 6-ийн ХҮН гараар хийх туршилтууд: SUS санал асуулга (10 асуулт бэлэн), сонсголын бэрхшээлтэй хэрэглэгчийн туршилтын протокол, NVDA screen reader гарын шалгалт. |
| **[`docs/CAPACITOR-ANDROID-SETUP.md`](./CAPACITOR-ANDROID-SETUP.md)** | Capacitor Android wrapper-ийн бүрэн заавар. Код түвшинд бүрэн хийгдсэн (2026-08-04) — энэ баримт одоо зөвхөн бодит Android Studio build/гарын турших алхмуудад хэрэглэгдэнэ. |
| **[`docs/TAKEDOWN-PROCEDURE.md`](./TAKEDOWN-PROCEDURE.md)** | Зохиогчийн эрхийн (takedown) нэхэмжлэл ирэхэд дагах 24 цагийн журам — Phase 5-ийн хамгийн эрсдэлтэй зүйлд зориулсан ажлын горим (код биш). |
| **[`docs/measurements/`](./measurements/)** | Бодитоор хэмжигдсэн, кодоор автоматжуулагдсан үзүүлэлтүүд: `f-measure-results.md` (beat detection нарийвчлал), `latency-results.md` (beat→vibrate хоцролт), `axe-report.json`/`lighthouse-accessibility-report.json` (WCAG автомат audit). |
| **[`PRODUCTION-DESIGN.md`](../PRODUCTION-DESIGN.md)** (root) | Анхны дизайны концепт баримт (v1.1, 2026-07-30) — онол (§2 vibrotactile perception), архитектур (§3, §8-12), DB schema санаа (§10) зэрэг **checkbox-гүй лавлагаа**, "хийгдээгүй ажлын жагсаалт" биш. §1/§15/§19 (снапшот хэсгүүд) хуучирсан, файлын эхэнд анхааруулга бий. |

---

## 🗄️ Архивлагдсан баримтууд (`docs/archive/`)

> Эдгээр нь **2026-07-30/31-ний хуучин snapshot** — тухайн үед бичигдсэний
> дараа код цаашид хөгжсөн тул checkbox-ууд нь бодит байдалтай зөрсөн байсан.
> `ROADMAP-7-PHASES.md`-д (2026-08-04) бүрэн орлуулагдсан. Зөвхөн түүхэн
> лавлагаа болгож хадгалсан, идэвхтэй ажилд ашиглахгүй.

| Файл | Анхны зорилго |
|---|---|
| **[`docs/archive/TODO-PRODUCTION.md`](./archive/TODO-PRODUCTION.md)** | 2026-07-31-ний "дутуу байгаа зүйлсийн жагсаалт" (§3-§18, 158 checkbox) — шалгасны дараа ихэнх нь аль хэдийн хийгдсэн байсан. |
| **[`docs/archive/FRONTEND-PHASES.md`](./archive/FRONTEND-PHASES.md)** | 2026-07-30-ний frontend хөгжүүлэлтийн P0-P8 үе шатын төлөвлөгөө (36 checkbox) — мөн хуучирсан. |
| **[`docs/archive/REQUIREMENTS-COVERAGE.md`](./archive/REQUIREMENTS-COVERAGE.md)** | 2026-07-31-ний шаардлага хангалтын хэмжилт (43%) — лавладаг `AUDIT.md`/`ARCHITECTURE.md` файлууд репод хэзээ ч байгаагүй. |

---

## ⚙️ Автомат үүсдэг/төслийн бусад файлууд

| Файл | Тайлбар |
|---|---|
| `backend/README.md` | NestJS CLI-ийн стандарт boilerplate README (Nest-ийн анхны `nest new` template) |
| `frontend/README.md` | Next.js CLI-ийн стандарт boilerplate README (`create-next-app` template) |

---

## Хэрэв асуулт нь...

- **"Ямар зүйл хийгдсэн, ямар нь үлдсэн бэ?"** → `ROADMAP-7-PHASES.md`
- **"Юуг зөвхөн хүн гараар хийх ёстой вэ?"** → `docs/HUMAN-REQUIRED-CHECKLIST.md`
- **".env-д ямар түлхүүр дутуу, хаанаас авах вэ?"** → `docs/ENV-MISSING-KEYS-GUIDE.md`
- **"Production дээр хэрхэн байршуулах вэ?"** → `docs/PRODUCTION-DEPLOYMENT-PLAN.md`
- **"Дизайны анхны санаа юу байсан бэ?"** → `PRODUCTION-DESIGN.md`
