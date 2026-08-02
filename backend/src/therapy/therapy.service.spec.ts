import { ForbiddenException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { TherapyService } from './therapy.service';
import { PrismaService } from '../prisma/prisma.service';

/* `assertTherapistOwnsPatient` болон `assertCanReadUser` нь private методууд тул
   тэднийг ашигладаг public method-уудаар дамжуулж (createSession/listSessions/
   createProgress/listProgress) индирект байдлаар шалгана — private helper-ийн зөв
   тест хийх арга, TS private-ийг "as any"-аар тойрохгүй. */
describe('TherapyService — assertTherapistOwnsPatient / assertCanReadUser (via public methods)', () => {
  let service: TherapyService;
  let prisma: {
    therapistAssignment: { findUnique: jest.Mock };
    parentLink: { findUnique: jest.Mock };
    therapySession: { create: jest.Mock; findMany: jest.Mock; findUnique: jest.Mock; update: jest.Mock };
    progress: { create: jest.Mock; findMany: jest.Mock };
  };

  beforeEach(() => {
    prisma = {
      therapistAssignment: { findUnique: jest.fn() },
      parentLink: { findUnique: jest.fn() },
      therapySession: { create: jest.fn(), findMany: jest.fn(), findUnique: jest.fn(), update: jest.fn() },
      progress: { create: jest.fn(), findMany: jest.fn() },
    };
    service = new TherapyService(prisma as unknown as PrismaService);
  });

  describe('assertTherapistOwnsPatient (via createSession)', () => {
    it('ADMIN bypasses the assignment check entirely', async () => {
      prisma.therapySession.create.mockResolvedValue({ id: 's1' });
      await service.createSession('therapist-1', Role.ADMIN, { userId: 'patient-1' } as never);
      expect(prisma.therapistAssignment.findUnique).not.toHaveBeenCalled();
      expect(prisma.therapySession.create).toHaveBeenCalled();
    });

    it('THERAPIST with a matching TherapistAssignment succeeds', async () => {
      prisma.therapistAssignment.findUnique.mockResolvedValue({ therapistId: 'therapist-1', userId: 'patient-1' });
      prisma.therapySession.create.mockResolvedValue({ id: 's1' });
      await expect(service.createSession('therapist-1', Role.THERAPIST, { userId: 'patient-1' } as never)).resolves.toBeDefined();
    });

    it('THERAPIST without a matching assignment is rejected before any session is created', async () => {
      prisma.therapistAssignment.findUnique.mockResolvedValue(null);
      await expect(service.createSession('therapist-1', Role.THERAPIST, { userId: 'not-my-patient' } as never)).rejects.toThrow(
        ForbiddenException,
      );
      expect(prisma.therapySession.create).not.toHaveBeenCalled();
    });
  });

  describe('assertCanReadUser (via listProgress)', () => {
    it('USER role can only ever read their own progress (userId param ignored/not required)', async () => {
      prisma.progress.findMany.mockResolvedValue([]);
      await service.listProgress({ userId: 'me', role: Role.USER });
      expect(prisma.progress.findMany).toHaveBeenCalledWith({ where: { userId: 'me' }, orderBy: { recordedAt: 'desc' } });
      // assertCanReadUser is not even reached for USER role
      expect(prisma.therapistAssignment.findUnique).not.toHaveBeenCalled();
    });

    it('THERAPIST reading a linked patient succeeds', async () => {
      prisma.therapistAssignment.findUnique.mockResolvedValue({ therapistId: 't1', userId: 'patient-1' });
      prisma.progress.findMany.mockResolvedValue([]);
      await expect(service.listProgress({ userId: 't1', role: Role.THERAPIST }, 'patient-1')).resolves.toEqual([]);
    });

    it('THERAPIST reading a non-linked patient is rejected', async () => {
      prisma.therapistAssignment.findUnique.mockResolvedValue(null);
      await expect(service.listProgress({ userId: 't1', role: Role.THERAPIST }, 'stranger')).rejects.toThrow(ForbiddenException);
    });

    it('PARENT reading a linked child succeeds', async () => {
      prisma.parentLink.findUnique.mockResolvedValue({ parentId: 'p1', childUserId: 'child-1' });
      prisma.progress.findMany.mockResolvedValue([]);
      await expect(service.listProgress({ userId: 'p1', role: Role.PARENT }, 'child-1')).resolves.toEqual([]);
    });

    it('PARENT reading a non-linked child is rejected', async () => {
      prisma.parentLink.findUnique.mockResolvedValue(null);
      await expect(service.listProgress({ userId: 'p1', role: Role.PARENT }, 'not-my-child')).rejects.toThrow(ForbiddenException);
    });

    it('listProgress without a userId for a non-USER role is rejected before any DB lookup', async () => {
      await expect(service.listProgress({ userId: 't1', role: Role.THERAPIST })).rejects.toThrow(ForbiddenException);
      expect(prisma.progress.findMany).not.toHaveBeenCalled();
    });
  });
});
