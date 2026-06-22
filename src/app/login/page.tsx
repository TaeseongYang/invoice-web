import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { FileText } from 'lucide-react'
import { getSession } from '@/lib/auth/session'
import { LoginForm } from '@/components/auth/login-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const metadata: Metadata = {
  title: '로그인 | InvoiceWeb',
}

export default async function LoginPage() {
  const session = await getSession()
  if (session.isAuthenticated) {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        {/* 로고 */}
        <div className="flex flex-col items-center gap-2">
          <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-xl">
            <FileText className="text-primary-foreground h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">InvoiceWeb</h1>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">관리자 로그인</CardTitle>
            <CardDescription>
              관리자 비밀번호를 입력하여 로그인하세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
