import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import * as Sentry from '@sentry/node';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

// Sentry-г ямар ч Nest модуль үүсэхээс ӨМНӨ эхлүүлнэ (боломжит бол бүх алдааг
// барихын тулд). SENTRY_DSN тохируулаагүй бол чимээгүй алгасна (dev/CI-д шаардлагагүй).
if (process.env.SENTRY_DSN) {
  Sentry.init({ dsn: process.env.SENTRY_DSN, tracesSampleRate: 0.1, environment: process.env.NODE_ENV || 'development' });
}

async function bootstrap() {
  /* `rawBody: true` — Stripe-ийн webhook гарын үсэг (HMAC) нь ТҮҮХИЙ байтууд дээр
     тооцогддог. Nest нь body-г JSON болгон задалсны дараа буцааж stringify хийвэл
     түлхүүрийн дараалал/зай өөрчлөгдөж гарын үсэг таарахаа болино. Энэ тохиргоо
     нь задалсан `req.body`-гоос ГАДНА `req.rawBody` Buffer-ыг ч үлдээнэ, тул
     бусад бүх endpoint өөрчлөгдөхгүй (см. payments.controller.ts). */
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true, rawBody: true });
  app.useLogger(app.get(Logger));
  const config = app.get(ConfigService);

  app.useWebSocketAdapter(new IoAdapter(app));
  app.setGlobalPrefix('api');
  app.useStaticAssets(join(process.cwd(), 'uploads'), { prefix: '/uploads/' });
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );
  app.use(cookieParser());
  /* ⚠️ `CORS_ORIGIN` нь ТАСЛАЛААР тусгаарлагдсан ОЛОН хаяг байж болно (жиш.
     production домэйн + локал `http://localhost:3001`). `origin`-д таслалтай
     ГАНЦ мөр дамжуулбал cors пакет түүнийг бүтэн текстээр харьцуулдаг тул аль ч
     хаяг таарахаа больж, хоёулаа хаагдана — тиймээс массив болгож задлана.
     `payments/return-url.ts` нь мөн ижил жагсаалтыг уншдаг (нэг эх сурвалж). */
  const origins = (config.get<string>('CORS_ORIGIN') ?? 'http://localhost:5173')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
  app.enableCors({
    origin: origins.length === 1 ? origins[0] : origins,
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(config.get<string>('PORT') ?? 3000);
}
bootstrap();
