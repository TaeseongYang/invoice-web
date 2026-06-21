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

interface InvoiceItemsTableProps {
  items: InvoiceItem[]
  totalAmount: number | null
}

export function InvoiceItemsTable({
  items,
  totalAmount,
}: InvoiceItemsTableProps) {
  const formatAmount = (amount: number | null): string => {
    if (amount === null) return '-'
    return `${amount.toLocaleString('ko-KR')}원`
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="px-5 py-4 text-sm font-semibold">
              항목명
            </TableHead>
            <TableHead className="w-24 px-5 py-4 text-right text-sm font-semibold">
              수량
            </TableHead>
            <TableHead className="w-36 px-5 py-4 text-right text-sm font-semibold">
              단가
            </TableHead>
            <TableHead className="w-36 px-5 py-4 text-right text-sm font-semibold">
              금액
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, idx) => (
            <TableRow
              key={item.notionPageId}
              className={idx % 2 === 1 ? 'bg-muted/20' : ''}
            >
              <TableCell className="px-5 py-4 font-medium">
                {item.name}
              </TableCell>
              <TableCell className="text-muted-foreground px-5 py-4 text-right">
                {item.quantity !== null ? item.quantity : '-'}
              </TableCell>
              <TableCell className="text-muted-foreground px-5 py-4 text-right">
                {formatAmount(item.unitPrice)}
              </TableCell>
              <TableCell className="px-5 py-4 text-right font-medium">
                {formatAmount(item.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="bg-muted/60">
            <TableCell
              colSpan={3}
              className="px-5 py-4 text-right text-sm font-semibold"
            >
              합계
            </TableCell>
            <TableCell className="px-5 py-4 text-right text-base font-bold tracking-tight">
              {formatAmount(totalAmount)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
