'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Plus,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  LayoutDashboard,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Container } from '@/components/layout/container'
import { InvoiceTable } from '@/components/invoice/invoice-table'
import { EmptyState } from '@/components/common/empty-state'
import { DUMMY_INVOICES } from '@/lib/data/dummy-invoices'
import type { InvoiceStatus } from '@/lib/types/invoice'

type ActiveTab = '전체' | InvoiceStatus

const statCards = [
  {
    label: '전체',
    icon: LayoutDashboard,
    color: 'text-primary',
    bg: 'bg-primary/10',
    count: (invoices: typeof DUMMY_INVOICES) => invoices.length,
  },
  {
    label: '대기',
    icon: Clock,
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-900/30',
    count: (invoices: typeof DUMMY_INVOICES) =>
      invoices.filter(i => i.status === '대기').length,
  },
  {
    label: '승인',
    icon: CheckCircle,
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-50 dark:bg-green-900/30',
    count: (invoices: typeof DUMMY_INVOICES) =>
      invoices.filter(i => i.status === '승인').length,
  },
  {
    label: '거절',
    icon: XCircle,
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-900/30',
    count: (invoices: typeof DUMMY_INVOICES) =>
      invoices.filter(i => i.status === '거절').length,
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<ActiveTab>('전체')

  const filteredInvoices =
    activeTab === '전체'
      ? DUMMY_INVOICES
      : DUMMY_INVOICES.filter(invoice => invoice.status === activeTab)

  const handleRowClick = (id: string) => {
    router.push(`/invoices/${id}`)
  }

  return (
    <div className="min-h-screen">
      {/* 대시보드 헤더 */}
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 border-b backdrop-blur">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <span className="text-xl font-bold tracking-tight">InvoiceWeb</span>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => {}}>
                로그아웃
              </Button>
            </div>
          </div>
        </Container>
      </header>

      <Container className="py-10">
        {/* 페이지 헤더 */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">대시보드</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              내 견적서 현황을 한눈에 확인하세요
            </p>
          </div>
          <Link href="/invoices/new">
            <Button className="gap-2 shadow-sm">
              <Plus className="h-4 w-4" />새 견적서 작성
            </Button>
          </Link>
        </div>

        {/* 통계 요약 카드 */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {statCards.map(({ label, icon: Icon, color, bg, count }) => (
            <Card key={label} className="border shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground text-sm font-medium">
                    {label}
                  </p>
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${bg}`}
                  >
                    <Icon className={`h-4 w-4 ${color}`} />
                  </div>
                </div>
                <p className="mt-3 text-3xl font-bold tracking-tight">
                  {count(DUMMY_INVOICES)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 상태별 탭 필터 */}
        <Tabs
          value={activeTab}
          onValueChange={value => setActiveTab(value as ActiveTab)}
        >
          <TabsList className="mb-6 h-10">
            <TabsTrigger value="전체" className="text-sm">
              전체 ({DUMMY_INVOICES.length})
            </TabsTrigger>
            <TabsTrigger value="대기" className="text-sm">
              대기 ({DUMMY_INVOICES.filter(i => i.status === '대기').length})
            </TabsTrigger>
            <TabsTrigger value="승인" className="text-sm">
              승인 ({DUMMY_INVOICES.filter(i => i.status === '승인').length})
            </TabsTrigger>
            <TabsTrigger value="거절" className="text-sm">
              거절 ({DUMMY_INVOICES.filter(i => i.status === '거절').length})
            </TabsTrigger>
          </TabsList>

          {(['전체', '대기', '승인', '거절'] as ActiveTab[]).map(tab => (
            <TabsContent key={tab} value={tab}>
              {filteredInvoices.length === 0 ? (
                <EmptyState
                  icon={FileText}
                  title="견적서가 없습니다"
                  description={
                    activeTab === '전체'
                      ? '첫 번째 견적서를 작성하고 클라이언트에게 공유해보세요.'
                      : `${activeTab} 상태의 견적서가 없습니다.`
                  }
                  action={
                    activeTab === '전체' ? (
                      <Link href="/invoices/new">
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />새 견적서 작성
                        </Button>
                      </Link>
                    ) : undefined
                  }
                />
              ) : (
                <InvoiceTable
                  invoices={filteredInvoices}
                  onRowClick={handleRowClick}
                />
              )}
            </TabsContent>
          ))}
        </Tabs>
      </Container>
    </div>
  )
}
