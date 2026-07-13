import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  UseGuards,
  Req,
  Get,
  Query,
  Param,
  Delete,
  BadRequestException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('media')
@UseGuards(AuthGuard)
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
    @Body('type') type: string,
    @Body('weddingId') weddingId?: string,
  ) {
    if (!file) {
      throw new BadRequestException('Vui lòng chọn file để upload');
    }
    
    // type có thể là 'gallery', 'cover', 'avatar',...
    const mediaType = type || 'gallery';
    const ownerId = req.user._id || req.user.id;

    return this.mediaService.uploadMedia(file, ownerId, mediaType, weddingId);
  }

  @Get('my-media')
  async getMyMedia(@Req() req: any, @Query('type') type?: string) {
    const ownerId = req.user._id || req.user.id;
    return this.mediaService.getMediaByUser(ownerId, type);
  }

  @Get('wedding/:weddingId')
  async getWeddingMedia(
    @Param('weddingId') weddingId: string,
    @Query('type') type?: string,
  ) {
    return this.mediaService.getMediaByWedding(weddingId, type);
  }

  @Delete(':id')
  async deleteMedia(@Param('id') id: string, @Req() req: any) {
    const ownerId = req.user._id || req.user.id;
    return this.mediaService.deleteMedia(id, ownerId);
  }
}
