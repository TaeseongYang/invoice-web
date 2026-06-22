import { NextRequest, NextResponse } from 'next/server'
import { unsealData } from 'iron-session'
import type { SessionData } from '@/lib/auth/session'

const COOKIE_NAME = 'invoice_session'
const SECRET =
  process.env.AUTH_SECRET ?? 'fallback-secret-for-dev-only-32chars!!'

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const cookie = request.cookies.get(COOKIE_NAME)
  if (!cookie?.value) return false

  try {
    const data = await unsealData<SessionData>(cookie.value, {
      password: SECRET,
    })
    return data.isAuthenticated === true
  } catch {
    return false
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 공개 경로: /view/* 는 항상 통과
  if (pathname.startsWith('/view')) {
    return NextResponse.next()
  }

  const authenticated = await isAuthenticated(request)

  // /login: 이미 인증된 경우 / 로 redirect
  if (pathname === '/login') {
    if (authenticated) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
  }

  // 그 외 보호 경로: 미인증 시 /login?from=[pathname] 으로 redirect
  if (!authenticated) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
