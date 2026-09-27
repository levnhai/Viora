export const formatName = (name: string) => {
  if (!name) return "";
  return name
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
};

export const getInitials = (name: string) => {
  if (!name) return "";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const extractIframeSrc = (input: string) => {
  if (!input) return "";
  const trimmed = input.trim();
  if (trimmed.includes("<iframe") && (trimmed.includes('src="') || trimmed.includes("src='"))) {
    const match = trimmed.match(/src=["']([^"']+)["']/i);
    if (match && match[1]) {
      return match[1];
    }
  }
  return trimmed;
};

export const getDirectionsMapUrl = (
  mapUrl?: string,
  address?: string,
  locationName?: string
) => {
  const cleanUrl = extractIframeSrc(mapUrl || "");

  if (
    !cleanUrl ||
    cleanUrl.includes("google.com/maps/embed") ||
    cleanUrl.includes("/maps/embed")
  ) {
    const query = `${locationName || ""} ${address || ""}`.trim();
    if (query) {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    }
    return cleanUrl || "https://maps.google.com";
  }

  if (cleanUrl.startsWith("http://") || cleanUrl.startsWith("https://")) {
    return cleanUrl;
  }

  const query = `${locationName || ""} ${address || ""}`.trim();
  if (query) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  }

  return "https://maps.google.com";
};

// lấy chữ cái đầu tiên của tên
export const getLastNameFirstLetter = (fullName: string) =>
  fullName?.trim().split(/\s+/).pop()?.[0]?.toUpperCase() ?? "";

// lấy 2 từ cuối cùng của tên (tên đệm + tên chính, ví dụ: Lê Văn Hải -> Văn Hải)
export const getLastTwoNames = (fullName?: string) => {
  if (!fullName) return "";
  const parts = fullName.trim().split(/\s+/);

  if (parts.length <= 2) {
    return fullName.trim();
  }

  return parts.slice(-2).join(" ");
};
