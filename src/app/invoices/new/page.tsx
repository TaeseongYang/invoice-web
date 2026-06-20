import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, AlertCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Container } from '@/components/layout/container'

export const metadata: Metadata = {
  title: '새 견적서 작성',
  description: '노션 URL을 입력하여 견적서를 임포트하세요',
}

export default function NewInvoicePage() {
  return (
    <div className="min-h-screen">
      {/* TODO: 인증된 사용자 전용 헤더 */}
      <Container className="py-8">
        {/* 뒤로가기 */}
        <Link
          href="/dashboard"
          className="text-muted-foreground hover:text-foreground mb-6 flex items-center gap-2 text-sm transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          대시보드로 돌아가기
        </Link>

        <div className="mx-auto max-w-2xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">새 견적서 작성</h1>
            <p className="text-muted-foreground mt-1">
              노션 견적서 페이지의 공개 URL을 입력하세요
            </p>
          </div>

          {/* Integration 연결 가이드 */}
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>노션 Integration 연결이 필요합니다</AlertTitle>
            <AlertDescription className="mt-2 space-y-2">
              <p>
                임포트하려는 노션 페이지에 InvoiceWeb Integration이 연결되어
                있어야 합니다.
              </p>
              <ol className="ml-4 list-decimal space-y-1 text-sm">
                <li>노션 페이지 우측 상단의 메뉴 클릭</li>
                <li>
                  <strong>연결</strong> 선택 후 <strong>InvoiceWeb</strong>{' '}
                  Integration 추가
                </li>
                <li>아래에 페이지 URL을 입력하세요</li>
              </ol>
              <a
                href="https://notion.so"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary inline-flex items-center gap-1 text-sm hover:underline"
              >
                노션 열기
                <ExternalLink className="h-3 w-3" />
              </a>
            </AlertDescription>
          </Alert>

          {/* URL 입력 폼 */}
          {/* TODO: React Hook Form + Server Action으로 교체 */}
          <Card>
            <CardHeader>
              <CardTitle>노션 URL 입력</CardTitle>
              <CardDescription>
                공개 설정된 노션 견적서 페이지의 URL을 붙여넣으세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notionUrl">노션 페이지 URL</Label>
                <Input
                  id="notionUrl"
                  type="url"
                  placeholder="https://www.notion.so/your-page-id"
                  className="font-mono text-sm"
                />
                <p className="text-muted-foreground text-xs">
                  예시: https://www.notion.so/Invoice-abc123def456...
                </p>
              </div>

              {/* TODO: 임포트 중 로딩 상태 및 에러 메시지 표시 */}

              <Button className="w-full" disabled>
                {/* TODO: 임포트 Server Action 연결 */}
                견적서 임포트하기
              </Button>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  )
}
