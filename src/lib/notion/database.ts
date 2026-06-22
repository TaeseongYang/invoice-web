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

  const viewCountProp = props['조회수']
  const viewCount =
    viewCountProp?.type === 'number' ? (viewCountProp.number ?? 0) : 0

  return {
    notionPageId: page.id,
    title,
    clientName,
    status,
    issuedAt,
    expiresAt,
    totalAmount,
    itemIds,
    viewCount,
  }
}

// Notion API 응답 페이지를 InvoiceItem 타입으로 변환
function parseItemPage(page: PageObjectResponse): InvoiceItem {
  const props = page.properties

  const nameProp = props['항목명']
  const name =
    nameProp.type === 'title' ? (nameProp.title[0]?.plain_text ?? '') : ''

  const quantityProp = props['수량']
  const quantity = quantityProp.type === 'number' ? quantityProp.number : null

  const unitPriceProp = props['단가']
  const unitPrice =
    unitPriceProp.type === 'number' ? unitPriceProp.number : null

  const amountProp = props['금액']
  const amount =
    amountProp.type === 'formula' && amountProp.formula.type === 'number'
      ? amountProp.formula.number
      : null

  return {
    notionPageId: page.id,
    name,
    quantity,
    unitPrice,
    amount,
  }
}

// Invoices DB 전체 목록 조회
export async function listInvoices(): Promise<Invoice[]> {
  if (!env.NOTION_DATABASE_ID) return []
  const notion = createNotionClient()
  const dbId = env.NOTION_DATABASE_ID.replace(/-/g, '')

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
      // v5: parent.type === 'data_source_id', 실제 DB ID는 parent.database_id에 있음
      if (parent.type === 'data_source_id') {
        return (parent.database_id ?? '').replace(/-/g, '') === dbId
      }
      if (parent.type === 'database_id') {
        return parent.database_id.replace(/-/g, '') === dbId
      }
      return false
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

// 견적서 조회수 1 증가 — Notion DB에 "조회수" 숫자 속성이 없으면 graceful 무시
export async function incrementViewCount(notionPageId: string): Promise<void> {
  const notion = createNotionClient()
  try {
    const page = await withRetry(() =>
      notion.pages.retrieve({ page_id: notionPageId })
    )
    if (!isFullPage(page)) return

    const viewCountProp = page.properties['조회수']
    const current =
      viewCountProp?.type === 'number' ? (viewCountProp.number ?? 0) : null

    if (current === null) return

    await withRetry(() =>
      notion.pages.update({
        page_id: notionPageId,
        properties: {
          조회수: { number: current + 1 },
        },
      })
    )
  } catch {
    // 조회수 업데이트 실패는 사용자 경험에 영향 없음
  }
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
