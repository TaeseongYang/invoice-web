import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus, FileText } from 'lucide-react'

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
  title: '대시보드',
  description: '내 견적서 목록을 관리하세요',
}

// TODO: Supabase 연동 후 실제 데이터로 교체
const mockInvoices: never[] = []

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      {/* TODO: 인증된 사용자 전용 헤더로 교체 (로그아웃 버튼 포함) */}
      <header className="border-b">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <span className="text-xl font-bold">InvoiceWeb</span>
            <div className="flex items-center gap-4">
              {/* TODO: 사용자 이름 표시 + 로그아웃 버튼 */}
              <Button variant="ghost" size="sm">
                로그아웃
              </Button>
            </div>
          </div>
        </Container>
      </header>

      <Container className="py-8">
        {/* 페이지 헤더 */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">대시보드</h1>
            <p className="text-muted-foreground mt-1">내 견적서를 관리하세요</p>
          </div>
          <Link href="/invoices/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />새 견적서 작성
            </Button>
          </Link>
        </div>

        {/* 상태별 필터 탭 */}
        {/* TODO: 실제 필터 기능 구현 */}
        <div className="mb-6 flex flex-wrap gap-2">
          {(
            ['전체', '발송 대기', '발송됨', '승인', '거절', '보류'] as const
          ).map(tab => (
            <Button key={tab} variant="outline" size="sm">
              {tab}
            </Button>
          ))}
        </div>

        {/* 견적서 목록 */}
        {mockInvoices.length === 0 ? (
          // 빈 상태
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <FileText className="text-muted-foreground mb-4 h-12 w-12" />
              <h3 className="mb-2 text-lg font-semibold">
                아직 견적서가 없습니다
              </h3>
              <p className="text-muted-foreground mb-6 text-center text-sm">
                첫 번째 견적서를 작성하고 클라이언트에게 공유해보세요.
              </p>
              <Link href="/invoices/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />새 견적서 작성
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          // 견적서 목록
          // TODO: 실제 견적서 목록 테이블 구현
          // 컬럼: 클라이언트 이름, 발송일, 상태 Badge, 총 금액, 마지막 수정일, 액션
          <Card>
            <CardHeader>
              <CardTitle>견적서 목록</CardTitle>
              <CardDescription>
                총 {mockInvoices.length}개의 견적서
              </CardDescription>
            </CardHeader>
            <CardContent>{/* TODO: Table 컴포넌트로 구현 */}</CardContent>
          </Card>
        )}
      </Container>
    </div>
  )
}
