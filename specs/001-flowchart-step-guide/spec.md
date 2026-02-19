# Feature Specification: 간단 웹 플로우차트 작성기

**Feature Branch**: `001-flowchart-step-guide`  
**Created**: 2026-02-16  
**Status**: Draft  
**Input**: User description: "간단하게 웹으로 플로우 차트 그리는 앱. 가로길이는 300~4000PX, 단축키 눌르면 다음 진행단계라고 알려주게끔, outglow로 확인 가능하게끔 CSS 설정. 도형은 사각형 및 타원 사용. 배경색은 투명 배경색 적용."

## Clarifications

### Session 2026-02-16

- Q: 저장 범위(데이터 보존)는 어디까지 지원해야 하는가? → A: 로컬 저장 + 파일 내보내기/불러오기 지원
- Q: 내보내기/불러오기 파일 형식은 무엇으로 할 것인가? → A: JSON + SVG 내보내기 지원
- Q: “다음 단계” 단축키 정책은 무엇인가? → A: 기본값 N, 사용자 변경 가능
- Q: 마지막 단계 이후 단축키 입력 동작은 무엇인가? → A: 마지막 단계에서 정지
- Q: 파일 불러오기 시 기존 캔버스 처리 방식은 무엇인가? → A: 기존 캔버스와 병합
- Q: 병합 충돌 시 기본 처리 규칙은 무엇인가? → A: 가져온 파일 우선
- Q: 불러오기 파일 크기 상한은 얼마인가? → A: 5MB

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 기본 플로우차트 작성 (Priority: P1)

사용자는 웹 화면에서 플로우차트를 만들기 위해 사각형 또는 타원 도형을 추가하고,
각 도형의 단계 순서를 지정할 수 있다.

**Why this priority**: 플로우차트 작성 기능이 없으면 나머지 기능(단계 이동, 강조 표시)이 성립하지 않는다.

**Independent Test**: 사용자가 빈 화면에서 도형 3개를 추가하고 순서를 저장한 뒤, 새로고침 후에도
도형 목록과 순서가 유지되면 독립적으로 가치가 검증된다.

**Acceptance Scenarios**:

1. **Given** 사용자가 편집 화면에 진입함, **When** 사각형 또는 타원을 추가함, **Then** 도형이 캔버스에 표시된다.
2. **Given** 도형이 2개 이상 존재함, **When** 사용자가 단계 순서를 지정함, **Then** 지정한 순서가 단계 목록으로 저장된다.

---

### User Story 2 - 단축키 기반 다음 단계 안내 (Priority: P2)

사용자는 단축키를 눌러 다음 진행 단계로 이동하고, 현재 단계가 어디인지 즉시 확인할 수 있다.

**Why this priority**: 단계 진행 안내는 플로우차트를 실행/설명하는 핵심 사용자 가치다.

**Independent Test**: 순서가 지정된 도형 3개에서 단축키를 반복 입력했을 때 단계가 1->2->3 순으로 이동하고,
현재 단계 안내 문구가 함께 바뀌면 독립 테스트가 가능하다.

**Acceptance Scenarios**:

1. **Given** 단계 순서가 지정된 도형이 있음, **When** 사용자가 다음 단계 단축키를 누름,
   **Then** 현재 단계가 다음 도형으로 이동하고 단계 안내 문구가 갱신된다.

---

### User Story 3 - 시각 강조 및 레이아웃 제약 준수 (Priority: P3)

사용자는 현재 단계 도형을 outglow 효과로 확인하고, 지정된 캔버스 가로 폭 범위 안에서 편집한다.

**Why this priority**: 시각적 강조와 레이아웃 제한은 사용성 및 요구사항 충족을 결정한다.

**Independent Test**: 캔버스 가로 폭을 최솟값/최댓값으로 설정했을 때 편집이 가능하고,
현재 단계 도형에만 outglow 효과가 적용되면 독립적으로 검증된다.

**Acceptance Scenarios**:

1. **Given** 현재 단계 도형이 존재함, **When** 단계가 변경됨,
   **Then** 새 현재 단계 도형에만 outglow 효과가 적용된다.
2. **Given** 사용자가 캔버스 가로 폭을 입력함, **When** 300~4000 범위를 벗어난 값을 입력함,
   **Then** 시스템은 저장을 거부하고 허용 범위를 안내한다.

---

### Edge Cases

- 단계가 1개뿐인 상태에서 다음 단계 단축키를 누르면 현재 단계를 유지하고 "마지막 단계" 안내를 표시해야 한다.
- 단계 순서가 지정되지 않은 도형만 있을 경우 단축키 입력 시 "진행 순서를 먼저 지정" 안내를 표시해야 한다.
- 가로 폭이 300 또는 4000인 경계값에서도 레이아웃 깨짐 없이 동일 동작을 보장해야 한다.
- 배경이 완전 투명일 때도 도형과 텍스트 식별이 가능해야 한다.
- 지원하지 않는 파일 형식 불러오기 시 시스템은 실패 원인과 지원 형식을 명확히 안내해야 한다.
- 단축키가 브라우저/운영체제 기본 단축키와 충돌하면 사용자가 다른 키로 즉시 변경할 수 있어야 한다.
- 파일 병합 불러오기에서 단계 순서 또는 노드 식별자가 충돌하면 시스템은 충돌 목록을 보여주고 사용자가 해결 방식을 선택할 수 있어야 한다.
- 병합 충돌 해결 대화상자에서 사용자가 선택하지 않으면 기본값으로 가져온 파일 값을 우선 적용해야 한다.
- 5MB를 초과하는 파일을 불러오면 병합을 시작하지 않고 크기 제한 초과 안내를 표시해야 한다.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow users to create flowchart nodes using only rectangle and ellipse shapes.
- **FR-002**: System MUST allow users to assign and update an explicit step order for all nodes.
- **FR-003**: Users MUST be able to trigger "next step" progression via keyboard shortcut input, with default key `N` and user-configurable remapping.
- **FR-004**: System MUST update the active step indicator and show a user-readable message for current progression state.
- **FR-005**: System MUST apply outglow visual emphasis only to the currently active step node.
- **FR-006**: System MUST allow canvas width configuration only within 300px to 4000px inclusive.
- **FR-007**: System MUST keep the canvas background transparent across editing and viewing states.
- **FR-008**: System MUST prevent invalid progression actions (e.g., no ordered steps) and provide corrective feedback.
- **FR-009**: System MUST support diagram file export and import so users can persist and reopen diagrams beyond a single browser session.
- **FR-010**: System MUST support JSON import/export for editable diagram data and SVG export for sharing visual output.
- **FR-011**: System MUST keep progression at the final step when users trigger "next step" after reaching the last ordered node.
- **FR-012**: System MUST merge imported JSON diagrams into the current canvas and provide explicit conflict resolution for duplicate node identities or step-order collisions.
- **FR-013**: System MUST default to imported-file precedence when conflict-resolution choices are not explicitly changed by the user.
- **FR-014**: System MUST reject imports larger than 5MB and provide clear guidance about the size limit.

### UX Consistency Requirements *(mandatory)*

- **UX-001**: 동일한 의미의 안내 문구는 작성 화면과 진행 화면에서 동일한 용어를 사용해야 한다.
- **UX-002**: 다음 단계 안내 문구는 단축키 입력 후 1초 이내에 사용자에게 인지 가능하게 표시되어야 한다.
- **UX-003**: 현재 단계 강조(outglow) 스타일은 모든 도형 타입(사각형/타원)에 동일한 강도로 적용되어야 한다.

### Performance Requirements *(mandatory)*

- **PRF-001**: 사용자 기준에서 단축키 입력 후 단계 전환 결과는 0.3초 이내에 화면에서 확인 가능해야 한다.
- **PRF-002**: 사용자 기준에서 도형 200개까지는 편집/단계 이동 시 체감 지연 없이 동작해야 한다.
- **PRF-003**: 가로 폭 최대값(4000px)에서도 기본 조작(도형 선택, 단계 이동)이 끊김 없이 수행되어야 한다.
- **PRF-004**: 5MB 이하의 지원 파일 불러오기 완료 결과는 사용자 기준 3초 이내에 확인 가능해야 한다.

### Code Convention Requirements *(mandatory)*

- **CCR-001**: 코드 주석은 한국어로 작성하고 의도와 이유를 설명해야 한다.
- **CCR-002**: 식별자 네이밍은 `PascalCase`(타입), `camelCase`(함수/변수), `UPPER_SNAKE_CASE`(상수),
  `kebab-case`(파일/폴더)를 준수해야 한다.
- **CCR-003**: 폴더 구조는 기능 중심의 단순 계층을 유지해야 하며, 불필요한 하위 폴더 분할을 금지한다.

### Assumptions

- 기본 단축키는 `N`으로 가정하며, 동일 기능의 입력 수단은 키보드 1종으로 시작한다.
- 단축키는 사용자 설정에서 변경 가능하며, 설정값은 다이어그램 사용 중 유지된다.
- 단계가 마지막에 도달하면 다음 입력 시 첫 단계로 자동 순환하지 않고 마지막 단계에 머문다.
- 본 기능 범위에는 사용자 계정, 실시간 협업, 서버 동기화 기능을 포함하지 않는다.

### Key Entities *(include if feature involves data)*

- **FlowchartDiagram**: 하나의 플로우차트 문서. 캔버스 폭, 배경 투명 설정, 노드 목록을 가진다.
- **FlowNode**: 개별 단계 도형. 도형 타입(사각형/타원), 표시 텍스트, 단계 순서, 활성 상태를 가진다.
- **StepProgressState**: 현재 진행 위치 정보. 현재 활성 노드, 마지막 단계 여부, 안내 메시지 상태를 가진다.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 신규 사용자의 90% 이상이 5분 이내에 도형 3개 이상의 기본 플로우차트를 작성한다.
- **SC-002**: 테스트 참가자의 95% 이상이 단축키만으로 다음 단계 이동과 현재 단계 확인을 성공한다.
- **SC-003**: 단계 전환 시 현재 단계 outglow 표시 정확도가 99% 이상이다.
- **SC-004**: 캔버스 폭 경계값(300, 4000) 포함 주요 시나리오에서 기능 실패율이 1% 미만이다.
