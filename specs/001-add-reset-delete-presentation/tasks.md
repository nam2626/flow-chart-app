# Tasks: 도형 관리 및 프레젠테이션 모드

**Input**: Design documents from `D:/workspace/flowchart-app/specs/001-add-reset-delete-presentation/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: 테스트 작업은 필수다. 각 사용자 스토리에 단위 테스트를 포함하고,
사용자 흐름 변경에는 통합 또는 E2E 테스트를 포함한다.

**Organization**: 사용자 스토리별 독립 구현/검증이 가능하도록 단계별로 구성한다.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 공통 개발/검증 기반 준비

- [X] T001 테스트 러너/경로 설정 점검 및 스크립트 정리 in `package.json`
- [X] T002 [P] Vitest 공통 setup 정리 in `tests/setup.ts`
- [X] T003 [P] 프레젠테이션/삭제 시나리오용 테스트 픽스처 추가 in `tests/helpers/presentation-fixture.ts`
- [X] T004 [P] 계약 검증용 샘플 페이로드 템플릿 추가 in `tests/helpers/contract-fixture.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 모든 사용자 스토리 공통 기반 구성

**CRITICAL**: 이 단계 완료 전 사용자 스토리 구현 착수 금지

- [X] T005 FlowStep/PresentationSession/CanvasSettings 타입 확장 in `src/features/flowchart/models/flowchart-types.ts`
- [X] T006 [P] 프레젠테이션 상태 문구/용어 사전 정리 in `src/features/flowchart/models/ux-copy.ts`
- [X] T007 [P] 삭제 후 순서 재정렬 유틸 구현 in `src/features/flowchart/services/progression-service.ts`
- [X] T008 [P] 전체 초기화 기본값 정책 유틸 구현 in `src/features/flowchart/services/flowchart-validation.ts`
- [X] T009 프레젠테이션 상태와 persist 마이그레이션 처리 in `src/features/flowchart/store/flowchart-store.ts`
- [X] T010 계약 상수/오류 매핑 업데이트 in `src/features/flowchart/services/contract-map.ts`

**Checkpoint**: 사용자 스토리 구현 시작 가능

---

## Phase 3: User Story 1 - 도형 삭제 및 전체 초기화 (Priority: P1) - MVP

**Goal**: 단일 도형 삭제와 전체 초기화를 안전하게 수행하고, 삭제 후 순서를 자동 재정렬한다.

**Independent Test**: 3개 도형에서 1개 삭제 시 1..N 재정렬이 적용되고,
전체 초기화 시 도형/연결/프레젠테이션/캔버스 설정이 기본값으로 복원되어야 한다.

### Tests for User Story 1

- [X] T011 [P] [US1] 삭제 후 단계 재정렬 단위 테스트 추가 in `tests/unit/delete-reindex.spec.ts`
- [X] T012 [P] [US1] 전체 초기화 기본값 복원 단위 테스트 추가 in `tests/unit/reset-defaults.spec.ts`
- [X] T013 [US1] 삭제/초기화 통합 시나리오 테스트 추가 in `tests/integration/shape-delete-reset.integration.spec.ts`

### Implementation for User Story 1

- [X] T014 [P] [US1] 도형 삭제 액션 및 재정렬 반영 in `src/features/flowchart/store/flowchart-store.ts`
- [X] T015 [P] [US1] 전체 초기화 액션(캔버스 기본값 복원 포함) 구현 in `src/features/flowchart/store/flowchart-store.ts`
- [X] T016 [US1] 삭제/초기화 제어 버튼 및 확인 플로우 연결 in `src/features/flowchart/components/diagram-toolbar.tsx`
- [X] T017 [US1] 삭제 후 연결선/강조 단계 재계산 반영 in `src/features/flowchart/components/diagram-canvas.tsx`
- [X] T018 [US1] 빈 상태 삭제/초기화 안내 메시지 처리 in `src/features/flowchart/components/progression-banner.tsx`

**Checkpoint**: US1 단독 동작 및 검증 완료

---

## Phase 4: User Story 2 - 프레젠테이션 모드 실행 (Priority: P2)

**Goal**: 프레젠테이션 모드 시작 및 다음/이전 단계 이동 시 강조 상태를 일관되게 제공한다.

**Independent Test**: 유효 차트에서 모드 시작 시 첫 단계 강조,
다음/이전 이동 시 강조 대상과 현재 단계 정보가 정확히 갱신되어야 한다.

### Tests for User Story 2

- [X] T019 [P] [US2] 프레젠테이션 시작 조건 단위 테스트 추가 in `tests/unit/presentation-start.spec.ts`
- [X] T020 [P] [US2] 다음/이전 단계 이동 단위 테스트 추가 in `tests/unit/presentation-navigation.spec.ts`
- [X] T021 [US2] 프레젠테이션 시작/이동 통합 테스트 추가 in `tests/integration/presentation-mode.integration.spec.ts`
- [X] T022 [US2] 프레젠테이션 이동 E2E 테스트 추가 in `tests/integration/presentation-mode.e2e.ts`

### Implementation for User Story 2

- [X] T023 [P] [US2] 프레젠테이션 시작/이동 상태 액션 구현 in `src/features/flowchart/store/flowchart-store.ts`
- [X] T024 [P] [US2] 활성 단계 강조 렌더링 규칙 적용 in `src/features/flowchart/components/shape-node.tsx`
- [X] T025 [US2] 프레젠테이션 시작/이동 UI 제어 추가 in `src/features/flowchart/components/diagram-toolbar.tsx`
- [X] T026 [US2] 진행 상태 배너 문구/단계 표시 갱신 in `src/features/flowchart/components/progression-banner.tsx`

**Checkpoint**: US2 단독 동작 및 검증 완료

---

## Phase 5: User Story 3 - 프레젠테이션 종료 및 편집 복귀 (Priority: P3)

**Goal**: 프레젠테이션 종료 시 데이터 손실 없이 편집 화면으로 복귀한다.

**Independent Test**: 프레젠테이션 종료 후 편집 가능한 상태로 돌아오고,
기존 도형/순서/텍스트 데이터가 보존되어야 한다.

### Tests for User Story 3

- [X] T027 [P] [US3] 종료 시 상태 복원 단위 테스트 추가 in `tests/unit/presentation-exit.spec.ts`
- [X] T028 [US3] 종료 후 편집 복귀 통합 테스트 추가 in `tests/integration/presentation-exit.integration.spec.ts`
- [X] T029 [US3] 종료/복귀 E2E 테스트 추가 in `tests/integration/presentation-exit.e2e.ts`

### Implementation for User Story 3

- [X] T030 [US3] 프레젠테이션 종료 액션 및 스냅샷 복원 구현 in `src/features/flowchart/store/flowchart-store.ts`
- [X] T031 [US3] 종료 버튼 및 복귀 UX 연결 in `src/features/flowchart/components/diagram-toolbar.tsx`
- [X] T032 [US3] 종료 후 편집 상호작용 재활성화 처리 in `src/features/flowchart/components/diagram-canvas.tsx`

**Checkpoint**: US3 단독 동작 및 검증 완료

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 전 스토리 공통 품질 마무리

- [X] T033 [P] 50단계 기준 삭제/초기화/이동 성능 스모크 테스트 추가 in `tests/integration/presentation-performance.integration.spec.ts`
- [X] T034 [P] OpenAPI 계약-구현 매핑 회귀 테스트 추가 in `tests/integration/presentation-contract-map.spec.ts`
- [X] T035 UI 변경 전/후 증적 스크린샷(최소 3컷: before/after/presentation-active) 저장 및 검증 시나리오 추가 in `tests/integration/presentation-ui-evidence.e2e.ts`
- [X] T036 한글 주석/네이밍 규칙 점검 및 보강 in `src/features/flowchart/components/diagram-canvas.tsx`
- [X] T037 quickstart 검증 절차 최신화 in `specs/001-add-reset-delete-presentation/quickstart.md`
- [X] T038 품질 게이트 실행 로그 기록 in `specs/001-add-reset-delete-presentation/research.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- Phase 1 -> Phase 2 -> Phase 3/4/5 -> Phase 6
- Phase 3, 4, 5는 Phase 2 완료 후 병렬 진행 가능

### User Story Dependencies

- US1 (P1): 기반 단계 완료 후 즉시 시작, MVP 범위
- US2 (P2): 기반 단계 완료 후 시작 가능, US1과 독립 검증 가능
- US3 (P3): 기반 단계 완료 후 시작 가능, US1/US2와 독립 검증 가능

### Within Each User Story

- 테스트 작성/실행 -> 구현 -> 통합 검증 순서 준수
- 동일 파일 변경 작업은 순차 진행

## Parallel Execution Examples

### User Story 1

- T011과 T012 병렬 수행
- T014와 T015 병렬 수행 후 T016 진행

### User Story 2

- T019와 T020 병렬 수행
- T023과 T024 병렬 수행 후 T025 진행

### User Story 3

- T027 선행 후 T030 진행
- T031과 T032 병렬 가능

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 1, Phase 2 완료
2. Phase 3(US1) 완료
3. US1 독립 테스트 통과 확인 후 시연/배포 판단

### Incremental Delivery

1. US1 완료 후 배포 가능 상태 확보
2. US2 추가 후 배포
3. US3 추가 후 배포
4. Phase 6에서 공통 품질 마무리

### Parallel Team Strategy

1. 공통 기반(Phase 1~2) 공동 처리
2. 이후 담당 분리: A=US1, B=US2, C=US3
3. 통합 시 Phase 6에서 회귀 검증

## Notes

- 모든 태스크는 체크리스트 형식을 준수한다.
- 사용자 스토리 태스크는 반드시 `[USx]` 라벨을 포함한다.
- `[P]`는 파일 충돌과 선행 의존이 없는 항목에만 부여한다.
