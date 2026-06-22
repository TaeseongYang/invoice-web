# 🚀 노션 기반 견적서 웹 뷰어 - 고도화 개발 로드맵

**프로젝트**: InvoiceWeb v2 | **대상**: MVP 이후 고도화 단계  
**기준**: MVP (ROADMAP_v1.md) 전체 완료 상태 기준 | **패러다임**: 구조 우선 접근법

---

## 개요

InvoiceWeb은 프리랜서와 에이전시가 노션 URL로 견적서를 생성하고, 클라이언트가 공유 링크로 확인·응답하는 Next.js 15 기반 서비스입니다.

MVP에서 구현 완료된 핵심 기능:

- **노션 API 연동**: 노션 공개 URL에서 견적서 데이터 자동 파싱
- **견적서 공유**: 고유 토큰 기반 공유 링크 생성 및 이메일 발송
- **클라이언트 뷰**: 승인/거절/보류 응답 및 PDF 다운로드
- **기본 대시보드**: 견적서 목록 조회 (Notion DB 기반)

MVP에서 의도적으로 제외된 항목:

- 사용자 인증 시스템 (로그인/회원가입 UI는 존재하나 로직 미구현)
- 별도 관계형 DB (Supabase) — Notion API를 직접 데이터 소스로 사용

고도화 단계에서는 **프로덕션 수준의 안정성, 보안, 사용성**을 목표로 합니다.

---

## 개발 워크플로우

1. **작업 계획**
   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - 새로운 작업을 포함하도록 `ROADMAP.md` 업데이트
   - 우선순위 작업은 마지막 완료된 작업 다음에 삽입

2. **작업 생성**
   - `/tasks` 디렉토리에 새 작업 파일 생성
   - 명명 형식: `XXX-description.md` (예: `016-admin-layout.md`)
   - MVP의 `/tasks/015-*.md`를 완료된 예시로 참조

3. **작업 구현**
   - 작업 파일의 명세서를 따름
   - 각 단계 완료 후 `npm run check-all` 통과 확인
   - API/비즈니스 로직 Task는 Playwright MCP 테스트 필수

4. **로드맵 업데이트**
   - 완료된 작업을 ✅로 표시

---

## 개발 단계

### Phase 1: 기반 아키텍처 강화 ✅ (MVP 완료)

> MVP에서 완료된 내용으로, 고도화의 기반이 됩니다.

- **Task 001~007**: 프로젝트 구조, 타입 정의, Notion API 데이터 레이어, 전체 UI 완성 ✅
- **Task 009~013**: Notion API 연동, CRUD, 공유 링크·상태 관리, 이메일 발송, E2E 테스트 ✅
- **Task 014~015**: PDF 다운로드, 성능 최적화·배포 ✅

---

### Phase 2: 관리자 UI 고도화

> **목표**: 프리랜서가 견적서를 효율적으로 관리할 수 있는 관리자 레이아웃 구현  
> **핵심 고도화 요구사항**: 관리자 레이아웃 기반 견적서 목록 + 공유 링크 복사

- **Task 016: 관리자 레이아웃 구현** - 우선순위
  - Next.js App Router의 `(admin)` 라우트 그룹 생성
  - 사이드바 네비게이션 (견적서 목록, 설정 등)
  - 전용 헤더 (로그아웃, 사용자 정보 표시 영역)
  - 반응형 레이아웃 (모바일 햄버거 메뉴)
  - 기존 `/dashboard`를 관리자 레이아웃 아래로 마이그레이션

- **Task 017: 견적서 목록 고도화 및 공유 링크 복사**
  - See: `/tasks/017-invoice-list-enhancement.md`
  - 견적서 목록 테이블에 공유 링크 복사 버튼 추가 (각 행)
  - 클립보드 복사 후 토스트 알림 표시
  - 정렬 기능 (날짜, 금액, 상태 기준)
  - 검색 기능 (클라이언트 이름, 견적서 제목)
  - 페이지네이션 (목록이 많아질 경우)
  - 빈 상태 메시지 개선

---

### Phase 3: 환경변수 기반 패스워드 인증 구현

> **목표**: 복잡한 외부 서비스 없이 환경변수 패스워드로 간단한 접근 제어 구현  
> **방식**: `AUTH_PASSWORD` 환경변수 비교 + `iron-session` 암호화 쿠키  
> **전제 조건**: 없음 (환경변수 설정만 필요)

- **Task 018: 환경변수 및 `src/lib/env.ts` 업데이트** - 우선순위
  - `src/lib/env.ts`의 `envSchema`에 `AUTH_PASSWORD`, `AUTH_SECRET` 필드 추가
  - `AUTH_PASSWORD`: 최소 16자 (실제 접근 패스워드)
  - `AUTH_SECRET`: 최소 32자 (iron-session 쿠키 암호화 키)
  - `.env.local` 및 Vercel 환경변수에 두 값 설정
  - 두 변수 모두 서버 전용 — 절대 `NEXT_PUBLIC_` 접두사 금지

- **Task 019: `iron-session` 설치 및 세션 모듈 생성**
  - `npm install iron-session` 실행
  - `src/lib/auth/session.ts` 신규 생성
  - `SessionData { isAuthenticated: boolean }` 인터페이스 정의
  - `sessionOptions`: `cookieName`, `password(AUTH_SECRET)`, `httpOnly: true`, `secure(prod)`, `sameSite: 'lax'`, `maxAge: 7일`

- **Task 020: 로그인 스키마 교체**
  - `src/lib/schemas/freelancer.ts`의 `loginSchema` 수정
  - 기존 `email + password` → `password` 단독 필드로 교체
  - `signupSchema`는 파일에 유지하되 사용 안 함 주석 추가

- **Task 021: 인증 Server Actions 구현**
  - `src/app/actions/auth.ts` 신규 생성
  - `loginAction`: `crypto.timingSafeEqual`로 타이밍 어택 방지, 실패 시 300ms 딜레이 적용
  - `logoutAction`: `session.destroy()` 후 `/login` redirect
  - `getSession`: Server Components에서 세션 확인용 헬퍼 함수
  - **[테스트 필수 - 완료 조건]** Playwright MCP로 인증 플로우 테스트:
    - [ ] 올바른 패스워드 입력 → 세션 쿠키 생성 → `/`으로 redirect 확인
    - [ ] 잘못된 패스워드 → 에러 메시지 표시 (redirect 없음) 확인
    - [ ] 로그아웃 → 세션 파기 → `/login`으로 redirect 확인
    - [ ] 콘솔 에러 없음 확인

- **Task 022: 로그인 페이지 구현**
  - `src/app/login/page.tsx` 신규 생성 (이미 인증된 경우 `/`로 redirect)
  - `src/components/auth/login-form.tsx` 신규 생성 (`'use client'`)
  - `useForm` + `zodResolver(loginSchema)` + `useTransition` 조합
  - shadcn/ui `Form`, `Input`, `Button` 컴포넌트 활용
  - pending 상태 버튼 disabled + 로딩 텍스트
  - **[테스트 필수 - 완료 조건]** Playwright MCP로 UI 플로우 테스트:
    - [ ] 빈 폼 제출 → Zod 클라이언트 에러 표시 확인
    - [ ] 잘못된 패스워드 → Server Action 에러 메시지 표시 확인
    - [ ] 올바른 패스워드 → 홈으로 이동 확인
    - [ ] 이미 로그인된 상태에서 `/login` 접근 → `/`로 redirect 확인

- **Task 023: 미들웨어 활성화 + 로그아웃 UI 연결**
  - `src/middleware.ts` 수정: 쿠키 기반 인증 검사로 교체
  - matcher: `/((?!_next/static|_next/image|favicon.ico).*)`
  - `/view/*` → 항상 통과 (클라이언트 공개 뷰)
  - `/login` → 인증된 경우 `/`로 redirect
  - 그 외 보호 경로 → 미인증 시 `/login?from=[pathname]`으로 redirect
  - `src/components/auth/logout-button.tsx` 신규 생성 (`'use client'`)
  - 홈/대시보드 헤더에 `LogoutButton` 추가
  - **[테스트 필수 - 완료 조건]** Playwright MCP로 접근 제어 E2E 테스트:
    - [ ] 비인증 상태에서 `/` 접근 → `/login?from=/`으로 redirect 확인
    - [ ] 비인증 상태에서 `/invoices/[id]` 접근 → `/login?from=...`으로 redirect 확인
    - [ ] `/view/[token]` 접근 → 인증 없이 정상 표시 확인
    - [ ] 로그인 후 `from` 파라미터 경로로 복귀 확인
    - [ ] 콘솔 에러 없음 확인

---

### Phase 5: 관리자 기능 구축 ✅

> **목표**: 관리자 레이아웃, 환경변수 기반 인증 시스템, 견적서 목록 고도화 구현  
> **완료일**: 2026-06-22

- **Task 028: `(admin)` 라우트 그룹 + 관리자 레이아웃 구현** ✅ - 완료
  - ✅ `src/app/(admin)/layout.tsx` — 사이드바 + 헤더 포함 레이아웃
  - ✅ `src/app/(admin)/page.tsx` — 기존 대시보드 마이그레이션
  - ✅ `src/components/admin/sidebar.tsx` — 사이드바 네비게이션 (반응형)
  - ✅ `src/components/admin/admin-header.tsx` — 모바일 햄버거 메뉴 + 로그아웃 버튼 슬롯

- **Task 029: 환경변수 기반 iron-session 인증 구현** ✅ - 완료
  - ✅ `src/lib/env.ts` — `AUTH_PASSWORD`(16자+), `AUTH_SECRET`(32자+) 필드 추가
  - ✅ `src/lib/schemas/freelancer.ts` — `loginSchema`를 `password` 단독 필드로 교체
  - ✅ `src/lib/auth/session.ts` — `SessionData` 인터페이스 + `sessionOptions` (7일 쿠키)
  - ✅ `src/app/actions/auth.ts` — `loginAction`(타이밍 어택 방지), `logoutAction`, `getSession`
  - ✅ `src/app/login/page.tsx` — 로그인 페이지 (인증 시 `/` redirect)
  - ✅ `src/components/auth/login-form.tsx` — `useActionState` + `zodResolver` 로그인 폼
  - ✅ `src/components/auth/logout-button.tsx` — 로그아웃 버튼 (`useTransition`)
  - ✅ `src/middleware.ts` — `unsealData` 기반 세션 검사 + `/view/*` 공개 경로 처리

- **Task 030: 견적서 목록 고도화 + 공유 링크 복사** ✅ - 완료
  - ✅ `invoice-table.tsx` — 공유 링크(`/view/[id]`) 복사 버튼으로 교체
  - ✅ `invoice-dashboard-client.tsx` — 검색(이름/제목), 정렬(날짜/금액/상태), 페이지네이션(10개/페이지)

---

### Phase 4: 고급 기능 및 사용자 경험 향상

> **목표**: 서비스 완성도를 높이는 부가 기능 구현

- **Task 024: 프리랜서 프로필 관리 페이지**
  - 이름, 이메일, 회사명, 연락처 수정
  - 프로필 이미지 업로드 (Supabase Storage)
  - 견적서 뷰 페이지의 발신자 정보로 자동 반영

- **Task 025: 이메일 템플릿 고도화**
  - React Email 기반 HTML 이메일 템플릿 리디자인
  - 프리랜서 브랜딩 요소 반영 (이름, 회사명)
  - 이메일 미리보기 기능 (관리자 UI에서)
  - 발송 실패 시 재발송 기능

- **Task 026: 견적서 만료 알림 및 갱신**
  - 공유 링크 만료 7일 전 이메일 알림 (프리랜서)
  - 만료된 링크 갱신 기능 (새 토큰 발급)
  - 만료 임박 견적서 대시보드에서 시각적 표시

- **Task 027: 성능 최적화 2단계**
  - React Query / SWR 도입으로 클라이언트 데이터 캐싱
  - Supabase 실시간 구독으로 대시보드 상태 자동 갱신
  - 이미지 및 폰트 최적화 재점검
  - Lighthouse 점수 90 이상 달성

---

## 기술 부채 및 개선 사항

MVP 개발 과정에서 발생한 기술 부채를 고도화 단계에서 해소합니다.

| 항목 | 현재 상태 | 목표 |
|------|-----------|------|
| 인증 시스템 | 미구현 (UI만 존재) | 환경변수 패스워드 + iron-session 구현 |
| 데이터 소스 | Notion API 직접 조회 | Supabase DB + Notion 임포트 |
| 공유 토큰 | notionPageId 직접 사용 | UUID 기반 별도 토큰 관리 |
| 미들웨어 | 패스스루 (인증 검사 없음) | 세션 쿠키 기반 접근 제어 |
| 다중 사용자 | 단일 Notion 계정 공유 | 단일 운영자 방식 (Supabase는 별도 Phase) |

---

## 의존성 그래프

```
MVP 완료 (Task 001~015)
    ↓
Task 016: 관리자 레이아웃 구현
    └─→ Task 017: 견적서 목록 고도화 + 공유 링크 복사
         ↓
Task 018 (env.ts) → Task 019 (iron-session) → Task 020 (스키마)
    → Task 021 (Server Actions) → Task 022 (로그인 페이지) → Task 023 (미들웨어)
         ↓
    Task 024 이후 (Phase 4)
Task 024: 프리랜서 프로필 관리
Task 025: 이메일 템플릿 고도화
Task 026: 견적서 만료 알림
Task 027: 성능 최적화 2단계
```

**병렬 실행 가능한 작업**:
- Task 016~017 (관리자 UI): 인증 없이도 독립 진행 가능
- Task 024~026: Task 023 완료 후 병렬 진행 가능

---

## 🧪 Playwright MCP 테스트 지침

Phase 3의 모든 API/비즈니스 로직 Task는 **Playwright MCP 테스트 통과가 완료 조건**입니다.

### 테스트 수행 절차

1. 개발 서버 실행 확인 후 `mcp__playwright__browser_navigate`로 앱 접속
2. Happy Path 시나리오 테스트 (정상 동작)
3. Error Case 시나리오 테스트 (잘못된 입력, 권한 없음, 네트워크 오류)
4. `mcp__playwright__browser_console_messages`로 콘솔 에러 없음 확인
5. `mcp__playwright__browser_network_requests`로 API 응답 코드 및 데이터 구조 검증
6. 테스트 결과를 작업 파일 "## 테스트 체크리스트"에 기록

### 테스트 통과 기준

- 모든 Happy Path 시나리오 정상 동작
- 모든 Error Case 시나리오 적절한 에러 처리
- 브라우저 콘솔에 에러 로그 없음
- API 응답 코드가 기대값과 일치 (200, 201, 400, 401, 403, 404 등)
- 테스트 결과가 작업 파일 체크리스트에 기록됨

---

## 마일스톤

| Phase | 작업 | 목표 |
|-------|------|------|
| Phase 2 | Task 016~017 | 관리자 레이아웃 + 공유 링크 복사 기능 |
| Phase 3 | Task 018~023 | 환경변수 패스워드 + iron-session 인증 구현 |
| Phase 4 | Task 024~027 | 부가 기능 및 성능 최적화 완성 |

---

## 참고 자료

- **MVP 완료 로드맵**: `@/docs/roadmaps/ROADMAP_v1.md`
- **PRD 상세**: `@/docs/PRD.md`
- **Next.js 15 가이드**: `@/docs/guides/nextjs-15.md`
- **컴포넌트 패턴**: `@/docs/guides/component-patterns.md`
- **스타일링 가이드**: `@/docs/guides/styling-guide.md`
- **폼 처리 가이드**: `@/docs/guides/forms-react-hook-form.md`
- **프로젝트 구조**: `@/docs/guides/project-structure.md`

---

**로드맵 버전**: 2.1  
**최초 작성**: 2026-06-22  
**최종 업데이트**: 2026-06-22  
**기준 상태**: MVP 완료 (ROADMAP_v1.md — 15/15 Tasks 완료)  
**📊 고도화 진행 상황**: Phase 5 완료 (3/12 Tasks — Task 028~030 완료)
