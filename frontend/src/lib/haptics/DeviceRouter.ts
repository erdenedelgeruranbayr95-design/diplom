"use client";

import { PhoneDevice } from "./PhoneDevice";
import { GamepadDevice } from "./GamepadDevice";
import type { HapticDevice } from "./HapticDevice";

/* Холбогдсон бүх HapticDevice-уудыг нэг дор удирдаж, `pulse`/`setBand` дуудлагыг
   БҮГДЭД зэрэг дамжуулна ("нэг дууг олон төхөөрөмж дээр зэрэг синхроноор мэдрүүлэх" —
   Үе шат 4-ийн DoD).

   PhoneDevice/GamepadDevice аль аль нь HAPPИЙН зөвшөөрлийн урсгал шаардахгүй тул эхэнд
   аль хэдийн register-тэй (isConnected() өөрөө шалгадаг, gamepad polling-ээр л мэдэгддэг).
   BleVestDevice бол Web Bluetooth-ийн browser dialog (хэрэглэгчийн дохио) шаардлагатай
   тул DevicesView-ээс "Холбох" товч дарахад л дуудагдаж register() хийгдэнэ. */
export class DeviceRouter {
  private devices: HapticDevice[] = [new PhoneDevice(), new GamepadDevice()];

  /** Идэвхтэй (холбогдсон) төхөөрөмжүүд. */
  get connected(): HapticDevice[] {
    return this.devices.filter((d) => d.isConnected());
  }

  /** Одоо бүртгэгдсэн бүх төхөөрөмж (холбогдсон эсэхээс үл хамааран) — UI жагсаалт. */
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

  setBand(zone: number, level: number): void {
    for (const d of this.connected) d.setBand(zone, level);
  }

  stop(): void {
    for (const d of this.devices) d.stop();
  }
}
