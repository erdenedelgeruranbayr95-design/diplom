import { defineConfig, devices } from "@playwright/test";

/* Roadmap Үе шат 6: нэвтрэх · тоглуулах · калибровк · QR хослуулах · ROOT самбар.
   Dev server (`npm run dev`, 3001 порт) болон backend (3000 порт) хоёулаа урьдчилан
   ажиллаж байх ёстой — CI-д `webServer` блок үүнийг автоматаар хийнэ, локал орчинд
   аль хэдийн ажиллаж байгаа dev server-ийг дахин ашиглана (`reuseExistingServer`). */
export default defineConfig({
  testDir: "./e2e",
  /* latency-measurement.spec.ts, accessibility.spec.ts хоёр нь стандарт функциональ
     тест биш — дипломын хэмжилт/audit скрипт (docs/measurements/-д файл бичдэг).
     Энгийн `npx playwright test`-д ороогүй, тусдаа файлаар зааж ажиллуулна:
     `npx playwright test e2e/latency-measurement.spec.ts e2e/accessibility.spec.ts`. */
  testIgnore: process.env.MEASURE ? undefined : ["**/latency-measurement.spec.ts", "**/accessibility.spec.ts"],
  fullyParallel: false, // тестүүд ижил backend DB-г ашигладаг тул уралдаан үүсэхээс сэргийлнэ
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: process.env.E2E_BASE_URL || "http://localhost:3001",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: process.env.CI
    ? {
        // `next dev`-д PORT зааж өгөхгүй бол default 3000 дээр асдаг — тэр порт CI-д
        // backend-ийн эзэлсэн байдаг тул EADDRINUSE-ээр унадаг байсан (см. ci.yml-ийн
        // "Start backend" алхам). PORT=3001-ийг тодорхой зааж 3001 дээр асаана.
        command: "npm run dev -- -p 3001",
        url: "http://localhost:3001",
        reuseExistingServer: false,
        timeout: 120_000,
      }
    : undefined, // локал орчинд хэрэглэгч өөрөө dev server-ээ ажиллуулна (алдаатай давхар server üüsgэхээс сэргийлнэ)
});
