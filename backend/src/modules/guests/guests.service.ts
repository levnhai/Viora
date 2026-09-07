import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Guest, GuestDocument } from './schemas/guest.schema';
import { Wedding, WeddingDocument } from '../weddings/schemas/wedding.schema';
import { SocketGateway } from '../socket/socket.gateway';
import { AppCacheService } from '../cache/cache.service';

function escapeRegex(text: string): string {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

@Injectable()
export class GuestsService {
  constructor(
    @InjectModel(Guest.name)
    private readonly guestModel: Model<GuestDocument>,
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

  // RSVP methods (Lưu trực tiếp vào bảng Guest)
  async createRsvp(slug: string, rsvpData: any): Promise<Guest> {
    const weddingId = await this.getWeddingIdBySlug(slug);
    const normalizedName = rsvpData.name.trim().toLowerCase();
    const escapedName = escapeRegex(normalizedName);

    let savedGuest: Guest;
    const guest = await this.guestModel
      .findOne({
        weddingId,
        name: new RegExp(`^${escapedName}$`, 'i'),
        deletedAt: null,
      })
      .exec();

    if (guest) {
      guest.rsvpStatus = rsvpData.attend === 'yes' ? 'confirmed' : 'declined';
      guest.guestsCount =
        rsvpData.attend === 'yes' ? Number(rsvpData.guests || 1) : 0;
      guest.note = rsvpData.message;
      savedGuest = await guest.save();
    } else {
      const newGuest = new this.guestModel({
        weddingId,
        name: rsvpData.name,
        rsvpStatus: rsvpData.attend === 'yes' ? 'confirmed' : 'declined',
        guestsCount:
          rsvpData.attend === 'yes' ? Number(rsvpData.guests || 1) : 0,
        note: rsvpData.message,
      });
      savedGuest = await newGuest.save();
    }

    // Invalidate cache render thiệp để cập nhật số lượng khách xác nhận mới
    await this.cacheService.del(`wedding:render:${slug}`);

    // Notify clients in realtime
    this.socketGateway.notifyWeddingUpdate(slug, 'guests-updated');

    return savedGuest;
  }

  async findRsvps(slug: string): Promise<Guest[]> {
    const weddingId = await this.getWeddingIdBySlug(slug);
    return this.guestModel
      .find({
        weddingId,
        rsvpStatus: { $ne: 'pending' },
        deletedAt: null,
      })
      .sort({ updatedAt: -1 })
      .exec();
  }

  // GUEST LIST CRUD
  async createGuest(slug: string, guestData: any): Promise<Guest> {
    const weddingId = await this.getWeddingIdBySlug(slug);
    const guest = new this.guestModel({
      ...guestData,
      weddingId,
    });
    const saved = await guest.save();

    // Notify clients in realtime
    this.socketGateway.notifyWeddingUpdate(slug, 'guests-updated');

    return saved;
  }

  async findGuests(slug: string): Promise<Guest[]> {
    const weddingId = await this.getWeddingIdBySlug(slug);
    return this.guestModel
      .find({ weddingId, deletedAt: null })
      .sort({ createdAt: -1 })
      .exec();
  }

  async updateGuest(slug: string, id: string, guestData: any): Promise<Guest> {
    const weddingId = await this.getWeddingIdBySlug(slug);
    const guest = await this.guestModel
      .findOneAndUpdate({ _id: id, weddingId, deletedAt: null }, guestData, {
        returnDocument: 'after',
      })
      .exec();
    if (!guest) {
      throw new NotFoundException(
        `Guest với ID "${id}" không tồn tại hoặc đã bị xóa`,
      );
    }

    // Notify clients in realtime
    this.socketGateway.notifyWeddingUpdate(slug, 'guests-updated');

    return guest;
  }

  async deleteGuest(slug: string, id: string): Promise<any> {
    const weddingId = await this.getWeddingIdBySlug(slug);
    // Thực hiện Soft Delete
    const result = await this.guestModel
      .findOneAndUpdate(
        { _id: id, weddingId, deletedAt: null },
        { deletedAt: new Date() },
        { returnDocument: 'after' },
      )
      .exec();
    if (!result) {
      throw new NotFoundException(
        `Guest với ID "${id}" không tồn tại hoặc đã bị xóa`,
      );
    }

    // Notify clients in realtime
    this.socketGateway.notifyWeddingUpdate(slug, 'guests-updated');

    return { success: true };
  }
}
