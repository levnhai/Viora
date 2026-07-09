import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Template, TemplateDocument } from './schemas/template.schema';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectModel(Template.name)
    private readonly templateModel: Model<TemplateDocument>,
  ) {}

  async findAll(): Promise<TemplateDocument[]> {
    return this.templateModel.find({ deletedAt: null }).exec();
  }
}
