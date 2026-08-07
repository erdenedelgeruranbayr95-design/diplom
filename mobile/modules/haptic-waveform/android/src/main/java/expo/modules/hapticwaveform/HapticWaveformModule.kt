package expo.modules.hapticwaveform

import android.content.Context
import android.os.Build
import android.os.VibrationEffect
import android.os.Vibrator
import android.os.VibratorManager
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

/**
 * React Native-ийн `Vibration` API нь Web Vibration API-тай адил зөвхөн on/off
 * (тогтмол хүчтэй) чичиргээ өгдөг. Энэ төслийн гол шаардлага бол АМПЛИТУД 0-255
 * түвшний нарийвчлал — сонсголгүй хэрэглэгч дууны эрчмийг арьсаараа ялгаж мэдрэх
 * ёстой. Түүнийг зөвхөн Android-ийн `VibrationEffect.createWaveform()` өгдөг.
 *
 * Энэ модуль нь вэб хувилбарын Capacitor plugin
 * (`frontend/android/.../HapticWaveformPlugin.java`) -ийн ижил логикийг давтсан.
 *
 * ⚠️ ЗАГВАРЫН ЖУРАМ: `ModuleDefinition` доторх `Function { }` лямбдууд нь ЗӨВХӨН
 * доорх энгийн private функцүүдийг дуудна. Логикийг лямбда дотор шууд бичвэл
 * Kotlin-ий төрөл тодорхойлолт (`return@Function`-тэй хамт) Expo-гийн generic DSL
 * дээр тодорхойгүй болж compile унадаг. Энгийн функц дотор `return` асуудалгүй.
 */
class HapticWaveformModule : Module() {

  override fun definition() = ModuleDefinition {
    Name("HapticWaveform")

    Function("hasAmplitudeControl") {
      hasAmplitudeControlInternal()
    }

    Function("vibrateWaveform") { timings: List<Double>, amplitudes: List<Int> ->
      vibrateWaveformInternal(timings, amplitudes)
    }

    Function("cancel") {
      cancelInternal()
    }
  }

  private fun getVibrator(): Vibrator? {
    val context: Context = appContext.reactContext ?: return null
    return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
      // API 31-ээс VIBRATOR_SERVICE хуучирсан — VibratorManager-ээр авна.
      val manager = context.getSystemService(Context.VIBRATOR_MANAGER_SERVICE) as? VibratorManager
      manager?.defaultVibrator
    } else {
      @Suppress("DEPRECATION")
      context.getSystemService(Context.VIBRATOR_SERVICE) as? Vibrator
    }
  }

  /**
   * Төхөөрөмж амплитуд (0-255) удирдахыг дэмждэг эсэх. Дэмждэггүй бол
   * `createWaveform`-ийн амплитудууд үл тоомсорлогдож зөвхөн on/off болно —
   * апп үүнийг мэдэж хэрэглэгчид анхааруулна.
   */
  private fun hasAmplitudeControlInternal(): Boolean {
    val vibrator = getVibrator() ?: return false
    if (!vibrator.hasVibrator()) return false
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return false
    return vibrator.hasAmplitudeControl()
  }

  /**
   * @param timings    мс-ийн дараалал [хүлээх, чичрэх, ...]
   * @param amplitudes тус бүрийн амплитуд 0-255, `timings`-тэй ИЖИЛ уртай
   */
  private fun vibrateWaveformInternal(timings: List<Double>, amplitudes: List<Int>) {
    val vibrator = getVibrator() ?: return
    if (!vibrator.hasVibrator()) return
    if (timings.isEmpty() || timings.size != amplitudes.size) return

    // Бүх амплитуд 0 бол энэ нь "зогсоо" дуудлага — VibrationEffect бүх утга 0 үед
    // IllegalArgumentException шиддэг тул cancel()-ээр л зогсооно.
    if (amplitudes.all { it == 0 }) {
      vibrator.cancel()
      return
    }

    val timingsArray = LongArray(timings.size) { i -> timings[i].toLong().coerceAtLeast(0L) }
    val amplitudesArray = IntArray(amplitudes.size) { i -> amplitudes[i].coerceIn(0, 255) }

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      vibrator.vibrate(VibrationEffect.createWaveform(timingsArray, amplitudesArray, -1))
    } else {
      // API 26-с доош амплитуд дэмжигдэхгүй — timing-based fallback.
      @Suppress("DEPRECATION")
      vibrator.vibrate(timingsArray, -1)
    }
  }

  private fun cancelInternal() {
    getVibrator()?.cancel()
  }
}
