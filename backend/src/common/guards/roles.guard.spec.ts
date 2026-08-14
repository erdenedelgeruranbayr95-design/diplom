import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { RolesGuard } from './roles.guard';

function makeContext(user: { role: Role } | undefined): ExecutionContext {
  return {
    getHandler: () => ({}),
    getClass: () => ({}),
    switchToHttp: () => ({ getRequest: () => ({ user }) }),
  } as unknown as ExecutionContext;
}

describe('RolesGuard', () => {
  let reflector: Reflector;
  let guard: RolesGuard;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new RolesGuard(reflector);
  });

  it('allows the request through when no @Roles() metadata is set (public/unrestricted route)', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);
    expect(guard.canActivate(makeContext({ role: Role.USER }))).toBe(true);
  });

  it('throws ForbiddenException when roles are required but no user is attached', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([Role.ADMIN]);
    expect(() => guard.canActivate(makeContext(undefined))).toThrow(ForbiddenException);
  });

  it('allows a user whose role is directly in the required list', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([Role.ADMIN, Role.CURATOR]);
    expect(guard.canActivate(makeContext({ role: Role.CURATOR }))).toBe(true);
  });

  it('rejects a user whose role is not in the required list', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([Role.ADMIN]);
    expect(() => guard.canActivate(makeContext({ role: Role.USER }))).toThrow(ForbiddenException);
  });

  it('ROOT satisfies ANY @Roles() requirement, even ones that do not name ROOT explicitly', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([Role.ARTIST]);
    expect(guard.canActivate(makeContext({ role: Role.ROOT }))).toBe(true);
  });

  it('ROOT still requires @Roles() metadata to be set — public routes are unaffected either way', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([]);
    expect(guard.canActivate(makeContext({ role: Role.ROOT }))).toBe(true);
  });
});
