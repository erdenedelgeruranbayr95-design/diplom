"use client";

/* Мэдрэлийн гаралтын нэгдсэн интерфейс — Үе шат 3-ийн суурь абстракц.

   Одоо ганц хэрэгжилт байгаа (`PhoneDevice`, `navigator.vibrate` ороосон), гэхдээ
   `useHapticEngine` цаашид ЗӨВХӨН энэ интерфейсээр л ажиллана — Үе шат 4-т
   `GamepadDevice`/`BleVestDevice` нэмэхэд `useHapticEngine`-ийг өөрчлөх шаардлагагүй,
   зөвхөн `DeviceRouter`-т шинэ класс бүртгэнэ.

   `setBand(zone, level)` — 8 бүсийн Haptic Score-той шууд нийцтэй: zone нь
   0..7 (BAND_EDGES_HZ индекс), level нь 0..1 normalize утга. Ганц моторт (утасны
   vibrate) төхөөрөмж бүх бүсийг нэг хэмнэлд нэгтгэдэг (`supportsMultiZone: false`),
   олон моторт (BLE хантааз) бүс тус бүрийг тусад нь мэдрүүлж чадна. */
export interface HapticDevice {
  readonly id: string;
  readonly label: string;
  /** Энэ төхөөрөмж зэрэг олон бүсийг тусад нь (өөр өөр байрлалд) мэдрүүлж чадах эсэх. */
  readonly supportsMultiZone: boolean;

  /** Холболт эхлүүлнэ (BLE-д parесэн, утас/gamepad-д ихэвчлэн синхрон no-op). */
  connect(): Promise<boolean>;
  /** Холболтыг цэвэрлэнэ (event listener арилгах, GATT салгах гэх мэт). */
  disconnect(): void;
  /** Энэ төхөөрөмж холбогдсон, ашиглах боломжтой эсэх. */
  isConnected(): boolean;

  /** Ганц импульс (beat/onset) — `strength` 0..1, `durationMs` сонголтоор. */
  pulse(strength: number, durationMs?: number): void;
  /** Тодорхой бүсийн (zone) түвшинг тохируулна — `supportsMultiZone: false` үед
   *  бүх дуудлага нэг ерөнхий моторт нэгтгэгдэнэ (жишээ: хамгийн өндөр идэвхтэй бүс). */
  setBand(zone: number, level: number): void;
  /** Бүх бүсийг зогсооно (дуу зогсох/солигдох үед). */
  stop(): void;
}
