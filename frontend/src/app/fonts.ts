/* Шрифт ачаалалт — `next/font/google`.

   Урьд нь layout.tsx-д `<link href="fonts.googleapis.com/css2?…">` байсан бөгөөд:
     · render-blocking — браузер CSS татаж дуустал юу ч зурдаггүй
     · 2 нэмэлт DNS + TLS handshake (fonts.googleapis.com, fonts.gstatic.com)
     · шрифт ирэхээс өмнө fallback-аар зурагдаад дараа нь солигдоход layout ҮСЭРНЭ (CLS)

   `next/font/google` нь build үед шрифтийг ТАТАЖ ӨӨРИЙН домэйнд байрлуулна:
     · гуравдагч домэйн руу хүсэлт огт явахгүй
     · автоматаар `<link rel="preload">` тавина
     · `display: "swap"` + `adjustFontFallback` — fallback-ийн метрикийг тааруулж
       CLS-ийг ~0 болгоно
   Жинг (weights) кодод бодитоор ашиглагдаж байгаагаар нь л татна. */
import { Unbounded, Golos_Text, JetBrains_Mono } from "next/font/google";

export const fontDisplay = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "700", "800"],
  variable: "--font-unbounded",
  display: "swap",
});

export const fontBody = Golos_Text({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-golos",
  display: "swap",
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const fontVariables = `${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`;
