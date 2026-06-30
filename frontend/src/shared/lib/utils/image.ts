export const getValidImage = (
  url?: string,
  fallbackUrl: string = "",
): string => {
  if (!url || typeof url !== "string") return fallbackUrl;
  const trimmed = url.trim();
  if (trimmed === "" || trimmed.endsWith("/") || trimmed.includes("undefined"))
    return fallbackUrl;
  return trimmed;
};
