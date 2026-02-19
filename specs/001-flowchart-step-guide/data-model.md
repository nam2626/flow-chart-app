# Data Model: 간단 웹 플로우차트 작성기

## 1. FlowchartDiagram
- Description: 플로우차트 문서 루트 엔터티
- Fields:
  - `diagramId` (string, UUID, required, unique)
  - `title` (string, 1~100자, required)
  - `canvasWidthPx` (number, 300~4000, required)
  - `isTransparentBackground` (boolean, required, default true)
  - `activeNodeId` (string | null)
  - `createdAt` (string, ISO datetime)
  - `updatedAt` (string, ISO datetime)
- Relationships:
  - has many `FlowNode`
  - has one `StepProgressState`
  - has one `ShortcutPreference`

## 2. FlowNode
- Description: 개별 단계 도형
- Fields:
  - `nodeId` (string, UUID, required, unique)
  - `diagramId` (string, required, FK -> FlowchartDiagram.diagramId)
  - `shapeType` (enum: rectangle | ellipse, required)
  - `label` (string, 1~80자, required)
  - `stepOrder` (integer, >=1, required)
  - `x` (number, >=0, required)
  - `y` (number, >=0, required)
  - `width` (number, >0, required)
  - `height` (number, >0, required)
  - `isActive` (boolean, required)
- Validation Rules:
  - 동일 diagram 내 `stepOrder`는 고유해야 함
  - `shapeType`은 rectangle/ellipse만 허용

## 3. StepProgressState
- Description: 진행 단계 상태
- Fields:
  - `diagramId` (string, PK/FK)
  - `currentStepOrder` (integer, >=1)
  - `isAtLastStep` (boolean)
  - `message` (string, required)
- State Transitions:
  - `idle` -> `in_progress`: 첫 노드 활성화
  - `in_progress` -> `in_progress`: 다음 단계 이동
  - `in_progress` -> `at_last_step`: 마지막 단계 도달
  - `at_last_step` -> `at_last_step`: next 입력 시 유지

## 4. ShortcutPreference
- Description: 단축키 설정
- Fields:
  - `diagramId` (string, PK/FK)
  - `nextStepKey` (string, 1~20자, default `N`)
  - `updatedAt` (string, ISO datetime)
- Validation Rules:
  - 브라우저 예약 키와 충돌 시 저장 경고를 표시

## 5. ImportMergeConflict
- Description: 파일 병합 시 충돌 항목
- Fields:
  - `conflictId` (string, UUID)
  - `diagramId` (string)
  - `conflictType` (enum: node_id | step_order)
  - `existingValue` (object)
  - `importedValue` (object)
  - `resolution` (enum: imported_precedence | keep_existing | custom)
- Rules:
  - 사용자 미선택 시 `imported_precedence`를 기본 적용

## Data Volume Assumptions
- 최대 노드 수: 200
- import 허용 파일 크기: 최대 5MB
- 단일 사용자 로컬 세션 기준으로 동시 편집 충돌은 고려하지 않음
