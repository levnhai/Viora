import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SystemController } from './system.controller';
import { SystemService } from './system.service';
import { AuditLog, AuditLogSchema } from './schemas/audit-log.schema';
import {
  InvitationRequest,
  InvitationRequestSchema,
} from './schemas/invitation-request.schema';
import {
  SystemSetting,
  SystemSettingSchema,
} from './schemas/system-setting.schema';

@Global() // Khai báo Global để các module khác dễ dàng import SystemService ghi logs
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AuditLog.name, schema: AuditLogSchema },
      { name: InvitationRequest.name, schema: InvitationRequestSchema },
      { name: SystemSetting.name, schema: SystemSettingSchema },
    ]),
  ],
  controllers: [SystemController],
  providers: [SystemService],
  exports: [SystemService, MongooseModule],
})
export class SystemModule {}
