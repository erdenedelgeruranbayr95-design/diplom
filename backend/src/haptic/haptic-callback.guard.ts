import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/* Python worker-ийн callback endpoint зөвхөн энэ header-тэй хүсэлтийг зөвшөөрнө —
   JWT биш (worker хэрэглэгчийн session-гүй), тогтмол shared-secret хамгаалалт. */
@Injectable()
export class HapticCallbackGuard implements CanActivate {
  constructor(private config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const secret = this.config.get<string>('HAPTIC_CALLBACK_SECRET');
    const provided = request.headers['x-haptic-secret'];
    if (!secret || provided !== secret) {
      throw new UnauthorizedException('Invalid worker callback secret');
    }
    return true;
  }
}
