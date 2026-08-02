import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { tap } from 'rxjs/operators';
import { PrismaService } from '../../prisma/prisma.service';
import { ROLES_KEY } from '../decorators/roles.decorator';

const SENSITIVE_KEYS = ['password', 'newPassword', 'currentPassword', 'passwordHash', 'token'];

function sanitizeBody(body: Record<string, unknown> | undefined): Prisma.InputJsonValue | undefined {
  if (!body || Object.keys(body).length === 0) return undefined;
  const clean: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(body)) {
    clean[key] = SENSITIVE_KEYS.includes(key) ? '[redacted]' : value;
  }
  return clean as Prisma.InputJsonValue;
}

/* @Roles()-той (ROOT/ADMIN гм-ийн зөвшөөрөл шаардсан) mutating route (PATCH/POST/DELETE)
   бүрийг автоматаар AuditLog-д бичнэ. GET route-уудыг зориудаар алгасна — тэдгээр нь
   өгөгдөл өөрчлөхгүй тул мөрдөх шаардлагагүй, мөн AuditLog хүснэгт хэт хурдан дүүрэхээс
   сэргийлнэ. Бичих амжилтгүй болсон ч (жишээ DB давхар зэрэгцээ) хариу блоклохгүй —
   аудит нь дагалдах давхарга, гол урсгалын найдвартай байдалд нөлөөлөх ёсгүй. */
@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest();
    const mutating = ['POST', 'PATCH', 'PUT', 'DELETE'].includes(request.method);

    if (!requiredRoles || requiredRoles.length === 0 || !mutating) {
      return next.handle();
    }

    return next.handle().pipe(
      tap(() => {
        const user = request.user;
        if (!user) return;
        this.prisma.auditLog
          .create({
            data: {
              actorId: user.userId,
              action: `${request.method} ${request.route?.path || request.url}`,
              target: request.params?.id ?? null,
              meta: sanitizeBody(request.body),
              ip: request.ip,
              userAgent: request.headers?.['user-agent'],
            },
          })
          .catch(() => {});
      }),
    );
  }
}
