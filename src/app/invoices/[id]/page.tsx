import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Send, Copy } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Container } from '@/components/layout/container'

export const metadata: Metadata = {
  title: '견적서 상세',
  description: '견적서 내용을 확인하고 클라이언트에게 발송하세요',
}

// TODO: Supabase에서 실제 데이터 조회로 교체
const mockInvoice = {
  id: 'mock-id',
  title: '[견적서 제목 - 노션에서 임포트됨]',
  status: 'draft' as const,
  totalAmount: 0,
  notionUrl: '',
  clientName: '',
  clientEmail: '',
  clientCompany: '',
  items: [] as Array<{
    title: string
    quantity: number
    unitPrice: number
    amount: number
    description?: string
  }>,
  createdAt: new Date().toISOString(),
}

const statusConfig = {
  draft: { label: '초안', variant: 'secondary' as const },
  sent: { label: '발송됨', variant: 'default' as const },
  approved: { label: '승인됨', variant: 'default' as const },
  rejected: { label: '거절됨', variant: 'destructive' as const },
}

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  // TODO: Supabase에서 invoice 조회 (id 사용)
  void id

  const invoice = mockInvoice
  const status = statusConfig[invoice.status]

  return (
    <div className="min-h-screen">
      {/* TODO: 인증된 사용자 전용 헤더 */}
      <Container className="py-8">
        {/* 뒤로가기 */}
        <Link
          href="/dashboard"
          className="text-muted-foreground hover:text-foreground mb-6 flex items-center gap-2 text-sm transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          대시보드로 돌아가기
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* 메인 컨텐츠 (2/3) */}
          <div className="space-y-6 lg:col-span-2">
            {/* 견적서 헤더 */}
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold">{invoice.title}</h1>
                <p className="text-muted-foreground mt-1 text-sm">
                  생성일:{' '}
                  {new Date(invoice.createdAt).toLocaleDateString('ko-KR')}
                </p>
              </div>
              <Badge variant={status.variant}>{status.label}</Badge>
            </div>

            {/* 견적서 항목 테이블 */}
            <Card>
              <CardHeader>
                <CardTitle>견적 항목</CardTitle>
                <CardDescription>노션에서 임포트된 견적 내용</CardDescription>
              </CardHeader>
              <CardContent>
                {invoice.items.length === 0 ? (
                  <p className="text-muted-foreground py-8 text-center text-sm">
                    {/* TODO: 실제 데이터 표시 */}
                    임포트된 견적 항목이 여기에 표시됩니다.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {/* TODO: 항목 목록 렌더링 */}
                    {/* 컬럼: 항목명, 설명, 수량, 단가, 금액 */}
                  </div>
                )}
                <Separator className="my-4" />
                <div className="flex justify-end">
                  <div className="text-right">
                    <p className="text-muted-foreground text-sm">합계</p>
                    <p className="text-2xl font-bold">
                      {invoice.totalAmount.toLocaleString('ko-KR')}원
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 사이드바 (1/3) */}
          <div className="space-y-6">
            {/* 클라이언트 정보 입력 */}
            {/* TODO: React Hook Form으로 교체 + 편집/저장 토글 */}
            <Card>
              <CardHeader>
                <CardTitle>클라이언트 정보</CardTitle>
                <CardDescription>
                  견적서를 받을 클라이언트 정보를 입력하세요
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName">클라이언트 이름</Label>
                  <Input
                    id="clientName"
                    placeholder="김철수"
                    defaultValue={invoice.clientName}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientEmail">이메일</Label>
                  <Input
                    id="clientEmail"
                    type="email"
                    placeholder="client@company.com"
                    defaultValue={invoice.clientEmail}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientCompany">
                    회사명{' '}
                    <span className="text-muted-foreground font-normal">
                      (선택)
                    </span>
                  </Label>
                  <Input
                    id="clientCompany"
                    placeholder="(주)클라이언트"
                    defaultValue={invoice.clientCompany}
                  />
                </div>
              </CardContent>
            </Card>

            {/* 액션 버튼 */}
            <div className="space-y-3">
              {/* TODO: 발송 Server Action 연결 */}
              <Button className="w-full" disabled={invoice.status !== 'draft'}>
                <Send className="mr-2 h-4 w-4" />
                견적서 발송
              </Button>

              {invoice.status !== 'draft' && (
                <Button variant="outline" className="w-full">
                  <Copy className="mr-2 h-4 w-4" />
                  공개 링크 복사
                </Button>
              )}
            </div>

            {/* 클라이언트 응답 상태 (발송 후) */}
            {/* TODO: 실제 응답 데이터 연동 */}
          </div>
        </div>
      </Container>
    </div>
  )
}
