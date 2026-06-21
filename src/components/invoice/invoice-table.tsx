import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import type { InvoiceWithItems } from '@/lib/types/invoice'
import { StatusBadge } from '@/components/invoice/status-badge'
import { CopyButton } from '@/components/invoice/copy-button'

// 견적서 목록 테이블 컴포넌트
interface InvoiceTableProps {
  invoices: InvoiceWithItems[]
  onRowClick?: (id: string) => void
}

export function InvoiceTable({ invoices, onRowClick }: InvoiceTableProps) {
  return (
    <>
      {/* 데스크톱: 테이블 레이아웃 (sm 이상) */}
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>견적서번호</TableHead>
              <TableHead>클라이언트명</TableHead>
              <TableHead>상태</TableHead>
              <TableHead className="text-right">금액</TableHead>
              <TableHead>발행일</TableHead>
              <TableHead className="text-right">액션</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map(invoice => (
              <TableRow
                key={invoice.notionPageId}
                className="hover:bg-muted/50 cursor-pointer"
                onClick={() => onRowClick?.(invoice.notionPageId)}
              >
                <TableCell className="font-medium">{invoice.title}</TableCell>
                <TableCell>{invoice.clientName}</TableCell>
                <TableCell>
                  <StatusBadge status={invoice.status} />
                </TableCell>
                <TableCell className="text-right">
                  {invoice.totalAmount !== null
                    ? `${invoice.totalAmount.toLocaleString('ko-KR')}원`
                    : '-'}
                </TableCell>
                <TableCell>
                  {invoice.issuedAt
                    ? new Date(invoice.issuedAt).toLocaleDateString('ko-KR')
                    : '-'}
                </TableCell>
                <TableCell
                  className="text-right"
                  onClick={e => e.stopPropagation()}
                >
                  <CopyButton text={invoice.notionPageId} label="ID 복사" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 모바일: 카드 레이아웃 (sm 미만) */}
      <div className="space-y-3 sm:hidden">
        {invoices.map(invoice => (
          <Card
            key={invoice.notionPageId}
            className="cursor-pointer transition-shadow hover:shadow-md"
            onClick={() => onRowClick?.(invoice.notionPageId)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{invoice.title}</p>
                  <p className="text-muted-foreground mt-0.5 text-sm">
                    {invoice.clientName}
                  </p>
                </div>
                <StatusBadge status={invoice.status} />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">
                    {invoice.totalAmount !== null
                      ? `${invoice.totalAmount.toLocaleString('ko-KR')}원`
                      : '-'}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {invoice.issuedAt
                      ? new Date(invoice.issuedAt).toLocaleDateString('ko-KR')
                      : '-'}
                  </p>
                </div>
                <div
                  className="flex items-center gap-2"
                  onClick={e => e.stopPropagation()}
                >
                  <CopyButton text={invoice.notionPageId} label="ID 복사" />
                  <Button variant="ghost" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
