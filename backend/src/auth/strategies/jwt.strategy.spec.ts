import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Role, UserStatus } from '@prisma/client';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from '../../prisma/prisma.service';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  let prisma: { user: { findUnique: jest.Mock } };

  beforeEach(() => {
    const config = { getOrThrow: jest.fn().mockReturnValue('test-secret') } as unknown as ConfigService;
    prisma = { user: { findUnique: jest.fn() } };
    strategy = new JwtStrategy(config, prisma as unknown as PrismaService);
  });

  it('rejects a token whose user no longer exists (e.g. deleted account)', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    await expect(strategy.validate({ sub: 'ghost', email: 'x@x.com', role: Role.USER })).rejects.toThrow(UnauthorizedException);
  });

  it('rejects a BANNED user even with an otherwise-valid, unexpired token (immediate suspension enforcement)', async () => {
    prisma.user.findUnique.mockResolvedValue({ status: UserStatus.BANNED });
    await expect(strategy.validate({ sub: 'u1', email: 'x@x.com', role: Role.USER })).rejects.toThrow(UnauthorizedException);
  });

  it('returns the AuthUser shape for a valid, active user', async () => {
    prisma.user.findUnique.mockResolvedValue({ status: UserStatus.ACTIVE });
    await expect(strategy.validate({ sub: 'u1', email: 'x@x.com', role: Role.THERAPIST })).resolves.toEqual({
      userId: 'u1',
      email: 'x@x.com',
      role: Role.THERAPIST,
    });
  });
});
