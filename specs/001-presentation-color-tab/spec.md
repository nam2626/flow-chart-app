# Feature Specification: 도형 색상 커스터마이징 및 새탭 프레젠테이션 정렬 개선

**Feature Branch**: `001-presentation-color-tab`  
**Created**: 2026-02-16  
**Status**: Draft  
**Input**: User description: "도형별로 색상 지정이 가능해야함. 프레젠테이션 모드는 새탭으로 실행하고 배치는 가운로데로 지정. boxshadow 범위도 지금보다 2배정도 밝은 색으로 지정. 화살표는 정가운데로 오게끔 처리."

## Clarifications

### Session 2026-02-16
- Q: 화살표 중심 연결의 시작/종료점은 어디로 정의할까? → A: 시작/종료점을 도형의 정확한 중심점(도형 내부)으로 처리
- Q: box-shadow 2배 밝기는 무엇을 2배로 볼까? → A: opacity 2배(최대 1.0)
- Q: 새탭 열기 실패 시 대체 동작은 무엇인가? → A: 프레젠테이션 시작 중단 및 오류 표시
- Q: 도형별 색상 지정 범위는 어디까지 허용할까? → A: 도형별 채움색 + 테두리색 지정


## User Scenarios & Testing *(mandatory)*

### User Story 1 - 도형별 색상 지정 (Priority: P1)

편집자는 각 도형마다 개별 색상을 지정해 발표 목적에 맞게 시각적 구분을 만들고 싶다.

**Why this priority**: 도형별 색상 지정은 작성 품질과 가독성에 직접 영향을 주는 핵심 기능이며, 다른 요구사항과 독립적으로 즉시 사용자 가치를 제공한다.

**Independent Test**: 3개 이상 도형에 서로 다른 색상을 지정한 뒤 저장/새로고침 후에도 각 도형 색상이 유지되면 통과.

**Acceptance Scenarios**:

1. **Given** 편집 화면에 도형이 2개 이상 존재할 때, **When** 사용자가 도형 A와 도형 B에 서로 다른 색상을 지정하면, **Then** 각 도형은 서로 다른 지정 색상으로 즉시 표시된다.
2. **Given** 색상이 지정된 도형이 있을 때, **When** 사용자가 앱을 새로고침하거나 다시 열면, **Then** 마지막으로 지정한 도형별 색상이 유지된다.

---

### User Story 2 - 새탭 프레젠테이션 중앙 배치 (Priority: P2)

발표자는 프레젠테이션을 별도 새탭에서 열고 모든 도형 흐름이 중앙에 정렬된 화면으로 보여주고 싶다.

**Why this priority**: 발표 중 편집 화면과 분리된 뷰는 집중도를 높이고, 중앙 배치는 다양한 화면 크기에서 발표 품질을 안정화한다.

**Independent Test**: 프레젠테이션 시작 시 새탭이 열리고, 해당 탭에서 모든 단계 도형 묶음이 가시 영역의 중앙 정렬 상태로 표시되면 통과.

**Acceptance Scenarios**:

1. **Given** 편집 화면에서 프레젠테이션 시작을 실행할 때, **When** 프레젠테이션이 시작되면, **Then** 별도 새탭에서 프레젠테이션 전용 화면이 열린다.
2. **Given** 프레젠테이션 새탭이 열린 상태에서, **When** 사용자가 화면을 확인하면, **Then** 도형 흐름은 가로 중앙 정렬 상태로 렌더링된다.

---

### User Story 3 - 강조 시각 및 화살표 중심 연결 개선 (Priority: P3)

발표자는 활성 단계의 강조 효과를 더 강하게 보고, 도형 간 화살표가 각 도형의 정확한 중심점끼리 일관되게 연결되길 원한다.

**Why this priority**: 강조 강도와 연결선 정확도는 발표 중 이해도와 전달 속도에 영향을 주는 품질 요소다.

**Independent Test**: 프레젠테이션에서 활성 도형의 강조 밝기가 기존 대비 2배 수준으로 강화되고, 인접 단계 간 화살표가 시작/종료 도형의 정확한 중심점을 연결하면 통과.

**Acceptance Scenarios**:

1. **Given** 프레젠테이션에서 특정 단계가 활성화될 때, **When** 화면 강조가 표시되면, **Then** 활성 도형의 그림자 강조 밝기는 기존 기준 대비 2배 수준으로 표시된다.
2. **Given** 도형이 세로로 배치된 흐름이 있을 때, **When** 화살표가 렌더링되면, **Then** 화살표는 각 도형의 정확한 중심점에서 시작해 다음 도형의 정확한 중심점으로 연결된다.

---

### Edge Cases

- 사용자가 도형 색상을 지정하지 않은 경우에는 시스템 기본 색상을 자동 적용한다.
- 새탭 열기가 브라우저 정책으로 차단된 경우, 프레젠테이션 시작을 중단하고 명시적 오류 메시지를 표시한다.
- 매우 긴 도형 텍스트가 있을 때도 도형 중심 정렬과 화살표 중심점-중심점 연결 정합성은 유지되어야 한다.
- 동일 색상을 여러 도형에 적용해도 동작은 정상이어야 하며, 오류로 간주하지 않는다.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow users to assign per-shape fill color and border color independently.
- **FR-002**: System MUST preserve per-shape color assignments across refresh/reopen of the same diagram.
- **FR-003**: System MUST open presentation mode in a separate new browser tab when presentation starts.
- **FR-004**: System MUST render the presentation flow centered horizontally in the presentation tab viewport.
- **FR-005**: System MUST render active-shape box-shadow highlight with 2x opacity versus baseline opacity 0.2 (target opacity 0.4), capped at opacity 1.0.
- **FR-006**: System MUST render connector arrows through the exact geometric center points of sequential shapes.
- **FR-007**: Users MUST be able to continue step navigation in presentation mode after new-tab launch without losing current step state.
- **FR-008**: System MUST cancel presentation start and show an explicit error message when opening a new tab is blocked.

### UX Consistency Requirements *(mandatory)*

- **UX-001**: 동일 목적 UI 요소의 용어/상호작용/피드백 규칙 MUST be consistent across screens.
- **UX-002**: 오류 메시지, 버튼 라벨, 검증 메시지 문구 규칙 MUST reference existing patterns.
- **UX-003**: 신규 UX 패턴 도입 시 MUST document reason and migration impact.

### Performance Requirements *(mandatory)*

- **PRF-001**: 프레젠테이션 새탭 전환 완료까지 p95 시간은 300ms 이내여야 한다.
- **PRF-002**: 도형 50개 기준 중심 화살표 재계산 p95 시간은 300ms 이내여야 한다.
- **PRF-003**: 성능 측정 방식(입력 데이터 크기, 반복 횟수, 측정 구간) MUST be documented.

### Code Convention Requirements *(mandatory)*

- **CCR-001**: 코드 주석은 MUST be written in Korean and explain rationale.
- **CCR-002**: 네이밍 규칙(`PascalCase`, `camelCase`, `UPPER_SNAKE_CASE`, `kebab-case`) MUST be specified.
- **CCR-003**: 폴더 구조는 기능 중심의 단순 계층 원칙 MUST be preserved.

### Key Entities *(include if feature involves data)*

- **ShapeStyleProfile**: 도형별 시각 속성(채움색, 테두리색)을 표현한다.
- **PresentationViewSession**: 새탭 프레젠테이션 실행 상태(탭 열림 여부, 현재 단계, 정렬 상태)를 표현한다.
- **CenteredConnectorPath**: 도형 간 중심점-중심점 연결 경로 정보를 표현한다.

### Assumptions

- 본 기능은 단일 사용자 편집/발표 흐름을 대상으로 한다.
- 브라우저가 새탭 열기를 허용하는 일반 사용자 설정을 기본값으로 가정한다.
- "기존 대비 2배 밝기"의 기준선 opacity는 0.2로 고정하며, 목표 opacity는 0.4(상한 1.0)로 평가한다.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 사용자는 3개 도형에 서로 다른 색상을 지정하고 1분 이내에 시각 구분 가능한 차트를 완성할 수 있다.
- **SC-002**: 프레젠테이션 시작 시도 중 95% 이상이 300ms 이내 새탭 전환에 성공한다.
- **SC-003**: 중심점 연결 규칙 적용 후 사용자 검증 시나리오에서 화살표 정렬 오류 보고율이 5% 미만이다.
- **SC-004**: 동일 발표 시나리오 A/B 비교 평가(최소 20명)에서 활성 단계 강조 가시성 만족 응답 비율이 기존 버전 대비 30% 이상 향상된다.




