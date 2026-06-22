import type { Metadata } from 'next'
import { FileText } from 'lucide-react'
import { unstable_cache } from 'next/cache'

import { Container } from '@/components/layout/container'
import { InvoiceDashboardClient } from '@/components/invoice/invoice-dashboard-client'
import { ThemeToggle } from '@/components/theme-toggle'
import { listInvoices, getInvoiceItems } from '@/lib/notion'
import type { InvoiceWithItems } from '@/lib/types/invoice'

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
  title: '대시보드 | InvoiceWeb',
  description: '내 견적서 현황을 한눈에 확인하세요',
}

export default async function HomePage() {
  const invoicesWithItems = await getCachedInvoicesWithItems()

  return (
    <div className="min-h-screen">
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 border-b backdrop-blur">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
                <FileText className="text-primary-foreground h-4 w-4" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                InvoiceWeb
              </span>
            </div>
            <ThemeToggle />
          </div>
        </Container>
      </header>

      <Container className="py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">대시보드</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            내 견적서 현황을 한눈에 확인하세요
          </p>
        </div>

        <InvoiceDashboardClient invoices={invoicesWithItems} />
      </Container>
    </div>
  )
}
