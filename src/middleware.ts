import { NextRequest, NextResponse } from 'next/server'

// 인증 시스템 MVP 범위 외 제외 (Task 008 ⛔) — 미들웨어 비활성화
export function middleware(_request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [],
}
