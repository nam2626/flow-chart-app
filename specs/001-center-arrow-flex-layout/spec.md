# Feature Specification: 화살표 중앙 정렬 세로 레이아웃

**Feature Branch**: `001-center-arrow-flex-layout`  
**Created**: 2026-02-16  
**Status**: Draft  
**Input**: User description: "현재 문제는 화살표가 가운데로 안오는 거야. 플로우차트의 방향은 아래로만 이동하니까, 플로우차트 레이아웃을 플렉스로 잡아서 세로배치형으로 바꾸고 flex 박스의 교차축 정렬을 가운데로 해서 표시하게끔 바꿔."

## Clarifications

### Session 2026-02-16

- Q: 세로 중앙 정렬 레이아웃에서 수동 위치 이동을 허용할지 여부 → A: 모든 도형은 자동 세로 스택과 교차축 중앙 정렬을 강제하고 수동 x/y 이동은 허용하지 않는다.
- Q: 도형 간 세로 간격 정책(고정/동적) → A: 도형 높이/텍스트 길이를 고려한 동적 간격으로 배치하되 화살표와 도형 겹침이 없어야 한다.
- Q: 세로 중앙 정렬 규칙 적용 범위(전체/신규/선택형) → A: 모든 플로우차트에 세로 스택과 화살표 중앙 정렬 규칙을 공통으로 강제 적용한다.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 세로 흐름 중앙 정렬 표시 (Priority: P1)

사용자는 플로우차트가 위에서 아래로 진행되는 세로 흐름으로 보이고, 각 단계 연결 화살표가 항상 도형의 가로 중앙에 맞춰 표시되기를 원한다.

**Why this priority**: 화살표와 도형 중심이 맞지 않으면 단계 관계 해석이 어려워 기본 가독성이 깨진다.

**Independent Test**: 3개 이상 도형을 생성했을 때 레이아웃이 세로 흐름으로 유지되고, 모든 인접 화살표의 시작/종료 x좌표가 각 도형 중심 x좌표와 0px 오차로 일치하면 통과.

**Acceptance Scenarios**:

1. **Given** 도형이 2개 이상 존재할 때, **When** 화면이 렌더링되면, **Then** 도형은 위에서 아래로 배치되고 교차축 기준 중앙 정렬 상태를 유지한다.
2. **Given** 인접 도형 간 연결이 존재할 때, **When** 화살표가 표시되면, **Then** 화살표 시작점과 끝점은 각 도형 가로 중심 기준으로 정렬된다.

---

### User Story 2 - 변경 후에도 중앙 정렬 유지 (Priority: P2)

사용자는 도형을 추가, 삭제, 순서 변경해도 세로 배치와 화살표 중앙 정렬이 자동으로 유지되기를 원한다.

**Why this priority**: 편집 중 정렬이 흔들리면 반복 수정이 발생하고 사용성이 급격히 떨어진다.

**Independent Test**: 도형 추가/삭제/순서 변경 직후에도 세로 흐름이 유지되고 각 화살표의 x좌표 정렬 기준이 변하지 않으면 통과.

**Acceptance Scenarios**:

1. **Given** 기존 플로우차트가 있을 때, **When** 사용자가 도형을 추가하거나 삭제하면, **Then** 세로 배치와 화살표 중앙 정렬이 즉시 재적용된다.
2. **Given** 단계 순서를 변경할 때, **When** 화면이 다시 표시되면, **Then** 변경된 순서 기준으로 세로 흐름과 중앙 정렬이 유지된다.

---

### User Story 3 - 화면 유형 간 일관 표시 (Priority: P3)

사용자는 편집 화면과 프레젠테이션 화면 모두에서 같은 세로 배치와 화살표 중앙 정렬 규칙을 보기를 원한다.

**Why this priority**: 화면별 규칙이 다르면 발표 시 오해가 생기고 신뢰도가 낮아진다.

**Independent Test**: 동일 데이터로 편집/프레젠테이션 화면을 비교했을 때 배치 방향과 화살표 정렬 결과가 동일하면 통과.

**Acceptance Scenarios**:

1. **Given** 동일한 플로우차트 데이터가 있을 때, **When** 편집 화면과 프레젠테이션 화면을 전환하면, **Then** 두 화면 모두 세로 배치와 중앙 정렬 결과가 일치한다.

---

### Edge Cases

- 도형이 1개만 있을 때는 화살표 없이도 도형이 중앙 정렬 상태로 안정적으로 표시되어야 한다.
- 도형 폭이 서로 크게 달라도 화살표는 각 도형 가로 중심 기준 정렬을 유지해야 한다.
- 도형 높이와 텍스트 길이가 크게 달라져도 인접 도형과 화살표가 서로 겹치지 않아야 한다.
- 단계 수가 많아지는 경우에도 세로 흐름 순서와 중앙 정렬 규칙이 깨지지 않아야 한다.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display flowchart steps in a vertical top-to-bottom sequence.
- **FR-002**: System MUST compute and render step containers as center-aligned on the cross axis of a vertical auto-stack layout.
- **FR-003**: System MUST render each connector start/end point at the horizontal center of its source/target step.
- **FR-004**: System MUST trigger layout recomputation after add/delete/reorder actions and MUST preserve no-manual x/y override policy.
- **FR-005**: System MUST keep the same layout and connector alignment rule across edit and presentation screens.
- **FR-006**: System MUST calculate vertical spacing dynamically based on shape height/content so that adjacent shapes and connectors do not overlap.
- **FR-007**: System MUST apply the vertical stack and connector center-alignment rule to all flowcharts, including existing and newly created ones.

### UX Consistency Requirements *(mandatory)*

- **UX-001**: 동일 목적 UI 요소의 용어/상호작용/피드백 규칙 MUST be consistent across screens.
- **UX-002**: 오류 메시지, 버튼 라벨, 검증 메시지 문구 규칙 MUST reference existing patterns.
- **UX-003**: 신규 UX 패턴 도입 시 MUST document reason and migration impact.

### Performance Requirements *(mandatory)*

- **PRF-001**: 편집 화면에서 도형 변경 후 레이아웃/화살표 재정렬의 p95 반영 시간은 300ms 이내여야 한다.
- **PRF-002**: 프레젠테이션 시작 시 세로 배치와 화살표 정렬 완료의 p95 시간은 300ms 이내여야 한다.
- **PRF-003**: 성능 측정 방식(입력 규모, 반복 횟수, 측정 구간) MUST be documented.

### Code Convention Requirements *(mandatory)*

- **CCR-001**: 코드 주석은 MUST be written in Korean and explain rationale.
- **CCR-002**: 네이밍 규칙(`PascalCase`, `camelCase`, `UPPER_SNAKE_CASE`, `kebab-case`) MUST be specified.
- **CCR-003**: 폴더 구조는 기능 중심의 단순 계층 원칙 MUST be preserved.

### Key Entities *(include if feature involves data)*

- **VerticalLayoutState**: 도형의 세로 순서, 교차축 중앙 정렬 상태를 나타내는 배치 상태.
- **ConnectorCenterAlignment**: 인접 도형 간 화살표 시작/종료 중심 좌표와 정렬 검증 결과를 나타내는 상태.

### Assumptions

- 플로우차트 진행 방향은 상단에서 하단으로 단방향 진행을 기본으로 한다.
- 중앙 정렬 요구는 화살표와 도형 배치 표시에 적용되며 도형 내용 자체는 변경하지 않는다.
- 편집 화면과 프레젠테이션 화면은 동일한 배치/정렬 기준을 공유한다.
- 도형의 수동 x/y 위치 편집은 허용하지 않고 자동 세로 스택 배치를 항상 우선한다.
- 레이아웃 규칙은 기존 데이터에도 동일하게 적용되며 사용자 선택형 모드는 제공하지 않는다.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 검증 시나리오에서 인접 화살표 시작/종료 x좌표가 각 도형 중심 x좌표와 0px 오차로 100% 일치한다.
- **SC-002**: 95% 이상 시도에서 도형 변경 후 300ms 이내 세로 배치 및 화살표 정렬이 반영된다.
- **SC-003**: 편집/프레젠테이션 화면 간 배치/정렬 불일치 보고율이 5% 미만이다.
- **SC-004**: 사용자 검증에서 흐름 가독성 만족 응답 비율이 변경 전 대비 20% 이상 향상된다.
