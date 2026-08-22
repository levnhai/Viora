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
  if (!input) return input;
  // If the user pasted the entire <iframe> tag, extract just the src attribute
  if (input.includes("<iframe") && input.includes('src="')) {
    const match = input.match(/src="([^"]+)"/);
    if (match && match[1]) {
      return match[1];
    }
  }
  return input;
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
