# Quickstart: 다중 도형 스타일 및 프레젠테이션 가시성 개선

## Prerequisites
- Node.js 20+
- npm
- Working directory: `D:/workspace/flowchart-app`

## 1) Install and run
```bash
npm install
npm run dev
```

## 2) Story-based verification

### US1: 모든 도형 개별 색상 지정 + 복원
1. 편집 화면에서 3개 이상 도형 생성.
2. 각 도형에 서로 다른 배경색/테두리색 지정.
3. 새로고침 후 색상 복원 확인.
4. 도형 순서를 변경해도(또는 일부 삭제/추가 후) 고유 ID 기준으로 기존 도형 색상이 올바르게 매핑되는지 확인.

### US2: 프레젠테이션 화살표 가시화 복구
1. 2개 이상 도형으로 프레젠테이션 시작.
2. 각 인접 도형 쌍 화살표가 source 경계에서 시작해 target 경계 직전에서 끝나는지 확인.
3. 다음/이전 단계 전환 후에도 화살표가 계속 표시되는지 확인.

### US3: 텍스트/강조 스타일 강화
1. 프레젠테이션에서 도형 텍스트가 1.3em으로 렌더링되는지 확인.
2. 활성 도형 그림자 blur/spread가 baseline 대비 각각 2배인지 확인.
3. opacity 값이 baseline과 동일한지 확인.

## 3) Automated test commands
```bash
npm run lint
npm run typecheck
npm run test:unit
npm run test:integration
npm run test:e2e
```

## 4) Performance checks (PRF)
- PRF-001: 프레젠테이션 시작 후 화살표 표시 완료 p95 <= 300ms
- PRF-002: 50개 도형 스타일 반영 p95 <= 300ms
- PRF-003: 측정 시 입력 크기(도형 수), 반복 횟수, 시작/종료 구간을 기록

## 5) Expected evidence
- 색상 복원(새로고침 전/후) 스크린샷
- 프레젠테이션 화살표 경계 정합 스크린샷
- 강조 스타일(텍스트/그림자) 비교 스크린샷
- 테스트 실행 로그와 성능 측정 로그
