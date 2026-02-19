# Feature Specification: 단계형 플로우차트 보강

**Feature Branch**: `001-fix-export-arrow-layout`  
**Created**: 2026-02-16  
**Status**: Draft  
**Input**: User description: "각 단계별 도형 추가시 각 텍스트 입력해야함. 내보내기 기능이 안되니 다시 체크할 것. 각 단계별로 화살표가 연결되어야함. 캔버스 가로폭은 300PX ~ 400PX로 지정, 사이즈는 사용자가 입력가능하게끔 함. 차트 나열은 세로로 진행."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 단계형 차트 작성 (Priority: P1)

사용자는 단계별 도형을 추가하고 각 단계 텍스트를 입력해 세로 방향의 플로우차트를 만든다.
시스템은 인접 단계 사이를 화살표로 연결해 흐름을 즉시 확인할 수 있게 한다.

**Why this priority**: 차트 작성의 핵심 가치이며, 이 흐름이 없으면 기능 자체가 성립하지 않는다.

**Independent Test**: 새 차트를 열고 3개 단계를 추가해 텍스트를 입력하면 세로 배치와 단계 간
화살표 연결이 완료되어야 하며, 단독으로 사용자 가치가 성립한다.

**Acceptance Scenarios**:

1. **Given** 빈 캔버스, **When** 사용자가 단계를 2개 이상 추가하고 각 단계 텍스트를 입력하면,
   **Then** 도형이 세로로 나열되고 인접 단계 간 화살표가 자동 연결된다.
2. **Given** 단계에 텍스트가 비어 있는 상태, **When** 사용자가 완료 동작(저장 또는 내보내기)을 시도하면,
   **Then** 비어 있는 단계를 명시한 검증 메시지가 표시되고 완료 동작이 차단된다.

---

### User Story 2 - 캔버스 폭 조절 (Priority: P2)

사용자는 캔버스 가로폭을 직접 입력해 차트 가시성을 조절할 수 있으며, 허용 범위는 300px부터
400px까지이다.

**Why this priority**: 사용자 환경에 맞는 기본 레이아웃 조절 요구이며, 작성 편의성과 직결된다.

**Independent Test**: 캔버스 폭 입력값을 300, 350, 400으로 변경하면 즉시 반영되고, 299 또는 401은
거부되어야 한다.

**Acceptance Scenarios**:

1. **Given** 캔버스 설정 화면, **When** 사용자가 300~400 범위 값을 입력하면,
   **Then** 캔버스 가로폭이 입력값으로 반영된다.
2. **Given** 캔버스 설정 화면, **When** 사용자가 범위를 벗어난 값을 입력하면,
   **Then** 값이 적용되지 않고 허용 범위를 안내하는 메시지가 표시된다.

---

### User Story 3 - 차트 내보내기 복구 (Priority: P3)

사용자는 완성한 플로우차트를 내보낼 수 있어야 하며, 내보내기 실패 없이 결과물을 획득할 수 있어야
한다.

**Why this priority**: 작성 결과를 공유/보관하는 마무리 가치로 중요하지만, 작성 기능 자체보다는 우선순위가
낮다.

**Independent Test**: 텍스트가 모두 채워진 1개 이상의 단계 차트에서 내보내기를 실행했을 때, 실패 없이
파일 결과를 받으면 독립 검증이 가능하다.

**Acceptance Scenarios**:

1. **Given** 유효한 차트(모든 단계 텍스트 입력 완료), **When** 사용자가 내보내기를 실행하면,
   **Then** 오류 없이 내보내기가 완료되고 결과 파일이 생성된다.
2. **Given** 내보내기 대상 데이터가 유효하지 않은 상태, **When** 사용자가 내보내기를 실행하면,
   **Then** 실패 원인과 수정 안내가 사용자에게 명확히 표시된다.

### Edge Cases

- 단계가 1개뿐인 경우, 화살표는 생성하지 않고 단일 단계 차트로 표시한다.
- 중간 단계가 삭제된 경우, 남은 인접 단계 사이 화살표를 즉시 재연결한다.
- 캔버스 폭 입력이 숫자가 아니거나 소수점인 경우, 허용 형식 오류를 표시한다.
- 매우 긴 텍스트 입력 시 도형 레이아웃이 깨지지 않도록 줄바꿈 또는 넘침 처리 규칙을 적용한다.
- 내보내기 중 사용자 입력 변경이 발생하면, 일관된 스냅샷 기준으로 내보내거나 재시도를 안내한다.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow users to add flowchart steps as shapes in vertical order.
- **FR-002**: System MUST require text input for every added step before save/export completion.
- **FR-003**: System MUST automatically connect each adjacent step with a directional arrow.
- **FR-004**: System MUST allow user-controlled canvas width input and enforce a 300px to 400px range.
- **FR-005**: System MUST provide clear validation feedback when step text is empty or canvas width is out of range.
- **FR-006**: System MUST complete chart export successfully for valid charts and provide actionable errors on failure.
- **FR-007**: System MUST preserve transparent canvas background in editing and exported output.

### UX Consistency Requirements *(mandatory)*

- **UX-001**: 단계 추가, 편집, 삭제 시 동일한 버튼 용어와 검증 문구를 사용해야 한다.
- **UX-002**: 입력 오류 메시지는 문제 원인과 수정 방법을 함께 표시해야 한다.
- **UX-003**: 화살표 연결 상태(정상/누락)는 동일한 시각 피드백 규칙으로 표현해야 한다.

### Performance Requirements *(mandatory)*

- **PRF-001**: 50개 단계 차트에서 단계 추가 후 화면 갱신 p95는 300ms 이하여야 한다.
- **PRF-002**: 50개 단계 차트에서 내보내기 시작 후 5초 이내에 결과 파일 생성이 시작되어야 한다.
- **PRF-003**: 캔버스 폭 변경 반영 p95는 300ms 이하여야 한다.

### Code Convention Requirements *(mandatory)*

- **CCR-001**: 코드 주석은 한글로 작성하고, 구현 이유 또는 제약을 설명해야 한다.
- **CCR-002**: 네이밍 규칙은 `PascalCase`(컴포넌트/타입), `camelCase`(변수/함수),
  `UPPER_SNAKE_CASE`(상수), `kebab-case`(파일/폴더)를 따른다.
- **CCR-003**: 폴더 구조는 `src/components`, `src/features`, `src/store`, `src/styles`,
  `src/utils` 수준의 단순 계층을 유지해야 한다.

### Key Entities *(include if feature involves data)*

- **Flowchart**: 사용자가 편집 중인 차트. 캔버스 폭, 배경 속성, 단계 목록을 가진다.
- **FlowStep**: 차트의 한 단계 도형. 고유 순서, 도형 유형, 텍스트 내용을 가진다.
- **StepConnection**: 인접 단계 간 연결 정보. 시작 단계와 종료 단계의 관계를 가진다.
- **ExportJob**: 내보내기 실행 단위. 대상 차트, 실행 시각, 처리 상태, 실패 사유를 가진다.

## Assumptions

- 단계 도형 유형(사각형/타원)은 기존 제품 범위를 유지한다.
- 본 기능은 단일 사용자 편집 시나리오를 기준으로 한다.
- 내보내기 포맷은 SVG를 기본으로 유지한다.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 신규 사용자의 90% 이상이 5분 이내에 3단계 세로 플로우차트를 완성한다.
- **SC-002**: 유효한 차트 기준 내보내기 성공률이 99% 이상이다.
- **SC-003**: 캔버스 폭 범위 검증 오류 발생 시 95% 이상이 첫 재입력에서 정상 값을 입력한다.
- **SC-004**: 단계 간 화살표 누락 관련 사용자 보고 건수가 배포 후 2주 내 80% 이상 감소한다.
