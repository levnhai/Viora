export type TemplateTier = "free" | "basic" | "premium";

export interface TemplateCustomField {
  key: string;
  type: "text" | "textarea" | "date" | "select";
  label: string;
  placeholder?: string;
  options?: { label: string; value: string }[];
}

export interface TemplateSchema {
  cover: {
    hasBackgroundVideo: boolean;
    hasCoverImage: boolean;
  };
  spotlight: {
    hasGroomBrideImages: boolean;
    showTitles: boolean;
  };
  timeline: {
    enabled: boolean;
  };
  gallery: {
    maxImages: number;
  };
  story: {
    enabled: boolean;
  };
  rsvp: {
    enabled: boolean;
  };
  gift: {
    enabled: boolean;
  };
  customFields?: TemplateCustomField[];
}

export interface TemplateConfig {
  id: number;
  code: string;
  name: string;
  style: string;
  preview: string;
  themeClass: string;
  tier: TemplateTier;
  price: number;
  popular?: boolean;
  accentColor: string;
  schema: TemplateSchema;
  envelopeKey?: "royal" | "minimal" | "lavender";
  timelineKey?: "vertical" | "slider" | "simple";
  galleryKey?: "masonry" | "grid";
}
