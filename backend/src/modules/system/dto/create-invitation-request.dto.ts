import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsEmail,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInvitationRequestDto {
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  @IsString({ message: 'Họ tên phải là chuỗi ký tự' })
  @MaxLength(100, { message: 'Họ tên tối đa 100 ký tự' })
  fullName: string;

  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  @IsString({ message: 'Số điện thoại phải là chuỗi ký tự' })
  @MaxLength(20, { message: 'Số điện thoại tối đa 20 ký tự' })
  phoneNumber: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email?: string;

  @IsNotEmpty({ message: 'ID mẫu thiệp không được để trống' })
  @Type(() => Number)
  @IsNumber({}, { message: 'ID mẫu thiệp phải là số' })
  templateId: number;

  @IsNotEmpty({ message: 'Tên mẫu thiệp không được để trống' })
  @IsString({ message: 'Tên mẫu thiệp phải là chuỗi ký tự' })
  templateName: string;

  @IsNotEmpty({ message: 'Gói dịch vụ không được để trống' })
  @IsString({ message: 'Gói dịch vụ phải là chuỗi ký tự' })
  planName: string;

  @IsOptional()
  weddingDate?: Date;

  @IsOptional()
  @IsString({ message: 'Ghi chú phải là chuỗi ký tự' })
  @MaxLength(1000, { message: 'Ghi chú tối đa 1000 ký tự' })
  notes?: string;
}
