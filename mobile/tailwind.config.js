/* МЭДРЭХ mobile — дизайн токен.

   Утгууд нь вэбийн `frontend/src/app/globals.css` дэх `@theme` блокоос ЯГ хуулагдсан
   (өнгө · радиус · typography). Вэб нь Tailwind v4 (@theme CSS-д), NativeWind 4 нь
   Tailwind v3 config шаарддаг тул хоёр газар давхардаж байна — вэб дээрх токен
   өөрчлөгдвөл ЭНД БАС засна.

   Вэбээс ЗОРИУДААР авчраагүй зүйл:
     · blur / backdrop-filter — RN-д байхгүй (BlurView компонентоор орлоно)
     · box-shadow (--shadow-*) — RN-д elevation/shadowColor өөр загвартай
     · --text-scale үржигч — RN-д CSS calc() байхгүй, useAppPreferences-д тооцно */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}", "./modules/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  /* NativeWind-ийн өгөгдмөл `darkMode: "media"` нь системийн тохиргоог дагадаг бөгөөд
     өнгөний горимыг ГАРААР тохируулахыг хориглодог. Апп нь `userInterfaceStyle: "dark"`
     (app.json)-оор бараанг албадах үед NativeWind:

       Uncaught Error: Cannot manually set color scheme, as dark mode is type 'media'.

     гэж шидэж, дэлгэц дээр алдааны цонх гарч бүх дарлагыг блоклодог. МЭДРЭХ нь
     ЗӨВХӨН бараан загвартай тул системийн горимыг дагах шаардлагагүй — "class"
     болгосноор гараар тохируулах зөвшөөрөгдөнө. */
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "#070a0a",
        ink: "#f2f5f4",
        dim: "#778583",
        faint: "#768583",
        aqua: "#38e8ce",
        "aqua-hover": "#6ff3de",
        "on-aqua": "#04100e",
        warm: "#d9a54c",
        purple: "#b49cff",
        rose: "#f08ca5",
        danger: "#e88a9b",
        "danger-ink": "#140306",
        surface: "#0d1414",
        "surface-2": "#101817",
        line: "rgba(242,245,244,0.11)",
        "line-2": "rgba(242,245,244,0.16)",
        "line-3": "rgba(242,245,244,0.24)",
        "line-field": "rgba(242,245,244,0.36)",
      },
      borderRadius: {
        bar: "3px",
        sm: "8px",
        chip: "11px",
        md: "13px",
        lg: "18px",
        panel: "22px",
        card: "28px",
        full: "999px",
      },
      fontSize: {
        micro: "9px",
        meta: "10px",
        caption: "11px",
        note: "12.5px",
        body: "13.5px",
        copy: "14.5px",
        lead: "15px",
        title: "16px",
        heading: "18px",
      },
    },
  },
  plugins: [],
};
