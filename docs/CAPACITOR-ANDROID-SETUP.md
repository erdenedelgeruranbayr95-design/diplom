# Capacitor Android wrapper — тохиргооны төлөвлөгөө (Үе шат 4)

> Энэ баримт нь **бодит Android build хийгээгүй** — Android SDK/Gradle орчин энэ
> хөгжүүлэлтийн орчинд байхгүй тул зөвхөн алхам бүрийг тодорхой бичиж, дараагийн
> (Android SDK-тай) орчинд шууд гүйцэтгэх боломжтой болгосон.

## Зорилго

Одоогийн web app (`frontend/`) браузер дотор `navigator.vibrate()`-аар л ажилладаг —
энэ нь зөвхөн **on/off** (тогтмол хүчтэй) чичиргээ өгдөг. Roadmap-ийн шаардлага:
**амплитуд 0–255** түвшинтэй нарийвчлалтай чичиргээ (`VibrationEffect.createWaveform`,
зөвхөн native Android API-д байдаг, Web Vibration API-д байхгүй боломж).

## Алхамууд

### 1. Capacitor суулгах

```bash
cd frontend
npm install @capacitor/core @capacitor/android
npm install -D @capacitor/cli
npx cap init "МЭДРЭХ" "mn.medreh.app" --web-dir=out
```

`next.config.ts`-д статик экспорт нэмэх шаардлагатай (Capacitor нь статик HTML/JS
хавтас хүлээдэг, Next.js-ийн серверийг androidад ажиллуулахгүй):

```ts
// next.config.ts
const nextConfig = {
  output: "export", // `next build` → `out/` статик хавтас
  // ... одоо байгаа rewrites-ийг устгах шаардлагатай (static export API rewrite дэмждэггүй,
  //     оронд нь NEXT_PUBLIC_API_URL-ийг production backend домэйн руу заана)
};
```

### 2. Android platform нэмэх

```bash
npx cap add android
npx cap sync android
```

### 3. Native чичиргээ plugin бичих

Capacitor-ийн стандарт `@capacitor/haptics` plugin нь зөвхөн энгийн `impact`/
`notification` түвшин дэмждэг, `createWaveform`-ийн бүрэн хяналт өгдөггүй тул
**custom Capacitor plugin** бичих шаардлагатай:

```
frontend/android/app/src/main/java/mn/medreh/app/HapticWaveformPlugin.java
```

```java
package mn.medreh.app;

import android.content.Context;
import android.os.VibrationEffect;
import android.os.Vibrator;
import com.getcapacitor.JSArray;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "HapticWaveform")
public class HapticWaveformPlugin extends Plugin {
    @PluginMethod
    public void vibrateWaveform(PluginCall call) {
        JSArray timingsArr = call.getArray("timings");   // [0, 100, 50, 100, ...]
        JSArray amplitudesArr = call.getArray("amplitudes"); // [0, 255, 0, 180, ...] (0-255)
        try {
            long[] timings = new long[timingsArr.length()];
            int[] amplitudes = new int[amplitudesArr.length()];
            for (int i = 0; i < timingsArr.length(); i++) timings[i] = timingsArr.getLong(i);
            for (int i = 0; i < amplitudesArr.length(); i++) amplitudes[i] = amplitudesArr.getInt(i);

            Vibrator vibrator = (Vibrator) getContext().getSystemService(Context.VIBRATOR_SERVICE);
            if (vibrator != null && vibrator.hasVibrator()) {
                vibrator.vibrate(VibrationEffect.createWaveform(timings, amplitudes, -1));
            }
            call.resolve();
        } catch (Exception e) {
            call.reject("vibrateWaveform failed", e);
        }
    }
}
```

`MainActivity.java`-д бүртгэнэ:

```java
registerPlugin(HapticWaveformPlugin.class);
```

### 4. Frontend талд `PhoneDevice`-г Capacitor-той холбох

`lib/haptics/PhoneDevice.ts`-ийн `pulse()`/`setBand()`-ийг Capacitor орчинд ажиллаж
байгаа эсэхийг (`Capacitor.isNativePlatform()`) шалгаж, native plugin руу чиглүүлнэ —
**HapticDevice интерфейс өөрчлөгдөхгүй**, зөвхөн `PhoneDevice`-ийн дотоод хэрэгжилт:

```ts
// lib/haptics/PhoneDevice.ts (нэмэлт — Capacitor орчинд)
import { Capacitor, registerPlugin } from "@capacitor/core";

interface HapticWaveformPlugin {
  vibrateWaveform(opts: { timings: number[]; amplitudes: number[] }): Promise<void>;
}
const HapticWaveform = registerPlugin<HapticWaveformPlugin>("HapticWaveform");

// pulse(strength, durationMs) дотор:
if (Capacitor.isNativePlatform()) {
  const amplitude = Math.round(Math.max(0, Math.min(1, strength)) * 255);
  HapticWaveform.vibrateWaveform({ timings: [0, durationMs ?? 60], amplitudes: [0, amplitude] });
  return;
}
// ... одоо байгаа navigator.vibrate() fallback (web/browser)
```

### 5. Build ба ажиллуулах

```bash
npm run build          # Next.js статик export (out/)
npx cap sync android    # out/-ийг Android project руу хуулна
npx cap open android    # Android Studio нээгдэнэ — эндээс Run/Debug хийнэ
```

Бодит Android төхөөрөмж/эмулятор дээр `pulse(strength, durationMs)`-ийг зурвасын
эрчмээр (0..255 амплитуд) турших, `docs/`-т screenshot/лог хавсаргах.

## Тестийн төлөвлөгөө (Android SDK бэлэн болмогц)

1. `npx cap run android` — Debug build нэвтэрсэн Android төхөөрөмж дээр суулгах
2. Тоглуулагч нээж, songId-тэй (Score бэлэн) дуу тоглуулах
3. `chrome://inspect` (эсвэл Android Studio Logcat)-аар `PhoneDevice.pulse()`
   дуудлагууд native waveform руу зөв chiglэгдэж байгааг баталгаажуулах
4. Хэд хэдэн `strength` утгаар (0.2, 0.5, 1.0) чичиргээний ялгааг гараар мэдрэх
   (DoD: "амплитуд 0-255" тодорхой мэдрэгдэх ёстой, зөвхөн on/off биш)
