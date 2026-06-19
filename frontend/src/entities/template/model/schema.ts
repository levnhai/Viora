export type TemplateTier = "free" | "basic" | "premium";

export interface TemplateCustomField {
  key: string;
  type: "text" | "textarea" | "date" | "select";
  label: string;
  placeholder?: string;
  options?: { label: string; value: string }[]; // Dành cho dropdown select
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
  customFields?: TemplateCustomField[];
}

export interface TemplateConfig {
  id: number;
  name: string;
  style: string;
  preview: string;
  themeClass: string; // CSS class chứa định nghĩa màu sắc (VD: theme-pink)
  tier: TemplateTier;
  popular?: boolean;
  accentColor: string;
  schema: TemplateSchema;
}
