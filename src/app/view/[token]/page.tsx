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
    <div className="bg-muted/20 min-h-screen py-10">
      <div className="mx-auto max-w-3xl px-4">
        {/* 견적서 헤더 */}
        <div className="mb-8 text-center">
          <span className="text-muted-foreground inline-block rounded-full border px-3 py-1 text-xs font-medium">
            견적서
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight">
            {invoice.title}
          </h1>
          <div className="text-muted-foreground mt-3 flex items-center justify-center gap-4 text-sm">
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
        <Card className="mb-4 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
              발행자 정보
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y text-sm">
              <div className="flex justify-between py-2.5">
                <span className="text-muted-foreground">이름</span>
                <span className="font-medium">김프리</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-muted-foreground">소속</span>
                <span className="font-medium">ABC 에이전시</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-muted-foreground">연락처</span>
                <span className="font-medium">freelancer@example.com</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 견적서 항목 */}
        <Card className="mb-6 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">견적 내용</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <InvoiceItemsTable
              items={invoice.items}
              totalAmount={invoice.totalAmount}
            />
          </CardContent>
        </Card>

        {/* 액션 버튼 영역 */}
        <Card className="shadow-sm">
          <CardContent className="space-y-4 p-5">
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => {}}
            >
              <Download className="h-4 w-4" />
              PDF 다운로드
            </Button>

            <Separator />

            <div>
              <p className="text-muted-foreground mb-3 text-center text-sm font-medium">
                이 견적서에 대한 의사를 알려주세요
              </p>
              <InvoiceViewActions />
            </div>
          </CardContent>
        </Card>

        {/* 푸터 */}
        <p className="text-muted-foreground mt-8 text-center text-xs">
          이 견적서는 InvoiceWeb을 통해 공유되었습니다.
        </p>
      </div>
    </div>
  )
}
