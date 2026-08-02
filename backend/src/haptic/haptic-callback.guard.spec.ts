import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HapticCallbackGuard } from './haptic-callback.guard';

describe('HapticCallbackGuard', () => {
  function makeContext(headers: Record<string, string>): ExecutionContext {
    return { switchToHttp: () => ({ getRequest: () => ({ headers }) }) } as unknown as ExecutionContext;
  }

  it('rejects when no HAPTIC_CALLBACK_SECRET is configured server-side', () => {
    const config = { get: jest.fn().mockReturnValue(undefined) } as unknown as ConfigService;
    const guard = new HapticCallbackGuard(config);
    expect(() => guard.canActivate(makeContext({ 'x-haptic-secret': 'anything' }))).toThrow(UnauthorizedException);
  });

  it('rejects when the provided header does not match the configured secret', () => {
    const config = { get: jest.fn().mockReturnValue('real-secret') } as unknown as ConfigService;
    const guard = new HapticCallbackGuard(config);
    expect(() => guard.canActivate(makeContext({ 'x-haptic-secret': 'wrong' }))).toThrow(UnauthorizedException);
  });

  it('rejects when the header is missing entirely', () => {
    const config = { get: jest.fn().mockReturnValue('real-secret') } as unknown as ConfigService;
    const guard = new HapticCallbackGuard(config);
    expect(() => guard.canActivate(makeContext({}))).toThrow(UnauthorizedException);
  });

  it('allows the request through when the header matches the configured secret', () => {
    const config = { get: jest.fn().mockReturnValue('real-secret') } as unknown as ConfigService;
    const guard = new HapticCallbackGuard(config);
    expect(guard.canActivate(makeContext({ 'x-haptic-secret': 'real-secret' }))).toBe(true);
  });
});
