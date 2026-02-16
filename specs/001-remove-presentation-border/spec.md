# Feature Specification: Remove Presentation Border

**Feature Branch**: `001-remove-presentation-border`  
**Created**: 2026-02-16  
**Status**: Draft  
**Input**: User description: "프레젠테이션 모드에서 플로우 차트 컨테이너 테두리 제거."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Presentation Focused View (Priority: P1)

발표자는 프레젠테이션 모드에서 플로우차트만 깔끔하게 보여야 하며, 컨테이너 테두리가 보이지 않아야 한다.

**Why this priority**: 프레젠테이션 사용 경험의 핵심 품질이며 즉시 시각적 완성도에 영향을 준다.

**Independent Test**: 프레젠테이션 모드 진입 후 플로우차트 외곽에 선형 테두리(실선/점선/그림자 경계선)가 렌더링되지 않는지 확인하면 독립 검증 가능하다.

**Acceptance Scenarios**:

1. **Given** 편집 완료된 플로우차트가 있고, **When** 사용자가 프레젠테이션 모드로 전환하면, **Then** 플로우차트 컨테이너 테두리는 표시되지 않는다.
2. **Given** 프레젠테이션 모드에서 여러 단계 노드를 탐색 중이고, **When** 단계를 이동해도, **Then** 컨테이너 테두리는 계속 표시되지 않는다.

---

### User Story 2 - Consistent Presentation Appearance (Priority: P2)

발표자는 프레젠테이션 모드 진입/종료를 반복해도 컨테이너 테두리 없는 표시 규칙이 일관되게 유지되길 원한다.

**Why this priority**: 반복 사용 시 일관성이 깨지면 UI 신뢰도가 떨어지고 버그로 인식된다.

**Independent Test**: 프레젠테이션 모드 진입/종료를 10회 반복하여 동일하게 테두리 미표시 상태가 유지되는지 검증한다.

**Acceptance Scenarios**:

1. **Given** 사용자가 편집 모드와 프레젠테이션 모드를 반복 전환하고, **When** 다시 프레젠테이션 모드에 진입하면, **Then** 컨테이너 테두리는 항상 표시되지 않는다.

---

### User Story 3 - Existing Flowchart Usability Preserved (Priority: P3)

사용자는 테두리 제거 이후에도 기존 플로우차트 읽기 흐름과 조작성에 변화가 없길 원한다.

**Why this priority**: 시각 개선으로 기존 사용성이 손상되면 기능 회귀가 된다.

**Independent Test**: 프레젠테이션 모드에서 이전/다음 단계 이동과 강조 표시가 기존과 동일하게 동작하는지 확인한다.

**Acceptance Scenarios**:

1. **Given** 프레젠테이션 모드에서 플로우차트가 표시 중이고, **When** 사용자가 단계 이동을 수행하면, **Then** 단계 이동/강조 동작은 정상 동작하며 테두리만 제거된 상태를 유지한다.

### Edge Cases

- 프레젠테이션 모드에 진입했지만 표시할 노드가 0개인 경우에도 컨테이너 테두리는 표시되지 않아야 한다.
- 프레젠테이션 모드 전용 스타일 로딩이 지연되더라도 최종 렌더 결과에 컨테이너 테두리가 남아 있으면 안 된다.
- 화면 크기 변경(리사이즈) 후에도 컨테이너 테두리 미표시 상태가 유지되어야 한다.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST remove visible border styling from the flowchart container in presentation mode.
- **FR-002**: System MUST keep border removal applied for the entire presentation session, including step navigation updates.
- **FR-003**: System MUST preserve existing presentation interactions while applying border removal.
- **FR-004**: System MUST apply the same borderless presentation rule after repeated mode toggles.
- **FR-005**: System MUST ensure empty-state presentation view also renders without a flowchart container border.

### UX Consistency Requirements *(mandatory)*

- **UX-001**: 동일 목적 UI 요소의 용어/상호작용/피드백 규칙 MUST be consistent across screens.
- **UX-002**: 오류 메시지, 버튼 라벨, 검증 메시지 문구 규칙 MUST reference existing patterns.
- **UX-003**: 신규 UX 패턴 도입 시 MUST document reason and migration impact.

### Performance Requirements *(mandatory)*

- **PRF-001**: 10개 노드 기준 시나리오에서 프레젠테이션 모드 진입 p95 완료 시간이 300ms 이하여야 한다.
- **PRF-002**: 10개 노드 기준 시나리오에서 프레젠테이션 단계 이동 p95 완료 시간이 150ms 이하이며, 육안 확인 가능한 깜빡임 회귀가 없어야 한다.
- **PRF-003**: 성능 측정 방식(입력 시나리오, 반복 횟수, 비교 기준) MUST be documented.

### Code Convention Requirements *(mandatory)*

- **CCR-001**: 코드 주석은 MUST be written in Korean and explain rationale.
- **CCR-002**: 네이밍 규칙(`PascalCase`, `camelCase`, `UPPER_SNAKE_CASE`, `kebab-case`) MUST be specified.
- **CCR-003**: 폴더 구조는 기능 중심의 단순 계층 원칙 MUST be preserved.

### Key Entities *(include if feature involves data)*

- **Presentation Flowchart Container**: 프레젠테이션 모드에서 플로우차트를 감싸는 시각적 래퍼 요소. 주요 속성은 표시 모드 상태와 경계선 표시 여부다.
- **Presentation Mode State**: 프레젠테이션 진입/종료 및 단계 이동 중 UI 규칙을 결정하는 상태 정보.

### Assumptions

- 편집 모드의 컨테이너 스타일은 이번 범위에서 변경하지 않는다.
- 테두리 제거 대상은 프레젠테이션 모드의 플로우차트 컨테이너이며, 개별 노드 스타일은 유지한다.
- 기존 단축키/단계 이동/강조 표시 로직은 그대로 유지한다.
- UX 패턴 변경 사유: 발표 가독성 향상을 위해 프레젠테이션 컨테이너 테두리 규칙을 `항상 숨김`으로 통일한다.
- UX 마이그레이션 영향: 기존 사용자 동작 플로우는 유지되고 시각 경계선만 제거된다.
## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 프레젠테이션 모드 진입 후 100%의 검증 케이스에서 플로우차트 컨테이너 테두리가 보이지 않는다.
- **SC-002**: 모드 전환 반복 10회 테스트에서 테두리 재노출 회귀가 0건이다.
- **SC-003**: 프레젠테이션 단계 이동 핵심 시나리오 성공률이 100%를 유지한다.
- **SC-004**: 사용자 검수에서 "발표 화면이 더 깔끔해졌다" 항목이 최소 90% 이상 긍정 평가를 받는다.

