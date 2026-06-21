import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { Container } from '@/components/layout/container'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { InvoiceItemsTable } from '@/components/invoice/invoice-items-table'
import { StatusBadge } from '@/components/invoice/status-badge'
import { InvoiceDetailClient } from '@/components/invoice/invoice-detail-client'
import { getInvoiceWithItemsAction } from '@/app/actions/invoices'

export const metadata: Metadata = {
  title: '견적서 상세',
  description: '견적서 내용을 확인하고 클라이언트에게 발송하세요',
}

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const invoice = await getInvoiceWithItemsAction(id)

  if (!invoice) {
    notFound()
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

          {/* 사이드바 (1/3) — 클라이언트 인터랙션 영역 */}
          <InvoiceDetailClient invoice={invoice} />
        </div>
      </Container>
    </div>
  )
}
