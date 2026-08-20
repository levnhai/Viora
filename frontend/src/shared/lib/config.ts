function getApiUrl(): string {
  const rawUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const cleanUrl = rawUrl.replace(/\/api\/?$/, '').replace(/\/$/, '');

  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    // Nếu truy cập từ mạng LAN/IP (ví dụ 10.20.13.65) và cleanUrl đang là localhost hoặc khác IP
    if (
      hostname &&
      hostname !== 'localhost' &&
      hostname !== '127.0.0.1' &&
      (!cleanUrl || cleanUrl.includes('localhost') || cleanUrl.includes('127.0.0.1'))
    ) {
      return `http://${hostname}:8080`;
    }
    return cleanUrl || '';
  }

  return cleanUrl || 'http://localhost:8080';
}

export const API_URL = getApiUrl();





