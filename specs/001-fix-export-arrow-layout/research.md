# Research: 단계형 플로우차트 보강

## Decision 1: 상태 관리와 영속화
- Decision: 플로우차트 편집 상태는 zustand 단일 스토어에서 관리하고, localStorage persist를 사용한다.
- Rationale: 현재 프로젝트 스택과 일치하고, 사용자 편집 복구/내보내기 재시도에 필요한 상태 복원을 단순화한다.
- Alternatives considered:
  - React Context + useReducer: 상태 전파/직렬화 코드가 증가해 복잡도 상승.
  - IndexedDB: 대용량에는 유리하나 본 범위(최대 50단계)에서는 과도함.

## Decision 2: 단계 연결 모델
- Decision: 연결은 `인접 단계 순서 기반`으로 계산하며, 별도 수동 연결 UI는 범위에서 제외한다.
- Rationale: 요구사항이 "각 단계별 화살표 연결"에 집중되어 있어 자동 인접 연결이 가장 예측 가능하고 테스트가 쉽다.
- Alternatives considered:
  - 자유 연결 그래프 모델: UX와 검증 복잡도가 크게 증가.
  - 수동 연결만 제공: 사용자 입력 부담 증가 및 일관성 저하.

## Decision 3: 캔버스 폭 검증 규칙
- Decision: 입력 단계에서 300~400 정수만 허용하고, 범위 밖 값은 즉시 거부한다.
- Rationale: 스펙 제약을 직접 반영하며 레이아웃 불안정성을 사전에 방지한다.
- Alternatives considered:
  - 자동 클램프(299->300): 사용자가 입력 오류를 인지하지 못할 수 있음.
  - 소수 허용: 표시/저장 규칙이 불필요하게 복잡해짐.

## Decision 4: 내보내기 실패 처리
- Decision: 내보내기는 입력 유효성 선검증 후 실행하며, 실패 시 사용자 조치 가능한 원인 메시지를 제공한다.
- Rationale: "내보내기 기능 점검" 요구를 기능/UX 관점에서 직접 해소한다.
- Alternatives considered:
  - 실패 시 일반 오류만 표시: 재시도 성공률 저하.
  - 백그라운드 무통지 재시도: 상태 불일치 시 디버깅 어려움.

## Decision 5: 성능 측정 기준
- Decision: 50단계 표준 샘플 차트로 단계 추가/폭 변경/내보내기 시작 시간을 측정한다.
- Rationale: 요구된 비기능 목표를 재현 가능한 기준으로 검증할 수 있다.
- Alternatives considered:
  - 임의 데이터 측정: 결과 비교 일관성이 낮음.
  - 실사용 로그 의존: 개발 단계에서 피드백 지연.

## Quality Gate Execution Log
- Decision: 구현 완료 직전 품질 게이트를 린트/타입체크/단위/통합/E2E 순서로 실행했다.
- Rationale: 결함 발견을 빠르게 피드백하고 사용자 흐름 회귀를 단계적으로 차단한다.
- Alternatives considered:
  - E2E 우선 실행: 원인 분리가 어려워 디버깅 비용이 증가함.
  - 단위 테스트만 실행: 통합 흐름 결함을 놓칠 가능성이 높음.
- Evidence:
  - `npm.cmd run lint`: PASS
  - `npm.cmd run typecheck`: PASS
  - `npm.cmd run test:unit`: PASS (20 passed)
  - `npm.cmd run test:integration`: PASS (12 passed)
  - `npm.cmd run test:e2e`: PASS (5 passed)
