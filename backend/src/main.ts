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
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true });
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
  app.enableCors({
    origin: config.get<string>('CORS_ORIGIN') ?? 'http://localhost:5173',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(config.get<string>('PORT') ?? 3000);
}
bootstrap();
