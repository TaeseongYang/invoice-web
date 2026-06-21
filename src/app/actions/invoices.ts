'use server'

import { unstable_cache, revalidateTag } from 'next/cache'
import {
  getInvoiceById,
  getInvoiceItems,
  updateInvoiceStatus,
} from '@/lib/notion'
import type { InvoiceWithItems, InvoiceStatus } from '@/lib/types/invoice'

// 견적서 상세 캐싱 — 60초 TTL, 상태 변경 시 revalidateTag('invoices')로 무효화
const getCachedInvoiceWithItems = unstable_cache(
  async (pageId: string): Promise<InvoiceWithItems | null> => {
    const invoice = await getInvoiceById(pageId)
    if (!invoice) return null
    const items = await getInvoiceItems(invoice.itemIds)
    return { ...invoice, items }
  },
  ['invoice-with-items'],
  { revalidate: 60, tags: ['invoices'] }
)

export async function getInvoiceWithItemsAction(
  pageId: string
): Promise<InvoiceWithItems | null> {
  return getCachedInvoiceWithItems(pageId)
}

export async function updateInvoiceStatusAction(
  pageId: string,
  status: InvoiceStatus
): Promise<void> {
  await updateInvoiceStatus(pageId, status)
  revalidateTag('invoices')
}
