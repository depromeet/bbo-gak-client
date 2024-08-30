import { type NextRequest, NextResponse } from 'next/server';
import { ACCESS_TOKEN, JOB_SELECTION } from './app/login/constants/token';

const publicPages = ['/landing'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();
  const accessToken = request.cookies.get(ACCESS_TOKEN)?.value;
  const isJobSelection = request.cookies.get(JOB_SELECTION)?.value === 'select';

  // 정적 파일 요청을 건너뛰기
  if (pathname.startsWith('/_next') || pathname.startsWith('/static') || pathname.includes('.')) {
    return response;
  }

  if (publicPages.some((publicPage) => pathname.startsWith(publicPage)) || (accessToken && isJobSelection)) {
    return response;
  }

  if (!accessToken || !isJobSelection) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: ['/:path*'],
};
