import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { InvoiceItem } from '@/lib/types/invoice'

// 견적서 항목 테이블 컴포넌트
interface InvoiceItemsTableProps {
  items: InvoiceItem[]
  totalAmount: number | null
}

export function InvoiceItemsTable({
  items,
  totalAmount,
}: InvoiceItemsTableProps) {
  // 금액을 한국어 형식으로 포맷
  const formatAmount = (amount: number | null): string => {
    if (amount === null) return '-'
    return `${amount.toLocaleString('ko-KR')}원`
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>항목명</TableHead>
          <TableHead className="w-20 text-right">수량</TableHead>
          <TableHead className="w-32 text-right">단가</TableHead>
          <TableHead className="w-32 text-right">금액</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map(item => (
          <TableRow key={item.notionPageId}>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell className="text-right">
              {item.quantity !== null ? item.quantity : '-'}
            </TableCell>
            <TableCell className="text-right">
              {formatAmount(item.unitPrice)}
            </TableCell>
            <TableCell className="text-right">
              {formatAmount(item.amount)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* 하단 합계 행 */}
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3} className="text-right font-semibold">
            합계
          </TableCell>
          <TableCell className="text-right text-base font-bold">
            {formatAmount(totalAmount)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
