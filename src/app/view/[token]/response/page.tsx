'use client'

import { useSearchParams } from 'next/navigation'
import { CheckCircle, Clock, XCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

// export const metadata: Metadata = {
//   title: '응답 완료',
//   description: '견적서에 응답하셨습니다',
// }

const responseConfig = {
  approved: {
    icon: CheckCircle,
    iconClass: 'text-green-600',
    bgClass: 'bg-green-50 dark:bg-green-950',
    title: '견적서를 승인하셨습니다',
    description: '담당자에게 승인 응답이 전달되었습니다.',
  },
  pending: {
    icon: Clock,
    iconClass: 'text-yellow-600',
    bgClass: 'bg-yellow-50 dark:bg-yellow-950',
    title: '견적서를 보류하셨습니다',
    description: '담당자에게 보류 응답이 전달되었습니다.',
  },
  rejected: {
    icon: XCircle,
    iconClass: 'text-red-600',
    bgClass: 'bg-red-50 dark:bg-red-950',
    title: '견적서를 거절하셨습니다',
    description: '담당자에게 거절 응답이 전달되었습니다.',
  },
}

export default function InvoiceResponsePage() {
  const searchParams = useSearchParams()
  // TODO: token과 status로 DB에서 실제 응답 데이터 조회

  const statusParam = searchParams.get('status') ?? 'approved'
  const status = (
    statusParam in responseConfig ? statusParam : 'approved'
  ) as keyof typeof responseConfig
  const notes = searchParams.get('notes')

  const config = responseConfig[status]
  const Icon = config.icon
  const respondedAt = new Date().toLocaleString('ko-KR')

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div
              className={`${config.bgClass} mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full`}
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

            {/* 거절 사유 (있을 경우) */}
            {status === 'rejected' && notes && (
              <div className="bg-muted rounded-md p-3">
                <p className="text-muted-foreground mb-1 text-xs">거절 사유</p>
                <p className="text-sm">{notes}</p>
              </div>
            )}

            {/* 닫기 버튼 */}
            {/* TODO: 별도 CloseButton Client Component로 분리하거나 history.back() 구현 */}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.history.back()}
            >
              닫기
            </Button>
          </CardContent>
        </Card>

        <p className="text-muted-foreground mt-4 text-center text-xs">
          이 페이지는 InvoiceWeb을 통해 제공됩니다.
        </p>
      </div>
    </div>
  )
}
