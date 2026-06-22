'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  LayoutDashboard,
  Search,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { InvoiceTable } from '@/components/invoice/invoice-table'
import { EmptyState } from '@/components/common/empty-state'
import type { InvoiceWithItems, InvoiceStatus } from '@/lib/types/invoice'

type ActiveTab = '전체' | InvoiceStatus
type SortKey = 'date' | 'amount' | 'status'
type SortDir = 'asc' | 'desc'

const PAGE_SIZE = 10

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

const STATUS_ORDER: Record<InvoiceStatus, number> = {
  대기: 0,
  승인: 1,
  거절: 2,
}

interface InvoiceDashboardClientProps {
  invoices: InvoiceWithItems[]
}

export function InvoiceDashboardClient({
  invoices,
}: InvoiceDashboardClientProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<ActiveTab>('전체')
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('date')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [page, setPage] = useState(1)

  const handleRowClick = (id: string) => {
    router.push(`/invoices/${id}`)
  }

  const processed = useMemo(() => {
    let result =
      activeTab === '전체'
        ? invoices
        : invoices.filter(i => i.status === activeTab)

    // 검색 필터
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      result = result.filter(
        i =>
          i.title.toLowerCase().includes(q) ||
          i.clientName.toLowerCase().includes(q)
      )
    }

    // 정렬
    result = [...result].sort((a, b) => {
      let cmp = 0
      if (sortKey === 'date') {
        const dateA = a.issuedAt ? new Date(a.issuedAt).getTime() : 0
        const dateB = b.issuedAt ? new Date(b.issuedAt).getTime() : 0
        cmp = dateA - dateB
      } else if (sortKey === 'amount') {
        cmp = (a.totalAmount ?? 0) - (b.totalAmount ?? 0)
      } else if (sortKey === 'status') {
        cmp = STATUS_ORDER[a.status] - STATUS_ORDER[b.status]
      }
      return sortDir === 'asc' ? cmp : -cmp
    })

    return result
  }, [invoices, activeTab, search, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(processed.length / PAGE_SIZE))
  const paginated = processed.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  // 탭/검색 변경 시 첫 페이지로 이동
  const handleTabChange = (value: string) => {
    setActiveTab(value as ActiveTab)
    setPage(1)
  }

  const handleSearch = (value: string) => {
    setSearch(value)
    setPage(1)
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
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <TabsList className="h-10">
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

          {/* 검색 + 정렬 */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="이름, 제목 검색..."
                value={search}
                onChange={e => handleSearch(e.target.value)}
                className="h-9 w-48 pl-8 text-sm"
              />
            </div>
            <Select
              value={`${sortKey}-${sortDir}`}
              onValueChange={value => {
                const [key, dir] = value.split('-') as [SortKey, SortDir]
                setSortKey(key)
                setSortDir(dir)
                setPage(1)
              }}
            >
              <SelectTrigger className="h-9 w-36 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">날짜 최신순</SelectItem>
                <SelectItem value="date-asc">날짜 오래된순</SelectItem>
                <SelectItem value="amount-desc">금액 높은순</SelectItem>
                <SelectItem value="amount-asc">금액 낮은순</SelectItem>
                <SelectItem value="status-asc">상태순</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {(['전체', '대기', '승인', '거절'] as ActiveTab[]).map(tab => (
          <TabsContent key={tab} value={tab}>
            {paginated.length === 0 ? (
              <EmptyState
                icon={FileText}
                title={search ? '검색 결과가 없습니다' : '견적서가 없습니다'}
                description={
                  search
                    ? `"${search}"에 해당하는 견적서를 찾을 수 없습니다.`
                    : activeTab === '전체'
                      ? '첫 번째 견적서를 작성하고 클라이언트에게 공유해보세요.'
                      : `${activeTab} 상태의 견적서가 없습니다.`
                }
                action={undefined}
              />
            ) : (
              <>
                <InvoiceTable
                  invoices={paginated}
                  onRowClick={handleRowClick}
                />

                {/* 페이지네이션 */}
                {totalPages > 1 && (
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-muted-foreground text-sm">
                      {(page - 1) * PAGE_SIZE + 1}–
                      {Math.min(page * PAGE_SIZE, processed.length)} /{' '}
                      {processed.length}건
                    </p>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm">
                        {page} / {totalPages}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          setPage(p => Math.min(totalPages, p + 1))
                        }
                        disabled={page === totalPages}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </>
  )
}
