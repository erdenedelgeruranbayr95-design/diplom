import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

const BCRYPT_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /* Admin-аар THERAPIST/ADMIN эрхтэй account үүсгэх — staff бүртгэл нь self-service биш. */
  async create(dto: CreateUserDto) {
    const email = dto.email.trim().toLowerCase();
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) throw new ConflictException('Энэ имэйл бүртгэлтэй байна');

    const passwordHash = await bcrypt.hash(dto.password, BCRYPT_ROUNDS);
    const user = await this.prisma.user.create({
      data: { name: dto.name.trim(), email, passwordHash, role: dto.role },
    });
    return { id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt };
  }

  async list() {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        subActive: true,
        subPlan: true,
      },
    });
    return users;
  }

  async remove(id: string, requesterId: string) {
    if (id === requesterId) {
      throw new BadRequestException('Та өөрийгөө устгах боломжгүй');
    }
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Хэрэглэгч олдсонгүй');
    await this.prisma.user.delete({ where: { id } });
    return { ok: true };
  }

  /* Self-service PRO захиалга (демо SocialPay урсгал) — өөрийн эрхийг бодитоор DB-д
     бичнэ, ингэснээр refresh/дахин нэвтрэх/өөр tab дээр ч PRO эрх хадгалагдана.
     Жинхэнэ төлбөрийн систем (SocialPay/QPay) холбогдоогүй тул зөвхөн энэ endpoint-ыг
     дуудсанаар л идэвхжинэ — бодит бэлэн мөнгөн гүйлгээ шалгахгүй (SubscribeModal.tsx-ийн
     демо тайлбартай нийцтэй). */
  async subscribe(userId: string, plan: string) {
    const now = new Date();
    const renews = new Date(now);
    renews.setMonth(renews.getMonth() + 1);
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { subActive: true, subPlan: plan, subSince: now, subRenews: renews },
    });
    return this.toSubDto(user);
  }

  async cancelSubscription(userId: string) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { subActive: false },
    });
    return this.toSubDto(user);
  }

  private toSubDto(user: { subActive: boolean; subPlan: string | null; subSince: Date | null; subRenews: Date | null }) {
    return user.subActive
      ? { active: user.subActive, plan: user.subPlan, since: user.subSince, renews: user.subRenews }
      : null;
  }
}
