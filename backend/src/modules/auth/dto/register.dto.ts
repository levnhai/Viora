import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Tên đăng nhập hoặc email',
  })
  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống' })
  @IsString()
  username: string;

  @ApiProperty({
    example: '123456',
    description: 'Mật khẩu tài khoản',
  })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @IsString()
  password: string;

  @ApiPropertyOptional({
    example: 'Nguyễn Văn A',
    description: 'Họ và tên',
  })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional({
    example: '0987654321',
    description: 'Số điện thoại',
  })
  @IsOptional()
  @IsString()
  phone?: string;
}
