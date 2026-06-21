'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Send, Pencil, Check, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CopyButton } from '@/components/invoice/copy-button'
import type { InvoiceWithItems } from '@/lib/types/invoice'

interface InvoiceDetailClientProps {
  invoice: InvoiceWithItems
}

export function InvoiceDetailClient({ invoice }: InvoiceDetailClientProps) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)

  const handleSend = () => {
    router.push(`/invoices/${invoice.notionPageId}/sent`)
  }

  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/view/${invoice.notionPageId}`
      : `/view/${invoice.notionPageId}`

  return (
    <div className="space-y-5">
      {/* 클라이언트 정보 섹션 */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">
                클라이언트 정보
              </CardTitle>
              <CardDescription className="mt-0.5 text-xs">
                견적서를 받을 클라이언트 정보
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? (
                <X className="h-4 w-4" />
              ) : (
                <Pencil className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing ? (
            <>
              <div className="space-y-1.5">
                <Label htmlFor="clientName" className="text-xs font-medium">
                  클라이언트 이름
                </Label>
                <Input
                  id="clientName"
                  placeholder="김철수"
                  defaultValue={invoice.clientName}
                  className="h-9"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="clientEmail" className="text-xs font-medium">
                  이메일
                </Label>
                <Input
                  id="clientEmail"
                  type="email"
                  placeholder="client@company.com"
                  className="h-9"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="clientCompany" className="text-xs font-medium">
                  회사명{' '}
                  <span className="text-muted-foreground font-normal">
                    (선택)
                  </span>
                </Label>
                <Input
                  id="clientCompany"
                  placeholder="(주)클라이언트"
                  className="h-9"
                />
              </div>
              <Button
                className="w-full"
                size="sm"
                onClick={() => setIsEditing(false)}
              >
                <Check className="mr-2 h-3.5 w-3.5" />
                저장
              </Button>
            </>
          ) : (
            <div className="divide-y text-sm">
              <div className="flex justify-between py-2.5">
                <span className="text-muted-foreground">이름</span>
                <span className="font-medium">{invoice.clientName || '-'}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-muted-foreground">이메일</span>
                <span className="font-medium">-</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-muted-foreground">회사명</span>
                <span className="font-medium">-</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 상태별 액션 버튼 */}
      <Card className="border-dashed shadow-none">
        <CardContent className="p-4">
          {invoice.status === '대기' ? (
            <Button className="w-full gap-2 shadow-sm" onClick={handleSend}>
              <Send className="h-4 w-4" />
              발송하기
            </Button>
          ) : (
            <CopyButton text={shareUrl} label="공유 링크 복사" />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
