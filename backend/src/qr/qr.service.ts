import { Injectable, NotFoundException } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { QRStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

const QR_TTL_MS = 5 * 60 * 1000; // 5 минут

@Injectable()
export class QrService {
  constructor(private prisma: PrismaService) {}

  create(userId: string) {
    const token = randomBytes(24).toString('hex');
    return this.prisma.qRSession.create({
      data: { token, userId, expiresAt: new Date(Date.now() + QR_TTL_MS) },
    });
  }

  async get(token: string) {
    const session = await this.prisma.qRSession.findUnique({ where: { token } });
    if (!session) throw new NotFoundException('QR сесс олдсонгүй');
    if (session.status === QRStatus.PENDING && session.expiresAt < new Date()) {
      return this.prisma.qRSession.update({ where: { token }, data: { status: QRStatus.EXPIRED } });
    }
    return session;
  }

  async connect(token: string) {
    const session = await this.get(token);
    if (session.status !== QRStatus.PENDING) throw new NotFoundException('QR сесс идэвхгүй байна');
    return this.prisma.qRSession.update({ where: { token }, data: { status: QRStatus.CONNECTED } });
  }
}
