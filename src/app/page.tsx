import Link from 'next/link'
import { FileText, Share2, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col">
        {/* 히어로 섹션 */}
        <section className="flex flex-1 items-center justify-center py-16">
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
        </section>

        {/* Features 섹션 */}
        <section className="bg-muted/30 border-t py-16">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold sm:text-3xl">주요 기능</h2>
              <p className="text-muted-foreground mt-3">
                프리랜서와 에이전시를 위한 스마트한 견적서 관리
              </p>
            </div>

            {/* 기능 카드 3개 그리드 */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* 카드 1: 노션 연동 */}
              <Card>
                <CardHeader>
                  <div className="bg-primary/10 mb-2 flex h-10 w-10 items-center justify-center rounded-lg">
                    <FileText className="text-primary h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">노션 연동</CardTitle>
                  <CardDescription>
                    노션 URL 하나로 견적서 자동 생성
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    기존 노션 견적서 페이지를 그대로 활용하세요. URL만 입력하면
                    전문적인 견적서로 자동 변환됩니다.
                  </p>
                </CardContent>
              </Card>

              {/* 카드 2: 공유 링크 생성 */}
              <Card>
                <CardHeader>
                  <div className="bg-primary/10 mb-2 flex h-10 w-10 items-center justify-center rounded-lg">
                    <Share2 className="text-primary h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">공유 링크 생성</CardTitle>
                  <CardDescription>
                    클라이언트에게 전문적인 링크 즉시 발송
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    고유한 공유 링크를 생성하여 클라이언트에게 전송하세요.
                    로그인 없이도 견적서를 확인하고 응답할 수 있습니다.
                  </p>
                </CardContent>
              </Card>

              {/* 카드 3: 실시간 상태 추적 */}
              <Card>
                <CardHeader>
                  <div className="bg-primary/10 mb-2 flex h-10 w-10 items-center justify-center rounded-lg">
                    <BarChart3 className="text-primary h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">실시간 상태 추적</CardTitle>
                  <CardDescription>
                    승인/거절/보류 상태를 대시보드에서 관리
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    클라이언트의 응답 상태를 실시간으로 확인하세요. 모든 견적서
                    현황을 한눈에 파악할 수 있습니다.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
