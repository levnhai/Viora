import { Solar } from "lunar-javascript";

export const formatDate = (dateStr: string) => {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
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

export const formatDateToDDMMYYYY = (dateString: string) => {
  try {
    const d = new Date(dateString);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  } catch {
    return dateString;
  }
};

export const formatVietnameseDate = (
  date: string | Date,
  options?: {
    includeWeekday?: boolean;
    time?: string;
  },
): string => {
  try {
    const d = new Date(date);

    if (isNaN(d.getTime())) return String(date);

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

    // if (options?.time) {
    //   result += ` · ${options.time}`;
    // }

    return result;
  } catch {
    return String(date);
  }
};

export const getVietnameseLunarDate = (dateStr: string) => {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";

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
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";

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
