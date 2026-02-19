# Tasks: 다중 도형 스타일 및 프레젠테이션 가시성 개선

**Input**: Design documents from `D:/workspace/flowchart-app/specs/001-fix-presentation-visuals/`
**Prerequisites**: `plan.md` (required), `spec.md` (required), `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

**Tests**: 모든 사용자 스토리는 단위 테스트를 포함하고, 사용자 흐름 변경은 통합 또는 E2E 테스트를 포함한다.

**Organization**: 사용자 스토리별 독립 구현/검증이 가능하도록 구성한다.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 공통 품질 게이트와 문서/계약 기준 정렬

- [X] T001 Verify quality-gate scripts in D:/workspace/flowchart-app/package.json
- [X] T002 Align feature document links in D:/workspace/flowchart-app/specs/001-fix-presentation-visuals/plan.md
- [X] T003 [P] Sync quickstart command list in D:/workspace/flowchart-app/specs/001-fix-presentation-visuals/quickstart.md
- [X] T004 [P] Align contract baseline mapping in D:/workspace/flowchart-app/src/features/flowchart/services/contract-map.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 모든 스토리에서 공통으로 사용하는 저장/검증/성능/UX 규칙 기반 구축

**CRITICAL**: 이 단계 완료 전 사용자 스토리 구현 금지

- [X] T005 Define stable style persistence schema in D:/workspace/flowchart-app/src/features/flowchart/models/shape-style-model.ts
- [X] T006 [P] Implement local style repository service in D:/workspace/flowchart-app/src/features/flowchart/services/shape-style-storage-service.ts
- [X] T007 [P] Enforce stable shape ID mapping utilities in D:/workspace/flowchart-app/src/shared/utils/id-utils.ts
- [X] T008 Implement invalid color fallback validator in D:/workspace/flowchart-app/src/features/flowchart/services/color-validation-service.ts
- [X] T009 Define presentation typography/highlight tokens in D:/workspace/flowchart-app/src/features/flowchart/models/presentation-theme.ts
- [X] T010 Add performance measurement helper for PRF in D:/workspace/flowchart-app/src/features/flowchart/services/performance-budget-service.ts
- [X] T011 Add foundational schema/validator unit tests in D:/workspace/flowchart-app/tests/unit/shape-style-validation.spec.ts
- [X] T012 [P] Define shared UX copy rules in D:/workspace/flowchart-app/src/features/flowchart/models/ux-copy.ts
- [X] T013 Add naming/comment convention verification checklist in D:/workspace/flowchart-app/specs/001-fix-presentation-visuals/quickstart.md

**Checkpoint**: Foundation ready - user story implementation can begin.

---

## Phase 3: User Story 1 - 모든 도형 개별 색상 지정 (Priority: P1) - MVP

**Goal**: 모든 도형에 배경색/테두리색을 개별 적용하고 브라우저 로컬 최근 상태를 고유 ID로 복원한다.

**Independent Test**: 3개 이상 도형에 서로 다른 배경색/테두리색을 적용한 뒤, 새로고침/재진입/문서 전환 후에도 동일 도형 ID에 동일 색상이 복원된다.

### Tests for User Story 1 (MANDATORY)

- [X] T014 [P] [US1] Add per-shape persistence unit tests in D:/workspace/flowchart-app/tests/unit/shape-style-persist.spec.ts
- [X] T015 [P] [US1] Add multi-shape restore integration tests in D:/workspace/flowchart-app/tests/integration/shape-style.integration.spec.ts
- [X] T016 [P] [US1] Add color persistence E2E flow in D:/workspace/flowchart-app/tests/integration/shape-style.e2e.ts

### Implementation for User Story 1

- [X] T017 [US1] Implement all-shape fill/border edit handling in D:/workspace/flowchart-app/src/features/flowchart/components/shape-node.tsx
- [X] T018 [US1] Persist and restore style state by shape ID in D:/workspace/flowchart-app/src/features/flowchart/store/flowchart-store.ts
- [X] T019 [US1] Wire style storage sync in D:/workspace/flowchart-app/src/features/flowchart/components/diagram-canvas.tsx
- [X] T020 [US1] Apply invalid-color fallback in D:/workspace/flowchart-app/src/features/flowchart/services/color-validation-service.ts
- [X] T021 [US1] Add Korean rationale comments for style restore path in D:/workspace/flowchart-app/src/features/flowchart/store/flowchart-store.ts

**Checkpoint**: User Story 1 is independently functional and testable.

---

## Phase 4: User Story 2 - 프레젠테이션 화살표 가시화 복구 (Priority: P2)

**Goal**: 프레젠테이션 시작/진행 중 화살표가 도형 경계 규칙으로 누락 없이 표시된다.

**Independent Test**: 2개 이상 도형 프레젠테이션에서 화살표가 source 경계에서 시작하고 target 경계 직전에서 끝나며 단계 이동 후에도 유지된다.

### Tests for User Story 2 (MANDATORY)

- [X] T022 [P] [US2] Add arrow boundary unit tests in D:/workspace/flowchart-app/tests/unit/arrow-boundary.spec.ts
- [X] T023 [P] [US2] Add connector visibility integration tests in D:/workspace/flowchart-app/tests/integration/presentation-arrow-boundary.integration.spec.ts
- [X] T024 [P] [US2] Add presentation arrow E2E flow in D:/workspace/flowchart-app/tests/integration/presentation-mode.e2e.ts

### Implementation for User Story 2

- [X] T025 [US2] Implement boundary start/end geometry in D:/workspace/flowchart-app/src/features/flowchart/services/arrow-geometry-service.ts
- [X] T026 [US2] Render connectors on presentation start/step change in D:/workspace/flowchart-app/src/features/flowchart/components/presentation-mode.tsx
- [X] T027 [US2] Recompute connectors on layout updates in D:/workspace/flowchart-app/src/features/flowchart/services/center-connector-service.ts
- [X] T028 [US2] Preserve connector visibility in progression state in D:/workspace/flowchart-app/src/features/flowchart/services/progression-service.ts
- [X] T029 [US2] Add Korean rationale comments for connector geometry decisions in D:/workspace/flowchart-app/src/features/flowchart/services/arrow-geometry-service.ts

**Checkpoint**: User Stories 1 and 2 both work independently.

---

## Phase 5: User Story 3 - 강조 스타일 가독성 강화 (Priority: P3)

**Goal**: 프레젠테이션 텍스트 1.3em과 활성 도형 blur/spread 2배(opacity 유지) 강조를 적용하고 비활성 도형과 구분 가능해야 한다.

**Independent Test**: 프레젠테이션에서 텍스트 1.3em, 활성 도형 blur/spread 2배, opacity 유지, 활성/비활성 시각 구분 기준이 충족된다.

### Tests for User Story 3 (MANDATORY)

- [X] T030 [P] [US3] Add highlight multiplier unit tests in D:/workspace/flowchart-app/tests/unit/presentation-highlight.spec.ts
- [X] T031 [P] [US3] Add active-vs-nonactive contrast unit tests in D:/workspace/flowchart-app/tests/unit/presentation-color-contrast.spec.ts
- [X] T032 [P] [US3] Add typography/highlight integration tests in D:/workspace/flowchart-app/tests/integration/presentation-performance.integration.spec.ts
- [X] T033 [P] [US3] Add redesigned emphasis E2E scenario in D:/workspace/flowchart-app/tests/integration/presentation-redesign.e2e.ts

### Implementation for User Story 3

- [X] T034 [US3] Apply presentation text size token (1.3em) in D:/workspace/flowchart-app/src/features/flowchart/components/presentation-mode.tsx
- [X] T035 [US3] Apply active-shape blur/spread 2x with fixed opacity in D:/workspace/flowchart-app/src/features/flowchart/components/shape-node.tsx
- [X] T036 [US3] Implement explicit active/non-active distinction rule in D:/workspace/flowchart-app/src/features/flowchart/models/presentation-theme.ts
- [X] T037 [US3] Align new-tab presentation style rendering in D:/workspace/flowchart-app/src/features/flowchart/components/presentation-tab.tsx
- [X] T038 [US3] Add Korean rationale comments for highlight policy in D:/workspace/flowchart-app/src/features/flowchart/models/presentation-theme.ts

**Checkpoint**: All user stories are independently functional and testable.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: UX/코드규칙/성능/증빙의 교차 검증 마무리

- [X] T039 [P] Validate UX copy consistency rules against UX-001/002 in D:/workspace/flowchart-app/tests/integration/presentation-contract-map.spec.ts
- [X] T040 Validate UX pattern change documentation requirement (UX-003) in D:/workspace/flowchart-app/specs/001-fix-presentation-visuals/quickstart.md
- [X] T041 [P] Validate PRF-001/002/003 budgets in D:/workspace/flowchart-app/tests/integration/performance-budget.spec.ts
- [X] T042 Validate naming convention compliance (CCR-002) in D:/workspace/flowchart-app/specs/001-fix-presentation-visuals/quickstart.md
- [X] T043 [P] Validate Korean rationale comment compliance (CCR-001) in D:/workspace/flowchart-app/specs/001-fix-presentation-visuals/quickstart.md
- [X] T044 Validate simple feature-first structure compliance (CCR-003) in D:/workspace/flowchart-app/specs/001-fix-presentation-visuals/plan.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: 즉시 시작 가능
- **Phase 2 (Foundational)**: Phase 1 완료 후 시작, 모든 사용자 스토리 블로킹
- **Phase 3-5 (User Stories)**: Phase 2 완료 후 시작
- **Phase 6 (Polish)**: 사용자 스토리 완료 후 시작

### User Story Dependencies

- **US1 (P1)**: Foundational 완료 후 즉시 시작 가능 (MVP)
- **US2 (P2)**: Foundational 완료 후 시작 가능, US1과 독립 검증 가능
- **US3 (P3)**: Foundational 완료 후 시작 가능, US1/US2와 독립 검증 가능

### Dependency Graph

- Setup -> Foundational -> US1 -> Polish
- Setup -> Foundational -> US2 -> Polish
- Setup -> Foundational -> US3 -> Polish

### Within Each User Story

- 테스트 작성/실패 확인 후 구현
- 동일 파일 수정 태스크는 순차 실행
- 다른 파일 태스크만 [P] 병렬 실행

---

## Parallel Execution Examples

### US1

```bash
# Parallel tests
T014, T015, T016

# Parallel implementation (different files)
T017, T019
```

### US2

```bash
# Parallel tests
T022, T023, T024

# Parallel implementation (different files)
T025, T027
```

### US3

```bash
# Parallel tests
T030, T031, T032, T033

# Parallel implementation (different files)
T036, T037
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 1 완료
2. Phase 2 완료
3. Phase 3 (US1) 완료
4. US1 독립 테스트 통과 확인 후 데모

### Incremental Delivery

1. Foundation 완료 후 US1 배포
2. US2 추가 후 프레젠테이션 흐름 배포
3. US3 추가 후 가독성 강화 배포
4. Phase 6에서 교차 품질 게이트 마무리

### Parallel Team Strategy

1. 팀 공통으로 Phase 1-2 완료
2. 이후 스토리 병렬 진행
- 개발자 A: US1
- 개발자 B: US2
- 개발자 C: US3
3. 스토리별 독립 검증 후 통합

---

## Notes

- 모든 태스크는 체크리스트 형식과 파일 경로를 포함한다.
- [P]는 파일 충돌 없는 병렬 가능 태스크만 표기했다.
- 사용자 스토리 단계 태스크는 모두 [US#] 라벨을 포함한다.
- MVP 권장 범위는 US1이다.
