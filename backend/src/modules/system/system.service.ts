import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AuditLog, AuditLogDocument } from './schemas/audit-log.schema';
import {
  InvitationRequest,
  InvitationRequestDocument,
} from './schemas/invitation-request.schema';
import {
  SystemSetting,
  SystemSettingDocument,
} from './schemas/system-setting.schema';

@Injectable()
export class SystemService {
  constructor(
    @InjectModel(AuditLog.name)
    private readonly auditLogModel: Model<AuditLogDocument>,
    @InjectModel(InvitationRequest.name)
    private readonly requestModel: Model<InvitationRequestDocument>,
    @InjectModel(SystemSetting.name)
    private readonly settingModel: Model<SystemSettingDocument>,
  ) {}

  // ================= SYSTEM AUDIT LOGS =================
  async logAction(
    action: string,
    resourceType: string,
    resourceId?: string,
    userId?: string,
    ip?: string,
    userAgent?: string,
    details?: any,
  ): Promise<AuditLog> {
    const log = new this.auditLogModel({
      userId: userId ? new Types.ObjectId(userId) : undefined,
      action,
      resourceType,
      resourceId,
      ip,
      userAgent,
      details,
    });
    return log.save();
  }

  async getAuditLogs(limit = 100, skip = 0): Promise<AuditLog[]> {
    return this.auditLogModel
      .find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .exec();
  }

  // ================= INVITATION REQUESTS =================
  async createRequest(data: any): Promise<InvitationRequest> {
    const req = new this.requestModel(data);
    return req.save();
  }

  async getRequests(): Promise<InvitationRequest[]> {
    return this.requestModel.find().sort({ createdAt: -1 }).exec();
  }

  async updateRequestStatus(
    id: string,
    status: string,
  ): Promise<InvitationRequest> {
    const req = await this.requestModel
      .findByIdAndUpdate(id, { status }, { returnDocument: 'after' })
      .exec();
    if (!req) {
      throw new NotFoundException(`Request with ID "${id}" not found`);
    }
    return req;
  }

  // ================= SYSTEM SETTINGS =================
  async getSetting(key: string, defaultValue?: any): Promise<any> {
    const setting = await this.settingModel.findOne({ key }).exec();
    return setting ? setting.value : defaultValue;
  }

  async setSetting(key: string, value: any): Promise<SystemSetting> {
    return this.settingModel
      .findOneAndUpdate(
        { key },
        { value },
        { upsert: true, returnDocument: 'after' },
      )
      .exec();
  }
}
