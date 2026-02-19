# Data Model: 다중 도형 스타일 및 프레젠테이션 가시성 개선

## 1. ShapeVisualStyle

### Purpose
도형별 시각 스타일(배경색, 테두리색, 강조 그림자)을 저장/복원한다.

### Fields
- `shapeId` (string, required, unique): 도형 고유 식별자. 로컬 복원 매핑 키.
- `fillColor` (string, required): HEX/RGB 계열 색상 값.
- `borderColor` (string, required): HEX/RGB 계열 색상 값.
- `shadowBlur` (number, required): 강조 그림자 blur 값.
- `shadowSpread` (number, required): 강조 그림자 spread 값.
- `shadowOpacity` (number, required): 강조 그림자 불투명도(0~1).
- `updatedAt` (string, required): 최근 변경 시각(ISO-8601).

### Validation Rules
- `shapeId`는 공백 불가, 같은 저장 스냅샷 내 유일해야 한다.
- `fillColor`, `borderColor`가 유효하지 않으면 시스템 기본색으로 대체한다.
- `shadowBlur`, `shadowSpread`는 0 이상이어야 하며 활성 시 baseline의 2배를 적용한다.
- `shadowOpacity`는 baseline 값을 유지한다(변경 금지).

### State Transitions
- `default` -> `customized`: 사용자가 도형 색상 또는 강조값 변경.
- `customized` -> `restored`: 새로고침/재진입 시 로컬 저장 데이터 복원.
- `customized/restored` -> `fallback`: 저장값 검증 실패 시 기본 스타일로 대체.

## 2. PresentationConnectorState

### Purpose
프레젠테이션에서 도형 간 화살표 렌더링/정합 상태를 관리한다.

### Fields
- `sessionId` (string, required): 프레젠테이션 실행 식별자.
- `sourceShapeId` (string, required): 시작 도형 ID.
- `targetShapeId` (string, required): 종료 도형 ID.
- `startPoint` (object, required): 시작 경계 좌표 `{x:number, y:number}`.
- `endPoint` (object, required): 종료 경계 직전 좌표 `{x:number, y:number}`.
- `isVisible` (boolean, required): 화살표 표시 여부.
- `renderedAt` (string, required): 렌더링 확인 시각.

### Validation Rules
- `sourceShapeId != targetShapeId`.
- `startPoint`, `endPoint`는 각각 source/target 경계 규칙을 충족해야 한다.
- 프레젠테이션 활성 상태에서 인접 도형 쌍은 `isVisible=true`여야 한다.

### State Transitions
- `pending` -> `rendered`: 프레젠테이션 시작 후 화살표가 표시됨.
- `rendered` -> `recomputed`: 단계 전환/레이아웃 변경으로 좌표 재계산.
- `rendered/recomputed` -> `hidden`: 프레젠테이션 종료.

## 3. PresentationTypographyProfile

### Purpose
프레젠테이션 가독성 기준(텍스트/강조)을 정의한다.

### Fields
- `textSizeEm` (number, required): 프레젠테이션 텍스트 크기. 값 1.3 고정.
- `baselineTextSizeEm` (number, required): 기준 텍스트 크기. 값 1.0.
- `highlightShadowMultiplier` (number, required): blur/spread 배수. 값 2.0.
- `opacityPolicy` (string, required): opacity 유지 정책. 값 `unchanged`.

### Validation Rules
- `textSizeEm`은 1.3이어야 한다.
- `highlightShadowMultiplier`는 2.0이어야 한다.
- `opacityPolicy`는 항상 `unchanged`여야 한다.

## Relationships
- `ShapeVisualStyle.shapeId` <-> 도형 엔티티(기존 flow node 모델) 1:1.
- `PresentationConnectorState`는 도형 쌍(source/target) 단위 N:1 관계.
- `PresentationTypographyProfile`은 프레젠테이션 세션/뷰 단위 1:1 정책.

## Scale Assumptions
- 단일 플로우차트에서 최대 50개 도형.
- 인접 도형 연결 화살표는 단계 수에 비례해 생성.
- 로컬 복원 데이터는 최신 상태 1세트 기준으로 관리.
