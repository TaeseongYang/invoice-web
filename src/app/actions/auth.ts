'use server'

import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth/session'

export async function loginAction(
  _prevState: { error: string } | null,
  formData: FormData
) {
  const password = formData.get('password')?.toString() ?? ''
  const authPassword = process.env.AUTH_PASSWORD ?? ''

  // 타이밍 어택 방지: 항상 동일한 시간 소요
  const encoder = new TextEncoder()
  const a = encoder.encode(password)
  const b = encoder.encode(authPassword)

  let match = a.length === b.length
  if (match) {
    const { timingSafeEqual } = await import('crypto')
    try {
      match = timingSafeEqual(a, b)
    } catch {
      match = false
    }
  }

  if (!match) {
    // 실패 시 300ms 딜레이 (브루트포스 방지)
    await new Promise(resolve => setTimeout(resolve, 300))
    return { error: '비밀번호가 올바르지 않습니다.' }
  }

  const session = await getSession()
  session.isAuthenticated = true
  await session.save()

  redirect('/')
}

export async function logoutAction() {
  const session = await getSession()
  session.destroy()
  redirect('/login')
}
