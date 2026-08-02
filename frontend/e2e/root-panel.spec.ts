import { test, expect } from "@playwright/test";
import { waitForLanding, registerNewUser, welcomeMessage, dismissAutoCalibrationIfOpen } from "./helpers";

/* Роадмапын Үе шат 6 E2E: "ROOT самбар". Seed script-ийн бэлэн ROOT данс
   (root@medreh.mn / root123, см. backend/prisma/seed.ts) ашиглана — шинэ
   бүртгэлээр ROOT эрх авах боломжгүй тул (эрхийн зэрэглэл гараар л олгогддог). */
test.describe("ROOT самбар", () => {
  test("ROOT хэрэглэгч Root Panel-ыг нээж, гарчиг зөв харагдана", async ({ page }) => {
    await waitForLanding(page);
    await page.locator("#dock").getByRole("button", { name: "Нэвтрэх" }).click();
    // Бүртгэл tab-ыг ашиглахгүй — аль хэдийн байгаа ROOT данс тул шууд нэвтрэх горимд.
    await page.locator('input[name="email"]').fill("root@medreh.mn");
    await page.locator('input[name="pass"]').fill("root123");
    await page.getByLabel("Нэвтрэх / Бүртгүүлэх").getByRole("button", { name: "Нэвтрэх" }).click();
    await welcomeMessage(page, "Систем эзэмшигч").waitFor({ state: "visible", timeout: 10_000 });
    await dismissAutoCalibrationIfOpen(page);

    // ROOT нэвтрэхэд Player (Admin view) автоматаар нээгддэг бөгөөд энэ нь Dock-ийн ROOT
    // товчийг дэлгэц дээр давхарладаг (z-index-ээр дээгүүр) — эхлээд Player-ийг хаана.
    // "Хаах" нэртэй 2 товч байдаг (AuthModal-ийн үлдэгдэл DOM + Player-ийн TopBar) тул
    // Player-ийн <header> дотроос тодорхой сонгоно (TopBar.tsx:91,219-226).
    await page.locator("header").getByRole("button", { name: "Хаах" }).click();

    const rootButton = page.getByRole("button", { name: "ROOT" });
    await expect(rootButton).toBeVisible({ timeout: 10_000 });
    await rootButton.click();

    await expect(page.getByText("Систем эзэмшигчийн самбар")).toBeVisible({ timeout: 10_000 });
  });

  test("ROOT бус хэрэглэгчид ROOT dock товч огт харагдахгүй", async ({ page }) => {
    const email = `e2e-notroot-${Date.now()}@example.com`;
    await waitForLanding(page);
    // Нэр дотор "ROOT" гэдэг текст ОРУУЛАХГҮЙ — Playwright-ийн getByRole name нь
    // substring match хийдэг тул "Root Bataa" гэх мэт нэр Dock-ийн logout товч
    // ("Root Bataa · Гарах")-той андуурагдах эрсдэлтэй (нэг удаа яг ийм алдаа гарсан).
    await registerNewUser(page, { name: "Playwright Tester", email });

    await expect(page.getByRole("button", { name: "ROOT", exact: true })).toHaveCount(0);
  });
});
