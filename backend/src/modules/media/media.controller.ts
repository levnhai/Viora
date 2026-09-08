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
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { AuthGuard } from '../auth/auth.guard';
import type { AuthenticatedRequest } from '../../common/interfaces/request.interface';

@Controller('media')
@UseGuards(AuthGuard)
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: AuthenticatedRequest,
    @Body('type') type: string,
    @Body('weddingId') weddingId?: string,
    @Body('slug') slug?: string,
  ) {
    if (!file) {
      throw new BadRequestException('Vui lòng chọn file để upload');
    }

    // type có thể là 'gallery', 'cover', 'avatar',...
    const mediaType = type || 'gallery';
    const ownerId = req.user?.id || req.user?._id;
    if (!ownerId) {
      throw new UnauthorizedException('Không tìm thấy thông tin người dùng');
    }

    return this.mediaService.uploadMedia(
      file,
      ownerId,
      mediaType,
      weddingId,
      slug,
    );
  }

  @Get('my-media')
  async getMyMedia(
    @Req() req: AuthenticatedRequest,
    @Query('type') type?: string,
  ) {
    const ownerId = req.user?.id || req.user?._id;
    if (!ownerId) {
      throw new UnauthorizedException('Không tìm thấy thông tin người dùng');
    }
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
  async deleteMedia(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    const ownerId = req.user?.id || req.user?._id;
    if (!ownerId) {
      throw new UnauthorizedException('Không tìm thấy thông tin người dùng');
    }
    return this.mediaService.deleteMedia(id, ownerId);
  }
}
