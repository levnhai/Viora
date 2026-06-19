import { TemplateConfig } from "./schema";

export const TEMPLATES: TemplateConfig[] = [
  {
    id: 1,
    name: "Tinh Giản",
    style: "Hiện đại",
    preview: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop&auto=format",
    themeClass: "theme-modern",
    tier: "free",
    accentColor: "#111827",
    schema: {
      cover: { hasBackgroundVideo: false, hasCoverImage: true },
      spotlight: { hasGroomBrideImages: false, showTitles: false },
      timeline: { enabled: false },
      gallery: { maxImages: 3 },
    },
  },
  {
    id: 2,
    name: "Hồng Sương Mai",
    style: "Lãng mạn",
    preview: "https://images.unsplash.com/photo-1764423805989-ec426dfb8de8?w=600&h=800&fit=crop&auto=format",
    themeClass: "theme-pink",
    tier: "basic",
    popular: true,
    accentColor: "#c9828e",
    schema: {
      cover: { hasBackgroundVideo: false, hasCoverImage: true },
      spotlight: { hasGroomBrideImages: true, showTitles: true },
      timeline: { enabled: true },
      gallery: { maxImages: 10 },
      customFields: [
        { key: "romanticQuote", type: "textarea", label: "Lời thề nguyện", placeholder: "Ví dụ: Tình yêu không phải là..." }
      ]
    },
  },
  {
    id: 3,
    name: "Hỷ Song Hỷ",
    style: "Truyền thống",
    preview: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&h=800&fit=crop&auto=format",
    themeClass: "theme-red",
    tier: "basic",
    accentColor: "#b91c1c",
    schema: {
      cover: { hasBackgroundVideo: false, hasCoverImage: true },
      spotlight: { hasGroomBrideImages: true, showTitles: true },
      timeline: { enabled: true },
      gallery: { maxImages: 10 },
    },
  },
  {
    id: 4,
    name: "Ngà Cổ Điển",
    style: "Thanh lịch",
    preview: "https://images.unsplash.com/photo-1593043927112-08289c3f1b64?w=600&h=800&fit=crop&auto=format",
    themeClass: "theme-green",
    tier: "premium",
    accentColor: "#5a7d6b",
    schema: {
      cover: { hasBackgroundVideo: true, hasCoverImage: true },
      spotlight: { hasGroomBrideImages: true, showTitles: true },
      timeline: { enabled: true },
      gallery: { maxImages: 30 },
      customFields: [
        { key: "welcomeMessage", type: "text", label: "Lời chào mừng", placeholder: "Chào mừng quý khách..." }
      ]
    },
  },
  {
    id: 5,
    name: "Đêm Hoàng Gia",
    style: "Sang trọng",
    preview: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=800&fit=crop&auto=format",
    themeClass: "theme-navy",
    tier: "premium",
    popular: true,
    accentColor: "#c6925c",
    schema: {
      cover: { hasBackgroundVideo: true, hasCoverImage: true },
      spotlight: { hasGroomBrideImages: true, showTitles: true },
      timeline: { enabled: true },
      gallery: { maxImages: 30 },
      customFields: [
        { key: "royalQuote", type: "textarea", label: "Trích dẫn hoàng gia", placeholder: "Love is the only gold..." }
      ]
    },
  }
];
