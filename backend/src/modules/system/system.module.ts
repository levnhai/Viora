import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SystemController } from './system.controller';
import { SystemService } from './system.service';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { AuditLog, AuditLogSchema } from './schemas/audit-log.schema';
import {
  InvitationRequest,
  InvitationRequestSchema,
} from './schemas/invitation-request.schema';
import {
  SystemSetting,
  SystemSettingSchema,
} from './schemas/system-setting.schema';

// Import Schemas for Dashboard Aggregations
import { Wedding, WeddingSchema } from '../weddings/schemas/wedding.schema';
import { Guest, GuestSchema } from '../guests/schemas/guest.schema';
import { User, UserSchema } from '../users/schemas/user.schema';

@Global() // Khai báo Global để các module khác dễ dàng import SystemService ghi logs
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AuditLog.name, schema: AuditLogSchema },
      { name: InvitationRequest.name, schema: InvitationRequestSchema },
      { name: SystemSetting.name, schema: SystemSettingSchema },
      { name: Wedding.name, schema: WeddingSchema },
      { name: Guest.name, schema: GuestSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [SystemController, DashboardController],
  providers: [SystemService, DashboardService],
  exports: [SystemService, MongooseModule],
})
export class SystemModule {}
