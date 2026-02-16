# Quickstart: 화살표 수평 중앙 정렬

## Prerequisites
- Node.js 20+
- npm
- Working directory: `D:/workspace/flowchart-app`

## 1) Install and run
```bash
npm install
npm run dev
```

## 2) Scenario verification

### US1 (Edit)
1. 편집 화면에서 3개 이상 도형 생성.
2. 도형 폭을 서로 다르게 조정.
3. 인접 화살표 시작/종료 x좌표가 각 도형 중심 x좌표와 0px 오차로 일치하는지 확인.
4. y좌표는 기존 경계 시작/종료 규칙을 유지하는지 확인.

### US2 (Presentation)
1. 프레젠테이션 시작.
2. 화살표 x좌표가 도형 중심 x좌표와 0px 오차로 일치하는지 확인.
3. 단계 이동(다음/이전) 후에도 동일 기준 유지 확인.

### US3 (Cross-screen consistency)
1. 동일 데이터로 편집 화면과 프레젠테이션 화면을 번갈아 확인.
2. 화살표 x 정렬 규칙이 화면 간 동일한지 확인.

## 3) Automated tests
```bash
npm run lint
npm run typecheck
npm run test:unit
npm run test:integration
npm run test:e2e
```

## 4) Performance checks
- PRF-001: 편집 화면 재정렬 p95 <= 300ms
- PRF-002: 프레젠테이션 시작 후 정렬 완료 p95 <= 300ms
- PRF-003: 측정 구간(계산 시작~좌표 반영 완료), 입력 규모, 반복 횟수 기록
- PRF-004: x 정렬 오차 허용 0px 검증
- PRF-005: 50개 도형 입력 기준에서도 PRF-001/002 동일 충족

## 5) Expected evidence
- 편집 화면 화살표 정렬 스크린샷
- 프레젠테이션 화면 화살표 정렬 스크린샷
- 화면 간 비교 스크린샷
- 테스트 로그 및 성능 측정 로그

## 6) Evidence links (before/after)
- Before: `docs/evidence/001-center-arrow-alignment/before-edit.png`
- After: `docs/evidence/001-center-arrow-alignment/after-edit.png`
- Before: `docs/evidence/001-center-arrow-alignment/before-presentation.png`
- After: `docs/evidence/001-center-arrow-alignment/after-presentation.png`
