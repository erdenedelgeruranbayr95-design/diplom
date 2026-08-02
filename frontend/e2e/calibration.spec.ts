import { test, expect } from "@playwright/test";
import { waitForLanding, registerNewUser } from "./helpers";

/* Роадмапын Үе шат 6 E2E: "калибровк". Шинэ хэрэглэгч бол Player өөрөө калибровкийг
   автоматаар нээдэг (Player.tsx auto-prompt) — 5 дэлгэцийг (Intro→Vibration→Light→
   Bands→Summary, см. CalibrateSteps.tsx) бодит товч бүрээр нь дамжина. */
test.describe("Мэдрэхүйн калибровк", () => {
  test("нэвтэрсэн хэрэглэгч калибровкийг эхнээс дуустал дамжина", async ({ page }) => {
    const email = `e2e-calib-${Date.now()}@example.com`;

    await waitForLanding(page);
    await registerNewUser(page, { name: "E2E Calib", email });

    const dialog = page.getByRole("dialog", { name: "Мэдрэхүйн калибровк" });
    await expect(dialog).toBeVisible({ timeout: 10_000 });

    // 0/4 Intro
    await dialog.getByRole("button", { name: "Эхлэх" }).click();

    // 1/4 Чичиргээ — эхлээд "Туршиж үзэх", дараа нь сонголтын аль нэгийг идэвхжүүлнэ
    // (сонголтын товчнууд flow.tried=true болтол disabled байдаг, см. CalibrateSteps.tsx:98)
    await dialog.getByRole("button", { name: "Туршиж үзэх" }).click();
    await dialog.getByRole("button", { name: "Бага зэрэг" }).click();

    // 2/4 Гэрэл
    await dialog.getByRole("button", { name: "Яг таарсан" }).click();

    // 3/4 Давтамж — сонголт заавал биш, шууд "Үргэлжлүүлэх"
    await dialog.getByRole("button", { name: "Үргэлжлүүлэх" }).click();

    // 4/4 Дүгнэлт
    await expect(dialog.getByRole("heading", { name: "Таны мэдрэхүйн профайл" })).toBeVisible({ timeout: 10_000 });
    await dialog.getByRole("button", { name: "Хадгалаад эхлэх" }).click();
    await expect(dialog).toBeHidden({ timeout: 10_000 });
  });
});
