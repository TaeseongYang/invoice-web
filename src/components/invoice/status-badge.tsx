import { Badge } from '@/components/ui/badge'
import type { InvoiceStatus } from '@/lib/types/invoice'

interface StatusBadgeProps {
  status: InvoiceStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  if (status === '대기') {
    return (
      <Badge className="gap-1.5 border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 hover:bg-amber-50 dark:border-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
        대기
      </Badge>
    )
  }

  if (status === '승인') {
    return (
      <Badge className="gap-1.5 border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700 hover:bg-green-50 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400">
        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
        승인
      </Badge>
    )
  }

  return (
    <Badge className="gap-1.5 border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-50 dark:border-red-800 dark:bg-red-900/30 dark:text-red-400">
      <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
      거절
    </Badge>
  )
}
