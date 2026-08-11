import { BadRequestException, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Role, UserStatus } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { StripeSubscriptionsService } from '../payments/stripe-subscriptions.service';

describe('UsersService', () => {
  let service: UsersService;
  let stripeSubs: { cancelAtStripe: jest.Mock };
  let prisma: {
    user: { findUnique: jest.Mock; findMany: jest.Mock; create: jest.Mock; update: jest.Mock; delete: jest.Mock };
    refreshToken: { findMany: jest.Mock; updateMany: jest.Mock };
    payment: { create: jest.Mock; findMany: jest.Mock };
    subscription: { upsert: jest.Mock; updateMany: jest.Mock; findUnique: jest.Mock };
    listenHistory: { findMany: jest.Mock };
    userTrackAction: { findMany: jest.Mock };
    playlist: { findMany: jest.Mock };
    progress: { findMany: jest.Mock };
    therapySession: { findMany: jest.Mock };
    qRSession: { findMany: jest.Mock };
    $transaction: jest.Mock;
  };

  const baseUser = {
    id: 'user-1',
    name: 'Bat',
    email: 'bat@example.com',
    role: Role.USER,
    status: UserStatus.ACTIVE,
    passwordHash: '',
    avatarColor: null,
    hearingProfile: null,
    subActive: false,
    subPlan: null,
    subSince: null,
    subRenews: null,
  };

  beforeEach(() => {
    prisma = {
      user: { findUnique: jest.fn(), findMany: jest.fn(), create: jest.fn(), update: jest.fn(), delete: jest.fn() },
      refreshToken: { findMany: jest.fn(), updateMany: jest.fn() },
      payment: { create: jest.fn(), findMany: jest.fn() },
      subscription: { upsert: jest.fn(), updateMany: jest.fn(), findUnique: jest.fn() },
      listenHistory: { findMany: jest.fn() },
      userTrackAction: { findMany: jest.fn() },
      playlist: { findMany: jest.fn() },
      progress: { findMany: jest.fn() },
      therapySession: { findMany: jest.fn() },
      qRSession: { findMany: jest.fn() },
      $transaction: jest.fn((ops) => Promise.all(ops)),
    };
    const config = { get: () => 'test-hearing-profile-key' } as unknown as ConfigService;
    /* Цуцлалт нь Stripe дээрх recurring захиалгыг ч зогсоодог болсон. Энэ тестэд
       Stripe огт хамаагүй тул `false` (= Stripe захиалга байхгүй) гэж хариулна —
       DB талын зан төлөв өөрчлөгдөхгүй. */
    stripeSubs = { cancelAtStripe: jest.fn().mockResolvedValue(false) };
    service = new UsersService(
      prisma as unknown as PrismaService,
      config,
      stripeSubs as unknown as StripeSubscriptionsService,
    );
  });

  describe('create', () => {
    it('rejects a duplicate email', async () => {
      prisma.user.findUnique.mockResolvedValue(baseUser);
      await expect(service.create({ name: 'X', email: baseUser.email, password: 'aaaaaa', role: Role.THERAPIST } as never)).rejects.toThrow(
        ConflictException,
      );
    });

    it('creates a staff account and returns a safe DTO (no passwordHash)', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      prisma.user.create.mockResolvedValue({ ...baseUser, role: Role.THERAPIST, passwordHash: 'hashed' });
      const result = await service.create({ name: 'X', email: 'x@x.com', password: 'aaaaaa', role: Role.THERAPIST } as never);
      expect(result).not.toHaveProperty('passwordHash');
      expect(result.role).toBe(Role.THERAPIST);
    });
  });

  describe('updateProfile (hearingProfile encryption)', () => {
    it('encrypts hearingProfile before writing to the DB and decrypts it on the way out', async () => {
      let storedHearingProfile: string | undefined;
      prisma.user.update.mockImplementation(({ data }: { data: { hearingProfile?: string } }) => {
        storedHearingProfile = data.hearingProfile;
        return Promise.resolve({ ...baseUser, hearingProfile: data.hearingProfile });
      });

      const result = await service.updateProfile('user-1', { hearingProfile: 'moderate hearing loss, left ear' } as never);

      expect(storedHearingProfile).toBeDefined();
      expect(storedHearingProfile).not.toBe('moderate hearing loss, left ear');
      expect(storedHearingProfile).toMatch(/^v1:/);
      expect(result.hearingProfile).toBe('moderate hearing loss, left ear');
    });

    it('clears hearingProfile (sets null) when an empty string is submitted', async () => {
      prisma.user.update.mockResolvedValue({ ...baseUser, hearingProfile: null });
      const result = await service.updateProfile('user-1', { hearingProfile: '' } as never);
      expect(prisma.user.update).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ hearingProfile: null }) }),
      );
      expect(result.hearingProfile).toBeNull();
    });
  });

  describe('remove', () => {
    it('prevents a user from deleting themselves', async () => {
      await expect(service.remove('user-1', 'user-1')).rejects.toThrow(BadRequestException);
      expect(prisma.user.delete).not.toHaveBeenCalled();
    });

    it('404s when the target does not exist', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      await expect(service.remove('ghost', 'admin-1')).rejects.toThrow(NotFoundException);
    });

    it('deletes an existing, different user', async () => {
      prisma.user.findUnique.mockResolvedValue(baseUser);
      prisma.user.delete.mockResolvedValue({});
      await expect(service.remove('user-1', 'admin-1')).resolves.toEqual({ ok: true });
    });
  });

  describe('updateRole', () => {
    it('prevents changing your own role', async () => {
      await expect(service.updateRole('u1', 'u1', { role: Role.ADMIN } as never)).rejects.toThrow(BadRequestException);
    });

    it('prevents changing a ROOT user role via this endpoint', async () => {
      prisma.user.findUnique.mockResolvedValue({ ...baseUser, role: Role.ROOT });
      await expect(service.updateRole('root-1', 'admin-1', { role: Role.USER } as never)).rejects.toThrow(BadRequestException);
      expect(prisma.user.update).not.toHaveBeenCalled();
    });

    it('updates the role for a regular user', async () => {
      prisma.user.findUnique.mockResolvedValue(baseUser);
      prisma.user.update.mockResolvedValue({ ...baseUser, role: Role.CURATOR });
      await expect(service.updateRole('user-1', 'admin-1', { role: Role.CURATOR } as never)).resolves.toEqual(
        expect.objectContaining({ role: Role.CURATOR }),
      );
    });
  });

  describe('updateStatus', () => {
    it('prevents suspending a ROOT user', async () => {
      prisma.user.findUnique.mockResolvedValue({ ...baseUser, role: Role.ROOT });
      await expect(service.updateStatus('root-1', 'admin-1', { status: UserStatus.BANNED } as never)).rejects.toThrow(BadRequestException);
    });

    it('revokes all active refresh tokens when suspending a user (forces logout)', async () => {
      prisma.user.findUnique.mockResolvedValue(baseUser);
      prisma.$transaction.mockResolvedValue([{ ...baseUser, status: UserStatus.BANNED }, { count: 2 }]);
      await service.updateStatus('user-1', 'admin-1', { status: UserStatus.BANNED } as never);
      expect(prisma.$transaction).toHaveBeenCalled();
    });
  });

  describe('changePassword', () => {
    it('rejects an incorrect current password', async () => {
      const passwordHash = await bcrypt.hash('correct', 4);
      prisma.user.findUnique.mockResolvedValue({ ...baseUser, passwordHash });
      await expect(service.changePassword('user-1', { currentPassword: 'wrong', newPassword: 'newpass1' } as never)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('rejects when the new password is identical to the old one', async () => {
      const passwordHash = await bcrypt.hash('correct', 4);
      prisma.user.findUnique.mockResolvedValue({ ...baseUser, passwordHash });
      await expect(service.changePassword('user-1', { currentPassword: 'correct', newPassword: 'correct' } as never)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('succeeds and revokes sessions on a valid password change', async () => {
      const passwordHash = await bcrypt.hash('correct', 4);
      prisma.user.findUnique.mockResolvedValue({ ...baseUser, passwordHash });
      prisma.$transaction.mockResolvedValue([{}, {}]);
      await expect(service.changePassword('user-1', { currentPassword: 'correct', newPassword: 'newpass1' } as never)).resolves.toEqual({
        ok: true,
      });
    });
  });

  describe('subscribe / cancelSubscription', () => {
    it('subscribe activates a subscription and records a payment in one transaction', async () => {
      prisma.$transaction.mockResolvedValue([{ ...baseUser, subActive: true, subPlan: 'МЭДРЭХ PRO' }, {}]);
      const result = await service.subscribe('user-1', 'МЭДРЭХ PRO');
      expect(result).toEqual(expect.objectContaining({ active: true, plan: 'МЭДРЭХ PRO' }));
    });

    it('cancelSubscription deactivates and returns null (no active sub)', async () => {
      prisma.user.update.mockResolvedValue({ ...baseUser, subActive: false });
      await expect(service.cancelSubscription('user-1')).resolves.toBeNull();
    });
  });

  describe('setSubscriptionFor', () => {
    it('404s for a non-existent target user', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      await expect(service.setSubscriptionFor('ghost', true)).rejects.toThrow(NotFoundException);
    });

    it('activates with the default plan when none is specified', async () => {
      prisma.user.findUnique.mockResolvedValue(baseUser);
      prisma.user.update.mockResolvedValue({ ...baseUser, subActive: true, subPlan: 'МЭДРЭХ PRO' });
      const result = await service.setSubscriptionFor('user-1', true);
      expect(result).toEqual(expect.objectContaining({ plan: 'МЭДРЭХ PRO' }));
    });
  });

  describe('exportMyData (GDPR)', () => {
    it('throws NotFoundException when the user no longer exists', async () => {
      prisma.$transaction.mockResolvedValue([null, [], null, [], [], [], [], [], []]);
      await expect(service.exportMyData('ghost')).rejects.toThrow(NotFoundException);
    });

    it('bundles the profile together with all related records', async () => {
      prisma.$transaction.mockResolvedValue([
        baseUser,
        [{ id: 'payment-1' }],
        { id: 'sub-1' },
        [{ id: 'listen-1' }],
        [{ userId: 'user-1', songId: 'song-1', action: 'LIKE' }],
        [{ id: 'playlist-1', tracks: [] }],
        [{ id: 'progress-1' }],
        [{ id: 'session-1' }],
        [{ id: 'qr-1' }],
      ]);
      const result = await service.exportMyData('user-1');
      expect(result.profile).toEqual(baseUser);
      expect(result.payments).toEqual([{ id: 'payment-1' }]);
      expect(result.subscription).toEqual({ id: 'sub-1' });
      expect(result.listenHistory).toEqual([{ id: 'listen-1' }]);
      expect(result.playlists).toEqual([{ id: 'playlist-1', tracks: [] }]);
      expect(result.exportedAt).toEqual(expect.any(String));
    });
  });

  describe('deleteMyAccount (GDPR)', () => {
    it('throws NotFoundException for a missing user', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      await expect(service.deleteMyAccount('ghost', 'whatever')).rejects.toThrow(NotFoundException);
    });

    it('rejects with UnauthorizedException on a wrong password', async () => {
      const passwordHash = await bcrypt.hash('correct', 4);
      prisma.user.findUnique.mockResolvedValue({ ...baseUser, passwordHash });
      await expect(service.deleteMyAccount('user-1', 'wrong')).rejects.toThrow(UnauthorizedException);
      expect(prisma.user.delete).not.toHaveBeenCalled();
    });

    it('deletes the account when the password matches', async () => {
      const passwordHash = await bcrypt.hash('correct', 4);
      prisma.user.findUnique.mockResolvedValue({ ...baseUser, passwordHash });
      prisma.user.delete.mockResolvedValue({ ...baseUser });
      await expect(service.deleteMyAccount('user-1', 'correct')).resolves.toEqual({ ok: true });
      expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 'user-1' } });
    });
  });
});
