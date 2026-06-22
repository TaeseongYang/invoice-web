import { NextRequest, NextResponse } from 'next/server'
import { unsealData } from 'iron-session'
import type { SessionData } from '@/lib/auth/session'

const COOKIE_NAME = 'invoice_session'
const SECRET =
  process.env.AUTH_SECRET ?? 'fallback-secret-for-dev-only-32chars!!'

// 로그인 시도 횟수 제한 — Edge Runtime 메모리 내 간이 저장소 (재시작 시 초기화)
const loginAttempts = new Map<string, { count: number; resetAt: number }>()
const MAX_ATTEMPTS = 10
const WINDOW_MS = 15 * 60 * 1000 // 15분

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = loginAttempts.get(ip)

  if (!entry || now > entry.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }

  if (entry.count >= MAX_ATTEMPTS) return false

  entry.count++
  return true
}

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

  // /login POST(로그인 시도)에 rate limiting 적용
  if (pathname === '/login' && request.method === 'POST') {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      'unknown'

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: '너무 많은 로그인 시도입니다. 15분 후 다시 시도해주세요.' },
        { status: 429 }
      )
    }
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
