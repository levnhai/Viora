import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Guestbook, GuestbookDocument } from './schemas/guestbook.schema';
import { Wedding, WeddingDocument } from '../weddings/schemas/wedding.schema';
import { SocketGateway } from '../socket/socket.gateway';
import { AppCacheService } from '../cache/cache.service';

@Injectable()
export class GuestbooksService {
  constructor(
    @InjectModel(Guestbook.name)
    private readonly guestbookModel: Model<GuestbookDocument>,
    @InjectModel(Wedding.name)
    private readonly weddingModel: Model<WeddingDocument>,
    private readonly socketGateway: SocketGateway,
    private readonly cacheService: AppCacheService,
  ) {}

  private async getWeddingIdBySlug(slug: string): Promise<Types.ObjectId> {
    const wedding = await this.weddingModel
      .findOne({ slug, deletedAt: null })
      .exec();
    if (!wedding) {
      throw new NotFoundException(
        `Wedding với slug "${slug}" không tồn tại hoặc đã bị xóa`,
      );
    }
    return wedding._id;
  }

  async createGuestbook(slug: string, guestbookData: any): Promise<Guestbook> {
    const weddingId = await this.getWeddingIdBySlug(slug);
    const gb = new this.guestbookModel({
      ...guestbookData,
      weddingId,
    });
    const savedGb = await gb.save();

    await this.cacheService.del(`guestbook:${slug}`);

    // Notify clients in realtime
    this.socketGateway.notifyWeddingUpdate(slug, 'guestbook-updated');

    return savedGb;
  }

  async findGuestbook(slug: string): Promise<Guestbook[]> {
    const cacheKey = `guestbook:${slug}`;
    const cached = await this.cacheService.get<any>(cacheKey);
    if (cached) return cached;

    const weddingId = await this.getWeddingIdBySlug(slug);
    const result = await this.guestbookModel
      .find({ weddingId, isApproved: true, deletedAt: null })
      .sort({ createdAt: -1 })
      .exec();

    await this.cacheService.set(cacheKey, result, 60000);
    return result;
  }

  async deleteGuestbook(slug: string, id: string): Promise<any> {
    const weddingId = await this.getWeddingIdBySlug(slug);
    const result = await this.guestbookModel
      .findOneAndUpdate(
        { _id: id, weddingId, deletedAt: null },
        { deletedAt: new Date() },
        { returnDocument: 'after' },
      )
      .exec();

    if (!result) {
      throw new NotFoundException(
        `Lời chúc với ID "${id}" không tồn tại hoặc đã bị xóa`,
      );
    }

    await this.cacheService.del(`guestbook:${slug}`);

    // Notify clients in realtime
    this.socketGateway.notifyWeddingUpdate(slug, 'guestbook-updated');

    return result;
  }
}
