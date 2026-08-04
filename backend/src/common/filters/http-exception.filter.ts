import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import * as Sentry from '@sentry/node';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const body = exception instanceof HttpException ? exception.getResponse() : 'Internal server error';
    const message = typeof body === 'string' ? body : (body as { message?: unknown }).message;

    // ХҮЛЭЭГДЭЭГҮЙ (500) алдаа ЯМАГТ мөр үлдээнэ. Өмнө нь энэ алдаанууд зөвхөн
    // SENTRY_DSN тохируулсан үед л хаа нэгтээ бүртгэгддэг байсан тул dev орчинд
    // (DSN байхгүй) огт ул мөргүй алга болж, хэрэглэгч зөвхөн "Internal server
    // error" гэсэн утгагүй мессеж хардаг байв. Хариултын body-г ӨӨРЧЛӨӨГҮЙ —
    // дотоод мэдээллийг клиент рүү задруулахгүй, зөвхөн серверийн log руу бичнэ.
    if (!(exception instanceof HttpException)) {
      const req = ctx.getRequest<Request>();
      const where = req?.method && req?.url ? `${req.method} ${req.url}` : 'unknown route';
      this.logger.error(
        `Хүлээгдээгүй алдаа (${where}): ${exception instanceof Error ? exception.message : String(exception)}`,
        exception instanceof Error ? exception.stack : undefined,
      );
      if (process.env.SENTRY_DSN) {
        Sentry.captureException(exception);
      }
    }

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
