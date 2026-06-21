import type { Metadata } from 'next'
import { Download } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ErrorCard } from '@/components/common/error-card'
import { InvoiceItemsTable } from '@/components/invoice/invoice-items-table'
import { InvoiceViewActions } from '@/components/invoice/invoice-view-actions'
import { DUMMY_INVOICE } from '@/lib/data/dummy-invoices'

export const metadata: Metadata = {
  title: '견적서 확인',
  description: '견적서를 확인하고 응답하세요',
}

export default async function InvoiceViewPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params

  // 만료된 링크 처리
  if (token === 'expired') {
    return (
      <ErrorCard
        variant="expired"
        title="링크가 만료되었습니다"
        description="이 견적서 링크는 유효 기간이 지났습니다. 새로운 링크를 요청하려면 담당자에게 문의하세요."
      />
    )
  }

  // 유효하지 않은 링크 처리
  if (token === 'invalid') {
    return (
      <ErrorCard
        variant="invalid"
        title="유효하지 않은 링크입니다"
        description="존재하지 않는 견적서 링크입니다. URL을 다시 확인하거나 담당자에게 문의하세요."
      />
    )
  }

  // TODO: 실제 token으로 데이터베이스에서 견적서 조회
  const invoice = DUMMY_INVOICE

  return (
    <div className="bg-muted/30 min-h-screen py-8">
      <div className="mx-auto max-w-3xl px-4">
        {/* 견적서 헤더 */}
        <div className="mb-6 text-center">
          <p className="text-muted-foreground text-sm">견적서</p>
          <h1 className="mt-1 text-3xl font-bold">{invoice.title}</h1>
          <div className="text-muted-foreground mt-2 flex items-center justify-center gap-4 text-sm">
            {invoice.issuedAt && (
              <span>
                발행일: {new Date(invoice.issuedAt).toLocaleDateString('ko-KR')}
              </span>
            )}
            {invoice.expiresAt && (
              <span>
                유효기간:{' '}
                {new Date(invoice.expiresAt).toLocaleDateString('ko-KR')}까지
              </span>
            )}
          </div>
        </div>

        {/* 프리랜서 정보 카드 */}
        <Card className="mb-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">발행자 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">이름</span>
                <span className="font-medium">김프리</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">소속</span>
                <span className="font-medium">ABC 에이전시</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">연락처</span>
                <span className="font-medium">freelancer@example.com</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 견적서 항목 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>견적 내용</CardTitle>
          </CardHeader>
          <CardContent>
            <InvoiceItemsTable
              items={invoice.items}
              totalAmount={invoice.totalAmount}
            />
          </CardContent>
        </Card>

        {/* 액션 버튼 영역 */}
        <div className="space-y-4">
          {/* PDF 다운로드 버튼 (UI만) */}
          <Button variant="outline" className="w-full" onClick={() => {}}>
            <Download className="mr-2 h-4 w-4" />
            PDF 다운로드
            {/* TODO: PDF 다운로드 기능 구현 필요 */}
          </Button>

          <Separator />

          {/* 승인/보류/거절 버튼 */}
          <InvoiceViewActions />
        </div>

        {/* 푸터 */}
        <p className="text-muted-foreground mt-8 text-center text-xs">
          이 견적서는 InvoiceWeb을 통해 공유되었습니다.
        </p>
      </div>
    </div>
  )
}
