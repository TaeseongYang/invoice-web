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

interface InvoiceTableProps {
  invoices: InvoiceWithItems[]
  onRowClick?: (id: string) => void
}

export function InvoiceTable({ invoices, onRowClick }: InvoiceTableProps) {
  return (
    <>
      {/* 데스크톱: 테이블 레이아웃 (sm 이상) */}
      <div className="hidden overflow-hidden rounded-xl border shadow-sm sm:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="px-5 py-4 text-sm font-semibold">
                견적서번호
              </TableHead>
              <TableHead className="px-5 py-4 text-sm font-semibold">
                클라이언트명
              </TableHead>
              <TableHead className="px-5 py-4 text-sm font-semibold">
                상태
              </TableHead>
              <TableHead className="px-5 py-4 text-right text-sm font-semibold">
                금액
              </TableHead>
              <TableHead className="px-5 py-4 text-sm font-semibold">
                발행일
              </TableHead>
              <TableHead className="px-5 py-4 text-right text-sm font-semibold">
                액션
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map(invoice => (
              <TableRow
                key={invoice.notionPageId}
                className="hover:bg-muted/40 cursor-pointer transition-colors duration-150"
                onClick={() => onRowClick?.(invoice.notionPageId)}
              >
                <TableCell className="px-5 py-4 font-medium">
                  {invoice.title}
                </TableCell>
                <TableCell className="text-muted-foreground px-5 py-4">
                  {invoice.clientName}
                </TableCell>
                <TableCell className="px-5 py-4">
                  <StatusBadge status={invoice.status} />
                </TableCell>
                <TableCell className="px-5 py-4 text-right font-semibold">
                  {invoice.totalAmount !== null
                    ? `${invoice.totalAmount.toLocaleString('ko-KR')}원`
                    : '-'}
                </TableCell>
                <TableCell className="text-muted-foreground px-5 py-4">
                  {invoice.issuedAt
                    ? new Date(invoice.issuedAt).toLocaleDateString('ko-KR')
                    : '-'}
                </TableCell>
                <TableCell
                  className="px-5 py-4 text-right"
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
            className="cursor-pointer border shadow-sm transition-all duration-200 hover:shadow-md"
            onClick={() => onRowClick?.(invoice.notionPageId)}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{invoice.title}</p>
                  <p className="text-muted-foreground mt-0.5 text-sm">
                    {invoice.clientName}
                  </p>
                </div>
                <StatusBadge status={invoice.status} />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="font-bold">
                    {invoice.totalAmount !== null
                      ? `${invoice.totalAmount.toLocaleString('ko-KR')}원`
                      : '-'}
                  </p>
                  <p className="text-muted-foreground mt-0.5 text-xs">
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
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
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
