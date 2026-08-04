import { ArgumentsHost, BadRequestException, HttpStatus, Logger } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';

describe('HttpExceptionFilter', () => {
  let filter: HttpExceptionFilter;
  let json: jest.Mock;
  let status: jest.Mock;
  let host: ArgumentsHost;

  beforeEach(() => {
    filter = new HttpExceptionFilter();
    json = jest.fn();
    status = jest.fn().mockReturnValue({ json });
    host = {
      switchToHttp: () => ({
        getResponse: () => ({ status }),
        getRequest: () => ({ method: 'POST', url: '/api/auth/register' }),
      }),
    } as unknown as ArgumentsHost;
    // Filter нь 500 бүрийг log руу бичдэг — тестийн гаралтыг бохирдуулахгүйн тулд дуугүй болгоно.
    jest.spyOn(Logger.prototype, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('uses the HttpException status code and string message', () => {
    filter.catch(new BadRequestException('Буруу утга'), host);
    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({ statusCode: 400, message: 'Буруу утга' });
  });

  it('extracts message from an object-shaped exception response (class-validator array)', () => {
    filter.catch(new BadRequestException({ message: ['field must not be empty'] }), host);
    expect(json).toHaveBeenCalledWith({ statusCode: 400, message: ['field must not be empty'] });
  });

  it('defaults to 500 Internal Server Error for a non-HttpException (unexpected crash)', () => {
    filter.catch(new Error('unexpected'), host);
    expect(status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(json).toHaveBeenCalledWith({ statusCode: 500, message: 'Internal server error' });
  });

  /* SENTRY_DSN байхгүй үед ч 500 алдаа мөр үлдээх ёстой — эс тэгвээс dev орчинд
     алдаа ул мөргүй алга болно (2026-08-04-ний Prisma drift алдаа ингэж нуугдсан). */
  it('logs the real error and route for a non-HttpException even without SENTRY_DSN', () => {
    const logSpy = jest.spyOn(Logger.prototype, 'error');
    filter.catch(new Error('column "googleId" does not exist'), host);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy.mock.calls[0][0]).toContain('column "googleId" does not exist');
    expect(logSpy.mock.calls[0][0]).toContain('POST /api/auth/register');
  });

  it('does not log expected HttpExceptions (400/401/404 нь шуугиан үүсгэхгүй)', () => {
    const logSpy = jest.spyOn(Logger.prototype, 'error');
    filter.catch(new BadRequestException('Буруу утга'), host);
    expect(logSpy).not.toHaveBeenCalled();
  });
});
