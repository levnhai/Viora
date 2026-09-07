import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  TemplateRequest,
  TemplateRequestDocument,
} from './schemas/template-request.schema';

@Injectable()
export class TemplateRequestsService {
  constructor(
    @InjectModel(TemplateRequest.name)
    private readonly requestModel: Model<TemplateRequestDocument>,
  ) {}

  async create(
    data: Partial<TemplateRequest>,
  ): Promise<TemplateRequestDocument> {
    const created = new this.requestModel(data);
    return created.save();
  }

  async findAll(): Promise<TemplateRequestDocument[]> {
    return this.requestModel.find().sort({ createdAt: -1 }).exec();
  }

  async updateStatus(
    id: string,
    status: string,
  ): Promise<TemplateRequestDocument | null> {
    return this.requestModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
  }

  async remove(id: string): Promise<TemplateRequestDocument | null> {
    return this.requestModel.findByIdAndDelete(id).exec();
  }
}
