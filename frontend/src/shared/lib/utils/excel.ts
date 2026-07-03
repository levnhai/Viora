import * as XLSX from "xlsx";

export const exportGuestbookToExcel = (guestbookList: any[], weddingSlug: string | null) => {
  if (!guestbookList || guestbookList.length === 0) {
    alert("Không có lời chúc nào để xuất.");
    return;
  }

  const data = guestbookList.map((gb: any) => ({
    "Họ và tên": gb.name || "",
    "Lời chúc": gb.message || "",
    "Thời gian gửi": gb.createdAt
      ? new Date(gb.createdAt).toLocaleString("vi-VN")
      : "",
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  // Tùy chỉnh độ rộng các cột
  worksheet["!cols"] = [
    { wch: 25 }, // Họ và tên
    { wch: 60 }, // Lời chúc
    { wch: 25 }, // Thời gian
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Lời chúc");

  XLSX.writeFile(
    workbook,
    `Danh_Sach_Loi_Chuc_${weddingSlug || "export"}.xlsx`,
  );
};

export const exportGuestsToExcel = (guestList: any[], weddingSlug: string | null) => {
  if (!guestList || guestList.length === 0) {
    alert("Không có khách mời nào để xuất.");
    return;
  }

  const baseUrl = window.location.origin;
  const data = guestList.map((g: any) => ({
    "Họ và tên": g.name || "",
    "Số điện thoại": g.phone || "",
    "Nhóm quan hệ": g.relationship || "",
    "Số người đi cùng": g.guests || 1,
    "Trạng thái":
      g.rsvpStatus === "confirmed"
        ? "Đã xác nhận"
        : g.rsvpStatus === "declined"
          ? "Từ chối"
          : "Chưa phản hồi",
    "Link mời": `${baseUrl}/w/${weddingSlug}?to=${encodeURIComponent(g.name || "")}`,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  // Tùy chỉnh độ rộng các cột cho đẹp
  worksheet["!cols"] = [
    { wch: 25 }, // Họ và tên
    { wch: 15 }, // Số điện thoại
    { wch: 20 }, // Nhóm quan hệ
    { wch: 20 }, // Số người đi cùng
    { wch: 15 }, // Trạng thái
    { wch: 60 }, // Link mời
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Khách mời");

  XLSX.writeFile(
    workbook,
    `Danh_Sach_Khach_Moi_${weddingSlug || "export"}.xlsx`,
  );
};
