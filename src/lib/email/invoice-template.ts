import type { SendInvoiceEmailInput } from '@/lib/types/email'

export function buildInvoiceEmailHtml(input: SendInvoiceEmailInput): string {
  const expiresText = input.expiresAt
    ? new Date(input.expiresAt).toLocaleDateString('ko-KR') + '까지'
    : '30일'

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>견적서 공유</title>
</head>
<body style="margin:0;padding:0;background-color:#f9fafb;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9fafb;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
          style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
          <tr>
            <td style="background-color:#111827;padding:24px 32px;">
              <p style="margin:0;color:#ffffff;font-size:20px;font-weight:700;">InvoiceWeb</p>
              <p style="margin:4px 0 0;color:#9ca3af;font-size:13px;">견적서 공유 서비스</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 8px;font-size:14px;color:#6b7280;">안녕하세요, ${input.clientName}님</p>
              <h1 style="margin:0 0 24px;font-size:22px;font-weight:700;color:#111827;line-height:1.3;">
                견적서가 공유되었습니다
              </h1>
              <table width="100%" cellpadding="0" cellspacing="0"
                style="background-color:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;margin-bottom:24px;">
                <tr>
                  <td style="padding:20px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">
                      견적서
                    </p>
                    <p style="margin:0;font-size:16px;font-weight:700;color:#111827;">
                      ${input.invoiceTitle}
                    </p>
                    <p style="margin:8px 0 0;font-size:13px;color:#6b7280;">
                      유효기간: ${expiresText}
                    </p>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 24px;font-size:14px;color:#374151;line-height:1.6;">
                아래 버튼을 클릭하여 견적서 내용을 확인하고 승인 또는 거절 의사를 전달해주세요.
              </p>
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius:6px;background-color:#111827;">
                    <a href="${input.shareUrl}"
                      style="display:inline-block;padding:14px 28px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:6px;">
                      견적서 확인하기
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:24px 0 0;font-size:12px;color:#9ca3af;line-height:1.6;">
                버튼이 작동하지 않는 경우 아래 링크를 브라우저에 직접 붙여넣으세요:<br />
                <a href="${input.shareUrl}" style="color:#6b7280;word-break:break-all;">${input.shareUrl}</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color:#f9fafb;border-top:1px solid #e5e7eb;padding:20px 32px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">
                이 이메일은 InvoiceWeb을 통해 자동 발송되었습니다.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export function buildInvoiceEmailText(input: SendInvoiceEmailInput): string {
  const expiresText = input.expiresAt
    ? new Date(input.expiresAt).toLocaleDateString('ko-KR') + '까지'
    : '30일'

  return `안녕하세요, ${input.clientName}님.

견적서가 공유되었습니다.

견적서: ${input.invoiceTitle}
유효기간: ${expiresText}

아래 링크에서 견적서를 확인해주세요:
${input.shareUrl}

이 이메일은 InvoiceWeb을 통해 자동 발송되었습니다.`
}
