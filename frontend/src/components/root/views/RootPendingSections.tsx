"use client";

import { RootApiPending } from "../RootSection";

/* Backend API одоогоор БАЙХГҮЙ хэсгүүд.

   "Шинэ backend API зохиомжлохгүй" гэсэн шаардлагыг баримталж, эдгээр дэлгэц
   хуурамч тоо/хүснэгт харуулахгүй — оронд нь ЯГ ЮУ дутуу байгааг ил бичнэ.
   Backend бэлэн болмогц зөвхөн эдгээр компонентыг жинхэнэ хүснэгтээр солино. */

export function RootPayments() {
  return (
    <RootApiPending
      title="Төлбөр"
      eyebrow="ROOT"
      description="Захиалга, орлого, буцаалт, нэхэмжлэхийн бүртгэл."
      needs={[
        "Prisma: model Payment (userId · amount · currency · method · status · providerRef)",
        "Prisma: model Subscription (provider · providerRef · renewsAt) — одоо User дээрх талбараар",
        "GET /payments (ROOT/ADMIN) · GET /me/payments",
        "POST /webhooks/qpay — төлбөрийн provider-ийн баталгаажуулалт",
        "Одоо: төлбөрийн түүх per-user localStorage дээр (medreh_payments:<email>)",
      ]}
    />
  );
}

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

export function RootReports() {
  return (
    <RootApiPending
      title="Гомдол"
      eyebrow="ROOT"
      description="Хэрэглэгчийн мэдүүлсэн тохирохгүй контент, зөрчлийн бүртгэл."
      needs={[
        "Prisma: model Report (reporter · targetType · targetId · reason · status)",
        "GET /moderation/reports · POST /moderation/reports/:id/resolve",
        "Role.MODERATOR — одоо ROOT · ADMIN · THERAPIST · USER · PARENT л бий",
      ]}
    />
  );
}

export function RootSecurity() {
  return (
    <RootApiPending
      title="Аюулгүй байдал"
      eyebrow="ROOT"
      description="Нэвтрэлтийн оролдлого, идэвхтэй сесс, хориглосон бүртгэл."
      needs={[
        "GET /security/sessions — идэвхтэй RefreshToken-ууд (одоо DB-д бий, endpoint байхгүй)",
        "POST /users/:id/ban — User.status талбар бий, endpoint байхгүй",
        "Нэвтрэлтийн амжилтгүй оролдлогын бүртгэл (одоо зөвхөн Throttler хязгаарладаг)",
        "2FA · имэйл баталгаажуулалт · нууц үг сэргээх",
      ]}
    />
  );
}

export function RootAuditLogs() {
  return (
    <RootApiPending
      title="Аудит лог"
      eyebrow="ROOT"
      description="Админ/ROOT-ийн хийсэн бүх үйлдлийн мөрдөгдөх бүртгэл."
      needs={[
        "Prisma: model AuditLog (actor · action · target · meta · createdAt)",
        "NestJS interceptor — mutating route бүрийг автоматаар бичих",
        "GET /audit?actor=&action=&from=&to=",
      ]}
    />
  );
}

export function RootStorage() {
  return (
    <RootApiPending
      title="Файл сан"
      eyebrow="ROOT"
      description="Аудио файл, ковер зураг, Haptic Score-ийн хадгалалт ба хэмжээ."
      needs={[
        "S3 / MinIO холболт — одоо файл backend/uploads/ локал диск дээр",
        "GET /storage/usage — эзэлсэн хэмжээ, файлын тоо",
        "Presigned upload URL (одоо multer-ээр API дамжуулж байна)",
        "Өнчин файл цэвэрлэх job (Song устсан ч файл үлддэг)",
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
