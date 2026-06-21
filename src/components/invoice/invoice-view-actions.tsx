'use client'

import { useState } from 'react'
import { CheckCircle, Clock, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RejectModal } from '@/components/invoice/reject-modal'

// 클라이언트 뷰 페이지 하단 액션 버튼 컴포넌트
export function InvoiceViewActions() {
  // 거절 모달 열림 상태 관리
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)

  const handleConfirmReject = (reason: string) => {
    // TODO: 거절 처리 Server Action 연결 (reason 포함)
    console.log('거절 사유:', reason)
    setIsRejectModalOpen(false)
  }

  return (
    <>
      {/* 응답 버튼 그룹 */}
      <div className="grid grid-cols-3 gap-3">
        {/* 승인 버튼 */}
        <Button
          className="w-full bg-green-600 text-white hover:bg-green-700"
          onClick={() => {
            /* TODO: 승인 처리 Server Action 연결 */
          }}
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          승인
        </Button>

        {/* 보류 버튼 */}
        <Button
          variant="outline"
          className="w-full border-amber-400 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30"
          onClick={() => {
            /* TODO: 보류 처리 Server Action 연결 */
          }}
        >
          <Clock className="mr-2 h-4 w-4" />
          보류
        </Button>

        {/* 거절 버튼 */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setIsRejectModalOpen(true)}
        >
          <XCircle className="mr-2 h-4 w-4" />
          거절
        </Button>
      </div>

      {/* 거절 사유 입력 모달 */}
      <RejectModal
        open={isRejectModalOpen}
        onOpenChange={setIsRejectModalOpen}
        onConfirm={handleConfirmReject}
      />
    </>
  )
}
