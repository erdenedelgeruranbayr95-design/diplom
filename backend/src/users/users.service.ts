import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

const BCRYPT_ROUNDS = 10;
const DEFAULT_PLAN = 'МЭДРЭХ PRO';

type SubscriptionFields = { subActive: boolean; subPlan: string | null; subSince: Date | null; subRenews: Date | null };

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
    return this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
        subActive: true,
        subPlan: true,
      },
    });
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

  /* ---------- Профайл ----------
     Урьд нь ProfileView нь `lib/auth/auth-storage.ts`-ийн хоосон localStorage сан руу
     бичдэг байсан тул "хадгалагдлаа" гэж хэлээд refresh хийхэд алга болдог байв. */
  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        name: dto.name?.trim(),
        avatarColor: dto.avatarColor,
        /* Хоосон мөр = "хэлэхийг хүсэхгүй байна" → талбарыг цэвэрлэнэ. */
        hearingProfile: dto.hearingProfile === '' ? null : dto.hearingProfile,
      },
    });
    return this.toProfileDto(user);
  }

  /* Нууц үг солих — одоогийн нууц үгийг bcrypt-ээр баталгаажуулж байж солино.
     Солигдмогц БҮХ refresh token-ыг хүчингүй болгоно (бусад төхөөрөмжөөс гаргана). */
  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Хэрэглэгч олдсонгүй');

    const valid = await bcrypt.compare(dto.currentPassword, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Одоогийн нууц үг буруу байна');

    const samePassword = await bcrypt.compare(dto.newPassword, user.passwordHash);
    if (samePassword) throw new BadRequestException('Шинэ нууц үг хуучинтайгаа ижил байна');

    const passwordHash = await bcrypt.hash(dto.newPassword, BCRYPT_ROUNDS);
    await this.prisma.$transaction([
      this.prisma.user.update({ where: { id: userId }, data: { passwordHash } }),
      this.prisma.refreshToken.updateMany({ where: { userId, revoked: false }, data: { revoked: true } }),
    ]);
    return { ok: true };
  }

  /* ---------- Захиалга ---------- */

  /* Self-service PRO захиалга (демо SocialPay урсгал) — өөрийн эрхийг бодитоор DB-д
     бичнэ, ингэснээр refresh/дахин нэвтрэх/өөр tab дээр ч PRO эрх хадгалагдана.
     Жинхэнэ төлбөрийн систем (SocialPay/QPay) холбогдоогүй тул зөвхөн энэ endpoint-ыг
     дуудсанаар л идэвхжинэ — бодит бэлэн мөнгөн гүйлгээ шалгахгүй. */
  async subscribe(userId: string, plan: string) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: this.activeSubscriptionData(plan),
    });
    return this.toSubDto(user);
  }

  async cancelSubscription(userId: string) {
    const user = await this.prisma.user.update({ where: { id: userId }, data: { subActive: false } });
    return this.toSubDto(user);
  }

  /* Админ өөр хэрэглэгчийн PRO эрхийг удирдана. Урьд нь энэ нь frontend-ийн
     `admin-sub-overrides.ts` localStorage давхарга байсан тул хэрэглэгч рүү хүрдэггүй байв. */
  async setSubscriptionFor(targetUserId: string, active: boolean, plan?: string) {
    const target = await this.prisma.user.findUnique({ where: { id: targetUserId } });
    if (!target) throw new NotFoundException('Хэрэглэгч олдсонгүй');

    const user = await this.prisma.user.update({
      where: { id: targetUserId },
      data: active ? this.activeSubscriptionData(plan || DEFAULT_PLAN) : { subActive: false },
    });
    return this.toSubDto(user);
  }

  private activeSubscriptionData(plan: string) {
    const now = new Date();
    const renews = new Date(now);
    renews.setMonth(renews.getMonth() + 1);
    return { subActive: true, subPlan: plan, subSince: now, subRenews: renews };
  }

  private toSubDto(user: SubscriptionFields) {
    return user.subActive
      ? { active: user.subActive, plan: user.subPlan, since: user.subSince, renews: user.subRenews }
      : null;
  }

  private toProfileDto(user: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatarColor: string | null;
    hearingProfile: string | null;
  }) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatarColor: user.avatarColor,
      hearingProfile: user.hearingProfile,
    };
  }
}
