import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Model, Types } from 'mongoose';
import sharp from 'sharp';
import { Media, MediaDocument } from './schemas/media.schema';
import { Wedding, WeddingDocument } from '../weddings/schemas/wedding.schema';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class MediaService {
  constructor(
    @InjectModel(Media.name) private readonly mediaModel: Model<MediaDocument>,
    @InjectModel(Wedding.name)
    private readonly weddingModel: Model<WeddingDocument>,
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
      const basePath =
        this.configService.get<string>('CLOUDINARY_FOLDER') || 'viora';
      let weddingSlug = slug;

      if (!weddingSlug && weddingId && Types.ObjectId.isValid(weddingId)) {
        const wedding = await this.weddingModel.findById(weddingId).exec();
        if (wedding?.slug) {
          weddingSlug = wedding.slug;
        }
      }

      // Tự động tối ưu hóa và nén ảnh nếu file vượt ngưỡng giới hạn của Cloudinary (~10MB)
      let fileToUpload = file;
      const CLOUDINARY_MAX_BYTES = 10 * 1024 * 1024; // 10,485,760 bytes
      const SAFETY_THRESHOLD_BYTES = 9.8 * 1024 * 1024; // 10,276,044 bytes

      if (file.mimetype && file.mimetype.startsWith('image/')) {
        try {
          // Nếu ảnh vượt ngưỡng 9.8MB, xử lý nén thông minh bảo toàn độ nét tối đa
          if (file.size > SAFETY_THRESHOLD_BYTES) {
            console.log(
              `[MediaService] Phát hiện ảnh dung lượng lớn (${(file.size / 1024 / 1024).toFixed(2)}MB). Đang tối ưu hóa 4K với Lanczos3...`,
            );

            let pipeline = sharp(file.buffer).rotate().withMetadata();
            const metadata = await pipeline.metadata();

            // Giữ độ phân giải cực cao 4K Ultra HD (3840px)
            const maxDimension = 3840;
            const needResize =
              (metadata.width && metadata.width > maxDimension) ||
              (metadata.height && metadata.height > maxDimension);

            if (needResize) {
              pipeline = pipeline.resize({
                width: maxDimension,
                height: maxDimension,
                fit: 'inside',
                withoutEnlargement: true,
                kernel: sharp.kernel.lanczos3,
              });

              // Bù nét vi mô tự nhiên sau khi resample
              pipeline = pipeline.sharpen({
                sigma: 0.8,
                m1: 0.5,
                m2: 2.0,
              });
            }

            // Chuyển sang WebP chất lượng cao (quality 93) - mắt người không phân biệt được với ảnh gốc
            let processedBuffer = await pipeline
              .webp({
                quality: 93,
                effort: 6,
                smartSubsample: true,
              })
              .toBuffer();

            // Nếu vẫn còn vượt ngưỡng (trường hợp ảnh cực kỳ phức tạp), hạ nhẹ xuống 88%
            if (processedBuffer.length > SAFETY_THRESHOLD_BYTES) {
              processedBuffer = await pipeline
                .webp({
                  quality: 88,
                  effort: 6,
                  smartSubsample: true,
                })
                .toBuffer();
            }

            console.log(
              `[MediaService] Tối ưu thành công: ${(file.size / 1024 / 1024).toFixed(2)}MB -> ${(processedBuffer.length / 1024 / 1024).toFixed(2)}MB (WebP 4K Sharp)`,
            );

            fileToUpload = {
              ...file,
              buffer: processedBuffer,
              size: processedBuffer.length,
              mimetype: 'image/webp',
            };
          }
        } catch (compressErr) {
          console.warn('Lỗi khi nén ảnh với sharp, tiếp tục dùng ảnh gốc:', compressErr);
        }
      }

      // Lưu trực tiếp vào thiepmoionline/[slug] (hoặc thiepmoionline/temp nếu chưa có slug)
      const folderName = weddingSlug
        ? `${basePath}/${weddingSlug}`
        : `${basePath}/temp`;
      const uploadResult = await this.cloudinaryService.uploadFile(
        fileToUpload,
        folderName,
      );

      const newMedia = new this.mediaModel({
        ownerId: new Types.ObjectId(ownerId),
        weddingId:
          weddingId && Types.ObjectId.isValid(weddingId)
            ? new Types.ObjectId(weddingId)
            : undefined,
        type: type,
        url: uploadResult.secure_url,
        size: uploadResult.bytes,
        mimeType: fileToUpload.mimetype,
        filename: uploadResult.public_id,
        order: 0,
      });

      return await newMedia.save();
    } catch (error: any) {
      console.error('Cloudinary upload error:', error);
      const errorMsg = error?.message || error?.error?.message || '';
      if (errorMsg.includes('File size too large')) {
        throw new BadRequestException(
          'Dung lượng tệp quá lớn (tối đa 10MB cho ảnh). Vui lòng chọn ảnh có dung lượng nhỏ hơn hoặc nén lại trước khi tải lên.',
        );
      }
      throw new InternalServerErrorException(
        errorMsg ? `Lỗi khi tải ảnh lên Cloudinary: ${errorMsg}` : 'Lỗi khi tải ảnh lên Cloudinary',
      );
    }
  }

  async getMediaByUser(ownerId: string, type?: string): Promise<Media[]> {
    const query: any = {
      ownerId: new Types.ObjectId(ownerId),
      deletedAt: null,
    };
    if (type) {
      query.type = type;
    }
    return this.mediaModel.find(query).sort({ order: 1, createdAt: -1 }).exec();
  }

  async getMediaByWedding(weddingId: string, type?: string): Promise<Media[]> {
    const query: any = {
      weddingId: new Types.ObjectId(weddingId),
      deletedAt: null,
    };
    if (type) {
      query.type = type;
    }
    return this.mediaModel.find(query).sort({ order: 1, createdAt: -1 }).exec();
  }

  async deleteMedia(id: string, ownerId: string): Promise<MediaDocument> {
    const media = await this.mediaModel.findOne({
      _id: new Types.ObjectId(id),
      ownerId: new Types.ObjectId(ownerId),
    });
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
