import { BadRequestException, ConflictException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomBytes, createHash } from 'crypto';
import { OAuth2Client } from 'google-auth-library';
import { Role, UserStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterParentDto } from './dto/register-parent.dto';
import { decryptField } from '../common/crypto/field-encryption';

const REFRESH_TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const BCRYPT_ROUNDS = 10;

function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex');
}

function toSession(
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatarColor: string | null;
    hearingProfile: string | null;
    subActive: boolean;
    subPlan: string | null;
    subSince: Date | null;
    subRenews: Date | null;
  },
  hearingProfileKey: string,
) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatarColor: user.avatarColor,
    hearingProfile: user.hearingProfile ? decryptField(user.hearingProfile, hearingProfileKey) : null,
    sub: user.subActive
      ? {
          active: user.subActive,
          plan: user.subPlan,
          since: user.subSince,
          renews: user.subRenews,
        }
      : null,
  };
}

@Injectable()
export class AuthService {
  private readonly googleClient: OAuth2Client;

  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {
    this.googleClient = new OAuth2Client(this.config.get<string>('GOOGLE_CLIENT_ID'));
  }

  private toSessionUser(user: Parameters<typeof toSession>[0]) {
    const key = this.config.get<string>('HEARING_PROFILE_ENC_KEY') || 'dev-only-insecure-hearing-key';
    return toSession(user, key);
  }

  private signAccessToken(user: { id: string; email: string; role: string }) {
    return this.jwt.sign(
      { sub: user.id, email: user.email, role: user.role },
      { secret: this.config.getOrThrow<string>('JWT_ACCESS_SECRET'), expiresIn: '15m' },
    );
  }

  private async issueRefreshToken(userId: string) {
    const token = randomBytes(64).toString('hex');
    await this.prisma.refreshToken.create({
      data: {
        tokenHash: hashToken(token),
        userId,
        expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
      },
    });
    return token;
  }

  async register(dto: RegisterDto) {
    if (dto.password !== dto.password2) {
      throw new ConflictException('Нууц үг таарахгүй байна');
    }
    const email = dto.email.trim().toLowerCase();
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new ConflictException('Энэ имэйл бүртгэлтэй байна');
    }

    const passwordHash = await bcrypt.hash(dto.password, BCRYPT_ROUNDS);
    const user = await this.prisma.user.create({
      data: { name: dto.name.trim(), email, passwordHash },
    });

    const accessToken = this.signAccessToken(user);
    const refreshToken = await this.issueRefreshToken(user.id);
    return { accessToken, refreshToken, user: this.toSessionUser(user) };
  }

  /* PARENT бүртгэл — childEmail-ээр одоо байгаа USER-тэй нэн даруй ParentLink үүсгэнэ (approval алхамгүй, диплом хэмжээнд хангалттай). */
  async registerParent(dto: RegisterParentDto) {
    if (dto.password !== dto.password2) {
      throw new ConflictException('Нууц үг таарахгүй байна');
    }
    const email = dto.email.trim().toLowerCase();
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) throw new ConflictException('Энэ имэйл бүртгэлтэй байна');

    const childEmail = dto.childEmail.trim().toLowerCase();
    const child = await this.prisma.user.findUnique({ where: { email: childEmail } });
    if (!child || child.role !== Role.USER) {
      throw new BadRequestException('Хүүхдийн имэйл хаяг олдсонгүй');
    }

    const passwordHash = await bcrypt.hash(dto.password, BCRYPT_ROUNDS);
    const user = await this.prisma.user.create({
      data: { name: dto.name.trim(), email, passwordHash, role: Role.PARENT },
    });
    await this.prisma.parentLink.create({ data: { parentId: user.id, childUserId: child.id } });

    const accessToken = this.signAccessToken(user);
    const refreshToken = await this.issueRefreshToken(user.id);
    return { accessToken, refreshToken, user: this.toSessionUser(user) };
  }

  async login(dto: LoginDto) {
    const email = dto.email.trim().toLowerCase();
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) throw new UnauthorizedException('Имэйл эсвэл нууц үг буруу байна');

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Имэйл эсвэл нууц үг буруу байна');

    /* Түдгэлзүүлсэн (BANNED) хэрэглэгч ШИНЭ session нээж чадахгүй — нууц үг зөв ч гэсэн.
       JwtStrategy.validate() нь ОДОО БАЙГАА access token-ыг дараагийн хүсэлт бүрт шалгадаг,
       харин энд шинэ токен олгохоос ӨМНӨ шалгах шаардлагатай (эс бол suspend хийхээс
       өмнө нэвтэрч байгаагүй хэрэглэгч ч суспенд байхдаа шинэ session нээх боломжтой болно). */
    if (user.status === UserStatus.BANNED) {
      throw new ForbiddenException('Таны бүртгэл түдгэлзүүлэгдсэн байна');
    }

    /* Root Panel-ийн "Сүүлд нэвтэрсэн" багана — зөвхөн энд, амжилттай нэвтэрсэн
       мөчид л шинэчилнэ (register/refresh биш, жинхэнэ login үйлдэл). */
    await this.prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });

    const accessToken = this.signAccessToken(user);
    const refreshToken = await this.issueRefreshToken(user.id);
    return { accessToken, refreshToken, user: this.toSessionUser(user) };
  }

  /* Google "Sign in with Google" (Google Identity Services) — frontend-ээс ирэх ID
     token-ыг Google-ийн өөрийнх нь public key-ээр баталгаажуулна (аудиенс =
     GOOGLE_CLIENT_ID таарсан эсэхийг мөн шалгана). Имэйлээр одоо байгаа хэрэглэгч
     олдвол googleId-г холбож нэвтрүүлнэ (нууц үгээр бүртгүүлсэн хэрэглэгч Google-ээр
     ч нэвтрэх боломжтой болно), олдохгүй бол USER эрхээр шинээр бүртгэнэ. */
  async loginWithGoogle(idToken: string) {
    const clientId = this.config.get<string>('GOOGLE_CLIENT_ID');
    if (!clientId) throw new BadRequestException('Google нэвтрэлт тохируулагдаагүй байна');

    let payload;
    try {
      const ticket = await this.googleClient.verifyIdToken({ idToken, audience: clientId });
      payload = ticket.getPayload();
    } catch {
      throw new UnauthorizedException('Google токен хүчингүй байна');
    }
    if (!payload?.email || !payload.sub) {
      throw new UnauthorizedException('Google токен хүчингүй байна');
    }
    if (!payload.email_verified) {
      throw new UnauthorizedException('Google имэйл баталгаажаагүй байна');
    }

    const email = payload.email.trim().toLowerCase();
    const googleId = payload.sub;

    let user = await this.prisma.user.findUnique({ where: { googleId } });
    if (!user) {
      user = await this.prisma.user.findUnique({ where: { email } });
      if (user) {
        user = await this.prisma.user.update({ where: { id: user.id }, data: { googleId } });
      } else {
        user = await this.prisma.user.create({
          data: { name: payload.name || email.split('@')[0], email, googleId },
        });
      }
    }

    if (user.status === UserStatus.BANNED) {
      throw new ForbiddenException('Таны бүртгэл түдгэлзүүлэгдсэн байна');
    }

    await this.prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });

    const accessToken = this.signAccessToken(user);
    const refreshToken = await this.issueRefreshToken(user.id);
    return { accessToken, refreshToken, user: this.toSessionUser(user) };
  }

  async refresh(refreshToken: string | undefined) {
    if (!refreshToken) throw new UnauthorizedException('No refresh token');

    const tokenHash = hashToken(refreshToken);
    const stored = await this.prisma.refreshToken.findUnique({ where: { tokenHash } });
    if (!stored || stored.revoked || stored.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.prisma.user.findUnique({ where: { id: stored.userId } });
    if (!user) throw new UnauthorizedException('Invalid refresh token');

    // rotate: revoke old, issue new
    await this.prisma.refreshToken.update({ where: { id: stored.id }, data: { revoked: true } });
    const accessToken = this.signAccessToken(user);
    const newRefreshToken = await this.issueRefreshToken(user.id);

    return { accessToken, refreshToken: newRefreshToken, user: this.toSessionUser(user) };
  }

  async logout(refreshToken: string | undefined) {
    if (!refreshToken) return;
    const tokenHash = hashToken(refreshToken);
    await this.prisma.refreshToken.updateMany({ where: { tokenHash }, data: { revoked: true } });
  }

  async me(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException();
    return this.toSessionUser(user);
  }
}
