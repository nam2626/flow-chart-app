# Feature Specification: 도형 관리 및 프레젠테이션 모드

**Feature Branch**: `001-add-reset-delete-presentation`  
**Created**: 2026-02-16  
**Status**: Draft  
**Input**: User description: "도형 초기화 하는 기능, 도형 삭제하는 기능, 프레젠테이션 하는 기능 추가"

## Clarifications

### Session 2026-02-16

- Q: 프레젠테이션 진행 중 삭제/초기화 요청 처리 방식은 무엇인가? → A: 프레젠테이션 중에도 삭제/초기화를 허용하고 즉시 반영한다.
- Q: 전체 초기화 범위는 어디까지인가? → A: 도형/연결/프레젠테이션 상태와 캔버스 설정까지 모두 기본값으로 초기화한다.
- Q: 도형 삭제 후 단계 순서 정책은 무엇인가? → A: 삭제 직후 단계 순서를 자동으로 1..N으로 재정렬한다.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 도형 삭제 및 전체 초기화 (Priority: P1)

사용자는 작성 중인 차트에서 불필요한 단일 도형을 삭제하거나, 전체 도형을 한 번에 초기화할 수 있다.

**Why this priority**: 편집 오류 복구와 재작업 시작은 핵심 작성 흐름의 기본 기능이며,
없으면 차트 수정 비용이 크게 증가한다.

**Independent Test**: 3개 도형이 있는 차트에서 1개 도형 삭제와 전체 초기화를 각각 수행했을 때,
삭제/초기화 결과가 즉시 반영되면 독립 검증 가능하다.

**Acceptance Scenarios**:

1. **Given** 도형이 3개 이상 있는 차트, **When** 사용자가 특정 도형 삭제를 실행하면,
   **Then** 선택된 도형만 제거되고 나머지 도형은 유지되며 단계 순서는 1..N으로 자동 재정렬된다.
2. **Given** 도형이 1개 이상 있는 차트, **When** 사용자가 전체 초기화를 실행하고 확인하면,
   **Then** 모든 도형/연결선/프레젠테이션 상태가 제거되고 캔버스 설정도 기본값으로 초기화된다.

---

### User Story 2 - 프레젠테이션 모드 실행 (Priority: P2)

사용자는 작성된 차트를 발표용으로 전환해 단계 순서대로 도형을 강조 표시하며 진행할 수 있다.

**Why this priority**: 작성 결과를 전달하는 핵심 사용 목적(설명/공유)을 직접 지원한다.

**Independent Test**: 유효한 단계 차트에서 프레젠테이션 모드를 시작하고 다음/이전 단계 이동을
수행했을 때 현재 단계 강조와 진행 상태가 올바르게 갱신되면 독립 검증 가능하다.

**Acceptance Scenarios**:

1. **Given** 단계가 2개 이상인 차트, **When** 사용자가 프레젠테이션 모드를 시작하면,
   **Then** 첫 단계가 강조되고 발표용 화면 상태가 활성화된다.
2. **Given** 프레젠테이션 모드 활성 상태, **When** 사용자가 다음/이전 단계 이동을 실행하면,
   **Then** 강조 대상이 순서에 맞게 변경되고 현재 단계 정보가 갱신된다.

---

### User Story 3 - 프레젠테이션 모드 종료 및 편집 복귀 (Priority: P3)

사용자는 프레젠테이션을 종료하고 기존 편집 상태로 안전하게 돌아올 수 있다.

**Why this priority**: 발표 후 재편집 흐름을 보장해야 작업 연속성이 유지된다.

**Independent Test**: 프레젠테이션 모드에서 종료를 실행했을 때, 편집 UI와 기존 차트 상태가
복원되면 독립 검증 가능하다.

**Acceptance Scenarios**:

1. **Given** 프레젠테이션 모드 활성 상태, **When** 사용자가 종료를 실행하면,
   **Then** 편집 화면으로 복귀하고 도형 데이터는 변경 없이 유지된다.

### Edge Cases

- 도형이 없는 상태에서 도형 삭제를 시도하면 오류 없이 안내 메시지를 보여준다.
- 도형이 없는 상태에서 전체 초기화를 실행하면 상태는 유지되고 중복 동작이 발생하지 않는다.
- 도형이 1개인 상태에서 프레젠테이션 모드를 시작하면 단일 단계만 강조되고 이동 동작은 비활성화된다.
- 프레젠테이션 진행 중 삭제/초기화 요청은 즉시 반영하며, 현재 강조 단계가 유효하지 않으면 다음 유효 단계로 자동 이동한다.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow users to delete a selected shape from the current chart.
- **FR-002**: System MUST allow users to reset all shapes, connections, presentation state, and canvas settings to default values after explicit user confirmation.
- **FR-003**: System MUST keep remaining shapes and automatically reindex step order to 1..N after single-shape deletion.
- **FR-004**: System MUST provide a presentation mode that starts from the first valid step.
- **FR-005**: System MUST let users navigate presentation steps forward and backward.
- **FR-006**: System MUST visually indicate the active presentation step with consistent emphasis.
- **FR-007**: System MUST allow users to exit presentation mode and return to editing without data loss.
- **FR-008**: System MUST provide clear feedback for invalid operations in empty or non-navigable states.
- **FR-009**: System MUST allow shape deletion and full reset during presentation mode and apply the change immediately.

### UX Consistency Requirements *(mandatory)*

- **UX-001**: 도형 삭제/초기화/프레젠테이션 제어 버튼은 기존 툴바 용어 규칙을 따라야 한다.
- **UX-002**: 확인 대화상자와 오류 메시지는 동일한 문장 톤과 피드백 구조를 사용해야 한다.
- **UX-003**: 활성 단계 강조 규칙(색상/외곽선/상태 문구)은 화면 전반에서 동일해야 한다.

### Performance Requirements *(mandatory)*

- **PRF-001**: 50단계 차트에서 단일 도형 삭제 후 화면 갱신 p95는 300ms 이하여야 한다.
- **PRF-002**: 50단계 차트에서 전체 초기화 실행 후 빈 상태 반영 p95는 300ms 이하여야 한다.
- **PRF-003**: 프레젠테이션 단계 전환(다음/이전) 시 강조 반영 p95는 300ms 이하여야 한다.

### Code Convention Requirements *(mandatory)*

- **CCR-001**: 코드 주석은 한글로 작성하고 구현 이유 또는 제약을 설명해야 한다.
- **CCR-002**: 네이밍 규칙은 `PascalCase`, `camelCase`, `UPPER_SNAKE_CASE`, `kebab-case`를 따른다.
- **CCR-003**: 폴더 구조는 기능 중심 단순 계층(`src/features`, `src/components`, `src/store`, `src/utils`)을 유지해야 한다.

### Key Entities *(include if feature involves data)*

- **PresentationSession**: 프레젠테이션 실행 상태. 시작 여부, `currentOrder`, 종료 시각을 가진다.
- **FlowStep**: 차트 단계 도형. 순서, 라벨, 강조 상태를 가진다.
- **ChartStateSnapshot**: 프레젠테이션 시작/종료 시점의 편집 상태 스냅샷.

## Assumptions

- 프레젠테이션 모드는 로그인/권한 분기 없이 단일 사용자 편집 흐름에서 동작한다.
- 전체 초기화는 취소 가능한 확인 단계(확인/취소) 뒤 실행된다.
- 프레젠테이션의 단계 이동은 기존 단계 순서 규칙을 그대로 사용한다.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 사용자 95% 이상이 단일 도형 삭제 또는 전체 초기화를 10초 이내에 완료한다.
- **SC-002**: 프레젠테이션 모드 시작 성공률이 99% 이상이다.
- **SC-003**: 프레젠테이션 단계 이동 작업의 첫 시도 성공률이 95% 이상이다.
- **SC-004**: 삭제/초기화/프레젠테이션 관련 사용자 오류 보고 건수가 배포 후 2주 내 50% 이상 감소한다.
