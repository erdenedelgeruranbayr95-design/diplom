import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AssignmentsService {
  constructor(private prisma: PrismaService) {}

  // ---- TherapistAssignment ----
  async createTherapistAssignment(therapistId: string, userId: string) {
    const [therapist, patient] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: therapistId } }),
      this.prisma.user.findUnique({ where: { id: userId } }),
    ]);
    if (!therapist || therapist.role !== Role.THERAPIST) throw new BadRequestException('THERAPIST дүртэй хэрэглэгч олдсонгүй');
    if (!patient || patient.role !== Role.USER) throw new BadRequestException('USER дүртэй хэрэглэгч олдсонгүй');

    const existing = await this.prisma.therapistAssignment.findUnique({
      where: { therapistId_userId: { therapistId, userId } },
    });
    if (existing) throw new ConflictException('Энэ холбоос аль хэдийн байна');

    return this.prisma.therapistAssignment.create({ data: { therapistId, userId } });
  }

  listTherapistAssignments() {
    return this.prisma.therapistAssignment.findMany({
      include: {
        therapist: { select: { id: true, name: true, email: true } },
        patient: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /* Therapist өөрт assign хийсэн patient-уудаа харах — ADMIN-only listTherapistAssignments-ээс ялгаатай,
     therapistId-аар өөрөө хязгаарлагдана. */
  listMyPatients(therapistId: string) {
    return this.prisma.therapistAssignment.findMany({
      where: { therapistId },
      include: {
        patient: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async removeTherapistAssignment(id: string) {
    const row = await this.prisma.therapistAssignment.findUnique({ where: { id } });
    if (!row) throw new NotFoundException('Холбоос олдсонгүй');
    await this.prisma.therapistAssignment.delete({ where: { id } });
    return { ok: true };
  }

  // ---- ParentLink ----
  async createParentLink(parentId: string, childUserId: string) {
    const [parent, child] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: parentId } }),
      this.prisma.user.findUnique({ where: { id: childUserId } }),
    ]);
    if (!parent || parent.role !== Role.PARENT) throw new BadRequestException('PARENT дүртэй хэрэглэгч олдсонгүй');
    if (!child || child.role !== Role.USER) throw new BadRequestException('USER дүртэй хэрэглэгч олдсонгүй');

    const existing = await this.prisma.parentLink.findUnique({
      where: { parentId_childUserId: { parentId, childUserId } },
    });
    if (existing) throw new ConflictException('Энэ холбоос аль хэдийн байна');

    return this.prisma.parentLink.create({ data: { parentId, childUserId } });
  }

  listParentLinks() {
    return this.prisma.parentLink.findMany({
      include: {
        parent: { select: { id: true, name: true, email: true } },
        child: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /* Parent өөрт холбогдсон хүүхдээ харах — ADMIN-only listParentLinks-ээс ялгаатай,
     parentId-аар өөрөө хязгаарлагдана. */
  listMyChildren(parentId: string) {
    return this.prisma.parentLink.findMany({
      where: { parentId },
      include: {
        child: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async removeParentLink(id: string) {
    const row = await this.prisma.parentLink.findUnique({ where: { id } });
    if (!row) throw new NotFoundException('Холбоос олдсонгүй');
    await this.prisma.parentLink.delete({ where: { id } });
    return { ok: true };
  }
}
