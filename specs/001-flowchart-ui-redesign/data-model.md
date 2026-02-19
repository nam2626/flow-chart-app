# Data Model: Flowchart UI Redesign

## Entity: EditorLayoutSection

- Purpose: 편집 화면 주요 영역의 역할과 배치를 정의한다.
- Fields:
  - `sectionId` (string, unique): `toolbar`, `shapePanel`, `stepPanel`, `canvas`, `propertiesPanel`
  - `displayOrder` (number): 편집 화면 내 시각적 우선 배치 순서
  - `areaRole` (enum): `action`, `navigation`, `workspace`, `inspector`
  - `isVisible` (boolean): 기본 표시 여부
  - `supportsInteraction` (string[]): 허용 상호작용 목록(예: export, select-step, edit-properties)
- Relationships:
  - `EditorLayoutSection` 1:N `PanelVisualRule`
- Validation Rules:
  - `sectionId`는 중복될 수 없다.
  - `displayOrder`는 음수가 될 수 없다.
  - `canvas` 역할 섹션은 정확히 1개여야 한다.

## Entity: PanelVisualRule

- Purpose: 시안 일치 검수에 필요한 시각 규칙을 정의한다.
- Fields:
  - `ruleId` (string, unique)
  - `targetSectionId` (string, FK -> EditorLayoutSection.sectionId)
  - `ruleType` (enum): `spacing`, `hierarchy`, `alignment`, `grouping`
  - `expectedPattern` (string): 기대되는 패턴 설명
  - `toleranceLevel` (enum): `strict`, `normal`, `relaxed`
- Relationships:
  - N:1 to `EditorLayoutSection`
- Validation Rules:
  - `ruleType=alignment`인 규칙은 대상 섹션이 반드시 존재해야 한다.
  - `expectedPattern`은 비어 있을 수 없다.

## Entity: InteractionParityChecklist

- Purpose: 리디자인 전후 기능 동등성 수동 검증 항목을 정의한다.
- Fields:
  - `checkId` (string, unique)
  - `flowName` (enum): `authoring`, `reorder`, `presentation`, `export`
  - `stepDescription` (string)
  - `expectedResult` (string)
  - `passCondition` (string)
  - `status` (enum): `pending`, `pass`, `fail`
- Relationships:
  - 논리적으로 `EditorLayoutSection`과 연계(섹션별 기능 검증)
- Validation Rules:
  - 모든 `flowName`에 최소 1개 이상 체크 항목이 있어야 한다.
  - `status=fail`이면 재현 메모가 필수다.

## State Transitions

- `InteractionParityChecklist.status`
  - `pending -> pass`
  - `pending -> fail`
  - `fail -> pending` (수정 후 재검증)

## Scale Assumptions

- 편집 모드에서 동시 렌더되는 핵심 섹션 수: 5개 내외
- 시각 규칙 항목 수: 20~40개
- 수동 회귀 체크 항목 수: 10~25개
