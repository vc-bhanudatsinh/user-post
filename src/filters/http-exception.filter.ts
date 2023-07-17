import {
  ArgumentsHost,
  ExceptionFilter,
  Catch,
  HttpException,
} from '@nestjs/common';
import * as responseHandler from '../common/response';
import { Response } from 'express';
import * as httpStatus from 'http-status';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log(' \n httpexception is working ---- ', exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? (exception as HttpException).getStatus()
        : httpStatus.INTERNAL_SERVER_ERROR;
    if (exception)
      response
        .status(status)
        .send(responseHandler.error(status, exception.message));
  }
}
