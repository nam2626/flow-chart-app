# Tasks: Center Arrow Alignment

**Input**: Design docs from `/specs/001-center-arrow-alignment/`  
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/connector-alignment.openapi.yaml`

**Tests**: Every story includes unit tests. Flow changes include integration or E2E tests.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare shared fixtures and validation assets.

- [X] T001 Extend connector alignment fixture data in `tests/helpers/center-connector-fixture.ts`
- [X] T002 Extend presentation performance fixture data in `tests/helpers/presentation-view-fixture.ts`
- [X] T003 [P] Add contract request/response fixture cases in `tests/helpers/contract-fixture.ts`
- [X] T004 [P] Update quickstart verification steps for this feature in `specs/001-center-arrow-alignment/quickstart.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Lock shared rules, models, and quality constraints.

**CRITICAL**: No story work starts before this phase is complete.

- [X] T005 Define center-alignment constants with 0px tolerance in `src/features/flowchart/models/flowchart-types.ts`
- [X] T006 Add alignment input/output model types in `src/features/flowchart/models/flow-node-model.ts`
- [X] T007 [P] Map alignment contract rule `CENTER_X_WITH_BOUNDARY_Y` in `src/features/flowchart/services/contract-map.ts`
- [X] T008 [P] Preserve boundary-y behavior in geometry service logic in `src/features/flowchart/services/arrow-geometry-service.ts`
- [X] T009 Add p95 300ms and 0px checks to performance budget service in `src/features/flowchart/services/performance-budget-service.ts`
- [X] T010 Record CCR-002 naming-convention checklist review items in `specs/001-center-arrow-alignment/checklists/requirements.md`

**Checkpoint**: Shared rule set is fixed and story work can begin.

---

## Phase 3: User Story 1 - Edit Screen Center Alignment (Priority: P1) - MVP

**Goal**: Align connector x-coordinates to shape center on the edit screen, with boundary-y preserved.

**Independent Test**: After add/reorder/resize actions, all connector startX/endX match shape centerX with 0px tolerance, and startY/endY follow existing boundary rules.

### Tests for User Story 1

- [X] T011 [P] [US1] Add 0px center-x unit coverage in `tests/unit/center-connector.spec.ts`
- [X] T012 [P] [US1] Add boundary-y regression unit coverage in `tests/unit/arrow-boundary.spec.ts`
- [X] T013 [P] [US1] Add edit-canvas connector alignment integration coverage in `tests/integration/center-connector.integration.spec.ts`
- [X] T014 [P] [US1] Add edit realignment p95 300ms performance coverage in `tests/integration/center-connector-performance.integration.spec.ts`

### Implementation for User Story 1

- [X] T015 [US1] Implement center-x connector computation in `src/features/flowchart/services/center-connector-service.ts`
- [X] T016 [US1] Consume aligned connector coordinates in edit canvas renderer in `src/features/flowchart/components/diagram-canvas.tsx`
- [X] T017 [US1] Trigger connector recompute on reorder/resize in `src/features/flowchart/store/flowchart-store.ts`
- [X] T018 [US1] Strengthen edit connector alignment validation logic in `src/features/flowchart/services/flowchart-validation.ts`
- [X] T019 [US1] Add Korean rationale comments for key alignment decisions (CCR-001) in `src/features/flowchart/services/center-connector-service.ts`

**Checkpoint**: Edit screen behavior is independently complete.

---

## Phase 4: User Story 2 - Presentation Screen Center Alignment (Priority: P2)

**Goal**: Keep centered connectors visible and stable during presentation start and step navigation.

**Independent Test**: At presentation start and step transitions, all connectors are visible, x-coordinates are center-aligned at 0px tolerance, and y-coordinates keep boundary behavior.

### Tests for User Story 2

- [X] T020 [P] [US2] Add presentation visibility/alignment integration coverage in `tests/integration/presentation-mode.integration.spec.ts`
- [X] T021 [P] [US2] Add presentation boundary-y integration coverage in `tests/integration/presentation-arrow-boundary.integration.spec.ts`
- [X] T022 [P] [US2] Add presentation-start/new-tab visibility E2E coverage in `tests/integration/presentation-mode.e2e.ts`
- [X] T023 [P] [US2] Add presentation alignment p95 300ms performance coverage in `tests/integration/presentation-arrow-performance.integration.spec.ts`
- [X] T024 [P] [US2] Add scale test for 50-shape input (PRF-005) in `tests/integration/performance-smoke.integration.spec.ts`

### Implementation for User Story 2

- [X] T025 [US2] Apply aligned connector coordinates in presentation renderer in `src/features/flowchart/components/presentation-mode.tsx`
- [X] T026 [US2] Apply same alignment rule in presentation tab renderer in `src/features/flowchart/components/presentation-tab.tsx`
- [X] T027 [US2] Ensure connector payload initialization on presentation start in `src/features/flowchart/services/presentation-tab-service.ts`

**Checkpoint**: Presentation behavior is independently complete.

---

## Phase 5: User Story 3 - Cross-Screen Rule Consistency (Priority: P3)

**Goal**: Keep the same alignment result across edit and presentation for the same data.

**Independent Test**: For identical fixture input, edit and presentation output identical x-alignment rule and 0px tolerance results.

### Tests for User Story 3

- [X] T028 [P] [US3] Add cross-screen alignment contract integration coverage in `tests/integration/presentation-contract-map.spec.ts`
- [X] T029 [P] [US3] Add edit-to-presentation mismatch-prevention E2E coverage in `tests/integration/presentation-component-switch.e2e.ts`
- [X] T030 [P] [US3] Add contract validate-path integration coverage in `tests/integration/contract-map.spec.ts`
- [X] T031 [P] [US3] Add UX copy consistency regression coverage for UX-002 in `tests/integration/presentation-ui-evidence.e2e.ts`

### Implementation for User Story 3

- [X] T032 [US3] Consolidate shared alignment rule usage across screens in `src/features/flowchart/services/center-connector-service.ts`
- [X] T033 [US3] Synchronize presentation contract mapping with edit rule in `src/features/flowchart/services/contract-map.ts`
- [X] T034 [US3] Normalize alignment terms and feedback copy across views in `src/features/flowchart/models/ux-copy.ts`
- [X] T035 [US3] Document new-pattern decision and migration impact for UX-003 in `specs/001-center-arrow-alignment/research.md`

**Checkpoint**: Cross-screen consistency is independently complete.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Close quality gates and attach final evidence.

- [X] T036 [P] Update performance measurement method details in `specs/001-center-arrow-alignment/research.md`
- [X] T037 [P] Sync OpenAPI contract details with implemented rule behavior in `specs/001-center-arrow-alignment/contracts/connector-alignment.openapi.yaml`
- [X] T038 Attach before/after UI evidence links for this change in `specs/001-center-arrow-alignment/quickstart.md`
- [X] T039 Record constitution quality-gate completion evidence in `specs/001-center-arrow-alignment/checklists/requirements.md`
- [X] T040 Record final CCR-003 structure-compliance check in `specs/001-center-arrow-alignment/plan.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: Can start immediately.
- **Phase 2 (Foundational)**: Depends on Phase 1 and blocks all stories.
- **Phase 3-5 (Stories)**: Depend on Phase 2, then run by priority (`P1 -> P2 -> P3`) or parallel by team capacity.
- **Phase 6 (Polish)**: Depends on completion of selected stories.

### User Story Dependencies

- **US1**: Starts after Foundational; standalone MVP.
- **US2**: Starts after Foundational; can reuse US1 outcomes but remains independently testable.
- **US3**: Starts after Foundational; verifies consistency across US1/US2 behavior.

### Within Each Story

- Write tests first and confirm failure before implementation.
- Order work as: services/models -> components -> store/state integration.
- Run same-file tasks sequentially.

## Parallel Opportunities

- Setup: `T003`, `T004`
- Foundational: `T007`, `T008`
- US1 tests: `T011`-`T014`
- US2 tests: `T020`-`T024`
- US3 tests: `T028`-`T031`
- Polish: `T036`, `T037`, `T038`

## Parallel Example: User Story 1

```bash
Task: "T011 [US1] Add 0px center-x unit coverage in tests/unit/center-connector.spec.ts"
Task: "T012 [US1] Add boundary-y regression unit coverage in tests/unit/arrow-boundary.spec.ts"
Task: "T013 [US1] Add edit-canvas connector alignment integration coverage in tests/integration/center-connector.integration.spec.ts"
Task: "T014 [US1] Add edit realignment p95 300ms performance coverage in tests/integration/center-connector-performance.integration.spec.ts"
```

## Parallel Example: User Story 2

```bash
Task: "T020 [US2] Add presentation visibility/alignment integration coverage in tests/integration/presentation-mode.integration.spec.ts"
Task: "T021 [US2] Add presentation boundary-y integration coverage in tests/integration/presentation-arrow-boundary.integration.spec.ts"
Task: "T022 [US2] Add presentation-start/new-tab visibility E2E coverage in tests/integration/presentation-mode.e2e.ts"
Task: "T024 [US2] Add scale test for 50-shape input (PRF-005) in tests/integration/performance-smoke.integration.spec.ts"
```

## Parallel Example: User Story 3

```bash
Task: "T028 [US3] Add cross-screen alignment contract integration coverage in tests/integration/presentation-contract-map.spec.ts"
Task: "T029 [US3] Add edit-to-presentation mismatch-prevention E2E coverage in tests/integration/presentation-component-switch.e2e.ts"
Task: "T031 [US3] Add UX copy consistency regression coverage for UX-002 in tests/integration/presentation-ui-evidence.e2e.ts"
```

## Implementation Strategy

### MVP First (US1 Only)

1. Complete Phase 1.
2. Complete Phase 2.
3. Complete Phase 3.
4. Validate US1 independently before wider rollout.

### Incremental Delivery

1. Deliver US1 value on edit screen.
2. Add US2 for presentation reliability.
3. Add US3 for cross-screen consistency guarantees.
4. Finish with Phase 6 quality and evidence gates.

