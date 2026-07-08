import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  passwordHash: string;
  role: "ADMIN" | "CUSTOMER";
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["ADMIN", "CUSTOMER"], default: "CUSTOMER" },
  createdAt: { type: Date, default: Date.now },
});

// Avoid OverwriteModelError
export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);


const WeddingEventSchema = new Schema({
  title: { type: String },
  time: { type: String },
  date: { type: String },
  locationName: { type: String },
  address: { type: String },
  mapUrl: { type: String },
});

const GiftRegistryInfoSchema = new Schema({
  groomBankName: String,
  groomAccountNumber: String,
  groomAccountName: String,
  groomQrUrl: String,
  brideBankName: String,
  brideAccountNumber: String,
  brideAccountName: String,
  brideQrUrl: String,
});

export interface IWedding extends Document {
  customerId: mongoose.Types.ObjectId;
  slug: string;
  templateId: string;
  groomName: string;
  brideName: string;
  weddingDate: string;
  events: any[];
  galleryImages: string[];
  giftInfo?: any;
  createdAt: Date;
}

const WeddingSchema = new Schema<IWedding>({
  customerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  slug: { type: String, required: true, unique: true },
  templateId: { type: String, required: true },
  groomName: { type: String, required: true },
  brideName: { type: String, required: true },
  weddingDate: { type: String, required: true },
  events: [WeddingEventSchema],
  galleryImages: [{ type: String }],
  giftInfo: GiftRegistryInfoSchema,
  createdAt: { type: Date, default: Date.now },
}, { strict: false }); // Allow other dynamic fields like groomFatherName

export const Wedding = mongoose.models.Wedding || mongoose.model<IWedding>("Wedding", WeddingSchema);


export interface IGuestbook extends Document {
  weddingId: mongoose.Types.ObjectId;
  senderName: string;
  content: string;
  status: "PENDING" | "APPROVED" | "HIDDEN";
  createdAt: Date;
}

const GuestbookSchema = new Schema<IGuestbook>({
  weddingId: { type: Schema.Types.ObjectId, ref: "Wedding", required: true },
  senderName: { type: String, required: true },
  content: { type: String, required: true },
  status: { type: String, enum: ["PENDING", "APPROVED", "HIDDEN"], default: "PENDING" },
  createdAt: { type: Date, default: Date.now },
});

export const Guestbook = mongoose.models.Guestbook || mongoose.model<IGuestbook>("Guestbook", GuestbookSchema);
