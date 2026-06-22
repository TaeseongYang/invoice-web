import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'

export interface SessionData {
  isAuthenticated: boolean
}

const sessionOptions = {
  cookieName: 'invoice_session',
  password: process.env.AUTH_SECRET ?? 'fallback-secret-for-dev-only-32chars!!',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24 * 7, // 7일
  },
}

export async function getSession() {
  const cookieStore = await cookies()
  return getIronSession<SessionData>(cookieStore, sessionOptions)
}
