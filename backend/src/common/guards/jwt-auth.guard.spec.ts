import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';

describe('JwtAuthGuard', () => {
  let reflector: Reflector;
  let guard: JwtAuthGuard;
  const context = { getHandler: () => ({}), getClass: () => ({}) } as unknown as ExecutionContext;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new JwtAuthGuard(reflector);
  });

  it('bypasses JWT validation entirely for a @Public() route', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);
    expect(guard.canActivate(context)).toBe(true);
  });

  it('delegates to the passport JWT strategy for a non-public route', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false);
    const superSpy = jest.spyOn(Object.getPrototypeOf(JwtAuthGuard.prototype), 'canActivate').mockReturnValue(true as never);
    expect(guard.canActivate(context)).toBe(true);
    expect(superSpy).toHaveBeenCalledWith(context);
    superSpy.mockRestore();
  });
});
