import { ImageResponse } from '@vercel/og'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') ?? '견적서'
  const client = searchParams.get('client') ?? ''
  const amount = searchParams.get('amount') ?? ''

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          width: '100%',
          height: '100%',
          padding: '60px 72px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* 브랜드 태그 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '32px',
            color: '#94a3b8',
            fontSize: '16px',
            letterSpacing: '0.05em',
          }}
        >
          InvoiceWeb
        </div>

        {/* 제목 */}
        <div
          style={{
            fontSize: '52px',
            fontWeight: 700,
            color: '#f1f5f9',
            lineHeight: 1.2,
            marginBottom: '20px',
            maxWidth: '800px',
          }}
        >
          {title}
        </div>

        {/* 클라이언트 & 금액 */}
        <div
          style={{
            display: 'flex',
            gap: '32px',
            marginTop: '16px',
          }}
        >
          {client && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <span style={{ color: '#64748b', fontSize: '14px' }}>수신인</span>
              <span
                style={{ color: '#cbd5e1', fontSize: '20px', fontWeight: 600 }}
              >
                {client}
              </span>
            </div>
          )}
          {amount && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <span style={{ color: '#64748b', fontSize: '14px' }}>총금액</span>
              <span
                style={{ color: '#38bdf8', fontSize: '20px', fontWeight: 700 }}
              >
                {amount}
              </span>
            </div>
          )}
        </div>

        {/* 하단 안내 */}
        <div
          style={{
            position: 'absolute',
            bottom: '48px',
            right: '72px',
            color: '#475569',
            fontSize: '14px',
          }}
        >
          견적서를 확인하고 승인/거절해주세요
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
