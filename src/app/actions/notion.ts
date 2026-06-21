'use server'

import { redirect } from 'next/navigation'
import { isValidNotionUrl, extractPageId, getInvoiceById } from '@/lib/notion'

export async function importInvoiceAction(
  notionUrl: string
): Promise<{ success: boolean; error?: string }> {
  if (!isValidNotionUrl(notionUrl)) {
    return { success: false, error: '올바른 노션 URL을 입력하세요.' }
  }

  let pageId: string
  try {
    pageId = extractPageId(notionUrl)
  } catch {
    return { success: false, error: 'URL에서 페이지 ID를 추출할 수 없습니다.' }
  }

  try {
    const invoice = await getInvoiceById(pageId)
    if (!invoice) {
      return {
        success: false,
        error:
          '페이지를 찾을 수 없습니다. Integration이 올바르게 연결되어 있는지 확인하세요.',
      }
    }
  } catch {
    return {
      success: false,
      error:
        'Notion API 호출에 실패했습니다. 환경변수(NOTION_API_TOKEN)를 확인하세요.',
    }
  }

  redirect(`/invoices/${pageId}`)
}
