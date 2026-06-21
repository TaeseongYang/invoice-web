import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { unstable_cache } from 'next/cache'

import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/container'
import { InvoiceDashboardClient } from '@/components/invoice/invoice-dashboard-client'
import { listInvoices, getInvoiceItems } from '@/lib/notion'
import type { InvoiceWithItems } from '@/lib/types/invoice'

// 대시보드 견적서 목록 캐싱 — 30초 TTL, tags: ['invoices']로 상태 변경 시 무효화
const getCachedInvoicesWithItems = unstable_cache(
  async (): Promise<InvoiceWithItems[]> => {
    const invoices = await listInvoices()
    return Promise.all(
      invoices.map(async invoice => {
        const items = await getInvoiceItems(invoice.itemIds)
        return { ...invoice, items }
      })
    )
  },
  ['dashboard-invoices'],
  { revalidate: 30, tags: ['invoices'] }
)

export const metadata: Metadata = {
  title: '대시보드',
  description: '내 견적서 현황을 한눈에 확인하세요',
}

export default async function DashboardPage() {
  const invoicesWithItems = await getCachedInvoicesWithItems()

  return (
    <div className="min-h-screen">
      {/* 대시보드 헤더 */}
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 border-b backdrop-blur">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <span className="text-xl font-bold tracking-tight">InvoiceWeb</span>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
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

        <InvoiceDashboardClient invoices={invoicesWithItems} />
      </Container>
    </div>
  )
}
