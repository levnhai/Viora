export const defaultWeddingData = {
  groomName: "Minh Khoa",
  brideName: "Khải Trâm",
  weddingDate: "2026-10-20",
  status: "published",
  views: 2450,
  coverUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop",
  giftInfo: {
    groomBankName: "Vietcombank",
    groomAccountNumber: "1234 5678 90",
    groomAccountName: "MINH KHOA",
    groomQrUrl: "https://img.vietqr.io/image/Vietcombank-1234567890-compact.png?amount=0&addInfo=Mung%20cuoi"
  }
};

export const defaultGuestList = [
  { _id: "g1", name: "Nguyễn Văn An", phone: "0901234567", rsvpStatus: "confirmed", relationship: "Bạn bè", guests: 2 },
  { _id: "g2", name: "Trần Thị Bích Ngọc", phone: "0912345678", rsvpStatus: "confirmed", relationship: "Bạn bè", guests: 1 },
  { _id: "g3", name: "Lê Hoàng Nam", phone: "0987654321", rsvpStatus: "pending", relationship: "Đồng nghiệp", guests: 2 },
  { _id: "g4", name: "Phạm Thùy Dương", phone: "0934567890", rsvpStatus: "declined", relationship: "Họ hàng nhà trai", guests: 1 },
  { _id: "g5", name: "Hoàng Minh Đức", phone: "0976543210", rsvpStatus: "confirmed", relationship: "Bạn bè", guests: 1 }
];

export const defaultGuestbookList = [
  { _id: "gb1", name: "Nguyễn Văn An", message: "Chúc hai bạn trăm năm hạnh phúc!", createdAt: "2026-09-20T10:30:00Z" },
  { _id: "gb2", name: "Trần Thị Bích Ngọc", message: "Chúc mừng hạnh phúc của hai bạn ❤️", createdAt: "2026-09-20T09:15:00Z" },
  { _id: "gb3", name: "Lê Hoàng Nam", message: "Happy wedding! Chúc hai bạn luôn vui vẻ và hạnh phúc.", createdAt: "2026-09-20T08:45:00Z" },
  { _id: "gb4", name: "Phạm Thùy Dương", message: "Chúc hai bạn thật nhiều yêu thương ❤️❤️❤️", createdAt: "2026-09-20T07:30:00Z" }
];
