# Data Model: 도형 관리 및 프레젠테이션 모드

## Entity: FlowStep
- Description: 차트의 단일 단계 도형
- Fields:
  - `id` (string, required): 도형 식별자
  - `order` (number, required): 단계 순서(1..N)
  - `shapeType` (string, required, enum: `rectangle`, `ellipse`)
  - `label` (string, required)
  - `isActive` (boolean, required): 현재 강조 단계 여부
- Validation Rules:
  - 삭제 후 `order`는 공백 없이 1..N으로 재정렬되어야 한다.
  - `label`은 공백-only 값을 허용하지 않는다.

## Entity: PresentationSession
- Description: 프레젠테이션 실행 상태
- Fields:
  - `id` (string, required)
  - `isRunning` (boolean, required)
  - `currentOrder` (number, optional): 현재 강조 단계 순서
  - `startedAt` (string, optional)
  - `endedAt` (string, optional)
- Validation Rules:
  - `isRunning=true`일 때 `currentOrder`는 유효 단계여야 한다.
  - 단계가 없으면 `isRunning=false` 또는 비이동 상태여야 한다.
- State Transitions:
  - `idle` -> `running` (시작)
  - `running` -> `running` (다음/이전 이동, 삭제/초기화 즉시 반영)
  - `running` -> `ended` (종료)

## Entity: CanvasSettings
- Description: 편집 캔버스 설정
- Fields:
  - `widthPx` (number, required, 300~400)
  - `backgroundMode` (string, required, enum: `transparent`)
- Validation Rules:
  - 전체 초기화 시 기본값으로 복원되어야 한다.

## Entity: ChartStateSnapshot
- Description: 프레젠테이션 시작/종료 전후 편집 상태 기록
- Fields:
  - `snapshotId` (string, required)
  - `steps` (FlowStep[], required)
  - `canvasSettings` (CanvasSettings, required)
  - `capturedAt` (string, required)
- Validation Rules:
  - 종료 후 편집 복귀 시 마지막 유효 스냅샷과 일치해야 한다.

## Relationships
- PresentationSession 1 --- N FlowStep (활성 순회 대상)
- ChartStateSnapshot 1 --- N FlowStep
- ChartStateSnapshot 1 --- 1 CanvasSettings
