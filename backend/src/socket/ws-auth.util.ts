import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import type { Socket } from 'socket.io';
import type { AuthUser } from '../common/decorators/current-user.decorator';

interface JwtPayload {
  sub: string;
  email: string;
  role: Role;
}

/* Desktop-ийн socket холболтыг JwtStrategy-тэй яг ижил secret/payload хэлбэрээр баталгаажуулна —
   Nest-ийн HTTP Passport guard WS handshake дээр автоматаар ажилладаггүй тул гараар шалгана. */
export async function verifyDesktopAuth(client: Socket, jwt: JwtService, config: ConfigService): Promise<AuthUser | null> {
  const token = client.handshake.auth?.token as string | undefined;
  if (!token) return null;
  try {
    const payload = await jwt.verifyAsync<JwtPayload>(token, { secret: config.getOrThrow<string>('JWT_ACCESS_SECRET') });
    return { userId: payload.sub, email: payload.email, role: payload.role };
  } catch {
    return null;
  }
}
