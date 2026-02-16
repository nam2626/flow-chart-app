# Quickstart: 수동 위치 금지 중앙 정렬 레이아웃

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

### US1 (자동 세로 중앙 정렬)
1. 편집 화면에서 도형 3개 이상 생성.
2. 도형 크기/텍스트 길이를 다르게 조정.
3. 도형이 세로 배치 + 가로 중앙 정렬인지 확인.
4. 연결선이 도형 사이 전용 행으로 표시되는지 확인.

### US2 (변경 후 재배치 유지)
1. 도형 추가/삭제/순서 변경 수행.
2. 수동 `top/left` 조작 없이 재배치되는지 확인.
3. 도형 수 증가 시 컨테이너가 확장되고 내부 스크롤에 의존하지 않는지 확인.

### US3 (프레젠테이션 동일 규칙)
1. 동일 데이터로 편집/프레젠테이션 전환.
2. 두 모드 모두 `position: absolute` 없이 동일 배치가 적용되는지 확인.
3. 연결선 중심 정렬과 도형 순서가 동일한지 확인.

## 3) Automated tests
```bash
npm run lint
npm run typecheck
npm run test:unit
npm run test:integration
npm run test:e2e
```

## 4) Performance checks
- PRF-001: 편집 화면 변경 후 p95 <= 300ms
- PRF-002: 프레젠테이션 시작 후 p95 <= 300ms
- PRF-003: 입력 규모/반복/측정 구간 기록

## 5) Expected evidence
- 편집 화면 정렬 스크린샷(변경 전/후)
- 프레젠테이션 화면 정렬 스크린샷(변경 전/후)
- 연결선 행 렌더링 확인 캡처
- 테스트 로그 및 성능 측정 로그

## 6) Checklist-level inspections
- CCR-001: 신규/수정 코드 주석은 한국어로 "왜"를 설명하는지 점검한다.
- UX-003: 신규 UX 패턴 도입이 발생하면 도입 이유와 영향 범위를 변경 기록에 남긴다.
