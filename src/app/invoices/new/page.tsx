'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
import { LoadingSkeleton } from '@/components/common/loading-skeleton'
import { ErrorCard } from '@/components/common/error-card'

export default function NewInvoicePage() {
  const router = useRouter()
  // URL 입력값 상태 관리
  const [url, setUrl] = useState('')
  // 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(false)
  // 에러 상태 관리
  const [error, setError] = useState(false)

  const handleImport = () => {
    // TODO: 실제 노션 URL 파싱 및 API 호출 로직 연결
    setError(false)
    setIsLoading(true)

    // 로딩 시뮬레이션 (2초 후 이동)
    setTimeout(() => {
      setIsLoading(false)
      router.push('/invoices/dummy-001')
    }, 2000)
  }

  // 에러 상태 표시
  if (error) {
    return (
      <ErrorCard
        variant="error"
        title="임포트에 실패했습니다"
        description="노션 URL을 확인하고 다시 시도해주세요. Integration이 올바르게 연결되어 있는지 확인하세요."
      />
    )
  }

  return (
    <div className="bg-muted/10 min-h-screen">
      <Container className="py-10">
        {/* 뒤로가기 */}
        <Link
          href="/dashboard"
          className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 text-sm transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          대시보드로 돌아가기
        </Link>

        <div className="mx-auto max-w-2xl">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight">
              새 견적서 작성
            </h1>
            <p className="text-muted-foreground mt-2">
              노션 견적서 페이지의 공개 URL을 입력하세요
            </p>
          </div>

          {/* Integration 연결 가이드 Alert */}
          <Alert className="mb-6 border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-100">
            <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertTitle className="font-semibold">
              노션 Integration 연결이 필요합니다
            </AlertTitle>
            <AlertDescription className="mt-2 space-y-2 text-blue-800 dark:text-blue-200">
              <p className="text-sm">
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
                className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:underline dark:text-blue-300"
              >
                노션 열기
                <ExternalLink className="h-3 w-3" />
              </a>
            </AlertDescription>
          </Alert>

          {/* 로딩 중 스켈레톤 표시 */}
          {isLoading ? (
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">
                  노션에서 데이터를 가져오는 중...
                </CardTitle>
                <CardDescription>잠시만 기다려주세요</CardDescription>
              </CardHeader>
              <CardContent>
                <LoadingSkeleton rows={4} />
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold">
                  노션 URL 입력
                </CardTitle>
                <CardDescription>
                  공개 설정된 노션 견적서 페이지의 URL을 붙여넣으세요
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="notionUrl" className="text-sm font-medium">
                    노션 페이지 URL
                  </Label>
                  <Input
                    id="notionUrl"
                    type="url"
                    placeholder="https://www.notion.so/your-page-id"
                    className="h-10 font-mono text-sm"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                  />
                  <p className="text-muted-foreground text-xs">
                    예시: https://www.notion.so/Invoice-abc123def456...
                  </p>
                </div>

                <Button
                  className="w-full gap-2 shadow-sm"
                  onClick={handleImport}
                  disabled={!url.trim()}
                >
                  견적서 임포트하기
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </Container>
    </div>
  )
}
