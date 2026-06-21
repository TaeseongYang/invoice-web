'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Plus, FileText } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Container } from '@/components/layout/container'
import { InvoiceTable } from '@/components/invoice/invoice-table'
import { EmptyState } from '@/components/common/empty-state'
import { DUMMY_INVOICES } from '@/lib/data/dummy-invoices'
import type { InvoiceStatus } from '@/lib/types/invoice'

// 탭 타입 정의
type ActiveTab = '전체' | InvoiceStatus

export default function DashboardPage() {
  const router = useRouter()
  // 활성 탭 상태 관리
  const [activeTab, setActiveTab] = useState<ActiveTab>('전체')

  // activeTab 기반 견적서 필터링
  const filteredInvoices =
    activeTab === '전체'
      ? DUMMY_INVOICES
      : DUMMY_INVOICES.filter(invoice => invoice.status === activeTab)

  const handleRowClick = (id: string) => {
    // TODO: 실제 견적서 상세 페이지 이동 로직
    router.push(`/invoices/${id}`)
  }

  return (
    <div className="min-h-screen">
      {/* 대시보드 헤더 */}
      <header className="border-b">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <span className="text-xl font-bold">InvoiceWeb</span>
            <div className="flex items-center gap-4">
              {/* TODO: 사용자 이름 표시 + 로그아웃 처리 로직 연결 */}
              <Button variant="ghost" size="sm" onClick={() => {}}>
                로그아웃
              </Button>
            </div>
          </div>
        </Container>
      </header>

      <Container className="py-8">
        {/* 페이지 헤더 */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">대시보드</h1>
            <p className="text-muted-foreground mt-1">내 견적서를 관리하세요</p>
          </div>
          {/* 새 견적서 작성 버튼 */}
          <Link href="/invoices/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />새 견적서 작성
            </Button>
          </Link>
        </div>

        {/* 상태별 탭 필터 */}
        <Tabs
          value={activeTab}
          onValueChange={value => setActiveTab(value as ActiveTab)}
        >
          <TabsList className="mb-6">
            <TabsTrigger value="전체">
              전체 ({DUMMY_INVOICES.length})
            </TabsTrigger>
            <TabsTrigger value="대기">
              대기 ({DUMMY_INVOICES.filter(i => i.status === '대기').length})
            </TabsTrigger>
            <TabsTrigger value="승인">
              승인 ({DUMMY_INVOICES.filter(i => i.status === '승인').length})
            </TabsTrigger>
            <TabsTrigger value="거절">
              거절 ({DUMMY_INVOICES.filter(i => i.status === '거절').length})
            </TabsTrigger>
          </TabsList>

          {/* 각 탭 콘텐츠 */}
          {(['전체', '대기', '승인', '거절'] as ActiveTab[]).map(tab => (
            <TabsContent key={tab} value={tab}>
              {filteredInvoices.length === 0 ? (
                // 빈 상태 표시
                <EmptyState
                  icon={FileText}
                  title="견적서가 없습니다"
                  description={
                    activeTab === '전체'
                      ? '첫 번째 견적서를 작성하고 클라이언트에게 공유해보세요.'
                      : `${activeTab} 상태의 견적서가 없습니다.`
                  }
                  action={
                    activeTab === '전체' ? (
                      <Link href="/invoices/new">
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />새 견적서 작성
                        </Button>
                      </Link>
                    ) : undefined
                  }
                />
              ) : (
                // 견적서 테이블
                <InvoiceTable
                  invoices={filteredInvoices}
                  onRowClick={handleRowClick}
                />
              )}
            </TabsContent>
          ))}
        </Tabs>
      </Container>
    </div>
  )
}
