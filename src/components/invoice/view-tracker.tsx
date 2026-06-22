'use client'

import { useEffect } from 'react'
import { incrementViewCountAction } from '@/app/actions/invoices'

interface ViewTrackerProps {
  invoiceId: string
}

// 클라이언트 뷰 진입 시 조회수 1 증가 — 세션당 1회 카운트
export function ViewTracker({ invoiceId }: ViewTrackerProps) {
  useEffect(() => {
    const key = `viewed_${invoiceId}`
    if (sessionStorage.getItem(key)) return

    sessionStorage.setItem(key, '1')
    incrementViewCountAction(invoiceId).catch(() => {
      // 조회수 업데이트 실패는 무시
    })
  }, [invoiceId])

  return null
}
