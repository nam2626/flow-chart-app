# Research: 수동 위치 금지 중앙 정렬 레이아웃

## Decision 1: 세로 플렉스 컨테이너 단일화
- Decision: 편집/프레젠테이션 모두 플로우차트 래퍼를 세로 플렉스(`flex-direction: column`)로 통일하고 교차축 중앙 정렬을 강제한다.
- Rationale: 모드별 레이아웃 분기를 제거하면 정렬 불일치와 회귀를 가장 크게 줄일 수 있다.
- Alternatives considered:
  - 모드별 별도 레이아웃: 유지보수와 테스트 비용이 증가한다.
  - 도형 단위 수동 좌표 보정: 정책 위반이며 예외 케이스가 누적된다.

## Decision 2: 수동 위치 및 절대 배치 전면 금지
- Decision: 도형, 연결선, 보조 UI 전체에서 `top/left` 수동 지정과 `position: absolute`를 금지한다.
- Rationale: 위치 규칙을 컨테이너 흐름 기반으로 강제해야 화면 간 일관성을 보장할 수 있다.
- Alternatives considered:
  - 도형만 금지: 연결선/보조 UI에서 다시 불일치가 발생한다.
  - presentation만 예외 허용: 동일 데이터에서 결과가 달라진다.

## Decision 3: 연결선은 전용 흐름 행(row)으로 렌더링
- Decision: 연결선(화살표)은 인접 도형 사이 전용 행에서 렌더링하여 레이아웃 흐름에 포함한다.
- Rationale: 절대 배치 없이도 연결선 중심 정렬과 간격 제어를 동시에 달성할 수 있다.
- Alternatives considered:
  - 장식 레이어로 오버레이: `position: absolute` 금지와 충돌한다.
  - 아이콘 대체: 흐름 가독성과 의미 전달력이 저하된다.

## Decision 4: 컨테이너 확장 정책
- Decision: 도형 수 증가 시 컨테이너 높이를 콘텐츠 길이에 맞춰 확장하고 내부 스크롤을 1차 전략으로 사용하지 않는다.
- Rationale: 내부 스크롤 중심 전략은 연결선 단절과 정렬 오해를 유발한다.
- Alternatives considered:
  - 고정 높이 + 내부 스크롤: 장문/다단계 흐름에서 시각 연속성이 깨진다.
  - 도형 수 제한: 기능 요구를 임의로 축소한다.

## Decision 5: 성능 및 검증 방법
- Decision: 성능 측정 구간을 "재배치 시작 -> 도형/연결선 반영 완료"로 정의하고 p95 300ms를 목표로 유지한다.
- Rationale: 사용자 체감 시점과 측정 시점을 일치시켜 재현 가능한 지표를 만든다.
- Alternatives considered:
  - 페인트 완료 시점 포함: 환경 의존성이 커져 일관 측정이 어렵다.

## Decision 6: 테스트 전략
- Decision: 단위(배치 계산), 통합(모드 간 일치/엣지 케이스), E2E(핵심 사용자 플로우) 3단계 검증을 적용한다.
- Rationale: 헌장 II 요구사항과 회귀 방지 목적을 동시에 만족한다.
- Alternatives considered:
  - 통합 테스트만 수행: 계산 로직 결함의 원인 파악이 느리다.

## Measurement Method (PRF-003)
- Input scale: 최대 50개 도형, 가변 높이/가변 텍스트.
- Repetitions: 시나리오별 10회 반복.
- Window: 재배치 시작부터 도형/연결선 반영 완료까지.
- Aggregation: 측정값 정렬 후 p95(`ceil(n*0.95)-1`) 산출.
