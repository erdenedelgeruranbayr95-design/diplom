/* Мэдрэлийн гаралтын нэгдсэн интерфейс — вэбийн `frontend/src/lib/haptics/HapticDevice.ts`-ээс
   ЯГ ХЭВЭЭР хуулагдсан (DOM-оос хамааралгүй цэвэр TypeScript).

   Энэ интерфейс өөрчлөгдөөгүй тул `useHapticEngine`-ийн логик вэб/мобайл хоёуланд
   ижил ажиллана — зөвхөн хэрэгжилт (`PhoneDevice`) л платформ тус бүрд өөр.

   `setBand(zone, level)` — 8 бүсийн Haptic Score-той шууд нийцтэй: zone нь 0..7
   (BAND_EDGES_HZ индекс), level нь 0..1 normalize утга. Ганц моторт (утасны vibrate)
   төхөөрөмж бүх бүсийг нэг хэмнэлд нэгтгэдэг (`supportsMultiZone: false`). */
import type { HapticPattern } from "./beat-pattern";

export interface HapticDevice {
  readonly id: string;
  readonly label: string;
  /** Энэ төхөөрөмж зэрэг олон бүсийг тусад нь мэдрүүлж чадах эсэх. */
  readonly supportsMultiZone: boolean;

  connect(): Promise<boolean>;
  disconnect(): void;
  isConnected(): boolean;

  /** Ганц импульс (beat/onset) — `strength` 0..1, `durationMs` сонголтоор. */
  pulse(strength: number, durationMs?: number): void;
  /** Дугтуйтай (attack–decay) импульс — бодит бөмбөрийн цохилт шиг.
   *
   *  ⚠️ СОНГОЛТОТ: бүх төхөөрөмж алхамт дугтуй дэмждэггүй (жиш. `expo-haptics`
   *  нь 3 бэлэн түвшинтэй). Дэмждэггүй үед дуудагч тал `pulse`-руу уначих ёстой
   *  — `DeviceRouter.pulsePattern` үүнийг хийнэ. */
  pulsePattern?(pattern: HapticPattern): void;
  /** Тодорхой бүсийн түвшинг тохируулна. */
  setBand(zone: number, level: number): void;
  /** Бүх бүсийг зогсооно (дуу зогсох/солигдох үед). */
  stop(): void;
}
