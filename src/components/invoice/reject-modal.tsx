'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

// 거절 사유 입력 모달 컴포넌트
interface RejectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (reason: string) => void
}

export function RejectModal({
  open,
  onOpenChange,
  onConfirm,
}: RejectModalProps) {
  // 거절 사유 상태 관리
  const [reason, setReason] = useState('')

  const handleConfirm = () => {
    // TODO: 거절 사유 유효성 검사 로직 연결
    onConfirm(reason)
    setReason('')
  }

  const handleCancel = () => {
    setReason('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>견적서 거절</DialogTitle>
          <DialogDescription>
            거절 사유를 입력해주세요. 담당자에게 전달됩니다.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-2">
          <Label htmlFor="reject-reason">거절 사유</Label>
          <Textarea
            id="reject-reason"
            placeholder="거절 사유를 입력하세요 (선택사항)"
            className="min-h-24 resize-none"
            value={reason}
            onChange={e => setReason(e.target.value)}
          />
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          {/* 취소 버튼 */}
          <Button variant="outline" onClick={handleCancel}>
            취소
          </Button>
          {/* 거절 확인 버튼 */}
          <Button variant="destructive" onClick={handleConfirm}>
            거절 확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
