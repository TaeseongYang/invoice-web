import { Skeleton } from '@/components/ui/skeleton'

// 로딩 스켈레톤 컴포넌트
interface LoadingSkeletonProps {
  rows?: number // 스켈레톤 행 수 (기본값 5)
}

export function LoadingSkeleton({ rows = 5 }: LoadingSkeletonProps) {
  return (
    <div className="space-y-3">
      {/* rows 개수만큼 스켈레톤 행 반복 */}
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="flex items-center gap-4">
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div>
  )
}
