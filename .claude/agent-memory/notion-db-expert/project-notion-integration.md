---
name: project-notion-integration
description: 노션 기반 견적서 웹 뷰어 프로젝트의 Notion API 통합 전략 및 핵심 설계 결정
metadata:
  type: project
---

노션 견적서 웹 뷰어 (invoice-web) 프로젝트에서 Notion API 역할은 **단방향 임포트** 전용이다. 프리랜서가 노션 URL을 입력하면 서버가 파싱하여 Supabase에 저장하는 구조.

**Why:** PRD F001 핵심 기능 — "노션 페이지 URL로부터 견적서 데이터 파싱 및 조회". 노션은 영구 데이터 소스가 아니라 입력 소스로만 사용됨.

**How to apply:** Notion API 관련 코드는 모두 서버 전용(`src/lib/notion/`)에 위치. Server Actions에서만 호출. 클라이언트 컴포넌트에서 직접 Notion API 호출 금지.

## 핵심 설계 결정

- **인증 방식**: Internal Integration Token (서버 환경변수 `NOTION_API_TOKEN`)
- **노션 구조**: 단일 페이지 + 하위 테이블 블록 방식 (Relation DB 방식 미사용 — MVP 단순화)
- **데이터 흐름**: 노션 URL → `pages.retrieve()` + `blocks.children.list()` → Supabase 저장
- **데이터베이스 방식**: 현재 프로젝트는 노션 Database가 아닌 일반 Page를 임포트 대상으로 사용

## 주요 파싱 패턴

- 노션 URL에서 페이지 ID 추출: 32자리 hex → UUID 변환 필요
- 견적 항목: 페이지 본문의 첫 번째 `table` 블록에서 파싱
- Properties: `rich_text`, `email`, `date`, `number`, `title` 타입 처리
- Rate limit: 3 req/s, 재시도는 exponential backoff (2^attempt 초)

## 환경변수

- `NOTION_API_TOKEN`: Integration Secret Token (서버 전용, NEXT*PUBLIC* 없음)
- `NOTION_API_VERSION`: `2022-06-28` (기본값)

[[user-freelancer-saas]]
