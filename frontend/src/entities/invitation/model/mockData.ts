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
    "https://i.pinimg.com/736x/9c/1d/b0/9c1db0f88cc25ef5d0b9869ca366279a.jpg",
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
    "https://i.pinimg.com/736x/90/f1/b2/90f1b20748f9660ffa0451bab9a1e996.jpg",
    "https://i.pinimg.com/736x/13/aa/43/13aa43c6aacc6b7f912922574824bd99.jpg",
    "https://i.pinimg.com/736x/a2/12/60/a21260c8e4d20ceccf1c420391b9d124.jpg",
    "https://i.pinimg.com/736x/c8/a1/54/c8a154ccdb6ae396565d211c0d0e9824.jpg",
    "https://i.pinimg.com/736x/32/4a/45/324a45e11b925dae2b91b32805131bd1.jpg",
    "https://i.pinimg.com/736x/e6/62/ac/e662acdd883984180ba8cbc66bd5250b.jpg",
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
