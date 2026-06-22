import type { Metadata } from 'next'
import { unstable_cache } from 'next/cache'

import { InvoiceDashboardClient } from '@/components/invoice/invoice-dashboard-client'
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

export default async function AdminDashboardPage() {
  const invoicesWithItems = await getCachedInvoicesWithItems()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">대시보드</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          내 견적서 현황을 한눈에 확인하세요
        </p>
      </div>

      <InvoiceDashboardClient invoices={invoicesWithItems} />
    </div>
  )
}
