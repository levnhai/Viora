import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Commission, CommissionSchema } from "./schemas/commission.schema";
import {
  PayoutRequest,
  PayoutRequestSchema,
} from "./schemas/payout-request.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Commission.name, schema: CommissionSchema },
      { name: PayoutRequest.name, schema: PayoutRequestSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class AffiliateModule {}
