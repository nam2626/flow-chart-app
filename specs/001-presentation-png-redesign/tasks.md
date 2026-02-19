# Tasks: 프레젠테이션 컴포넌트 전환 및 PNG 내보내기

**Input**: Design documents from `D:/workspace/flowchart-app/specs/001-presentation-png-redesign/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: 테스트 작업은 필수다. 모든 사용자 스토리는 최소 단위 테스트를 포함해야 하며,
사용자 흐름 변경 시 통합 또는 E2E 테스트를 반드시 포함한다.

**Organization**: 사용자 스토리별 독립 구현/검증이 가능하도록 단계별로 구성한다.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 공통 개발/검증 기반 준비

- [X] T001 테스트 스크립트/경로 점검 및 정리 in `package.json`
- [X] T002 Vitest 전역 setup 점검(프레젠테이션 초기화 규칙 포함) in `tests/setup.ts`
- [X] T003 [P] 프레젠테이션 상태 테스트 픽스처 추가 in `tests/helpers/presentation-view-fixture.ts`
- [X] T004 [P] PNG 내보내기 테스트 픽스처 추가 in `tests/helpers/png-export-fixture.ts`
- [X] T005 [P] 프레젠테이션 리디자인 색상 토큰 스캐폴드 추가 in `src/features/flowchart/models/presentation-theme.ts`
- [X] T006 [P] 프레젠테이션 전용 컴포넌트 기본 스캐폴드 추가 in `src/features/flowchart/components/presentation-mode.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 모든 사용자 스토리 공통 기반 구성

**CRITICAL**: 이 단계 완료 전 사용자 스토리 구현 착수 금지

- [X] T007 프레젠테이션/내보내기 모델 타입 확장 in `src/features/flowchart/models/flowchart-types.ts`
- [X] T008 [P] 화살표 경계 계산 유틸 구현(종료 4px 오프셋) in `src/features/flowchart/services/arrow-geometry-service.ts`
- [X] T009 [P] PNG 변환/다운로드 서비스 기본 구현 in `src/features/flowchart/services/png-export-service.ts`
- [X] T010 [P] 프레젠테이션/PNG 계약 상수 매핑 업데이트 in `src/features/flowchart/services/contract-map.ts`
- [X] T011 프레젠테이션 상태 전이 및 persist 마이그레이션 반영 in `src/features/flowchart/store/flowchart-store.ts`
- [X] T012 전역 UX 문구 및 오류 코드 업데이트 in `src/features/flowchart/models/ux-copy.ts`
- [X] T013 편집/프레젠테이션 모드 분기 진입점 정리 in `src/features/flowchart/components/diagram-canvas.tsx`

**Checkpoint**: 사용자 스토리 구현 시작 가능

---

## Phase 3: User Story 1 - 프레젠테이션 전용 화면 전환 (Priority: P1) - MVP

**Goal**: 프레젠테이션 시작 시 별도 컴포넌트로 전환하고 단계 번호 텍스트를 숨긴다.

**Independent Test**: 프레젠테이션 시작 후 편집 입력 UI가 숨겨지고, 단계 번호 텍스트 없이 도형/본문이 표시되면 통과.

### Tests for User Story 1 (MANDATORY)

- [X] T014 [P] [US1] 프레젠테이션 상태 전이 단위 테스트 추가 in `tests/unit/presentation-view-state.spec.ts`
- [X] T015 [US1] 전용 컴포넌트 전환/번호 숨김 통합 테스트 추가 in `tests/integration/presentation-component-switch.integration.spec.ts`
- [X] T016 [US1] 프레젠테이션 시작/종료 E2E 테스트 추가 in `tests/integration/presentation-component-switch.e2e.ts`

### Implementation for User Story 1

- [X] T017 [US1] 프레젠테이션 전용 컴포넌트 렌더링 구현(단계 번호 미표시) in `src/features/flowchart/components/presentation-mode.tsx`
- [X] T018 [US1] 편집 컴포넌트와 프레젠테이션 컴포넌트 전환 연결 in `src/features/flowchart/components/diagram-canvas.tsx`
- [X] T019 [US1] 프레젠테이션 전용 컴포넌트에서 편집 입력/버튼 미렌더링 처리 in `src/features/flowchart/components/presentation-mode.tsx`
- [X] T020 [US1] 프레젠테이션 상태 배너 문구/표시 정책 반영 in `src/features/flowchart/components/progression-banner.tsx`

**Checkpoint**: US1 단독 동작 및 검증 완료

---

## Phase 4: User Story 2 - 발표 시각 흐름 리디자인 (Priority: P2)

**Goal**: 화살표를 도형 경계 기준으로 정확히 연결하고 도형/화살표/테두리 색상을 리디자인한다.

**Independent Test**: 다양한 도형 크기에서 화살표 시작/종료 지점이 경계 규칙을 만족하고, 리디자인 색상이 일관되면 통과.

### Tests for User Story 2 (MANDATORY)

- [X] T021 [P] [US2] 화살표 경계 계산(시작 경계/종료 4px) 단위 테스트 추가 in `tests/unit/arrow-boundary.spec.ts`
- [X] T022 [US2] 프레젠테이션 화살표 경계 통합 테스트 추가 in `tests/integration/presentation-arrow-boundary.integration.spec.ts`
- [X] T023 [US2] 리디자인 색상/강조 E2E 검증 추가 in `tests/integration/presentation-redesign.e2e.ts`
- [X] T024 [US2] 텍스트-배경 대비 4.5:1 검증 테스트 추가 in `tests/unit/presentation-color-contrast.spec.ts`

### Implementation for User Story 2

- [X] T025 [US2] 화살표 시작/종료점 계산 규칙 구현 in `src/features/flowchart/services/arrow-geometry-service.ts`
- [X] T026 [US2] 프레젠테이션 렌더에 경계 계산 유틸 적용 in `src/features/flowchart/components/presentation-mode.tsx`
- [X] T027 [US2] 프레젠테이션 색상 토큰(4종) 및 상태별 규칙 정의 in `src/features/flowchart/models/presentation-theme.ts`
- [X] T028 [US2] 도형/테두리/화살표 리디자인 색상 적용 in `src/features/flowchart/components/presentation-mode.tsx`

**Checkpoint**: US2 단독 동작 및 검증 완료

---

## Phase 5: User Story 3 - PNG 내보내기 (Priority: P3)

**Goal**: 프레젠테이션 전용 화면 기준으로 PNG 내보내기를 제공하고 성공/실패 피드백을 제공한다.

**Independent Test**: 유효 데이터에서 PNG 다운로드가 시작되고, 무효 데이터에서는 실패 메시지가 표시되면 통과.

### Tests for User Story 3 (MANDATORY)

- [X] T029 [P] [US3] PNG 내보내기 유효성/실패 사유 단위 테스트 추가 in `tests/unit/png-export-service.spec.ts`
- [X] T030 [US3] PNG 내보내기 성공/실패 통합 테스트 추가 in `tests/integration/png-export.integration.spec.ts`
- [X] T031 [US3] PNG 내보내기 사용자 흐름 E2E 테스트 추가 in `tests/integration/png-export.e2e.ts`

### Implementation for User Story 3

- [X] T032 [US3] 프레젠테이션 SVG 기반 PNG 변환/다운로드 구현 in `src/features/flowchart/services/png-export-service.ts`
- [X] T033 [US3] 툴바에 PNG 내보내기 액션 및 피드백 연결 in `src/features/flowchart/components/diagram-toolbar.tsx`
- [X] T034 [US3] PNG 내보내기 sourceView 정책 강제 적용 in `src/features/flowchart/services/png-export-service.ts`
- [X] T035 [US3] PNG 내보내기 오류 코드/메시지 맵핑 반영 in `src/features/flowchart/models/ux-copy.ts`

**Checkpoint**: US3 단독 동작 및 검증 완료

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 전 스토리 공통 품질 마무리

- [X] T036 [P] PRF-001 전환 성능 p95 검증 테스트 추가 in `tests/integration/presentation-switch-performance.integration.spec.ts`
- [X] T037 [P] PRF-002 화살표 경계 재계산 p95 검증 테스트 추가 in `tests/integration/presentation-arrow-performance.integration.spec.ts`
- [X] T038 [P] PRF-003 PNG 피드백 지연 p95 검증 테스트 추가 in `tests/integration/png-feedback-performance.integration.spec.ts`
- [X] T039 [P] OpenAPI 계약-구현 매핑 회귀 테스트 추가 in `tests/integration/presentation-export-contract.spec.ts`
- [X] T040 프레젠테이션 UI 증적 스크린샷 캡처 추가 in `tests/integration/presentation-ui-evidence.e2e.ts`
- [X] T041 SC-004 집계를 위한 `presentation-ux` 태그 수집 규칙 문서화 in `specs/001-presentation-png-redesign/research.md`
- [X] T042 SC-004 배포 전/후 14일 비교 집계 템플릿 추가 in `specs/001-presentation-png-redesign/quickstart.md`
- [X] T043 quickstart 검증 절차 최신화 in `specs/001-presentation-png-redesign/quickstart.md`
- [X] T044 품질 게이트 실행 로그 기록 in `specs/001-presentation-png-redesign/research.md`
- [X] T045 변경 파일 한글 주석 점검 및 보강 in `src/features/flowchart/components/presentation-mode.tsx`
- [X] T046 네이밍 규칙 점검 리포트 작성 in `specs/001-presentation-png-redesign/research.md`

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

- T014와 T016은 병렬 수행 가능
- T017 완료 후 T018, T019, T020 순차 진행

### User Story 2

- T021과 T023은 병렬 수행 가능
- T025, T027 완료 후 T026과 T028 진행

### User Story 3

- T029와 T031은 병렬 수행 가능
- T032 완료 후 T033, T034, T035 진행

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
