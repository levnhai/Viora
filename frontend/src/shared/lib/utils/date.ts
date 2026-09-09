import { Solar } from "lunar-javascript";

/**
 * Phân tích chuỗi ngày đa định dạng (ISO, DD/MM/YYYY, DD-MM-YYYY, YYYY/MM/DD) một cách an toàn và chính xác
 */
export function parseDateRobust(dateStr?: string | Date): Date {
  const defaultDate = new Date(2026, 11, 26); // 26/12/2026

  if (!dateStr) return defaultDate;
  if (dateStr instanceof Date) return isNaN(dateStr.getTime()) ? defaultDate : dateStr;
  if (typeof dateStr !== "string" || !dateStr.trim()) return defaultDate;

  let clean = dateStr.trim();
  if (clean.includes("T")) {
    clean = clean.split("T")[0];
  }

  // Định dạng DD/MM/YYYY hoặc YYYY/MM/DD
  if (clean.includes("/")) {
    const parts = clean.split("/").map((p) => parseInt(p, 10));
    if (parts.length === 3 && !parts.some(isNaN)) {
      if (parts[2] > 1000) {
        // DD/MM/YYYY
        return new Date(parts[2], parts[1] - 1, parts[0]);
      }
      if (parts[0] > 1000) {
        // YYYY/MM/DD
        return new Date(parts[0], parts[1] - 1, parts[2]);
      }
    }
  }

  // Định dạng DD-MM-YYYY hoặc YYYY-MM-DD
  if (clean.includes("-")) {
    const parts = clean.split("-").map((p) => parseInt(p, 10));
    if (parts.length === 3 && !parts.some(isNaN)) {
      if (parts[0] > 1000) {
        // YYYY-MM-DD
        return new Date(parts[0], parts[1] - 1, parts[2]);
      }
      if (parts[2] > 1000) {
        // DD-MM-YYYY
        return new Date(parts[2], parts[1] - 1, parts[0]);
      }
    }
  }

  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? defaultDate : d;
}

export const formatDate = (dateStr: string) => {
  try {
    const d = parseDateRobust(dateStr);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day} · ${month} · ${year}`;
  } catch (e) {
    return dateStr;
  }
};

export const formatTimeAgo = (dateStr: string | Date) => {
  try {
    const diffMs = Date.now() - new Date(dateStr).getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);

    if (diffSec < 60) return "Vừa xong";
    if (diffMin < 60) return `${diffMin} phút trước`;
    if (diffHr < 24) return `${diffHr} giờ trước`;
    return `${diffDay} ngày trước`;
  } catch {
    return "Mới đây";
  }
};

export const formatDateToDDMMYYYY = (dateString?: string, separator = ".") => {
  try {
    if (!dateString) return "";
    const d = parseDateRobust(dateString);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}${separator}${month}${separator}${year}`;
  } catch {
    return dateString || "";
  }
};

export const formatToDDMMYYYY = formatDateToDDMMYYYY;

export const formatVietnameseDate = (
  date: string | Date,
  options?: {
    includeWeekday?: boolean;
    time?: string;
  },
): string => {
  try {
    const d = parseDateRobust(date);

    const weekdays = [
      "Chủ Nhật",
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
    ];

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    let result = `${day} . ${month} . ${year}`;

    if (options?.includeWeekday) {
      result = `${weekdays[d.getDay()]}, ${result}`;
    }

    return result;
  } catch {
    return String(date);
  }
};

export const getVietnameseLunarDate = (dateStr: string) => {
  try {
    const d = parseDateRobust(dateStr);

    const solar = Solar.fromYmd(d.getFullYear(), d.getMonth() + 1, d.getDate());
    const lunar = solar.getLunar();

    const lunarDay = String(lunar.getDay()).padStart(2, "0");
    const lunarMonth = String(lunar.getMonth()).padStart(2, "0");
    const lunarYear = lunar.getYear();

    const CAN = ["Canh", "Tân", "Nhâm", "Quý", "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ"];
    const CHI = ["Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi"];

    const canStr = CAN[lunarYear % 10];
    const chiStr = CHI[lunarYear % 12];

    return `(Tức ngày ${lunarDay}/${lunarMonth} năm ${canStr} ${chiStr})`;
  } catch (e) {
    return "";
  }
};

export const getVietnameseWeekday = (dateStr: string) => {
  try {
    const d = parseDateRobust(dateStr);

    const weekdays = [
      "CHỦ NHẬT",
      "THỨ HAI",
      "THỨ BA",
      "THỨ TƯ",
      "THỨ NĂM",
      "THỨ SÁU",
      "THỨ BẢY",
    ];

    return weekdays[d.getDay()];
  } catch {
    return "";
  }
};

/**
 * Lấy chi tiết ngày phục vụ thẻ sự kiện thiệp cưới
 */
export function getEventDateDetails(dateStr?: string) {
  const d = parseDateRobust(dateStr);
  const daysOfWeek = [
    "CHỦ NHẬT",
    "THỨ HAI",
    "THỨ BA",
    "THỨ TƯ",
    "THỨ NĂM",
    "THỨ SÁU",
    "THỨ BẢY",
  ];

  let lunarText = "";
  try {
    const solar = Solar.fromYmd(d.getFullYear(), d.getMonth() + 1, d.getDate());
    const lunar = solar.getLunar();
    const lDay = String(lunar.getDay()).padStart(2, "0");
    const lMonth = String(lunar.getMonth()).padStart(2, "0");
    const CAN = ["Canh", "Tân", "Nhâm", "Quý", "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ"];
    const CHI = ["Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi"];
    const canStr = CAN[lunar.getYear() % 10];
    const chiStr = CHI[lunar.getYear() % 12];
    lunarText = `(Tức ngày ${lDay} tháng ${lMonth} năm ${canStr} ${chiStr})`;
  } catch {
    lunarText = "(Tức ngày 17 tháng 11 năm Bính Ngọ)";
  }

  return {
    dayOfWeek: daysOfWeek[d.getDay()],
    day: String(d.getDate()).padStart(2, "0"),
    month: `tháng ${String(d.getMonth() + 1).padStart(2, "0")}`,
    year: `năm ${d.getFullYear()}`,
    lunar: lunarText,
  };
}

/**
 * Chuẩn hóa xưng hô phụ huynh tránh trùng lặp "Ông. Ông..."
 */
export function formatParentName(prefix: "Ông" | "Bà", name?: string): string | null {
  if (!name || !name.trim()) return null;
  const trimmed = name.trim();
  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith("ông") ||
    lower.startsWith("bà") ||
    lower.startsWith("bác") ||
    lower.startsWith("cụ") ||
    lower.startsWith("chú") ||
    lower.startsWith("cô")
  ) {
    return trimmed;
  }
  return `${prefix}. ${trimmed}`;
}
