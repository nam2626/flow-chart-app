# Tasks: 단계형 플로우차트 보강

**Input**: Design documents from `D:/workspace/flowchart-app/specs/001-fix-export-arrow-layout/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: 테스트 작업은 필수다. 각 사용자 스토리에 단위 테스트를 포함하고,
사용자 흐름 변경에는 통합 또는 E2E 테스트를 포함한다.

**Organization**: 사용자 스토리별 독립 구현/검증이 가능하도록 단계별로 구성한다.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 공통 개발/검증 기반 정렬

- [X] T001 lint/typecheck 스크립트와 실행 가이드를 정리 in `package.json`
- [X] T002 [P] 테스트 공통 설정(환경/헬퍼) 정리 in `tests/setup.ts`
- [X] T003 [P] 플로우차트 테스트 데이터 팩토리 추가 in `tests/helpers/flowchart-fixture.ts`
- [X] T004 품질 게이트 체크리스트(주석/네이밍/성능 측정 기준) 정리 in `specs/001-fix-export-arrow-layout/quickstart.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 모든 스토리에서 공통으로 사용하는 핵심 기반 구성

**CRITICAL**: 이 단계 완료 전 사용자 스토리 구현 착수 금지

- [X] T005 Flowchart/Step/Connection/Export 타입 정합성 보강 in `src/features/flowchart/models/flowchart-types.ts`
- [X] T006 zustand + localStorage persist 스키마 버전/마이그레이션 처리 in `src/features/flowchart/store/flowchart-store.ts`
- [X] T007 [P] 단계 검증 규칙(텍스트 필수/폭 범위) 공통 함수 정리 in `src/features/flowchart/services/flowchart-validation.ts`
- [X] T008 [P] 공통 UX 문구 사전(오류/검증/상태) 정리 in `src/features/flowchart/models/ux-copy.ts`
- [X] T009 [P] 화살표 연결 계산 유틸(인접 단계 기반) 정리 in `src/features/flowchart/services/progression-service.ts`
- [X] T010 내보내기 선검증-실행-오류매핑 흐름 정리 in `src/features/flowchart/services/svg-export-service.ts`

**Checkpoint**: 사용자 스토리 구현 시작 가능

---

## Phase 3: User Story 1 - 단계형 차트 작성 (Priority: P1) - MVP

**Goal**: 단계 추가/텍스트 입력/세로 정렬/인접 화살표 자동 연결을 제공한다.

**Independent Test**: 3단계 추가 후 텍스트 입력 시 세로 배치와 1->2, 2->3 화살표가 표시되고,
빈 텍스트가 있으면 저장/내보내기가 차단되어야 한다.

### Tests for User Story 1

- [X] T011 [P] [US1] 단계 텍스트 필수 검증 단위 테스트 추가 in `tests/unit/flowchart-validation.spec.ts`
- [X] T012 [P] [US1] 인접 단계 화살표 연결 단위 테스트 추가 in `tests/unit/progression-service.spec.ts`
- [X] T013 [US1] 단계 작성 및 검증 차단 통합 테스트 추가 in `tests/integration/flowchart-authoring.integration.spec.ts`

### Implementation for User Story 1

- [X] T014 [P] [US1] 단계 노드 텍스트 입력/표시 규칙 반영 in `src/features/flowchart/components/shape-node.tsx`
- [X] T015 [P] [US1] 세로 나열 레이아웃 및 연결선 렌더링 보강 in `src/features/flowchart/components/diagram-canvas.tsx`
- [X] T016 [US1] 단계 추가/삭제 시 연결 재계산 및 상태 동기화 in `src/features/flowchart/store/flowchart-store.ts`
- [X] T017 [US1] 빈 텍스트 차단 UX(메시지/버튼 상태) 연결 in `src/features/flowchart/components/diagram-toolbar.tsx`

**Checkpoint**: US1 단독 동작 및 검증 완료

---

## Phase 4: User Story 2 - 캔버스 폭 조절 (Priority: P2)

**Goal**: 사용자 입력 기반 캔버스 가로폭(300~400px) 적용 및 범위 오류 피드백 제공

**Independent Test**: 폭 300/350/400은 즉시 반영되고, 299/401/비숫자는 거부 및 안내 메시지가 표시되어야 한다.

### Tests for User Story 2

- [X] T018 [P] [US2] 폭 범위/형식 검증 단위 테스트 추가 in `tests/unit/canvas-width-validation.spec.ts`
- [X] T019 [US2] 폭 입력 UX 통합 테스트 추가 in `tests/integration/canvas-width-control.integration.spec.ts`

### Implementation for User Story 2

- [X] T020 [US2] 폭 입력 컴포넌트 검증/오류 표시 보강 in `src/features/flowchart/components/canvas-width-control.tsx`
- [X] T021 [US2] 폭 변경 상태 반영 및 persist 연동 in `src/features/flowchart/store/flowchart-store.ts`
- [X] T022 [US2] 캔버스 렌더링 폭 적용과 경계값 처리 보강 in `src/features/flowchart/components/diagram-canvas.tsx`
- [X] T023 [US2] 폭 오류 메시지 문구 일관성 반영 in `src/features/flowchart/models/ux-copy.ts`

**Checkpoint**: US2 단독 동작 및 검증 완료

---

## Phase 5: User Story 3 - 차트 내보내기 복구 (Priority: P3)

**Goal**: 유효 차트 내보내기 성공률을 높이고 실패 시 조치 가능한 안내를 제공한다.

**Independent Test**: 유효 차트는 파일 생성 성공, 유효하지 않은 차트는 실패 원인/수정 안내가 표시되어야 한다.

### Tests for User Story 3

- [X] T024 [P] [US3] 내보내기 선검증/오류 매핑 단위 테스트 추가 in `tests/unit/svg-export-service.spec.ts`
- [X] T025 [US3] 내보내기 사용자 흐름 통합 테스트 추가 in `tests/integration/flowchart-export.integration.spec.ts`
- [X] T026 [US3] 내보내기 E2E 시나리오 추가 in `tests/integration/flowchart-export.e2e.ts`

### Implementation for User Story 3

- [X] T027 [US3] 내보내기 실행 전 유효성 검사 게이트 적용 in `src/features/flowchart/services/svg-export-service.ts`
- [X] T028 [US3] 내보내기 트리거/성공/실패 UX 연결 in `src/features/flowchart/components/diagram-toolbar.tsx`
- [X] T029 [US3] 내보내기 오류 코드-문구 매핑 정리 in `src/features/flowchart/services/contract-map.ts`

**Checkpoint**: US3 단독 동작 및 검증 완료

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 전 스토리 공통 품질 마무리

- [X] T030 [P] 성능 스모크 측정(50단계 기준) 스크립트/기록 추가 in `tests/integration/performance-smoke.integration.spec.ts`
- [X] T031 투명 배경 편집/내보내기 회귀 테스트 추가 in `tests/integration/transparent-background.integration.spec.ts`
- [X] T032 [P] 주석 한글화 및 네이밍 규칙 점검/수정 in `src/features/flowchart/components/diagram-canvas.tsx`
- [X] T033 quickstart 검증 절차 최신화 in `specs/001-fix-export-arrow-layout/quickstart.md`
- [X] T034 전체 품질 게이트 실행 및 결과 기록 in `specs/001-fix-export-arrow-layout/research.md`
- [X] T035 UI 변경 전/후 스크린샷 및 검증 근거 수집 in `specs/001-fix-export-arrow-layout/quickstart.md`
- [X] T036 신규/변경 파일 경로 단순 계층 규칙 점검 in `specs/001-fix-export-arrow-layout/plan.md`

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
- 동일 파일을 수정하는 작업은 순차 진행

## Parallel Execution Examples

### User Story 1

- T011과 T012 병렬 수행
- T014와 T015 병렬 수행 후 T016 진행

### User Story 2

- T018 수행 후 T020/T023 병렬 가능
- T021과 T022는 상태/렌더링 연계 확인을 위해 순차 권장

### User Story 3

- T024 완료 후 T027 진행
- T028과 T029 병렬 수행 가능

## Implementation Strategy

### MVP First (US1)

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
