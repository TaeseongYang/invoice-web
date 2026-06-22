'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileText, LayoutDashboard } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [{ title: '대시보드', href: '/', icon: LayoutDashboard }]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="bg-sidebar hidden w-60 shrink-0 flex-col border-r md:flex">
      {/* 로고 */}
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
          <FileText className="text-primary-foreground h-4 w-4" />
        </div>
        <span className="text-xl font-bold tracking-tight">InvoiceWeb</span>
      </div>

      {/* 네비게이션 */}
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map(({ title, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              pathname === href
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <Icon className="h-4 w-4" />
            {title}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
