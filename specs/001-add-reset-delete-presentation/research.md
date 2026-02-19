# Research: 도형 관리 및 프레젠테이션 모드

## Decision 1: 프레젠테이션 중 삭제/초기화 즉시 반영
- Decision: 프레젠테이션 실행 중에도 삭제/초기화 요청을 허용하고 즉시 상태를 반영한다.
- Rationale: 명확화 세션에서 확정된 요구이며, 발표 중 수정 니즈를 즉시 처리해 사용자 흐름 중단을 줄인다.
- Alternatives considered:
  - 프레젠테이션 중 편집 차단: 안정적이지만 요구사항과 불일치.
  - 요청 큐 적재 후 종료 시 반영: 상태 추적 복잡도 증가.

## Decision 2: 삭제 후 단계 순서 재정렬
- Decision: 도형 삭제 직후 남은 단계 순서를 1..N으로 재정렬한다.
- Rationale: 프레젠테이션 내비게이션과 시각적 순서를 일치시켜 오류 가능성을 낮춘다.
- Alternatives considered:
  - 순번 공백 유지: 이동/강조 로직이 복잡해짐.
  - 수동 재정렬 요구: 사용자 부담 증가.

## Decision 3: 전체 초기화 범위
- Decision: 전체 초기화 시 도형/연결/프레젠테이션 상태와 캔버스 설정을 기본값으로 복원한다.
- Rationale: 명확화 확정사항과 일치하며, 재시작 시 예측 가능한 초기 상태를 제공한다.
- Alternatives considered:
  - 캔버스 설정 유지: 사용자별 선호에는 유리하나 요구사항과 불일치.
  - 초기화 범위 선택 UI: 범위 외 복잡도 증가.

## Decision 4: 프레젠테이션 활성 단계 처리
- Decision: 현재 강조 단계가 삭제되면 즉시 다음 유효 단계(없으면 이전 단계, 모두 없으면 종료 가능 상태)로 이동한다.
- Rationale: 즉시 반영 요구에서 무효 포인터 상태를 방지한다.
- Alternatives considered:
  - 강제 첫 단계로 이동: 진행 맥락이 깨질 수 있음.
  - 오류만 표시 후 정지: 사용자 작업이 멈춤.

## Decision 5: 성능 측정 기준
- Decision: 50단계 샘플로 삭제/초기화/프레젠테이션 단계 전환의 p95를 측정한다.
- Rationale: 헌장 성능 예산(p95 300ms)을 재현 가능한 방식으로 검증한다.
- Alternatives considered:
  - 임의 데이터 수동 측정: 회귀 비교 재현성 낮음.
  - 실사용 로그 의존: 개발 단계 피드백 지연.

## Quality Gate Log (2026-02-16)
- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm run test:unit`: PASS
- `npm run test:integration`: PASS
- `npm run test:e2e`: PASS
