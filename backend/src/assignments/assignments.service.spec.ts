import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { AssignmentsService } from './assignments.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AssignmentsService', () => {
  let service: AssignmentsService;
  let prisma: {
    user: { findUnique: jest.Mock };
    therapistAssignment: { findUnique: jest.Mock; findMany: jest.Mock; create: jest.Mock; delete: jest.Mock };
    parentLink: { findUnique: jest.Mock; findMany: jest.Mock; create: jest.Mock; delete: jest.Mock };
  };

  beforeEach(() => {
    prisma = {
      user: { findUnique: jest.fn() },
      therapistAssignment: { findUnique: jest.fn(), findMany: jest.fn(), create: jest.fn(), delete: jest.fn() },
      parentLink: { findUnique: jest.fn(), findMany: jest.fn(), create: jest.fn(), delete: jest.fn() },
    };
    service = new AssignmentsService(prisma as unknown as PrismaService);
  });

  describe('createTherapistAssignment', () => {
    it('rejects when the therapistId does not refer to a THERAPIST-role user', async () => {
      prisma.user.findUnique.mockResolvedValueOnce({ id: 't1', role: Role.USER }).mockResolvedValueOnce({ id: 'p1', role: Role.USER });
      await expect(service.createTherapistAssignment('t1', 'p1')).rejects.toThrow(BadRequestException);
    });

    it('rejects when the userId does not refer to a USER-role patient', async () => {
      prisma.user.findUnique
        .mockResolvedValueOnce({ id: 't1', role: Role.THERAPIST })
        .mockResolvedValueOnce({ id: 'p1', role: Role.THERAPIST });
      await expect(service.createTherapistAssignment('t1', 'p1')).rejects.toThrow(BadRequestException);
    });

    it('rejects a duplicate assignment', async () => {
      prisma.user.findUnique
        .mockResolvedValueOnce({ id: 't1', role: Role.THERAPIST })
        .mockResolvedValueOnce({ id: 'p1', role: Role.USER });
      prisma.therapistAssignment.findUnique.mockResolvedValue({ id: 'existing' });
      await expect(service.createTherapistAssignment('t1', 'p1')).rejects.toThrow(ConflictException);
    });

    it('creates a valid new assignment', async () => {
      prisma.user.findUnique
        .mockResolvedValueOnce({ id: 't1', role: Role.THERAPIST })
        .mockResolvedValueOnce({ id: 'p1', role: Role.USER });
      prisma.therapistAssignment.findUnique.mockResolvedValue(null);
      prisma.therapistAssignment.create.mockResolvedValue({ id: 'new' });
      await expect(service.createTherapistAssignment('t1', 'p1')).resolves.toEqual({ id: 'new' });
    });
  });

  describe('removeTherapistAssignment', () => {
    it('404s for a non-existent link', async () => {
      prisma.therapistAssignment.findUnique.mockResolvedValue(null);
      await expect(service.removeTherapistAssignment('ghost')).rejects.toThrow(NotFoundException);
    });

    it('deletes an existing link', async () => {
      prisma.therapistAssignment.findUnique.mockResolvedValue({ id: 'a1' });
      prisma.therapistAssignment.delete.mockResolvedValue({});
      await expect(service.removeTherapistAssignment('a1')).resolves.toEqual({ ok: true });
    });
  });

  describe('createParentLink', () => {
    it('rejects when the parentId is not a PARENT-role user', async () => {
      prisma.user.findUnique.mockResolvedValueOnce({ id: 'p1', role: Role.USER }).mockResolvedValueOnce({ id: 'c1', role: Role.USER });
      await expect(service.createParentLink('p1', 'c1')).rejects.toThrow(BadRequestException);
    });

    it('rejects a duplicate link', async () => {
      prisma.user.findUnique.mockResolvedValueOnce({ id: 'p1', role: Role.PARENT }).mockResolvedValueOnce({ id: 'c1', role: Role.USER });
      prisma.parentLink.findUnique.mockResolvedValue({ id: 'existing' });
      await expect(service.createParentLink('p1', 'c1')).rejects.toThrow(ConflictException);
    });

    it('creates a valid new parent link', async () => {
      prisma.user.findUnique.mockResolvedValueOnce({ id: 'p1', role: Role.PARENT }).mockResolvedValueOnce({ id: 'c1', role: Role.USER });
      prisma.parentLink.findUnique.mockResolvedValue(null);
      prisma.parentLink.create.mockResolvedValue({ id: 'new' });
      await expect(service.createParentLink('p1', 'c1')).resolves.toEqual({ id: 'new' });
    });
  });

  describe('removeParentLink', () => {
    it('404s for a non-existent link', async () => {
      prisma.parentLink.findUnique.mockResolvedValue(null);
      await expect(service.removeParentLink('ghost')).rejects.toThrow(NotFoundException);
    });
  });

  describe('scoped listing (listMyPatients / listMyChildren)', () => {
    it('listMyPatients filters by therapistId only', async () => {
      prisma.therapistAssignment.findMany.mockResolvedValue([]);
      service.listMyPatients('t1');
      expect(prisma.therapistAssignment.findMany).toHaveBeenCalledWith(expect.objectContaining({ where: { therapistId: 't1' } }));
    });

    it('listMyChildren filters by parentId only', async () => {
      prisma.parentLink.findMany.mockResolvedValue([]);
      service.listMyChildren('p1');
      expect(prisma.parentLink.findMany).toHaveBeenCalledWith(expect.objectContaining({ where: { parentId: 'p1' } }));
    });
  });
});
