import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";
import MotionProvider from "@/components/providers/MotionProvider";
import { fontVariables } from "./fonts";

export const metadata: Metadata = {
  title: "МЭДРЭХ® — хөгжмийг арьсаараа",
  description: "Сонсголын бэрхшээлтэй хүмүүст зориулсан хөгжмийн платформ",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='42' fill='%2338E8CE'/></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* Шрифтийн CSS хувьсагчийг <html>-д тавина — globals.css-ийн @theme эдгээрийг уншина.
       Гуравдагч домэйн руу хүсэлт байхгүй (next/font build үед өөрийн домэйнд байрлуулсан). */
    <html lang="mn" className={fontVariables}>
      <body id="top">
        {/* Гар талбараар шууд агуулга руу үсрэх холбоос — Tab дарахад л харагдана.
            Үүнгүй бол гар ашигладаг хэрэглэгч бүр хуудас ачаалах болгонд TopBar-ийн
            бүх товчийг дамжих шаардлагатай болдог (WCAG 2.4.1 Bypass Blocks).

            `#main` (PageContainer) зөвхөн Player нээгдсэн үед л DOM-д ордог тул
            landing (Player хаалттай) үед skip-link зорилтгүй болж, Lighthouse-ийн
            "Skip links are not focusable" алдаа өгдөг байсан. `#hero`
            (HeroSection.tsx) landing дээр байнга байдаг, харин Player нээгдэхэд
            HeroSection DOM-оос устдаггүй тул хоёр тохиолдолд аль алинд нь
            ажиллах ганц тогтвортой зорилт. */}
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[10050] focus:rounded-full focus:bg-aqua focus:text-on-aqua focus:px-5 focus:py-3 focus:text-body focus:font-semibold focus:shadow-lg"
        >
          Шууд агуулга руу очих
        </a>
        <MotionProvider>
          <AuthProvider>
            <ToastProvider>{children}</ToastProvider>
          </AuthProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
