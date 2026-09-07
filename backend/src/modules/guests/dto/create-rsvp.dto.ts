import {
  IsNotEmpty,
  IsString,
  IsIn,
  IsOptional,
  IsNumber,
  Min,
  Max,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRsvpDto {
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  @IsString({ message: 'Họ tên phải là chuỗi ký tự' })
  @MaxLength(100, { message: 'Họ tên tối đa 100 ký tự' })
  name: string;

  @IsNotEmpty({ message: 'Trạng thái tham dự không được để trống' })
  @IsIn(['yes', 'no'], {
    message: 'Trạng thái tham dự phải là "yes" hoặc "no"',
  })
  attend: 'yes' | 'no';

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Số lượng khách phải là số' })
  @Min(0, { message: 'Số lượng khách tối thiểu là 0' })
  @Max(20, { message: 'Số lượng khách tối đa là 20' })
  guests?: number;

  @IsOptional()
  @IsString({ message: 'Lời nhắn phải là chuỗi ký tự' })
  @MaxLength(500, { message: 'Lời nhắn tối đa 500 ký tự' })
  message?: string;
}
