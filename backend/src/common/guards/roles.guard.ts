import { ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { CanActivate } from '@nestjs/common/interfaces';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ROLES_KEY } from '../decorators/roles.decorator';

/* Эрхийн шатлал.

   `ROOT` бол системийн эзэмшигч — ADMIN-аас ДЭЭР зэрэглэлтэй тул @Roles() шаардсан
   аль ч эрхийг хангана. Ингэснээр controller бүрийн жагсаалтад `Role.ROOT`-ыг гараар
   нэмж бичих шаардлагагүй (мартагдах эрсдэлгүй), эрхийн дүрэм нэг газар төвлөрнө.

   Баталгаажуулалт (JWT strategy, guard-ийн дараалал) огт хөндөгдөөгүй — энэ нь
   зөвхөн ЭРХ (authorization) шалгах давхарга. */
const SUPER_ROLES: Role[] = [Role.ROOT];

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length === 0) return true;

    const { user } = context.switchToHttp().getRequest();
    if (!user) throw new ForbiddenException('Insufficient role');

    /* ROOT нь бүх шаардлагыг давна — гэхдээ ЗӨВХӨН @Roles() тавигдсан route дээр
       (энэ дээрх шалгалт хэвээр), нээлттэй/эрхгүй route-ийн зан төлөв өөрчлөгдөхгүй. */
    if (SUPER_ROLES.includes(user.role)) return true;

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Insufficient role');
    }
    return true;
  }
}
