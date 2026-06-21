'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Send, Pencil, Check, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Container } from '@/components/layout/container'
import { InvoiceItemsTable } from '@/components/invoice/invoice-items-table'
import { StatusBadge } from '@/components/invoice/status-badge'
import { CopyButton } from '@/components/invoice/copy-button'
import { DUMMY_INVOICE } from '@/lib/data/dummy-invoices'

export default function InvoiceDetailPage() {
  const params = useParams()
  const router = useRouter()
  // URL params에서 id 추출
  const id = params.id as string
  void id

  // TODO: 실제 데이터베이스에서 id 기반 견적서 조회 로직 연결
  const invoice = DUMMY_INVOICE

  // 클라이언트 정보 편집 토글 상태 관리
  const [isEditing, setIsEditing] = useState(false)

  const handleSend = () => {
    // TODO: 발송 Server Action 연결
    router.push(`/invoices/dummy-001/sent`)
  }

  return (
    <div className="bg-muted/10 min-h-screen">
      <Container className="py-10">
        {/* 뒤로가기 */}
        <Link
          href="/dashboard"
          className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 text-sm transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          대시보드로 돌아가기
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* 메인 콘텐츠 (2/3) */}
          <div className="space-y-6 lg:col-span-2">
            {/* 견적서 헤더 */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight">
                  {invoice.title}
                </h1>
                <p className="text-muted-foreground mt-2 text-sm">
                  발행일:{' '}
                  {invoice.issuedAt
                    ? new Date(invoice.issuedAt).toLocaleDateString('ko-KR')
                    : '-'}
                  {invoice.expiresAt && (
                    <span className="ml-3">
                      유효기간:{' '}
                      {new Date(invoice.expiresAt).toLocaleDateString('ko-KR')}
                      까지
                    </span>
                  )}
                </p>
              </div>
              <StatusBadge status={invoice.status} />
            </div>

            {/* 견적서 항목 테이블 */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold">
                  견적 항목
                </CardTitle>
                <CardDescription>노션에서 임포트된 견적 내용</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <InvoiceItemsTable
                  items={invoice.items}
                  totalAmount={invoice.totalAmount}
                />
              </CardContent>
            </Card>
          </div>

          {/* 사이드바 (1/3) */}
          <div className="space-y-5">
            {/* 클라이언트 정보 섹션 */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-semibold">
                      클라이언트 정보
                    </CardTitle>
                    <CardDescription className="mt-0.5 text-xs">
                      견적서를 받을 클라이언트 정보
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? (
                      <X className="h-4 w-4" />
                    ) : (
                      <Pencil className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="clientName"
                        className="text-xs font-medium"
                      >
                        클라이언트 이름
                      </Label>
                      <Input
                        id="clientName"
                        placeholder="김철수"
                        defaultValue={invoice.clientName}
                        className="h-9"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="clientEmail"
                        className="text-xs font-medium"
                      >
                        이메일
                      </Label>
                      <Input
                        id="clientEmail"
                        type="email"
                        placeholder="client@company.com"
                        className="h-9"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="clientCompany"
                        className="text-xs font-medium"
                      >
                        회사명{' '}
                        <span className="text-muted-foreground font-normal">
                          (선택)
                        </span>
                      </Label>
                      <Input
                        id="clientCompany"
                        placeholder="(주)클라이언트"
                        className="h-9"
                      />
                    </div>
                    <Button
                      className="w-full"
                      size="sm"
                      onClick={() => {
                        setIsEditing(false)
                      }}
                    >
                      <Check className="mr-2 h-3.5 w-3.5" />
                      저장
                    </Button>
                  </>
                ) : (
                  <div className="divide-y text-sm">
                    <div className="flex justify-between py-2.5">
                      <span className="text-muted-foreground">이름</span>
                      <span className="font-medium">
                        {invoice.clientName || '-'}
                      </span>
                    </div>
                    <div className="flex justify-between py-2.5">
                      <span className="text-muted-foreground">이메일</span>
                      <span className="font-medium">-</span>
                    </div>
                    <div className="flex justify-between py-2.5">
                      <span className="text-muted-foreground">회사명</span>
                      <span className="font-medium">-</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 상태별 액션 버튼 */}
            <Card className="border-dashed shadow-none">
              <CardContent className="p-4">
                {invoice.status === '대기' ? (
                  <Button
                    className="w-full gap-2 shadow-sm"
                    onClick={handleSend}
                  >
                    <Send className="h-4 w-4" />
                    발송하기
                  </Button>
                ) : (
                  <CopyButton
                    text={`${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}/view/dummy-token`}
                    label="공유 링크 복사"
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  )
}
