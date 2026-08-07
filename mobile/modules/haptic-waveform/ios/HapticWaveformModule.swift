import ExpoModulesCore
import CoreHaptics

/**
 * iOS дээр Android-ийн `VibrationEffect.createWaveform` шууд дүйцэхүйц API байхгүй —
 * оронд нь Core Haptics (iPhone 8+) нь `CHHapticEngine`-ээр эрчим (intensity 0..1)
 * удирддаг. Энэ нь ижил зорилготой ч өөр загвартай тул амплитуд 0-255-ыг 0..1
 * болгон хувиргаж дамжуулна.
 *
 * Core Haptics дэмждэггүй төхөөрөмж дээр (эсвэл engine эхлэхгүй бол) чимээгүй
 * no-op болно — апп унахгүй, зүгээр чичиргээгүй ажиллана.
 */
public class HapticWaveformModule: Module {
  private var engine: CHHapticEngine?

  private var supportsHaptics: Bool {
    CHHapticEngine.capabilitiesForHardware().supportsHaptics
  }

  private func ensureEngine() -> CHHapticEngine? {
    guard supportsHaptics else { return nil }
    if let engine = engine { return engine }
    engine = try? CHHapticEngine()
    try? engine?.start()
    return engine
  }

  public func definition() -> ModuleDefinition {
    Name("HapticWaveform")

    Function("hasAmplitudeControl") { () -> Bool in
      return self.supportsHaptics
    }

    Function("vibrateWaveform") { (timings: [Double], amplitudes: [Int]) in
      guard !timings.isEmpty, timings.count == amplitudes.count else { return }
      if amplitudes.allSatisfy({ $0 == 0 }) {
        self.engine?.stop()
        return
      }
      guard let engine = self.ensureEngine() else { return }

      // timings нь [хүлээх, чичрэх, хүлээх, ...] — хуримтлагдсан хугацаагаар
      // эхлэлийн цэг тооцож, тэг биш амплитуд бүрийг нэг үйл явдал болгоно.
      var events: [CHHapticEvent] = []
      var offset: Double = 0
      for (i, ms) in timings.enumerated() {
        let seconds = ms / 1000.0
        let amplitude = amplitudes[i]
        if amplitude > 0 && seconds > 0 {
          let intensity = Float(min(max(amplitude, 0), 255)) / 255.0
          events.append(
            CHHapticEvent(
              eventType: .hapticContinuous,
              parameters: [
                CHHapticEventParameter(parameterID: .hapticIntensity, value: intensity),
                CHHapticEventParameter(parameterID: .hapticSharpness, value: 0.5),
              ],
              relativeTime: offset,
              duration: seconds
            )
          )
        }
        offset += seconds
      }
      guard !events.isEmpty else { return }

      if let pattern = try? CHHapticPattern(events: events, parameters: []),
         let player = try? engine.makePlayer(with: pattern) {
        try? player.start(atTime: CHHapticTimeImmediate)
      }
    }

    Function("cancel") {
      self.engine?.stop()
    }
  }
}
