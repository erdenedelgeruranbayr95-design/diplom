import { PhoneDevice } from "./PhoneDevice";
import { patternDurationMs, patternPeak, type HapticPattern } from "./beat-pattern";
import type { HapticDevice } from "./HapticDevice";

/* Вэбийн `DeviceRouter`-ийн RN хувилбар — холбогдсон бүх төхөөрөмжид `pulse`/`setBand`
   дуудлагыг зэрэг дамжуулна.

   ЯЛГАА: вэб дээр эхнээсээ `PhoneDevice` + `GamepadDevice` хоёр бүртгэлтэй байдаг.
   RN-д Gamepad API байхгүй тул зөвхөн `PhoneDevice`. BLE хантааз (`BleVestDevice`)
   нь вэб дээр Web Bluetooth ашигладаг — RN-д `react-native-ble-plx` хэрэгтэй, хараахан
   хийгээгүй. Интерфейс өөрчлөгдөөгүй тул дараа `register()`-ээр нэмэхэд энэ файл
   өөрчлөгдөхгүй. */
export class DeviceRouter {
  private devices: HapticDevice[] = [new PhoneDevice()];

  get connected(): HapticDevice[] {
    return this.devices.filter((d) => d.isConnected());
  }

  get all(): HapticDevice[] {
    return this.devices;
  }

  register(device: HapticDevice): void {
    if (this.devices.some((d) => d.id === device.id)) return;
    this.devices.push(device);
  }

  unregister(id: string): void {
    const device = this.devices.find((d) => d.id === id);
    device?.disconnect();
    this.devices = this.devices.filter((d) => d.id !== id);
  }

  pulse(strength: number, durationMs?: number): void {
    for (const d of this.connected) d.pulse(strength, durationMs);
  }

  /** Дугтуйтай импульс. Дэмждэггүй төхөөрөмжид оргил хүч + нийт хугацаагаар
   *  хураангуйлж дамжуулна — чичиргээ огт алдагдахгүй, зөвхөн хэлбэр нь энгийн болно. */
  pulsePattern(pattern: HapticPattern): void {
    for (const d of this.connected) {
      if (d.pulsePattern) d.pulsePattern(pattern);
      else d.pulse(patternPeak(pattern), patternDurationMs(pattern));
    }
  }

  setBand(zone: number, level: number): void {
    for (const d of this.connected) d.setBand(zone, level);
  }

  stop(): void {
    for (const d of this.devices) d.stop();
  }
}
