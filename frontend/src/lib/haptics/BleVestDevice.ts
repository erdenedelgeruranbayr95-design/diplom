"use client";

import type { HapticDevice } from "./HapticDevice";

/* Web Bluetooth (GATT) ороосон HapticDevice хэрэгжилт — олон моторт хантааз/суудал.
   Roadmap-ийн "олон мотор (tonotopic)" DoD-ийг хангахын тулд `supportsMultiZone: true` —
   `setBand(zone, level)` дуудлага бүрийг ТУСДАА GATT characteristic бичилт болгож
   илгээнэ (biеийн өөр өөр байрлалд байрлах мотор бүрийг бие даан удирдана).

   Бодит тоног төхөөрөмжийн үйлдвэрлэгчийн service/characteristic UUID стандартчлагдаагүй
   тул энд ЖИШЭЭ протокол ашигласан (custom UUID) — бодит хантааз холбогдоход эдгээр
   тогтмолыг тухайн төхөөрөмжийн firmware спецификацитай тааруулна. Payload формат:
   1 байт [zone (0-7)] + 1 байт [level (0-255)] — хамгийн энгийн, өргөтгөх боломжтой. */
const SERVICE_UUID = "0000fe00-0000-1000-8000-00805f9b34fb"; // жишээ (custom) service
const CHARACTERISTIC_UUID = "0000fe01-0000-1000-8000-00805f9b34fb"; // жишээ (custom) write characteristic

export class BleVestDevice implements HapticDevice {
  readonly id = "ble-vest";
  readonly label = "BLE хантааз";
  readonly supportsMultiZone = true;

  private device: BluetoothDevice | null = null;
  private characteristic: BluetoothRemoteGATTCharacteristic | null = null;

  async connect(): Promise<boolean> {
    if (typeof navigator === "undefined" || !navigator.bluetooth) return false;
    try {
      this.device = await navigator.bluetooth.requestDevice({
        filters: [{ services: [SERVICE_UUID] }],
        optionalServices: [SERVICE_UUID],
      });
      const server = await this.device.gatt?.connect();
      const service = await server?.getPrimaryService(SERVICE_UUID);
      this.characteristic = (await service?.getCharacteristic(CHARACTERISTIC_UUID)) || null;
      return !!this.characteristic;
    } catch {
      // Хэрэглэгч сонголтын цонхыг цуцалсан эсвэл тохирох төхөөрөмж олдоогүй — чимээгүй.
      return false;
    }
  }

  disconnect(): void {
    this.device?.gatt?.disconnect();
    this.device = null;
    this.characteristic = null;
  }

  isConnected(): boolean {
    return !!this.device?.gatt?.connected && !!this.characteristic;
  }

  private write(zone: number, level: number): void {
    if (!this.characteristic) return;
    const payload = new Uint8Array([Math.max(0, Math.min(7, zone)), Math.round(Math.max(0, Math.min(1, level)) * 255)]);
    this.characteristic.writeValueWithoutResponse(payload).catch(() => {});
  }

  pulse(strength: number, _durationMs?: number): void {
    // Ганц импульс — бүх бүсийг зэрэг дунд эрчимээр (zone-мэдээлэлгүй дуудлагад).
    for (let zone = 0; zone < 8; zone++) this.write(zone, strength);
  }

  setBand(zone: number, level: number): void {
    this.write(zone, level);
  }

  stop(): void {
    for (let zone = 0; zone < 8; zone++) this.write(zone, 0);
  }
}
