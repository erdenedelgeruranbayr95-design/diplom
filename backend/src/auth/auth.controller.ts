import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Throttle } from '@nestjs/throttler';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterParentDto } from './dto/register-parent.dto';
import { GoogleLoginDto } from './dto/google-login.dto';
import { Public } from '../common/decorators/public.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { AuthUser } from '../common/decorators/current-user.decorator';

const REFRESH_COOKIE = 'mrh_rt';
const REFRESH_COOKIE_PATH = '/api/auth';
const REFRESH_COOKIE_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

@Controller('auth')
export class AuthController {
  constructor(
    private auth: AuthService,
    private config: ConfigService,
  ) {}

  private setRefreshCookie(res: Response, token: string) {
    /* Frontend (Vercel) болон backend (Render) өөр домэйнд байрладаг (cross-site) production
       орчинд `SameSite=Lax` cookie нь fetch()-ийн cross-origin хvсэлтэд ЗААВАЛ илгээгддэггvй
       (зөвхөн top-level navigation-д) — /auth/refresh хэзээ ч cookie авахгvй, хуудас
       refresh хийхэд хэрэглэгч гарсан мэт харагддаг байсан. `SameSite=None` cross-site
       cookie зөвшөөрдөг ч Secure=true (HTTPS) шаарддаг тул production дээр хоёуланг хамт
       өөрчилнө; dev-д (localhost, same-site) хэвээр `Lax`+`Secure=false` vлдэнэ. */
    const isProd = this.config.get('NODE_ENV') === 'production';
    res.cookie(REFRESH_COOKIE, token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      path: REFRESH_COOKIE_PATH,
      maxAge: REFRESH_COOKIE_MAX_AGE_MS,
    });
  }

  private clearRefreshCookie(res: Response) {
    res.clearCookie(REFRESH_COOKIE, { path: REFRESH_COOKIE_PATH });
  }

  @Public()
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('register')
  async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken, user } = await this.auth.register(dto);
    this.setRefreshCookie(res, refreshToken);
    return { accessToken, user };
  }

  @Public()
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('register-parent')
  async registerParent(@Body() dto: RegisterParentDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken, user } = await this.auth.registerParent(dto);
    this.setRefreshCookie(res, refreshToken);
    return { accessToken, user };
  }

  @Public()
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('login')
  async login(@Body() dto: LoginDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken, user } = await this.auth.login(dto, req.ip, req.headers['user-agent']);
    this.setRefreshCookie(res, refreshToken);
    return { accessToken, user };
  }

  /* Google Identity Services (frontend "Sign in with Google" товч)-ийн буцаадаг
     ID token-ыг хүлээж авна. Шинэ хэрэглэгч бол автоматаар USER эрхээр бүртгэнэ. */
  @Public()
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('google')
  async google(@Body() dto: GoogleLoginDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken, user } = await this.auth.loginWithGoogle(dto.idToken);
    this.setRefreshCookie(res, refreshToken);
    return { accessToken, user };
  }

  @Public()
  @Post('refresh')
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const current = req.cookies?.[REFRESH_COOKIE];
    const { accessToken, refreshToken, user } = await this.auth.refresh(current);
    this.setRefreshCookie(res, refreshToken);
    return { accessToken, user };
  }

  @Public()
  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const current = req.cookies?.[REFRESH_COOKIE];
    await this.auth.logout(current);
    this.clearRefreshCookie(res);
    return { ok: true };
  }

  @Get('me')
  async me(@CurrentUser() user: AuthUser) {
    return this.auth.me(user.userId);
  }
}
