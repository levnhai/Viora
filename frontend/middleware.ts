import { NextRequest, NextResponse } from 'next/server';

const ADMIN_LOGIN_PATH = '/admin/login-2h';
const USER_LOGIN_PATH = '/login';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;
  const hasSession = Boolean(token);

  // 1. Quản lý Route Admin (/admin)
  if (pathname.startsWith('/admin')) {
    // Nếu đang ở trang login của admin
    if (pathname === ADMIN_LOGIN_PATH) {
      if (hasSession) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }

    // Các trang quản trị khác: Bắt buộc phải có session
    if (!hasSession) {
      const loginUrl = new URL(ADMIN_LOGIN_PATH, request.url);
      loginUrl.searchParams.set('next', pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // 2. Quản lý Route Người dùng cần đăng nhập (/dashboard)
  if (pathname.startsWith('/dashboard')) {
    if (!hasSession) {
      const loginUrl = new URL(USER_LOGIN_PATH, request.url);
      loginUrl.searchParams.set('next', pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // 3. Nếu đã đăng nhập mà truy cập trang đăng nhập người dùng -> điều hướng về dashboard
  if (pathname === USER_LOGIN_PATH && hasSession) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)',
  ],
};