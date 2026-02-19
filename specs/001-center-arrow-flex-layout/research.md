# Research: 화살표 중앙 정렬 세로 플렉스 레이아웃

## Decision 1: 세로 플렉스 스택 + 교차축 중앙 정렬 강제
- Decision: 레이아웃 기본 모델을 top-to-bottom 단일 세로 스택으로 정의하고 cross-axis center 정렬을 강제한다.
- Rationale: 문제 원인(화살표/도형 중심 불일치)을 레이아웃 기준에서 제거하는 가장 단순한 방식이다.
- Alternatives considered:
  - 자유 배치 + 화살표 보정: 케이스 증가로 회귀 위험이 높다.
  - 화면별 별도 규칙: 편집/프레젠테이션 불일치 위험이 크다.

## Decision 2: 수동 x/y 배치 비허용
- Decision: 수동 x/y 이동을 허용하지 않고 자동 스택 재계산을 우선한다.
- Rationale: 레이아웃 일관성을 보장하고 화살표 중심 정렬 실패를 구조적으로 차단한다.
- Alternatives considered:
  - 수동 배치 허용 + 경고: 사용자 상태마다 예외 처리 비용이 커진다.
  - 수동 배치 허용 + 스냅: 복잡성 대비 효과가 낮다.

## Decision 3: 동적 간격 정책
- Decision: 도형 높이/텍스트 길이를 반영해 인접 간격을 동적으로 계산하고, 도형/화살표 겹침을 금지한다.
- Rationale: 고정 간격은 긴 텍스트/가변 높이에서 겹침을 유발한다.
- Alternatives considered:
  - 고정 간격: 가변 콘텐츠에서 실패 확률이 높다.
  - 사용자 수동 간격 입력: 운영 복잡성과 UX 부담이 증가한다.

## Decision 4: 적용 범위는 기존/신규 전체
- Decision: 기존 데이터와 신규 데이터 모두 동일 규칙(FR-007)을 적용한다.
- Rationale: 정책 이원화를 없애고 화면/데이터별 예외 분기를 제거한다.
- Alternatives considered:
  - 신규 데이터만 적용: 기존 문서에서 시각 불일치가 잔존한다.
  - 모드 선택 제공: 유지보수/검증 비용이 증가한다.

## Decision 5: 성능 측정 기준
- Decision: p95 300ms 측정 구간을 "레이아웃 재계산 시작 -> 도형/화살표 좌표 반영 완료"로 정의한다.
- Rationale: 사용자 체감 시점과 측정 구간을 일치시켜 판단 일관성을 확보한다.
- Alternatives considered:
  - 페인트 완료 시점 포함: 환경 의존성 증가로 재현성이 떨어진다.

## Decision 6: 테스트 전략
- Decision: 단위(좌표/간격 계산), 통합(편집/프레젠테이션 정합), E2E(주요 사용자 흐름) 3단계 검증을 유지한다.
- Rationale: 헌장 II(테스트 표준 필수)를 충족하고 회귀 원인 분리가 쉽다.
- Alternatives considered:
  - 통합/E2E만 수행: 계산 로직 결함 원인 파악이 느리다.

## Decision 7: 신규 UX 패턴 도입 없음
- Decision: 기존 버튼/오류/검증 문구 패턴을 유지하고 신규 UX 패턴은 도입하지 않는다.
- Rationale: 화면 간 일관성(헌장 III)을 우선하고, 학습 비용을 늘리는 새 상호작용을 피한다.
- Alternatives considered:
  - 정렬 상태 전용 신규 배지/패널 도입: 정보는 늘지만 기존 UX 흐름과 충돌 가능성이 있다.

## Measurement Method (PRF-003 detail)
- Input scale: 50개 도형, 가변 높이/가변 텍스트 길이 조합.
- Repetitions: 동일 시나리오 10회 반복.
- Window: 재정렬 시작 시점부터 도형/화살표 좌표 반영 완료 시점까지.
- Aggregation: 측정값 정렬 후 p95(`ceil(n*0.95)-1`) 산출.
