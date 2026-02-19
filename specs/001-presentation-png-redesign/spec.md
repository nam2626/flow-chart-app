# Feature Specification: 프레젠테이션 컴포넌트 전환 및 PNG 내보내기

**Feature Branch**: `001-presentation-png-redesign`  
**Created**: 2026-02-16  
**Status**: Draft  
**Input**: User description: "프레젠테이션 모드는 별도의 컴포넌트로 전환해서 실행. 프레젠테이션 모드에서는 단계1, 단계2 숨김 처리. 플로우 진행되는 화살표는 각 도형 테두리에서 시작해서 다음 도형 테두리전에서 끝남.도형 색상 및 화살표 색상, 테두리 색상 리디자인할것. 내보내기에 png 파일 내보내기 기능 추가."

## Clarifications

### Session 2026-02-16

- Q: PNG 내보내기 기준 화면은 무엇인가? → A: PNG는 항상 프레젠테이션 전용 화면 기준으로 내보낸다.
- Q: 프레젠테이션 모드의 "단계1, 단계2 숨김" 의미는 무엇인가? → A: 단계 번호 텍스트만 숨기고 도형/본문은 표시한다.
- Q: 화살표 종료 지점의 "도형 테두리 직전" 기준값은 얼마인가? → A: 대상 도형 경계에서 4px 앞에서 멈춘다.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 프레젠테이션 전용 화면 전환 (Priority: P1)

사용자는 편집 화면과 분리된 프레젠테이션 전용 화면으로 전환해 발표 흐름만 집중해서 볼 수 있어야 한다.

**Why this priority**: 발표 모드의 핵심 가치는 편집 UI 노이즈 제거와 전달력 향상이므로 가장 우선순위가 높다.

**Independent Test**: 단계가 2개 이상인 차트에서 프레젠테이션 시작 시 전용 컴포넌트가 렌더링되고,
편집 입력 UI와 단계 번호 텍스트가 보이지 않으면 독립적으로 검증 가능하다.

**Acceptance Scenarios**:

1. **Given** 편집 화면에 단계 도형이 있는 상태, **When** 사용자가 프레젠테이션 시작을 실행하면,
   **Then** 프레젠테이션 전용 컴포넌트로 화면이 전환되고 편집용 입력/버튼은 숨겨진다.
2. **Given** 프레젠테이션 전용 화면, **When** 화면이 렌더링되면,
   **Then** 각 도형의 "단계 1", "단계 2" 등 단계 번호 텍스트는 표시되지 않는다.

---

### User Story 2 - 발표 시각 흐름 리디자인 (Priority: P2)

사용자는 리디자인된 도형/화살표/테두리 색상과 정확한 화살표 연결로 단계 진행을 직관적으로 인식할 수 있어야 한다.

**Why this priority**: 발표 가독성과 이해도는 색상 체계와 연결선 품질에 직접 영향을 받는다.

**Independent Test**: 프레젠테이션 모드에서 화살표가 시작 도형의 테두리에서 시작하고,
다음 도형 테두리 직전에서 끝나는지와 색상 토큰 적용 여부를 확인하면 독립적으로 검증 가능하다.

**Acceptance Scenarios**:

1. **Given** 연속된 두 개 이상의 도형, **When** 프레젠테이션 화면이 렌더링되면,
   **Then** 연결 화살표는 이전 도형 외곽선 경계에서 시작해 다음 도형 외곽선 직전에서 끝난다.
2. **Given** 프레젠테이션 화면, **When** 도형/화살표/테두리가 표시되면,
   **Then** 정의된 리디자인 색상 규칙이 일관되게 적용된다.

---

### User Story 3 - PNG 내보내기 (Priority: P3)

사용자는 작성한 플로우 차트를 PNG 이미지로 내보내 발표 자료나 문서에 재사용할 수 있어야 한다.

**Why this priority**: 외부 공유 목적의 산출물 확보가 사용 가치 확장에 중요하다.

**Independent Test**: 유효한 단계 텍스트가 입력된 차트에서 PNG 내보내기 실행 후
다운로드가 시작되고 완료 피드백이 표시되면 독립적으로 검증 가능하다.

**Acceptance Scenarios**:

1. **Given** 텍스트가 입력된 단계 도형이 있는 차트, **When** 사용자가 PNG 내보내기를 실행하면,
   **Then** PNG 파일 다운로드가 시작되고 성공 메시지가 표시된다.
2. **Given** 필수 입력이 누락된 차트, **When** 사용자가 PNG 내보내기를 실행하면,
   **Then** 내보내기 실패 사유가 안내되고 파일은 생성되지 않는다.

### Edge Cases

- 프레젠테이션 모드에서 표시 가능한 단계가 1개뿐이면 내비게이션 제어는 비활성화되어야 한다.
- 도형 크기가 서로 다른 경우에도 화살표 시작/종료 지점은 각 도형 경계 기준으로 계산되고 종료점은 경계 4px 앞이어야 한다.
- 매우 좁은 캔버스(300px)와 최대 캔버스(400px) 모두에서 화살표가 도형 내부를 침범하지 않아야 한다.
- PNG 내보내기 중 대상 데이터가 비어 있거나 필수 텍스트가 비어 있으면 실패 메시지를 제공해야 한다.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST switch to a dedicated presentation component when presentation mode starts.
- **FR-002**: System MUST hide only step order text labels (for example, "단계 1", "단계 2") in the presentation component while keeping shapes and main labels visible.
- **FR-003**: System MUST hide editing controls and text input fields while the presentation component is active.
- **FR-004**: System MUST draw flow arrows from the source shape border and stop 4px before the target shape border.
- **FR-005**: System MUST provide redesigned color rules for shape fill, shape border, and flow arrows, including normal and active states.
- **FR-006**: System MUST keep redesigned color rules consistent across all presentation steps.
- **FR-007**: System MUST provide PNG export for a valid flowchart using the presentation-only view.
- **FR-008**: System MUST show a clear success or failure message after PNG export attempts.
- **FR-009**: System MUST prevent PNG export when required step text is missing.

### UX Consistency Requirements *(mandatory)*

- **UX-001**: 프레젠테이션 전용 컴포넌트의 버튼/상태 문구 MUST follow 기존 용어 체계를 유지한다.
- **UX-002**: 단계 번호 숨김 규칙은 프레젠테이션 화면 전체에서 MUST be applied uniformly.
- **UX-003**: 리디자인 색상 규칙은 편집 화면과 프레젠테이션 화면의 역할 차이를 유지하되,
  동일 역할 요소끼리는 MUST be consistent.

### Visual Design Rules *(mandatory)*

- **VDR-001**: 프레젠테이션 모드 색상 토큰은 `shapeFill`, `shapeBorder`, `arrowStroke`, `activeGlow` 4개로 고정한다.
- **VDR-002**: 동일 상태(기본/활성)에서 같은 역할 요소는 동일 토큰을 사용해야 한다.
- **VDR-003**: 본문 텍스트와 도형 배경의 대비는 최소 4.5:1 이상이어야 한다.
- **VDR-004**: 활성 강조는 색상 단독이 아니라 외곽선 또는 글로우 변화를 함께 사용해야 한다.

### Performance Requirements *(mandatory)*

- **PRF-001**: 프레젠테이션 컴포넌트 전환 후 첫 화면 반영 p95 MUST be <= 300ms (50단계 기준).
- **PRF-002**: 화살표 경계 재계산 반영 p95 MUST be <= 300ms (50단계 기준).
- **PRF-003**: PNG 내보내기 실행부터 사용자 피드백 표시까지 p95 MUST be <= 700ms (50단계 기준).

### Code Convention Requirements *(mandatory)*

- **CCR-001**: 코드 주석은 MUST be written in Korean and 설명 중심이어야 한다.
- **CCR-002**: 네이밍 규칙(`PascalCase`, `camelCase`, `UPPER_SNAKE_CASE`, `kebab-case`) MUST be maintained.
- **CCR-003**: 폴더 구조는 기능 중심 단순 계층 원칙 MUST be preserved.

### Key Entities *(include if feature involves data)*

- **PresentationViewState**: 프레젠테이션 전용 화면의 활성 여부, 현재 단계, 표시 정책(번호 숨김)을 표현한다.
- **ArrowRenderSegment**: 시작 도형 경계점, 종료 도형 경계 직전 점, 색상 정보를 포함하는 연결선 렌더링 단위다.
- **ExportJob**: 내보내기 요청 포맷(PNG), 실행 시각, 성공/실패 상태, 사용자 피드백 메시지를 표현한다.

## Assumptions

- "단계1, 단계2 숨김"은 프레젠테이션 화면에서 단계 번호 텍스트만 숨기고 도형/본문 텍스트는 유지하는 요구로 해석한다.
- PNG 내보내기 파일명 규칙은 기존 SVG/JSON 내보내기 규칙과 동일한 제목 기반 규칙을 따른다.
- PNG 내보내기는 실행 모드와 무관하게 프레젠테이션 전용 화면 구성을 기준으로 생성한다.
- 색상 리디자인은 접근성 기준(텍스트 대비 식별 가능)을 만족하는 범위에서 수행한다.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 사용자 95% 이상이 프레젠테이션 모드 진입 후 5초 이내에 발표 화면 전환을 인지한다.
- **SC-002**: 화살표 연결 정확도 검증 시나리오에서 100%가 도형 경계 기준 시작/종료 규칙을 만족한다.
- **SC-003**: PNG 내보내기 시도 중 유효 입력 케이스의 99% 이상이 첫 시도에서 성공한다.
- **SC-004**: 발표 화면 가독성 관련 사용자 불편 피드백이 배포 후 2주(14일) 동안,
  배포 직전 2주(14일) 대비 30% 이상 감소한다.
- **SC-005**: SC-004 측정은 `presentation-ux` 태그가 포함된 지원 티켓/피드백 항목만 집계 대상으로 사용한다.
