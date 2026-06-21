'use server'

import { Resend } from 'resend'
import { env } from '@/lib/env'
import {
  buildInvoiceEmailHtml,
  buildInvoiceEmailText,
} from '@/lib/email/invoice-template'
import type { SendInvoiceEmailInput, SendEmailResult } from '@/lib/types/email'

function createResendClient(): Resend | null {
  if (!env.RESEND_API_KEY) return null
  return new Resend(env.RESEND_API_KEY)
}

export async function sendInvoiceEmailAction(
  input: SendInvoiceEmailInput
): Promise<SendEmailResult> {
  const resend = createResendClient()

  // API 키 없음 → 개발 환경 폴백
  if (!resend) {
    console.warn(
      '[이메일 발송 건너뜀] RESEND_API_KEY 미설정 — 개발 환경에서는 이메일이 발송되지 않습니다.'
    )
    console.info('[이메일 내용 미리보기]', {
      to: input.to,
      subject: `[견적서] ${input.invoiceTitle} 확인 요청`,
      shareUrl: input.shareUrl,
    })
    return { success: true, messageId: 'dev-mock-id' }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'InvoiceWeb <onboarding@resend.dev>',
      to: [input.to],
      subject: `[견적서] ${input.invoiceTitle} 확인 요청`,
      html: buildInvoiceEmailHtml(input),
      text: buildInvoiceEmailText(input),
    })

    if (error || !data) {
      console.error('[이메일 발송 실패]', error)
      return {
        success: false,
        error: error?.message ?? '이메일 발송에 실패했습니다.',
      }
    }

    return { success: true, messageId: data.id }
  } catch (err) {
    const message = err instanceof Error ? err.message : '알 수 없는 오류'
    console.error('[이메일 발송 예외]', message)
    return { success: false, error: message }
  }
}
