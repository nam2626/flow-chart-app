# Feature Specification: 화살표 수평 중앙 정렬

**Feature Branch**: `001-center-arrow-alignment`  
**Created**: 2026-02-16  
**Status**: Draft  
**Input**: User description: "프레젠테이션 및 편집 화면에서 화살표만 도형 수평 기준 가운데로 오게끔 배치."

## Clarifications

### Session 2026-02-16

- Q: 수평 중앙 정렬의 적용 범위는 x축만인가, x/y 모두인가? → A: x축만 도형 중심으로 고정하고 y축은 기존 경계 시작/종료 규칙을 유지한다.
- Q: 중앙 정렬 판정의 x좌표 허용 오차는 얼마인가? → A: 허용 오차 없이 0px 완전 일치여야 한다.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 편집 화면 화살표 중앙 정렬 (Priority: P1)

편집자는 도형 간 연결 화살표가 각 도형의 수평 중앙선을 기준으로 정렬되어 흐름을 쉽게 읽고 싶다.

**Why this priority**: 편집 단계에서 화살표 위치가 흔들리면 도형 구조를 수정하기 어렵고 전체 흐름 이해가 떨어진다.

**Independent Test**: 편집 화면에서 3개 이상 도형을 배치했을 때, 모든 인접 도형 화살표의 시작/종료 x좌표가 각 도형 중심 x좌표와 0px 오차로 완전 일치하고 y좌표는 기존 경계 시작/종료 규칙을 유지하면 통과.

**Acceptance Scenarios**:

1. **Given** 편집 화면에 도형이 2개 이상 있을 때, **When** 사용자가 도형을 추가하거나 순서를 변경하면, **Then** 각 연결 화살표는 시작/종료 x좌표를 도형 수평 중앙 기준으로 재정렬하고 y좌표는 기존 경계 규칙을 유지한다.
2. **Given** 도형 폭이 서로 다른 경우, **When** 화살표가 렌더링되면, **Then** 화살표는 각 도형의 가로 중심선을 기준으로 연결된다.

---

### User Story 2 - 프레젠테이션 화면 화살표 중앙 정렬 (Priority: P2)

발표자는 프레젠테이션 모드에서 화살표가 도형 중심 기준으로 정렬되어 흐름을 명확히 전달하고 싶다.

**Why this priority**: 발표 화면에서 화살표가 비정렬이면 전달력이 떨어지고 단계 관계가 오해될 수 있다.

**Independent Test**: 프레젠테이션 시작 후 화살표의 시작/종료 x좌표가 표시된 각 도형 중심 x좌표와 0px 오차로 완전 일치하고 y좌표는 기존 경계 시작/종료 규칙을 유지하면 통과.

**Acceptance Scenarios**:

1. **Given** 프레젠테이션 시작 가능한 도형 흐름이 있을 때, **When** 프레젠테이션을 시작하면, **Then** 모든 화살표는 x축에서 도형 수평 중앙 기준으로 표시되고 y축에서는 기존 경계 규칙을 유지한다.
2. **Given** 프레젠테이션 단계가 변경될 때, **When** 다음/이전 단계로 이동하면, **Then** 화살표 중앙 정렬 규칙이 계속 유지된다.

---

### User Story 3 - 중앙 정렬 규칙 일관 유지 (Priority: P3)

운영자는 편집과 프레젠테이션 화면 모두에서 동일한 중앙 정렬 규칙이 유지되길 원한다.

**Why this priority**: 화면별 규칙이 다르면 사용자 학습 비용이 증가하고 오류 신고가 반복된다.

**Independent Test**: 동일한 도형 데이터로 편집 화면과 프레젠테이션 화면을 비교했을 때 화살표 수평 정렬 기준이 일치하면 통과.

**Acceptance Scenarios**:

1. **Given** 동일한 도형 배치 데이터가 있을 때, **When** 편집 화면과 프레젠테이션 화면을 번갈아 확인하면, **Then** 화살표 중앙 정렬 결과가 동일하다.

---

### Edge Cases

- 도형이 1개인 경우 화살표를 표시하지 않으며 레이아웃이 깨지지 않아야 한다.
- 도형 폭이 매우 작거나 큰 경우에도 화살표는 도형 가로 중심 기준을 유지해야 한다.
- 단계 순서가 빠르게 변경되는 경우에도 화살표 중앙 정렬은 사용자 입력 이후 300ms 이내에 반영되어야 한다.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST render edit-screen connectors using each shape's horizontal center as the x-axis alignment anchor while preserving existing y-axis boundary start/end rules.
- **FR-002**: System MUST render presentation-screen connectors using each shape's horizontal center as the x-axis alignment anchor while preserving existing y-axis boundary start/end rules.
- **FR-003**: System MUST keep the same connector horizontal-center rule across edit and presentation screens.
- **FR-004**: System MUST recompute connector alignment when shape order or size changes.
- **FR-005**: System MUST keep connector visibility and alignment intact during presentation step navigation.

### UX Consistency Requirements *(mandatory)*

- **UX-001**: 동일 목적 UI 요소의 용어/상호작용/피드백 규칙 MUST be consistent across screens.
- **UX-002**: 오류 메시지, 버튼 라벨, 검증 메시지 문구 규칙 MUST reference existing patterns.
- **UX-003**: 신규 UX 패턴 도입 시 MUST document reason and migration impact.

### Performance Requirements *(mandatory)*

- **PRF-001**: 편집 화면에서 화살표 재정렬 반영 시간의 p95는 300ms 이내여야 한다.
- **PRF-002**: 프레젠테이션 시작 후 화살표 중앙 정렬 완료 시간의 p95는 300ms 이내여야 한다.
- **PRF-003**: 성능 측정 방식(입력 규모, 반복 횟수, 측정 구간) MUST be documented.
- **PRF-004**: 중앙 정렬 검증은 x좌표 오차 허용 0px 기준으로 측정되어야 한다.
- **PRF-005**: 최대 50개 도형 입력에서 PRF-001/002 성능 기준을 동일하게 만족해야 한다.

### Code Convention Requirements *(mandatory)*

- **CCR-001**: 코드 주석은 MUST be written in Korean and explain rationale.
- **CCR-002**: 네이밍 규칙(`PascalCase`, `camelCase`, `UPPER_SNAKE_CASE`, `kebab-case`) MUST be specified.
- **CCR-003**: 폴더 구조는 기능 중심의 단순 계층 원칙 MUST be preserved.

### Key Entities *(include if feature involves data)*

- **ConnectorAlignmentState**: 화살표 시작/종료 좌표와 수평 중앙 정렬 기준 적용 결과를 표현한다.
- **ShapeLayoutSnapshot**: 도형의 위치/크기/순서 정보를 기반으로 화살표 정렬 계산 입력을 표현한다.

### Assumptions

- 도형의 수평 중심은 `도형 왼쪽 좌표 + 도형 폭의 1/2` 기준으로 계산된다.
- 중앙 정렬 규칙은 화살표에만 적용되며 도형 자체 배치 규칙은 변경하지 않는다.
- 편집 화면과 프레젠테이션 화면은 동일한 정렬 규칙을 공유한다.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 편집 화면 검증 시나리오에서 화살표 시작/종료 x좌표와 도형 중심 x좌표가 0px 오차로 100% 일치한다.
- **SC-002**: 프레젠테이션 시작 시 95% 이상 시도에서 300ms 이내에 중앙 정렬된 화살표가 표시된다.
- **SC-003**: 화면 전환(편집↔프레젠테이션) 비교 검증에서 정렬 규칙 불일치 보고율이 5% 미만이다.
- **SC-004**: 동일 사용자 집단(최소 20명)을 대상으로 한 5점 척도 설문에서, 중앙 정렬 적용 후 가독성 만족(4점 이상) 응답 비율이 적용 전 대비 20% 이상 향상된다.
