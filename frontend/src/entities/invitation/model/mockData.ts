import { WeddingData } from "./types";

export const DEFAULT_DEMO_WEDDING_DATA: WeddingData = {
  slug: "vanan-thibinh",
  templateId: "temp_1",
  groomName: "Văn An",
  groomShortName: "Văn An",
  brideName: "Thị Bình",
  brideShortName: "Thị Bình",
  groomFatherName: "Nguyễn Văn Hùng",
  groomMotherName: "Trần Thị Mai",
  brideFatherName: "Lê Văn Tuấn",
  brideMotherName: "Phạm Thị Cúc",
  weddingDate: "2026-12-31",
  weddingTime: "11:00",
  musicUrl:
    "/audio/RiverFlowsInYou.mp3",
  coverImage:
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800",
  events: [
    {
      title: "Lễ Tiệc Cưới",
      time: "11:00 AM",
      date: "31/12/2026",
      locationName: "Trung tâm Hội nghị Tiệc cưới Ninh Bình Legend",
      address: "177 Đ. Lê Thái Tổ, Khu Đô Thị Xuân Thành, Hoa Lư, Ninh Bình",
    },
    {
      title: "Lễ Thành Hôn",
      time: "18:00 PM",
      date: "31/12/2026",
      locationName: "Grand Palace Center",
      address: "142 Đường Lê Duẩn, Phường Bến Nghé, Quận 1, TP. HCM",
    },
  ],
  timeline: [
    {
      year: "2020",
      title: "Lần đầu gặp gỡ",
      description:
        "Chúng mình vô tình gặp nhau trong một buổi chiều thu định mệnh.",  
    },
    {
      year: "2022",
      title: "Lời cầu hôn chân thành",
      description:
        "Dưới ánh hoàng hôn lãng mạn, anh đã nói lời hẹn ước trọn đời.",
    },
    {
      year: "2026",
      title: "Ngày về chung một nhà",
      description: "Khởi đầu cho chặng đường hạnh phúc mới của hai chúng mình.",
    },
  ],
  galleryImages: [
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=800",
  ],
  giftInfo: {
    groomBankName: "Vietcombank",
    groomAccountNumber: "1012345678",
    groomAccountName: "NGUYEN VAN AN",
    brideBankName: "MB Bank",
    brideAccountNumber: "0987654321",
    brideAccountName: "TRAN THI BINH",
  },
  contactInfo: {
    groomPhone: "0912345678",
    bridePhone: "0987654321",
    email: "contact@weddingdemo.com",
  },
};

export const GRADUATION_DEMO_DATA: WeddingData = {
  slug: "thiep-tot-nghiep-mai-trang",
  templateId: "temp_14",
  groomName: "Lê Hoàng Oanh",
  groomShortName: "Hoàng Oanh",
  brideName: "Lê Hoàng Oanh",
  brideShortName: "Hoàng Oanh",
  brideTitle: "Tân Cử Nhân • PR41",
  groomTitle: "Tân Cử Nhân • PR41",
  weddingDate: "2026-10-03",
  weddingTime: "11:30",
  musicUrl:
    "https://lamiwedding.io.vn/storage/music-1/a-little-dream-of-me-lyrics-video-cam-on-nguoi-da-thuc-cung-toi-ost-mp3cutnet.mp3",
  coverImage:
    "https://res.cloudinary.com/dynrs5wzt/image/upload/v1790466357/a72709f3-37bb-4e9e-8819-20b1ccc6a939_fu6wgm.jpg",
  events: [
    {
      title: "Lễ Tốt Nghiệp",
      time: "11:30 AM",
      date: "03/10/2026",
      locationName: "DONG NAI TECHNOLOGY UNIVERSITY",
      address: "Nguyen Khuyen Street, Quarter 5, Trang Dai, Dong Nai",
      mapUrl:
        "https://maps.app.goo.gl/VR2KpPRHeqJvYrt37",
    },
  ],
  timeline: [
    {
      time: "08:00",
      title: "Làm Lễ Tốt Nghiệp",
      description:
        "Tập trung tại Hội trường Lớn, tiến hành các nghi thức nhận bằng cử nhân.",
    },
    {
      time: "11:30",
      title: "Chụp Ảnh Kỷ Yếu",
      description:
        "Chụp ảnh lưu niệm cùng Gia đình, Thầy cô & Bạn bè tại khuôn viên trường.",
    },
  ],
  galleryImages: [
    "https://res.cloudinary.com/dynrs5wzt/image/upload/v1790466357/a72709f3-37bb-4e9e-8819-20b1ccc6a939_fu6wgm.jpg",
    "https://res.cloudinary.com/dynrs5wzt/image/upload/v1790438074/6821c23c-ba0d-4cee-b1a8-e611b01bce71_j0yepk.jpg",
    "https://res.cloudinary.com/dynrs5wzt/image/upload/v1790440270/423da089-11dc-4713-9038-96d658461368_urzzj7.jpg",
    "https://res.cloudinary.com/dynrs5wzt/image/upload/v1790438591/a8b5a448-f13d-4aeb-8755-1af4f35ddc7d_i7avh9.jpg",
    "https://res.cloudinary.com/dynrs5wzt/image/upload/v1790438583/348b25eb-d88c-4ba0-9336-6c7cb105d987_m0lyfk.jpg",
    "https://res.cloudinary.com/dynrs5wzt/image/upload/v1790438582/ad294fb9-613c-4d33-a2fd-ddae72523e7f_unos5e.jpg",
    "https://res.cloudinary.com/dynrs5wzt/image/upload/v1790438581/6bbbe3d9-ca16-4207-b2c6-d1f613aeb21e_gqnn4k.jpg",
    "https://res.cloudinary.com/dynrs5wzt/image/upload/v1790470052/47683b85-039b-49ff-a554-1a3f129bb0a7_talmmy.jpg",
    "https://res.cloudinary.com/dynrs5wzt/image/upload/v1790558929/c2e847c4-0a1d-428f-974b-096611d84cf4_ltucuy.jpg",
    "https://res.cloudinary.com/dynrs5wzt/image/upload/v1790558930/7ae22457-3822-49c7-98cc-c36c16e03976_rftlyr.jpg"
  ],
  giftInfo: {
    groomBankName: "Techcombank",
    groomAccountNumber: "1903688889999",
    groomAccountName: "DANG MAI TRANG",
    brideBankName: "Techcombank",
    brideAccountNumber: "1903688889999",
    brideAccountName: "DANG MAI TRANG",
  },
  contactInfo: {
    groomPhone: "0912345678",
    bridePhone: "0987654321",
    email: "maitrang.pr41@gmail.com",
  },
};

export const HEN_UOC_DEMO_DATA: WeddingData = {
  id: "demo-hen-uoc-15",
  title: "Thiệp Cưới Mạnh Đức & Lan Nhi",
  slug: "hen-uoc",
  templateId: "temp_15",
  groomName: "Mạnh Đức",
  brideName: "Lan Nhi",
  groomShortName: "Mạnh Đức",
  brideShortName: "Lan Nhi",
  groomFatherName: "Lê Văn Anh",
  groomMotherName: "Lê Thị Nhung",
  brideFatherName: "Vũ Văn Tài",
  brideMotherName: "Trần Thị Hoà",
  weddingDate: "2026-12-29T17:30:00",
  coverImage: "/templates/hen-uoc/couple_hero.jpg",
  groomImage: "/templates/hen-uoc/groom_portrait.jpg",
  brideImage: "/templates/hen-uoc/bride_portrait.jpg",
  galleryImages: [
    "/templates/hen-uoc/couple_hero.jpg",
    "/templates/hen-uoc/couple_envelope.jpg",
    "/templates/hen-uoc/groom_portrait.jpg",
    "/templates/hen-uoc/bride_portrait.jpg",
    "/templates/hen-uoc/gallery_1.jpg",
    "/templates/hen-uoc/gallery_2.jpg",
    "/templates/hen-uoc/gallery_3.jpg",
    "/templates/hen-uoc/gallery_4.jpg",
    "/templates/hen-uoc/gallery_5.jpg",
  ],
  musicUrl: "/templates/hen-uoc/music_marry_you.mp3",
  storyTitle: "Hẹn Ước Trăm Năm",
  storyContent:
    "Mỗi câu chuyện tình yêu đều có một khởi đầu thật đẹp. Câu chuyện của chúng mình cũng vậy, được viết nên từ những điều giản dị và những khoảnh khắc không thể nào quên. Hôm nay, chúng mình rất hạnh phúc khi được chia sẻ cột mốc đặc biệt này cùng gia đình, bạn bè và những người thân yêu. Cảm ơn bạn đã đến và trở thành một phần trong câu chuyện của chúng mình.",
  events: [
    {
      id: "reception",
      name: "BUỔI TIỆC CHUNG VUI",
      time: "17:30",
      dayOfWeek: "CHỦ NHẬT",
      date: "2026-12-29",
      lunarDate: "Tức ngày 18 tháng 10 năm Bính Ngọ",
      locationName: "Tại tư gia nhà trai",
      address: "174 Đường Trần Văn Kiểu, Phường 10, TP Hồ Chí Minh",
      mapUrl: "https://maps.google.com/?q=174+Đường+Trần+Văn+Kiểu,+Phường+10,+Quận+6,+TP+Hồ+Chí+Minh",
    },
    {
      id: "ceremony",
      name: "LỄ THÀNH HÔN",
      time: "09:30",
      dayOfWeek: "THỨ BẢY",
      date: "2026-12-29",
      lunarDate: "Tức ngày 18 tháng 10 năm Bính Ngọ",
      locationName: "Tại tư gia nhà trai",
      address: "174 Đường Trần Văn Kiểu, Phường 10, TP Hồ Chí Minh",
      mapUrl: "https://maps.google.com/?q=174+Đường+Trần+Văn+Kiểu,+Phường+10,+Quận+6,+TP+Hồ+Chí+Minh",
    },
  ],
  giftInfo: {
    groomBankName: "MB Bank",
    groomAccountNumber: "999988882912",
    groomAccountName: "LE MANH DUC",
    brideBankName: "Techcombank",
    brideAccountNumber: "190367882912",
    brideAccountName: "VU LAN NHI",
  },
  contactInfo: {
    groomPhone: "0901234567",
    bridePhone: "0909876543",
    email: "manhduc.lannhi@gmail.com",
  },
};

export const getDemoWeddingData = (templateId?: string): WeddingData => {
  if (templateId === "temp_15" || templateId === "15" || templateId === "hen-uoc" || templateId === "hen_uoc") {
    return {
      ...HEN_UOC_DEMO_DATA,
      templateId: "temp_15",
    };
  }

  if (templateId === "temp_14" || templateId === "14") {
    return {
      ...GRADUATION_DEMO_DATA,
      templateId: "temp_14",
    };
  }

  return {
    ...DEFAULT_DEMO_WEDDING_DATA,
    templateId: templateId || DEFAULT_DEMO_WEDDING_DATA.templateId,
  };
};

