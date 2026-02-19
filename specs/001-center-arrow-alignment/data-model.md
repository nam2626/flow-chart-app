# Data Model: 화살표 수평 중앙 정렬

## 1. ShapeLayoutSnapshot

### Purpose
도형 위치/크기/순서를 화살표 정렬 계산의 입력 데이터로 사용한다.

### Fields
- `shapeId` (string, required, unique): 도형 식별자.
- `stepOrder` (number, required): 흐름 순서.
- `x` (number, required): 도형 좌측 좌표.
- `y` (number, required): 도형 상단 좌표.
- `width` (number, required): 도형 폭.
- `height` (number, required): 도형 높이.

### Validation Rules
- `width`, `height`는 0보다 커야 한다.
- `stepOrder`는 동일 스냅샷 내 중복 불가.
- 중심 x좌표는 `x + width/2`로 계산한다.

### State Transitions
- `captured` -> `reordered`: 단계 순서 변경 시.
- `captured/reordered` -> `resized`: 크기 변경 시.
- 모든 변경 상태는 connector 재계산 트리거가 된다.

## 2. ConnectorAlignmentState

### Purpose
화살표 시작/종료 좌표와 중앙 정렬 적용 결과를 보관한다.

### Fields
- `fromShapeId` (string, required): 시작 도형 ID.
- `toShapeId` (string, required): 종료 도형 ID.
- `startX` (number, required): 시작 x좌표.
- `startY` (number, required): 시작 y좌표.
- `endX` (number, required): 종료 x좌표.
- `endY` (number, required): 종료 y좌표.
- `alignmentRule` (string, required): 값 `CENTER_X_WITH_BOUNDARY_Y`.
- `xTolerancePx` (number, required): 값 `0`.

### Validation Rules
- `startX`는 시작 도형 중심 x와 0px 오차로 일치해야 한다.
- `endX`는 종료 도형 중심 x와 0px 오차로 일치해야 한다.
- `startY`, `endY`는 기존 경계 시작/종료 규칙을 따라야 한다.

### State Transitions
- `pending` -> `aligned`: 좌표 계산 및 렌더 완료.
- `aligned` -> `recomputed`: 도형 순서/크기/레이아웃 변경.

## Relationships
- `ShapeLayoutSnapshot` 2개(인접 pair)가 1개의 `ConnectorAlignmentState`를 생성한다.
- 편집 화면/프레젠테이션 화면 모두 동일한 `alignmentRule`을 공유한다.

## Scale Assumptions
- 최대 50개 도형에서 인접 쌍 기반 connector를 생성한다.
- 정렬 검증은 화면별 동일 입력에 대해 동일 결과를 기대한다.
