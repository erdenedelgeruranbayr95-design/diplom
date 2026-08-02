import { ArgumentsHost, BadRequestException, HttpStatus } from '@nestjs/common';
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
    host = { switchToHttp: () => ({ getResponse: () => ({ status }) }) } as unknown as ArgumentsHost;
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
});
