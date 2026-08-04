import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ListAuditDto } from './dto/list-audit.dto';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

  constructor(
    private prisma: PrismaService,
    private storage: StorageService,
  ) {}

  async listAudit(q: ListAuditDto) {
    const page = q.page ?? 1;
    const limit = q.limit ?? 30;
    const where: Prisma.AuditLogWhereInput = {
      ...(q.actorId ? { actorId: q.actorId } : {}),
      ...(q.action ? { action: { contains: q.action, mode: 'insensitive' } } : {}),
    };
    const [items, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: { actor: { select: { id: true, name: true, email: true } } },
      }),
      this.prisma.auditLog.count({ where }),
    ]);
    return { items, total };
  }

  /** DB холболт бодитоор ажиллаж байгаа эсэхийг шалгах хамгийн хямд арга. */
  async healthDb() {
    const start = Date.now();
    await this.prisma.$queryRaw`SELECT 1`;
    return { ok: true, latencyMs: Date.now() - start };
  }

  /** Root Dashboard-ийн "Орлого" карт — бүх SUCCESS Payment-ийн нийлбэр (₮). */
  async revenue() {
    const rows = await this.prisma.payment.findMany({ where: { status: 'SUCCESS' }, select: { amount: true } });
    const total = rows.reduce((sum, r) => sum + parsePlainAmount(r.amount), 0);
    return { total, count: rows.length };
  }

  /** ROOT/ADMIN-д зориулсан бүх хэрэглэгчийн төлбөрийн түүх (Root Panel → «Төлбөр»). */
  async listAllPayments() {
    return this.prisma.payment.findMany({
      orderBy: { createdAt: 'desc' },
      take: 200,
      include: { user: { select: { id: true, name: true, email: true } } },
    });
  }

  /** RootStorage дэлгэц — MinIO bucket дотор бодитоор хадгалагдаж буй хэмжээ/файлын
   *  тоо, мөн DB дэх Song бичлэгүүдтэй харьцуулсан "өнчин" (orphan) объектын тоо. */
  async storageUsage() {
    const objects = await this.storage.listAllKeys();
    const totalBytes = objects.reduce((sum, o) => sum + o.size, 0);
    const byPrefix = objects.reduce<Record<string, { count: number; bytes: number }>>((acc, o) => {
      const prefix = o.key.split('/')[0] ?? 'other';
      acc[prefix] ??= { count: 0, bytes: 0 };
      acc[prefix].count += 1;
      acc[prefix].bytes += o.size;
      return acc;
    }, {});

    const songs = await this.prisma.song.findMany({ select: { fileUrl: true, coverUrl: true } });
    const referencedKeys = new Set<string>();
    for (const s of songs) {
      const k1 = this.storage.keyFromUrl(s.fileUrl);
      if (k1) referencedKeys.add(k1);
      if (s.coverUrl) {
        const k2 = this.storage.keyFromUrl(s.coverUrl);
        if (k2) referencedKeys.add(k2);
      }
    }
    const orphanObjects = objects.filter((o) => !referencedKeys.has(o.key) && !o.key.startsWith('scores/'));

    return {
      totalObjects: objects.length,
      totalBytes,
      byPrefix,
      orphanCount: orphanObjects.length,
      orphanBytes: orphanObjects.reduce((sum, o) => sum + o.size, 0),
    };
  }

  /** RootSecurity дэлгэц — "Blocked IP · Failed Login" хэсэгт бодит өгөгдөл өгнө.
   *  "Blocked" гэдгийг Throttler-ийн адил цонхоор (сүүлийн 60 сек) тодорхойлно —
   *  нэвтрэлтийн `Throttle({ limit: 5, ttl: 60000 })`-той нийцтэй босго (>=5 амжилтгүй
   *  оролдлого/IP = throttled гэсэн үг), гэхдээ IP-ийн ТҮҮХЭН бүртгэлийг харуулна
   *  (Throttler өөрөө зөвхөн идэвхтэй цонхыг санадаг, dashboard-д харуулах боломжгүй). */
  async securityOverview() {
    const windowStart = new Date(Date.now() - 60 * 60 * 1000); // сүүлийн 1 цаг
    const recentFailed = await this.prisma.loginAttempt.findMany({
      where: { success: false, createdAt: { gte: windowStart }, ip: { not: null } },
      select: { ip: true, email: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      take: 500,
    });

    const byIp = new Map<string, { count: number; emails: Set<string>; lastAt: Date }>();
    for (const a of recentFailed) {
      const ip = a.ip as string;
      const entry = byIp.get(ip) ?? { count: 0, emails: new Set<string>(), lastAt: a.createdAt };
      entry.count += 1;
      entry.emails.add(a.email);
      if (a.createdAt > entry.lastAt) entry.lastAt = a.createdAt;
      byIp.set(ip, entry);
    }

    const blockedIps = [...byIp.entries()]
      .filter(([, v]) => v.count >= 5) // AuthController-ийн Throttle({ limit: 5, ttl: 60000 })-той нийцтэй босго
      .map(([ip, v]) => ({ ip, failedCount: v.count, distinctEmails: v.emails.size, lastAttemptAt: v.lastAt }))
      .sort((a, b) => b.failedCount - a.failedCount);

    const recentFailedLogins = await this.prisma.loginAttempt.findMany({
      where: { success: false },
      orderBy: { createdAt: 'desc' },
      take: 50,
      select: { id: true, email: true, ip: true, userAgent: true, createdAt: true },
    });

    return { blockedIps, recentFailedLogins, windowMinutes: 60 };
  }

  /** Song устсан ч MinIO-д үлдсэн файлыг цэвэрлэнэ (`Song`-той холбоогүй объект).
   *  `scores/` (Haptic Score JSON) файлыг оролцуулахгүй — Song.scoreUrl нь local
   *  `/uploads/scores/`-д хадгалагддаг тул S3 key намайг таарахгүй, алдаатай устгахаас сэргийлнэ. */
  async cleanupOrphanFiles(): Promise<{ deleted: number; bytesFreed: number }> {
    const objects = await this.storage.listAllKeys();
    const songs = await this.prisma.song.findMany({ select: { fileUrl: true, coverUrl: true } });
    const referencedKeys = new Set<string>();
    for (const s of songs) {
      const k1 = this.storage.keyFromUrl(s.fileUrl);
      if (k1) referencedKeys.add(k1);
      if (s.coverUrl) {
        const k2 = this.storage.keyFromUrl(s.coverUrl);
        if (k2) referencedKeys.add(k2);
      }
    }

    const orphans = objects.filter((o) => !referencedKeys.has(o.key) && !o.key.startsWith('scores/'));
    let bytesFreed = 0;
    for (const o of orphans) {
      try {
        await this.storage.delete(o.key);
        bytesFreed += o.size;
      } catch (err) {
        this.logger.warn(`Өнчин файл устгахад алдаа (${o.key}): ${(err as Error).message}`);
      }
    }
    return { deleted: orphans.length, bytesFreed };
  }
}

/* "9'900₮" маягийн харуулах мөрнөөс тоог гаргаж авна (₮/'/зай устгаад parse хийнэ).
   Мөнгөн дүн ЦОРЫН ГАНЦ энэ мөрөнд л хадгалагддаг (Payment.amount нь string) тул
   тооцоолол хийхэд энд нэг удаа задлана — currency форматлагч биш, зөвхөн aggregate. */
function parsePlainAmount(raw: string): number {
  const digits = raw.replace(/[^\d]/g, '');
  return digits ? Number(digits) : 0;
}
