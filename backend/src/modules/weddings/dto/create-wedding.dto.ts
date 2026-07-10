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
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  time: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  locationName: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  mapUrl?: string;
}

class LoveStoryTimelineDto {
  @IsNotEmpty()
  @IsString()
  year: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
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

  @IsNotEmpty()
  @IsNumber()
  templateId: number;

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
}
