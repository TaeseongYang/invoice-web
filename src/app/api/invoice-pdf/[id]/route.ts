import { renderToBuffer } from '@react-pdf/renderer'
import { createElement } from 'react'
import type { ReactElement } from 'react'
import type { DocumentProps } from '@react-pdf/renderer'
import { getInvoiceWithItemsAction } from '@/app/actions/invoices'
import { InvoicePDFDocument } from '@/lib/pdf/invoice-pdf'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const invoice = await getInvoiceWithItemsAction(id)
  if (!invoice) {
    return new Response('견적서를 찾을 수 없습니다.', { status: 404 })
  }

  const element = createElement(InvoicePDFDocument, {
    invoice,
  }) as ReactElement<DocumentProps>

  const buffer = await renderToBuffer(element)

  return new Response(buffer as unknown as BodyInit, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="invoice-${id}.pdf"`,
    },
  })
}
