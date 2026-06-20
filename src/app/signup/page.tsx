import type { Metadata } from 'next'
import { SignupForm } from '@/components/signup-form'

export const metadata: Metadata = {
  title: '회원가입',
  description: '프리랜서/에이전시 계정을 만들어 견적서를 관리하세요',
}

export default function SignupPage() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <SignupForm />
      </div>
    </div>
  )
}
