import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Wedding, WeddingDocument } from '../wedding/schemas/wedding.schema';
import { Guestbook, GuestbookDocument } from '../wedding/schemas/guestbook.schema';
import { Guest, GuestDocument } from '../wedding/schemas/guest.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Wedding.name)
    private readonly weddingModel: Model<WeddingDocument>,
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
        
        // Count RSVPs (guests that are confirmed or declined, or count from guests collection via weddingId)
        rsvpCount = await this.guestModel.countDocuments({ 
          weddingId: wedding._id, 
          rsvpStatus: { $ne: 'pending' } 
        }).exec();

        // Count guestbook messages
        guestbookCount = await this.guestbookModel.countDocuments({ 
          weddingId: wedding._id 
        }).exec();
      }
    }

    return {
      user: {
        id: user._id,
        username: user.username,
        name: user.fullName || user.username.split('@')[0],
        phone: user.phone || '',
        email: user.email || (user.username.includes('@') ? user.username : ''),
        emailNotification: true,
        showOnHomepage: true,
        accountType: user.accountType || 'customer',
        securityType: 'Password',
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
    if (updateDto.name !== undefined) user.fullName = updateDto.name;
    if (updateDto.phone !== undefined) user.phone = updateDto.phone;

    const saved = await user.save();
    return {
      id: saved._id,
      username: saved.username,
      name: saved.fullName,
      phone: saved.phone,
      email: saved.email || (saved.username.includes('@') ? saved.username : ''),
      emailNotification: true,
      showOnHomepage: true,
      accountType: saved.accountType,
      securityType: 'Password',
    };
  }
}
