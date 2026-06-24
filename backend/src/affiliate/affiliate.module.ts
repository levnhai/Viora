import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Commission, CommissionSchema } from "./schemas/commission.schema";
import {
  PayoutRequest,
  PayoutRequestSchema,
} from "./schemas/payout-request.schema";
import { AffiliateLink, AffiliateLinkSchema } from "./schemas/affiliate-link.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Commission.name, schema: CommissionSchema },
      { name: PayoutRequest.name, schema: PayoutRequestSchema },
      { name: AffiliateLink.name, schema: AffiliateLinkSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class AffiliateModule {}
