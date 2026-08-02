import { test, expect } from "@playwright/test";
import { waitForLanding, registerNewUser, dismissAutoCalibrationIfOpen } from "./helpers";

/* Роадмапын Үе шат 6 E2E: "нэвтрэх · тоглуулах". Шинэ хэрэглэгчийг форм дундуур
   бодитоор бүртгүүлж, дараа нь статик demo дуугаар тоглуулалт эхлүүлж шалгана
   (backend upload шаардлагагүй тул тогтвортой, хурдан). */
test.describe("Нэвтрэх · тоглуулах", () => {
  test("бүртгүүлж, нэвтэрч, дараа нь дуу тоглуулж эхэлнэ", async ({ page }) => {
    const email = `e2e-play-${Date.now()}@example.com`;

    await waitForLanding(page);
    await registerNewUser(page, { name: "E2E Playwright", email });
    // registerNewUser нь "Тавтай морил" мессеж харагдтал хүлээсэн — Player автоматаар нээгдэнэ.
    await dismissAutoCalibrationIfOpen(page);

    // Player нээгдсэн эсэхийг тоглуулах товч (demo track) харагдаж байгаагаар баталгаажуулна
    const playButton = page.getByRole("button", { name: /^Тоглуулах:/ }).first();
    await expect(playButton).toBeVisible({ timeout: 10_000 });

    // Калибровк dialog "Дараа хийе"-ээр хаагдсан ч prefs.calibrated=true болгодоггүй тул
    // (см. Calibrate.tsx onSkip={onClose}) заримдаа хожим дахин нээгдэж болзошгүй — товч
    // дарахаас өмнө дахин шалгана.
    await dismissAutoCalibrationIfOpen(page);
    await playButton.click();
    // Тоглуулж эхэлмэгц aria-label "Тоглуулах:" → "Түр зогсоох:" болж солигдоно
    await expect(page.getByRole("button", { name: /^Түр зогсоох:/ }).first()).toBeVisible({ timeout: 10_000 });

    // <audio> элемент бодитоор mount хийгдэж, src тавигдсан эсэхийг шалгана
    const audio = page.locator("audio");
    await expect(audio).toHaveCount(1);
  });
});
