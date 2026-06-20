// 실제 Notion DB 상태 옵션값 (한국어)
export type InvoiceStatus = '대기' | '승인' | '거절'

// Invoices DB 페이지 (row = 견적서 1개)
export type Invoice = {
  notionPageId: string // Notion 페이지 ID (URL용 PK)
  title: string // 견적서 번호/제목
  clientName: string // 클라이언트명
  status: InvoiceStatus // 대기/승인/거절
  issuedAt: string | null // 발행일 (ISO 8601)
  expiresAt: string | null // 유효기간 (ISO 8601)
  totalAmount: number | null // 총금액 (원)
  itemIds: string[] // Items DB 페이지 ID 목록 (Relation)
}

// Items DB 페이지 (row = 견적서 항목 1개)
export type InvoiceItem = {
  notionPageId: string // Items DB 페이지 ID
  title: string // 항목명
  quantity: number // 수량
  unitPrice: number // 단가
  amount: number // 금액 (formula: 수량 × 단가)
}

// 견적서 + 항목 통합 타입 (상세/뷰 페이지에서 사용)
export type InvoiceWithItems = Invoice & {
  items: InvoiceItem[]
}
