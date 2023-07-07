import {
  ArgumentsHost,
  ExceptionFilter,
  Catch,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('httpexception is working ---- ', exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const res = exception.getResponse() as object;
    if (exception)
      response.status(status).send({
        ...res,
        timeStamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
