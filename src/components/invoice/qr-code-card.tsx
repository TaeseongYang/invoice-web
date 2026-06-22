'use client'

import { useRef, useCallback } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { Download, QrCode } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { toast } from 'sonner'

interface QrCodeCardProps {
  url: string
  title: string
}

export function QrCodeCard({ url, title }: QrCodeCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    try {
      const dataUrl = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = dataUrl
      link.download = `qr-${title.replace(/\s+/g, '-')}.png`
      link.click()
      toast.success('QR 코드가 다운로드되었습니다.')
    } catch {
      toast.error('QR 코드 다운로드에 실패했습니다.')
    }
  }, [title])

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <QrCode className="text-muted-foreground h-4 w-4" />
          <CardTitle className="text-base font-semibold">QR 코드</CardTitle>
        </div>
        <CardDescription className="text-xs">
          클라이언트가 스캔하면 견적서를 바로 확인할 수 있습니다
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="rounded-xl border bg-white p-3">
          <QRCodeCanvas
            ref={canvasRef}
            value={url}
            size={160}
            level="M"
            marginSize={1}
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2"
          onClick={handleDownload}
        >
          <Download className="h-4 w-4" />
          PNG 다운로드
        </Button>
      </CardContent>
    </Card>
  )
}
