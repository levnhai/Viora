import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Guestbook, GuestbookDocument } from './schemas/guestbook.schema';
import { Wedding, WeddingDocument } from '../weddings/schemas/wedding.schema';

@Injectable()
export class GuestbooksService {
  constructor(
    @InjectModel(Guestbook.name)
    private readonly guestbookModel: Model<GuestbookDocument>,
    @InjectModel(Wedding.name)
    private readonly weddingModel: Model<WeddingDocument>,
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
    return gb.save();
  }

  async findGuestbook(slug: string): Promise<Guestbook[]> {
    const weddingId = await this.getWeddingIdBySlug(slug);
    return this.guestbookModel
      .find({ weddingId, isApproved: true, deletedAt: null })
      .sort({ createdAt: -1 })
      .exec();
  }
}
