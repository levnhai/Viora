import { IsNotEmpty, IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateTemplateRequestDto {
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  @IsString({ message: 'Họ tên phải là chuỗi ký tự' })
  @MaxLength(100, { message: 'Họ tên tối đa 100 ký tự' })
  name: string;

  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  @IsString({ message: 'Số điện thoại phải là chuỗi ký tự' })
  @MaxLength(20, { message: 'Số điện thoại tối đa 20 ký tự' })
  phone: string;

  @IsOptional()
  @IsString({ message: 'Ghi chú phải là chuỗi ký tự' })
  @MaxLength(1000, { message: 'Ghi chú tối đa 1000 ký tự' })
  notes?: string;

  @IsOptional()
  @IsString({ message: 'Mã mẫu thiệp phải là chuỗi ký tự' })
  @MaxLength(100, { message: 'Mã mẫu thiệp tối đa 100 ký tự' })
  templateCode?: string;

  @IsOptional()
  @IsString({ message: 'Tên mẫu thiệp phải là chuỗi ký tự' })
  @MaxLength(200, { message: 'Tên mẫu thiệp tối đa 200 ký tự' })
  templateName?: string;
}
