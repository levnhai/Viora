import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';

describe('HttpExceptionFilter', () => {
  let filter: HttpExceptionFilter;
  let mockResponse: any;
  let mockRequest: any;
  let mockArgumentsHost: any;

  beforeEach(() => {
    filter = new HttpExceptionFilter();
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockRequest = {
      method: 'POST',
      url: '/api/test',
    };
    mockArgumentsHost = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: () => mockResponse,
        getRequest: () => mockRequest,
      }),
    };
  });

  it('xử lý HttpException thông thường và trả về đúng statusCode', () => {
    const exception = new HttpException('Forbidden access', HttpStatus.FORBIDDEN);
    filter.catch(exception, mockArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.FORBIDDEN);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        statusCode: HttpStatus.FORBIDDEN,
        message: 'Forbidden access',
      }),
    );
  });

  it('trích xuất mảng lỗi validation của ValidationPipe', () => {
    const exception = new HttpException(
      {
        statusCode: 400,
        message: ['Tên không được để trống', 'Số điện thoại không hợp lệ'],
        error: 'Bad Request',
      },
      HttpStatus.BAD_REQUEST,
    );
    filter.catch(exception, mockArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Tên không được để trống',
        errors: ['Tên không được để trống', 'Số điện thoại không hợp lệ'],
      }),
    );
  });

  it('xử lý lỗi MongoDB duplicate key (code 11000) thành 409 Conflict', () => {
    const mongoError = {
      code: 11000,
      keyPattern: { email: 1 },
      message: 'E11000 duplicate key error',
    };
    filter.catch(mongoError, mockArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CONFLICT);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        statusCode: HttpStatus.CONFLICT,
        message: "Dữ liệu 'email' đã tồn tại trong hệ thống",
      }),
    );
  });

  it('xử lý lỗi Mongoose CastError thành 400 Bad Request', () => {
    const castError = {
      name: 'CastError',
      value: 'invalid-id-123',
    };
    filter.catch(castError, mockArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Giá trị "invalid-id-123" không phải là định dạng ID hợp lệ',
      }),
    );
  });

  it('xử lý lỗi bất ngờ ngoài dự kiến thành 500 Internal Server Error', () => {
    const unexpectedError = new Error('Database connection failed');
    filter.catch(unexpectedError, mockArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      }),
    );
  });
});
