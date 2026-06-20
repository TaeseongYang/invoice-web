import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Download, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: '견적서 확인',
  description: '견적서를 확인하고 응답하세요',
}

// TODO: Supabase에서 token으로 견적서 조회 + 만료 검증
async function getInvoiceByToken(_token: string) {
  // 임시 mock - 실제로는 Supabase 조회
  return {
    isExpired: false,
    isFound: true,
    invoice: {
      title: '[견적서 제목]',
      freelancerName: '[프리랜서 이름]',
      freelancerCompany: '[프리랜서 회사명]',
      totalAmount: 0,
      items: [] as Array<{
        title: string
        quantity: number
        unitPrice: number
        amount: number
        description?: string
      }>,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
    },
  }
}

export default async function InvoiceViewPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  const result = await getInvoiceByToken(token)

  // 404: 존재하지 않는 토큰
  if (!result.isFound) {
    notFound()
  }

  // 만료된 링크
  if (result.isExpired) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-8 pb-8">
            <AlertTriangle className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <h2 className="mb-2 text-xl font-bold">링크가 만료되었습니다</h2>
            <p className="text-muted-foreground text-sm">
              이 견적서 링크는 유효 기간(30일)이 지났습니다.
              <br />
              새로운 링크를 요청하려면 담당자에게 문의하세요.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { invoice } = result

  return (
    <div className="min-h-screen bg-gray-50 py-8 dark:bg-gray-900">
      <div className="mx-auto max-w-3xl px-4">
        {/* 견적서 헤더 */}
        <div className="mb-6 text-center">
          <p className="text-muted-foreground text-sm">견적서</p>
          <h1 className="mt-1 text-3xl font-bold">{invoice.title}</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            발행: {invoice.freelancerName}
            {invoice.freelancerCompany && ` · ${invoice.freelancerCompany}`}
          </p>
        </div>

        {/* 견적서 내용 */}
        <Card className="mb-6" id="invoice-print-area">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>견적 내용</CardTitle>
              <p className="text-muted-foreground text-sm">
                유효기간:{' '}
                {new Date(invoice.expiresAt).toLocaleDateString('ko-KR')}
                까지
              </p>
            </div>
          </CardHeader>
          <CardContent>
            {invoice.items.length === 0 ? (
              <p className="text-muted-foreground py-8 text-center text-sm">
                {/* TODO: 실제 항목 데이터 표시 */}
                견적 항목이 여기에 표시됩니다.
              </p>
            ) : (
              <div className="space-y-3">
                {/* TODO: 항목 목록 렌더링 */}
                {/* 컬럼: 항목명, 설명, 수량, 단가, 금액 */}
              </div>
            )}

            <Separator className="my-4" />
            <div className="flex justify-end">
              <div className="text-right">
                <p className="text-muted-foreground text-sm">총액</p>
                <p className="text-3xl font-bold">
                  {invoice.totalAmount.toLocaleString('ko-KR')}원
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 액션 버튼 */}
        <div className="space-y-4">
          {/* PDF 다운로드 */}
          <Button variant="outline" className="w-full">
            <Download className="mr-2 h-4 w-4" />
            PDF 다운로드
            {/* TODO: html2pdf.js 또는 jsPDF + html2canvas 연동 */}
          </Button>

          {/* 응답 버튼 그룹 */}
          <div className="grid grid-cols-3 gap-3">
            {/* TODO: Server Action으로 응답 상태 저장 후 /view/[token]/response 이동 */}
            <Button className="w-full bg-green-600 hover:bg-green-700">
              <CheckCircle className="mr-2 h-4 w-4" />
              승인
            </Button>
            <Button
              variant="outline"
              className="w-full border-yellow-500 text-yellow-600 hover:bg-yellow-50"
            >
              <Clock className="mr-2 h-4 w-4" />
              보류
            </Button>
            <Button variant="destructive" className="w-full">
              <XCircle className="mr-2 h-4 w-4" />
              거절
            </Button>
          </div>
        </div>

        {/* 푸터 */}
        <p className="text-muted-foreground mt-8 text-center text-xs">
          이 견적서는 InvoiceWeb을 통해 공유되었습니다.
        </p>
      </div>
    </div>
  )
}
