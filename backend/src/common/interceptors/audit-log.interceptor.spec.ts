import { CallHandler, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { of } from 'rxjs';
import { AuditLogInterceptor } from './audit-log.interceptor';
import { PrismaService } from '../../prisma/prisma.service';

describe('AuditLogInterceptor', () => {
  let reflector: Reflector;
  let prisma: { auditLog: { create: jest.Mock } };
  let interceptor: AuditLogInterceptor;
  let next: CallHandler;

  function makeContext(request: Record<string, unknown>): ExecutionContext {
    return {
      getHandler: () => ({}),
      getClass: () => ({}),
      switchToHttp: () => ({ getRequest: () => request }),
    } as unknown as ExecutionContext;
  }

  beforeEach(() => {
    reflector = new Reflector();
    prisma = { auditLog: { create: jest.fn().mockResolvedValue({}) } };
    interceptor = new AuditLogInterceptor(reflector, prisma as unknown as PrismaService);
    next = { handle: () => of('response') };
  });

  it('skips logging entirely for a route with no @Roles() metadata (public route)', (done) => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);
    const ctx = makeContext({ method: 'POST', user: { userId: 'u1' } });
    interceptor.intercept(ctx, next).subscribe(() => {
      expect(prisma.auditLog.create).not.toHaveBeenCalled();
      done();
    });
  });

  it('skips logging for a GET request even on a @Roles()-protected route (only mutating verbs are audited)', (done) => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['ADMIN']);
    const ctx = makeContext({ method: 'GET', user: { userId: 'u1' } });
    interceptor.intercept(ctx, next).subscribe(() => {
      expect(prisma.auditLog.create).not.toHaveBeenCalled();
      done();
    });
  });

  it('skips logging when there is no authenticated user on the request', (done) => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['ADMIN']);
    const ctx = makeContext({ method: 'POST', user: undefined });
    interceptor.intercept(ctx, next).subscribe(() => {
      expect(prisma.auditLog.create).not.toHaveBeenCalled();
      done();
    });
  });

  it('logs a mutating request on a @Roles()-protected route with the actor and action', (done) => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['ADMIN']);
    const ctx = makeContext({
      method: 'DELETE',
      user: { userId: 'admin-1' },
      url: '/api/users/123',
      params: { id: '123' },
      body: {},
      headers: { 'user-agent': 'test-agent' },
      ip: '127.0.0.1',
    });
    interceptor.intercept(ctx, next).subscribe(() => {
      expect(prisma.auditLog.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ actorId: 'admin-1', action: 'DELETE /api/users/123', target: '123', ip: '127.0.0.1' }),
        }),
      );
      done();
    });
  });

  it('redacts sensitive fields (password, token, etc.) from the logged request body', (done) => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['ADMIN']);
    const ctx = makeContext({
      method: 'POST',
      user: { userId: 'admin-1' },
      url: '/api/users',
      params: {},
      body: { name: 'X', password: 'super-secret', token: 'abc' },
      headers: {},
    });
    interceptor.intercept(ctx, next).subscribe(() => {
      const call = prisma.auditLog.create.mock.calls[0][0];
      expect(call.data.meta).toEqual({ name: 'X', password: '[redacted]', token: '[redacted]' });
      done();
    });
  });

  it('does not block the response when the audit-log write itself fails', (done) => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['ADMIN']);
    prisma.auditLog.create.mockReturnValue(Promise.reject(new Error('db down')));
    const ctx = makeContext({ method: 'POST', user: { userId: 'u1' }, url: '/x', params: {}, body: {}, headers: {} });
    interceptor.intercept(ctx, next).subscribe((value) => {
      expect(value).toBe('response'); // caller's response passes through unaffected
      done();
    });
  });
});
