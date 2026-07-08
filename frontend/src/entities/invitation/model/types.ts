export interface WeddingEvent {
  title: string;
  time: string;
  date: string;
  locationName: string;
  address: string;
  mapUrl?: string;
}

export interface LoveStoryTimelineItem {
  year: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface GiftRegistryInfo {
  groomBankName?: string;
  groomAccountNumber?: string;
  groomAccountName?: string;
  groomQrUrl?: string;
  brideBankName?: string;
  brideAccountNumber?: string;
  brideAccountName?: string;
  brideQrUrl?: string;
}

export interface ContactInfo {
  groomPhone?: string;
  bridePhone?: string;
  email?: string;
}

export interface WeddingData {
  slug: string;
  templateId: string; // Refactored from number to string to match code (e.g. 'temp_1')
  groomName: string;
  groomFatherName?: string;
  groomMotherName?: string;
  brideName: string;
  brideFatherName?: string;
  brideMotherName?: string;
  weddingDate: string; // ISO string
  weddingTime?: string;
  events: WeddingEvent[];
  timeline: LoveStoryTimelineItem[];
  galleryImages: string[];
  giftInfo?: GiftRegistryInfo;
  contactInfo?: ContactInfo;
  groomShortName?: string;
  brideShortName?: string;
  groomTitle?: string;
  brideTitle?: string;
  displayOrder?: "groom_first" | "bride_first";
  isCoverImageVisible?: boolean;
  [key: string]: any;
}
