import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Đã xảy ra lỗi hệ thống, vui lòng thử lại sau!';
    let errors: any = undefined;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        const respObj = exceptionResponse as Record<string, any>;
        if (Array.isArray(respObj.message)) {
          // Validation errors from ValidationPipe
          message = respObj.message[0] || 'Dữ liệu gửi lên không hợp lệ';
          errors = respObj.message;
        } else if (typeof respObj.message === 'string') {
          message = respObj.message;
        } else if (respObj.error) {
          message = respObj.error;
        }
      }
    } else if (exception && typeof exception === 'object') {
      const err = exception as any;

      // MongoDB Duplicate Key Error (E11000)
      if (err.code === 11000) {
        statusCode = HttpStatus.CONFLICT;
        const duplicateField = Object.keys(err.keyPattern || {})[0];
        message = duplicateField
          ? `Dữ liệu '${duplicateField}' đã tồn tại trong hệ thống`
          : 'Dữ liệu đã tồn tại trong hệ thống';
      }
      // Mongoose CastError (e.g. invalid ObjectId)
      else if (err.name === 'CastError') {
        statusCode = HttpStatus.BAD_REQUEST;
        message = `Giá trị "${err.value}" không phải là định dạng ID hợp lệ`;
      }
      // Mongoose ValidationError
      else if (err.name === 'ValidationError') {
        statusCode = HttpStatus.BAD_REQUEST;
        message = err.message || 'Dữ liệu không đáp ứng yêu cầu hợp lệ';
      } else if (err.message && process.env.NODE_ENV !== 'production') {
        message = err.message;
      }
    }

    // Log the error for debugging
    if (statusCode >= 500) {
      this.logger.error(
        `[${request.method}] ${request.url} - ${statusCode} - ${message}`,
        exception instanceof Error ? exception.stack : JSON.stringify(exception),
      );
    } else {
      this.logger.warn(
        `[${request.method}] ${request.url} - ${statusCode} - ${message}`,
      );
    }

    response.status(statusCode).json({
      success: false,
      statusCode,
      message,
      ...(errors ? { errors } : {}),
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
