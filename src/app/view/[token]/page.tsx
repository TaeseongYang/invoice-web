import type { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ErrorCard } from '@/components/common/error-card'
import { InvoiceItemsTable } from '@/components/invoice/invoice-items-table'
import { InvoiceViewActions } from '@/components/invoice/invoice-view-actions'
import { PdfDownloadButton } from '@/components/invoice/pdf-download-button'
import { getInvoiceWithItemsAction } from '@/app/actions/invoices'
import { ViewTracker } from '@/components/invoice/view-tracker'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://invoice.example.com'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ token: string }>
}): Promise<Metadata> {
  const { token } = await params
  const invoice = await getInvoiceWithItemsAction(token)

  if (!invoice) {
    return {
      title: '견적서 확인',
      description: '유효하지 않은 견적서 링크입니다.',
    }
  }

  const amount = invoice.totalAmount
    ? `${invoice.totalAmount.toLocaleString('ko-KR')}원`
    : undefined

  const ogImageUrl = new URL('/api/og', APP_URL)
  ogImageUrl.searchParams.set('title', invoice.title)
  if (invoice.clientName)
    ogImageUrl.searchParams.set('client', invoice.clientName)
  if (amount) ogImageUrl.searchParams.set('amount', amount)

  const description = [
    invoice.clientName && `수신인: ${invoice.clientName}`,
    amount && `총금액: ${amount}`,
    '견적서를 확인하고 승인/거절해주세요.',
  ]
    .filter(Boolean)
    .join(' | ')

  return {
    title: `${invoice.title} — 견적서 확인`,
    description,
    openGraph: {
      title: invoice.title,
      description,
      images: [{ url: ogImageUrl.toString(), width: 1200, height: 630 }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: invoice.title,
      description,
      images: [ogImageUrl.toString()],
    },
  }
}

export default async function InvoiceViewPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params

  const invoice = await getInvoiceWithItemsAction(token)

  if (!invoice) {
    return (
      <ErrorCard
        variant="invalid"
        title="유효하지 않은 링크입니다"
        description="존재하지 않는 견적서 링크입니다. URL을 다시 확인하거나 담당자에게 문의하세요."
      />
    )
  }

  const isExpired =
    invoice.expiresAt !== null && new Date(invoice.expiresAt) < new Date()

  if (isExpired) {
    return (
      <ErrorCard
        variant="expired"
        title="링크가 만료되었습니다"
        description="이 견적서 링크는 유효 기간이 지났습니다. 새로운 링크를 요청하려면 담당자에게 문의하세요."
      />
    )
  }

  return (
    <div className="bg-muted/20 min-h-screen py-10">
      <ViewTracker invoiceId={token} />
      <div className="mx-auto max-w-3xl px-4">
        {/* 견적서 헤더 */}
        <div className="mb-8 text-center">
          <span className="text-muted-foreground inline-block rounded-full border px-3 py-1 text-xs font-medium">
            견적서
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight">
            {invoice.title}
          </h1>
          <div className="text-muted-foreground mt-3 flex items-center justify-center gap-4 text-sm">
            {invoice.issuedAt && (
              <span>
                발행일: {new Date(invoice.issuedAt).toLocaleDateString('ko-KR')}
              </span>
            )}
            {invoice.expiresAt && (
              <span>
                유효기간:{' '}
                {new Date(invoice.expiresAt).toLocaleDateString('ko-KR')}까지
              </span>
            )}
          </div>
        </div>

        {/* 클라이언트 정보 카드 */}
        <Card className="mb-4 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
              수신인
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y text-sm">
              <div className="flex justify-between py-2.5">
                <span className="text-muted-foreground">이름</span>
                <span className="font-medium">{invoice.clientName || '-'}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 견적서 항목 */}
        <Card className="mb-6 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">견적 내용</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <InvoiceItemsTable
              items={invoice.items}
              totalAmount={invoice.totalAmount}
            />
          </CardContent>
        </Card>

        {/* 액션 버튼 영역 */}
        <Card className="shadow-sm">
          <CardContent className="space-y-4 p-5">
            <PdfDownloadButton invoiceId={token} />

            <Separator />

            <div>
              <p className="text-muted-foreground mb-3 text-center text-sm font-medium">
                이 견적서에 대한 의사를 알려주세요
              </p>
              <InvoiceViewActions invoicePageId={token} />
            </div>
          </CardContent>
        </Card>

        {/* 푸터 */}
        <p className="text-muted-foreground mt-8 text-center text-xs">
          이 견적서는 InvoiceWeb을 통해 공유되었습니다.
        </p>
      </div>
    </div>
  )
}
