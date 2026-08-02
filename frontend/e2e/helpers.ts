import type { Page } from "@playwright/test";

/* Нүүр хуудас нээгдэхэд Preloader.tsx (#pre) intro animation ажилладаг —
   landing-engine.js progress bar дуусаад `.done` class нэмдэг (см. landing-engine.js:156).
   Тэр хугацаанд Dock/AuthModal товчнууд DOM-д байгаа ч visually урагшгүй, click дарж болзошгүй
   тул бодит хэрэглэгчийн адил preloader дуустал хүлээнэ. */
export async function waitForLanding(page: Page) {
  await page.goto("/");
  await page.locator("#pre.done, #pre").first().waitFor({ state: "attached" });
  await page.waitForFunction(() => {
    const el = document.getElementById("pre");
    return !el || el.classList.contains("done");
  }, { timeout: 15_000 });
}

/* `role="status"` олон газар (дуу сонгогдоогүй sr-only, ачааллах spinner-үүд) ашиглагддаг
   тул нэрээр биш, AuthModal-ийн бодит "Тавтай морил, X!" мессежийн текстээр шалгана. */
export function welcomeMessage(page: Page, name: string) {
  return page.getByText(`Тавтай морил, ${name}!`);
}

export async function registerNewUser(page: Page, opts: { name: string; email: string; password?: string }) {
  const password = opts.password ?? "TestPass123!";
  // Dock ("Нэвтрэх" бас), modal-ийн submit товч ("Нэвтрэх" горимд) хоёулаа ижил нэртэй
  // тул эхлээд dialog доторхыг биш, харин ХАРАГДАЖ БАЙГАА dock товчийг тодорхой сонгоно.
  await page.locator("#dock").getByRole("button", { name: "Нэвтрэх" }).click();
  await page.getByRole("tab", { name: "Бүртгүүлэх" }).click();
  await page.locator('input[name="name"]').fill(opts.name);
  await page.locator('input[name="email"]').fill(opts.email);
  await page.locator('input[name="pass"]').fill(password);
  await page.locator('input[name="pass2"]').fill(password);
  await page.getByRole("button", { name: "Бүртгүүлэх" }).click();
  await welcomeMessage(page, opts.name).waitFor({ state: "visible", timeout: 10_000 });
}

/* Шинэ хэрэглэгч бүртгүүлмэгц Player өөрөө калибровкийг автоматаар санал болгодог
   (Player.tsx-ийн auto-prompt) — энэ dialog бусад товчнуудыг (search, ROOT, Утас холбох
   г.м.) block хийдэг тул калибровкийн ТУСДАА тест ХАРИН зорилготой биш бол хаана.
   Calibrate.tsx-д Escape keyboard listener БАЙХГҮЙ (dialog role="dialog" ч гэсэн) — эхний
   алхмын (CalibrateIntro) "Дараа хийе" товч л onClose дуудна (CalibrateSteps.tsx:57-58). */
export async function dismissAutoCalibrationIfOpen(page: Page) {
  const dialog = page.getByRole("dialog", { name: "Мэдрэхүйн калибровк" });
  // Player.tsx-ийн auto-prompt тодорхой хэмжээний хугацаа (нэвтэрсний дараах эффект)
  // өнгөрсний дараа л dialog-ыг нээдэг тул шууд isVisible() шалгах нь race condition
  // үүсгэдэг байсан (dialog хараахан DOM-д ороогүй байхад "алга" гэж дүгнэчихдэг).
  const opened = await dialog.isVisible({ timeout: 3_000 }).catch(() => false);
  if (opened) {
    await dialog.getByRole("button", { name: "Дараа хийе" }).click();
    await dialog.waitFor({ state: "hidden", timeout: 5_000 }).catch(() => {});
  }
}

/* "Дараа хийе" нь prefs.calibrated=true болгодоггүй (Calibrate.tsx onSkip={onClose})
   тул дараагийн re-render/remount үед dialog дахин "санамсаргүй" нээгдэж, ямар ч
   товч дарахад click-ийг block хийж болзошгүй. Тиймээс сорилтын товч бүрийг ЭНЭ
   wrapper-ээр дараад, block хийгдвэл dialog-ыг дахин хааж, ахин оролдоно. */
export async function clickResilientToCalibration(page: Page, locator: ReturnType<Page["getByRole"]>, attempts = 3) {
  for (let i = 0; i < attempts; i++) {
    await dismissAutoCalibrationIfOpen(page);
    try {
      await locator.click({ timeout: 5_000 });
      return;
    } catch {
      if (i === attempts - 1) throw new Error("clickResilientToCalibration: бүх оролдлого амжилтгүй боллоо");
    }
  }
}
