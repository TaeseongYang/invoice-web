import { z } from 'zod'

import { notionUrlSchema } from './notion'

// 견적서 생성 스키마 (노션 URL + 클라이언트명)
export const createInvoiceSchema = z.object({
  notionUrl: notionUrlSchema,
  clientName: z.string().min(1, '클라이언트 이름을 입력해주세요.'),
})

export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>

// 견적서 상태 업데이트 스키마 (실제 DB 옵션값 사용)
export const updateInvoiceStatusSchema = z.object({
  status: z.enum(['대기', '승인', '거절']),
})

export type UpdateInvoiceStatusInput = z.infer<typeof updateInvoiceStatusSchema>
