# Feature Specification: 다중 도형 스타일 및 프레젠테이션 가시성 개선

**Feature Branch**: `001-fix-presentation-visuals`  
**Created**: 2026-02-16  
**Status**: Draft  
**Input**: User description: "첫번째 도형만 색상 지정되고 있음, 모든 도형에 배경색, 테두리색 지정 가능해야함. 프레젠테이션 시작하면 프레젠테이션 화면에 화살표가 안나옴. 도형 글자크기 1.3em으로 크기를 좀더 키울것. 박스 그림자 효과 지금의 2배로 넓게 지정할것, UI 효과로 강조효과처럼 나타나야됨."

## Clarifications

### Session 2026-02-16

- Q: 프레젠테이션 화살표 시작/종료 좌표 기준은 무엇인가? → A: 시작 도형 경계에서 시작하고 종료 도형 경계 직전에서 끝난다.
- Q: 텍스트/그림자 2배 요구의 기준선은 어떻게 정의할까? → A: 기준선 수치를 고정한다(텍스트 1.0em→1.3em, 그림자 강조 파라미터 baseline 고정).
- Q: 그림자 2배를 어떤 방식으로 적용할까? → A: 활성 도형 그림자는 blur와 spread를 각각 기존의 2배로 확장하고 opacity는 유지한다.
- Q: 도형 색상 유지 범위는 어디까지인가? → A: 색상 상태는 브라우저 로컬 저장소 기준으로 유지하며, 문서와 무관하게 최근 상태를 복원한다.
- Q: 문서와 무관한 색상 복원 매핑 기준은 무엇인가? → A: 도형 고유 ID 기준으로 복원한다.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 모든 도형 개별 색상 지정 (Priority: P1)

편집자는 첫 번째 도형뿐 아니라 모든 도형에 대해 배경색과 테두리색을 각각 지정하고 유지되길 원한다.

**Why this priority**: 색상 지정이 일부 도형에서만 동작하면 기본 편집 기능 자체가 깨지므로 가장 먼저 복구되어야 한다.

**Independent Test**: 3개 이상 도형 각각에 서로 다른 배경색/테두리색을 적용하고 저장 후 다시 열어도 각 도형 색상이 그대로 유지되면 통과.

**Acceptance Scenarios**:

1. **Given** 편집 화면에 여러 도형이 존재할 때, **When** 사용자가 각 도형 색상을 변경하면, **Then** 선택한 도형별로 배경색과 테두리색이 즉시 반영된다.
2. **Given** 여러 도형에 색상이 지정된 상태에서, **When** 화면을 새로고침하거나 재진입하면, **Then** 브라우저 로컬 저장 상태 기준으로 최근 도형별 배경색/테두리색이 복원된다.

---

### User Story 2 - 프레젠테이션 화살표 가시화 복구 (Priority: P2)

발표자는 프레젠테이션 시작 시 도형 간 흐름 화살표가 정상적으로 보이길 원한다.

**Why this priority**: 화살표가 보이지 않으면 단계 흐름 전달이 불가능해져 발표 기능 가치가 크게 감소한다.

**Independent Test**: 2개 이상 도형으로 프레젠테이션 시작 시, 모든 인접 도형 쌍에서 화살표가 시작 도형 경계에서 시작해 종료 도형 경계 직전에서 끝나며 시각적으로 확인되면 통과.

**Acceptance Scenarios**:

1. **Given** 프레젠테이션 시작 가능한 도형 흐름이 있을 때, **When** 프레젠테이션을 시작하면, **Then** 각 단계 사이 연결 화살표가 누락 없이 렌더링되고 시작/종료점은 도형 경계 규칙을 따른다.
2. **Given** 화면 크기가 달라지는 상황에서, **When** 프레젠테이션이 표시되면, **Then** 화살표는 도형 정렬에 맞춰 계속 가시 상태를 유지한다.

---

### User Story 3 - 강조 스타일 가독성 강화 (Priority: P3)

발표자는 도형 텍스트가 더 크게 보이고, 활성 도형의 그림자 강조가 현재보다 더 넓고 강하게 보이길 원한다.

**Why this priority**: 발표 중 핵심 단계의 시인성을 높여 메시지 전달 속도와 이해도를 개선한다.

**Independent Test**: 프레젠테이션에서 도형 텍스트 크기가 1.0em에서 1.3em으로 증가하고, 활성 도형 그림자 blur와 spread가 각각 기준값의 2배로 확장되며 opacity는 유지되어 강조 상태가 명확히 구분되면 통과.

**Acceptance Scenarios**:

1. **Given** 프레젠테이션 화면에서 도형이 표시될 때, **When** 사용자가 내용을 읽으면, **Then** 도형 텍스트는 1.3em 크기로 표시된다.
2. **Given** 특정 도형이 활성 상태일 때, **When** 강조 효과가 적용되면, **Then** 그림자 blur와 spread는 각각 기준값의 2배로 확장되고 opacity는 유지되며 비활성 도형과 시각적으로 구분된다.

---

### Edge Cases

- 도형 수가 1개인 경우에도 색상 지정 UI는 정상 동작해야 한다.
- 색상 입력이 비정상 값인 경우 시스템 기본 색상으로 안전하게 대체해야 한다.
- 프레젠테이션 시작 직후 단계가 변경되어도 화살표가 사라지지 않고 도형 경계 기준 연결을 유지해야 한다.
- 다수 도형(예: 50개)에서도 텍스트 확대와 그림자 강조가 겹침 없이 유지되어야 한다.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow users to set fill color and border color for every shape independently.
- **FR-002**: System MUST persist per-shape fill and border colors in browser-local storage and restore the most recent state across refresh and reopen regardless of document context, using stable shape IDs for mapping.
- **FR-003**: System MUST render connector arrows in presentation mode for every adjacent shape pair, starting from the source shape boundary and ending just before the target shape boundary.
- **FR-004**: System MUST maintain arrow visibility and boundary-based connector geometry after presentation starts and while step navigation continues.
- **FR-005**: System MUST set presentation shape text size to 1.3em (baseline 1.0em).
- **FR-006**: System MUST set active-shape shadow blur and spread to 2x of baseline values while keeping opacity unchanged to create stronger emphasis.
- **FR-007**: System MUST keep non-active shapes visually distinguishable from active emphasized shapes.

### UX Consistency Requirements *(mandatory)*

- **UX-001**: 동일 목적 UI 요소의 용어/상호작용/피드백 규칙 MUST be consistent across screens.
- **UX-002**: 오류 메시지, 버튼 라벨, 검증 메시지 문구 규칙 MUST reference existing patterns.
- **UX-003**: 신규 UX 패턴 도입 시 MUST document reason and migration impact.

### Performance Requirements *(mandatory)*

- **PRF-001**: 프레젠테이션 시작 후 화살표 렌더링 완료까지 p95 시간은 300ms 이내여야 한다.
- **PRF-002**: 50개 도형 기준 스타일(텍스트/그림자) 갱신 반영 p95 시간은 300ms 이내여야 한다.
- **PRF-003**: 성능 측정 방식(입력 크기, 반복 횟수, 측정 구간) MUST be documented.

### Code Convention Requirements *(mandatory)*

- **CCR-001**: 코드 주석은 MUST be written in Korean and explain rationale.
- **CCR-002**: 네이밍 규칙(`PascalCase`, `camelCase`, `UPPER_SNAKE_CASE`, `kebab-case`) MUST be specified.
- **CCR-003**: 폴더 구조는 기능 중심의 단순 계층 원칙 MUST be preserved.

### Key Entities *(include if feature involves data)*

- **ShapeVisualStyle**: 도형별 배경색/테두리색과 강조 관련 시각 속성을 표현하며, 색상 복원 매핑 키로 도형 고유 ID를 포함한다.
- **PresentationConnectorState**: 프레젠테이션에서 도형 간 화살표 표시 상태와 연결 정합성을 표현한다.
- **PresentationTypographyProfile**: 프레젠테이션 텍스트 확대 배율 기준과 표시 상태를 표현한다.

### Assumptions

- 기존 편집/프레젠테이션 기본 흐름(시작, 다음/이전, 종료)은 유지된다.
- 텍스트 확대 기준선은 1.0em으로 고정한다.
- 그림자 blur/spread 기준선은 기존 기본 강조 스타일의 값을 기준으로 고정하고, 적용 시 각 값을 2배로 확장하며 opacity는 유지한다.
- 도형 색상 복원 기준은 문서 단위가 아니라 브라우저 로컬의 최근 상태를 따른다.
- 색상 복원 시 도형 식별은 화면 순서가 아니라 고유 ID를 기준으로 한다.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 사용자는 3개 이상의 도형에 각기 다른 배경색/테두리색을 지정하고 저장 후 재진입해도 100% 동일하게 확인할 수 있다.
- **SC-002**: 프레젠테이션 시작 시 95% 이상 시도에서 300ms 이내에 연결 화살표가 화면에 표시된다.
- **SC-003**: 사용자 검증 시나리오에서 화살표 누락 보고율이 5% 미만이다.
- **SC-004**: 발표 가독성 평가에서 텍스트/강조 시인성 만족 응답 비율이 기존 대비 30% 이상 향상된다.
