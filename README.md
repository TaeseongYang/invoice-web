# InvoiceWeb - 노션 기반 견적서 공유 서비스

노션 URL 하나로 전문적인 견적서를 클라이언트에게 공유하고,
PDF 다운로드 및 승인/거절 응답을 받을 수 있는 서비스입니다.

## 🎯 핵심 기능

- **노션 자동 임포트**: 노션 페이지 URL 입력으로 견적서 자동 파싱
- **공유 링크 생성**: 고유 토큰 기반 공개 링크 생성 및 이메일 발송
- **웹 뷰**: 클라이언트가 링크로 접속하여 견적서 확인 (비로그인)
- **PDF 다운로드**: 웹에서 직접 PDF 다운로드
- **상태 관리**: 클라이언트 승인/거절/보류 응답 추적

## 🛠️ 기술 스택

- **Framework**: Next.js 15.5.3 (App Router + Turbopack)
- **Runtime**: React 19.1.0 + TypeScript 5
- **Styling**: TailwindCSS v4 + shadcn/ui
- **Forms**: React Hook Form + Zod
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **External APIs**: @notionhq/client (Notion), Resend (Email)
- **PDF Generation**: html2pdf.js 또는 jsPDF + html2canvas
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

# Supabase (다음 단계)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Notion API (서버 전용)
NOTION_API_TOKEN=your-notion-integration-token

# Email (서버 전용)
RESEND_API_KEY=your-resend-api-key
```

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
| `/`                      | 홈 (서비스 소개)         | 공개           |
| `/login`                 | 로그인                   | 비로그인만     |
| `/signup`                | 회원가입                 | 비로그인만     |
| `/dashboard`             | 견적서 목록 관리         | 로그인 필요    |
| `/invoices/new`          | 노션 URL로 견적서 임포트 | 로그인 필요    |
| `/invoices/[id]`         | 견적서 상세 + 발송       | 로그인 필요    |
| `/invoices/[id]/sent`    | 발송 완료 확인           | 로그인 필요    |
| `/view/[token]`          | 클라이언트 견적서 뷰     | 토큰 기반 공개 |
| `/view/[token]/response` | 클라이언트 응답 완료     | 토큰 기반 공개 |

## 📖 문서

- [프로젝트 요구사항 (PRD)](./docs/PRD.md) - 상세한 기능 명세 및 데이터 모델
- [프로젝트 구조 가이드](./docs/guides/project-structure.md) - 파일/폴더 구조
- [스타일링 가이드](./docs/guides/styling-guide.md) - CSS/Tailwind 사용법
- [컴포넌트 패턴](./docs/guides/component-patterns.md) - React 컴포넌트 작성 규칙
- [Next.js 15 가이드](./docs/guides/nextjs-15.md) - Next.js 15 특징 및 사용법
- [폼 처리 가이드](./docs/guides/forms-react-hook-form.md) - React Hook Form + Zod

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

## 🚧 다음 단계

1. **Supabase 연동** - 인증 및 데이터베이스 설정
2. **Notion API 구현** - 견적서 자동 임포트 기능
3. **이메일 연동** - Resend 또는 Nodemailer
4. **PDF 생성** - html2pdf.js 또는 jsPDF + html2canvas
5. **응답 시스템** - 클라이언트 승인/거절 처리

## 📄 라이선스

MIT
