# Tasks: 프레젠테이션 별도 접속 링크

**Input**: Design documents from `/specs/001-presentation-access-link/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: 테스트 작업은 필수다. 모든 사용자 스토리는 최소 단위 테스트를 포함해야 하며,
사용자 흐름 변경 시 통합 또는 E2E 테스트를 반드시 포함한다.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- 기본 구조는 기능 중심 단순 계층을 사용하고 과도한 하위 폴더 분할을 금지

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 문서/품질게이트/측정 기준 준비

- [X] T001 Update implementation checkpoints in specs/001-presentation-access-link/plan.md
- [X] T002 Create regression evidence template in specs/001-presentation-access-link/checklists/regression-results.md
- [X] T003 [P] Create E2E evidence template in specs/001-presentation-access-link/checklists/e2e-results.md
- [X] T004 [P] Create naming convention checklist in specs/001-presentation-access-link/checklists/naming-convention.md
- [X] T005 [P] Define performance measurement checklist in specs/001-presentation-access-link/checklists/performance-budget.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 공통 모델/상태/서비스/접근 실패 처리 기반 구축

**CRITICAL**: No user story work can begin until this phase is complete

- [X] T006 Create PresentationLink model in src/features/flowchart/models/presentation-link-model.ts
- [X] T007 [P] Create PresentationSessionState model in src/features/flowchart/models/presentation-session-model.ts
- [X] T008 [P] Create LinkAccessEvent model in src/features/flowchart/models/presentation-access-event-model.ts
- [X] T009 [P] Create DiagramSnapshot adapter model in src/features/flowchart/models/presentation-snapshot-model.ts
- [X] T010 Implement share-code generation and uniqueness guard in src/features/flowchart/services/presentation-link-code-service.ts
- [X] T011 Implement presentation session state transition service in src/features/flowchart/services/presentation-session-state-service.ts
- [X] T012 Extend persisted store fields for presentation-link metadata in src/features/flowchart/store/flowchart-store.ts
- [X] T013 Implement presentation route shell in src/features/flowchart/components/presentation-route.tsx
- [X] T014 Implement common presentation error mapper in src/features/flowchart/services/presentation-error-service.ts

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - 프레젠테이션 전용 링크 진입 (Priority: P1) - MVP

**Goal**: 편집 화면에서 링크를 생성하고 URL 직접 진입 시 발표 전용 화면으로 연결한다.

**Independent Test**: 링크 생성 후 새 탭에서 URL 접속 시 편집 UI 없는 발표 화면과 문서명 탭 제목이 확인된다.

### Tests for User Story 1 (MANDATORY)

- [X] T015 [P] [US1] Add unit tests for link creation and URL shape in tests/unit/presentation-link-service.spec.ts
- [X] T016 [P] [US1] Add unit tests for tab-title naming rule in tests/unit/presentation-tab-title.spec.ts
- [X] T017 [P] [US1] Add integration test for create-link and route-resolve flow in tests/integration/presentation-link-create.integration.spec.ts
- [X] T018 [P] [US1] Add E2E test for direct presentation URL access in tests/integration/presentation-link-obs-access.e2e.ts

### Implementation for User Story 1

- [X] T019 [P] [US1] Implement create/get link facade methods in src/features/flowchart/services/presentation-link-service.ts
- [X] T020 [P] [US1] Build link create UI panel in src/features/flowchart/components/presentation-link-panel.tsx
- [X] T021 [US1] Wire link panel entry in src/features/flowchart/components/diagram-toolbar.tsx
- [X] T022 [US1] Render read-only presentation screen for share-code route in src/features/flowchart/components/presentation-route.tsx
- [X] T023 [US1] Enforce hidden edit controls in src/features/flowchart/components/presentation-mode.tsx
- [X] T024 [US1] Set document-based browser tab title in src/features/flowchart/services/presentation-tab-service.ts
- [X] T025 [US1] Record open success/deny access events in src/features/flowchart/services/presentation-access-event-service.ts

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - 링크 공유 및 재사용 (Priority: P2)

**Goal**: 링크 복사/재사용, 실시간 반영, 링크 재생성 시 즉시 무효화를 제공한다.

**Independent Test**: 다른 브라우저에서도 링크 재사용이 가능하고, 저장 변경은 자동 반영되며 재생성 시 기존 탭이 즉시 차단된다.

### Tests for User Story 2 (MANDATORY)

- [X] T026 [P] [US2] Add unit tests for regenerate-and-revoke behavior in tests/unit/presentation-link-regenerate.spec.ts
- [X] T027 [P] [US2] Add unit tests for session transition on realtime sync in tests/unit/presentation-session-sync.spec.ts
- [X] T028 [P] [US2] Add integration test for cross-browser link reuse in tests/integration/presentation-link-reuse.integration.spec.ts
- [X] T029 [P] [US2] Add integration test for editor-save realtime reflection in tests/integration/presentation-link-live-sync.integration.spec.ts
- [X] T030 [P] [US2] Add E2E test for immediate revocation of opened tabs in tests/integration/presentation-link-revoke-open-tab.e2e.ts

### Implementation for User Story 2

- [X] T031 [US2] Implement link copy and reload actions in src/features/flowchart/services/presentation-link-service.ts
- [X] T032 [US2] Add copy/reopen controls and feedback in src/features/flowchart/components/presentation-link-panel.tsx
- [X] T033 [US2] Implement regenerate-link and previous-code invalidation in src/features/flowchart/services/presentation-link-service.ts
- [X] T034 [US2] Implement realtime sync subscription and latest revision apply in src/features/flowchart/services/presentation-session-sync-service.ts
- [X] T035 [US2] Handle session revocation push and force deny state in src/features/flowchart/components/presentation-route.tsx
- [X] T036 [US2] Persist and restore active link metadata in src/features/flowchart/store/flowchart-store.ts

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - 링크 접근 실패 안내 (Priority: P3)

**Goal**: 무효/삭제/권한 문제 링크 접근에 대해 원인과 복구 행동을 제공한다.

**Independent Test**: 실패 접근 시 원인 코드와 재시도/재생성/문서 이동 행동이 한 화면에서 확인된다.

### Tests for User Story 3 (MANDATORY)

- [X] T037 [P] [US3] Add unit tests for deny reason mapping in tests/unit/presentation-access-error.spec.ts
- [X] T038 [P] [US3] Add integration test for invalid share-code flow in tests/integration/presentation-invalid-link.integration.spec.ts
- [X] T039 [P] [US3] Add integration test for deleted or denied source document flow in tests/integration/presentation-access-denied.integration.spec.ts
- [X] T040 [P] [US3] Add E2E test for recovery action visibility in tests/integration/presentation-recovery-actions.e2e.ts

### Implementation for User Story 3

- [X] T041 [US3] Implement invalid/revoked/deleted reason classification in src/features/flowchart/services/presentation-error-service.ts
- [X] T042 [US3] Build denied-state screen with recovery actions in src/features/flowchart/components/presentation-access-denied.tsx
- [X] T043 [US3] Route all failure states to denied-state screen in src/features/flowchart/components/presentation-route.tsx
- [X] T044 [US3] Add retry and regenerate CTA handlers in src/features/flowchart/components/presentation-link-panel.tsx
- [X] T045 [US3] Record denied-access telemetry with reason code in src/features/flowchart/services/presentation-access-event-service.ts

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 헌장 준수, 성능 예산, 회귀 증적 보강

- [X] T046 [P] Update UX copy consistency map in src/features/flowchart/models/ux-copy.ts
- [X] T047 Run lint quality gate and record result in specs/001-presentation-access-link/checklists/regression-results.md
- [X] T048 Run typecheck quality gate and record result in specs/001-presentation-access-link/checklists/regression-results.md
- [X] T049 [P] Run presentation unit/integration regression and record result in specs/001-presentation-access-link/checklists/regression-results.md
- [X] T050 [P] Run presentation E2E regression and record result in specs/001-presentation-access-link/checklists/e2e-results.md
- [X] T051 [P] Add p95 entry latency assertion in tests/integration/presentation-link-performance.integration.spec.ts
- [X] T052 [P] Add monthly failure-rate aggregation assertion in tests/integration/presentation-link-failure-rate.integration.spec.ts
- [X] T053 [P] Add repeated-entry variance assertion in tests/integration/presentation-link-variance.integration.spec.ts
- [X] T054 [P] Add bundle and network budget verification in tests/integration/presentation-budget.integration.spec.ts
- [X] T055 [P] Add runtime memory budget verification in tests/integration/presentation-memory-budget.integration.spec.ts
- [X] T056 Add Korean rationale comment and naming convention review results in specs/001-presentation-access-link/checklists/naming-convention.md
- [X] T057 [P] Update final validation notes in specs/001-presentation-access-link/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Phase 6)**: Depends on all user story phases completion

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Phase 2 and is MVP baseline
- **User Story 2 (P2)**: Starts after Phase 2, integrates with US1 artifacts but independently testable
- **User Story 3 (P3)**: Starts after Phase 2, focuses on failure-mode UX and telemetry

### Within Each User Story

- Tests before implementation
- Models/services before UI integration
- Route integration after core behavior stabilization
- Story checkpoint validation before next priority

### Dependency Graph (Story Completion Order)

- Foundational -> US1 (MVP)
- Foundational -> US2
- Foundational -> US3
- Preferred sequence: US1 -> US2 -> US3

### Parallel Opportunities

- Setup parallel: T003, T004, T005
- Foundational parallel: T007, T008, T009
- US1 parallel tests: T015, T016, T017, T018
- US2 parallel tests: T026, T027, T028, T029, T030
- US3 parallel tests: T037, T038, T039, T040
- Polish parallel: T046, T049, T050, T051, T052, T053, T054, T055, T057

---

## Parallel Example: User Story 1

```bash
Task: "T015 [US1] tests/unit/presentation-link-service.spec.ts"
Task: "T016 [US1] tests/unit/presentation-tab-title.spec.ts"
Task: "T017 [US1] tests/integration/presentation-link-create.integration.spec.ts"
Task: "T018 [US1] tests/integration/presentation-link-obs-access.e2e.ts"
```

## Parallel Example: User Story 2

```bash
Task: "T026 [US2] tests/unit/presentation-link-regenerate.spec.ts"
Task: "T028 [US2] tests/integration/presentation-link-reuse.integration.spec.ts"
Task: "T030 [US2] tests/integration/presentation-link-revoke-open-tab.e2e.ts"
```

## Parallel Example: User Story 3

```bash
Task: "T037 [US3] tests/unit/presentation-access-error.spec.ts"
Task: "T038 [US3] tests/integration/presentation-invalid-link.integration.spec.ts"
Task: "T040 [US3] tests/integration/presentation-recovery-actions.e2e.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 (Setup)
2. Complete Phase 2 (Foundational)
3. Complete Phase 3 (US1)
4. Validate US1 independently (link creation, direct URL, OBS access)
5. Ship MVP

### Incremental Delivery

1. Setup + Foundational complete
2. Deliver US1 and validate
3. Deliver US2 and validate
4. Deliver US3 and validate
5. Run Phase 6 quality/performance gates

### Parallel Team Strategy

1. Team completes Phase 1 and 2 together
2. After foundation:
   - Engineer A: US1
   - Engineer B: US2
   - Engineer C: US3
3. Merge by story checkpoints with shared regression gates

---

## Notes

- [P] tasks run on different files without incomplete dependencies
- [USx] labels are used only in user story phases
- Every user story includes mandatory unit + integration/E2E tests
- All tasks include actionable target file paths
