import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import * as Sentry from '@sentry/node';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const body = exception instanceof HttpException ? exception.getResponse() : 'Internal server error';
    const message = typeof body === 'string' ? body : (body as { message?: unknown }).message;

    // Зөвхөн ХҮЛЭЭГДЭЭГҮЙ (500) алдааг Sentry рүү илгээнэ — HttpException-ууд
    // (400/401/403/404 гм) хэрэглэгчийн буруу оролдлого, алдааны мониторинг
    // шаардлагагүй тул чимээгүй үлдээнэ (шуугиан үүсгэхгүй).
    if (!(exception instanceof HttpException) && process.env.SENTRY_DSN) {
      Sentry.captureException(exception);
    }

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
