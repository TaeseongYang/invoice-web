# 프로덕션 배포 체크리스트

## 사전 확인

- [ ] `npm run check-all` 통과
- [ ] `npm run build` 빌드 성공
- [ ] `.env.local.example` 기준 모든 환경변수 입력 완료

## 환경변수 (Vercel 또는 배포 플랫폼)

| 변수명                     | 필수 | 비고                                                 |
| -------------------------- | ---- | ---------------------------------------------------- |
| `NEXT_PUBLIC_APP_URL`      | ✅   | 실제 배포 도메인 (예: `https://invoice.example.com`) |
| `NOTION_API_TOKEN`         | ✅   | Notion 통합 토큰                                     |
| `NOTION_DATABASE_ID`       | ✅   | 견적서 목록 DB ID                                    |
| `NOTION_ITEMS_DATABASE_ID` | ✅   | 견적서 항목 DB ID                                    |
| `RESEND_API_KEY`           | ✅   | 이메일 발송용                                        |
| `AUTH_PASSWORD`            | ✅   | 16자 이상                                            |
| `AUTH_SECRET`              | ✅   | 32자 이상                                            |

## 보안 점검

- [ ] `AUTH_SECRET`가 32자 이상의 랜덤 값인지 확인
- [ ] `AUTH_PASSWORD`가 16자 이상이고 추측하기 어려운 값인지 확인
- [ ] Notion 통합 토큰이 프로덕션 워크스페이스의 토큰인지 확인
- [ ] `NEXT_PUBLIC_APP_URL`이 정확한 도메인으로 설정되었는지 확인 (OG 이미지 URL에 영향)

## 기능 검증

- [ ] 로그인 / 로그아웃 동작 확인
- [ ] 대시보드에서 견적서 목록 로드 확인
- [ ] 견적서 상세 페이지 QR 코드 표시 확인
- [ ] `/view/[token]` 공개 링크 접근 (로그인 없이) 확인
- [ ] OG 이미지 미리보기: `NEXT_PUBLIC_APP_URL/api/og?title=테스트` 접근 확인
- [ ] 이메일 발송 테스트

## Notion DB 확인

- [ ] Invoices DB에 "조회수" 숫자 속성 추가 여부 결정
- [ ] Notion 통합이 해당 DB에 접근 권한이 있는지 확인
