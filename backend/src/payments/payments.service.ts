import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentWebhookDto } from './dto/payment-webhook.dto';

const DEFAULT_PLAN = 'МЭДРЭХ PRO';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(private prisma: PrismaService) {}

  /* QPay/SocialPay-ийн webhook callback. Provider webhook-ийг ХЭДЭН Ч удаа дахин
     илгээж болно (сүлжээний алдаа, timeout гм) тул `providerRef`-ээр idempotency
     шалгана — ижил гүйлгээг 2 дахь удаа хүлээж авбал зөвхөн одоо байгаа Payment-ийг
     буцаана, шинээр PRO эрх/төлбөр давхардуулж бичихгүй.

     `findFirst` шалгалт дангаараа TOCTOU race-тэй (2 webhook НЭГЭН ЗЭРЭГ ирвэл
     хоёулаа "давхардаагүй" гэж үзэж болно) тул `Payment.providerRef`-д DB түвшний
     `@@unique` constraint нэмсэн (см. schema.prisma) — race үүсвэл хоёр дахь
     transaction unique violation (P2002)-оор бүтэлгүйтнэ, бид үүнийг барьж
     "duplicate" гэсэн хэвийн хариу болгон буцаана (webhook sender рүү 500 биш). */
  async handleWebhook(dto: PaymentWebhookDto) {
    const user = await this.prisma.user.findUnique({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException('Хэрэглэгч олдсонгүй');

    const existing = await this.prisma.payment.findFirst({ where: { userId: dto.userId, providerRef: dto.providerRef } });
    if (existing) {
      this.logger.warn(`Давхардсан webhook (providerRef=${dto.providerRef}) — алгаслаа`);
      return { ok: true, duplicate: true };
    }

    const plan = dto.plan || DEFAULT_PLAN;

    try {
      if (dto.status === 'FAILED') {
        await this.prisma.payment.create({
          data: { userId: dto.userId, amount: dto.amount || '0', method: dto.provider, providerRef: dto.providerRef, plan, status: 'FAILED' },
        });
        return { ok: true, duplicate: false };
      }

      const now = new Date();
      const renews = new Date(now);
      renews.setMonth(renews.getMonth() + 1);

      await this.prisma.$transaction([
        this.prisma.payment.create({
          data: { userId: dto.userId, amount: dto.amount || '0', method: dto.provider, providerRef: dto.providerRef, plan, status: 'SUCCESS' },
        }),
        this.prisma.subscription.upsert({
          where: { userId: dto.userId },
          create: { userId: dto.userId, provider: dto.provider, providerRef: dto.providerRef, plan, status: 'ACTIVE', renewsAt: renews },
          update: { provider: dto.provider, providerRef: dto.providerRef, plan, status: 'ACTIVE', renewsAt: renews },
        }),
        this.prisma.user.update({
          where: { id: dto.userId },
          data: { subActive: true, subPlan: plan, subSince: now, subRenews: renews },
        }),
      ]);

      return { ok: true, duplicate: false };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
        this.logger.warn(`Concurrent давхардсан webhook (providerRef=${dto.providerRef}) — race дээр илэрсэн`);
        return { ok: true, duplicate: true };
      }
      throw err;
    }
  }
}
