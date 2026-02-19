# Tasks: Flowchart UI Redesign

**Input**: Design documents from `D:\workspace\flowchart-app\specs\001-flowchart-ui-redesign\`
**Prerequisites**: `plan.md` (required), `spec.md` (required), `research.md`, `data-model.md`, `contracts/`

**Tests**: 테스트 작업은 필수다. 모든 사용자 스토리는 최소 단위 테스트를 포함하고, 사용자 흐름 변경은 통합/E2E 테스트를 포함한다.

**Organization**: Tasks are grouped by user story so each story can be implemented and tested independently.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 리디자인 검증 기준과 공통 작업 베이스를 준비한다.

- [X] T001 Create manual parity checklist skeleton in specs/001-flowchart-ui-redesign/checklists/ui-regression.md
- [X] T002 [P] Create visual rule checklist aligned to reference in specs/001-flowchart-ui-redesign/checklists/ui-visual-rules.md
- [X] T003 [P] Define edit-mode section constants in src/features/flowchart/models/editor-layout-sections.ts
- [X] T004 [P] Add layout assertion helper fixture in tests/helpers/editor-layout-fixture.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 모든 사용자 스토리에 공통으로 필요한 기반을 먼저 고정한다.

**CRITICAL**: No user story work can begin until this phase is complete.

- [X] T005 [P] Extend flow layout container mode invariants test in tests/unit/flow-layout-stack.spec.ts
- [X] T006 [P] Add edit-mode structure baseline integration test in tests/integration/editor-layout-structure.integration.spec.ts
- [X] T007 [P] Add relative performance baseline assertion for redesign path in tests/integration/performance-budget.spec.ts
- [X] T008 Implement section wrappers for toolbar/left/workspace/right regions in src/features/flowchart/components/diagram-canvas.tsx
- [X] T009 Update shared UX copy for editor section labels in src/features/flowchart/models/ux-copy.ts
- [X] T010 Keep toolbar control grouping stable under new wrappers in src/features/flowchart/components/diagram-toolbar.tsx

**Checkpoint**: Foundation ready - user story work can proceed.

---

## Phase 3: User Story 1 - Professional Editing Layout (Priority: P1)

**Goal**: 편집 모드를 시안 정보 구조(상단/좌/중/우)로 재배치하면서 기존 기능 접근성을 유지한다.

**Independent Test**: 편집 모드 진입 시 4개 영역이 모두 렌더링되고 캔버스 폭/내보내기/단계 선택이 그대로 동작한다.

### Tests for User Story 1

- [X] T011 [P] [US1] Add unit rendering test for editor area composition in tests/unit/diagram-canvas-layout.spec.ts
- [X] T012 [P] [US1] Add integration test for canvas-width and export control accessibility in tests/integration/editor-controls-accessibility.integration.spec.ts

### Implementation for User Story 1

- [X] T013 [US1] Recompose edit-mode shell into top-left-center-right layout in src/features/flowchart/components/diagram-canvas.tsx
- [X] T014 [P] [US1] Move step ordering UI into left rail section container in src/features/flowchart/components/step-order-panel.tsx
- [X] T015 [P] [US1] Place shortcut/progression/property blocks into right rail region in src/features/flowchart/components/shortcut-settings.tsx
- [X] T016 [US1] Preserve centered workspace and node editing behavior under new shell in src/features/flowchart/components/flow-layout-stack.tsx
- [X] T017 [US1] Add safe default properties placeholder for no selection state in src/features/flowchart/components/diagram-canvas.tsx

**Checkpoint**: User Story 1 is independently functional and testable.

---

## Phase 4: User Story 2 - Visual Consistency With Reference (Priority: P2)

**Goal**: 픽셀 강제가 아닌 구조/위계/간격 규칙 기준으로 시안 일관성을 확보한다.

**Independent Test**: 핵심 시각 규칙 체크리스트 항목의 95% 이상이 편집 모드에서 충족된다.

### Tests for User Story 2

- [X] T018 [P] [US2] Add unit tests for visual rule token mapping in tests/unit/editor-visual-rules.spec.ts
- [X] T019 [P] [US2] Add integration test for heading/panel hierarchy consistency in tests/integration/editor-visual-consistency.integration.spec.ts

### Implementation for User Story 2

- [X] T020 [US2] Define visual rule tokens for spacing/hierarchy/alignment in src/features/flowchart/models/editor-visual-rules.ts
- [X] T021 [US2] Apply visual tokens to top toolbar headings and controls in src/features/flowchart/components/diagram-toolbar.tsx
- [X] T022 [P] [US2] Apply visual tokens to left rail list/labels in src/features/flowchart/components/step-order-panel.tsx
- [X] T023 [P] [US2] Apply visual tokens to workspace frame and section spacing in src/features/flowchart/components/flow-layout-stack.tsx
- [X] T024 [US2] Record visual inspection criteria and evidence fields in specs/001-flowchart-ui-redesign/checklists/ui-visual-rules.md
- [X] T025 [US2] Document new UX pattern rationale and migration impact (or none) in specs/001-flowchart-ui-redesign/checklists/ui-visual-rules.md

**Checkpoint**: User Stories 1 and 2 both pass independently.

---

## Phase 5: User Story 3 - No Functional Regression (Priority: P3)

**Goal**: 리디자인 이후에도 작성/정렬/프레젠테이션/내보내기 기능 결과를 동일하게 유지한다.

**Independent Test**: authoring -> reorder -> presentation -> export 흐름을 실행했을 때 기존과 동일한 결과를 얻는다.

### Tests for User Story 3

- [X] T026 [P] [US3] Add unit guard test for unchanged presentation visual layout in tests/unit/presentation-mode-regression.spec.ts
- [X] T027 [P] [US3] Add integration parity test for authoring-to-export flow in tests/integration/editor-regression-parity.integration.spec.ts

### Implementation for User Story 3

- [X] T028 [US3] Ensure presentation component remains visually unchanged while edit shell is redesigned in src/features/flowchart/components/presentation-mode.tsx
- [X] T029 [US3] Verify export/presentation action wiring after layout refactor in src/features/flowchart/components/diagram-toolbar.tsx
- [X] T030 [US3] Finalize manual parity checklist execution fields for core flows in specs/001-flowchart-ui-redesign/checklists/ui-regression.md

**Checkpoint**: All user stories are independently functional and regression-safe.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 공통 품질 게이트를 통과하고 산출물을 마무리한다.

- [X] T031 [P] Run lint/type/unit/integration suites and record outputs in specs/001-flowchart-ui-redesign/quickstart.md
- [X] T032 [P] Add FR-008/UX-004 evidence references for review in specs/001-flowchart-ui-redesign/quickstart.md
- [X] T033 [P] Create code convention validation checklist for Korean rationale comments and naming rules in specs/001-flowchart-ui-redesign/checklists/code-convention.md
- [X] T034 Verify CCR-001 compliance for changed files and record results in specs/001-flowchart-ui-redesign/checklists/code-convention.md
- [X] T035 Verify CCR-002 compliance for changed files and record results in specs/001-flowchart-ui-redesign/checklists/code-convention.md
- [X] T036 Close remaining checklist items and notes in specs/001-flowchart-ui-redesign/checklists/requirements.md

---

## Dependencies & Execution Order

### Phase Dependencies

- Phase 1 -> Phase 2 -> Phase 3/4/5 -> Phase 6
- User stories start only after Phase 2 completion.
- Recommended story order: US1 (P1) -> US2 (P2) -> US3 (P3).

### User Story Dependency Graph

- US1: independent after Foundation
- US2: depends on US1 layout containers being in place
- US3: depends on US1/US2 completion for full regression verification

### Within Each User Story

- Tests first, then implementation.
- Shared-file tasks in same story (`diagram-canvas.tsx`, `diagram-toolbar.tsx`) execute sequentially.
- `[P]` tasks can run in parallel only when they touch different files.

## Parallel Execution Examples

### User Story 1

- T011 and T012 can run in parallel.
- T014 and T015 can run in parallel after T013.

### User Story 2

- T018 and T019 can run in parallel.
- T022 and T023 can run in parallel after T020.

### User Story 3

- T026 and T027 can run in parallel.
- T028 and T030 can run in parallel, then T029.

---

## Implementation Strategy

### MVP First (US1)

1. Complete Phase 1 and Phase 2.
2. Deliver US1 (T011-T017).
3. Validate US1 independently before proceeding.

### Incremental Delivery

1. Deliver US1 (layout structure).
2. Deliver US2 (visual consistency rules).
3. Deliver US3 (regression proof).
4. Finish with Phase 6 quality gate.
