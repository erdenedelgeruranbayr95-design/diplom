import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Role, UserStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthUser } from '../../common/decorators/current-user.decorator';

interface JwtPayload {
  sub: string;
  email: string;
  role: Role;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getOrThrow<string>('JWT_ACCESS_SECRET'),
    });
  }

  /* ROOT-оор SUSPEND хийсэн хэрэглэгч дараагийн ХҮСЭЛТ бүрт (одоо байгаа access token
     дуусах ≤15 минутыг хүлээхгүйгээр) шууд 401 авах ёстой тул request бүрт DB-ээс
     status шалгана. Энэ бол зөвхөн боломжтой мэдээллийг дахин баталгаажуулах — токены
     үндсэн шалгалт (гарын үсэг/хугацаа) passport-jwt-ийн стандарт урсгалд хэвээр. */
  async validate(payload: JwtPayload): Promise<AuthUser> {
    const user = await this.prisma.user.findUnique({ where: { id: payload.sub }, select: { status: true } });
    if (!user || user.status === UserStatus.BANNED) {
      throw new UnauthorizedException('Таны бүртгэл түдгэлзүүлэгдсэн байна');
    }
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
