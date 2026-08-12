const rawUrl = process.env.NEXT_PUBLIC_API_URL || '';
const cleanUrl = rawUrl.replace(/\/api\/?$/, '').replace(/\/$/, '');

export const API_URL = cleanUrl
  ? cleanUrl
  : (typeof window !== 'undefined' ? '' : 'http://localhost:8080');





