import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, XCircle, Clock } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: '응답 완료',
  description: '견적서에 응답하셨습니다',
}

export default async function InvoiceResponsePage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  // Next.js 15 async searchParams 패턴
  const { status } = await searchParams

  // 상태별 아이콘 및 메시지 설정
  const getResponseConfig = (responseStatus: string | undefined) => {
    switch (responseStatus) {
      case '승인':
        return {
          icon: CheckCircle,
          iconClass: 'text-green-600',
          bgClass: 'bg-green-50 dark:bg-green-950/30',
          title: '견적서를 승인했습니다',
          description: '담당자에게 승인 응답이 전달되었습니다.',
        }
      case '거절':
        return {
          icon: XCircle,
          iconClass: 'text-red-600',
          bgClass: 'bg-red-50 dark:bg-red-950/30',
          title: '견적서를 거절했습니다',
          description: '담당자에게 거절 응답이 전달되었습니다.',
        }
      case '보류':
        return {
          icon: Clock,
          iconClass: 'text-amber-600',
          bgClass: 'bg-amber-50 dark:bg-amber-950/30',
          title: '검토 중으로 표시했습니다',
          description: '담당자에게 보류 응답이 전달되었습니다.',
        }
      default:
        return {
          icon: CheckCircle,
          iconClass: 'text-green-600',
          bgClass: 'bg-green-50 dark:bg-green-950/30',
          title: '응답이 완료되었습니다',
          description: '담당자에게 응답이 전달되었습니다.',
        }
    }
  }

  const config = getResponseConfig(status)
  const Icon = config.icon
  // 응답 일시 타임스탬프
  const respondedAt = new Date().toLocaleDateString('ko-KR')

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            {/* 상태 아이콘 */}
            <div
              className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${config.bgClass}`}
            >
              <Icon className={`h-8 w-8 ${config.iconClass}`} />
            </div>
            <CardTitle className="text-2xl">{config.title}</CardTitle>
            <CardDescription>{config.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 응답 타임스탬프 */}
            <div className="bg-muted rounded-md p-3 text-center">
              <p className="text-muted-foreground text-xs">응답 일시</p>
              <p className="mt-1 text-sm font-medium">{respondedAt}</p>
            </div>

            {/* 홈으로 돌아가기 버튼 */}
            <Link href="/">
              <Button variant="outline" className="w-full">
                홈으로 돌아가기
              </Button>
            </Link>
          </CardContent>
        </Card>

        <p className="text-muted-foreground mt-4 text-center text-xs">
          이 페이지는 InvoiceWeb을 통해 제공됩니다.
        </p>
      </div>
    </div>
  )
}
