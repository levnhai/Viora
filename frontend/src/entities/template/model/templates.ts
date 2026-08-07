import { TemplateConfig } from "./schema";

export const TEMPLATES: TemplateConfig[] = [
  {
    id: 1,
    code: "temp_1",
    name: "Song Hỷ - Xanh",
    style: "Truyền thống",
    tags: ["Truyền thống", "Đẹp"],
    isHot: false,
    preview:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop&auto=format",
    themeClass: "theme-pink",
    tier: "basic",
    price: 99000,
    originalPrice: 150000,
    features: [
      "Nhạc nền cơ bản",
      "Tối đa 6 ảnh",
      "Bản đồ Google Maps",
      "RSVP & Lời chúc",
    ],
    accentColor: "#001A08",
    bgColor: "#001A08",
    textColor: "#E1BC7C",
    envelopeKey: "minimal",
    timelineKey: "simple",
    galleryKey: "grid",
    schema: {
      basicInfo: {
        hasParentsInfo: true,
        hasRankInfo: true,
        hasAddressInfo: true,
      },
      cover: { hasBackgroundVideo: false, hasCoverImage: false },
      spotlight: { hasGroomBrideImages: false, showTitles: false },
      timeline: { enabled: true },
      gallery: { maxImages: 10 },
      story: { enabled: true },
      rsvp: { enabled: true },
      gift: { enabled: true },
    },
  },
  {
    id: 2,
    code: "temp_2",
    name: "Song Hỷ - Đỏ",
    style: "Truyền thống",
    tags: ["Truyền thống", "Đẹp"],
    isHot: false,
    preview:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop&auto=format",
    themeClass: "theme-pink",
    tier: "basic",
    price: 99000,
    originalPrice: 150000,
    features: [
      "Nhạc nền cơ bản",
      "Tối đa 6 ảnh",
      "Bản đồ Google Maps",
      "RSVP & Lời chúc",
    ],
    accentColor: "#8B0000",
    bgColor: "#4A0404",
    textColor: "#F7D070",
    envelopeKey: "minimal",
    timelineKey: "simple",
    galleryKey: "grid",
    schema: {
      basicInfo: {
        hasParentsInfo: true,
        hasRankInfo: true,
        hasAddressInfo: true,
      },
      cover: { hasBackgroundVideo: false, hasCoverImage: false },
      spotlight: { hasGroomBrideImages: false, showTitles: false },
      timeline: { enabled: true },
      gallery: { maxImages: 10 },
      story: { enabled: true },
      rsvp: { enabled: true },
      gift: { enabled: true },
    },
  },
  {
    id: 3,
    code: "temp_3",
    name: "Hoa Mộc - Xanh",
    style: "Hoa lá",
    tags: ["Hoa lá", "Lãng mạn"],
    isPinned: true,
    pinOrder: 1,
    isHot: true,
    preview:
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&h=800&fit=crop&auto=format",
    themeClass: "theme-modern",
    tier: "standard",
    price: 149000,
    originalPrice: 250000,
    features: [
      "Nhạc nền tự chọn",
      "Tối đa 15 ảnh",
      "Mã QR Mừng cưới",
      "Countdown đếm ngược",
      "Bản đồ 1-click",
    ],
    accentColor: "#7a5c4f",
    envelopeKey: "minimal",
    timelineKey: "simple",
    galleryKey: "grid",
    schema: {
      basicInfo: {
        hasParentsInfo: true,
        hasRankInfo: true,
        hasAddressInfo: true,
      },
      cover: { hasBackgroundVideo: false, hasCoverImage: true },
      spotlight: { hasGroomBrideImages: true, showTitles: true },
      timeline: { enabled: true },
      gallery: { maxImages: 20 },
      story: { enabled: true },
      rsvp: { enabled: true },
      gift: { enabled: true },
    },
  },
  {
    id: 4,
    code: "temp_4",
    name: "Elegant - Nâu",
    style: "Thanh Lịch",
    tags: ["Thanh lịch", "VIP 3D"],
    isHot: true,
    preview:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=800&fit=crop&auto=format",
    themeClass: "theme-modern",
    tier: "standard",
    price: 149000,
    originalPrice: 250000,
    features: [
      "Độc quyền Animation 3D",
      "Không giới hạn ảnh",
      "QR Mừng cưới + Confetti",
      "Countdown & RSVP VIP",
    ],
    accentColor: "#7a5c4f",
    envelopeKey: "minimal",
    timelineKey: "simple",
    galleryKey: "grid",
    schema: {
      basicInfo: {
        hasParentsInfo: true,
        hasRankInfo: true,
        hasAddressInfo: true,
      },
      cover: { hasBackgroundVideo: false, hasCoverImage: true },
      spotlight: { hasGroomBrideImages: true, showTitles: true },
      timeline: { enabled: true },
      gallery: { maxImages: 20 },
      story: { enabled: true },
      rsvp: { enabled: true },
      gift: { enabled: true },
    },
  },
  {
    id: 5,
    code: "temp_5",
    name: "The Golden",
    style: "Sang trọng",
    tags: ["Sang trọng", "Lãng mạn"],
    isHot: true,
    preview:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=800&fit=crop&auto=format",
    themeClass: "theme-modern",
    tier: "standard",
    price: 149000,
    originalPrice: 250000,
    features: [
      "Độc quyền Animation 3D",
      "Không giới hạn ảnh",
      "QR Mừng cưới + Confetti",
      "Countdown & RSVP VIP",
    ],
    accentColor: "#7a5c4f",
    envelopeKey: "minimal",
    timelineKey: "simple",
    galleryKey: "grid",
    schema: {
      basicInfo: {
        hasParentsInfo: true,
        hasRankInfo: true,
        hasAddressInfo: true,
      },
      cover: { hasBackgroundVideo: false, hasCoverImage: true },
      spotlight: { hasGroomBrideImages: true, showTitles: true },
      timeline: { enabled: true },
      gallery: { maxImages: 20 },
      story: { enabled: true },
      rsvp: { enabled: true },
      gift: { enabled: true },
    },
  },
  {
    id: 6,
    code: "temp_6",
    name: "Minimal - đỏ",
    style: "Sang trọng",
    tags: ["Sang trọng", "Lãng mạn"],
    isHot: true,
    preview:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=800&fit=crop&auto=format",
    themeClass: "Minimal",
    tier: "standard",
    price: 149000,
    originalPrice: 250000,
    features: [
      "Độc quyền Animation 3D",
      "Không giới hạn ảnh",
      "QR Mừng cưới + Confetti",
      "Countdown & RSVP VIP",
    ],
    accentColor: "#7a5c4f",
    envelopeKey: "minimal",
    timelineKey: "simple",
    galleryKey: "grid",
    schema: {
      basicInfo: {
        hasParentsInfo: true,
        hasRankInfo: true,
        hasAddressInfo: true,
      },
      cover: { hasBackgroundVideo: false, hasCoverImage: true },
      spotlight: { hasGroomBrideImages: true, showTitles: true },
      timeline: { enabled: true },
      gallery: { maxImages: 20 },
      story: { enabled: true },
      rsvp: { enabled: true },
      gift: { enabled: true },
    },
  },
];

export function getDemoSlugForTemplate(tpl: any, demos: any[]): string {
  if (!tpl || !Array.isArray(demos) || demos.length === 0) {
    return "vanan-thibinh";
  }

  const tplDbId = tpl._id ? String(tpl._id) : null;
  const tplId = tpl.id !== undefined && tpl.id !== null ? String(tpl.id) : null;
  const tplCode = tpl.code ? String(tpl.code) : null;

  const found = demos.find((d) => {
    if (d.source && d.source !== "demo") return false;

    const raw = d.templateId;
    const dTplId =
      typeof raw === "object"
        ? String(raw?._id || raw?.id || "")
        : String(raw || "");
    const dTplCode =
      typeof raw === "object"
        ? String(raw?.code || "")
        : String(d.templateCode || d.code || "");

    if (tplDbId && dTplId === tplDbId) return true;
    if (tplId && dTplId === tplId) return true;
    if (
      tplCode &&
      (dTplCode === tplCode ||
        dTplId === tplCode ||
        (d.slug && d.slug.includes(tplCode)))
    )
      return true;

    return false;
  });

  if (found && found.slug) {
    return found.slug;
  }

  return demos[0]?.slug || "vanan-thibinh";
}
