import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InvitationRequest, InvitationRequestDocument } from './schemas/request.schema';
import { CreateRequestDto } from './dto/create-request.dto';

@Injectable()
export class RequestService {
  constructor(
    @InjectModel(InvitationRequest.name)
    private readonly requestModel: Model<InvitationRequestDocument>,
  ) {}

  async create(createDto: CreateRequestDto): Promise<InvitationRequest> {
    const createdRequest = new this.requestModel({
      ...createDto,
      weddingDate: createDto.weddingDate ? new Date(createDto.weddingDate) : undefined,
    });
    return createdRequest.save();
  }

  async findAll(): Promise<InvitationRequest[]> {
    return this.requestModel.find().sort({ createdAt: -1 }).exec();
  }
}
