import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProgressDto, CreateTherapySessionDto, UpdateTherapySessionDto } from './dto/therapy.dto';

@Injectable()
export class TherapyService {
  constructor(private prisma: PrismaService) {}

  /* Therapist зөвхөн өөрт assign хийсэн patient-руу үйлдэл хийж болно (ADMIN бол хязгааргүй). */
  private async assertTherapistOwnsPatient(therapistId: string, userId: string, requesterRole: Role) {
    if (requesterRole === Role.ADMIN) return;
    const link = await this.prisma.therapistAssignment.findUnique({
      where: { therapistId_userId: { therapistId, userId } },
    });
    if (!link) throw new ForbiddenException('Энэ хэрэглэгчид эмчилгээ томилох эрхгүй');
  }

  /* Parent зөвхөн өөрийн холбогдсон хүүхдийн мэдээллийг ЛЭВГ уншиж болно — ADMIN/эзэмшигч THERAPIST-ийн эрх мөн зөвшөөрнө. */
  private async assertCanReadUser(requester: { userId: string; role: Role }, targetUserId: string) {
    if (requester.role === Role.ADMIN) return;
    if (requester.role === Role.USER) {
      if (requester.userId !== targetUserId) throw new ForbiddenException('Зөвхөн өөрийн мэдээллийг харах эрхтэй');
      return;
    }
    if (requester.role === Role.THERAPIST) {
      const link = await this.prisma.therapistAssignment.findUnique({
        where: { therapistId_userId: { therapistId: requester.userId, userId: targetUserId } },
      });
      if (!link) throw new ForbiddenException('Энэ хэрэглэгчийн мэдээлэлд хандах эрхгүй');
      return;
    }
    if (requester.role === Role.PARENT) {
      const link = await this.prisma.parentLink.findUnique({
        where: { parentId_childUserId: { parentId: requester.userId, childUserId: targetUserId } },
      });
      if (!link) throw new ForbiddenException('Энэ хэрэглэгчийн мэдээлэлд хандах эрхгүй');
      return;
    }
    throw new ForbiddenException('Хандах эрхгүй');
  }

  // ---- TherapySession ----
  async createSession(therapistId: string, requesterRole: Role, dto: CreateTherapySessionDto) {
    await this.assertTherapistOwnsPatient(therapistId, dto.userId, requesterRole);
    return this.prisma.therapySession.create({
      data: {
        therapistId,
        userId: dto.userId,
        songId: dto.songId,
        notes: dto.notes,
        scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : undefined,
      },
    });
  }

  async listSessions(requester: { userId: string; role: Role }, userId?: string) {
    if (requester.role === Role.ADMIN) {
      return this.prisma.therapySession.findMany({ where: userId ? { userId } : undefined, orderBy: { createdAt: 'desc' } });
    }
    if (requester.role === Role.THERAPIST) {
      return this.prisma.therapySession.findMany({
        where: { therapistId: requester.userId, ...(userId ? { userId } : {}) },
        orderBy: { createdAt: 'desc' },
      });
    }
    if (requester.role === Role.USER) {
      return this.prisma.therapySession.findMany({ where: { userId: requester.userId }, orderBy: { createdAt: 'desc' } });
    }
    // PARENT — заавал child-ийн id өгөх ёстой, эрхийг шалгана
    if (!userId) throw new ForbiddenException('userId заавал шаардлагатай');
    await this.assertCanReadUser(requester, userId);
    return this.prisma.therapySession.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  }

  async updateSession(id: string, requesterId: string, requesterRole: Role, dto: UpdateTherapySessionDto) {
    const session = await this.prisma.therapySession.findUnique({ where: { id } });
    if (!session) throw new NotFoundException('Сесс олдсонгүй');
    if (requesterRole !== Role.ADMIN && session.therapistId !== requesterId) {
      throw new ForbiddenException('Энэ сессийг засах эрхгүй');
    }
    return this.prisma.therapySession.update({
      where: { id },
      data: {
        notes: dto.notes,
        status: dto.status,
        scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : undefined,
        completedAt: dto.completedAt ? new Date(dto.completedAt) : undefined,
      },
    });
  }

  // ---- Progress ----
  async createProgress(requesterId: string, requesterRole: Role, dto: CreateProgressDto) {
    await this.assertTherapistOwnsPatient(requesterId, dto.userId, requesterRole);
    return this.prisma.progress.create({
      data: {
        userId: dto.userId,
        therapySessionId: dto.therapySessionId,
        completionPct: dto.completionPct,
        engagementScore: dto.engagementScore,
      },
    });
  }

  async listProgress(requester: { userId: string; role: Role }, userId?: string) {
    if (requester.role === Role.USER) {
      return this.prisma.progress.findMany({ where: { userId: requester.userId }, orderBy: { recordedAt: 'desc' } });
    }
    if (!userId) throw new ForbiddenException('userId заавал шаардлагатай');
    await this.assertCanReadUser(requester, userId);
    return this.prisma.progress.findMany({ where: { userId }, orderBy: { recordedAt: 'desc' } });
  }
}
