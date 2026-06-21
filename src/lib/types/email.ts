export type SendInvoiceEmailInput = {
  to: string
  clientName: string
  invoiceTitle: string
  shareUrl: string
  expiresAt: string | null
}

export type SendEmailResult =
  | { success: true; messageId: string }
  | { success: false; error: string }
