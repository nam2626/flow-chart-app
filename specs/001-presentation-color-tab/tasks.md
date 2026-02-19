# Tasks: 도형 색상 커스터마이징 및 새탭 프레젠테이션 정렬 개선

**Input**: Design documents from `D:/workspace/flowchart-app/specs/001-presentation-color-tab/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: 테스트 작업은 필수다. 모든 사용자 스토리는 최소 단위 테스트를 포함해야 하며,
사용자 흐름 변경 시 통합 또는 E2E 테스트를 반드시 포함한다.

**Organization**: 사용자 스토리별 독립 구현/검증이 가능하도록 단계별로 구성한다.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 공통 개발/검증 기반 준비

- [X] T001 테스트 스크립트와 경로 정합성 점검 in `package.json`
- [X] T002 Vitest 전역 setup에 새탭 차단/복구 mock 유틸 추가 in `tests/setup.ts`
- [X] T003 [P] 도형 스타일 테스트 픽스처 추가 in `tests/helpers/shape-style-fixture.ts`
- [X] T004 [P] 프레젠테이션 새탭 세션 픽스처 추가 in `tests/helpers/presentation-tab-fixture.ts`
- [X] T005 [P] 중심 연결 경로 픽스처 추가 in `tests/helpers/center-connector-fixture.ts`
- [X] T006 [P] 긴 텍스트 edge case 픽스처 추가 in `tests/helpers/long-text-fixture.ts`
- [X] T007 [P] 색상 입력 공용 검증 헬퍼 추가 in `src/features/flowchart/services/color-validation-service.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 모든 사용자 스토리 공통 기반 구성

**CRITICAL**: 이 단계 완료 전 사용자 스토리 구현 착수 금지

- [X] T008 도형 스타일/새탭 세션/중심 경로 타입 확장 in `src/features/flowchart/models/flowchart-types.ts`
- [X] T009 [P] 계약 상수(색상 범위, 새탭 실패 코드, 중심 연결 규칙) 반영 in `src/features/flowchart/services/contract-map.ts`
- [X] T010 [P] UX 문구(새탭 차단 오류, 색상 검증 메시지) 추가 in `src/features/flowchart/models/ux-copy.ts`
- [X] T011 [P] 중심점-중심점 화살표 계산 기본 유틸 구현 in `src/features/flowchart/services/center-connector-service.ts`
- [X] T012 프레젠테이션 세션 상태 전이 및 persist 마이그레이션 반영 in `src/features/flowchart/store/flowchart-store.ts`
- [X] T013 프레젠테이션 전용 탭 렌더 진입점 스캐폴드 추가 in `src/features/flowchart/components/presentation-tab.tsx`
- [X] T014 편집 캔버스와 프레젠테이션 탭 상태 분기 정리 in `src/features/flowchart/components/diagram-canvas.tsx`

**Checkpoint**: 사용자 스토리 구현 시작 가능

---

## Phase 3: User Story 1 - 도형별 색상 지정 (Priority: P1) - MVP

**Goal**: 도형별 채움색/테두리색을 지정하고 새로고침 후에도 유지한다.

**Independent Test**: 3개 도형에 서로 다른 채움/테두리색을 지정 후 새로고침해도 동일 값이면 통과.

### Tests for User Story 1 (MANDATORY)

- [X] T015 [P] [US1] 도형별 색상 검증 단위 테스트 추가 in `tests/unit/shape-style-validation.spec.ts`
- [X] T016 [US1] 도형 색상 persist/복원 단위 테스트 추가 in `tests/unit/shape-style-persist.spec.ts`
- [X] T017 [US1] 도형별 색상 반영 통합 테스트 추가 in `tests/integration/shape-style.integration.spec.ts`
- [X] T018 [US1] 도형별 색상 지정/새로고침 유지 E2E 테스트 추가 in `tests/integration/shape-style.e2e.ts`

### Implementation for User Story 1

- [X] T019 [US1] 도형 스타일 모델(채움/테두리) 추가 in `src/features/flowchart/models/shape-style-model.ts`
- [X] T020 [US1] 도형 스타일 업데이트 액션/셀렉터 구현 in `src/features/flowchart/store/flowchart-store.ts`
- [X] T021 [US1] 도형 컴포넌트에 색상 입력 UI 연결 in `src/features/flowchart/components/shape-node.tsx`
- [X] T022 [US1] 도형 렌더에 채움/테두리색 적용 in `src/features/flowchart/components/shape-node.tsx`
- [X] T023 [US1] 색상 입력 유효성/기본값 fallback 적용 in `src/features/flowchart/services/color-validation-service.ts`

**Checkpoint**: US1 단독 동작 및 검증 완료

---

## Phase 4: User Story 2 - 새탭 프레젠테이션 중앙 배치 (Priority: P2)

**Goal**: 프레젠테이션을 새탭으로 실행하고 흐름을 가로 중앙 정렬한다.

**Independent Test**: 프레젠테이션 시작 시 새탭이 열리고 현재 단계 상태가 유지되며, 차단 시 시작 취소 + 오류 문구가 표시되면 통과.

### Tests for User Story 2 (MANDATORY)

- [X] T024 [P] [US2] 새탭 오픈 성공/차단 분기 단위 테스트 추가 in `tests/unit/presentation-new-tab.spec.ts`
- [X] T025 [US2] 새탭 중앙 정렬 및 단계 상태 연속성 통합 테스트 추가 in `tests/integration/presentation-tab-layout.integration.spec.ts`
- [X] T026 [US2] 새탭 차단 시 시작 취소 E2E 테스트 추가 in `tests/integration/presentation-tab-blocked.e2e.ts`
- [X] T027 [US2] 긴 텍스트 상태 중앙 정렬 유지 통합 테스트 추가 in `tests/integration/presentation-long-text-layout.integration.spec.ts`

### Implementation for User Story 2

- [X] T028 [US2] 새탭 오픈 서비스 구현 in `src/features/flowchart/services/presentation-tab-service.ts`
- [X] T029 [US2] 프레젠테이션 시작 시 새탭 전환 + 현재 단계 상태 전달/복원 로직 연결 in `src/features/flowchart/store/flowchart-store.ts`
- [X] T030 [US2] 새탭 프레젠테이션 전용 화면 렌더 구현 in `src/features/flowchart/components/presentation-tab.tsx`
- [X] T031 [US2] 프레젠테이션 흐름 가로 중앙 정렬 스타일 적용 in `src/features/flowchart/components/presentation-mode.tsx`
- [X] T032 [US2] 새탭 차단 오류 피드백 연결 in `src/features/flowchart/components/progression-banner.tsx`

**Checkpoint**: US2 단독 동작 및 검증 완료

---

## Phase 5: User Story 3 - 강조 시각 및 화살표 중심 연결 개선 (Priority: P3)

**Goal**: 활성 도형 그림자 강조를 강화하고 화살표를 중심점-중심점으로 연결한다.

**Independent Test**: 활성 도형 강조 opacity 2배(상한 1.0) 및 중심점 연결 화살표 렌더링이 확인되면 통과.

### Tests for User Story 3 (MANDATORY)

- [X] T033 [P] [US3] 중심점 연결 경로 계산 단위 테스트 추가 in `tests/unit/center-connector.spec.ts`
- [X] T034 [US3] 강조 opacity 규칙 단위 테스트 추가 in `tests/unit/presentation-highlight.spec.ts`
- [X] T035 [US3] 중심 화살표 렌더 통합 테스트 추가 in `tests/integration/center-connector.integration.spec.ts`
- [X] T036 [US3] 강조/중심 연결 프레젠테이션 E2E 테스트 추가 in `tests/integration/presentation-highlight-connector.e2e.ts`

### Implementation for User Story 3

- [X] T037 [US3] 중심 연결 경로 계산 유틸 적용 in `src/features/flowchart/services/center-connector-service.ts`
- [X] T038 [US3] 프레젠테이션 렌더의 화살표 시작/종료를 중심점으로 변경 in `src/features/flowchart/components/presentation-mode.tsx`
- [X] T039 [US3] 활성 도형 box-shadow opacity 2배 규칙 반영(상한 1.0) in `src/features/flowchart/models/presentation-theme.ts`
- [X] T040 [US3] 프레젠테이션 도형 강조 스타일 갱신 in `src/features/flowchart/components/presentation-mode.tsx`

**Checkpoint**: US3 단독 동작 및 검증 완료

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 전 스토리 공통 품질 마무리

- [X] T041 [P] 새탭 전환 p95 300ms 검증 테스트 추가 in `tests/integration/presentation-tab-performance.integration.spec.ts`
- [X] T042 [P] 중심 화살표 재계산 p95 300ms 검증 테스트 추가 in `tests/integration/center-connector-performance.integration.spec.ts`
- [X] T043 [P] OpenAPI 계약-구현 매핑 회귀 테스트 추가 in `tests/integration/presentation-color-contract.spec.ts`
- [X] T044 UX-003 신규 UX 패턴 도입 사유/영향 문서화 in `specs/001-presentation-color-tab/research.md`
- [X] T045 quickstart 검증 절차/실패 시나리오 최신화 in `specs/001-presentation-color-tab/quickstart.md`
- [X] T046 리서치 문서에 성능 측정 기록 템플릿 추가 in `specs/001-presentation-color-tab/research.md`
- [X] T047 변경 파일 한글 주석(왜) 점검 및 보강 in `src/features/flowchart/components/presentation-mode.tsx`
- [X] T048 네이밍 규칙 점검 리포트 작성 in `specs/001-presentation-color-tab/research.md`

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

- T015와 T018은 병렬 수행 가능
- T019 완료 후 T020, T021, T022 순차 진행

### User Story 2

- T024와 T026은 병렬 수행 가능
- T028 완료 후 T029, T030, T031, T032 순차 진행

### User Story 3

- T033과 T036은 병렬 수행 가능
- T037 완료 후 T038, T039, T040 순차 진행

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
