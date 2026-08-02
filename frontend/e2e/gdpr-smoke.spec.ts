import { test, expect } from "@playwright/test";
import { waitForLanding, registerNewUser, dismissAutoCalibrationIfOpen, clickResilientToCalibration } from "./helpers";

test("GDPR export + delete-account UI works end-to-end", async ({ page }) => {
  const name = "GDPR UI";
  const email = `gdpr-ui-${Date.now()}@example.com`;
  const password = "TestPass123!";

  await waitForLanding(page);
  await registerNewUser(page, { name, email, password });
  await dismissAutoCalibrationIfOpen(page);

  await clickResilientToCalibration(page, page.getByRole("button", { name: "Профайл цэс" }));
  await clickResilientToCalibration(page, page.getByRole("button", { name: "Профайл засах" }));

  await expect(page.getByText("Миний мэдээлэл")).toBeVisible({ timeout: 10_000 });

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Татах" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/medreh-medeelel-.*\.json/);

  await page.getByRole("button", { name: "Бүртгэл устгах" }).click();
  await page.getByRole("textbox", { name: "Нууц үг", exact: true }).fill(password);
  await page.getByRole("button", { name: "Бүрмөсөн устгах" }).click();

  // Deletion logs the user out -> Dock's "Нэвтрэх" button reappears.
  await page.locator("#dock").getByRole("button", { name: "Нэвтрэх" }).waitFor({ state: "visible", timeout: 10_000 });
});
