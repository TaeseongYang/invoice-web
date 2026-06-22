# 🚀 InvoiceWeb 고도화 개발 로드맵

**프로젝트**: InvoiceWeb v2 | **기준**: MVP(ROADMAP_v1.md) 전체 완료 상태

---

## 개요

프리랜서와 에이전시가 노션 URL로 견적서를 생성하고, 클라이언트가 공유 링크로 확인·응답하는 Next.js 15 기반 서비스입니다.

MVP에서 완료된 핵심 기능: 노션 API 연동, 견적서 공유, 클라이언트 뷰(승인/거절/보류 + PDF), 기본 대시보드

고도화 단계 목표: **프로덕션 수준의 보안, 사용성, 안정성**

---

## 개발 단계

### Phase 1: 기반 아키텍처 ✅ (MVP 완료)

Task 001~015 전체 완료. 상세 내용: `docs/roadmaps/ROADMAP_v1.md`

---

### Phase 5: 관리자 기능 구축 ✅

> **완료일**: 2026-06-22

- **Task 028: `(admin)` 라우트 그룹 + 관리자 레이아웃** ✅ - 완료
  - ✅ `src/app/(admin)/layout.tsx` — 사이드바 + 헤더 레이아웃
  - ✅ `src/app/(admin)/page.tsx` — 기존 대시보드 마이그레이션
  - ✅ `src/components/admin/sidebar.tsx` — 반응형 사이드바 네비게이션
  - ✅ `src/components/admin/admin-header.tsx` — 모바일 햄버거 메뉴 + 로그아웃 버튼 슬롯

- **Task 029: iron-session 기반 인증 구현** ✅ - 완료
  - ✅ `src/lib/env.ts` — `AUTH_PASSWORD`(16자+), `AUTH_SECRET`(32자+) 환경변수 추가
  - ✅ `src/lib/schemas/freelancer.ts` — `loginSchema`를 `password` 단독 필드로 교체
  - ✅ `src/lib/auth/session.ts` — `SessionData` 인터페이스 + 7일 쿠키 옵션
  - ✅ `src/app/actions/auth.ts` — `loginAction`(타이밍 어택 방지), `logoutAction`
  - ✅ `src/app/login/page.tsx` — 로그인 페이지 (인증 시 `/` redirect)
  - ✅ `src/components/auth/login-form.tsx` — `useActionState` + `zodResolver` 로그인 폼
  - ✅ `src/components/auth/logout-button.tsx` — 로그아웃 버튼 (`useTransition`)
  - ✅ `src/middleware.ts` — `unsealData` 기반 세션 검사 + `/view/*` 공개 경로 처리

- **Task 030: 견적서 목록 고도화** ✅ - 완료
  - ✅ `invoice-table.tsx` — 공유 링크(`/view/[id]`) 복사 버튼 추가
  - ✅ `invoice-dashboard-client.tsx` — 검색(이름/제목), 정렬(날짜/금액/상태), 페이지네이션(10개/페이지)

---

### Phase 2: 관리자 UI 고도화

> **전제**: Phase 5 완료 상태 기반

- **Task 016: 견적서 상세 페이지 고도화**
  - 견적서 수정 기능 (노션 데이터 재임포트)
  - 메모/메시지 추가 기능
  - 활동 이력 타임라인

- **Task 017: 대시보드 통계 고도화**
  - 월별 매출 차트 (recharts 또는 tremor)
  - 응답률, 평균 처리 시간 지표
  - 최근 활동 피드

---

### Phase 3: 인증 및 보안 강화

> **전제**: Phase 5의 기본 인증 완료 상태 기반

- **Task 018: 로그인 보안 강화**
  - 로그인 시도 횟수 제한 (rate limiting)
  - 세션 만료 알림 및 자동 갱신
  - 마지막 로그인 일시 기록

- **Task 019: 감사 로그**
  - 견적서 생성/발송/상태변경 이력 기록
  - 클라이언트 조회 이력 (IP, 시간)

---

### Phase 4: 고급 기능

- **Task 020: 프리랜서 프로필 관리**
  - 이름, 이메일, 회사명, 연락처 수정
  - 프로필 이미지 업로드
  - 견적서 뷰 발신자 정보에 자동 반영

- **Task 021: 이메일 템플릿 고도화**
  - React Email 기반 HTML 템플릿 리디자인
  - 프리랜서 브랜딩 요소 반영
  - 발송 실패 시 재발송 기능

- **Task 022: 견적서 만료 알림**
  - 공유 링크 만료 7일 전 이메일 알림
  - 만료된 링크 갱신 기능 (새 토큰 발급)
  - 대시보드에서 만료 임박 시각적 표시

- **Task 023: 성능 최적화 2단계**
  - React Query / SWR 클라이언트 캐싱
  - Lighthouse 90점 이상 달성

---

### Phase 6: 링크 관리 기능 ✅

> **완료일**: 2026-06-22  
> **참고**: 공유 링크 복사(`CopyButton`)·`/view/[token]` 공개 뷰·이메일 발송은 MVP/Phase 5에서 완료됨. 신규 구현 항목만 포함.

- **Task 031: QR 코드 생성** ✅ - 완료
  - ✅ `src/components/invoice/qr-code-card.tsx` — QR 코드 카드 컴포넌트 (`qrcode.react`)
  - ✅ 견적서 상세 사이드바에 QR 코드 표시 (dynamic import로 레이지 로딩)
  - ✅ PNG 다운로드 기능 (`canvas.toDataURL`)

- **Task 032: 메신저 공유 버튼** ✅ - 완료
  - ✅ `src/components/invoice/share-buttons.tsx` — 카카오·텔레그램·이메일 공유
  - ✅ 카카오: Web Share API + 데스크톱 클립보드 복사 fallback
  - ✅ 텔레그램: `t.me/share/url` URL 방식
  - ✅ 이메일: `mailto:` 링크 (제목+본문 자동 포함)

- **Task 033: OG 태그 및 링크 미리보기 메타데이터** ✅ - 완료
  - ✅ `src/app/api/og/route.tsx` — `@vercel/og` 기반 동적 OG 이미지 생성 (Edge Runtime)
  - ✅ `/view/[token]` — `generateMetadata`로 동적 `og:title`, `og:description`, `og:image` 적용
  - ✅ 트위터 카드 메타태그 추가

- **Task 034: 링크 조회수 통계 추적** ✅ - 완료
  - ✅ `Invoice` 타입에 `viewCount: number` 추가
  - ✅ `src/lib/notion/database.ts` — `incrementViewCount` 함수 (Notion DB 속성 업데이트, 없으면 graceful 무시)
  - ✅ `src/components/invoice/view-tracker.tsx` — 클라이언트 진입 시 세션당 1회 카운트
  - ✅ `invoice-table.tsx` 데스크톱·모바일 모두 조회수 컬럼 추가

---

### Phase 7: 통합 및 최적화 ✅

> **완료일**: 2026-06-22

- **Task 035: Playwright E2E 통합 테스트** - 환경변수 설정 후 수동 실행 필요
  - 관리자 인증 플로우 E2E 테스트 (로그인 → 대시보드 → 로그아웃)
  - 링크 복사·QR 다운로드·메신저 공유 플로우 테스트
  - `/view/[token]` 공개 뷰 크로스 브라우저 호환성 테스트

- **Task 036: 성능 최적화 및 보안 강화** ✅ - 완료
  - ✅ `QrCodeCard`, `ShareButtons` dynamic import 레이지 로딩 적용
  - ✅ 미들웨어 rate limiting 구현 (15분 내 10회 초과 시 429 반환)

- **Task 037: 문서화 및 배포 준비** ✅ - 완료
  - ✅ `docs/guides/admin-guide.md` — 관리자 사용 가이드
  - ✅ `.env.local.example` — 전체 환경변수 설명 포함
  - ✅ `docs/deploy-checklist.md` — 프로덕션 배포 체크리스트

---

## 기술 부채

| 항목        | 현재 상태              | 목표                        |
| ----------- | ---------------------- | --------------------------- |
| 데이터 소스 | Notion API 직접 조회   | Supabase DB + Notion 임포트 |
| 공유 토큰   | notionPageId 직접 사용 | UUID 기반 별도 토큰 관리    |

---

## 참고 자료

- **MVP 완료 로드맵**: `docs/roadmaps/ROADMAP_v1.md`
- **PRD 상세**: `docs/PRD.md`
- **개발 가이드**: `docs/guides/`

---

**로드맵 버전**: 2.4 | **최종 업데이트**: 2026-06-22  
**📊 고도화 진행 상황**: Phase 5~7 완료 (10/19 Tasks — Task 028~037)
