# Data Model: 화살표 중앙 정렬 세로 플렉스 레이아웃

## 1. VerticalLayoutState

### Purpose
세로 스택 순서, 교차축 중앙 정렬 상태, 동적 간격 계산 결과를 보관한다.

### Fields
- `layoutId` (string, required): 레이아웃 계산 식별자.
- `direction` (string, required): 값 `TOP_TO_BOTTOM`.
- `crossAxisAlign` (string, required): 값 `CENTER`.
- `stackMode` (string, required): 값 `AUTO_ONLY`.
- `items` (array<LayoutItemState>, required): 도형 배치 결과 목록.
- `computedAt` (number, required): 계산 시각(epoch ms).

### Validation Rules
- `direction`은 반드시 `TOP_TO_BOTTOM`이어야 한다.
- `crossAxisAlign`은 반드시 `CENTER`여야 한다.
- `stackMode`는 반드시 `AUTO_ONLY`여야 한다.
- `items`의 `order`는 1부터 시작하는 연속 정수여야 한다.

### State Transitions
- `pending` -> `computed`: 초기 렌더/수정 후 계산 완료.
- `computed` -> `recomputed`: 추가/삭제/순서 변경/내용 변경 발생 시.

## 2. LayoutItemState

### Purpose
개별 도형의 좌표/크기/간격 계산 결과를 정의한다.

### Fields
- `shapeId` (string, required, unique): 도형 식별자.
- `order` (number, required): 세로 스택 순서.
- `centerX` (number, required): 교차축 중앙 정렬 x좌표.
- `topY` (number, required): 도형 상단 y좌표.
- `width` (number, required): 도형 너비.
- `height` (number, required): 도형 높이.
- `gapAfter` (number, required): 다음 도형까지 동적 간격(px).

### Validation Rules
- `width`, `height`는 0보다 커야 한다.
- `gapAfter`는 0 이상이어야 하며, 다음 도형/화살표와 겹침이 없도록 계산되어야 한다.
- 수동 x/y 오버라이드 필드는 허용하지 않는다.

### State Transitions
- `measured` -> `positioned`: 크기 측정 후 좌표 확정.
- `positioned` -> `repositioned`: 콘텐츠 길이/순서 변경 시 재배치.

## 3. ConnectorCenterAlignment

### Purpose
인접 도형 간 화살표 좌표와 중앙 정렬 검증 상태를 보관한다.

### Fields
- `fromShapeId` (string, required): 시작 도형 ID.
- `toShapeId` (string, required): 종료 도형 ID.
- `startX` (number, required): 시작 x좌표.
- `startY` (number, required): 시작 y좌표(경계 기준).
- `endX` (number, required): 종료 x좌표.
- `endY` (number, required): 종료 y좌표(경계 기준).
- `xTolerancePx` (number, required): 값 `0`.
- `overlapFree` (boolean, required): 도형/화살표 비겹침 여부.

### Validation Rules
- `startX`는 시작 도형 `centerX`와 0px 오차로 일치해야 한다.
- `endX`는 종료 도형 `centerX`와 0px 오차로 일치해야 한다.
- `overlapFree`는 항상 `true`여야 한다.

### State Transitions
- `pending` -> `aligned`: 계산 및 렌더 반영 완료.
- `aligned` -> `recomputed`: 레이아웃 재계산 시.

## Relationships
- `VerticalLayoutState` 1개는 `LayoutItemState` N개를 포함한다.
- 인접한 `LayoutItemState` pair는 `ConnectorCenterAlignment` 1개를 생성한다.
- 편집/프레젠테이션 화면은 동일한 `VerticalLayoutState`와 `ConnectorCenterAlignment` 규칙을 공유한다.

## Scale Assumptions
- 최대 50개 도형 기준으로 동작한다.
- 기존/신규 모든 플로우차트에 동일 규칙을 적용한다.
