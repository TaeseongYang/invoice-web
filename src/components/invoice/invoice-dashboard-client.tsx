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
import { InvoiceTable } from '@/components/invoice/invoice-table'
import { EmptyState } from '@/components/common/empty-state'
import type { InvoiceWithItems, InvoiceStatus } from '@/lib/types/invoice'

type ActiveTab = '전체' | InvoiceStatus

const statCards = [
  {
    label: '전체',
    icon: LayoutDashboard,
    color: 'text-primary',
    bg: 'bg-primary/10',
    count: (invoices: InvoiceWithItems[]) => invoices.length,
  },
  {
    label: '대기',
    icon: Clock,
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-900/30',
    count: (invoices: InvoiceWithItems[]) =>
      invoices.filter(i => i.status === '대기').length,
  },
  {
    label: '승인',
    icon: CheckCircle,
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-50 dark:bg-green-900/30',
    count: (invoices: InvoiceWithItems[]) =>
      invoices.filter(i => i.status === '승인').length,
  },
  {
    label: '거절',
    icon: XCircle,
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-900/30',
    count: (invoices: InvoiceWithItems[]) =>
      invoices.filter(i => i.status === '거절').length,
  },
]

interface InvoiceDashboardClientProps {
  invoices: InvoiceWithItems[]
}

export function InvoiceDashboardClient({
  invoices,
}: InvoiceDashboardClientProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<ActiveTab>('전체')

  const filteredInvoices =
    activeTab === '전체'
      ? invoices
      : invoices.filter(invoice => invoice.status === activeTab)

  const handleRowClick = (id: string) => {
    router.push(`/invoices/${id}`)
  }

  return (
    <>
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
                {count(invoices)}
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
            전체 ({invoices.length})
          </TabsTrigger>
          <TabsTrigger value="대기" className="text-sm">
            대기 ({invoices.filter(i => i.status === '대기').length})
          </TabsTrigger>
          <TabsTrigger value="승인" className="text-sm">
            승인 ({invoices.filter(i => i.status === '승인').length})
          </TabsTrigger>
          <TabsTrigger value="거절" className="text-sm">
            거절 ({invoices.filter(i => i.status === '거절').length})
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
    </>
  )
}
