# Research: 화살표 수평 중앙 정렬

## Decision 1: x축 중앙 정렬 + y축 경계 규칙 유지
- Decision: 화살표 시작/종료점의 x좌표는 각 도형의 수평 중심으로 고정하고, y좌표는 기존 경계 시작/종료 규칙을 유지한다.
- Rationale: 기존 사용자 기대(경계 기반 흐름)를 깨지 않으면서 요청된 수평 중앙 정렬만 정확히 반영할 수 있다.
- Alternatives considered:
  - 중심점-중심점(x/y 모두 중심): 기존 경계 규칙과 충돌.
  - x/y 모두 고정 오프셋: 도형 크기 변화에서 부정확.

## Decision 2: 정렬 판정 기준
- Decision: x좌표 정렬 판정은 허용 오차 0px 기준으로 정의한다.
- Rationale: 스펙에서 완전 일치를 명시했고 회귀 판정이 명확해진다.
- Alternatives considered:
  - ±1px 허용: 브라우저 부동소수 오차에 안전하지만 요구 조건 완화.
  - ±2px 허용: 사용자 가시 불일치 가능성 증가.

## Decision 3: 화면 간 동일 규칙 강제
- Decision: 편집/프레젠테이션/새 탭 프레젠테이션이 동일한 정렬 서비스 결과를 사용하도록 계약을 통일한다.
- Rationale: 화면 전환 시 시각 규칙 불일치 리스크를 줄이고 UX 일관성 원칙을 만족한다.
- Alternatives considered:
  - 화면별 별도 계산 로직: 유지보수 복잡도/불일치 위험 증가.

## Decision 4: 성능 측정 방식
- Decision: p95 300ms 측정은 "정렬 계산 시작 -> SVG/DOM 화살표 좌표 반영 완료" 구간으로 정의한다.
- Rationale: PRF 요구를 사용자 체감 구간과 직접 연결할 수 있다.
- Alternatives considered:
  - 렌더 후 페인트 완료 시점까지 확장: 환경 의존성이 커져 재현성 저하.

## Decision 5: 테스트 전략
- Decision: 단위(좌표 계산), 통합(화면별 렌더 정합), E2E(사용자 흐름) 3단계 검증을 모두 유지한다.
- Rationale: 헌장 테스트 원칙(단위+흐름)을 충족하며 회귀 원인 분리가 쉽다.
- Alternatives considered:
  - 통합/E2E만 수행: 계산 로직 회귀의 원인 분석 속도 저하.

## Decision 6: UX-003 신규 패턴 도입 여부
- Decision: 신규 UX 패턴은 도입하지 않고 기존 용어/피드백 규칙을 유지한다.
- Rationale: 화면 간 학습 비용과 전환 오류를 줄이기 위해 기존 패턴 유지가 더 안전하다.
- Alternatives considered:
  - 정렬 상태 전용 신규 배지 도입: 정보량은 늘지만 기존 UX 규칙과 충돌 가능.

## Measurement Method (PRF-003 detail)
- Input scale: 50개 도형, 인접 pair connector 생성.
- Repetitions: 동일 시나리오 10회 반복.
- Window: 정렬 계산 시작 시점부터 화살표 좌표 반영 완료 시점까지 측정.
- Aggregation: 측정값 정렬 후 p95 산출(`ceil(n*0.95)-1` 인덱스).
