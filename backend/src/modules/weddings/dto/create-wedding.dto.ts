import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsDateString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class WeddingEventDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  time?: string;

  @IsOptional()
  @IsString()
  date?: string;

  @IsOptional()
  @IsString()
  locationName?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  mapUrl?: string;
}

class LoveStoryTimelineDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  year?: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  time?: string;

  @IsOptional()
  @IsString()
  icon?: string;
}

class GiftRegistryInfoDto {
  @IsOptional()
  @IsString()
  groomBankName?: string;

  @IsOptional()
  @IsString()
  groomAccountNumber?: string;

  @IsOptional()
  @IsString()
  groomAccountName?: string;

  @IsOptional()
  @IsString()
  groomQrUrl?: string;

  @IsOptional()
  @IsString()
  brideBankName?: string;

  @IsOptional()
  @IsString()
  brideAccountNumber?: string;

  @IsOptional()
  @IsString()
  brideAccountName?: string;

  @IsOptional()
  @IsString()
  brideQrUrl?: string;
}

class ContactInfoDto {
  @IsOptional()
  @IsString()
  groomPhone?: string;

  @IsOptional()
  @IsString()
  bridePhone?: string;

  @IsOptional()
  @IsString()
  email?: string;
}

export class CreateWeddingDto {
  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsNotEmpty({ message: 'Template ID không được để trống' })
  templateId: string | number;

  @IsNotEmpty()
  @IsString()
  groomName: string;

  @IsOptional()
  @IsString()
  groomFatherName?: string;

  @IsOptional()
  @IsString()
  groomMotherName?: string;

  @IsOptional()
  @IsString()
  groomRank?: string;

  @IsOptional()
  @IsString()
  groomAddress?: string;

  @IsNotEmpty()
  @IsString()
  brideName: string;

  @IsOptional()
  @IsString()
  brideFatherName?: string;

  @IsOptional()
  @IsString()
  brideMotherName?: string;

  @IsOptional()
  @IsString()
  brideRank?: string;

  @IsOptional()
  @IsString()
  brideAddress?: string;

  @IsNotEmpty()
  @IsDateString()
  weddingDate: string;

  @IsOptional()
  @IsString()
  weddingTime?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WeddingEventDto)
  events?: WeddingEventDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LoveStoryTimelineDto)
  timeline?: LoveStoryTimelineDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  galleryImages?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  deletedGalleryImages?: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => GiftRegistryInfoDto)
  giftInfo?: GiftRegistryInfoDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ContactInfoDto)
  contactInfo?: ContactInfoDto;

  @IsOptional()
  @IsString()
  customerEmail?: string;

  @IsOptional()
  @IsString()
  musicUrl?: string;

  @IsOptional()
  @IsString()
  source?: string;

  @IsOptional()
  templateConfig?: Record<string, any>;
}
