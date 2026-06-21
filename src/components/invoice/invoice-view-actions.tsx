'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, Clock, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RejectModal } from '@/components/invoice/reject-modal'
import { updateInvoiceStatusAction } from '@/app/actions/invoices'

interface InvoiceViewActionsProps {
  invoicePageId: string
}

export function InvoiceViewActions({ invoicePageId }: InvoiceViewActionsProps) {
  const router = useRouter()
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleApprove = async () => {
    setIsSubmitting(true)
    try {
      await updateInvoiceStatusAction(invoicePageId, '승인')
      router.push(`/view/${invoicePageId}/response?status=승인`)
    } catch {
      setIsSubmitting(false)
    }
  }

  const handleHold = async () => {
    setIsSubmitting(true)
    try {
      // 보류는 Notion DB에 별도 상태 없으므로 '대기' 유지, 응답 페이지만 이동
      router.push(`/view/${invoicePageId}/response?status=보류`)
    } catch {
      setIsSubmitting(false)
    }
  }

  const handleConfirmReject = async (reason: string) => {
    setIsRejectModalOpen(false)
    setIsSubmitting(true)
    try {
      await updateInvoiceStatusAction(invoicePageId, '거절')
      const params = new URLSearchParams({ status: '거절', reason })
      router.push(`/view/${invoicePageId}/response?${params.toString()}`)
    } catch {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        <Button
          className="w-full bg-green-600 text-white hover:bg-green-700"
          onClick={handleApprove}
          disabled={isSubmitting}
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          승인
        </Button>

        <Button
          variant="outline"
          className="w-full border-amber-400 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30"
          onClick={handleHold}
          disabled={isSubmitting}
        >
          <Clock className="mr-2 h-4 w-4" />
          보류
        </Button>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => setIsRejectModalOpen(true)}
          disabled={isSubmitting}
        >
          <XCircle className="mr-2 h-4 w-4" />
          거절
        </Button>
      </div>

      <RejectModal
        open={isRejectModalOpen}
        onOpenChange={setIsRejectModalOpen}
        onConfirm={handleConfirmReject}
      />
    </>
  )
}
