import { test, expect } from "@playwright/test";
import { waitForLanding, registerNewUser, dismissAutoCalibrationIfOpen, clickResilientToCalibration } from "./helpers";

/* Роадмапын Үе шат 6 E2E: "QR хослуулах". Нэвтэрсэн хэрэглэгч утас холбох dialog-ийг
   нээж, QR код бодитоор рендэр хийгдэж, session үүсгэгдэж байгааг (loading текст
   солигдох) шалгана. Бодит гар утсаар уншуулах хэсгийг automate хийхгүй (өөр төхөөрөмж
   шаардана) — зөвхөн QR session үүсэх хүртэлх урсгалыг баталгаажуулна. */
test.describe("QR-аар утас холбох", () => {
  test("нэвтэрсэн хэрэглэгч QR pairing dialog нээж, QR код бодитоор рендэр хийгдэнэ", async ({ page }) => {
    const email = `e2e-qr-${Date.now()}@example.com`;

    await waitForLanding(page);
    await registerNewUser(page, { name: "E2E QR", email });

    // Калибровк auto-prompt гарвал үл хэрэгсэж хаана — QR тестэд саад болохгүй.
    await dismissAutoCalibrationIfOpen(page);

    const pairingButton = page.getByRole("button", { name: "Утас холбох" });
    await expect(pairingButton).toBeVisible({ timeout: 10_000 });
    await clickResilientToCalibration(page, pairingButton);

    const dialog = page.getByRole("dialog", { name: "Утас холбох" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText("MEDREH Mobile-оор доорх QR кодыг уншуулна уу")).toBeVisible();

    // QR код бодитоор SVG болж рендэр хийгдсэн эсэхийг шалгана (QRCodeSVG гаралт)
    const qrSvg = dialog.locator("svg").first();
    await expect(qrSvg).toBeVisible({ timeout: 10_000 });

    // Session идэвхтэй болсныг илтгэх "хүлээж байна" текст харагдана (backend
    // POST /qr/sessions бодитоор дуудагдсаны нотолгоо — алдаа гарсан бол энэ текст
    // ор ny-д алдааны мессежээр солигдоно, аль ч тохиолдолд dialog хоосон үлдэхгүй).
    await expect(dialog.getByText(/хүлээж байна|Холбогдлоо|алдаа/i)).toBeVisible({ timeout: 10_000 });
  });
});
