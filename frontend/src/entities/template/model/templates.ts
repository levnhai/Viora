import { TemplateConfig } from "./schema";

export const TEMPLATES: TemplateConfig[] = [
  {
    id: 1,
    name: "Tinh Giản",
    style: "Hiện đại",
    preview: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop&auto=format",
    themeClass: "theme-modern",
    tier: "free",
    price: 0,
    accentColor: "#111827",
    schema: {
      cover: { hasBackgroundVideo: false, hasCoverImage: true },
      spotlight: { hasGroomBrideImages: false, showTitles: false },
      timeline: { enabled: false },
      gallery: { maxImages: 3 },
    },
  },
  {
    id: 6,
    name: "Tím Oải Hương",
    style: "Thơ mộng",
    preview: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=600&h=800&fit=crop&auto=format",
    themeClass: "theme-purple",
    tier: "basic",
    price: 199000,
    accentColor: "#7c4d90",
    schema: {
      cover: { hasBackgroundVideo: false, hasCoverImage: true },
      spotlight: { hasGroomBrideImages: true, showTitles: true },
      timeline: { enabled: true },
      gallery: { maxImages: 20 },
      customFields: [
        { key: "lavenderQuote", type: "textarea", label: "Lời thề nguyện", placeholder: "Ví dụ: Tình yêu không phải là nhìn nhau..." }
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
    price: 299000,
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
