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

    let result = `ngày ${day} tháng ${month} năm ${year}`;

    if (options?.includeWeekday) {
      result = `${weekdays[d.getDay()]}, ${result}`;
    }

    if (options?.time) {
      result += ` · ${options.time}`;
    }

    return result;
  } catch {
    return String(date);
  }
};
