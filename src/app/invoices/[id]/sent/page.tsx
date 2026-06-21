import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, ArrowLeft, Mail } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/container'
import { CopyButton } from '@/components/invoice/copy-button'
import { env } from '@/lib/env'

export const metadata: Metadata = {
  title: '견적서 발송 완료',
  description: '견적서가 성공적으로 발송되었습니다',
}

export default async function InvoiceSentPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ email?: string }>
}) {
  const { id } = await params
  const { email } = await searchParams

  // notionPageId를 공유 토큰으로 직접 사용 (Task 011 결정사항)
  const appUrl = env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  const shareUrl = `${appUrl}/view/${id}`

  const sentToEmail = email ? decodeURIComponent(email) : null

  return (
    <div className="min-h-screen">
      <Container className="py-8">
        <div className="mx-auto max-w-2xl">
          {/* 성공 아이콘 및 메시지 */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-950/30">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold">발송 완료!</h1>
            <p className="text-muted-foreground mt-2">
              견적서가 성공적으로 발송되었습니다.
            </p>
            {sentToEmail && (
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-sm text-green-700 dark:bg-green-950/20 dark:text-green-400">
                <Mail className="h-3.5 w-3.5" />
                <span>{sentToEmail}</span>
              </div>
            )}
          </div>

          {/* 공유 링크 카드 */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>공유 링크</CardTitle>
              <CardDescription>
                클라이언트가 이 링크로 견적서를 확인할 수 있습니다 (30일 유효)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 공유 URL 표시 */}
              <div className="bg-muted rounded-md p-3 font-mono text-sm break-all">
                {shareUrl}
              </div>

              {/* 링크 복사 버튼 */}
              <div className="flex justify-center">
                <CopyButton text={shareUrl} label="링크 복사하기" />
              </div>
            </CardContent>
          </Card>

          {/* 안내 메시지 */}
          <p className="text-muted-foreground mb-8 text-center text-sm">
            클라이언트가 견적서를 확인하고 승인/거절하면 대시보드에서 알 수
            있습니다.
          </p>

          {/* 대시보드로 돌아가기 */}
          <Link href="/dashboard" className="block">
            <Button className="w-full" variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              대시보드로 돌아가기
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  )
}
