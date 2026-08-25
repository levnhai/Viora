import { NextRequest, NextResponse } from 'next/server';

const ADMIN_LOGIN_PATH = '/admin/login-2h';
const publicPaths = new Set(['/', '/login', '/dashboard', '/wedding-demo']);

function isKnownPage(pathname: string): boolean {
  return publicPaths.has(pathname) || pathname === '/admin' || pathname.startsWith('/admin/') || pathname.startsWith('/w/');
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isKnownPage(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!pathname.startsWith('/admin')) return NextResponse.next();

  const hasSession = Boolean(request.cookies.get('token')?.value);
  if (pathname === ADMIN_LOGIN_PATH) {
    return hasSession ? NextResponse.redirect(new URL('/admin', request.url)) : NextResponse.next();
  }

  if (!hasSession) {
    const loginUrl = new URL(ADMIN_LOGIN_PATH, request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};