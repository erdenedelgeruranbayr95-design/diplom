import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { Role, UserStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { encryptField, decryptField } from '../common/crypto/field-encryption';
import { StripeSubscriptionsService } from '../payments/stripe-subscriptions.service';

const BCRYPT_ROUNDS = 10;
const DEFAULT_PLAN = 'МЭДРЭХ PRO';

type SubscriptionFields = { subActive: boolean; subPlan: string | null; subSince: Date | null; subRenews: Date | null };

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private stripeSubs: StripeSubscriptionsService,
  ) {}

  /* `hearingProfile` DB-д ТОДООР хадгалагдахгүй (эмнэлгийн шинж чанартай эмзэг
     мэдээлэл, см. Нууцлалын бодлого §2). HEARING_PROFILE_ENC_KEY тохируулаагүй
     локал/CI орчинд dev-fallback түлхүүрээр ажиллана — production-д ЗААВАЛ
     тохируулагдсан байх ёстой (см. .env.example). */
  private encryptHearingProfile(value: string): string {
    const key = this.config.get<string>('HEARING_PROFILE_ENC_KEY') || 'dev-only-insecure-hearing-key';
    return encryptField(value, key);
  }

  private decryptHearingProfile(value: string | null): string | null {
    if (!value) return value;
    const key = this.config.get<string>('HEARING_PROFILE_ENC_KEY') || 'dev-only-insecure-hearing-key';
    return decryptField(value, key);
  }

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
        lastLoginAt: true,
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

  /* ---------- ROOT: дүр/төлөв/эрх удирдлага ---------- */

  /* ROOT-only. `Role.ROOT`-руу зориудаар оруулаагүй — систем эзэмшигчийн эрхийг
     endpoint-ээр биш, зөвхөн DB seed/гараар олгоно (аюулгүй байдлын хувьд). */
  async updateRole(id: string, requesterId: string, dto: UpdateRoleDto) {
    if (id === requesterId) throw new BadRequestException('Та өөрийн дүрээ солих боломжгүй');
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Хэрэглэгч олдсонгүй');
    if (user.role === Role.ROOT) throw new BadRequestException('ROOT дүрийг солих боломжгүй');
    return this.prisma.user.update({ where: { id }, data: { role: dto.role }, select: { id: true, name: true, email: true, role: true } });
  }

  /* SUSPEND (BANNED) үед идэвхтэй бүх refresh token-ыг цуцлана — дараагийн /auth/refresh
     амжилтгүй болно, одоо байгаа access token дуусах хүртэл (≤15 мин) 401 биш харин
     JwtStrategy.validate() дотор шууд шалгагдаад 401 буцна (доор харна уу). */
  async updateStatus(id: string, requesterId: string, dto: UpdateStatusDto) {
    if (id === requesterId) throw new BadRequestException('Та өөрийн төлөвөө солих боломжгүй');
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Хэрэглэгч олдсонгүй');
    if (user.role === Role.ROOT) throw new BadRequestException('ROOT хэрэглэгчийг түдгэлзүүлэх боломжгүй');

    const [updated] = await this.prisma.$transaction([
      this.prisma.user.update({ where: { id }, data: { status: dto.status }, select: { id: true, name: true, email: true, status: true } }),
      this.prisma.refreshToken.updateMany({ where: { userId: id, revoked: false }, data: { revoked: true } }),
    ]);
    return updated;
  }

  /* Түр нууц үг үүсгэж буцаана (ROOT/ADMIN дэлгэцэнд харуулна, имэйлээр илгээх
     сервис одоогоор байхгүй тул). Идэвхтэй бүх session-ийг цуцалж, шинэ нууц үгээр
     дахин нэвтрэхийг албадана. */
  async resetPassword(id: string, requesterId: string) {
    if (id === requesterId) throw new BadRequestException('Өөрийн нууц үгээ энэ аргаар сэргээх боломжгүй — Тохиргоо хэсгээс солино уу');
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Хэрэглэгч олдсонгүй');

    const tempPassword = randomBytes(6).toString('base64url');
    const passwordHash = await bcrypt.hash(tempPassword, BCRYPT_ROUNDS);
    await this.prisma.$transaction([
      this.prisma.user.update({ where: { id }, data: { passwordHash } }),
      this.prisma.refreshToken.updateMany({ where: { userId: id, revoked: false }, data: { revoked: true } }),
    ]);
    return { tempPassword };
  }

  /* ---------- Session удирдлага (force logout) ---------- */

  async listSessions(id: string) {
    return this.prisma.refreshToken.findMany({
      where: { userId: id, revoked: false, expiresAt: { gt: new Date() } },
      select: { id: true, createdAt: true, expiresAt: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async revokeSessions(id: string) {
    await this.prisma.refreshToken.updateMany({ where: { userId: id, revoked: false }, data: { revoked: true } });
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
        hearingProfile:
          dto.hearingProfile === '' ? null : dto.hearingProfile !== undefined ? this.encryptHearingProfile(dto.hearingProfile) : undefined,
      },
    });
    return this.toProfileDto(user);
  }

  /* Нууц үг солих — одоогийн нууц үгийг bcrypt-ээр баталгаажуулж байж солино.
     Солигдмогц БҮХ refresh token-ыг хүчингүй болгоно (бусад төхөөрөмжөөс гаргана). */
  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Хэрэглэгч олдсонгүй');
    /* Google-ээр бүртгэгдсэн хэрэглэгч нууц үггүй тул энэ урсгал огт хамаарахгүй —
       тэдэнд харуулах шаардлагатай бол frontend "нууц үг тохируулах" эсвэл
       "Google-ээр нэвтэрсэн" гэсэн тусдаа мессежийг Settings-д харуулах хэрэгтэй. */
    if (!user.passwordHash) {
      throw new BadRequestException('Энэ бүртгэл Google-ээр нэвтэрдэг тул нууц үггүй');
    }

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
    const [user] = await this.prisma.$transaction([
      this.prisma.user.update({ where: { id: userId }, data: this.activeSubscriptionData(plan) }),
      this.prisma.subscription.upsert({
        where: { userId },
        create: { userId, provider: 'socialpay-demo', ...this.activeSubscriptionFields(plan) },
        update: { provider: 'socialpay-demo', ...this.activeSubscriptionFields(plan) },
      }),
      this.prisma.payment.create({
        data: { userId, amount: '9’900₮', method: 'SocialPay (demo)', plan, status: 'SUCCESS' },
      }),
    ]);
    return this.toSubDto(user);
  }

  /* ⚠️ DB-г өөрчлөхөөс ӨМНӨ Stripe дээрх recurring захиалгыг зогсооно. Үүнгүй бол
     хэрэглэгч апп дээр "цуцаллаа" гэж харах ч Stripe САР БҮР мөнгө авсаар байна.

     Stripe дээр `cancel_at_period_end` тавина (төлсөн саруудаа эцэс хүртэл
     ашиглана), гэвч DB-д ШУУД идэвхгүй болгоно — хэрэглэгч товч дарахад үр дүнг
     нь тэр дороо харах ёстой. Stripe-ийн `customer.subscription.deleted` webhook
     мөчлөгийн эцэст ирж, хоёр тал эцсийн байдлаар таарна.

     Stripe дуудлага бүтэлгүйтсэн ч (сүлжээ, түлхүүр дутуу, гараар устгасан)
     DB талын цуцлалт ҮРГЭЛЖИЛНЭ — хэрэглэгчийг "цуцлаж чадахгүй" болгож
     хоригловол илүү муу. */
  async cancelSubscription(userId: string) {
    await this.stripeSubs.cancelAtStripe(userId);

    const [user] = await this.prisma.$transaction([
      this.prisma.user.update({ where: { id: userId }, data: { subActive: false } }),
      this.prisma.subscription.updateMany({ where: { userId }, data: { status: 'CANCELED' } }),
    ]);
    return this.toSubDto(user);
  }

  /* Админ өөр хэрэглэгчийн PRO эрхийг удирдана. Урьд нь энэ нь frontend-ийн
     `admin-sub-overrides.ts` localStorage давхарга байсан тул хэрэглэгч рүү хүрдэггүй байв. */
  async setSubscriptionFor(targetUserId: string, active: boolean, plan?: string) {
    const target = await this.prisma.user.findUnique({ where: { id: targetUserId } });
    if (!target) throw new NotFoundException('Хэрэглэгч олдсонгүй');

    const resolvedPlan = plan || DEFAULT_PLAN;
    const [user] = await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: targetUserId },
        data: active ? this.activeSubscriptionData(resolvedPlan) : { subActive: false },
      }),
      active
        ? this.prisma.subscription.upsert({
            where: { userId: targetUserId },
            create: { userId: targetUserId, provider: 'admin-grant', ...this.activeSubscriptionFields(resolvedPlan) },
            update: { provider: 'admin-grant', ...this.activeSubscriptionFields(resolvedPlan) },
          })
        : this.prisma.subscription.updateMany({ where: { userId: targetUserId }, data: { status: 'CANCELED' } }),
    ]);
    return this.toSubDto(user);
  }

  private activeSubscriptionData(plan: string) {
    const now = new Date();
    const renews = new Date(now);
    renews.setMonth(renews.getMonth() + 1);
    return { subActive: true, subPlan: plan, subSince: now, subRenews: renews };
  }

  private activeSubscriptionFields(plan: string) {
    const now = new Date();
    const renews = new Date(now);
    renews.setMonth(renews.getMonth() + 1);
    return { status: 'ACTIVE' as const, renewsAt: renews, plan };
  }

  private toSubDto(user: SubscriptionFields) {
    return user.subActive
      ? { active: user.subActive, plan: user.subPlan, since: user.subSince, renews: user.subRenews }
      : null;
  }

  /* ---------- GDPR: өөрийн мэдээлэл татах / бүртгэл устгах ---------- */

  /* Self-service "миний бүх мэдээллийг татах" — Нууцлалын бодлого §5-д амласан
     эрх. Хэрэглэгчтэй холбоотой БҮХ хүснэгтийг JSON болгож буцаана (passwordHash
     эс тооцвол — нууц үгийн hash-ийг ч гэсэн дамжуулах шаардлагагүй). */
  async exportMyData(userId: string) {
    const [user, payments, subscription, listenHistory, trackActions, playlists, progress, therapySessions, qrSessions] =
      await this.prisma.$transaction([
        this.prisma.user.findUnique({
          where: { id: userId },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
            createdAt: true,
            lastLoginAt: true,
            avatarColor: true,
            hearingProfile: true,
            subActive: true,
            subPlan: true,
            subSince: true,
            subRenews: true,
          },
        }),
        this.prisma.payment.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } }),
        this.prisma.subscription.findUnique({ where: { userId } }),
        this.prisma.listenHistory.findMany({ where: { userId }, orderBy: { playedAt: 'desc' } }),
        this.prisma.userTrackAction.findMany({ where: { userId } }),
        this.prisma.playlist.findMany({ where: { userId }, include: { tracks: true } }),
        this.prisma.progress.findMany({ where: { userId } }),
        this.prisma.therapySession.findMany({ where: { OR: [{ userId }, { therapistId: userId }] } }),
        this.prisma.qRSession.findMany({ where: { userId } }),
      ]);
    if (!user) throw new NotFoundException('Хэрэглэгч олдсонгүй');

    return {
      exportedAt: new Date().toISOString(),
      profile: { ...user, hearingProfile: this.decryptHearingProfile(user.hearingProfile) },
      subscription,
      payments,
      listenHistory,
      trackActions,
      playlists,
      progress,
      therapySessions,
      qrSessions,
    };
  }

  /* Self-service "бүртгэл устгах" — нууц үгээр баталгаажуулна (жинхэнэ эзэн
     хүсэлт гаргаж буйг батлах хамгийн бага дархлаа). User мөр устахад Prisma
     schema-ийн `onDelete: Cascade` холбоос бүхий бүх хүснэгт (Payment, Subscription,
     ListenHistory, Playlist, Progress гм) автоматаар цэвэрлэгдэнэ. */
  async deleteMyAccount(userId: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Хэрэглэгч олдсонгүй');

    /* Google-ээр бүртгэгдсэн хэрэглэгч нууц үггүй тул JWT session өөрөө хангалттай
       баталгаа (тухайн хэрэглэгч нэвтэрсэн үедээ л энэ endpoint-д хүрнэ). */
    if (user.passwordHash) {
      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) throw new UnauthorizedException('Нууц үг буруу байна');
    }

    /* Уран бүтээлчийн профайл нь `onDelete: SetNull` тул хэрэглэгч устахад
       ӨӨРӨӨ үлдэнэ. Энэ нь дуутай профайлд ЗӨВ — эс бөгөөс нийтлэгдсэн дуунууд
       дуучингүй болж каталог эвдэрнэ. Харин ХООСОН профайл (дуу, цомоггүй) нь
       нийтийн `GET /artists` жагсаалтад эзэнгүй сүүдэр мөр болж үүрд үлдэх тул
       хамт устгана.

       Хэрэглэгчийг устгахаас ӨМНӨ шалгана: дараа нь `ownerId` нь NULL болсон
       байх тул аль профайл түүнийх байсныг олох боломжгүй. */
    const profile = await this.prisma.artist.findUnique({
      where: { ownerId: userId },
      select: { id: true, _count: { select: { songs: true, albums: true } } },
    });
    const emptyProfile = profile && profile._count.songs === 0 && profile._count.albums === 0;

    await this.prisma.$transaction([
      ...(emptyProfile ? [this.prisma.artist.delete({ where: { id: profile.id } })] : []),
      this.prisma.user.delete({ where: { id: userId } }),
    ]);
    return { ok: true };
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
      hearingProfile: this.decryptHearingProfile(user.hearingProfile),
    };
  }
}
