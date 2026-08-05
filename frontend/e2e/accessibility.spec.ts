import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { waitForLanding, registerNewUser, dismissAutoCalibrationIfOpen } from "./helpers";

/* Роадмапын Үе шат 6 "Хүртээмж" DoD: "WCAG 2.2 AA бүрэн audit (axe / Lighthouse тайлан)".

   axe-core нь WCAG зөрчлийг ПРОГРАМ ХАНГАМЖААР илрүүлдэг хэрэгсэл — өнгөний
   харьцаа, aria атрибут, label холбоос, keyboard trap зэрэг автоматаар шалгагдах
   боломжтой ~30-40%-ийг илрүүлнэ. Screen reader-ийн БОДИТ хэрэглээ (NVDA) болон
   сонсголын бэрхшээлтэй хэрэглэгчийн туршилт нь энэ автомат шалгалтаар ОРЛУУЛАГДАХГҮЙ
   — тэдгээр нь docs/HUMAN-TESTING-PLAN.md-д тусад нь тодорхойлогдсон.

   Тайлан бүр (нэг хуудас тутам) нэг мөр bug шиг биш, зөрчлийн ЖАГСААЛТ хэлбэрээр
   docs/measurements/axe-report.json-д хуримтлагдан бичигдэнэ. */

const REPORT_PATH = join(process.cwd(), "..", "docs", "measurements", "axe-report.json");
const allResults: Record<string, { violations: number; details: unknown[] }> = {};

test.afterAll(() => {
  mkdirSync(join(process.cwd(), "..", "docs", "measurements"), { recursive: true });
  writeFileSync(REPORT_PATH, JSON.stringify(allResults, null, 2), "utf-8");
  const totalViolations = Object.values(allResults).reduce((sum, r) => sum + r.violations, 0);
  console.log(`\naxe-core тайлан бичигдлээ: ${REPORT_PATH}`);
  console.log(`Нийт зөрчил (бүх хуудсаар): ${totalViolations}`);
});

async function runAxe(page: import("@playwright/test").Page, label: string) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
    .analyze();
  allResults[label] = {
    violations: results.violations.length,
    details: results.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      description: v.description,
      nodes: v.nodes.length,
      targets: v.nodes.map((n) => n.target),
      help: v.helpUrl,
    })),
  };
  if (results.violations.length > 0) {
    console.log(`\n[${label}] ${results.violations.length} зөрчил:`);
    for (const v of results.violations) {
      console.log(`  - [${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} элемент)`);
      for (const node of v.nodes) {
        console.log(`      html: ${node.html}`);
        console.log(`      target: ${JSON.stringify(node.target)}`);
        if (node.any?.[0]?.message) console.log(`      detail: ${node.any[0].message}`);
      }
    }
  }
  return results;
}

test.describe("Хүртээмж — axe-core WCAG 2.2 AA audit", () => {
  test("Нүүр хуудас (landing)", async ({ page }) => {
    await waitForLanding(page);
    const results = await runAxe(page, "landing");
    expect(results.violations.filter((v) => v.impact === "critical")).toHaveLength(0);
  });

  test("Нэвтрэх/бүртгүүлэх modal", async ({ page }) => {
    await waitForLanding(page);
    await page.locator("#dock").getByRole("button", { name: "Нэвтрэх" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    const results = await runAxe(page, "auth-modal");
    expect(results.violations.filter((v) => v.impact === "critical")).toHaveLength(0);
  });

  test("Тоглуулагч — Нүүр (home view)", async ({ page }) => {
    const email = `e2e-a11y-${Date.now()}@example.com`;
    await waitForLanding(page);
    await registerNewUser(page, { name: "A11y Tester", email });
    await dismissAutoCalibrationIfOpen(page);
    const results = await runAxe(page, "player-home");
    expect(results.violations.filter((v) => v.impact === "critical")).toHaveLength(0);
  });

  test("Мэдрэхүйн калибровк dialog", async ({ page }) => {
    const email = `e2e-a11y-calib-${Date.now()}@example.com`;
    await waitForLanding(page);
    await registerNewUser(page, { name: "A11y Calib", email });
    /* Калибровк нэвтрэх үед АВТОМАТААР нээгдэхээ больсон тул Тохиргоо цэсээр гараар
       нээнэ (calibration.spec.ts-тэй ижил дараалал). Энэ файл нь `MEASURE=1`-гүйгээр
       ажилладаггүй (playwright.config.ts testIgnore) тул CI үүнийг барьж аваагүй. */
    await page.getByRole("button", { name: "Мэдрэхүйн тохиргоо" }).click();
    await page.getByRole("button", { name: "Калибровк дахин хийх" }).click();
    const dialog = page.getByRole("dialog", { name: "Мэдрэхүйн калибровк" });
    await expect(dialog).toBeVisible({ timeout: 10_000 });
    const results = await runAxe(page, "calibration-dialog");
    expect(results.violations.filter((v) => v.impact === "critical")).toHaveLength(0);
  });

  test("ROOT самбар", async ({ page }) => {
    await waitForLanding(page);
    await page.locator("#dock").getByRole("button", { name: "Нэвтрэх" }).click();
    await page.locator('input[name="email"]').fill("root@medreh.mn");
    await page.locator('input[name="pass"]').fill("root123");
    await page.getByLabel("Нэвтрэх / Бүртгүүлэх").getByRole("button", { name: "Нэвтрэх" }).click();
    await expect(page.getByText("Тавтай морил, Систем эзэмшигч!")).toBeVisible({ timeout: 10_000 });
    await dismissAutoCalibrationIfOpen(page);
    await page.locator("header").getByRole("button", { name: "Хаах" }).click();
    await page.locator("#dock").getByRole("button", { name: "ROOT" }).click();
    await expect(page.getByText("Систем эзэмшигчийн самбар")).toBeVisible({ timeout: 10_000 });
    const results = await runAxe(page, "root-panel");
    expect(results.violations.filter((v) => v.impact === "critical")).toHaveLength(0);
  });
});
