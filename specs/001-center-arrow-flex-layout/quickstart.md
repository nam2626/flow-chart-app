# Quickstart: 화살표 중앙 정렬 세로 플렉스 레이아웃

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

### US1 (세로 중앙 정렬 표시)
1. 편집 화면에서 3개 이상 도형 생성.
2. 도형 너비/높이를 서로 다르게 조정.
3. 모든 도형이 세로 스택 + 교차축 중앙 정렬인지 확인.
4. 각 인접 화살표 시작/종료 x좌표가 도형 중심 x좌표와 0px 오차로 일치하는지 확인.

### US2 (변경 후 유지)
1. 도형 추가/삭제/순서 변경 수행.
2. 재렌더 직후 자동 스택 재계산이 적용되는지 확인.
3. 동적 간격이 적용되어 도형/화살표 겹침이 없는지 확인.

### US3 (화면 간 일관성)
1. 동일 데이터로 편집 화면과 프레젠테이션 화면 전환.
2. 세로 배치 방향/중앙 정렬/간격 정책이 동일한지 확인.
3. 기존에 저장된 플로우차트에서도 동일 규칙이 적용되는지 확인.

## 3) Automated tests
```bash
npm run lint
npm run typecheck
npm run test:unit
npm run test:integration
npm run test:e2e
```

## 4) Performance checks
- PRF-001: 편집 화면 도형 변경 후 레이아웃/화살표 반영 p95 <= 300ms
- PRF-002: 프레젠테이션 시작 후 정렬 완료 p95 <= 300ms
- PRF-003: 측정 방식(입력 규모/반복 횟수/측정 구간) 기록

## 5) Expected evidence
- 편집 화면 세로 중앙 정렬 스크린샷(변경 전/후)
- 프레젠테이션 화면 정렬 스크린샷(변경 전/후)
- 동적 간격 비겹침 검증 캡처
- 테스트 로그 및 성능 측정 로그

## 6) Evidence file targets
- `test-results/ui-before.png`
- `test-results/ui-after.png`
- `test-results/presentation-before.png`
- `test-results/presentation-after.png`
