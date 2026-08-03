import { BadRequestException, ConflictException, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role, UserStatus } from '@prisma/client';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';

const verifyIdTokenMock = jest.fn();
jest.mock('google-auth-library', () => ({
  OAuth2Client: jest.fn().mockImplementation(() => ({
    verifyIdToken: verifyIdTokenMock,
  })),
}));

describe('AuthService', () => {
  let service: AuthService;
  let prisma: {
    user: { findUnique: jest.Mock; create: jest.Mock; update: jest.Mock };
    refreshToken: { create: jest.Mock; findUnique: jest.Mock; update: jest.Mock; updateMany: jest.Mock };
    parentLink: { create: jest.Mock };
  };
  let jwt: JwtService;

  const baseUser = {
    id: 'user-1',
    name: 'Bat',
    email: 'bat@example.com',
    role: Role.USER,
    status: UserStatus.ACTIVE,
    avatarColor: null,
    hearingProfile: null,
    subActive: false,
    subPlan: null,
    subSince: null,
    subRenews: null,
    passwordHash: '', // set per test via bcrypt.hash
  };

  beforeEach(() => {
    prisma = {
      user: { findUnique: jest.fn(), create: jest.fn(), update: jest.fn() },
      refreshToken: { create: jest.fn(), findUnique: jest.fn(), update: jest.fn(), updateMany: jest.fn() },
      parentLink: { create: jest.fn() },
    };
    jwt = new JwtService({ secret: 'test-secret' });
    const config = {
      getOrThrow: jest.fn().mockReturnValue('test-secret'),
      get: jest.fn((key: string) => (key === 'GOOGLE_CLIENT_ID' ? 'test-google-client-id' : 'test-hearing-profile-key')),
    } as unknown as ConfigService;
    service = new AuthService(prisma as unknown as PrismaService, jwt, config);
    verifyIdTokenMock.mockReset();
  });

  describe('register', () => {
    it('rejects when password confirmation does not match', async () => {
      await expect(
        service.register({ name: 'X', email: 'x@x.com', password: 'aaaaaa', password2: 'bbbbbb' } as never),
      ).rejects.toThrow(ConflictException);
      expect(prisma.user.create).not.toHaveBeenCalled();
    });

    it('rejects when the email is already registered', async () => {
      prisma.user.findUnique.mockResolvedValue(baseUser);
      await expect(
        service.register({ name: 'X', email: baseUser.email, password: 'aaaaaa', password2: 'aaaaaa' } as never),
      ).rejects.toThrow(ConflictException);
    });

    it('lowercases/trims the email before storing and checking uniqueness', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      prisma.user.create.mockResolvedValue({ ...baseUser, email: 'x@x.com' });
      prisma.refreshToken.create.mockResolvedValue({});
      await service.register({ name: '  X  ', email: '  X@X.com  ', password: 'aaaaaa', password2: 'aaaaaa' } as never);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'x@x.com' } });
      expect(prisma.user.create).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ name: 'X', email: 'x@x.com' }) }),
      );
    });
  });

  describe('login', () => {
    it('rejects an unknown email without revealing whether the account exists', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      await expect(service.login({ email: 'nobody@x.com', password: 'whatever' } as never)).rejects.toThrow(UnauthorizedException);
    });

    it('rejects an incorrect password', async () => {
      const passwordHash = await bcrypt.hash('correct-password', 4);
      prisma.user.findUnique.mockResolvedValue({ ...baseUser, passwordHash });
      await expect(service.login({ email: baseUser.email, password: 'wrong-password' } as never)).rejects.toThrow(UnauthorizedException);
    });

    it('rejects login for a BANNED user even with the correct password (cannot open a new session)', async () => {
      const passwordHash = await bcrypt.hash('correct-password', 4);
      prisma.user.findUnique.mockResolvedValue({ ...baseUser, passwordHash, status: UserStatus.BANNED });
      await expect(service.login({ email: baseUser.email, password: 'correct-password' } as never)).rejects.toThrow(ForbiddenException);
      // must reject BEFORE issuing any token/session artifacts
      expect(prisma.refreshToken.create).not.toHaveBeenCalled();
    });

    it('updates lastLoginAt only on a successful login, not on failed attempts', async () => {
      const passwordHash = await bcrypt.hash('correct-password', 4);
      prisma.user.findUnique.mockResolvedValue({ ...baseUser, passwordHash });
      prisma.refreshToken.create.mockResolvedValue({});
      prisma.user.update.mockResolvedValue({});

      await service.login({ email: baseUser.email, password: 'correct-password' } as never);
      expect(prisma.user.update).toHaveBeenCalledWith({ where: { id: baseUser.id }, data: { lastLoginAt: expect.any(Date) } });

      jest.clearAllMocks();
      prisma.user.findUnique.mockResolvedValue({ ...baseUser, passwordHash });
      await expect(service.login({ email: baseUser.email, password: 'wrong' } as never)).rejects.toThrow(UnauthorizedException);
      expect(prisma.user.update).not.toHaveBeenCalled();
    });

    it('returns a signed access token and a session shape without the password hash', async () => {
      const passwordHash = await bcrypt.hash('correct-password', 4);
      prisma.user.findUnique.mockResolvedValue({ ...baseUser, passwordHash });
      prisma.refreshToken.create.mockResolvedValue({});
      prisma.user.update.mockResolvedValue({});

      const result = await service.login({ email: baseUser.email, password: 'correct-password' } as never);
      expect(result.accessToken).toEqual(expect.any(String));
      expect(result.user).not.toHaveProperty('passwordHash');
      expect(result.user.email).toBe(baseUser.email);
    });

    it('rejects password login for a Google-only account (passwordHash is null)', async () => {
      prisma.user.findUnique.mockResolvedValue({ ...baseUser, passwordHash: null });
      await expect(service.login({ email: baseUser.email, password: 'whatever' } as never)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('loginWithGoogle', () => {
    const googlePayload = { email: 'bat@example.com', sub: 'google-sub-1', email_verified: true, name: 'Bat' };

    it('rejects when GOOGLE_CLIENT_ID is not configured', async () => {
      const config = { getOrThrow: jest.fn().mockReturnValue('test-secret'), get: jest.fn().mockReturnValue(undefined) } as unknown as ConfigService;
      const svc = new AuthService(prisma as unknown as PrismaService, jwt, config);
      await expect(svc.loginWithGoogle('some-token')).rejects.toThrow(BadRequestException);
    });

    it('rejects an invalid/unverifiable ID token', async () => {
      verifyIdTokenMock.mockRejectedValue(new Error('bad token'));
      await expect(service.loginWithGoogle('bad-token')).rejects.toThrow(UnauthorizedException);
    });

    it('rejects a token whose email is not verified', async () => {
      verifyIdTokenMock.mockResolvedValue({ getPayload: () => ({ ...googlePayload, email_verified: false }) });
      await expect(service.loginWithGoogle('token')).rejects.toThrow(UnauthorizedException);
    });

    it('links googleId onto an existing user found by email (does not create a duplicate)', async () => {
      verifyIdTokenMock.mockResolvedValue({ getPayload: () => googlePayload });
      prisma.user.findUnique
        .mockResolvedValueOnce(null) // lookup by googleId: not linked yet
        .mockResolvedValueOnce({ ...baseUser, passwordHash: 'existing-hash' }); // lookup by email: found
      prisma.user.update.mockResolvedValueOnce({ ...baseUser, passwordHash: 'existing-hash', googleId: 'google-sub-1' });
      prisma.user.update.mockResolvedValueOnce({ ...baseUser, passwordHash: 'existing-hash', googleId: 'google-sub-1' });
      prisma.refreshToken.create.mockResolvedValue({});

      await service.loginWithGoogle('token');
      expect(prisma.user.create).not.toHaveBeenCalled();
      expect(prisma.user.update).toHaveBeenCalledWith({ where: { id: baseUser.id }, data: { googleId: 'google-sub-1' } });
    });

    it('creates a new USER-role account when no existing user matches googleId or email', async () => {
      verifyIdTokenMock.mockResolvedValue({ getPayload: () => googlePayload });
      prisma.user.findUnique.mockResolvedValueOnce(null).mockResolvedValueOnce(null);
      const created = { ...baseUser, passwordHash: null, googleId: 'google-sub-1' };
      prisma.user.create.mockResolvedValue(created);
      prisma.user.update.mockResolvedValue(created);
      prisma.refreshToken.create.mockResolvedValue({});

      const result = await service.loginWithGoogle('token');
      expect(prisma.user.create).toHaveBeenCalledWith({ data: { name: 'Bat', email: 'bat@example.com', googleId: 'google-sub-1' } });
      expect(result.accessToken).toEqual(expect.any(String));
    });

    it('rejects a BANNED user even with a valid Google token', async () => {
      verifyIdTokenMock.mockResolvedValue({ getPayload: () => googlePayload });
      prisma.user.findUnique.mockResolvedValueOnce({ ...baseUser, status: UserStatus.BANNED, googleId: 'google-sub-1' });
      await expect(service.loginWithGoogle('token')).rejects.toThrow(ForbiddenException);
      expect(prisma.refreshToken.create).not.toHaveBeenCalled();
    });
  });

  describe('refresh', () => {
    it('rejects when no refresh token cookie is present', async () => {
      await expect(service.refresh(undefined)).rejects.toThrow(UnauthorizedException);
    });

    it('rejects a revoked refresh token', async () => {
      prisma.refreshToken.findUnique.mockResolvedValue({ id: 'rt1', revoked: true, expiresAt: new Date(Date.now() + 100000), userId: 'u1' });
      await expect(service.refresh('some-token')).rejects.toThrow(UnauthorizedException);
    });

    it('rejects an expired refresh token', async () => {
      prisma.refreshToken.findUnique.mockResolvedValue({ id: 'rt1', revoked: false, expiresAt: new Date(Date.now() - 1000), userId: 'u1' });
      await expect(service.refresh('some-token')).rejects.toThrow(UnauthorizedException);
    });

    it('rotates the refresh token: old is revoked, a new one is issued', async () => {
      prisma.refreshToken.findUnique.mockResolvedValue({ id: 'rt1', revoked: false, expiresAt: new Date(Date.now() + 100000), userId: baseUser.id });
      prisma.user.findUnique.mockResolvedValue(baseUser);
      prisma.refreshToken.update.mockResolvedValue({});
      prisma.refreshToken.create.mockResolvedValue({});

      await service.refresh('old-token');
      expect(prisma.refreshToken.update).toHaveBeenCalledWith({ where: { id: 'rt1' }, data: { revoked: true } });
      expect(prisma.refreshToken.create).toHaveBeenCalled();
    });
  });
});
