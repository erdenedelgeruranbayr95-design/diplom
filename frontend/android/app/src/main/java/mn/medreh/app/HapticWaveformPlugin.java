package mn.medreh.app;

import android.content.Context;
import android.os.Build;
import android.os.VibrationEffect;
import android.os.Vibrator;
import com.getcapacitor.JSArray;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/**
 * Web Vibration API нь зөвхөн on/off (тогтмол хүчтэй) чичиргээ өгдөг тул
 * frontend-ийн PhoneDevice.pulse()-ийн шаардсан амплитуд 0-255 нарийвчлалыг
 * Android-ийн native VibrationEffect.createWaveform() API-аар л биелүүлж
 * болно (см. docs/CAPACITOR-ANDROID-SETUP.md, frontend/src/lib/haptics/PhoneDevice.ts).
 */
@CapacitorPlugin(name = "HapticWaveform")
public class HapticWaveformPlugin extends Plugin {
    @PluginMethod
    public void vibrateWaveform(PluginCall call) {
        JSArray timingsArr = call.getArray("timings");
        JSArray amplitudesArr = call.getArray("amplitudes");
        if (timingsArr == null || amplitudesArr == null) {
            call.reject("timings/amplitudes талбар дутуу байна");
            return;
        }

        try {
            long[] timings = new long[timingsArr.length()];
            int[] amplitudes = new int[amplitudesArr.length()];
            for (int i = 0; i < timingsArr.length(); i++) timings[i] = timingsArr.getLong(i);
            for (int i = 0; i < amplitudesArr.length(); i++) amplitudes[i] = amplitudesArr.getInt(i);

            Context context = getContext();
            Vibrator vibrator = (Vibrator) context.getSystemService(Context.VIBRATOR_SERVICE);
            if (vibrator == null || !vibrator.hasVibrator()) {
                call.resolve();
                return;
            }

            // amplitudes[0] нь бүгд 0 (chичиргээг зогсоох дуудлага) бол vibrate()
            // дуудахгүйгээр л зогсооно — VibrationEffect бүх утга 0 үед алдаа шиднэ.
            boolean allZero = true;
            for (int a : amplitudes) {
                if (a != 0) {
                    allZero = false;
                    break;
                }
            }
            if (allZero) {
                vibrator.cancel();
                call.resolve();
                return;
            }

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                vibrator.vibrate(VibrationEffect.createWaveform(timings, amplitudes, -1));
            } else {
                // API 26-с доош createWaveform(amplitudes) байхгүй тул энгийн timing-based
                // vibrate()-ээр (амплитуд дэмжигдэхгүй ч, найдвартай fallback) орлуулна.
                vibrator.vibrate(timings, -1);
            }
            call.resolve();
        } catch (Exception e) {
            call.reject("vibrateWaveform failed", e);
        }
    }
}
