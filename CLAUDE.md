# 🤖 Claude Code 개발 지침

**InvoiceWeb**은 프리랜서와 에이전시가 노션 URL로 견적서를 생성하고, 클라이언트가 공유 링크로 확인 및 응답하는 Next.js 15 기반 서비스입니다.

📋 상세 프로젝트 요구사항은 `@/docs/PRD.md` 참조

## 🛠️ 핵심 기술 스택

- **Framework**: Next.js 15.5.3 (App Router + Turbopack)
- **Runtime**: React 19.1.0 + TypeScript 5
- **Styling**: TailwindCSS v4 + shadcn/ui (new-york style)
- **Forms**: React Hook Form + Zod + Server Actions
- **UI Components**: Radix UI + Lucide Icons
- **Development**: ESLint + Prettier + Husky + lint-staged

## 📱 페이지 구조

| 경로 | 설명 | 접근 권한 |
|------|------|---------|
| `/` | 홈 (서비스 소개) | 공개 |
| `/login` | 로그인 | 비로그인만 |
| `/signup` | 회원가입 | 비로그인만 |
| `/dashboard` | 견적서 목록 관리 | 로그인 필요 |
| `/invoices/new` | 노션 URL로 견적서 임포트 | 로그인 필요 |
| `/invoices/[id]` | 견적서 상세 + 발송 | 로그인 필요 |
| `/invoices/[id]/sent` | 발송 완료 확인 | 로그인 필요 |
| `/view/[token]` | 클라이언트 견적서 뷰 | 토큰 기반 공개 |
| `/view/[token]/response` | 클라이언트 응답 완료 | 토큰 기반 공개 |

## 📚 개발 가이드

- **🗺️ 개발 로드맵**: `@/docs/ROADMAP.md`
- **📋 프로젝트 요구사항**: `@/docs/PRD.md`
- **📁 프로젝트 구조**: `@/docs/guides/project-structure.md`
- **🎨 스타일링 가이드**: `@/docs/guides/styling-guide.md`
- **🧩 컴포넌트 패턴**: `@/docs/guides/component-patterns.md`
- **⚡ Next.js 15.5.3 전문 가이드**: `@/docs/guides/nextjs-15.md`
- **📝 폼 처리 완전 가이드**: `@/docs/guides/forms-react-hook-form.md`

## ⚡ 자주 사용하는 명령어

```bash
# 개발
npm run dev         # 개발 서버 실행 (Turbopack)
npm run build       # 프로덕션 빌드
npm run check-all   # 모든 검사 통합 실행 (권장)

# UI 컴포넌트
npx shadcn@latest add button    # 새 컴포넌트 추가
```

## ✅ 작업 완료 체크리스트

```bash
npm run check-all   # 모든 검사 통과 확인
npm run build       # 빌드 성공 확인
```

## 📁 코드 규칙

- **Server Actions**: `src/app/actions/` 디렉토리
- **Notion API 코드**: `src/lib/notion/` 디렉토리 (서버 전용)
- **Zod 스키마**: `src/lib/schemas/` 디렉토리
- **TypeScript 타입**: `src/lib/types/` 디렉토리
- **환경변수 검증**: `src/lib/env.ts` (Zod 기반)
- **NOTION_API_TOKEN**: 절대 `NEXT_PUBLIC_` 접두사 금지 (서버 환경 변수만)

💡 **상세 규칙은 위 개발 가이드 문서들을 참조하세요**
