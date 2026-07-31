import type { Config } from "tailwindcss";

/* Tailwind v4-т дизайн токен нь `src/app/globals.css`-ийн `@theme` блок дотор
   амьдардаг — ӨНГӨ · РАДИУС · СҮҮДЭР · BLUR · SPACING · ШРИФТ · ХЭМЖЭЭ бүгд ТЭНД.
   Урьд нь эдгээр нь энэ файлд БАС хуулбарлагдсан байсан тул нэг утгыг 2 газраас
   засах шаардлагатай, зөрөх эрсдэлтэй байв.

   Энэ файлд ЗӨВХӨН @theme-ээр илэрхийлэх боломжгүй зүйл үлдэнэ:
     · content glob
     · max-width суурьтай custom breakpoint (@theme нь зөвхөн min-width
       `--breakpoint-*` дэмждэг) */
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      /* medreh.css/ui.css-д ашиглагдсан custom breakpoint-үүд (Tailwind-ийн default 768px/1024px
         биш) — Sidebar/TopBar-ийн mobile responsive rule-үүд яг эдгээр утга дээр шилждэг. */
      screens: {
        "max-nav": { max: "860px" },
        "max-viz": { max: "1020px" },
      },
    },
  },
  plugins: [],
};

export default config;
