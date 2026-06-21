import { z } from 'zod'

export const notionUrlSchema = z
  .string()
  .url('올바른 URL 형식이 아닙니다.')
  .refine(url => url.includes('notion.so') || url.includes('notion.com'), {
    message:
      '노션 페이지 URL을 입력해주세요. (notion.so 또는 notion.com 도메인)',
  })
