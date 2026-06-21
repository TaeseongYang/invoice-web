import type { LucideIcon } from 'lucide-react'

// 빈 상태 표시 컴포넌트
interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    // 중앙 정렬 레이아웃
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {/* 아이콘 영역 */}
      {Icon && (
        <div className="bg-muted mb-4 flex h-14 w-14 items-center justify-center rounded-full">
          <Icon className="text-muted-foreground h-7 w-7" />
        </div>
      )}

      {/* 제목 */}
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>

      {/* 설명 (선택적) */}
      {description && (
        <p className="text-muted-foreground mb-6 max-w-sm text-sm">
          {description}
        </p>
      )}

      {/* 액션 영역 (선택적) */}
      {action && <div>{action}</div>}
    </div>
  )
}
