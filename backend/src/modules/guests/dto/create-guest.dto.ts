import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsIn,
  IsNumber,
  Min,
  Max,
  MaxLength,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateGuestDto {
  @IsNotEmpty({ message: 'Tên khách mời không được để trống' })
  @IsString({ message: 'Tên khách mời phải là chuỗi ký tự' })
  @MaxLength(100, { message: 'Tên khách mời tối đa 100 ký tự' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Số điện thoại phải là chuỗi ký tự' })
  @MaxLength(20, { message: 'Số điện thoại tối đa 20 ký tự' })
  phone?: string;

  @IsOptional()
  @IsString({ message: 'Mối quan hệ phải là chuỗi ký tự' })
  @MaxLength(50, { message: 'Mối quan hệ tối đa 50 ký tự' })
  relationship?: string;

  @IsOptional()
  @IsIn(['pending', 'confirmed', 'declined'], {
    message: 'Trạng thái RSVP không hợp lệ',
  })
  rsvpStatus?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Số lượng khách phải là số' })
  @Min(0, { message: 'Số lượng khách tối thiểu là 0' })
  @Max(50, { message: 'Số lượng khách tối đa là 50' })
  guestsCount?: number;

  @IsOptional()
  @IsString({ message: 'Ghi chú phải là chuỗi ký tự' })
  @MaxLength(500, { message: 'Ghi chú tối đa 500 ký tự' })
  note?: string;

  @IsOptional()
  @IsString({ message: 'Mã bàn tiệc phải là chuỗi ký tự' })
  @MaxLength(50, { message: 'Mã bàn tiệc tối đa 50 ký tự' })
  tableNumber?: string;

  @IsOptional()
  @IsBoolean({ message: 'Trạng thái check-in phải là boolean' })
  checkedIn?: boolean;
}
