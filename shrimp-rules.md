# InvoiceWeb AI Agent 개발 규칙

## 1. 프로젝트 개요

- **서비스**: 프리랜서가 노션 URL로 견적서를 생성하고, 클라이언트가 Notion 페이지 ID 기반 공개 링크로 확인·응답하는 Next.js 15 서비스
- **기술 스택**: Next.js 15.5.3 (App Router) · React 19 · TypeScript 5 · TailwindCSS v4 · shadcn/ui (new-york) · **@notionhq/client (메인 DB)** · React Hook Form + Zod
- **데이터 저장소**: **Notion Database 2개** — Supabase 미사용, 이메일 발송 기능 없음
- **인증**: 없음 (Phase 1~3 범위 외)

---

## 2. 핵심 아키텍처 원칙

### Notion DB 2개가 메인 저장소

```
Invoices DB  ←→  Items DB (Relation)
     ↑
Notion 페이지 ID = 견적서 식별자 (PK)
```

- **Supabase 사용 금지** — 코드에 Supabase 관련 패키지·코드 절대 추가하지 않음
- **이메일 발송 없음** — Resend 미사용, 클라이언트 이메일 속성 없음
- **인증 없음** — 로그인/회원가입 페이지는 UI만 존재, 실제 인증 로직 없음
- Invoices DB의 각 페이지(row) = 하나의 견적서
- 견적서 항목 = Items DB의 별도 페이지, Invoices ↔ Items Relation으로 연결
- 클라이언트 접근 = `/view/[notionPageId]` — 토큰 없이 Notion 페이지 ID 직접 사용

---

## 3. 실제 Notion DB 스키마 (절대 기준)

### 3-1. Invoices DB (ID: 3853c6a1-c04d-803e-ba2c-c5e03ab37e4a)

| 속성명 (한국어) | Notion 타입 | TypeScript 필드명 | 설명                  |
| --------------- | ----------- | ----------------- | --------------------- |
| `견적서 번호`   | title       | `title`           | 견적서 제목 (PK 역할) |
| `클라이언트명`  | rich_text   | `clientName`      | 클라이언트 이름       |
| `항목`          | relation    | `itemIds`         | Items DB Relation     |
| `발행일`        | date        | `issuedAt`        | 발행일                |
| `상태`          | status      | `status`          | 대기 / 승인 / 거절    |
| `유효기간`      | date        | `expiresAt`       | 견적서 유효기간       |
| `총금액`        | number      | `totalAmount`     | 총 금액 (원)          |

**상태 옵션**: `대기` / `승인` / `거절`

### 3-2. Items DB (ID: 3853c6a1-c04d-80fb-ad9f-eedd0718504f)

| 속성명 (한국어) | Notion 타입 | TypeScript 필드명 | 설명                    |
| --------------- | ----------- | ----------------- | ----------------------- |
| `항목명`        | title       | `title`           | 항목명                  |
| `수량`          | number      | `quantity`        | 수량                    |
| `단가`          | number      | `unitPrice`       | 단가 (원)               |
| `금액`          | formula     | `amount`          | 수량 × 단가 (자동 계산) |
| `Invoices`      | relation    | —                 | Invoices DB Relation    |

### 3-3. TypeScript 타입 (camelCase 필드명)

```typescript
// src/lib/types/invoice.ts

export type InvoiceStatus = '대기' | '승인' | '거절'

export type Invoice = {
  notionPageId: string // Notion 페이지 ID (URL용 PK)
  title: string // 견적서 번호/제목
  clientName: string // 클라이언트명
  status: InvoiceStatus // 대기/승인/거절
  issuedAt: string | null // 발행일 (ISO 8601)
  expiresAt: string | null // 유효기간 (ISO 8601)
  totalAmount: number | null // 총금액
  itemIds: string[] // Items DB 페이지 ID 목록
}

export type InvoiceItem = {
  notionPageId: string // Items DB 페이지 ID
  title: string // 항목명
  quantity: number // 수량
  unitPrice: number // 단가
  amount: number // 금액 (formula)
}

export type InvoiceWithItems = Invoice & {
  items: InvoiceItem[]
}
```

### 3-4. Notion 속성명 → TypeScript 매핑 규칙

- Notion API 응답의 한국어 속성명을 파싱 레이어에서 camelCase TypeScript 필드로 변환
- `database.ts`에서 속성명을 한국어 문자열 그대로 사용 (`'견적서 번호'`, `'클라이언트명'` 등)
- 변환 예시:
  ```typescript
  // Notion API 응답 파싱
  title: page.properties['견적서 번호'].title[0]?.plain_text ?? ''
  clientName: page.properties['클라이언트명'].rich_text[0]?.plain_text ?? ''
  status: page.properties['상태'].status?.name as InvoiceStatus
  totalAmount: page.properties['총금액'].number
  issuedAt: page.properties['발행일'].date?.start ?? null
  expiresAt: page.properties['유효기간'].date?.start ?? null
  ```

---

## 4. 라우트 구조 (실제 구현 범위)

### 4-1. 현재 라우트 페이지

| 경로                  | 파일                                  | 설명                 | 인증                    |
| --------------------- | ------------------------------------- | -------------------- | ----------------------- |
| `/`                   | `src/app/page.tsx`                    | 홈 랜딩              | 공개                    |
| `/login`              | `src/app/login/page.tsx`              | 로그인 (UI만)        | 공개                    |
| `/signup`             | `src/app/signup/page.tsx`             | 회원가입 (UI만)      | 공개                    |
| `/dashboard`          | `src/app/dashboard/page.tsx`          | 견적서 목록          | 공개 (인증 없음)        |
| `/invoices/new`       | `src/app/invoices/new/page.tsx`       | 견적서 생성          | 공개 (인증 없음)        |
| `/invoices/[id]`      | `src/app/invoices/[id]/page.tsx`      | 견적서 상세          | 공개 (인증 없음)        |
| `/invoices/[id]/sent` | `src/app/invoices/[id]/sent/page.tsx` | 발송 완료 안내       | 공개 (인증 없음)        |
| `/view/[id]`          | `src/app/view/[id]/page.tsx`          | 클라이언트 뷰        | 공개 (Notion 페이지 ID) |
| `/view/[id]/response` | `src/app/view/[id]/response/page.tsx` | 클라이언트 응답 완료 | 공개                    |

> ⚠️ `/view/[token]` → `/view/[id]`로 변경 — 토큰 대신 Notion 페이지 ID 사용

### 4-2. 제거된 기능

- 공유 토큰 생성/검증 (ShareToken 속성 없음)
- 이메일 발송 (클라이언트 이메일 속성 없음)
- 프리랜서 인증/로그인 실제 구현 (관련 속성 없음)
- `/invoices/[id]/sent` — 이메일 발송 없으므로 "링크 복사" 안내 페이지로 변경

---

## 5. 파일 위치 규칙 (절대 준수)

| 기능                   | 위치                                                    | 비고                       |
| ---------------------- | ------------------------------------------------------- | -------------------------- |
| Server Actions         | `src/app/actions/invoice.ts` · `invoice-response.ts`    | `'use server'` 필수        |
| Notion API 클라이언트  | `src/lib/notion/client.ts`                              | 서버 전용                  |
| Notion URL 파싱        | `src/lib/notion/parse-url.ts`                           | URL → UUID 변환            |
| Notion DB CRUD         | `src/lib/notion/database.ts`                            | 견적서·항목 생성·조회·수정 |
| Rate Limit 처리        | `src/lib/notion/retry.ts`                               | Exponential backoff        |
| Notion 공개 인터페이스 | `src/lib/notion/index.ts`                               | 외부 노출 함수만           |
| Zod 스키마             | `src/lib/schemas/invoice.ts` · `notion.ts` · `index.ts` |                            |
| TypeScript 타입        | `src/lib/types/invoice.ts` · `index.ts`                 |                            |
| 환경변수 검증          | `src/lib/env.ts`                                        | Zod 스키마로 관리          |
| shadcn/ui 컴포넌트     | `src/components/ui/`                                    | 자동 생성, 직접 수정 금지  |
| 레이아웃 컴포넌트      | `src/components/layout/`                                |                            |
| 비즈니스 컴포넌트      | `src/components/invoice/`                               |                            |

---

## 6. 절대 금지 사항

- **`any` 타입 사용 금지** — TypeScript strict 모드, unknown + type guard 사용
- **Supabase 사용 금지** — `@supabase/*` 패키지 설치 및 코드 작성 금지
- **`NEXT_PUBLIC_` 접두사로 Notion API 토큰 노출 금지** — `NOTION_API_TOKEN`은 서버 환경변수만
- **클라이언트 컴포넌트에서 Notion API 직접 호출 금지** — Server Actions 경유만 허용
- **`src/components/ui/` 파일 직접 수정 금지** — shadcn/ui 자동 생성 파일
- **인라인 스타일(`style={{}}`) 사용 금지** — Tailwind 유틸리티 클래스만
- **상대 경로 import 금지** — `@/` 경로 별칭 사용
- **snake_case 파일명 금지** — 파일명은 kebab-case, 컴포넌트명은 PascalCase
- **하드코딩된 색상 클래스 금지** — `bg-background`, `text-foreground` 등 시맨틱 변수 사용
- **존재하지 않는 Notion 속성 참조 금지** — 실제 DB 속성명(한국어)만 사용

---

## 7. Notion API 규칙

### 7-1. 견적서 CRUD

```
생성: pages.create({ parent: { database_id }, properties: { '견적서 번호': ..., '클라이언트명': ... } })
조회: pages.retrieve(notionPageId)
목록: databases.query({ database_id: NOTION_DATABASE_ID })
수정: pages.update(notionPageId, { properties: { '상태': ... } })
항목 조회: pages.retrieve(itemPageId) — Items DB 페이지 ID로 조회
```

### 7-2. URL → UUID 변환

```
입력: https://www.notion.so/Invoice-abc123def456789012345678901234ab
추출: abc123def456789012345678901234ab (32자리 hex)
변환: abc123de-f456-7890-1234-5678901234ab (UUID 형식)
```

### 7-3. Rate Limit 처리

- Exponential backoff: `2^attempt` 초, 최대 3회 재시도
- 429 응답 시 `Retry-After` 헤더 우선 적용
- 모든 재시도 로직은 `src/lib/notion/retry.ts`에서 처리

### 7-4. 클라이언트 링크 생성

```typescript
// 토큰 없이 Notion 페이지 ID 직접 사용
const viewUrl = `${process.env.NEXT_PUBLIC_APP_URL}/view/${notionPageId}`
```

---

## 8. 환경변수

| 변수명                | 용도                        | 서버/공개 |
| --------------------- | --------------------------- | --------- |
| `NOTION_API_TOKEN`    | Notion API 인증             | 서버 전용 |
| `NOTION_DATABASE_ID`  | Invoices DB ID              | 서버 전용 |
| `NEXT_PUBLIC_APP_URL` | 서비스 도메인 (링크 생성용) | 공개      |

> Items DB ID는 Invoices DB의 Relation 속성에서 자동으로 참조되므로 별도 환경변수 불필요

---

## 9. Server Action 작성 규칙

```typescript
'use server'

import { createNotionClient } from '@/lib/notion/client'
import { env } from '@/lib/env'

export async function getInvoices() {
  const notion = createNotionClient()
  const response = await notion.databases.query({
    database_id: env.NOTION_DATABASE_ID ?? '',
  })
  // ... 파싱 후 반환
}
```

- `'use server'` 지시어를 파일 최상단에 추가
- Notion API 에러는 즉시 throw
- 반환 타입 명시

---

## 10. 컴포넌트 작성 규칙

```typescript
// 기본값: Server Component
export default async function PageComponent() {
  const data = await fetchFromNotion()
  return <div>...</div>
}

// 상호작용·상태·브라우저 API 필요 시만 Client Component
'use client'
export function InteractiveComponent() {
  const [state, setState] = useState(...)
}
```

- **모든 폼**: React Hook Form + Zod 스키마 검증 + Server Action
- 폼 컴포넌트는 반드시 `'use client'`
- `cn()` 함수로 클래스 조합: `import { cn } from '@/lib/utils'`

---

## 11. 코드 품질 규칙

- **완료 기준**: `npm run check-all` (typecheck + lint + format) 통과 필수
- **빌드 확인**: `npm run build` 성공 필수
- **파일 크기**: 단일 파일 300줄 이하 권장
- **import 순서**: 외부 라이브러리 → `@/` 경로 → 상대 경로
- **export 방식**: 페이지 컴포넌트는 default export, 나머지는 named export

---

## 12. Phase별 완료 기준

| Phase                   | 완료 조건                                                 |
| ----------------------- | --------------------------------------------------------- |
| Phase 1 (골격)          | `npm run check-all` · `npm run build` 통과, 타입 에러 0개 |
| Phase 2 (UI)            | 8개 페이지 더미 UI 완성, 브라우저 시각 검증               |
| Phase 3 (비즈니스 로직) | 실제 Notion DB 연동, 견적서 CRUD 작동                     |
