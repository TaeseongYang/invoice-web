'use client'

import { useTransition } from 'react'
import { LogOut, Loader2 } from 'lucide-react'
import { logoutAction } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'

export function LogoutButton() {
  const [isPending, startTransition] = useTransition()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => startTransition(() => logoutAction())}
      disabled={isPending}
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <LogOut className="h-4 w-4" />
      )}
      <span className="ml-1.5 hidden sm:inline">로그아웃</span>
    </Button>
  )
}
