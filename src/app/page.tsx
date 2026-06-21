import Link from 'next/link'
import { FileText, Share2, BarChart3, ArrowRight, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'

const features = [
  {
    icon: FileText,
    title: '노션 연동',
    description: '노션 URL 하나로 견적서 자동 생성',
    body: '기존 노션 견적서 페이지를 그대로 활용하세요. URL만 입력하면 전문적인 견적서로 자동 변환됩니다.',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
  },
  {
    icon: Share2,
    title: '공유 링크 생성',
    description: '클라이언트에게 전문적인 링크 즉시 발송',
    body: '고유한 공유 링크를 생성하여 클라이언트에게 전송하세요. 로그인 없이도 견적서를 확인하고 응답할 수 있습니다.',
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-950/40',
  },
  {
    icon: BarChart3,
    title: '실시간 상태 추적',
    description: '승인/거절/보류 상태를 대시보드에서 관리',
    body: '클라이언트의 응답 상태를 실시간으로 확인하세요. 모든 견적서 현황을 한눈에 파악할 수 있습니다.',
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-50 dark:bg-green-950/40',
  },
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col">
        {/* 히어로 섹션 */}
        <section className="relative flex flex-1 items-center justify-center overflow-hidden py-20">
          {/* 배경 gradient orb */}
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="bg-primary/5 absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full blur-3xl" />
            <div className="absolute right-1/4 -bottom-20 h-[400px] w-[400px] rounded-full bg-purple-500/5 blur-3xl" />
          </div>

          <div className="mx-auto max-w-3xl px-4 text-center">
            <Badge variant="outline" className="mb-6 gap-1.5 px-3 py-1">
              <Zap className="h-3 w-3 text-yellow-500" />
              <span className="text-xs">노션 URL → 견적서 5분 완성</span>
            </Badge>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
              노션 기반{' '}
              <span className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-transparent">
                견적서 공유
              </span>{' '}
              서비스
            </h1>
            <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-lg leading-relaxed">
              노션 URL 하나로 전문적인 견적서를 클라이언트에게 즉시 공유하세요.
              승인, 거절, 보류 응답을 실시간으로 확인할 수 있습니다.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/signup">
                <Button size="lg" className="gap-2 px-8 shadow-md">
                  무료로 시작하기
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="px-8">
                  로그인
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features 섹션 */}
        <section className="bg-muted/20 border-t py-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                주요 기능
              </h2>
              <p className="text-muted-foreground mt-3 text-base">
                프리랜서와 에이전시를 위한 스마트한 견적서 관리
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {features.map(
                ({ icon: Icon, title, description, body, color, bg }) => (
                  <Card
                    key={title}
                    className="group border shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <CardHeader className="pb-3">
                      <div
                        className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl ${bg}`}
                      >
                        <Icon className={`h-5 w-5 ${color}`} />
                      </div>
                      <CardTitle className="text-lg">{title}</CardTitle>
                      <CardDescription className="text-sm">
                        {description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {body}
                      </p>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
