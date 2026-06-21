import type { LucideIcon } from 'lucide-react'

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
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {Icon && (
        <div className="bg-primary/8 mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border">
          <Icon className="text-primary h-7 w-7" />
        </div>
      )}

      <h3 className="mb-2 text-lg font-semibold">{title}</h3>

      {description && (
        <p className="text-muted-foreground mb-6 max-w-sm text-sm leading-relaxed">
          {description}
        </p>
      )}

      {action && <div>{action}</div>}
    </div>
  )
}
