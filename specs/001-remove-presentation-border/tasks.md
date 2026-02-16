# Tasks: Remove Presentation Border

**Input**: Design documents from `D:/workspace/flowchart-app/specs/001-remove-presentation-border/`
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/presentation-border-removal.openapi.yaml`

**Tests**: 본 기능은 사용자 흐름 UI 변경이므로 단위/통합/E2E 테스트를 포함한다.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 작업 범위와 검증 산출물의 기준선을 확정

- [X] T001 영향 파일 목록과 완료 기준 고정 in `specs/001-remove-presentation-border/plan.md`
- [X] T002 [P] 프레젠테이션 무테두리 단위 테스트 스캐폴딩 생성 in `tests/unit/presentation-container-borderless.spec.ts`
- [X] T003 [P] 프레젠테이션 모드 통합 테스트 스캐폴딩 생성 in `tests/integration/presentation-borderless-mode.integration.spec.ts`
- [X] T004 [P] 프레젠테이션 팝업 E2E 테스트 스캐폴딩 생성 in `tests/integration/presentation-borderless-popup.e2e.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 모든 스토리가 공통으로 의존하는 무테두리 렌더 정책 확립

**CRITICAL**: No user story work can begin until this phase is complete

- [X] T005 프레젠테이션 컨테이너 borderless 정책 상수 정의 in `src/features/flowchart/models/presentation-theme.ts`
- [X] T006 [P] 컨테이너 borderless 정책 검증 로직 추가 in `src/features/flowchart/services/flowchart-validation.ts`
- [X] T007 [P] 프레젠테이션 계약 맵에 borderless 정책 키 반영 in `src/features/flowchart/services/contract-map.ts`
- [X] T008 인앱 프레젠테이션 공통 렌더 정책 함수 정리 in `src/features/flowchart/components/flow-layout-stack.tsx`
- [X] T009 팝업 프레젠테이션 HTML 공통 정책 함수 정리 in `src/features/flowchart/services/presentation-tab-service.ts`
- [X] T010 성능 기준 시나리오(10개 노드, p95 목표) 측정 기준 반영 in `src/features/flowchart/services/performance-budget-service.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Presentation Focused View (Priority: P1) - MVP

**Goal**: 프레젠테이션 모드 진입 시 컨테이너 테두리를 제거한다.

**Independent Test**: 프레젠테이션 모드 진입 후 컨테이너가 무테두리이고, 빈 상태에서도 테두리가 보이지 않는지 확인.

### Tests for User Story 1

- [X] T011 [P] [US1] 프레젠테이션 컨테이너 무테두리 단위 테스트 작성 in `tests/unit/presentation-container-borderless.spec.ts`
- [X] T012 [P] [US1] 프레젠테이션 진입 시 무테두리 통합 테스트 작성 in `tests/integration/presentation-borderless-mode.integration.spec.ts`
- [X] T013 [P] [US1] 프레젠테이션 팝업 최초 렌더 무테두리 E2E 테스트 작성 in `tests/integration/presentation-borderless-popup.e2e.ts`
- [X] T014 [P] [US1] 빈 상태 프레젠테이션 무테두리 통합 테스트 작성 in `tests/integration/presentation-empty-state.integration.spec.ts`

### Implementation for User Story 1

- [X] T015 [US1] 프레젠테이션 모드 컨테이너 border 제거 적용 in `src/features/flowchart/components/presentation-mode.tsx`
- [X] T016 [US1] 플로우 레이아웃 스택 presentation 컨테이너 border 제거 in `src/features/flowchart/components/flow-layout-stack.tsx`
- [X] T017 [US1] 프레젠테이션 탭 컨테이너 border 제거 in `src/features/flowchart/services/presentation-tab-service.ts`
- [X] T018 [US1] 프레젠테이션 탭 뷰 래퍼가 공통 정책을 따르도록 정리 in `src/features/flowchart/components/presentation-tab.tsx`
- [X] T019 [US1] 빈 상태 프레젠테이션 렌더 경로에 무테두리 정책 적용 in `src/features/flowchart/components/flow-layout-stack.tsx`

**Checkpoint**: User Story 1 is fully functional and testable independently

---

## Phase 4: User Story 2 - Consistent Presentation Appearance (Priority: P2)

**Goal**: 모드 반복 전환 후에도 무테두리 상태를 일관되게 유지한다.

**Independent Test**: 편집↔프레젠테이션 10회 반복 전환 후 매회 border 미노출 유지 확인.

### Tests for User Story 2

- [X] T020 [P] [US2] 모드 반복 전환 무테두리 지속성 통합 테스트 작성 in `tests/integration/presentation-borderless-mode.integration.spec.ts`
- [X] T021 [P] [US2] 반복 전환 사용자 시나리오 E2E 테스트 작성 in `tests/integration/presentation-mode.e2e.ts`

### Implementation for User Story 2

- [X] T022 [US2] 모드 전환 시 컨테이너 정책 재초기화 누락 보정 in `src/features/flowchart/store/flowchart-store.ts`
- [X] T023 [US2] 프레젠테이션 재진입 시 정책 적용 순서 고정 in `src/features/flowchart/services/progression-service.ts`
- [X] T024 [US2] 모드 전환 UX 카피/경고 문구 일관성 정리 in `src/features/flowchart/models/ux-copy.ts`
- [X] T025 [US2] UX 패턴 변경 사유 및 마이그레이션 영향 기록 in `specs/001-remove-presentation-border/spec.md`

**Checkpoint**: User Stories 1 and 2 both work independently

---

## Phase 5: User Story 3 - Existing Flowchart Usability Preserved (Priority: P3)

**Goal**: 테두리 제거 이후에도 단계 이동/강조 등 기존 사용성을 유지한다.

**Independent Test**: 프레젠테이션 단계 이동 시 강조/커넥터 동작 정상 + 컨테이너 무테두리 유지.

### Tests for User Story 3

- [X] T026 [P] [US3] 단계 이동 중 무테두리 유지 단위 테스트 작성 in `tests/unit/presentation-navigation.spec.ts`
- [X] T027 [P] [US3] 단계 이동/강조 회귀 통합 테스트 갱신 in `tests/integration/presentation-mode.integration.spec.ts`
- [X] T028 [P] [US3] 단계 이동 시각 회귀 E2E 테스트 갱신 in `tests/integration/presentation-highlight-connector.e2e.ts`

### Implementation for User Story 3

- [X] T029 [US3] 단계 이동 렌더 경로에서 무테두리 정책 유지 보장 in `src/features/flowchart/components/flow-layout-stack.tsx`
- [X] T030 [US3] 프레젠테이션 새 탭 렌더 업데이트 경로 동기화 in `src/features/flowchart/services/presentation-tab-service.ts`
- [X] T031 [US3] 테스트 픽스처에 무테두리 기대값 반영 in `tests/helpers/presentation-fixture.ts`

**Checkpoint**: All user stories are independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 헌장 준수, 문서 정합성, 최종 품질 게이트 정리

- [X] T032 [P] 계약 문서와 실제 렌더 정책 일치 검증 및 정리 in `specs/001-remove-presentation-border/contracts/presentation-border-removal.openapi.yaml`
- [X] T033 [P] 수동 검증 절차(10회 반복/빈 상태 포함) 최신화 in `specs/001-remove-presentation-border/quickstart.md`
- [X] T034 CCR-001 준수 점검(한글 주석의 이유 설명) 반영 in `src/features/flowchart/components/flow-layout-stack.tsx`
- [X] T035 CCR-002 준수 점검(네이밍 규칙 위반 없음) 반영 in `specs/001-remove-presentation-border/plan.md`
- [X] T036 CCR-003 준수 점검(기능 중심 단순 구조 유지) 반영 in `specs/001-remove-presentation-border/plan.md`
- [X] T037 lint/typecheck/unit/integration/e2e 실행 후 결과 기록 in `specs/001-remove-presentation-border/plan.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: start immediately
- **Phase 2 (Foundational)**: depends on Phase 1 completion; blocks all user stories
- **Phase 3 (US1)**: depends on Phase 2; MVP
- **Phase 4 (US2)**: depends on Phase 2; independently testable
- **Phase 5 (US3)**: depends on Phase 2; independently testable
- **Phase 6 (Polish)**: depends on target user stories completion

### User Story Dependencies

- **US1 (P1)**: 독립 구현/검증 가능, MVP 범위
- **US2 (P2)**: 독립 구현/검증 가능
- **US3 (P3)**: 독립 구현/검증 가능

### Within Each User Story

- Write tests first and confirm failing assertions
- Apply implementation changes in components/services/store
- Re-run related tests before moving to next story

---

## Parallel Execution Examples

### User Story 1

- T011, T012, T013, T014 can run in parallel (different test files)

### User Story 2

- T020 and T021 can run in parallel
- T022 and T024 can run in parallel after tests are drafted

### User Story 3

- T026, T027, T028 can run in parallel

---

## Implementation Strategy

### MVP First (US1)

1. Complete Phase 1 and Phase 2
2. Deliver Phase 3 (US1)
3. Validate borderless presentation entry path and empty state

### Incremental Delivery

1. US1: 진입/빈 상태 무테두리 완성
2. US2: 반복 전환 일관성 확보
3. US3: 단계 이동/강조 회귀 방지
4. Polish: 계약/헌장/검증 로그 정리

### Team Parallel Strategy

1. Engineer A: component/service rendering tasks
2. Engineer B: mode transition/store tasks
3. Engineer C: test automation (unit/integration/e2e)

---

## Notes

- 모든 작업은 체크리스트 포맷(`- [X] Txxx ...`)을 유지한다.
- `[P]`는 파일 충돌 없는 작업에만 부여했다.
- 사용자 스토리 단계 작업에는 반드시 `[US#]` 라벨을 포함했다.
- 경로는 모두 저장소 기준 상대 경로로 명시했다.

