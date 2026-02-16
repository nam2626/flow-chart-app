# Feature Specification: 수동 위치 금지 중앙 정렬 레이아웃

**Feature Branch**: `001-enforce-flex-center-layout`  
**Created**: 2026-02-16  
**Status**: Draft  
**Input**: User description: "도형에 수동 top, left 금지, 프레젠테이션 모드에서도 도형에 수동 top, left 금지, display의 absoulte 속성도 금지. 편집 모드 / 프레젠테이션 모드 전부 플로우차트를 감싸는 컨테이너 태그에 FLEX 세로배치 가로정렬 중앙 설정."

## Clarifications

### Session 2026-02-16

- Q: 도형 수가 많아질 때 컨테이너 처리 방식(내부 스크롤/확장/개수 제한) → A: 컨테이너 높이를 도형 수에 따라 확장하고 내부 세로 스크롤에 의존하지 않는다.
- Q: `position: absolute` 금지 범위(도형만/전체 요소/영역 한정) → A: 도형/연결선/보조 UI를 포함한 모든 요소에서 `position: absolute`를 금지한다.
- Q: 절대 위치 금지 시 연결선(화살표) 표현 방식(장식/행 단위/아이콘 대체) → A: 도형 사이 전용 흐름 행(row)에서 연결선을 렌더링해 레이아웃 흐름에 포함한다.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 자동 세로 중앙 정렬 표시 (Priority: P1)

사용자는 편집 화면에서 도형이 수동 좌표 없이 자동 세로 흐름으로 배치되고, 항상 가로 중앙 정렬되기를 원한다.

**Why this priority**: 편집 단계의 가독성과 정렬 일관성이 기본 사용성을 좌우한다.

**Independent Test**: 도형 3개 이상 추가 시 사용자가 개별 위치를 지정하지 않아도 순서대로 세로 배치되고 모든 도형의 중심선이 수평으로 일치하면 통과.

**Acceptance Scenarios**:

1. **Given** 사용자가 편집 화면에서 도형을 추가했을 때, **When** 화면이 갱신되면, **Then** 도형은 자동 세로 배치되고 가로 중앙 정렬된다.
2. **Given** 도형 텍스트 길이나 높이가 다를 때, **When** 배치가 계산되면, **Then** 도형 간 간격이 조정되어 겹치지 않는다.

---

### User Story 2 - 변경 후 자동 재배치 유지 (Priority: P2)

사용자는 도형 추가/삭제/순서 변경 후에도 자동 세로 중앙 정렬 규칙이 즉시 유지되기를 원한다.

**Why this priority**: 편집 중 변경 작업마다 정렬이 깨지면 반복 보정이 필요해 생산성이 급감한다.

**Independent Test**: 추가/삭제/순서변경 직후에도 도형이 세로 중앙 정렬 상태를 유지하고 수동 위치 지정 없이 정상 재배치되면 통과.

**Acceptance Scenarios**:

1. **Given** 기존 플로우차트가 있을 때, **When** 도형을 삭제하면, **Then** 남은 도형은 자동으로 세로 중앙 정렬 재배치된다.
2. **Given** 단계 순서를 변경했을 때, **When** 화면이 다시 표시되면, **Then** 변경 순서 기준으로 자동 세로 중앙 정렬이 유지된다.

---

### User Story 3 - 프레젠테이션 화면 동일 규칙 (Priority: P3)

사용자는 프레젠테이션 화면에서도 편집 화면과 동일한 자동 세로 중앙 정렬 규칙을 보기를 원한다.

**Why this priority**: 편집 결과와 발표 결과가 다르면 신뢰성과 전달력이 저하된다.

**Independent Test**: 동일 데이터에서 편집/프레젠테이션 화면 전환 시 도형 배치 방향과 중앙 정렬 결과가 동일하면 통과.

**Acceptance Scenarios**:

1. **Given** 편집 화면에서 저장된 흐름이 있을 때, **When** 프레젠테이션을 시작하면, **Then** 프레젠테이션 화면도 자동 세로 중앙 정렬 규칙을 동일하게 적용한다.

---

### Edge Cases

- 도형이 1개인 경우에도 단일 도형이 컨테이너 중앙 정렬 상태로 안정적으로 표시되어야 한다.
- 도형 크기 차이가 큰 경우에도 순서가 바뀌지 않고 세로 흐름이 유지되어야 한다.
- 단계 수가 많은 경우에도 자동 배치 규칙이 유지되고 항목 간 겹침이 발생하지 않아야 한다.
- 단계 수 증가 시 컨테이너가 확장되어 전체 흐름이 보존되어야 하며 내부 스크롤 의존으로 레이아웃이 깨지지 않아야 한다.
- 절대 위치를 사용하지 않아도 도형, 연결선, 보조 UI가 동일 순서와 가독성으로 표시되어야 한다.
- 연결선은 도형 사이 전용 흐름 행에서 렌더링되어야 하며, 편집/프레젠테이션 모두에서 수평 중앙 정렬이 유지되어야 한다.
- 편집 화면과 프레젠테이션 화면 전환 직후에도 배치 결과가 일치해야 한다.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST arrange shapes in a top-to-bottom vertical flow automatically.
- **FR-002**: System MUST center-align all shapes horizontally within the flowchart container.
- **FR-003**: Users MUST NOT manually set per-shape top or left positioning in edit mode.
- **FR-004**: Users MUST NOT manually set per-shape top or left positioning in presentation mode.
- **FR-005**: System MUST recalculate and apply the same auto layout after add, delete, or reorder actions.
- **FR-006**: System MUST keep edit and presentation layout outcomes consistent for the same flowchart data.
- **FR-007**: System MUST render shape order using container-driven flow positioning rather than per-shape absolute placement.
- **FR-008**: System MUST expand container height as shape count grows, without relying on internal vertical scrolling as the primary layout strategy.
- **FR-009**: System MUST NOT use `position: absolute` for any layout element in edit or presentation screens.
- **FR-010**: System MUST render connectors in dedicated in-flow rows between shape items so connector alignment remains centered without absolute positioning.

### UX Consistency Requirements *(mandatory)*

- **UX-001**: 동일 목적 UI 요소의 용어/상호작용/피드백 규칙 MUST be consistent across screens.
- **UX-002**: 오류 메시지, 버튼 라벨, 검증 메시지 문구 규칙 MUST reference existing patterns.
- **UX-003**: 신규 UX 패턴 도입 시 MUST document reason and migration impact.

### Performance Requirements *(mandatory)*

- **PRF-001**: 편집 화면에서 도형 변경 후 자동 재배치 반영의 p95 시간은 300ms 이내여야 한다.
- **PRF-002**: 프레젠테이션 시작 시 자동 배치 반영의 p95 시간은 300ms 이내여야 한다.
- **PRF-003**: 성능 측정 방식(입력 규모, 반복 횟수, 측정 구간) MUST be documented.

### Code Convention Requirements *(mandatory)*

- **CCR-001**: 코드 주석은 MUST be written in Korean and explain rationale.
- **CCR-002**: 네이밍 규칙(`PascalCase`, `camelCase`, `UPPER_SNAKE_CASE`, `kebab-case`) MUST be specified.
- **CCR-003**: 폴더 구조는 기능 중심의 단순 계층 원칙 MUST be preserved.

### Key Entities *(include if feature involves data)*

- **FlowLayoutContainerState**: 플로우차트 컨테이너의 배치 방향, 중앙 정렬 상태, 항목 순서 정보를 나타낸다.
- **FlowShapeLayoutItem**: 각 도형의 순서, 크기, 자동 배치 결과(중앙 정렬 기준) 정보를 나타낸다.
- **ConnectorFlowRow**: 인접 도형 사이에서 연결선을 전용 흐름 행으로 렌더링하기 위한 행 단위 정렬 정보를 나타낸다.

### Assumptions

- 사용자는 도형 배치 자체를 수동 조정하지 않고 순서 변경만 수행한다.
- 자동 배치는 화면 폭과 도형 크기에 맞춰 항목 간 겹침이 없도록 계산된다.
- 도형 수 증가 시 컨테이너 높이는 콘텐츠 길이에 맞춰 확장된다.
- 편집/프레젠테이션 화면 모두 절대 위치 기반 예외 레이어를 사용하지 않는다.
- 연결선은 도형 사이 전용 흐름 행으로 표현되며, 편집/프레젠테이션에서 동일한 행 배치 규칙을 사용한다.
- 편집 모드와 프레젠테이션 모드는 동일한 데이터와 동일한 배치 규칙을 공유한다.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 도형 3개 이상 시나리오에서 편집/프레젠테이션 각 10회 측정 시 모든 도형 중심선의 수평 오차가 `<= 1px` 이다.
- **SC-002**: 도형 추가/삭제/순서 변경 시 95% 이상에서 300ms 이내 자동 재배치가 완료된다.
- **SC-003**: 동일 데이터 기준 편집/프레젠테이션 화면 간 배치 불일치율이 5% 미만이다.
- **SC-004**: 사용자 검증에서 정렬 관련 수동 보정 필요 응답 비율이 변경 전 대비 80% 이상 감소한다.
