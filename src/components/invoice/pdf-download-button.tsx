'use client'

import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PdfDownloadButtonProps {
  invoiceId: string
}

export function PdfDownloadButton({ invoiceId }: PdfDownloadButtonProps) {
  const handleDownload = () => {
    window.open(`/api/invoice-pdf/${invoiceId}`, '_blank')
  }

  return (
    <Button variant="outline" className="w-full gap-2" onClick={handleDownload}>
      <Download className="h-4 w-4" />
      PDF 다운로드
    </Button>
  )
}
