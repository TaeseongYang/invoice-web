'use client'

import { MessageCircle, Send as TelegramIcon, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { toast } from 'sonner'

interface ShareButtonsProps {
  url: string
  title: string
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const message = `${title} 견적서를 확인해주세요.\n${url}`

  const handleKakao = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator
        .share({ title, text: `${title} 견적서를 확인해주세요.`, url })
        .catch(() => {
          // 사용자가 공유 취소 시 무시
        })
    } else {
      // Web Share API 미지원 환경 — 클립보드 복사 fallback
      navigator.clipboard
        .writeText(url)
        .then(() =>
          toast.info(
            '링크를 클립보드에 복사했습니다. 카카오톡에 직접 붙여넣기 해주세요.'
          )
        )
        .catch(() => toast.error('링크 복사에 실패했습니다.'))
    }
  }

  const handleTelegram = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`
    window.open(telegramUrl, '_blank', 'noopener,noreferrer')
  }

  const handleEmail = () => {
    const subject = encodeURIComponent(`[견적서] ${title}`)
    const body = encodeURIComponent(
      `안녕하세요.\n\n${title} 견적서를 공유드립니다.\n\n아래 링크에서 확인하실 수 있습니다:\n${url}\n\n감사합니다.`
    )
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Share2 className="text-muted-foreground h-4 w-4" />
          <CardTitle className="text-base font-semibold">공유하기</CardTitle>
        </div>
        <CardDescription className="text-xs">
          다양한 채널로 견적서를 공유하세요
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex h-auto flex-col gap-1 py-3"
          onClick={handleKakao}
        >
          <MessageCircle className="h-4 w-4 text-yellow-500" />
          <span className="text-xs">카카오</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex h-auto flex-col gap-1 py-3"
          onClick={handleTelegram}
        >
          <TelegramIcon className="h-4 w-4 text-blue-500" />
          <span className="text-xs">텔레그램</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex h-auto flex-col gap-1 py-3"
          onClick={handleEmail}
        >
          <Share2 className="h-4 w-4 text-gray-500" />
          <span className="text-xs">이메일</span>
        </Button>
      </CardContent>
    </Card>
  )
}
