import { collectPaginatedAPI, isFullPage } from '@notionhq/client'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import type { Invoice, InvoiceItem, InvoiceStatus } from '@/lib/types'
import { env } from '@/lib/env'

import { createNotionClient } from './client'
import { withRetry } from './retry'

// Notion API 응답 페이지를 Invoice 타입으로 변환
function parseInvoicePage(page: PageObjectResponse): Invoice {
  const props = page.properties

  const titleProp = props['견적서 번호']
  const title =
    titleProp.type === 'title' ? (titleProp.title[0]?.plain_text ?? '') : ''

  const clientNameProp = props['클라이언트명']
  const clientName =
    clientNameProp.type === 'rich_text'
      ? (clientNameProp.rich_text[0]?.plain_text ?? '')
      : ''

  const statusProp = props['상태']
  const status =
    statusProp.type === 'status'
      ? ((statusProp.status?.name ?? '대기') as InvoiceStatus)
      : '대기'

  const issuedAtProp = props['발행일']
  const issuedAt =
    issuedAtProp.type === 'date' ? (issuedAtProp.date?.start ?? null) : null

  const expiresAtProp = props['유효기간']
  const expiresAt =
    expiresAtProp.type === 'date' ? (expiresAtProp.date?.start ?? null) : null

  const totalAmountProp = props['총금액']
  const totalAmount =
    totalAmountProp.type === 'number' ? totalAmountProp.number : null

  const itemsProp = props['항목']
  const itemIds =
    itemsProp.type === 'relation' ? itemsProp.relation.map(r => r.id) : []

  return {
    notionPageId: page.id,
    title,
    clientName,
    status,
    issuedAt,
    expiresAt,
    totalAmount,
    itemIds,
  }
}

// Notion API 응답 페이지를 InvoiceItem 타입으로 변환
function parseItemPage(page: PageObjectResponse): InvoiceItem {
  const props = page.properties

  const titleProp = props['항목명']
  const title =
    titleProp.type === 'title' ? (titleProp.title[0]?.plain_text ?? '') : ''

  const quantityProp = props['수량']
  const quantity =
    quantityProp.type === 'number' ? (quantityProp.number ?? 0) : 0

  const unitPriceProp = props['단가']
  const unitPrice =
    unitPriceProp.type === 'number' ? (unitPriceProp.number ?? 0) : 0

  const amountProp = props['금액']
  const amount =
    amountProp.type === 'formula' && amountProp.formula.type === 'number'
      ? (amountProp.formula.number ?? 0)
      : 0

  return {
    notionPageId: page.id,
    title,
    quantity,
    unitPrice,
    amount,
  }
}

// Invoices DB 전체 목록 조회
export async function listInvoices(): Promise<Invoice[]> {
  const notion = createNotionClient()
  const pages = await withRetry(() =>
    collectPaginatedAPI(notion.search, {
      filter: { value: 'page', property: 'object' },
      sort: { direction: 'descending', timestamp: 'last_edited_time' },
    })
  )
  return pages
    .filter(isFullPage)
    .filter(p => {
      const parent = p.parent
      return (
        parent.type === 'database_id' &&
        parent.database_id.replace(/-/g, '') ===
          (env.NOTION_DATABASE_ID ?? '').replace(/-/g, '')
      )
    })
    .map(parseInvoicePage)
}

// Notion 페이지 ID로 견적서 1개 조회
export async function getInvoiceById(
  notionPageId: string
): Promise<Invoice | null> {
  const notion = createNotionClient()
  try {
    const page = await withRetry(() =>
      notion.pages.retrieve({ page_id: notionPageId })
    )
    if (!isFullPage(page)) return null
    return parseInvoicePage(page)
  } catch {
    return null
  }
}

// Items DB 페이지 ID로 항목 1개 조회
export async function getInvoiceItemById(
  itemPageId: string
): Promise<InvoiceItem | null> {
  const notion = createNotionClient()
  try {
    const page = await withRetry(() =>
      notion.pages.retrieve({ page_id: itemPageId })
    )
    if (!isFullPage(page)) return null
    return parseItemPage(page)
  } catch {
    return null
  }
}

// 견적서의 Items Relation ID 목록으로 항목 전체 조회
export async function getInvoiceItems(
  itemIds: string[]
): Promise<InvoiceItem[]> {
  const results = await Promise.all(itemIds.map(id => getInvoiceItemById(id)))
  return results.filter((item): item is InvoiceItem => item !== null)
}

// Invoices DB에 새 견적서 페이지 생성
export async function createInvoice(data: {
  title: string
  clientName: string
}): Promise<Invoice> {
  const notion = createNotionClient()
  const page = await withRetry(() =>
    notion.pages.create({
      parent: { database_id: env.NOTION_DATABASE_ID ?? '' },
      properties: {
        '견적서 번호': { title: [{ text: { content: data.title } }] },
        클라이언트명: { rich_text: [{ text: { content: data.clientName } }] },
        상태: { status: { name: '대기' } },
      },
    })
  )
  if (!isFullPage(page)) throw new Error('견적서 생성 실패')
  return parseInvoicePage(page)
}

// 견적서 상태 업데이트 (대기/승인/거절)
export async function updateInvoiceStatus(
  notionPageId: string,
  status: InvoiceStatus
): Promise<void> {
  const notion = createNotionClient()
  await withRetry(() =>
    notion.pages.update({
      page_id: notionPageId,
      properties: {
        상태: { status: { name: status } },
      },
    })
  )
}
