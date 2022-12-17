import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class AuthExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (
      exception instanceof UnauthorizedException
      || exception instanceof ForbiddenException
    ) {
      response.redirect('/petugas/login');
    } else if (exception instanceof BadRequestException) {
      response.redirect('/petugas/daftar');
    } else {
      response.redirect('/error');
    }
  }
}
