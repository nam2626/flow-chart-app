# Data Model: 수동 위치 금지 중앙 정렬 레이아웃

## 1. FlowLayoutContainerState

### Purpose
플로우차트 컨테이너의 방향, 정렬, 확장 정책, 렌더 모드를 관리한다.

### Fields
- `layoutId` (string, required): 레이아웃 계산 식별자.
- `mode` (string, required): `edit | presentation`.
- `direction` (string, required): 값 `TOP_TO_BOTTOM`.
- `crossAxisAlign` (string, required): 값 `CENTER`.
- `positionPolicy` (string, required): 값 `FLOW_ONLY`.
- `heightPolicy` (string, required): 값 `EXPAND_WITH_CONTENT`.
- `computedAt` (number, required): 계산 시각(epoch ms).

### Validation Rules
- `direction`은 반드시 `TOP_TO_BOTTOM`.
- `crossAxisAlign`은 반드시 `CENTER`.
- `positionPolicy`는 반드시 `FLOW_ONLY`.
- `heightPolicy`는 반드시 `EXPAND_WITH_CONTENT`.

### State Transitions
- `pending` -> `computed`: 초기 렌더 완료.
- `computed` -> `recomputed`: 추가/삭제/순서 변경/모드 전환 발생.

## 2. FlowShapeLayoutItem

### Purpose
도형의 순서, 크기, 흐름 배치 결과를 표현한다.

### Fields
- `shapeId` (string, required, unique): 도형 식별자.
- `order` (number, required): 세로 흐름 순서.
- `centerX` (number, required): 컨테이너 기준 수평 중심 좌표.
- `topY` (number, required): 도형 상단 좌표(계산 결과).
- `width` (number, required): 도형 너비.
- `height` (number, required): 도형 높이.
- `gapAfter` (number, required): 다음 흐름 행까지 간격(px).

### Validation Rules
- `order`는 1부터 시작하는 연속 정수.
- `width`, `height`는 0보다 커야 한다.
- 수동 배치용 `manualTop`, `manualLeft`, `absoluteRect` 필드는 허용하지 않는다.

### State Transitions
- `measured` -> `positioned`: 크기 측정 후 배치 확정.
- `positioned` -> `repositioned`: 내용/순서/모드 변경 시 재배치.

## 3. ConnectorFlowRow

### Purpose
인접 도형 사이 연결선을 전용 흐름 행으로 표현한다.

### Fields
- `rowId` (string, required): 연결선 행 식별자.
- `fromShapeId` (string, required): 시작 도형 ID.
- `toShapeId` (string, required): 종료 도형 ID.
- `centerX` (number, required): 연결선 행 중심 x좌표.
- `rowTopY` (number, required): 연결선 행 시작 y좌표.
- `rowHeight` (number, required): 연결선 행 높이.
- `usesAbsolute` (boolean, required): 값 `false`.

### Validation Rules
- `centerX`는 `from`/`to` 도형 중심선과 일치해야 한다.
- `rowHeight`는 0보다 커야 한다.
- `usesAbsolute`는 항상 `false`여야 한다.

### State Transitions
- `pending` -> `rendered`: 연결선 행 렌더 반영.
- `rendered` -> `rerendered`: 도형 변경/모드 전환 시.

## Relationships
- `FlowLayoutContainerState` 1개는 `FlowShapeLayoutItem` N개를 포함한다.
- 인접 `FlowShapeLayoutItem` 쌍은 `ConnectorFlowRow` 1개를 가진다.
- 편집/프레젠테이션은 동일 데이터 모델과 동일 제약을 공유한다.

## Scale Assumptions
- 최대 50개 도형 기준으로 동작한다.
- 기존/신규 플로우차트 모두 동일 정책을 적용한다.
