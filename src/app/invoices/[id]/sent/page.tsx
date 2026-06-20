import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Copy, ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Container } from '@/components/layout/container'

export const metadata: Metadata = {
  title: '견적서 발송 완료',
  description: '견적서가 성공적으로 발송되었습니다',
}

export default async function InvoiceSentPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  // TODO: Supabase에서 invoice 조회 (share_token, 클라이언트 이메일 가져오기)
  void id

  // TODO: 실제 데이터로 교체
  const mockShareToken = 'placeholder-token'
  const mockClientEmail = 'client@example.com'
  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/view/${mockShareToken}`

  return (
    <div className="min-h-screen">
      {/* TODO: 인증된 사용자 전용 헤더 */}
      <Container className="py-8">
        <div className="mx-auto max-w-2xl">
          {/* 성공 아이콘 및 메시지 */}
          <div className="mb-8 text-center">
            <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <CheckCircle className="text-primary h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold">견적서 발송 완료!</h1>
            <p className="text-muted-foreground mt-2">
              <strong>{mockClientEmail}</strong>에 견적서 이메일이
              발송되었습니다.
            </p>
          </div>

          {/* 공개 링크 */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>공유 링크</CardTitle>
              <CardDescription>
                클라이언트가 이 링크로 견적서를 확인할 수 있습니다 (30일 유효)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted rounded-md p-3 font-mono text-sm break-all">
                {shareUrl}
              </div>
              {/* TODO: 클릭 시 클립보드 복사 + 토스트 알림 */}
              <Button variant="outline" className="w-full">
                <Copy className="mr-2 h-4 w-4" />
                링크 복사하기
              </Button>
            </CardContent>
          </Card>

          {/* 안내 메시지 */}
          <p className="text-muted-foreground mb-8 text-center text-sm">
            클라이언트가 견적서를 확인하고 승인/거절하면 대시보드에서 알 수
            있습니다.
          </p>

          {/* 대시보드 이동 */}
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
