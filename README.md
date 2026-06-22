# InvoiceWeb - 노션 기반 견적서 공유 서비스

노션 DB에 저장된 견적서를 웹에서 조회하고,
클라이언트에게 공유 링크로 확인 및 PDF 다운로드를 제공하는 서비스입니다.

🔗 **배포 주소**: https://invoice-web-dentrosy.vercel.app

## 🎯 핵심 기능

- **노션 DB 연동**: 내 노션 DB에 저장된 견적서를 대시보드에서 바로 조회
- **견적서 상세 확인**: 항목별 수량/단가/금액 테이블 확인
- **공유 링크 생성**: 고유 토큰 기반 공개 링크 생성 및 이메일 발송
- **PDF 다운로드**: 견적서를 한글 폰트 지원 PDF로 다운로드
- **클라이언트 응답**: 클라이언트가 링크로 접속하여 승인/거절 응답
- **상태 관리**: 대기/승인/거절 상태 탭 필터링 및 통계 카드

## 🛠️ 기술 스택

- **Framework**: Next.js 15.3.9 (App Router + Turbopack)
- **Runtime**: React 19.1.0 + TypeScript 5
- **Styling**: TailwindCSS v4 + shadcn/ui (new-york style)
- **Forms**: React Hook Form + Zod + Server Actions
- **External APIs**: @notionhq/client v5 (Notion), Resend (Email)
- **PDF Generation**: @react-pdf/renderer + NotoSansKR (한글 폰트)
- **Development**: ESLint + Prettier + Husky + lint-staged

## 🚀 시작하기

### 설치

```bash
npm install
```

### 환경변수 설정

`.env.local` 파일을 생성하고 다음 변수들을 설정하세요:

```bash
# 앱 URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Notion API (서버 전용 — 절대 NEXT_PUBLIC_ 접두사 금지)
NOTION_API_TOKEN=your-notion-integration-token
NOTION_DATABASE_ID=your-invoices-database-id
NOTION_ITEMS_DATABASE_ID=your-items-database-id

# Email (서버 전용, 선택)
RESEND_API_KEY=your-resend-api-key
```

> **Notion DB ID 확인 방법**: 노션에서 DB를 열고 URL의 `p=` 파라미터 값이 DB ID입니다.
> `v=` 파라미터는 뷰 ID로 사용하지 않습니다.

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📦 빌드 및 배포

### 프로덕션 빌드

```bash
npm run build
npm start
```

### 모든 검사 (타입체크 + 린트 + 포맷)

```bash
npm run check-all
```

## 📱 페이지 구조

| 경로                     | 설명                     | 접근 권한      |
| ------------------------ | ------------------------ | -------------- |
| `/`                      | 대시보드 (견적서 목록)   | 공개           |
| `/invoices/[id]`         | 견적서 상세 + 발송       | 공개           |
| `/invoices/[id]/sent`    | 발송 완료 확인           | 공개           |
| `/view/[token]`          | 클라이언트 견적서 뷰     | 토큰 기반 공개 |
| `/view/[token]/response` | 클라이언트 응답 완료     | 토큰 기반 공개 |
| `/api/invoice-pdf/[id]`  | PDF 생성 API             | 서버 전용      |

## 🗃️ Notion DB 구조

### Invoices DB (견적서)

| 속성명      | 타입     | 설명              |
| ----------- | -------- | ----------------- |
| 견적서 번호 | title    | 견적서 제목/번호  |
| 클라이언트명| rich_text| 수신인 이름       |
| 상태        | status   | 대기 / 승인 / 거절|
| 발행일      | date     | 견적서 발행일     |
| 유효기간    | date     | 견적서 만료일     |
| 총금액      | number   | 합계 금액         |
| 항목        | relation | Items DB 연결     |

### Items DB (견적 항목)

| 속성명  | 타입    | 설명          |
| ------- | ------- | ------------- |
| 항목명  | title   | 작업/서비스명 |
| 수량    | number  | 수량          |
| 단가    | number  | 단위 금액     |
| 금액    | formula | 수량 × 단가   |

## 🛠️ 개발 명령어

```bash
npm run dev              # 개발 서버 (Turbopack)
npm run build            # 프로덕션 빌드
npm run check-all        # 타입체크 + 린트 + 포맷 검사
npm run typecheck        # TypeScript 타입 검사만
npm run lint             # ESLint 검사
npm run lint:fix         # ESLint 자동 수정
npm run format           # Prettier 자동 포맷
npm run format:check     # 포맷 검사만
```

## 📝 개발 규칙

- TypeScript 필수 (any 타입 금지)
- React Hook Form + Zod로 폼 관리
- shadcn/ui 컴포넌트 우선 사용
- 컴포넌트는 PascalCase, 변수/함수는 camelCase
- 한국어 주석 (비즈니스 로직만)
- 2칸 들여쓰기
- 반응형 디자인 필수

## 📄 라이선스

MIT
