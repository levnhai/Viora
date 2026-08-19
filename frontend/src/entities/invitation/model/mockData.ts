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
    "https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-200.mp3",
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

export const getDemoWeddingData = (templateId?: string): WeddingData => {
  return {
    ...DEFAULT_DEMO_WEDDING_DATA,
    templateId: templateId || DEFAULT_DEMO_WEDDING_DATA.templateId,
  };
};
