# Data Model: Remove Presentation Border

## Entity: PresentationContainerStylePolicy

### Description
프레젠테이션 컨테이너가 모드/상태와 무관하게 동일한 무테두리 규칙을 적용하도록 정의하는 정책 엔티티.

### Fields
- `mode` (enum: `edit` | `presentation`)
- `showBorder` (boolean) - 프레젠테이션 모드에서는 항상 `false`
- `background` (string)
- `paddingTop` (number)
- `paddingBottom` (number)
- `alignItems` (string, expected: `center`)

### Validation Rules
- `mode= presentation`일 때 `showBorder`는 반드시 `false`
- `alignItems`는 `center` 여야 함
- padding 값은 0 이상

## Entity: PresentationRenderState

### Description
프레젠테이션 렌더링 시점의 동작 상태와 스타일 정책 결합 결과.

### Fields
- `isPresentationActive` (boolean)
- `currentStepOrder` (number)
- `nodeCount` (number)
- `containerPolicy` (PresentationContainerStylePolicy)

### Validation Rules
- `nodeCount=0`이어도 `containerPolicy.showBorder=false` 유지
- `isPresentationActive=true`이면 `containerPolicy.mode=presentation`

## Entity: FlowNode (Referenced)

### Description
기존 플로우차트 단계 노드. 본 변경에서는 노드 데이터 스키마 변경 없이 컨테이너 정책만 변경.

### Key Fields (existing)
- `nodeId` (string, unique)
- `stepOrder` (number)
- `label` (string)
- `shapeType` (enum)
- `width`, `height` (number)
- `fillColor`, `borderColor` (string)
- `isActive` (boolean)

## Relationships
- `PresentationRenderState.containerPolicy -> PresentationContainerStylePolicy` (1:1)
- `PresentationRenderState`는 렌더 시점에 `FlowNode[]`를 참조 (1:N)

## State Transitions
- `edit -> presentation`: `showBorder=false` 강제
- `presentation(step change) -> presentation`: `showBorder=false` 유지
- `presentation -> edit`: 기존 편집 모드 정책으로 복귀 (이번 변경 범위 외)
