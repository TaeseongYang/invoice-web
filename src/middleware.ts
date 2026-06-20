import { NextRequest, NextResponse } from 'next/server'

// 로그인이 필요한 보호된 라우트
const PROTECTED_ROUTES = ['/dashboard', '/invoices']

// 비로그인 상태에서만 접근 가능한 라우트
const AUTH_ONLY_ROUTES = ['/login', '/signup']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isProtectedRoute = PROTECTED_ROUTES.some(route =>
    pathname.startsWith(route)
  )
  const isAuthOnlyRoute = AUTH_ONLY_ROUTES.some(route =>
    pathname.startsWith(route)
  )

  // TODO Phase 3 (Task 008): 세션 쿠키 확인 후 실제 리다이렉션 구현
  // const session = request.cookies.get('session')
  // const isAuthenticated = !!session
  //
  // if (isProtectedRoute && !isAuthenticated) {
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }
  // if (isAuthOnlyRoute && isAuthenticated) {
  //   return NextResponse.redirect(new URL('/dashboard', request.url))
  // }

  void isProtectedRoute
  void isAuthOnlyRoute

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/invoices/:path*', '/login', '/signup'],
}
