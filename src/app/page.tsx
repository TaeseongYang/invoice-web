import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            노션 기반 견적서 공유 서비스
          </h1>
          <p className="text-muted-foreground mt-6 text-lg">
            노션 URL 하나로 전문적인 견적서를 클라이언트에게 즉시 공유하세요.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/login">
              <Button size="lg">로그인</Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" variant="outline">
                무료로 시작하기
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
