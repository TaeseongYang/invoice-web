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
    <div className="min-h-screen">
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
          {/* 메인 콘텐츠 (2/3) */}
          <div className="space-y-6 lg:col-span-2">
            {/* 견적서 헤더 */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">{invoice.title}</h1>
                <p className="text-muted-foreground mt-1 text-sm">
                  발행일:{' '}
                  {invoice.issuedAt
                    ? new Date(invoice.issuedAt).toLocaleDateString('ko-KR')
                    : '-'}
                </p>
              </div>
              <StatusBadge status={invoice.status} />
            </div>

            {/* 견적서 항목 테이블 */}
            <Card>
              <CardHeader>
                <CardTitle>견적 항목</CardTitle>
                <CardDescription>노션에서 임포트된 견적 내용</CardDescription>
              </CardHeader>
              <CardContent>
                <InvoiceItemsTable
                  items={invoice.items}
                  totalAmount={invoice.totalAmount}
                />
              </CardContent>
            </Card>
          </div>

          {/* 사이드바 (1/3) */}
          <div className="space-y-6">
            {/* 클라이언트 정보 섹션 */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>클라이언트 정보</CardTitle>
                    <CardDescription>
                      견적서를 받을 클라이언트 정보
                    </CardDescription>
                  </div>
                  {/* 편집 토글 버튼 */}
                  <Button
                    variant="ghost"
                    size="sm"
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
                  /* 편집 모드 */
                  <>
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
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clientCompany">
                        회사명{' '}
                        <span className="text-muted-foreground font-normal">
                          (선택)
                        </span>
                      </Label>
                      <Input id="clientCompany" placeholder="(주)클라이언트" />
                    </div>
                    {/* 저장 버튼 */}
                    <Button
                      className="w-full"
                      size="sm"
                      onClick={() => {
                        /* TODO: 클라이언트 정보 저장 Server Action 연결 */
                        setIsEditing(false)
                      }}
                    >
                      <Check className="mr-2 h-4 w-4" />
                      저장
                    </Button>
                  </>
                ) : (
                  /* 보기 모드 */
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">이름</span>
                      <span className="font-medium">
                        {invoice.clientName || '-'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">이메일</span>
                      <span className="font-medium">-</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">회사명</span>
                      <span className="font-medium">-</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 상태별 액션 버튼 */}
            <div className="space-y-3">
              {invoice.status === '대기' ? (
                /* 대기 상태: 발송하기 버튼 */
                <Button className="w-full" onClick={handleSend}>
                  <Send className="mr-2 h-4 w-4" />
                  발송하기
                </Button>
              ) : (
                /* 승인/거절 상태: 공유 링크 복사 버튼 */
                <CopyButton
                  text={`${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}/view/dummy-token`}
                  label="공유 링크 복사"
                />
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
