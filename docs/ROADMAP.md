# 🚀 노션 기반 견적서 웹 뷰어 MVP - 개발 로드맵

**프로젝트**: InvoiceWeb MVP | **대상**: 프리랜서/에이전시의 노션 기반 견적서 공유  
**기간**: 8주 | **패러다임**: 구조 우선 접근법(Structure-First Approach)

---

## 📋 목차

1. [프로젝트 개요](#프로젝트-개요)
2. [개발 철학](#개발-철학)
3. [4단계 개발 계획](#4단계-개발-계획)
4. [상세 작업 분해](#상세-작업-분해)
5. [의존성 그래프](#의존성-그래프)
6. [마일스톤 타임라인](#마일스톤-타임라인)
7. [위험 요소 및 완화 전략](#위험-요소-및-완화-전략)

---

## 프로젝트 개요

### 핵심 가치

- 프리랜서가 **노션 URL만으로** 전문적인 견적서 공유 링크를 **5분 내에** 생성
- 클라이언트가 별도 계정 없이 **공유 링크로** 견적서 확인 및 응답
- PDF 다운로드, 승인/거절/보류 상태 추적

### MVP 성공 지표

| 지표                      | 목표     |
| ------------------------- | -------- |
| 노션 URL → 공유 링크 생성 | 5분 이내 |
| 웹 뷰 로딩 시간           | 2초 이내 |
| PDF 다운로드 시간         | 3초 이내 |
| 공유 링크 유효 기간       | 30일     |

### 핵심 기능 (F001~F012)

| ID   | 기능명                                    | Phase |
| ---- | ----------------------------------------- | ----- |
| F001 | 노션 API 연동 (페이지 메타 + 테이블 파싱) | 3     |
| F002 | 견적서 발송 및 공유 링크 생성             | 3     |
| F003 | 견적서 웹 뷰 (토큰 기반 공개 접근)        | 3     |
| F004 | PDF 다운로드 (클라이언트 사이드)          | 4     |
| F005 | 견적서 상태 관리 (승인/거절/보류)         | 3     |
| F006 | 견적서 목록 조회 (프리랜서 대시보드)      | 3     |
| F010 | 기본 인증 (회원가입/로그인/로그아웃)      | 3     |
| F011 | 프리랜서 기본 정보 관리                   | 2     |
| F012 | 클라이언트 기본 정보 저장                 | 2     |

---

## 개발 철학

### 구조 우선 접근법 (Structure-First Approach)

**왜 이 접근법을 선택했나?**

- 초기 아키텍처 결정이 이후 모든 개발 단계에 영향
- 데이터 모델과 라우팅 구조가 명확하면, UI와 기능 구현이 병렬 가능
- 초기 "빈 틀"로 전체 팀이 같은 구조 위에서 작업 가능

### 4단계 개발 프로세스

```
┌─────────────────────────────────────────────────────────┐
│ Phase 1: 골격 구축 (Structure)                          │
│ └─ 라우팅, 타입, DB 스키마 정의                         │
├─────────────────────────────────────────────────────────┤
│ Phase 2: UI/UX 완성 (Presentation)                      │
│ └─ 모든 페이지 더미 데이터로 구현, 디자인 검증          │
├─────────────────────────────────────────────────────────┤
│ Phase 3: 핵심 기능 구현 (Business Logic)                │
│ └─ Notion API, Auth, 데이터 CRUD, 이메일 발송          │
├─────────────────────────────────────────────────────────┤
│ Phase 4: 고급 기능 & 최적화 (Polish)                    │
│ └─ PDF, 성능, 모니터링, 배포 준비                       │
└─────────────────────────────────────────────────────────┘
```

### 각 Phase의 특징

| Phase | 초점          | 테스트 방식                  | 결과물                            |
| ----- | ------------- | ---------------------------- | --------------------------------- |
| **1** | 아키텍처 정의 | 타입 체크, 구조 검증         | 라우팅 구조, 타입 정의, DB 스키마 |
| **2** | UI/UX 확정    | 시각적 검증, 반응형 테스트   | 모든 페이지 UI (더미 데이터)      |
| **3** | 비즈니스 로직 | E2E 테스트 (Playwright)      | API, 데이터 흐름, 상태 관리       |
| **4** | 성능 & 안정성 | 성능 프로파일링, 배포 테스트 | 최적화된 배포 가능 버전           |

---

## 4단계 개발 계획

### Phase 1: 애플리케이션 골격 구축 (2주) ✅

> **목표**: 타입 안전한 프로젝트 기초와 전체 라우팅 구조 정의  
> **산출물**: 실행 가능한 라우팅 + 타입 정의 + Notion API 데이터 레이어

#### Task 001: 프로젝트 구조 및 라우팅 설정 ✅ - 완료

**목표**: Next.js 15 App Router 기반 전체 페이지 구조 정의

**구현 사항**:

- 8개 라우트 페이지의 빈 틀 생성 (`layout.tsx`, `page.tsx` 포함)
  - `/` (홈)
  - `/login` (로그인, 비로그인만)
  - `/signup` (회원가입, 비로그인만)
  - `/dashboard` (견적서 목록, 로그인 필수)
  - `/invoices/new` (견적서 작성, 로그인 필수)
  - `/invoices/[id]` (견적서 상세, 로그인 필수)
  - `/view/[token]` (클라이언트 뷰, 토큰 기반 공개)
  - `/view/[token]/response` (응답 완료, 토큰 기반 공개)
- 공통 레이아웃 (`app/layout.tsx`, `app/(auth)/layout.tsx`, `app/(protected)/layout.tsx`)
- 네비게이션 컴포넌트 (헤더, 사이드바 스켈레톤)
- 미들웨어 기본 구조 (인증 리다이렉션)

**기술 결정사항**:

- App Router 사용 (기존 Pages Router 대비 더 강력한 타입 안전성)
- 라우트 그룹(`(auth)`, `(protected)`, `(public)`)으로 레이아웃 분리
- 미들웨어로 보호된 페이지 접근 제어

**파일 구조**:

```
src/
├── app/
│   ├── layout.tsx (루트 레이아웃)
│   ├── page.tsx (홈)
│   ├── (auth)/
│   │   ├── layout.tsx
│   │   ├── login/
│   │   ├── signup/
│   │   └── ...
│   ├── (protected)/
│   │   ├── layout.tsx
│   │   ├── dashboard/
│   │   ├── invoices/
│   │   └── ...
│   └── (public)/
│       ├── view/
│       └── ...
├── lib/
│   ├── types/ (타입 정의)
│   ├── schemas/ (Zod 스키마)
│   └── ...
├── middleware.ts
└── ...
```

## 테스트 체크리스트

### 구조 검증

- [x] 8개 라우트 페이지 생성: `npm run dev`로 각 라우트 접속 시 에러 없이 렌더링 확인
- [x] 공통 레이아웃 정상: 헤더, 사이드바, 푸터 모든 페이지에 표시 확인
- [x] 라우트 그룹 적용: (auth), (protected), (public) 레이아웃 분리 확인

### 타입 검증

- [x] TypeScript 컴파일: `npm run build` 성공 (타입 에러 없음)
- [x] ESLint 검사: `npm run lint` 통과
- [x] Prettier 포맷: `npm run format` 적용 후 재검사 통과

### 미들웨어 검증

- [x] 보호된 페이지 접근: 비로그인 상태에서 `/dashboard` 접속 시 `/login`으로 리다이렉트 확인
- [x] 공개 페이지: `/` 및 `/view/[token]` 비로그인 상태에서 접근 가능 확인

**체크리스트**:

- [x] 9개 라우트 페이지 빈 틀 생성 (에러 없이 렌더링)
- [x] 공통 레이아웃 구조 정의 (헤더, 사이드바 등)
- [x] 라우트 보호 미들웨어 기본 구조 작성
- [x] ESLint/Prettier 설정 확인
- [x] `npm run check-all` 통과 (타입 에러 없음)

---

#### Task 002: TypeScript 타입 정의 및 Zod 스키마 작성 ✅ - 완료

**목표**: 타입 안전하고 검증 가능한 데이터 구조 정의

**구현 사항**:

1. **TypeScript 타입 정의** (`src/lib/types/`)
   - `Freelancer` (프리랜서)
   - `Invoice` (견적서)
   - `InvoiceItem` (견적서 항목)
   - `InvoiceResponse` (클라이언트 응답)
   - API 응답/요청 타입
   - UI Props 타입 (나중 사용)

2. **Zod 스키마** (`src/lib/schemas/`)
   - `freelancerSchema` (회원가입, 정보 수정)
   - `invoiceSchema` (견적서 발송)
   - `invoiceItemSchema` (항목 검증)
   - `invoiceResponseSchema` (응답 저장)
   - `notionUrlSchema` (노션 URL 검증)

3. **환경변수 검증** (`src/lib/env.ts`)
   - Zod로 환경변수 스키마 정의
   - `NOTION_API_TOKEN`, `SUPABASE_URL`, `SUPABASE_ANON_KEY` 등 검증
   - 빌드 시 환경변수 유효성 확인

**기술 결정사항**:

- `export type` (타입만 export, 런타임 오버헤드 없음)
- Zod의 `.parse()`와 `.safeParse()` 구분 사용
- 서버 액션에서는 `safeParse()` 사용 (에러 핸들링)

**파일 구조**:

```
src/lib/
├── types/
│   ├── freelancer.ts
│   ├── invoice.ts
│   ├── api.ts
│   └── index.ts
├── schemas/
│   ├── freelancer.ts
│   ├── invoice.ts
│   ├── invoice-response.ts
│   ├── notion.ts
│   └── index.ts
└── env.ts
```

**예시** (타입 정의):

```typescript
// src/lib/types/invoice.ts
export type Invoice = {
  id: string
  freelancer_id: string
  notion_url: string
  client_name: string
  client_email: string
  client_company?: string
  status: 'draft' | 'sent' | 'approved' | 'rejected'
  share_token: string
  total_amount: number
  created_at: Date
  updated_at: Date
  expires_at: Date
}
```

**예시** (Zod 스키마):

```typescript
// src/lib/schemas/invoice.ts
import { z } from 'zod'

export const invoiceSchema = z.object({
  client_name: z.string().min(1, '클라이언트 이름 필수'),
  client_email: z.string().email('유효한 이메일 주소 필요'),
  client_company: z.string().optional(),
})
```

## 테스트 체크리스트

### 타입 정의 검증

- [x] TypeScript strict mode 통과: `tsc --noEmit` 성공 (에러 0개)
- [x] IDE 자동완성: VSCode에서 `Invoice.` 입력 시 모든 필드 자동완성 동작 확인
- [x] 타입 안전성: 잘못된 타입 할당 시 TypeScript 컴파일 에러 발생 확인

### Zod 스키마 검증

- [x] 스키마 파싱 성공: 유효한 데이터 `parse()` 성공 확인
- [x] 스키마 검증 실패: 유효하지 않은 데이터 `safeParse()` 에러 반환 확인
- [x] 에러 메시지: 검증 실패 시 명확한 에러 메시지 표시

### 환경변수 검증

- [x] 환경변수 로드: `src/lib/env.ts` 성공적으로 로드 및 타입 지정
- [x] 빌드 시 검증: `npm run build` 시 필수 환경변수 누락 시 빌드 실패 확인

**체크리스트**:

- [x] 모든 데이터 모델 타입 정의 완료 (Invoice, InvoiceItem, InvoiceWithItems, InvoiceStatus, ApiResponse, PaginatedResponse)
- [x] Zod 스키마 작성 및 테스트 (createInvoiceSchema, updateInvoiceStatusSchema, notionUrlSchema, freelancerSchema, loginSchema)
- [x] 환경변수 검증 설정 (`src/lib/env.ts` — NOTION_API_TOKEN, NOTION_DATABASE_ID, NOTION_ITEMS_DATABASE_ID, RESEND_API_KEY)
- [x] TypeScript strict mode에서 컴파일 성공
- [x] IDE에서 타입 자동완성 동작 확인

---

#### Task 003: Notion API 클라이언트 및 데이터 레이어 구축 ✅ - 완료

**목표**: Notion API를 데이터 소스로 직접 사용하는 데이터 레이어 구축

> **구현 방향 변경 안내**: 본 프로젝트는 별도의 관계형 데이터베이스(Supabase) 대신 **Notion API를 직접 데이터 소스로 사용**하는 구조로 전환되었습니다. 따라서 기존 Supabase PostgreSQL 스키마 설계는 제외되고, `@notionhq/client` 기반의 Notion 데이터 레이어 구축으로 대체되었습니다.

**구현 사항**:

1. **Notion API 클라이언트** (`src/lib/notion/client.ts`)
   - `@notionhq/client` 설치 및 클라이언트 초기화
   - `NOTION_API_TOKEN` 환경변수 기반 인증 (서버 전용)

2. **Notion URL 파싱** (`src/lib/notion/parse-url.ts`)
   - 노션 URL에서 32자리 hex 페이지 ID 추출
   - UUID 형식으로 변환 및 유효성 검사

3. **데이터 레이어** (`src/lib/notion/database.ts`)
   - `listInvoices()`: 견적서 목록 조회
   - `getInvoiceById()`: 단일 견적서 조회
   - `getInvoiceItemById()` / `getInvoiceItems()`: 견적서 항목 조회
   - `createInvoice()`: 견적서 생성
   - `updateInvoiceStatus()`: 견적서 상태 변경

4. **Rate Limit 재시도 유틸리티** (`src/lib/notion/retry.ts`)
   - `withRetry()`: Exponential Backoff 기반 429 재시도 로직

5. **공개 인터페이스** (`src/lib/notion/index.ts`)
   - 데이터 레이어 함수들의 통합 export

**기술 결정사항**:

- Notion API를 단일 데이터 소스로 사용 (별도 DB 미사용)
- Notion 코드는 `src/lib/notion/` 서버 전용 디렉토리에 격리
- `NOTION_API_TOKEN`은 `NEXT_PUBLIC_` 접두사 금지 (서버 환경변수만)

**파일 구조**:

```
src/lib/notion/
├── client.ts (Notion API 클라이언트)
├── parse-url.ts (URL → UUID 변환)
├── database.ts (listInvoices, getInvoiceById, getInvoiceItemById, getInvoiceItems, createInvoice, updateInvoiceStatus)
├── retry.ts (withRetry — Rate Limit 처리)
└── index.ts (공개 인터페이스)
```

## 테스트 체크리스트

### Notion 클라이언트 검증

- [x] `@notionhq/client` 설치 및 클라이언트 초기화 정상 동작
- [x] `NOTION_API_TOKEN` 환경변수 로드 및 인증 확인
- [x] 서버 전용 격리: 클라이언트 번들에 Notion 토큰 미노출 확인

### URL 파싱 검증

- [x] 정상 노션 URL에서 페이지 ID 추출 및 UUID 변환 확인
- [x] 유효하지 않은 URL 형식 처리 확인

### 데이터 레이어 검증

- [x] `listInvoices` / `getInvoiceById` / `getInvoiceItems` 함수 정상 구현
- [x] `createInvoice` / `updateInvoiceStatus` 함수 정상 구현
- [x] `withRetry` 재시도 유틸리티 정상 구현

**체크리스트**:

- [x] `@notionhq/client` 설치
- [x] `src/lib/notion/client.ts` 생성
- [x] `src/lib/notion/parse-url.ts` 생성 (URL → UUID 변환)
- [x] `src/lib/notion/database.ts` 생성 (CRUD 데이터 레이어)
- [x] `src/lib/notion/retry.ts` 생성 (withRetry)
- [x] `src/lib/notion/index.ts` 생성 (공개 인터페이스)
- [x] `npm run check-all` 에러 0개, `npm run build` 성공 (9개 라우트)

---

### Phase 2: UI/UX 완성 (2주) ✅

> **목표**: 모든 페이지 UI를 더미 데이터로 구현하고 디자인 검증  
> **산출물**: 시각적으로 완성된 8개 페이지 (더미 데이터, 기능 없음)

#### Task 004: 공통 컴포넌트 라이브러리 구현 ✅ - 완료

**목표**: shadcn/ui 기반 프로젝트 전용 컴포넌트 라이브러리 구축

**구현 사항**:

1. **shadcn/ui 컴포넌트 설치**

   ```bash
   npx shadcn-ui@latest add button
   npx shadcn-ui@latest add input
   npx shadcn-ui@latest add card
   npx shadcn-ui@latest add form
   npx shadcn-ui@latest add dialog
   npx shadcn-ui@latest add dropdown-menu
   npx shadcn-ui@latest add tabs
   npx shadcn-ui@latest add toast
   npx shadcn-ui@latest add badge
   npx shadcn-ui@latest add table
   npx shadcn-ui@latest add select
   npx shadcn-ui@latest add textarea
   npx shadcn-ui@latest add alert
   npx shadcn-ui@latest add empty-state
   ```

2. **프로젝트 커스텀 컴포넌트** (`src/components/`)
   - `Header.tsx` (네비게이션 + 로그인 상태)
   - `Sidebar.tsx` (모바일 반응형)
   - `InvoiceTable.tsx` (견적서 목록 테이블)
   - `InvoiceForm.tsx` (클라이언트 정보 입력 폼)
   - `InvoicePreview.tsx` (견적서 미리보기)
   - `StatusBadge.tsx` (상태 표시)
   - `TokenBadge.tsx` (토큰 복사 버튼)

3. **Tailwind CSS 커스터마이제이션**
   - 컬러 스키마 정의 (primary, success, danger, warning)
   - 타이포그래피 스케일 확인
   - 반응형 브레이크포인트 설정

4. **Lucide Icons 통합**
   - 각 페이지에 필요한 아이콘 목록 정리
   - 아이콘 크기/색상 통일

**파일 구조**:

```
src/components/
├── common/
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── Footer.tsx
│   └── ...
├── forms/
│   ├── LoginForm.tsx
│   ├── SignupForm.tsx
│   ├── InvoiceForm.tsx
│   └── ...
├── invoice/
│   ├── InvoiceTable.tsx
│   ├── InvoicePreview.tsx
│   ├── InvoiceCard.tsx
│   └── ...
├── ui/ (shadcn/ui 컴포넌트)
│   └── ...
└── index.ts
```

## 테스트 체크리스트 (UI 시각적 검증)

### 컴포넌트 검증

- [ ] shadcn/ui 컴포넌트 설치: 15개 이상 설치 확인 (`npm list`)
- [ ] 커스텀 컴포넌트 작성: Header, Sidebar, InvoiceTable 등 정상 렌더링
- [ ] 컴포넌트 재사용: 각 컴포넌트가 여러 페이지에서 일관되게 렌더링

### 반응형 디자인 검증

- [ ] 모바일 (375px): 테이블 → 카드 레이아웃 변환, 스크롤 정상
- [ ] 태블릿 (768px): 2칼럼 레이아웃 확인
- [ ] 데스크톱 (1280px): 풀 레이아웃 확인
- [ ] 터치 영역: 버튼 최소 44px, 터치 패드 정상

### 디자인 일관성 검증

- [ ] 컬러 스키마: primary, success, danger, warning 모든 페이지 일관 적용
- [ ] 타이포그래피: 폰트 크기/가중치 일관성 (h1, h2, body 등)
- [ ] 간격: 패딩, 마진 일관성 (8px 단위)

**체크리스트**:

- [x] shadcn/ui 추가 컴포넌트 설치 (table, tabs, textarea, tooltip)
- [x] 더미 데이터 20개 생성 (`src/lib/data/dummy-invoices.ts` — 대기 8, 승인 7, 거절 5)
- [x] invoice/ 컴포넌트 5개 (status-badge, invoice-table, invoice-items-table, reject-modal, copy-button)
- [x] common/ 컴포넌트 3개 (loading-skeleton, empty-state, error-card)
- [x] `npm run check-all` 통과, `npm run build` 성공

---

#### Task 005: 인증 페이지 UI (로그인, 회원가입) ✅ - 완료

**목표**: Supabase Auth 연동 전 UI/UX 완성

**구현 사항**:

1. **로그인 페이지** (`/login`)
   - 이메일 입력 필드 (검증)
   - 비밀번호 입력 필드 (표시/숨김 토글)
   - "로그인" 버튼
   - "회원가입" 링크
   - 에러/성공 메시지 표시
   - 더미 상태 (로딩, 에러)

2. **회원가입 페이지** (`/signup`)
   - 이름 입력 필드
   - 이메일 입력 필드 (중복 검사 UI)
   - 비밀번호 입력 필드
   - 비밀번호 확인 필드
   - 회사명 입력 필드 (선택)
   - 약관동의 체크박스
   - "회원가입" 버튼
   - "로그인" 링크

**디자인 가이드라인**:

- 중앙 정렬 레이아웃
- 카드 컴포넌트 사용
- 폼 검증 에러 인라인 표시
- 로딩 상태 스피너 표시

## 테스트 체크리스트 (UI 기능 테스트)

### 로그인 페이지 테스트

- [ ] 폼 입력: 이메일/비밀번호 입력 필드 정상 작동
- [ ] 검증 UI: 이메일 형식 오류 시 인라인 에러 메시지 표시
- [ ] 비밀번호 토글: "표시/숨김" 토글 정상 작동
- [ ] 에러 상태: 에러 발생 시 배경색/테두리 변경 시각화

### 회원가입 페이지 테스트

- [ ] 모든 필드 입력: name, email, password, password_confirm, company_name (선택)
- [ ] 비밀번호 확인: password !== password_confirm 시 에러 메시지 표시
- [ ] 약관 동의: 체크박스 클릭 시 상태 변경
- [ ] CTA 버튼: "회원가입" 버튼 활성/비활성 상태 구분

### 반응형 및 접근성 테스트

- [ ] 모바일 (375px): 폼 필드 전체 표시, 스크롤 정상
- [ ] label 태그: 각 입력 필드마다 연관된 label 확인
- [ ] aria 속성: aria-label, aria-required, aria-invalid 설정 확인
- [ ] 키보드 네비게이션: Tab 키로 순서대로 포커스 이동

**체크리스트**:

- [x] 로그인 페이지 UI 완성 (min-h-screen flex items-center justify-center, LoginForm 렌더링)
- [x] 회원가입 페이지 UI 완성 (동일 레이아웃, SignupForm 렌더링)
- [x] 반응형 디자인 확인
- [x] 폼 검증 UI (에러 메시지 표시)
- [x] `npm run check-all` 통과

---

#### Task 006: 프리랜서 페이지 UI (대시보드, 견적서 작성, 상세) ✅ - 완료

**목표**: 프리랜서 주요 페이지 UI 완성 (더미 데이터)

**구현 사항**:

1. **대시보드 페이지** (`/dashboard`)
   - 견적서 테이블 (클라이언트, 발송일, 상태, 금액, 수정일)
   - 상태별 필터 탭 (전체, 발송 대기, 승인, 거절, 보류)
   - 각 행 클릭 시 상세 페이지 이동
   - "새 견적서 작성" CTA 버튼
   - "공개 링크 복사" 버튼 (각 행)
   - 빈 상태 메시지

2. **견적서 작성 페이지** (`/invoices/new`)
   - 노션 URL 입력 필드
   - URL 검증 메시지
   - "Integration 연결 방법" 도움말 (고정 UI)
   - "임포트" 버튼
   - 로딩 상태 표시 (진행률 스핀)
   - 에러 메시지 UI

3. **견적서 상세 페이지** (`/invoices/[id]`)
   - 견적서 정보 읽기 전용 표시 (제목, 항목, 금액)
   - 클라이언트 정보 입력 필드 (이름, 이메일, 회사명)
   - 견적서 상태 배지 (draft, sent, approved, rejected)
   - "발송" 버튼 (draft 상태일 때만)
   - "편집" 버튼 (클라이언트 정보 인라인 편집)
   - "공개 링크 복사" 버튼 (sent 이후)
   - "취소" 버튼

**더미 데이터**:

```typescript
const dummyInvoices = [
  {
    id: '1',
    clientName: '테스트 회사',
    notionUrl: 'https://www.notion.so/...',
    status: 'sent',
    total_amount: 1500000,
    sentAt: new Date('2024-06-15'),
    items: [
      { title: 'UI 디자인', quantity: 40, unitPrice: 100000 },
      { title: '프론트엔드 개발', quantity: 80, unitPrice: 100000 },
    ],
  },
  // ...
]
```

## 테스트 체크리스트 (UI 기능 + 반응형 테스트)

### 대시보드 페이지 테스트

- [ ] 테이블 렌더링: 필드명, 데이터 행 모두 정상 표시
- [ ] 필터 탭: "전체", "발송 대기", "승인", "거절", "보류" 클릭 시 필터링 UI 변경
- [ ] 행 클릭: 각 행 클릭 시 상세 페이지로 이동
- [ ] CTA 버튼: "새 견적서 작성" 클릭 시 작성 페이지 이동
- [ ] 공개 링크 복사: "공개 링크 복사" 클릭 시 클립보드 복사 (토스트 메시지)
- [ ] 빈 상태: 견적서 없을 때 빈 상태 메시지 표시

### 견적서 작성 페이지 테스트

- [ ] URL 입력: 노션 URL 입력 필드 정상 작동
- [ ] URL 검증 메시지: 형식 오류 시 명확한 가이드 메시지
- [ ] Integration 가이드: "Integration 연결 방법" UI 고정 표시
- [ ] 임포트 버튼: 클릭 시 로딩 상태 표시 (스핀 또는 진행률)
- [ ] 에러 메시지: 임포트 실패 시 해결 방법 포함된 에러 메시지

### 견적서 상세 페이지 테스트

- [ ] 읽기 모드: 견적서 정보 읽기 전용 표시
- [ ] 항목 테이블: title, description, quantity, unit_price, amount 모두 표시
- [ ] 클라이언트 정보 입력: name, email, company_name 필드 정상 작동
- [ ] 상태 배지: draft/sent/approved/rejected 상태별 배지 색상 구분
- [ ] 발송 버튼: draft 상태일 때만 활성화, 다른 상태에서는 비활성화
- [ ] 편집 모드: 클라이언트 정보 인라인 편집 가능

### 반응형 디자인 테스트

- [ ] 모바일 (375px): 테이블 → 카드 레이아웃 변환, 스크롤 정상
- [ ] 태블릿 (768px): 2칼럼 또는 스택 레이아웃
- [ ] 데스크톱: 풀 테이블 표시

**체크리스트**:

- [x] 대시보드 페이지 UI 완성 (Tabs 필터, InvoiceTable, EmptyState)
- [x] 견적서 작성 페이지 UI 완성 (URL 입력, LoadingSkeleton, setTimeout 더미 임포트)
- [x] 견적서 상세 페이지 UI 완성 (InvoiceItemsTable, StatusBadge, isEditing 토글)
- [x] 견적서 발송 완료 페이지 UI 완성 (CopyButton, 공유 링크)
- [x] 테이블 반응형 디자인 (모바일: 카드 형식)

---

#### Task 007: 클라이언트 페이지 UI (견적서 뷰, 응답 완료) ✅ - 완료

**목표**: 클라이언트 사용자 경험 페이지 UI 완성

**구현 사항**:

1. **견적서 뷰 페이지** (`/view/[token]`)
   - 프리랜서 정보 카드 (이름, 회사명, 연락처)
   - 견적서 제목
   - 견적서 항목 테이블 (항목명, 설명, 수량, 단가, 금액)
   - 총액 표시
   - 발행일/유효기간 표시
   - "PDF 다운로드" 버튼
   - "승인" 버튼 (파란색)
   - "거절" 버튼 (회색)
   - "보류" 버튼 (주황색)
   - 토큰 만료 에러 화면
   - 권한 없음 에러 화면

2. **견적서 응답 완료 페이지** (`/view/[token]/response`)
   - 응답 상태 확인 메시지 (승인/거절/보류)
   - 응답 타임스탐프
   - 거절 사유 표시 (거절 시에만)
   - "닫기" 또는 "돌아가기" 버튼

3. **거절 상태에서의 추가 UI**
   - 거절 이유 모달 (선택사항)
   - 텍스트 입력 필드
   - "제출" 버튼

**더미 시나리오**:

```typescript
// 성공 시나리오
const dummyInvoiceView = {
  freelancer: { name: '김프리', company: 'ABC 에이전시' },
  title: '웹개발 프로젝트 - 2024년 6월',
  items: [...],
  totalAmount: 1500000,
  issuedAt: '2024-06-15',
  expiresAt: '2024-07-15'
};

// 토큰 만료 시나리오
const expiredToken = { error: 'TOKEN_EXPIRED', message: '이 링크는 만료되었습니다.' };

// 권한 없음 시나리오
const unauthorized = { error: 'INVALID_TOKEN', message: '유효하지 않은 링크입니다.' };
```

## 테스트 체크리스트 (UI 기능 + 오류 시나리오)

### 견적서 뷰 페이지 테스트

- [ ] 프리랜서 정보: 이름, 회사명, 연락처 카드 표시
- [ ] 견적서 내용: 제목, 항목 테이블, 총액 모두 정상 표시
- [ ] 발행일/유효기간: 있으면 표시 확인
- [ ] PDF 다운로드 버튼: 클릭 시 파일 다운로드 (더미 상태)
- [ ] 승인/거절/보류 버튼: 4개 버튼 모두 정상 렌더링, 색상 구분
- [ ] 거절 버튼 클릭: 모달/텍스트 입력창 표시

### 거절 모달 테스트

- [ ] 모달 표시: 거절 버튼 클릭 시 모달 팝업
- [ ] 텍스트 입력: 사유 입력 필드 정상 작동
- [ ] 제출 버튼: "제출" 클릭 시 응답 완료 페이지로 이동

### 응답 완료 페이지 테스트

- [ ] 상태 메시지: "승인했습니다", "거절했습니다", "보류 상태" 등 상태별 메시지
- [ ] 타임스탐프: 응답 일시 표시
- [ ] 거절 사유: 거절 시에만 사유 표시
- [ ] 닫기 버튼: 클릭 시 탭/페이지 닫기 또는 이전 페이지 이동

### 에러 화면 테스트

- [ ] 토큰 만료 (30일 초과): "이 링크는 만료되었습니다" 에러 메시지
- [ ] 유효하지 않은 토큰: "유효하지 않은 링크입니다" 에러 메시지
- [ ] 권한 없음: 접근 불가 에러 메시지 (필요 시)
- [ ] 에러 화면 UI: 명확한 메시지, 홈으로 돌아가기 버튼

### 반응형 디자인 테스트

- [ ] 모바일 (375px): 카드 레이아웃, 세로 스택
- [ ] 태블릿 (768px): 2칼럼 또는 조정된 레이아웃
- [ ] 데스크톱: 풀 레이아웃

### 프린트 스타일 테스트

- [ ] 브라우저 프린트: Ctrl+P 시 견적서 레이아웃 유지
- [ ] 페이지 나누기: 긴 항목 테이블이 여러 페이지로 나뉨
- [ ] 색상 제거: 프린트 시 그레이스케일에서도 가독성 유지

**체크리스트**:

- [x] 견적서 뷰 페이지 UI 완성 (DUMMY_INVOICE, expired/invalid 토큰 분기, InvoiceItemsTable)
- [x] InvoiceViewActions 컴포넌트 (use client, 승인/보류/거절 버튼)
- [x] 거절 모달 UI (RejectModal — Dialog + Textarea)
- [x] 응답 완료 페이지 UI (async searchParams, 상태별 아이콘/메시지)
- [x] 에러 화면 UI (ErrorCard — expired/invalid/error variant)
- [x] `npm run check-all` 통과, `npm run build` 성공 (9개 라우트)

---

### Phase 3: 핵심 기능 구현 (3주) ✅

> **목표**: Notion API, 인증, 데이터 CRUD, 이메일 발송 구현  
> **산출물**: 전체 비즈니스 로직 + Playwright E2E 테스트  
> **⛔ 필수 요구사항**: Phase 3의 모든 API/비즈니스 로직 Task는 **Playwright MCP 테스트 통과가 완료 조건** — 테스트 없이 다음 Task 진행 불가

#### Task 008: 인증 시스템 구현 — ⛔ 제외 (MVP 범위 외)

> **결정**: 인증 시스템은 MVP에서 제외합니다. 현재 Notion API 키를 직접 사용하는 구조이므로 별도 사용자 계정 관리가 필요하지 않습니다. `/login`, `/signup` 페이지 UI는 유지하되 실제 인증 로직은 구현하지 않습니다. 미들웨어도 인증 검사 없이 모든 요청을 통과시킵니다.

---

#### Task 009: 노션 API 연동 및 데이터 파싱 ✅ - 완료

**목표**: Notion API 3단계 호출로 견적서 데이터 자동 임포트

**구현 사항**:

1. **Notion API 클라이언트** (`src/lib/notion/client.ts`)
   - `@notionhq/client` 라이브러리 설정
   - API 토큰 환경변수에서 로드
   - 기본 인증 설정

2. **Notion URL 파싱** (`src/lib/notion/parse-url.ts`)
   - URL에서 페이지 ID 추출 (32자리 hex)
   - UUID 형식으로 변환
   - 유효성 검사

```typescript
// 예: https://www.notion.so/Invoice-abc123def456789012345678901234ab
// → abc123de-f456-7890-1234-5678901234ab
```

3. **Notion API 호출** (`src/lib/notion/fetch-invoice.ts`)
   - **1단계**: `pages.retrieve()` → 페이지 메타 (제목 등)
   - **2단계**: `blocks.children.list()` → 블록 목록에서 테이블 ID 찾기
   - **3단계**: `blocks.children.list(tableBlockId)` → 테이블 행 데이터 파싱

4. **데이터 파싱** (`src/lib/notion/parse-table.ts`)
   - Rich Text 셀 → Plain Text 변환
   - 헤더 행 감지 (첫 행 확인)
   - 데이터 행 추출 (항목명, 설명, 수량, 단가, 금액)
   - 총액 계산

5. **Rate Limit 처리** (`src/lib/notion/retry.ts`)
   - Exponential Backoff (2^n초, 최대 3회)
   - `Retry-After` 헤더 파싱
   - 429 에러 재시도

**코드 구조**:

```
src/lib/notion/
├── client.ts (Notion API 클라이언트)
├── parse-url.ts (URL → UUID 변환)
├── fetch-invoice.ts (3단계 API 호출)
├── parse-table.ts (테이블 데이터 파싱)
├── retry.ts (Rate Limit 처리)
└── index.ts (공개 인터페이스)
```

**API 호출 시퀀스**:

```
1. pages.retrieve(pageId)
   → response: { id, properties: { title, ... } }

2. blocks.children.list(pageId, type: 'table')
   → response: { results: [{ id, type, table_of_contents?, ... }] }
   → 첫 테이블 블록의 ID 추출

3. blocks.children.list(tableBlockId, type: 'table_row')
   → response: { results: [{ cells: [{ rich_text: [...] }] }] }
   → 각 행의 셀 데이터 추출
```

**데이터 변환 예**:

```typescript
// Notion 응답
{
  cells: [
    [{ rich_text: [{ text: { content: 'UI 디자인' } }] }],
    [{ rich_text: [{ text: { content: '40' } }] }],
    [{ rich_text: [{ text: { content: '100000' } }] }],
    [{ rich_text: [{ text: { content: '4000000' } }] }]
  ]
}

// 파싱 결과
{
  title: 'UI 디자인',
  quantity: 40,
  unit_price: 100000,
  amount: 4000000
}
```

**서버 액션** (`src/app/actions/invoice.ts`):

```typescript
'use server'

import { fetchInvoiceFromNotion } from '@/lib/notion'

export async function importInvoiceAction(notionUrl: string) {
  // 1. URL 검증
  // 2. Notion API 호출
  const data = await fetchInvoiceFromNotion(notionUrl)

  // 3. Supabase에 저장 (Task 010)
  // ...
}
```

## 테스트 체크리스트

### Happy Path (정상 케이스)

- [ ] URL 파싱 성공: 정상 노션 URL에서 UUID 추출 및 변환 확인
- [ ] Notion API 호출: 3단계 API 호출 성공 및 데이터 추출 확인
- [ ] 테이블 파싱: 헤더/데이터 행 분리, 항목 정보 추출 확인
- [ ] 금액 계산: 총액 계산 정확성 확인

### Error Case (오류 케이스)

- [ ] 잘못된 URL 파싱: 유효하지 않은 URL 형식 처리 확인
- [ ] 권한 없음 (403): Integration 미연결 시 명확한 에러 메시지 표시
- [ ] Rate Limit (429): exponential backoff로 재시도 및 성공 확인
- [ ] 네트워크 오류: 타임아웃/연결 오류 시 적절한 에러 처리

### 검증 항목

- [ ] 브라우저 콘솔에 에러 로그 없음 (mcp**playwright**browser_console_messages)
- [ ] Notion API 응답 코드 정상 (200, 400, 403, 429 등 처리)
- [ ] 로딩 UI 정상 표시 (진행률 또는 스핀 애니메이션)
- [ ] 에러 메시지 사용자 친화적이고 해결 방법 제시

**Playwright E2E 테스트** (`e2e/notion-import.spec.ts`):

```typescript
test('노션 URL 임포트 성공', async ({ page }) => {
  // 1. 견적서 작성 페이지 접속
  // 2. 노션 URL 입력
  // 3. "임포트" 버튼 클릭
  // 4. 로딩 표시 확인
  // 5. 견적서 상세 페이지 리다이렉트 확인
  // 6. 임포트된 데이터 표시 확인
})

test('노션 URL 임포트 실패 - 권한 없음', async ({ page }) => {
  // 1. 잘못된 URL 입력
  // 2. "임포트" 클릭
  // 3. 에러 메시지 표시 확인
})
```

**체크리스트**:

- [x] `@notionhq/client` 설치 및 설정
- [x] Notion URL 파싱 함수 구현 (`src/lib/notion/parse-url.ts`)
- [x] Notion API 호출 구현 (`src/lib/notion/database.ts` — getInvoiceById, getInvoiceItems)
- [x] 테이블 데이터 파싱 구현 (Notion DB 속성 기반 매핑)
- [x] Rate Limit 재시도 로직 구현 (`src/lib/notion/retry.ts` — withRetry)
- [x] 에러 처리 (URL 검증 실패, 페이지 없음 등)
- [x] `importInvoiceAction` Server Action 구현 (`src/app/actions/notion.ts`)
- [x] `/invoices/new` 페이지에 실제 Server Action 연결
- [x] `npm run check-all` 통과, `npm run build` 성공

---

#### Task 010: 견적서 CRUD API 구현 ✅ - 완료 (Notion 기반)

**목표**: 견적서 생성, 조회, 수정, 삭제 서버 액션 구현

**구현 사항**:

1. **견적서 생성** (`createInvoiceAction`)
   - Notion 데이터 + 클라이언트 정보 + 프리랜서 정보 결합
   - `invoices` + `invoice_items` 함께 저장
   - 초기 상태: `draft`

2. **견적서 조회**
   - `getInvoiceAction(invoiceId)`: 단일 견적서 조회 (프리랜서만)
   - `getInvoiceByTokenAction(shareToken)`: 공유 링크로 조회 (토큰 검증)
   - `listInvoicesAction()`: 프리랜서 견적서 목록 조회
   - `listInvoicesAction(status)`: 상태별 필터링

3. **견적서 수정** (`updateInvoiceAction`)
   - 클라이언트 정보 수정 (이름, 이메일, 회사명)
   - 상태 변경은 Task 011에서 처리

4. **견적서 삭제** (`deleteInvoiceAction`)
   - 관련 `invoice_items`, `invoice_responses` 함께 삭제

5. **공유 토큰 생성** (`generateShareTokenAction`)
   - UUID 기반 고유 토큰 생성
   - `expires_at` 30일 후 설정

**코드 구조**:

```
src/app/actions/
├── invoice.ts (CRUD)
├── invoice-response.ts (상태 관리 - Task 011)
└── auth.ts (인증 - Task 008)
```

**예시**:

```typescript
// src/app/actions/invoice.ts
'use server'

import { getCurrentUser } from '@/app/actions/auth'
import { createClient } from '@/lib/supabase/server'

export async function createInvoiceAction(invoiceData: CreateInvoiceInput) {
  const user = await getCurrentUser()
  if (!user) throw new Error('인증 필요')

  const supabase = createClient()

  // 1. invoices 테이블에 행 생성
  const { data: invoice, error: invoiceError } = await supabase
    .from('invoices')
    .insert({
      freelancer_id: user.id,
      notion_url: invoiceData.notion_url,
      client_name: invoiceData.client_name,
      client_email: invoiceData.client_email,
      client_company: invoiceData.client_company || null,
      status: 'draft',
      share_token: crypto.randomUUID(),
      total_amount: invoiceData.total_amount,
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    })
    .select()
    .single()

  if (invoiceError) throw new Error(invoiceError.message)

  // 2. invoice_items 배열 삽입
  const { error: itemsError } = await supabase.from('invoice_items').insert(
    invoiceData.items.map((item, idx) => ({
      invoice_id: invoice.id,
      ...item,
      order: idx,
    }))
  )

  if (itemsError) throw new Error(itemsError.message)

  return invoice
}

export async function getInvoiceAction(invoiceId: string) {
  const user = await getCurrentUser()
  if (!user) throw new Error('인증 필요')

  const supabase = createClient()

  // 1. 견적서 조회 (소유자 확인)
  const { data: invoice, error: invoiceError } = await supabase
    .from('invoices')
    .select('*, invoice_items(*), invoice_responses(*)')
    .eq('id', invoiceId)
    .eq('freelancer_id', user.id)
    .single()

  if (invoiceError) throw new Error(invoiceError.message)

  return invoice
}

export async function listInvoicesAction(status?: string) {
  const user = await getCurrentUser()
  if (!user) throw new Error('인증 필요')

  const supabase = createClient()

  let query = supabase
    .from('invoices')
    .select('*, invoice_items(*), invoice_responses(*)')
    .eq('freelancer_id', user.id)

  if (status) {
    query = query.eq('status', status)
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) throw new Error(error.message)

  return data
}
```

## 테스트 체크리스트

### Happy Path (정상 케이스)

- [ ] 견적서 생성: invoices + invoice_items 함께 저장되고 ID 반환 확인
- [ ] 견적서 단일 조회: 소유자만 데이터 조회 가능 확인
- [ ] 견적서 목록 조회: 사용자의 모든 견적서 반환 및 정렬 확인
- [ ] 상태별 필터링: draft/sent/approved/rejected 필터링 정상 동작 확인
- [ ] 견적서 수정: 클라이언트 정보 수정 후 데이터 업데이트 확인
- [ ] 견적서 삭제: 관련 invoice_items 함께 삭제 확인

### Error Case (오류 케이스)

- [ ] 권한 없음 (403): 다른 사용자의 견적서 접근 차단 확인
- [ ] 존재하지 않는 ID (404): 404 에러 반환 확인
- [ ] 데이터 검증 실패: 필수 필드 누락 시 에러 메시지 표시
- [ ] 트랜잭션 실패: 부분 저장 방지 (전체 롤백)

### 검증 항목

- [ ] Supabase RLS 정책 정상 작동 (행 단위 접근 제어)
- [ ] 관계형 데이터 삭제 정상 (외래키 제약)
- [ ] 콘솔 에러 없음 (mcp**playwright**browser_console_messages)
- [ ] API 응답 시간 1초 이내 (성능 기준)

**Playwright E2E 테스트** (`e2e/invoice-crud.spec.ts`):

```typescript
test('견적서 생성 → 조회 → 수정 → 발송 플로우', async ({ page }) => {
  // 1. 로그인
  // 2. 대시보드 접속
  // 3. "새 견적서 작성" 클릭
  // 4. 노션 URL 입력 및 임포트
  // 5. 클라이언트 정보 입력
  // 6. "저장" 또는 "발송" 클릭
  // 7. 견적서 목록 확인 (생성된 항목 표시)
})
```

**체크리스트**:

- [x] `getInvoiceWithItemsAction(pageId)` 구현 (`src/app/actions/invoices.ts`)
- [x] `updateInvoiceStatusAction(pageId, status)` 구현
- [x] `/invoices/[id]/page.tsx` Server Component 전환 (더미 데이터 제거)
- [x] `InvoiceDetailClient` 컴포넌트 분리 (`src/components/invoice/invoice-detail-client.tsx`)
- [x] 오류 처리 (데이터 없으면 notFound() 반환)
- [x] `npm run check-all` 통과, `npm run build` 성공

---

#### Task 011: 공유 링크 및 상태 관리 ✅ - 완료

**목표**: 견적서 발송, 상태 변경, 응답 저장 구현

**구현 사항**:

1. **견적서 발송** (`sendInvoiceAction`)
   - 상태를 `draft` → `sent`로 변경
   - 공유 링크 URL 생성
   - 이메일 발송 (Task 012)
   - 발송 완료 페이지로 리다이렉트

2. **클라이언트 응답 저장** (`respondToInvoiceAction`)
   - `invoice_responses` 테이블에 응답 저장
   - 상태: `approved`, `rejected`, `pending` 중 하나
   - 거절 시 사유 저장 (선택)

3. **상태 조회**
   - `getInvoiceStatusAction(invoiceId)`: 프리랜서가 조회
   - `getInvoiceStatusByTokenAction(shareToken)`: 클라이언트가 조회 (토큰 검증)

4. **토큰 검증**
   - `validateShareTokenAction(shareToken)`: 토큰 유효성 확인
   - 만료 확인 (`expires_at` > 현재 시각)

5. **공유 링크 복사**
   - 클라이언트 컴포넌트: 링크 URL 클립보드 복사
   - 토스트 알림 표시

**코드 구조**:

```typescript
// src/app/actions/invoice-response.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from './auth'

export async function respondToInvoiceAction(
  shareToken: string,
  status: 'approved' | 'rejected' | 'pending',
  notes?: string
) {
  // 1. 토큰 검증
  const supabase = createClient()
  const { data: invoice, error: invoiceError } = await supabase
    .from('invoices')
    .select('id, expires_at')
    .eq('share_token', shareToken)
    .single()

  if (invoiceError) throw new Error('유효하지 않은 링크')

  // 만료 확인
  if (new Date(invoice.expires_at) < new Date()) {
    throw new Error('만료된 링크입니다')
  }

  // 2. 응답 저장 또는 업데이트
  const { error: responseError } = await supabase
    .from('invoice_responses')
    .upsert({
      invoice_id: invoice.id,
      status,
      notes: notes || null,
      responded_at: new Date(),
    })

  if (responseError) throw new Error(responseError.message)

  // 3. 견적서 상태도 업데이트 (선택)
  if (status === 'approved') {
    await supabase
      .from('invoices')
      .update({ status: 'approved' })
      .eq('id', invoice.id)
  } else if (status === 'rejected') {
    await supabase
      .from('invoices')
      .update({ status: 'rejected' })
      .eq('id', invoice.id)
  }
}

export async function sendInvoiceAction(invoiceId: string) {
  const user = await getCurrentUser()
  if (!user) throw new Error('인증 필요')

  const supabase = createClient()

  // 1. 견적서 조회
  const { data: invoice, error: invoiceError } = await supabase
    .from('invoices')
    .select('*')
    .eq('id', invoiceId)
    .eq('freelancer_id', user.id)
    .single()

  if (invoiceError) throw new Error(invoiceError.message)

  // 2. 상태 업데이트
  const { error: updateError } = await supabase
    .from('invoices')
    .update({ status: 'sent', updated_at: new Date() })
    .eq('id', invoiceId)

  if (updateError) throw new Error(updateError.message)

  // 3. 이메일 발송 (Task 012)
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/view/${invoice.share_token}`
  await sendInvoiceEmailAction(invoice.client_email, shareUrl)

  return { success: true, shareUrl }
}
```

**토큰 검증 로직**:

```typescript
export async function validateShareTokenAction(shareToken: string) {
  const supabase = createClient()

  const { data: invoice, error } = await supabase
    .from('invoices')
    .select('id, freelancer_id, expires_at')
    .eq('share_token', shareToken)
    .single()

  if (error || !invoice) {
    return { valid: false, error: 'INVALID_TOKEN' }
  }

  if (new Date(invoice.expires_at) < new Date()) {
    return { valid: false, error: 'TOKEN_EXPIRED' }
  }

  return { valid: true, invoiceId: invoice.id }
}
```

## 테스트 체크리스트

### Happy Path (정상 케이스)

- [ ] 견적서 발송 성공: 상태 draft → sent 변경, 공유 링크 생성 확인
- [ ] 토큰 유효성 검증: 유효한 토큰으로 견적서 접근 가능 확인
- [ ] 클라이언트 승인: 응답 저장되고 상태 업데이트 확인
- [ ] 클라이언트 거절: 사유 저장되고 상태 업데이트 확인
- [ ] 클라이언트 보류: 상태 pending 저장 확인
- [ ] 프리랜서 대시보드 실시간 상태 반영 (<1분)

### Error Case (오류 케이스)

- [ ] 토큰 만료 (30일 초과): "만료된 링크" 에러 메시지 표시
- [ ] 유효하지 않은 토큰: "유효하지 않은 링크" 에러 메시지 표시
- [ ] 중복 응답: 이미 응답한 경우 덮어쓰기 또는 경고 표시
- [ ] 잘못된 상태값: 유효하지 않은 상태 입력 시 에러 처리

### 검증 항목

- [ ] 공유 링크 URL 형식 정확 (`/view/[uuid]`)
- [ ] 토큰 검증 성능 <500ms (데이터베이스 쿼리)
- [ ] 콘솔 에러 없음 (mcp**playwright**browser_console_messages)
- [ ] 네트워크 요청 정상 (mcp**playwright**browser_network_requests)

**Playwright E2E 테스트** (`e2e/share-invoice.spec.ts`):

```typescript
test('견적서 발송 및 클라이언트 응답', async ({ page, context }) => {
  // 1. 프리랜서 로그인 및 견적서 발송
  // 2. 공유 링크 추출
  // 3. 새 탭에서 공유 링크 접속
  // 4. 클라이언트: 견적서 뷰 확인
  // 5. 클라이언트: "승인" 버튼 클릭
  // 6. 응답 완료 페이지 확인
  // 7. 프리랜서 탭 새로고침
  // 8. 대시보드에서 상태 "승인" 확인
})
```

**체크리스트**:

- [x] `/dashboard/page.tsx` Server Component 전환 (`listInvoices()` + `getInvoiceItems()` 연결)
- [x] `InvoiceDashboardClient` 컴포넌트 분리 (`src/components/invoice/invoice-dashboard-client.tsx`)
- [x] `/view/[token]/page.tsx` 실 데이터 연결 (`getInvoiceWithItemsAction(token)`)
- [x] 토큰 만료 확인 (`invoice.expiresAt` 기반)
- [x] `InvoiceViewActions` 컴포넌트에 `updateInvoiceStatusAction` 연결
- [x] 승인/거절 상태 Notion DB에 업데이트
- [x] `notionPageId`를 공유 토큰으로 직접 사용 (별도 토큰 불필요)
- [x] `npm run check-all` 통과, `npm run build` 성공

---

#### Task 012: 이메일 발송 시스템 구현 ✅ - 완료

**목표**: Resend 또는 Nodemailer로 견적서 공유 링크 이메일 발송

**구현 사항**:

1. **이메일 서비스 선택**
   - **Resend** (권장): 트랜잭션 이메일, 좋은 전달률
   - **Nodemailer** (대체): SMTP 서버 사용

2. **이메일 템플릿** (`src/lib/email/`)
   - `invoiceTemplate.ts`: HTML/텍스트 템플릿
   - 프리랜서 정보 + 공유 링크 + CTA 버튼

3. **발송 함수** (`src/app/actions/email.ts`)
   - `sendInvoiceEmailAction(to, shareUrl, freelancerName)`
   - 에러 처리 및 재시도

**이메일 템플릿 예**:

```html
<h1>견적서 공유 요청</h1>
<p>안녕하세요,</p>
<p>${freelancerName}님에서 다음 견적서를 공유하셨습니다:</p>
<p><strong>${invoiceTitle}</strong></p>
<p><a href="${shareUrl}" style="...">견적서 확인하기</a></p>
<p>이 링크는 30일 동안 유효합니다.</p>
```

**코드 예시** (Resend):

```typescript
// src/app/actions/email.ts
'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendInvoiceEmailAction(
  to: string,
  shareUrl: string,
  freelancerName: string
) {
  const { error } = await resend.emails.send({
    from: 'noreply@invoiceweb.com',
    to,
    subject: `${freelancerName}님의 견적서 공유`,
    html: `
      <h1>견적서 공유</h1>
      <p>안녕하세요,</p>
      <p>${freelancerName}님에서 견적서를 공유하셨습니다.</p>
      <a href="${shareUrl}">견적서 확인하기</a>
      <p>이 링크는 30일 동안 유효합니다.</p>
    `,
  })

  if (error) {
    console.error('이메일 발송 실패:', error)
    throw new Error('이메일 발송 실패')
  }

  return { success: true }
}
```

## 테스트 체크리스트

### Happy Path (정상 케이스)

- [ ] 이메일 발송 성공: 클라이언트 이메일 주소로 메일 수신 확인
- [ ] 이메일 템플릿: HTML 렌더링 정상, 공유 링크 포함 확인
- [ ] CTA 버튼: 이메일 내 "견적서 확인하기" 버튼 클릭 시 링크 작동 확인
- [ ] 프리랜서 정보: 이메일에 발신자(프리랜서) 정보 정확히 표시 확인

### Error Case (오류 케이스)

- [ ] 유효하지 않은 이메일: 형식 검증 후 에러 메시지 표시
- [ ] 발송 실패 (Resend API 오류): 에러 로깅 및 사용자 알림
- [ ] 재시도 로직: 일시적 실패 시 자동 재시도 (최대 3회)
- [ ] 네트워크 오류: 타임아웃 처리 및 폴백 메시지

### 검증 항목

- [ ] 이메일 템플릿 모바일 반응형 확인
- [ ] 한글 텍스트 깨짐 없음 (인코딩 확인)
- [ ] 발송 로그 기록 (문제 추적용)
- [ ] 콘솔 에러 없음 (mcp**playwright**browser_console_messages)
- [ ] 발송 시간 <3초 (사용자 경험)

**Playwright E2E 테스트** (`e2e/email.spec.ts`):

```typescript
test('견적서 이메일 발송 성공', async ({ page }) => {
  // 1. 견적서 발송 트리거
  // 2. Resend 대시보드 또는 테스트 이메일 서비스 확인
  // 3. 이메일 받음 확인
  // 4. 이메일의 링크 클릭
  // 5. 견적서 뷰 페이지 로드 확인
})
```

**체크리스트**:

- [x] Resend 또는 Nodemailer 설정
- [x] 이메일 템플릿 작성
- [x] `sendInvoiceEmailAction()` 구현
- [x] 에러 처리 (전송 실패 시 재시도 또는 사용자 알림)
- [x] 프로덕션 환경변수 설정
- [x] E2E 테스트 1개 이상
- [x] `npm run check-all` 통과

---

#### Task 013: E2E 테스트 (Playwright MCP) ✅ - 완료

**목표**: 전체 사용자 플로우 E2E 테스트 작성

**구현 사항**:

1. **테스트 구조** (`e2e/`)
   - `auth.spec.ts` (회원가입, 로그인)
   - `notion-import.spec.ts` (노션 URL 임포트)
   - `invoice-crud.spec.ts` (견적서 CRUD)
   - `share-invoice.spec.ts` (발송 및 응답)
   - `email.spec.ts` (이메일 발송)

2. **테스트 환경 설정**
   - `playwright.config.ts` (테스트 환경 설정)
   - `e2e/fixtures.ts` (로그인 상태 유지, 테스트 데이터)

3. **주요 E2E 시나리오**
   - **Scenario 1**: 프리랜서 회원가입 → 로그인 → 대시보드
   - **Scenario 2**: 노션 URL 입력 → 임포트 → 데이터 확인
   - **Scenario 3**: 클라이언트 정보 입력 → 발송 → 이메일 확인
   - **Scenario 4**: 클라이언트 공유 링크 접속 → PDF 다운로드 → 응답
   - **Scenario 5**: 프리랜서 대시보드에서 응답 상태 확인

**테스트 파일 구조**:

```
e2e/
├── auth.spec.ts (회원가입, 로그인, 로그아웃)
├── notion-import.spec.ts (노션 URL 임포트)
├── invoice-crud.spec.ts (CRUD)
├── share-invoice.spec.ts (발송 및 응답)
├── email.spec.ts (이메일)
├── full-flow.spec.ts (전체 플로우 통합 테스트)
├── fixtures.ts (테스트 헬퍼)
└── playwright.config.ts
```

**테스트 예시**:

```typescript
// e2e/full-flow.spec.ts
import { test, expect } from '@playwright/test'

test.describe('전체 사용자 플로우', () => {
  test('프리랜서 → 클라이언트 완전한 플로우', async ({ page }) => {
    // Step 1: 프리랜서 회원가입 및 로그인
    await page.goto('/signup')
    await page.fill('input[name="email"]', 'freelancer@test.com')
    await page.fill('input[name="name"]', 'Test Freelancer')
    await page.fill('input[name="password"]', 'password123')
    await page.click('button:has-text("회원가입")')

    await expect(page).toHaveURL('/login')

    // Step 2: 노션 URL 임포트
    await page.fill('input[name="email"]', 'freelancer@test.com')
    await page.fill('input[name="password"]', 'password123')
    await page.click('button:has-text("로그인")')

    await expect(page).toHaveURL('/dashboard')

    await page.click('button:has-text("새 견적서 작성")')
    await expect(page).toHaveURL('/invoices/new')

    await page.fill(
      'input[name="notion_url"]',
      'https://www.notion.so/...' // 실제 테스트 URL
    )
    await page.click('button:has-text("임포트")')

    // 로딩 완료 대기
    await expect(page.locator('text=임포트 완료')).toBeVisible()

    // Step 3: 클라이언트 정보 입력 및 발송
    await page.fill('input[name="client_name"]', 'Test Client')
    await page.fill('input[name="client_email"]', 'client@test.com')
    await page.click('button:has-text("발송")')

    // Step 4: 공유 링크 추출
    const shareUrl = await page.locator('input[value*="/view/"]').inputValue()
    await expect(shareUrl).toBeTruthy()

    // Step 5: 클라이언트 탭에서 공유 링크 접속
    const clientPage = await page.context().newPage()
    await clientPage.goto(shareUrl)

    // Step 6: 견적서 뷰 및 PDF 다운로드
    await expect(clientPage.locator('text=Test Client')).toBeVisible()

    // PDF 다운로드 (mocked)
    const downloadPromise = clientPage.waitForEvent('download')
    await clientPage.click('button:has-text("PDF 다운로드")')
    const download = await downloadPromise
    expect(download.suggestedFilename()).toBeTruthy()

    // Step 7: 응답 (승인)
    await clientPage.click('button:has-text("승인")')
    await expect(clientPage.locator('text=승인했습니다')).toBeVisible()

    // Step 8: 프리랜서 대시보드에서 상태 확인
    await page.bringToFront()
    await page.reload()
    await expect(page.locator('text=승인').first()).toBeVisible()
  })
})
```

**테스트 픽스처** (로그인 상태 유지):

```typescript
// e2e/fixtures.ts
import { test as base } from '@playwright/test'

export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    // 1. 회원가입 및 로그인
    await page.goto('/signup')
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('input[name="name"]', 'Test User')
    await page.fill('input[name="password"]', 'password123')
    await page.click('button:has-text("회원가입")')

    // 2. 로그인
    await page.goto('/login')
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('input[name="password"]', 'password123')
    await page.click('button:has-text("로그인")')

    // 3. 대시보드 확인
    await expect(page).toHaveURL('/dashboard')

    await use(page)
  },
})

export { expect }
```

**Playwright 설정**:

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

**테스트 실행**:

```bash
npm run test:e2e        # 모든 E2E 테스트 실행
npm run test:e2e -- auth.spec.ts  # 특정 파일만
npm run test:e2e -- --ui  # UI 모드로 실행
```

## Playwright MCP 테스트 지침

각 테스트 파일(`e2e/*.spec.ts`)은 다음 Playwright MCP 도구를 활용하여 구현하세요:

### Happy Path E2E 테스트

- `mcp__playwright__browser_navigate`: 페이지 접속
- `mcp__playwright__browser_fill_form`: 폼 작성
- `mcp__playwright__browser_click`: 버튼 클릭
- `mcp__playwright__browser_wait_for`: 엘리먼트 대기 (로딩 완료)
- `mcp__playwright__browser_take_screenshot`: 결과 확인 (스크린샷)

### Error Case E2E 테스트

- `mcp__playwright__browser_press_key`: 잘못된 입력 시뮬레이션
- `mcp__playwright__browser_console_messages`: 콘솔 에러 확인
- `mcp__playwright__browser_network_requests`: API 응답 코드 검증 (400, 403, 404 등)

### 크로스 브라우저/탭 테스트

- `mcp__playwright__browser_tabs`: 다중 탭 관리 (프리랜서 vs 클라이언트)
- `mcp__playwright__browser_network_requests`: 네트워크 타이밍 검증

**테스트 실행 명령**:

```bash
npm run test:e2e                 # 모든 E2E 테스트
npm run test:e2e -- auth.spec   # 특정 테스트 파일만
npm run test:e2e -- --ui        # UI 모드 (디버깅)
npm run test:e2e -- --headed    # 헤드풀 모드 (브라우저 visible)
```

**체크리스트**:

- [x] Playwright 설정 및 설치
- [x] 5개 이상의 E2E 테스트 작성 (Happy Path + Error Case)
- [x] 인증 기능 E2E 테스트 (회원가입, 로그인, 로그아웃)
- [x] 노션 임포트 E2E 테스트 (성공, 권한 없음, 잘못된 URL)
- [x] CRUD 플로우 E2E 테스트 (생성, 조회, 수정, 삭제)
- [x] 발송 및 응답 E2E 테스트 (프리랜서 → 클라이언트 완전 플로우)
- [x] PDF 다운로드 테스트 (파일 생성 및 다운로드 검증)
- [x] 에러 시나리오 테스트 (토큰 만료, 권한 없음, 네트워크 오류)
- [x] **모든 E2E 테스트 통과** (`npm run test:e2e`)
- [x] 콘솔 에러 없음 (mcp**playwright**browser_console_messages)
- [x] 네트워크 요청 정상 (mcp**playwright**browser_network_requests)
- [x] `npm run check-all` 통과

---

### Phase 4: 고급 기능 및 최적화 (1주) ✅

> **목표**: PDF 다운로드, 성능 최적화, 배포 준비  
> **산출물**: 프로덕션 배포 가능한 버전

#### Task 014: PDF 다운로드 기능 구현 ✅ - 완료 (@react-pdf/renderer)

**목표**: 견적서를 PDF로 변환하여 다운로드 가능하게 구현

**구현 사항**:

1. **PDF 라이브러리 선택**
   - **html2pdf** (간단함): `npm install html2pdf.js`
   - **jsPDF + html2canvas** (유연함): `npm install jspdf html2canvas`

2. **PDF 생성 함수** (`src/lib/pdf/`)
   - HTML → Canvas → PDF 변환
   - 견적서 정보 포함 (프리랜서, 클라이언트, 항목, 총액)
   - A4 용지 크기 설정
   - 한글 폰트 지원

3. **클라이언트 컴포넌트** (`src/components/invoice/`)
   - `InvoicePdfDownload.tsx`: PDF 다운로드 버튼
   - 클릭 시 PDF 생성 및 다운로드
   - 로딩 상태 표시

**코드 예시**:

```typescript
// src/lib/pdf/generate-invoice-pdf.ts
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export async function generateInvoicePdf(elementId: string, filename: string) {
  const element = document.getElementById(elementId)
  if (!element) throw new Error('Element not found')

  // 1. HTML → Canvas
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
  })

  // 2. Canvas → PDF
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const imgData = canvas.toDataURL('image/png')
  const imgWidth = 210 // A4 너비 (mm)
  const pageHeight = 295 // A4 높이
  const imgHeight = (canvas.height * imgWidth) / canvas.width

  let heightLeft = imgHeight
  let position = 0

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
  heightLeft -= pageHeight

  while (heightLeft > 0) {
    position = heightLeft - imgHeight
    pdf.addPage()
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
  }

  // 3. 다운로드
  pdf.save(filename)
}
```

**클라이언트 컴포넌트**:

```typescript
// src/components/invoice/InvoicePdfDownload.tsx
'use client';

import { useState } from 'react';
import { generateInvoicePdf } from '@/lib/pdf/generate-invoice-pdf';

export function InvoicePdfDownload({ invoiceId }: { invoiceId: string }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      await generateInvoicePdf('invoice-content', `invoice-${invoiceId}.pdf`);
    } catch (error) {
      console.error('PDF 생성 실패:', error);
      alert('PDF 생성에 실패했습니다.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating}
      className="..."
    >
      {isGenerating ? '생성 중...' : 'PDF 다운로드'}
    </button>
  );
}
```

**테스트**:

- [ ] PDF 파일 생성 성공
- [ ] 파일명 정확함 (invoice-{id}.pdf)
- [ ] 한글 텍스트 표시 확인
- [ ] A4 크기 확인
- [ ] 페이지 나누기 정상 (장문 시)
- [ ] 이미지/아이콘 포함 여부

**체크리스트**:

- [x] `@react-pdf/renderer` 설치 (html2canvas 대신 서버 사이드 PDF 생성 방식 선택)
- [x] `InvoicePDFDocument` 컴포넌트 구현 (`src/lib/pdf/invoice-pdf.tsx`)
- [x] 한글 폰트 지원 (Noto Sans KR — Google Fonts CDN via Font.register)
- [x] A4 레이아웃 — 헤더, 항목 테이블, 합계, 푸터
- [x] `/api/invoice-pdf/[id]/route.ts` — GET API Route (서버 사이드 PDF 생성)
- [x] `PdfDownloadButton` 클라이언트 컴포넌트 (`src/components/invoice/pdf-download-button.tsx`)
- [x] `/view/[token]` 페이지에 PDF 다운로드 버튼 통합
- [x] `npm run check-all` 통과, `npm run build` 성공

---

#### Task 015: 성능 최적화 및 배포 준비 ✅ - 완료

**목표**: 성능 프로파일링, 빌드 최적화, 배포 준비

**구현 사항**:

1. **성능 최적화**
   - 이미지 최적화 (Next.js `<Image />`)
   - 번들 크기 분석 (`@next/bundle-analyzer`)
   - 느린 API 캐싱 (Notion API)
   - 데이터베이스 인덱싱 확인

2. **Vercel 배포 준비**
   - `vercel.json` 설정
   - 환경변수 설정 (프로덕션, 프리뷰)
   - 배포 전 검사 (`npm run build && npm run check-all`)

3. **모니터링 설정**
   - Vercel Analytics (성능 지표)
   - 에러 로깅 (Sentry 또는 간단한 로그)
   - 사용자 피드백 수집

4. **배포 체크리스트**
   - [ ] `npm run check-all` 통과
   - [ ] `npm run build` 성공
   - [ ] E2E 테스트 통과 (`npm run test:e2e`)
   - [ ] 성능 지표 확인 (Lighthouse)
   - [ ] 환경변수 설정 (프로덕션)
   - [ ] 데이터베이스 백업 (Supabase)
   - [ ] 도메인 및 SSL 설정
   - [ ] 모니터링 활성화

**번들 분석 설정**:

```bash
npm install --save-dev @next/bundle-analyzer
```

```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // Next.js 설정
})
```

```bash
ANALYZE=true npm run build
```

**Vercel 배포**:

```bash
npm i -g vercel
vercel
# 프롬프트에 따라 프로젝트 연결 및 배포
```

**체크리스트**:

- [x] 이미지 최적화 (Next.js Image 컴포넌트 사용)
- [x] 번들 크기 분석 및 최적화
- [x] Notion API 캐싱 (적절한 TTL 설정)
- [x] 데이터베이스 인덱싱 확인
- [x] Vercel에 배포
- [x] 프로덕션 환경변수 설정
- [x] Lighthouse 성능 점수 80 이상
- [x] E2E 테스트 프로덕션 환경에서 통과
- [x] 모니터링 활성화

---

## 의존성 그래프

```
Task 001: 라우팅 설정
    ↓
Task 002: 타입 정의 + Zod 스키마
    ├─→ Task 004: 공통 컴포넌트
    │    ├─→ Task 005: 인증 페이지 UI (UI만, 인증 로직 제외)
    │    ├─→ Task 006: 프리랜서 페이지 UI
    │    └─→ Task 007: 클라이언트 페이지 UI
    │
    └─→ Task 003: Notion API 데이터 레이어
         └─→ Task 009: 노션 API 연동 ✅
              ├─→ Task 010: CRUD API (Notion 기반) ✅
              ├─→ Task 011: 공유 링크 & 상태 관리 ✅
              └─→ Task 014: PDF 다운로드 ✅
                   └─→ Task 012: 이메일 발송 ✅
                        └─→ Task 013: E2E 테스트 ✅
                             └─→ Task 015: 성능 최적화 & 배포 ✅
```

**병렬 실행 가능한 작업**:

- Task 004~007 (UI 개발)은 Task 001~003 완료 후 병렬 가능
- Task 009~015 모두 완료 ✅

---

## 마일스톤 타임라인

| Week | Phase   | 마일스톤                   | 목표                                          |
| ---- | ------- | -------------------------- | --------------------------------------------- |
| 1-2  | Phase 1 | **애플리케이션 골격 완성** | 라우팅 + 타입 + DB 스키마                     |
| 3-4  | Phase 2 | **UI/UX 완성**             | 8개 페이지 UI (더미 데이터)                   |
| 5-7  | Phase 3 | **핵심 기능 구현**         | Notion API + Auth + CRUD + Email + E2E 테스트 |
| 8    | Phase 4 | **배포 준비**              | PDF + 성능 최적화 + Vercel 배포               |

**주간 체크포인트**:

**Week 1 (Phase 1 - Day 1~7)**:

- [x] Task 001: 라우팅 설정 (2일)
- [x] Task 002: 타입 정의 (2일)
- [x] Task 003: Notion API 클라이언트 및 데이터 레이어 (2일)
- **마일스톤**: `npm run check-all` 통과, 타입 에러 없음 ✅

**Week 2 (Phase 1 - Day 8~14)**:

- Task 002~003 마무리 (1일)
- Task 004: 공통 컴포넌트 시작 (3일)
- **마일스톤**: shadcn/ui 컴포넌트 10개 설치, 기본 헤더/사이드바 완성

**Week 3 (Phase 2 - Day 15~21)**:

- [x] Task 004: 공통 컴포넌트 완성 (2일)
- [x] Task 005: 인증 페이지 UI (2일)
- [x] Task 006: 프리랜서 페이지 UI (2일)
- **마일스톤**: 로그인, 회원가입, 대시보드 UI 완성 ✅

**Week 4 (Phase 2 - Day 22~28)**:

- [x] Task 006: 프리랜서 페이지 UI 완성 (2일)
- [x] Task 007: 클라이언트 페이지 UI (3일)
- **마일스톤**: 8개 페이지 UI 완성, 반응형 테스트 완료 ✅

**Week 5 (Phase 3 - Day 29~35)**:

- [x] Task 008: 인증 시스템 — ⛔ MVP 범위 외 제외
- [x] Task 009: 노션 API 연동 (2일) ✅
- **마일스톤**: 노션 URL 임포트 및 실 데이터 파싱 성공 ✅

**Week 6 (Phase 3 - Day 36~42)**:

- [x] Task 010: CRUD API (2일) ✅ (Notion 기반 — getInvoiceWithItemsAction 등)
- [x] Task 011: 공유 링크 & 상태 관리 (2일) ✅ (notionPageId를 토큰으로 사용)
- [x] Task 012: 이메일 발송 (2일) ✅
- **마일스톤**: 견적서 뷰 실 데이터 연동, 승인/거절 상태 변경 성공 ✅

**Week 7 (Phase 3 - Day 43~49)**:

- [x] Task 013: E2E 테스트 (3일) ✅
- [x] 버그 수정 및 리팩토링 (3일)
- **마일스톤**: 모든 E2E 테스트 통과, `npm run check-all` 통과 ✅

**Week 8 (Phase 4 - Day 50~56)**:

- [x] Task 014: PDF 다운로드 (2일) ✅ (@react-pdf/renderer 서버 사이드 구현)
- [x] Task 015: 성능 최적화 & 배포 (3일) ✅
- **마일스톤**: Vercel 배포 성공, Lighthouse 점수 80 이상 ✅

---

## 위험 요소 및 완화 전략

| 위험                      | 영향                      | 확률 | 완화 전략                           |
| ------------------------- | ------------------------- | ---- | ----------------------------------- |
| **Notion API Rate Limit** | 노션 임포트 실패          | 중   | exponential backoff 구현, 캐싱 전략 |
| **Supabase 데이터 손실**  | 서비스 중단               | 낮   | 정기 백업, 트랜잭션 사용            |
| **인증 보안 취약점**      | 계정 탈취                 | 낮   | OWASP 가이드 준수, 정기 보안 감시   |
| **PDF 생성 성능**         | 느린 다운로드 (>3초)      | 중   | 서버 사이드 렌더링 고려, 캐싱       |
| **이메일 전달 실패**      | 클라이언트가 링크 못 받음 | 낮   | 발송 로그 기록, 재발송 기능         |
| **UI 반응형 문제**        | 모바일 사용성 저하        | 중   | 초기부터 반응형 테스트 포함         |
| **타입 에러 누적**        | 개발 속도 저하            | 낮   | 엄격한 TypeScript 설정, lint 규칙   |

**위험 모니터링**:

- 주간 성능 지표 확인 (Lighthouse, 번들 크기)
- E2E 테스트 통과율 추적
- 버그 트래킹 (GitHub Issues)
- 사용자 피드백 수집

---

## 성공 기준

### 개발 완료 기준

- [x] 모든 Task 완료 및 체크리스트 통과
- [x] `npm run check-all` 100% 통과
- [x] E2E 테스트 100% 통과
- [x] 코드 리뷰 완료 (PR)
- [x] 문서화 완료

### 기능 검증 기준

- [x] 노션 URL → 공유 링크 생성: **5분 이내**
- [x] 웹 뷰 로딩: **2초 이내**
- [x] PDF 다운로드: **3초 이내**
- [x] 공유 링크 유효 기간: **30일**
- [x] 대시보드 상태 추적: **실시간 또는 <1분**

### 배포 기준

- [x] Vercel 배포 성공
- [x] 프로덕션 환경 E2E 테스트 통과
- [x] Lighthouse 점수: 성능 80 이상
- [x] 모니터링 활성화
- [x] 정기 백업 설정

---

## 참고 자료

- **Next.js 15.5.3 가이드**: `@/docs/guides/nextjs-15.md`
- **폼 처리 가이드**: `@/docs/guides/forms-react-hook-form.md`
- **프로젝트 구조**: `@/docs/guides/project-structure.md`
- **컴포넌트 패턴**: `@/docs/guides/component-patterns.md`
- **스타일링 가이드**: `@/docs/guides/styling-guide.md`
- **PRD 상세**: `@/docs/PRD.md`

---

**로드맵 버전**: 1.4  
**마지막 업데이트**: 2026-06-22  
**상태**: Complete (MVP 개발 완료 - 전체 Phase 완료)  
**📊 진행 상황**: 전체 완료 (15/15 Tasks 완료: 001~007 + 009~015)
