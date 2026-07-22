import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Model, Types } from 'mongoose';
import { Media, MediaDocument } from './schemas/media.schema';
import { Wedding, WeddingDocument } from '../weddings/schemas/wedding.schema';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class MediaService {
  constructor(
    @InjectModel(Media.name) private readonly mediaModel: Model<MediaDocument>,
    @InjectModel(Wedding.name) private readonly weddingModel: Model<WeddingDocument>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly configService: ConfigService,
  ) {}

  async uploadMedia(
    file: Express.Multer.File,
    ownerId: string,
    type: string,
    weddingId?: string,
    slug?: string,
  ): Promise<Media> {
    try {
      const basePath = this.configService.get<string>('CLOUDINARY_FOLDER') || 'viora';
      let weddingSlug = slug;

      if (!weddingSlug && weddingId && Types.ObjectId.isValid(weddingId)) {
        const wedding = await this.weddingModel.findById(weddingId).exec();
        if (wedding?.slug) {
          weddingSlug = wedding.slug;
        }
      }

      // Lưu trực tiếp vào thiepmoionline/[slug] (hoặc thiepmoionline/temp nếu chưa có slug)
      const folderName = weddingSlug ? `${basePath}/${weddingSlug}` : `${basePath}/temp`;
      const uploadResult = await this.cloudinaryService.uploadFile(file, folderName);

      const newMedia = new this.mediaModel({
        ownerId: new Types.ObjectId(ownerId),
        weddingId: weddingId && Types.ObjectId.isValid(weddingId) ? new Types.ObjectId(weddingId) : undefined,
        type: type,
        url: uploadResult.secure_url,
        size: uploadResult.bytes,
        mimeType: file.mimetype,
        filename: uploadResult.public_id,
        order: 0,
      });

      return await newMedia.save();
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw new InternalServerErrorException('Lỗi khi tải ảnh lên Cloudinary');
    }
  }

  async getMediaByUser(ownerId: string, type?: string): Promise<Media[]> {
    const query: any = { ownerId: new Types.ObjectId(ownerId), deletedAt: null };
    if (type) {
      query.type = type;
    }
    return this.mediaModel.find(query).sort({ order: 1, createdAt: -1 }).exec();
  }

  async getMediaByWedding(weddingId: string, type?: string): Promise<Media[]> {
    const query: any = { weddingId: new Types.ObjectId(weddingId), deletedAt: null };
    if (type) {
      query.type = type;
    }
    return this.mediaModel.find(query).sort({ order: 1, createdAt: -1 }).exec();
  }

  async deleteMedia(id: string, ownerId: string): Promise<any> {
    const media = await this.mediaModel.findOne({ _id: new Types.ObjectId(id), ownerId: new Types.ObjectId(ownerId) });
    if (!media) {
      throw new InternalServerErrorException('Không tìm thấy ảnh');
    }

    if (media.filename) {
      await this.cloudinaryService.deleteFile(media.filename);
    }
    
    // Xóa cứng (hard delete) hoặc mềm (soft delete)
    // Ở đây ta xóa cứng hoặc xóa mềm tuỳ yêu cầu. Schema có deletedAt.
    media.deletedAt = new Date();
    return await media.save();
  }
}
