/// <reference types="nativewind/types" />

/* `import "../global.css"` нь Metro-гийн NativeWind хувиргалтад зориулсан side-effect
   импорт — TypeScript-д .css файлын мэдэгдэл байдаггүй тул TS2882 алдаа өгдөг.
   Энэ мэдэгдэл нь зөвхөн typecheck-ийг чимээгүй болгоно, ажиллагаанд нөлөөгүй. */
declare module "*.css" {}
