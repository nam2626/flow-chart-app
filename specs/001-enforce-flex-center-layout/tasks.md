# Tasks: 수동 위치 금지 중앙 정렬 레이아웃

**Input**: Design documents from `D:/workspace/flowchart-app/specs/001-enforce-flex-center-layout/`
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/flowchart-flex-layout.openapi.yaml`

**Tests**: 테스트 작업은 필수다. 모든 사용자 스토리는 단위 테스트를 포함하고, 사용자 흐름 변경은 통합 또는 E2E 테스트를 포함한다.

**Organization**: 사용자 스토리별 독립 구현/검증이 가능하도록 단계별로 구성한다.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 구현 준비 및 공통 기준 동기화

- [X] T001 계약 키와 규칙 맵을 기능 요구사항에 맞게 정렬 in `src/features/flowchart/services/contract-map.ts`
- [X] T002 [P] 레이아웃 정책 타입(`FLOW_ONLY`, `EXPAND_WITH_CONTENT`) 추가 in `src/features/flowchart/models/flowchart-types.ts`
- [X] T003 [P] 테스트 픽스처에 플렉스 세로 중앙 정렬 기본 데이터 추가 in `tests/helpers/center-connector-fixture.ts`
- [X] T004 성능 예산 측정 구간(재배치 시작~반영 완료) 훅 정리 in `src/features/flowchart/services/performance-budget-service.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 모든 사용자 스토리에서 공통으로 사용하는 핵심 배치 엔진 구성

**CRITICAL**: 이 단계 완료 전에는 사용자 스토리 구현을 시작하지 않는다.

- [X] T005 `FlowLayoutContainerState`/`FlowShapeLayoutItem`/`ConnectorFlowRow` 모델 반영 in `src/features/flowchart/models/flow-node-model.ts`
- [X] T006 절대 배치 금지 검증 유틸 추가 in `src/features/flowchart/services/flowchart-validation.ts`
- [X] T007 [P] 연결선 행 기반 중심 계산 로직 확장 in `src/features/flowchart/services/center-connector-service.ts`
- [X] T008 [P] 화살표 경계/행 높이 계산을 행 기반으로 확장 in `src/features/flowchart/services/arrow-geometry-service.ts`
- [X] T009 공통 플로우 렌더러 컴포넌트 추가(편집/프레젠테이션 공용) in `src/features/flowchart/components/flow-layout-stack.tsx`
- [X] T010 공통 플로우 렌더러 단위 테스트 추가 in `tests/unit/flow-layout-stack.spec.ts`

**Checkpoint**: 공통 배치 엔진 준비 완료. 이후 사용자 스토리 구현 가능.

---

## Phase 3: User Story 1 - 자동 세로 중앙 정렬 표시 (Priority: P1) - MVP

**Goal**: 편집 화면에서 도형/연결선을 세로 플로우 + 가로 중앙 정렬로 자동 표시한다.

**Independent Test**: 편집 화면에서 도형 3개 이상 생성 시 수동 좌표 없이 세로 배치되고 연결선이 도형 사이 행으로 표시되며 중심선이 일치해야 한다.

### Tests for User Story 1 (MANDATORY)

- [X] T011 [P] [US1] 편집 레이아웃 정책 단위 테스트 추가 in `tests/unit/flowchart-validation.spec.ts`
- [X] T012 [P] [US1] 편집 화면 세로 중앙 정렬 통합 테스트 추가 in `tests/integration/center-connector.integration.spec.ts`

### Implementation for User Story 1

- [X] T013 [US1] 편집 캔버스 컨테이너를 세로 플렉스/가로 중앙 정렬로 전환 in `src/features/flowchart/components/diagram-canvas.tsx`
- [X] T014 [US1] 도형 렌더에서 수동 `top/left` 스타일 제거 및 흐름 배치 적용 in `src/features/flowchart/components/shape-node.tsx`
- [X] T015 [US1] 연결선을 도형 사이 전용 행으로 렌더링하도록 편집 뷰 연결 in `src/features/flowchart/components/diagram-canvas.tsx`
- [X] T016 [US1] 편집 모드 정렬 안내/오류 문구를 UX 규칙에 맞게 정리 in `src/features/flowchart/models/ux-copy.ts`

**Checkpoint**: US1 단독 동작 및 테스트 통과.

---

## Phase 4: User Story 2 - 변경 후 자동 재배치 유지 (Priority: P2)

**Goal**: 도형 추가/삭제/순서 변경 직후 동일 배치 규칙으로 즉시 재배치한다.

**Independent Test**: 편집 화면에서 추가/삭제/순서 변경 직후 자동 재배치가 유지되고 컨테이너 높이가 확장되며 내부 스크롤 의존 없이 표시되어야 한다.

### Tests for User Story 2 (MANDATORY)

- [X] T017 [P] [US2] 스토어 변경 이벤트 재배치 단위 테스트 추가 in `tests/unit/flowchart-store.spec.ts`
- [X] T018 [P] [US2] 추가/삭제/순서변경 재배치 통합 테스트 추가 in `tests/integration/shape-delete-reset.integration.spec.ts`

### Implementation for User Story 2

- [X] T019 [US2] 도형 변경 액션 후 공통 배치 엔진 재계산 연결 in `src/features/flowchart/store/flowchart-store.ts`
- [X] T020 [US2] 단계 순서 패널 변경 시 즉시 재배치 이벤트 연동 in `src/features/flowchart/components/step-order-panel.tsx`
- [X] T021 [US2] 컨테이너 높이 확장 정책과 겹침 검증 반영 in `src/features/flowchart/services/flowchart-validation.ts`
- [X] T022 [US2] 재배치 성능 p95 측정 포인트 통합 in `src/features/flowchart/services/performance-budget-service.ts`

**Checkpoint**: US1 + US2 독립 검증 가능.

---

## Phase 5: User Story 3 - 프레젠테이션 화면 동일 규칙 (Priority: P3)

**Goal**: 프레젠테이션 화면에서도 동일한 세로 플로우 중앙 정렬 규칙을 적용한다.

**Independent Test**: 동일 데이터에서 편집/프레젠테이션 전환 시 도형 배치, 연결선 행 렌더, 절대 배치 금지 규칙이 동일해야 한다.

### Tests for User Story 3 (MANDATORY)

- [X] T023 [P] [US3] 프레젠테이션 레이아웃 일치 단위 테스트 추가 in `tests/unit/presentation-view-state.spec.ts`
- [X] T024 [P] [US3] 편집/프레젠테이션 레이아웃 일치 통합 테스트 추가 in `tests/integration/presentation-mode.integration.spec.ts`
- [X] T025 [P] [US3] 프레젠테이션 시작 후 정렬 일치 E2E 테스트 추가 in `tests/integration/presentation-mode.e2e.ts`

### Implementation for User Story 3

- [X] T026 [US3] 프레젠테이션 화면에 공통 플로우 렌더러 적용 in `src/features/flowchart/components/presentation-mode.tsx`
- [X] T027 [US3] 프레젠테이션 탭 전환 시 동일 배치 정책 유지 로직 보강 in `src/features/flowchart/components/presentation-tab.tsx`
- [X] T028 [US3] 프레젠테이션 관련 계약 매핑 업데이트 in `src/features/flowchart/services/contract-map.ts`
- [X] T029 [US3] 프레젠테이션 정렬 성능 측정 및 경고 연동 in `src/features/flowchart/services/performance-budget-service.ts`

**Checkpoint**: US1~US3 모두 독립 동작 및 화면 간 일관성 확보.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 공통 품질/문서/회귀 검증 마무리

- [X] T030 [P] 계약 문서와 구현 키 정합성 최종 점검 in `specs/001-enforce-flex-center-layout/contracts/flowchart-flex-layout.openapi.yaml`
- [X] T031 [P] 빠른 검증 절차와 증적 항목 최신화 in `specs/001-enforce-flex-center-layout/quickstart.md`
- [X] T032 성능/UX 회귀 통합 테스트 보강 in `tests/integration/performance-budget.spec.ts`
- [X] T033 `npm run lint`, `npm run typecheck`, `npm run test:unit`, `npm run test:integration`, `npm run test:e2e` 실행 결과 기록 in `specs/001-enforce-flex-center-layout/plan.md`
- [X] T034 [P] CCR-001 한글 근거 주석 점검 체크리스트 추가 in `specs/001-enforce-flex-center-layout/quickstart.md`
- [X] T035 [P] CCR-002 네이밍 규칙(`PascalCase/camelCase/UPPER_SNAKE_CASE/kebab-case`) 준수 점검 태스크 추가 in `specs/001-enforce-flex-center-layout/plan.md`
- [X] T036 [P] CCR-003 기능 중심 단순 구조 유지 점검 결과 기록 in `specs/001-enforce-flex-center-layout/plan.md`
- [X] T037 [P] 신규 UX 패턴 도입 여부 및 영향 기록 점검 in `specs/001-enforce-flex-center-layout/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- Phase 1 (Setup) -> 시작 가능
- Phase 2 (Foundational) -> Phase 1 완료 후 시작, 모든 사용자 스토리 차단
- Phase 3~5 (US1~US3) -> Phase 2 완료 후 진행 (기본 순서 P1 -> P2 -> P3)
- Phase 6 (Polish) -> 모든 사용자 스토리 완료 후 진행

### User Story Dependencies

- **US1 (P1)**: Foundational 완료 후 즉시 시작 가능 (MVP)
- **US2 (P2)**: Foundational 완료 후 시작, US1 배치 엔진 재사용
- **US3 (P3)**: Foundational 완료 후 시작, US1/US2 규칙을 프레젠테이션에 동일 적용

### Parallel Opportunities

- Setup: `T002`, `T003` 병렬 가능
- Foundational: `T007`, `T008` 병렬 가능
- US1: `T011`, `T012` 병렬 가능
- US2: `T017`, `T018` 병렬 가능
- US3: `T023`, `T024`, `T025` 병렬 가능
- Polish: `T030`, `T031` 병렬 가능
- Polish: `T034`, `T035`, `T036`, `T037` 병렬 가능

---

## Parallel Example: User Story 1

```bash
# Tests in parallel
Task: "T011 [US1] tests/unit/flowchart-validation.spec.ts"
Task: "T012 [US1] tests/integration/center-connector.integration.spec.ts"

# After tests fail, implement sequentially
Task: "T013 [US1] src/features/flowchart/components/diagram-canvas.tsx"
Task: "T014 [US1] src/features/flowchart/components/shape-node.tsx"
```

## Parallel Example: User Story 2

```bash
# Tests in parallel
Task: "T017 [US2] tests/unit/flowchart-store.spec.ts"
Task: "T018 [US2] tests/integration/shape-delete-reset.integration.spec.ts"

# Implementation sequence
Task: "T019 [US2] src/features/flowchart/store/flowchart-store.ts"
Task: "T020 [US2] src/features/flowchart/components/step-order-panel.tsx"
```

## Parallel Example: User Story 3

```bash
# Tests in parallel
Task: "T023 [US3] tests/unit/presentation-view-state.spec.ts"
Task: "T024 [US3] tests/integration/presentation-mode.integration.spec.ts"
Task: "T025 [US3] tests/integration/presentation-mode.e2e.ts"

# Implementation sequence
Task: "T026 [US3] src/features/flowchart/components/presentation-mode.tsx"
Task: "T027 [US3] src/features/flowchart/components/presentation-tab.tsx"
```

---

## Implementation Strategy

### MVP First (US1 only)

1. Phase 1 완료
2. Phase 2 완료
3. Phase 3(US1) 완료
4. US1 단독 테스트 통과 후 데모

### Incremental Delivery

1. US1 완료 후 배포/검증
2. US2 추가 후 재배치 안정성 검증
3. US3 추가 후 화면 간 일관성 검증
4. Phase 6에서 회귀/문서/성능 증적 마감

### Validation Rule

- 모든 태스크는 체크리스트 형식(`- [ ] Txxx ...`) 유지
- 사용자 스토리 태스크는 반드시 `[USn]` 라벨 포함
- 경로 없는 태스크는 허용하지 않음


