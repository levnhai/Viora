import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Wedding, WeddingDocument } from '../wedding/schemas/wedding.schema';
import { Rsvp, RsvpDocument } from '../wedding/schemas/rsvp.schema';
import { Guestbook, GuestbookDocument } from '../wedding/schemas/guestbook.schema';
import { Guest, GuestDocument } from '../wedding/schemas/guest.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Wedding.name)
    private readonly weddingModel: Model<WeddingDocument>,
    @InjectModel(Rsvp.name)
    private readonly rsvpModel: Model<RsvpDocument>,
    @InjectModel(Guestbook.name)
    private readonly guestbookModel: Model<GuestbookDocument>,
    @InjectModel(Guest.name)
    private readonly guestModel: Model<GuestDocument>,
  ) {}

  async getProfile(userId: string) {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('Người dùng không tồn tại!');
    }

    // Dynamic stats calculations
    let weddingCount = 0;
    let viewCount = 0;
    let rsvpCount = 0;
    let guestbookCount = 0;

    if (user.weddingSlug) {
      weddingCount = 1;
      
      // Fetch the wedding to get view count
      const wedding = await this.weddingModel.findOne({ slug: user.weddingSlug }).exec();
      if (wedding) {
        viewCount = wedding.views || 0;
      }

      // Count RSVPs
      rsvpCount = await this.rsvpModel.countDocuments({ weddingSlug: user.weddingSlug }).exec();

      // Count guestbook messages
      guestbookCount = await this.guestbookModel.countDocuments({ weddingSlug: user.weddingSlug }).exec();
    }

    return {
      user: {
        id: user._id,
        username: user.username,
        name: user.name || user.username.split('@')[0],
        phone: user.phone || '',
        email: user.email || (user.username.includes('@') ? user.username : ''),
        emailNotification: user.emailNotification !== false,
        showOnHomepage: user.showOnHomepage !== false,
        accountType: user.accountType || 'user',
        securityType: user.securityType || 'Magic link',
        createdAt: user['createdAt'] || new Date(),
      },
      stats: {
        weddingCount,
        viewCount,
        rsvpCount,
        guestbookCount,
      },
    };
  }

  async updateProfile(userId: string, updateDto: any) {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('Người dùng không tồn tại!');
    }

    // Allowed updates
    if (updateDto.name !== undefined) user.name = updateDto.name;
    if (updateDto.phone !== undefined) user.phone = updateDto.phone;
    // Email is read-only per requirement, so do not update email from input.
    if (updateDto.emailNotification !== undefined) user.emailNotification = updateDto.emailNotification;
    if (updateDto.showOnHomepage !== undefined) user.showOnHomepage = updateDto.showOnHomepage;

    const saved = await user.save();
    return {
      id: saved._id,
      username: saved.username,
      name: saved.name,
      phone: saved.phone,
      email: saved.email || (saved.username.includes('@') ? saved.username : ''),
      emailNotification: saved.emailNotification,
      showOnHomepage: saved.showOnHomepage,
      accountType: saved.accountType,
      securityType: saved.securityType,
    };
  }
}
