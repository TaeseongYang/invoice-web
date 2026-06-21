import { Badge } from '@/components/ui/badge'
import type { InvoiceStatus } from '@/lib/types/invoice'

// 견적서 상태 배지 컴포넌트
interface StatusBadgeProps {
  status: InvoiceStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  // 상태별 배지 스타일 설정
  if (status === '대기') {
    return (
      <Badge className="border-amber-200 bg-amber-100 text-amber-800 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
        대기
      </Badge>
    )
  }

  if (status === '승인') {
    return (
      <Badge className="border-green-200 bg-green-100 text-green-800 hover:bg-green-100 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400">
        승인
      </Badge>
    )
  }

  // 거절 상태
  return <Badge variant="destructive">거절</Badge>
}
