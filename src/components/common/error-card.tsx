import { AlertTriangle, ShieldOff, XCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

// 에러 카드 컴포넌트 variant 타입
type ErrorCardVariant = 'expired' | 'invalid' | 'error'

// 에러 카드 컴포넌트
interface ErrorCardProps {
  variant: ErrorCardVariant
  title: string
  description: string
}

// variant별 아이콘 및 색상 설정
const variantConfig = {
  expired: {
    icon: AlertTriangle,
    iconClass: 'text-amber-500',
    bgClass: 'bg-amber-50 dark:bg-amber-950/30',
  },
  invalid: {
    icon: ShieldOff,
    iconClass: 'text-red-500',
    bgClass: 'bg-red-50 dark:bg-red-950/30',
  },
  error: {
    icon: XCircle,
    iconClass: 'text-red-500',
    bgClass: 'bg-red-50 dark:bg-red-950/30',
  },
}

export function ErrorCard({ variant, title, description }: ErrorCardProps) {
  const config = variantConfig[variant]
  const Icon = config.icon

  return (
    // 중앙 정렬 카드 레이아웃
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center py-12 text-center">
          {/* 아이콘 배경 원 */}
          <div
            className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${config.bgClass}`}
          >
            <Icon className={`h-8 w-8 ${config.iconClass}`} />
          </div>

          {/* 제목 */}
          <h2 className="mb-2 text-xl font-bold">{title}</h2>

          {/* 설명 */}
          <p className="text-muted-foreground text-sm">{description}</p>
        </CardContent>
      </Card>
    </div>
  )
}
