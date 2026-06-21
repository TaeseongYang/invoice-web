'use server'

import {
  getInvoiceById,
  getInvoiceItems,
  updateInvoiceStatus,
} from '@/lib/notion'
import type { InvoiceWithItems, InvoiceStatus } from '@/lib/types/invoice'

export async function getInvoiceWithItemsAction(
  pageId: string
): Promise<InvoiceWithItems | null> {
  const invoice = await getInvoiceById(pageId)
  if (!invoice) return null

  const items = await getInvoiceItems(invoice.itemIds)
  return { ...invoice, items }
}

export async function updateInvoiceStatusAction(
  pageId: string,
  status: InvoiceStatus
): Promise<void> {
  await updateInvoiceStatus(pageId, status)
}
