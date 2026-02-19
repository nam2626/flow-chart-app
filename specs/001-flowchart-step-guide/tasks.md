---

description: "Task list template for feature implementation"
---

# Tasks: 간단 웹 플로우차트 작성기

**Input**: Design documents from `/specs/001-flowchart-step-guide/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: 테스트 작업은 필수다. 모든 사용자 스토리는 단위 테스트와 통합/E2E 테스트를 포함한다.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Single project with React SPA structure: `src/`, `tests/`
- Feature paths: `src/features/flowchart/*`
- Shared paths: `src/shared/*`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create React + TypeScript baseline scripts in D:/workspace/flowchart-app/package.json
- [X] T002 Create feature-first directories in D:/workspace/flowchart-app/src/features/flowchart/ and D:/workspace/flowchart-app/tests/
- [X] T003 [P] Configure TypeScript compiler and path aliases in D:/workspace/flowchart-app/tsconfig.json
- [X] T004 [P] Configure Vite build/dev settings in D:/workspace/flowchart-app/vite.config.ts
- [X] T005 [P] Configure ESLint + Prettier rules in D:/workspace/flowchart-app/.eslintrc.cjs and D:/workspace/flowchart-app/.prettierrc
- [X] T006 [P] Add test and quality scripts (lint, typecheck, unit, integration, e2e) in D:/workspace/flowchart-app/package.json

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**CRITICAL**: No user story work can begin until this phase is complete

- [X] T007 Define core flowchart domain types in D:/workspace/flowchart-app/src/features/flowchart/models/flowchart-types.ts
- [X] T008 Implement Zustand root store with persist(localStorage) in D:/workspace/flowchart-app/src/features/flowchart/store/flowchart-store.ts
- [X] T009 [P] Implement validation utilities (shape, width, file size, step order) in D:/workspace/flowchart-app/src/features/flowchart/services/flowchart-validation.ts
- [X] T010 [P] Implement common ID and time helpers in D:/workspace/flowchart-app/src/shared/utils/id-utils.ts
- [X] T011 Create transparent canvas app shell in D:/workspace/flowchart-app/src/app/app-shell.tsx
- [X] T012 [P] Define UX copy constants for progression and error states in D:/workspace/flowchart-app/src/features/flowchart/models/ux-copy.ts
- [X] T013 Add foundational unit tests for store init and persistence in D:/workspace/flowchart-app/tests/unit/flowchart-store.spec.ts
- [X] T014 Document logical API contract mapping usage in D:/workspace/flowchart-app/src/features/flowchart/services/contract-map.ts

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - 기본 플로우차트 작성 (Priority: P1) - MVP

**Goal**: 사각형/타원 노드를 추가하고 단계 순서를 지정해 플로우차트 기본 작성 기능을 제공한다.

**Independent Test**: 도형 3개를 생성하고 단계 순서를 저장한 뒤 새로고침해도 동일한 노드/순서가 유지된다.

### Tests for User Story 1 (MANDATORY)

- [X] T015 [P] [US1] Add unit tests for node creation and shape constraints in D:/workspace/flowchart-app/tests/unit/flow-node-creation.spec.ts
- [X] T016 [P] [US1] Add unit tests for step-order uniqueness in D:/workspace/flowchart-app/tests/unit/step-order-validation.spec.ts
- [X] T017 [P] [US1] Add integration test for create and reload persistence in D:/workspace/flowchart-app/tests/integration/us1-create-and-persist.spec.ts
- [X] T018 [P] [US1] Add Playwright E2E for 3-node authoring and reload in D:/workspace/flowchart-app/tests/integration/us1-create-and-persist.e2e.ts

### Implementation for User Story 1

- [X] T019 [P] [US1] Implement flow node model factory in D:/workspace/flowchart-app/src/features/flowchart/models/flow-node-model.ts
- [X] T020 [US1] Implement diagram mutation actions (add/update/reorder) in D:/workspace/flowchart-app/src/features/flowchart/store/flowchart-store.ts
- [X] T021 [P] [US1] Implement rectangle/ellipse node component in D:/workspace/flowchart-app/src/features/flowchart/components/shape-node.tsx
- [X] T022 [US1] Implement diagram canvas editor with transparent background in D:/workspace/flowchart-app/src/features/flowchart/components/diagram-canvas.tsx
- [X] T023 [US1] Implement step-order editor panel in D:/workspace/flowchart-app/src/features/flowchart/components/step-order-panel.tsx
- [X] T024 [US1] Wire flowchart feature into app shell in D:/workspace/flowchart-app/src/app/app-shell.tsx

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - 단축키 기반 다음 단계 안내 (Priority: P2)

**Goal**: 단축키로 다음 단계를 진행하고 현재 단계 안내와 outglow 상태를 일관되게 갱신한다.

**Independent Test**: 단계가 지정된 3개 노드에서 단축키 입력 시 1->2->3 이동, 마지막 단계 정지, 안내 문구 1초 이내 갱신을 확인한다.

### Tests for User Story 2 (MANDATORY)

- [X] T025 [P] [US2] Add unit tests for progression state transitions and last-step hold in D:/workspace/flowchart-app/tests/unit/progression-state.spec.ts
- [X] T026 [P] [US2] Add unit tests for shortcut remapping and key-conflict warnings in D:/workspace/flowchart-app/tests/unit/shortcut-preference.spec.ts
- [X] T027 [P] [US2] Add integration test for progression message timing (<1s) in D:/workspace/flowchart-app/tests/integration/us2-message-timing.spec.ts
- [X] T028 [P] [US2] Add Playwright E2E for default N and remapped key flows in D:/workspace/flowchart-app/tests/integration/us2-keyboard-progression.e2e.ts

### Implementation for User Story 2

- [X] T029 [P] [US2] Implement progression state service in D:/workspace/flowchart-app/src/features/flowchart/services/progression-service.ts
- [X] T030 [P] [US2] Implement next-step shortcut manager in D:/workspace/flowchart-app/src/features/flowchart/shortcuts/next-step-shortcut.ts
- [X] T031 [US2] Implement shortcut settings panel in D:/workspace/flowchart-app/src/features/flowchart/components/shortcut-settings.tsx
- [X] T032 [US2] Implement progression banner and message synchronization in D:/workspace/flowchart-app/src/features/flowchart/components/progression-banner.tsx
- [X] T033 [US2] Bind active-step outglow rendering to current progression state in D:/workspace/flowchart-app/src/features/flowchart/components/shape-node.tsx

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - 시각 강조 및 레이아웃 제약 준수 (Priority: P3)

**Goal**: 캔버스 폭 제약(300~4000), JSON/SVG 내보내기, JSON 병합 불러오기, 충돌 해결, 5MB 제한을 제공한다.

**Independent Test**: 캔버스 폭 경계값, JSON/SVG export, JSON merge import, 충돌 기본값(가져온 파일 우선), 5MB 초과 거부를 검증한다.

### Tests for User Story 3 (MANDATORY)

- [X] T034 [P] [US3] Add unit tests for canvas width boundary validation in D:/workspace/flowchart-app/tests/unit/canvas-width-validation.spec.ts
- [X] T035 [P] [US3] Add unit tests for merge conflict default imported precedence in D:/workspace/flowchart-app/tests/unit/import-merge-conflict.spec.ts
- [X] T036 [P] [US3] Add integration test for JSON import/export and SVG export in D:/workspace/flowchart-app/tests/integration/us3-import-export.spec.ts
- [X] T037 [P] [US3] Add Playwright E2E for >5MB import rejection and guidance message in D:/workspace/flowchart-app/tests/integration/us3-file-size-limit.e2e.ts

### Implementation for User Story 3

- [X] T038 [P] [US3] Implement canvas width control and guards in D:/workspace/flowchart-app/src/features/flowchart/components/canvas-width-control.tsx
- [X] T039 [P] [US3] Implement JSON import/export service in D:/workspace/flowchart-app/src/features/flowchart/services/json-transfer-service.ts
- [X] T040 [P] [US3] Implement SVG export service in D:/workspace/flowchart-app/src/features/flowchart/services/svg-export-service.ts
- [X] T041 [US3] Implement import merge conflict dialog and actions in D:/workspace/flowchart-app/src/features/flowchart/components/import-conflict-dialog.tsx
- [X] T042 [US3] Implement file size limit guard and import error handling in D:/workspace/flowchart-app/src/features/flowchart/services/import-guard-service.ts
- [X] T043 [US3] Integrate import/export and canvas-width tools into toolbar in D:/workspace/flowchart-app/src/features/flowchart/components/diagram-toolbar.tsx

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T044 [P] Add contract conformance tests for logical client service contracts in D:/workspace/flowchart-app/tests/integration/contract-map.spec.ts
- [X] T045 Measure and enforce performance budgets (0.3s transition, 3s import, 200-node interaction target) in D:/workspace/flowchart-app/tests/integration/performance-budget.spec.ts
- [X] T046 [P] Run UX copy consistency pass and update terms in D:/workspace/flowchart-app/src/features/flowchart/models/ux-copy.ts
- [X] T047 Add Korean-comment compliance review checklist in D:/workspace/flowchart-app/specs/001-flowchart-step-guide/checklists/requirements.md
- [X] T048 [P] Add naming-rule and folder-depth compliance checks in D:/workspace/flowchart-app/.eslintrc.cjs
- [X] T049 Execute full quality gate (lint + typecheck + unit + integration + e2e) and record results in D:/workspace/flowchart-app/specs/001-flowchart-step-guide/research.md
- [X] T050 Validate quickstart end-to-end scenarios and update evidence notes in D:/workspace/flowchart-app/specs/001-flowchart-step-guide/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: Depend on Foundational completion
  - 권장 순서: US1 -> US2 -> US3
  - 팀 병렬 시 US2/US3는 US1 데이터 모델 안정화 후 병렬 가능
- **Polish (Phase 6)**: Depends on all user stories complete

### User Story Dependencies

- **US1 (P1)**: 독립 MVP, 다른 스토리 의존 없음
- **US2 (P2)**: US1의 노드/순서 데이터와 진행 모델에 의존
- **US3 (P3)**: US1 데이터 모델과 US2 진행 상태 출력을 활용

### Within Each User Story

- Tests first, then implementation; phase completion 전 전 테스트 통과
- Models/services before UI integration
- Validation and edge-case handling before story checkpoint

### Parallel Opportunities

- Setup: T003, T004, T005, T006 병렬 가능
- Foundational: T009, T010, T012 병렬 가능
- US1: T015~T018, T019/T021 병렬 가능
- US2: T025~T028, T029/T030 병렬 가능
- US3: T034~T037, T038~T040 병렬 가능
- Polish: T044, T046, T048 병렬 가능

---

## Parallel Example: User Story 1

```bash
Task: "T015 [US1] ... D:/workspace/flowchart-app/tests/unit/flow-node-creation.spec.ts"
Task: "T016 [US1] ... D:/workspace/flowchart-app/tests/unit/step-order-validation.spec.ts"
Task: "T019 [US1] ... D:/workspace/flowchart-app/src/features/flowchart/models/flow-node-model.ts"
Task: "T021 [US1] ... D:/workspace/flowchart-app/src/features/flowchart/components/shape-node.tsx"
```

## Parallel Example: User Story 2

```bash
Task: "T025 [US2] ... D:/workspace/flowchart-app/tests/unit/progression-state.spec.ts"
Task: "T026 [US2] ... D:/workspace/flowchart-app/tests/unit/shortcut-preference.spec.ts"
Task: "T029 [US2] ... D:/workspace/flowchart-app/src/features/flowchart/services/progression-service.ts"
Task: "T030 [US2] ... D:/workspace/flowchart-app/src/features/flowchart/shortcuts/next-step-shortcut.ts"
```

## Parallel Example: User Story 3

```bash
Task: "T034 [US3] ... D:/workspace/flowchart-app/tests/unit/canvas-width-validation.spec.ts"
Task: "T035 [US3] ... D:/workspace/flowchart-app/tests/unit/import-merge-conflict.spec.ts"
Task: "T039 [US3] ... D:/workspace/flowchart-app/src/features/flowchart/services/json-transfer-service.ts"
Task: "T040 [US3] ... D:/workspace/flowchart-app/src/features/flowchart/services/svg-export-service.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Validate US1 independent test criteria
5. Demo/release MVP

### Incremental Delivery

1. Complete Setup + Foundational
2. Deliver US1 (작성/저장 MVP)
3. Deliver US2 (단축키 진행/안내)
4. Deliver US3 (폭 제약/입출력/병합)
5. Run Polish and full quality gate

### Parallel Team Strategy

1. Developer A: US1 (모델/작성 UI)
2. Developer B: US2 (진행 상태/단축키)
3. Developer C: US3 (입출력/병합/제약)
4. Reviewer: 품질 게이트/UX 일관성/성능 예산 검증

---

## Notes

- 모든 태스크는 체크리스트 형식을 준수한다.
- 사용자 스토리 단계 태스크는 반드시 `[US#]` 라벨을 포함한다.
- 경로는 절대 경로로 명시한다.
- MVP 범위는 US1이다.







