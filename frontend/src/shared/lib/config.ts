function getApiUrl(): string {
  // Browser requests use Next.js /api proxy so the httpOnly session cookie stays same-origin.
  if (typeof window !== 'undefined') return '';

  const rawUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
  return rawUrl.replace(/\/api\/?$/, '').replace(/\/$/, '');
}

export const API_URL = getApiUrl();
export const SOCKET_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080').replace(/\/api\/?$/, '').replace(/\/$/, '');