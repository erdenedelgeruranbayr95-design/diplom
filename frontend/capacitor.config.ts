import type { CapacitorConfig } from "@capacitor/cli";

/* Capacitor Android wrapper тохиргоо (см. docs/CAPACITOR-ANDROID-SETUP.md).
   `webDir: "out"` — `npm run build:capacitor` (CAPACITOR_BUILD=1 → next.config.ts-ийн
   static export горим) үүсгэсэн статик HTML/JS хавтас. `npx cap sync android`
   энэ хавтасыг `android/app/src/main/assets/public`-руу хуулна. */
const config: CapacitorConfig = {
  appId: "mn.medreh.app",
  appName: "МЭДРЭХ",
  webDir: "out",
};

export default config;
