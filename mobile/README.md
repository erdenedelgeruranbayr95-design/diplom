# МЭДРЭХ — React Native апп (Expo)

Вэб хувилбарын (`../frontend`) гар утасны эквивалент. Backend (`../backend`) нь
хоёуланд НЭГ ижил — API гэрээ өөрчлөгдөөгүй.

## Яагаад Expo (bare React Native биш)

Энэ хөгжүүлэлтийн орчинд **Android SDK байхгүй**, **JDK 1.8** (RN нь 17+ шаарддаг).
Expo Go-гоор эдгээрийг огт суулгахгүйгээр бодит утсан дээр турших боломжтой.
Native чичиргээний модуль (доор) л зөвхөн бүтэн build шаарддаг — түүнийг **EAS Build**
(Expo-гийн үүлэн build) дээр хийвэл локал SDK хэвээр хэрэггүй.

## Ажиллуулах

```bash
npm install --legacy-peer-deps
npm start
```

QR кодыг Expo Go аппаар уншина. **Утас болон компьютер НЭГ Wi-Fi дээр** байх ёстой.

Backend-ээ бас асаана (тусдаа терминал):

```bash
cd ../backend && npm run start:dev
```

`src/lib/config.ts` нь Metro серверийн LAN IP-г уншиж backend-ийн хаягийг өөрөө
олдог тул IP гараар бичих шаардлагагүй. Нэвтрэх дэлгэцийн доод талд одоо ямар хаяг
руу холбогдож байгаа нь харагдана.

Тест бүртгэл: `user@medreh.mn` / `user123` (бусад нь `../backend/prisma/seed.ts`).

## Native чичиргээ — энэ төслийн гол цөм

React Native-ийн `Vibration` API нь Web Vibration API-тай адил зөвхөн **on/off**
чичиргээ өгдөг. Сонсголгүй хэрэглэгч дууны эрчмийг ялгаж мэдрэхийн тулд
**амплитуд 0-255** хэрэгтэй — түүнийг зөвхөн Android-ийн `VibrationEffect.createWaveform()`
өгдөг.

`modules/haptic-waveform/` нь үүнд зориулсан Expo local module:

| Файл | Үүрэг |
|---|---|
| `android/.../HapticWaveformModule.kt` | `createWaveform` (API 26+), API 31+ дээр `VibratorManager` |
| `ios/HapticWaveformModule.swift` | Core Haptics — амплитуд 0-255 → intensity 0..1 |
| `src/HapticWaveformModule.web.ts` | Вэб fallback (амплитуд дэмжигдэхгүй) |

Энэ нь вэб хувилбарын Capacitor plugin
(`../frontend/android/app/src/main/java/mn/medreh/app/HapticWaveformPlugin.java`)
-ийн ижил логикийг Expo Modules API дээр давтсан.

> ⚠️ **Expo Go-д native модуль ажиллахгүй.** Чичиргээг бодитоор турших бол
> development build хэрэгтэй: `npx eas build --profile development --platform android`.
> Expo Go дээр UI болон API-г турших боломжтой, чичиргээ л чимээгүй өнгөрнө.

## Вэбээс юу дахин ашиглагдсан

| Давхарга | Байдал |
|---|---|
| `HapticDevice` интерфейс | ЯГ хэвээр хуулагдсан |
| `PhoneDevice`-ийн тооцоолол | Ижил (strength → amplitude, durationMs) |
| API клиентийн бүтэц | Ижил (санах ойн token, 401 → refresh → давтах, single-flight) |
| Домэйн төрлүүд | Ижил |
| Дизайн токен | `tailwind.config.js`-д хуулагдсан (өнгө · радиус · typography) |
| **UI компонентууд** | **Дахин бичигдэнэ** — RN нь HTML/CSS биш |

## Анхаарах

- **Refresh token** нь httpOnly cookie-гоор ирдэг (backend өөрчлөгдөөгүй). RN нь
  platform cookie сангаар зөөдөг тул ажиллана, гэхдээ апп устгахад алга болно.
- `npm install` нь **`--legacy-peer-deps`-гүйгээр унана** — `expo-router` нь
  `vaul`/`@radix-ui` дамжуулан `react-dom@19.2.8` татдаг, тэр нь `react@19.2.3`-тай
  зөрдөг. `../frontend` ч мөн ижил флаг ашигладаг.
