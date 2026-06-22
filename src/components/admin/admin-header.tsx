'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, FileText, LayoutDashboard, PlusCircle } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'

const navItems = [
  { title: '대시보드', href: '/', icon: LayoutDashboard },
  { title: '견적서 등록', href: '/invoices/new', icon: PlusCircle },
]

interface AdminHeaderProps {
  logoutButton?: React.ReactNode
}

export function AdminHeader({ logoutButton }: AdminHeaderProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 flex h-16 items-center justify-between border-b px-4 backdrop-blur md:px-6">
      {/* 모바일: 햄버거 메뉴 */}
      <div className="flex items-center gap-3 md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">메뉴 열기</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-60 p-0">
            <div className="flex h-16 items-center gap-2 border-b px-6">
              <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
                <FileText className="text-primary-foreground h-4 w-4" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                InvoiceWeb
              </span>
            </div>
            <nav className="space-y-1 p-4">
              {navItems.map(({ title, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
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
          </SheetContent>
        </Sheet>

        {/* 모바일 로고 */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary flex h-7 w-7 items-center justify-center rounded-lg">
            <FileText className="text-primary-foreground h-3.5 w-3.5" />
          </div>
          <span className="text-lg font-bold tracking-tight">InvoiceWeb</span>
        </Link>
      </div>

      {/* 데스크톱: 빈 공간 */}
      <div className="hidden md:block" />

      {/* 우측 액션 */}
      <div className="flex items-center gap-2">
        <ThemeToggle />
        {logoutButton}
      </div>
    </header>
  )
}
