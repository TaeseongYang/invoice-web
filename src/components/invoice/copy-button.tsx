'use client'

import { Copy, Check } from 'lucide-react'
import { toast } from 'sonner'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

// 클립보드 복사 버튼 컴포넌트
interface CopyButtonProps {
  text: string
  label?: string
}

export function CopyButton({ text, label = '복사' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    // TODO: 복사 성공/실패 처리 로직 연결
    navigator.clipboard.writeText(text)
    toast.success('클립보드에 복사되었습니다')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button variant="outline" size="sm" onClick={handleCopy}>
      {copied ? (
        <Check className="mr-1 h-4 w-4 text-green-600" />
      ) : (
        <Copy className="mr-1 h-4 w-4" />
      )}
      {label}
    </Button>
  )
}
