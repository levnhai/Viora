import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News, NewsDocument } from './schemas/news.schema';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News.name)
    private readonly newsModel: Model<NewsDocument>,
  ) {}

  async create(data: any): Promise<News> {
    const post = new this.newsModel(data);
    return post.save();
  }

  async findAll(): Promise<News[]> {
    return this.newsModel
      .find({ deletedAt: null })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(slug: string): Promise<News> {
    const post = await this.newsModel.findOne({ slug, deletedAt: null }).exec();
    if (!post) {
      throw new NotFoundException(`Bài viết với slug "${slug}" không tồn tại`);
    }
    return post;
  }

  async update(slug: string, updateData: any): Promise<News> {
    const post = await this.newsModel
      .findOneAndUpdate({ slug, deletedAt: null }, updateData, {
        returnDocument: 'after',
      })
      .exec();
    if (!post) {
      throw new NotFoundException(`Bài viết với slug "${slug}" không tồn tại`);
    }
    return post;
  }

  async remove(slug: string): Promise<any> {
    const post = await this.newsModel
      .findOneAndUpdate(
        { slug, deletedAt: null },
        { deletedAt: new Date() },
        { returnDocument: 'after' },
      )
      .exec();
    if (!post) {
      throw new NotFoundException(`Bài viết với slug "${slug}" không tồn tại`);
    }
    return { success: true, message: 'Xóa bài viết thành công' };
  }
}
