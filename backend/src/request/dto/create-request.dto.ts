import { IsNotEmpty, IsString, IsOptional, IsEmail, IsNumber, IsDateString } from 'class-validator';

export class CreateRequestDto {
  @IsNotEmpty({ message: 'Họ và tên không được để trống' })
  @IsString()
  fullName: string;

  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  email?: string;

  @IsNotEmpty()
  @IsNumber()
  templateId: number;

  @IsNotEmpty()
  @IsString()
  templateName: string;

  @IsNotEmpty()
  @IsString()
  planName: string;

  @IsOptional()
  @IsDateString({}, { message: 'Ngày cưới dự kiến không đúng định dạng ngày tháng' })
  weddingDate?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
