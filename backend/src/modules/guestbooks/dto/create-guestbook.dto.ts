import { IsNotEmpty, IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateGuestbookDto {
  @IsNotEmpty({ message: 'Tên người gửi không được để trống' })
  @IsString({ message: 'Tên người gửi phải là chuỗi ký tự' })
  @MaxLength(100, { message: 'Tên người gửi tối đa 100 ký tự' })
  name: string;

  @IsNotEmpty({ message: 'Lời chúc không được để trống' })
  @IsString({ message: 'Lời chúc phải là chuỗi ký tự' })
  @MaxLength(1000, { message: 'Lời chúc tối đa 1000 ký tự' })
  message: string;

  @IsOptional()
  @IsString({ message: 'Ảnh đại diện phải là chuỗi URL' })
  avatar?: string;
}
