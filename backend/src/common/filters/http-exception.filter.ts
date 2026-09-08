import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface ExceptionResponseBody {
  message?: string | string[];
  error?: string;
  statusCode?: number;
  [key: string]: unknown;
}

interface MongoDatabaseError {
  code?: number;
  keyPattern?: Record<string, unknown>;
  name?: string;
  value?: unknown;
  message?: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Đã xảy ra lỗi hệ thống, vui lòng thử lại sau!';
    let errors: unknown = undefined;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        const respObj = exceptionResponse as ExceptionResponseBody;
        if (Array.isArray(respObj.message)) {
          // Validation errors from ValidationPipe
          const firstMessage = respObj.message[0];
          message =
            typeof firstMessage === 'string'
              ? firstMessage
              : 'Dữ liệu không hợp lệ';
          errors = respObj.message;
        } else if (typeof respObj.message === 'string') {
          message = respObj.message;
        } else if (typeof respObj.error === 'string') {
          message = respObj.error;
        }
      }
    } else if (exception && typeof exception === 'object') {
      const err = exception as MongoDatabaseError;

      // MongoDB Duplicate Key Error (E11000)
      if (err.code === 11000) {
        statusCode = HttpStatus.CONFLICT;
        const keyPattern = err.keyPattern;
        const duplicateField = keyPattern
          ? Object.keys(keyPattern)[0]
          : undefined;
        message = duplicateField
          ? `Dữ liệu '${duplicateField}' đã tồn tại trong hệ thống`
          : 'Dữ liệu đã tồn tại trong hệ thống';
      }
      // Mongoose CastError (e.g. invalid ObjectId)
      else if (err.name === 'CastError') {
        statusCode = HttpStatus.BAD_REQUEST;
        const invalidVal =
          typeof err.value === 'string' || typeof err.value === 'number'
            ? String(err.value)
            : '';
        message = invalidVal
          ? `Giá trị "${invalidVal}" không phải là định dạng ID hợp lệ`
          : 'Giá trị không phải là định dạng ID hợp lệ';
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
    if (Number(statusCode) >= 500) {
      this.logger.error(
        `[${request.method}] ${request.url} - ${statusCode} - ${message}`,
        exception instanceof Error
          ? exception.stack
          : JSON.stringify(exception),
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
      ...(errors !== undefined ? { errors } : {}),
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
