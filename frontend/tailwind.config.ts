import type { Config } from "tailwindcss";

/* МЭДРЭХ-ийн одоо байгаа hand-written CSS дизайн-токенуудыг (src/app/medreh.css,
   src/app/ui.css) Tailwind theme рүү mapping хийсэн config. Энэ бол зөвхөн
   тохиргоо — ямар ч компонент Tailwind классад шилжээгүй, одоогийн CSS бүрэн
   хэвээрээ ажиллана. Tailwind v4-т @theme (globals.css) нь эх сурвалж, гэхдээ
   энэ config-ийг v3-төст workflow/tooling-той нийцүүлэхийн тулд мөн хадгална
   (@config globals.css-д холбогдоно). Утгууд бүгд medreh.css:2-20-ийн жинхэнэ
   custom property-уудаас шууд хуулбарласан — шинээр зохиогоогүй. */
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
      colors: {
        bg: "#070A0A",
        ink: "#F2F5F4",
        dim: "#778583",
        /* #4E5B59 → #6E7C7A: жижиг mono шошгоны контрастыг AA хүртэл (2.8:1 → 4.6:1).
           polish.css-ийн --faint / globals.css-ийн --color-faint-тай синк. */
        faint: "#6E7C7A",
        aqua: "#38E8CE",
        warm: "#D9A54C",
        line: "rgba(242,245,244,.10)",
        /* .c-purple / .c-rose (medreh.css:1081-1082) — StatCard icon өнгө, --var биш
           боловч бусад accent-тэй ижил семантикт багтдаг тул theme-д оруулсан */
        purple: "#B49CFF",
        rose: "#F08CA5",
      },
      borderRadius: {
        sm: "8px",
        md: "13px",
        lg: "18px",
        full: "999px",
      },
      boxShadow: {
        sm: "0 4px 12px rgba(0,0,0,.3)",
        md: "0 12px 32px rgba(0,0,0,.4)",
        lg: "0 18px 50px rgba(0,0,0,.55)",
        "glow-aqua": "0 0 0 3px rgba(56,232,206,.25)",
        "glow-warm": "0 0 0 3px rgba(217,165,76,.3)",
      },
      /* medreh.css/ui.css дотор ашиглагдсан бодит backdrop-filter/filter blur утгууд
         (--blur-* custom property байхгүй, ad-hoc px хэрэглэсэн байсныг цуглуулав) */
      blur: {
        xs: "4px",
        sm: "6px",
        DEFAULT: "8px",
        md: "12px",
        lg: "14px",
        xl: "18px",
        "2xl": "20px",
        "3xl": "22px",
        "4xl": "24px",
        "5xl": "60px",
        "6xl": "150px",
      },
      spacing: {
        "sp-1": "4px",
        "sp-2": "8px",
        "sp-3": "12px",
        "sp-4": "16px",
        "sp-5": "20px",
        "sp-6": "24px",
        "sp-8": "32px",
      },
      maxWidth: {
        wrap: "1340px",
      },
      fontFamily: {
        display: ["Unbounded", "sans-serif"],
        body: ["Golos Text", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
