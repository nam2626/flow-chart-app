# Tasks: 화살표 중앙 정렬 세로 플렉스 레이아웃

**Input**: Design documents from `/specs/001-center-arrow-flex-layout/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/, quickstart.md

**Tests**: 테스트 작업은 필수다. 모든 사용자 스토리는 최소 단위 테스트와 사용자 흐름 통합/E2E 테스트를 포함한다.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 레이아웃 전환 작업을 위한 공통 준비와 기준 고정

- [X] T001 Validate `lint`/`typecheck`/`test:unit`/`test:integration` scripts and 기록 기준을 정리 in `package.json`
- [X] T002 Document feature contract index in `src/features/flowchart/services/contract-map.ts`
- [X] T003 [P] Add feature test fixtures for variable heights/texts in `tests/helpers/center-connector-fixture.ts`
- [X] T004 [P] Add layout evidence placeholders in `test-results/.gitkeep`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 모든 사용자 스토리에서 공통으로 쓰는 레이아웃/정렬 기반 마련

**CRITICAL**: No user story work can begin until this phase is complete

- [X] T005 Define vertical layout state/model updates in `src/features/flowchart/models/flow-node-model.ts`
- [X] T006 [P] Define auto-only stack and dynamic-gap types in `src/features/flowchart/models/flowchart-types.ts`
- [X] T007 Implement vertical flex layout computation service in `src/features/flowchart/services/arrow-geometry-service.ts`
- [X] T008 Implement center-x connector + overlap guard service in `src/features/flowchart/services/center-connector-service.ts`
- [X] T009 Wire shared layout recompute entrypoint in `src/features/flowchart/store/flowchart-store.ts`
- [X] T010 Add foundational regression unit tests for layout invariants in `tests/unit/center-connector.spec.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - 세로 흐름 중앙 정렬 표시 (Priority: P1) - MVP

**Goal**: 초기 렌더에서 세로 스택 + 교차축 중앙 정렬 + 화살표 중심 정렬을 보장한다.

**Independent Test**: 3개 이상 도형에서 세로 스택이 유지되고 인접 화살표 start/end x가 도형 중심 x와 0px 오차로 일치하면 통과.

### Tests for User Story 1 (MANDATORY)

- [X] T011 [P] [US1] Add unit test for initial vertical layout calculation in `tests/unit/arrow-boundary.spec.ts`
- [X] T012 [P] [US1] Add integration test for edit-screen center alignment render in `tests/integration/center-connector.integration.spec.ts`
- [X] T013 [P] [US1] Add E2E scenario for initial flow render alignment in `tests/integration/presentation-mode.e2e.ts`

### Implementation for User Story 1

- [X] T014 [US1] Update edit canvas container to vertical flex center alignment in `src/features/flowchart/components/diagram-canvas.tsx`
- [X] T015 [P] [US1] Update shape node alignment hooks for center-x anchors in `src/features/flowchart/components/shape-node.tsx`
- [X] T016 [US1] Apply connector coordinate output to edit renderer in `src/features/flowchart/components/diagram-canvas.tsx`
- [X] T017 [US1] Add Korean rationale comments for alignment decisions in `src/features/flowchart/services/center-connector-service.ts`

**Checkpoint**: User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - 변경 후에도 중앙 정렬 유지 (Priority: P2)

**Goal**: 추가/삭제/순서 변경 후 자동 재배치와 동적 간격 비겹침을 유지한다.

**Independent Test**: 도형 추가/삭제/순서 변경 직후에도 세로 스택과 0px 중심 정렬이 유지되고 도형/화살표 겹침이 없으면 통과.

### Tests for User Story 2 (MANDATORY)

- [X] T018 [P] [US2] Add unit test for dynamic spacing and no-overlap rules in `tests/unit/flowchart-validation.spec.ts`
- [X] T019 [P] [US2] Add integration test for add/delete/reorder realignment in `tests/integration/flowchart-authoring.integration.spec.ts`
- [X] T020 [P] [US2] Add integration performance assertion for recompute p95 in `tests/integration/center-connector-performance.integration.spec.ts`

### Implementation for User Story 2

- [X] T021 [US2] Implement dynamic gap recomputation on mutations in `src/features/flowchart/store/flowchart-store.ts`
- [X] T022 [P] [US2] Enforce auto-only positioning guards on edit actions in `src/features/flowchart/services/flowchart-validation.ts`
- [X] T023 [US2] Update reorder pipeline to preserve center alignment invariants in `src/features/flowchart/components/step-order-panel.tsx`
- [X] T024 [US2] Update overlap detection and connector reroute boundary handling in `src/features/flowchart/services/arrow-geometry-service.ts`

**Checkpoint**: User Stories 1 and 2 should both work independently

---

## Phase 5: User Story 3 - 화면 유형 간 일관 표시 (Priority: P3)

**Goal**: 편집/프레젠테이션(및 프레젠테이션 탭) 간 동일한 세로 레이아웃과 화살표 정렬 결과를 보장한다.

**Independent Test**: 동일 데이터에서 편집/프레젠테이션 전환 시 도형 배치/화살표 정렬 결과가 동일하면 통과.

### Tests for User Story 3 (MANDATORY)

- [X] T025 [P] [US3] Add integration contract test for cross-screen layout parity in `tests/integration/presentation-contract-map.spec.ts`
- [X] T026 [P] [US3] Add E2E test for presentation start alignment visibility in `tests/integration/presentation-mode.e2e.ts`
- [X] T027 [P] [US3] Add integration test for presentation tab layout parity in `tests/integration/presentation-tab-layout.integration.spec.ts`

### Implementation for User Story 3

- [X] T028 [US3] Apply shared layout service in presentation renderer in `src/features/flowchart/components/presentation-mode.tsx`
- [X] T029 [P] [US3] Sync presentation tab rendering with same connector rules in `src/features/flowchart/components/presentation-tab.tsx`
- [X] T030 [US3] Ensure start-presentation path triggers recompute before render in `src/features/flowchart/services/presentation-tab-service.ts`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 전체 스토리를 가로지르는 마감 작업

- [X] T031 [P] Update feature quickstart evidence references in `specs/001-center-arrow-flex-layout/quickstart.md`
- [X] T032 Run `npm run lint && npm run typecheck && npm run test:unit && npm run test:integration` and record pass/fail evidence in `specs/001-center-arrow-flex-layout/plan.md`
- [X] T033 [P] Add/update performance budget regression test entries in `tests/integration/performance-budget.spec.ts`
- [X] T034 [P] Update API contract examples for implemented behavior in `specs/001-center-arrow-flex-layout/contracts/flowchart-layout.openapi.yaml`
- [X] T035 [P] Add UX copy consistency checklist and target strings mapping in `src/features/flowchart/models/ux-copy.ts`
- [X] T036 Add naming-rule compliance checklist and verification notes in `specs/001-center-arrow-flex-layout/plan.md`
- [X] T037 [P] Document no-new-UX-pattern decision and migration impact note in `specs/001-center-arrow-flex-layout/research.md`
- [X] T038 [P] Clarify logical-contract usage (non-runtime endpoint) in `specs/001-center-arrow-flex-layout/contracts/flowchart-layout.openapi.yaml`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: can start immediately
- **Phase 2 (Foundational)**: depends on Phase 1, blocks all user stories
- **Phase 3-5 (User Stories)**: depend on Phase 2 completion
- **Phase 6 (Polish)**: depends on all targeted user stories completion

### User Story Dependencies

- **US1 (P1)**: starts after Foundational, delivers MVP
- **US2 (P2)**: starts after Foundational, validates mutation/recompute behavior (recommended after US1)
- **US3 (P3)**: starts after Foundational, validates cross-screen consistency (recommended after US1)

### Dependency Graph

- Foundation -> US1 -> (US2, US3) -> Polish

---

## Parallel Execution Examples

### US1

- T011, T012, T013 can run in parallel (different test files)
- T015 can run in parallel with T014 after T011-T013 are prepared

### US2

- T018, T019, T020 can run in parallel
- T022 can run in parallel with T021 (different files)

### US3

- T025, T026, T027 can run in parallel
- T029 can run in parallel with T028 (different files)

---

## Implementation Strategy

### MVP First (US1)

1. Complete Phase 1 and Phase 2
2. Complete Phase 3 (US1)
3. Validate US1 independently before expanding scope

### Incremental Delivery

1. Deliver US1 (initial render correctness)
2. Deliver US2 (mutation-time stability + performance)
3. Deliver US3 (cross-screen consistency)
4. Finish with Phase 6 polish and full quality gate

### Notes

- Every task follows the checklist format: `- [X] Txxx [P?] [US?] Description with file path`
- `[USx]` labels are applied only to user story phases
- Test tasks are defined before implementation tasks in each user story phase

