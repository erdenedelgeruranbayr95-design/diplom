import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import type { Socket } from 'socket.io';
import { verifyDesktopAuth } from './ws-auth.util';

describe('verifyDesktopAuth', () => {
  function makeSocket(token: string | undefined): Socket {
    return { handshake: { auth: { token } } } as unknown as Socket;
  }

  it('returns null when no token is present in the handshake', async () => {
    const jwt = { verifyAsync: jest.fn() } as unknown as JwtService;
    const config = { getOrThrow: jest.fn().mockReturnValue('secret') } as unknown as ConfigService;
    await expect(verifyDesktopAuth(makeSocket(undefined), jwt, config)).resolves.toBeNull();
    expect(jwt.verifyAsync).not.toHaveBeenCalled();
  });

  it('returns null when the token fails verification (expired/invalid)', async () => {
    const jwt = { verifyAsync: jest.fn().mockRejectedValue(new Error('invalid signature')) } as unknown as JwtService;
    const config = { getOrThrow: jest.fn().mockReturnValue('secret') } as unknown as ConfigService;
    await expect(verifyDesktopAuth(makeSocket('bad-token'), jwt, config)).resolves.toBeNull();
  });

  it('maps a valid JWT payload to AuthUser', async () => {
    const jwt = {
      verifyAsync: jest.fn().mockResolvedValue({ sub: 'user-1', email: 'x@x.com', role: Role.USER }),
    } as unknown as JwtService;
    const config = { getOrThrow: jest.fn().mockReturnValue('secret') } as unknown as ConfigService;
    await expect(verifyDesktopAuth(makeSocket('good-token'), jwt, config)).resolves.toEqual({
      userId: 'user-1',
      email: 'x@x.com',
      role: Role.USER,
    });
  });
});
