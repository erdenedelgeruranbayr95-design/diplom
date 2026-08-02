"use client";

import { RootApiPending } from "../RootSection";

/* Backend API одоогоор БАЙХГҮЙ хэсгүүд.

   "Шинэ backend API зохиомжлохгүй" гэсэн шаардлагыг баримталж, эдгээр дэлгэц
   хуурамч тоо/хүснэгт харуулахгүй — оронд нь ЯГ ЮУ дутуу байгааг ил бичнэ.
   Backend бэлэн болмогц зөвхөн эдгээр компонентыг жинхэнэ хүснэгтээр солино. */

export function RootDevices() {
  return (
    <RootApiPending
      title="Төхөөрөмж"
      eyebrow="ROOT"
      description="Холбогдсон утас, gamepad, BLE хантааз болон QR сессийн хяналт."
      needs={[
        "GET /qr/sessions (жагсаалт) — одоо зөвхөн POST /qr/sessions ба GET /qr/sessions/:token",
        "QRSession.status-аар шүүх + идэвхтэй холболтын тоо",
        "Socket.io presence — хэдэн desktop/phone онлайн байгааг тоолох",
        "Prisma: ListenHistory.device талбар (phone | gamepad | vest)",
      ]}
    />
  );
}

export function RootDatabase() {
  return (
    <RootApiPending
      title="Өгөгдлийн сан"
      eyebrow="ROOT"
      description="Хүснэгтийн хэмжээ, мөрийн тоо, migration түүх, холболтын төлөв."
      needs={[
        "GET /health/db — холболт, latency, pool төлөв",
        "GET /database/tables — хүснэгт бүрийн мөрийн тоо ба хэмжээ",
        "Prisma migration түүхийг харуулах (_prisma_migrations хүснэгт)",
      ]}
    />
  );
}

export function RootSettings() {
  return (
    <RootApiPending
      title="Тохиргоо"
      eyebrow="ROOT"
      description="Системийн тохиргоо, feature flag, үнэ, preview-ийн урт."
      needs={[
        "Prisma: model AppSetting (key · value · updatedBy · updatedAt)",
        "GET/PATCH /settings (ROOT-only)",
        "Одоо: PREVIEW_SEC · VIB_LEVELS · үнэ бүгд frontend-ийн тогтмолууд (lib/player/constants.tsx)",
      ]}
    />
  );
}

export function RootBackup() {
  return (
    <RootApiPending
      title="Нөөцлөлт"
      eyebrow="ROOT"
      description="Postgres дамп, сэргээлт, автомат хуваарь."
      needs={[
        "pg_dump cron job + S3 versioning",
        "GET /backup/history — сүүлийн нөөцлөлтүүд",
        "POST /backup/run — гар аргаар нөөцлөх (ROOT-only)",
        "Сэргээх (restore) журам ба туршилт",
      ]}
    />
  );
}
