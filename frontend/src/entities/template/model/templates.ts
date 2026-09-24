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
    previewVideo: "/video/songhy_xanh.mp4",
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
    previewVideo: "/video/songhy_do.mp4",
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
    previewVideo: "/video/the_golden.mp4",
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
    previewVideo: "/video/minimal_do.mp4",
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
  {
    id: 7,
    code: "temp_7",
    name: "Minimal - xanh",
    style: "Sang trọng",
    tags: ["Sang trọng", "Lãng mạn"],
    isHot: true,
    preview:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=800&fit=crop&auto=format",
    previewVideo: "/video/minimal_xanh.mp4",
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
    accentColor: "#A4B885",
    envelopeKey: "envelope_7",
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
    id: 8,
    code: "temp_8",
    name: "Honey Wood",
    style: "Sang trọng",
    tags: ["Sang trọng", "Lãng mạn"],
    isHot: true,
    preview:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=800&fit=crop&auto=format",
    previewVideo: "/video/honey_wood.mp4",
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
    accentColor: "#F9DFDF",
    envelopeKey: "envelope_8",
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
    id: 9,
    code: "temp_9",
    name: "Linen Cream",
    style: "Thanh Lịch",
    tags: ["Thanh Lịch", "Vintage", "Linen"],
    isHot: true,
    preview:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop&auto=format",
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
    accentColor: "#C9B6A1",
    bgColor: "#FAF8F5",
    textColor: "#4A3E37",
    envelopeKey: "LinenEnvelope",
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
    id: 10,
    code: "temp_10",
    name: "Minimal - hồng",
    style: "Sang trọng",
    tags: ["Sang trọng", "Lãng mạn"],
    isHot: true,
    preview:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=800&fit=crop&auto=format",
    // previewVideo: "/video/honey_wood.mp4",
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
    accentColor: "#F9DFDF",
    envelopeKey: "envelope_8",
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
    id: 11,
    code: "temp_11",
    name: "Mộc Nhã - Sage Green",
    style: "Thanh Lịch",
    tags: ["Sage Green", "Editorial", "Rustic", "Hot"],
    isNew: true,
    isHot: true,
    preview: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop&auto=format",
    previewVideo: "/video/SageOlive_Xanh.mp4",
    themeClass: "theme-sage-olive",
    tier: "standard",
    price: 149000,
    originalPrice: 250000,
    features: [
      "Bố cục Editorial & Botanical",
      "Album ảnh Golden Hour Mosaic",
      "Xác nhận RSVP & Sổ lời chúc",
      "QR Mừng Cưới & Countdown VIP",
    ],
    accentColor: "#5D733F",
    bgColor: "#FFFFFF",
    textColor: "#5D733F",
    envelopeKey: "envelope_11",
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
    id: 12,
    code: "temp_12",
    name: "Trầm Thu - Warm Terracotta",
    style: "Cổ Điển & Tinh Tế",
    tags: ["Terracotta", "Vintage Romance", "Monthly Calendar", "Hot"],
    isNew: true,
    isHot: true,
    preview: "https://cdn.taothiep.com/wedding-user-assets/images/cmp2snpce001501myev2iysu3/89ebe947-8dab-4bd4-87c1-5c3a219d9add.webp",
    themeClass: "theme-warm-terracotta",
    tier: "standard",
    price: 149000,
    originalPrice: 250000,
    features: [
      "Bố cục Chân dung so le độc đáo",
      "Lưới Lịch Tháng (Calendar Grid) đặc trưng",
      "Album ảnh Golden Hour Mosaic",
      "Xác nhận RSVP, Sổ lời chúc & Countdown",
    ],
    accentColor: "#2C6E91",
    bgColor: "#FFFFFF",
    textColor: "#2C6E91",
    envelopeKey: "envelope_12",
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
    id: 13,
    code: "temp_13",
    name: "Baroque - Đỏ Đậm",
    style: "Quý Tộc & Cổ Điển",
    tags: ["Baroque", "Đỏ Đậm", "Mạ Vàng", "Damask", "Hot"],
    isNew: true,
    isHot: true,
    preview: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop&auto=format",
    themeClass: "theme-baroque-darkred",
    tier: "standard",
    price: 149000,
    originalPrice: 250000,
    features: [
      "Khung Baroque mạ vàng sang trọng",
      "Nền gấm Damask & hiệu ứng cánh hoa rơi",
      "3D Album ảnh Cover Flow đa chiều",
      "Lịch trình ngày cưới kèm icon minh họa",
      "Sổ lời chúc, QR Mừng Cưới & Đếm ngược",
    ],
    accentColor: "#ffdfaf",
    bgColor: "#2b0303",
    textColor: "#ffdfaf",
    envelopeKey: "envelope_13",
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
    id: 14,
    code: "temp_14",
    name: "Lễ Tốt Nghiệp - Mai Trang",
    style: "Tốt Nghiệp",
    tags: ["Tốt Nghiệp", "Cử Nhân", "Navy & Gold", "Trang Trọng", "Hot"],
    isNew: true,
    isHot: true,
    preview:
      "https://static.ladipage.net/69b247cf4f6ddc0012f0ce55/1784774420884_3379540865962086579_g2668429489759155549_fd36d587f191f01454f7c7ef8dba84a8-20260724163024-ilyzg.jpg",
    themeClass: "theme-dusty-rose",
    tier: "standard",
    price: 149000,
    originalPrice: 250000,
    features: [
      "Khung film 4 ảnh dọc & dải nơ hồng pastel",
      "Thẻ lịch tháng & sticker trái tim ngày tốt nghiệp",
      "Lịch trình buổi lễ (Làm lễ & Chụp ảnh kỷ niệm)",
      "Đếm ngược thời gian, My Story & Album of Graduate",
      "Xác nhận tham dự (RSVP) & Thank You Card",
    ],
    accentColor: "#7B2D37",
    bgColor: "#EEDDDD",
    textColor: "#7B2D37",
    envelopeKey: "minimal",
    timelineKey: "simple",
    galleryKey: "grid",
    schema: {
      basicInfo: {
        hasParentsInfo: false,
        hasRankInfo: false,
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

export function hasDemoForTemplate(tpl: any, demos: any[]): boolean {
  if (!tpl || !Array.isArray(demos) || demos.length === 0) {
    return false;
  }

  const tplDbId = tpl._id ? String(tpl._id) : null;
  const tplId = tpl.id !== undefined && tpl.id !== null ? String(tpl.id) : null;
  const tplCode = tpl.code ? String(tpl.code) : null;

  return demos.some((d) => {
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
}

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
