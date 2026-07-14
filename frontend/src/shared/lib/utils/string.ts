export const formatName = (name: string) => {
  if (!name) return "";
  return name
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
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
