// On the server (Next.js SSR), we need the absolute URL.
// On the client (browser), we use a relative URL to let Next.js proxy handle it (avoids CORS & Cookie issues).
export const API_URL = typeof window !== 'undefined' ? '' : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080');



