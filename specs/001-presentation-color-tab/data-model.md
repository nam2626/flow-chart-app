# Data Model: 도형 색상 커스터마이징 및 새탭 프레젠테이션 정렬 개선

## Entity: ShapeStyleProfile
- Description: 도형별 커스터마이징 색상 상태
- Fields:
  - `nodeId` (string, required): 대상 도형 식별자
  - `fillColor` (string, required): 도형 채움색(HEX)
  - `borderColor` (string, required): 도형 테두리색(HEX)
  - `updatedAt` (string, required): 마지막 수정 시각
- Validation Rules:
  - `fillColor`, `borderColor`는 유효한 HEX 색상이어야 한다.
  - 지정값이 없으면 시스템 기본 색상으로 대체한다.

## Entity: PresentationViewSession
- Description: 새탭 프레젠테이션 실행 상태
- Fields:
  - `isRunning` (boolean, required)
  - `openedInNewTab` (boolean, required)
  - `tabBlocked` (boolean, required)
  - `currentStepOrder` (number, nullable)
  - `centerAligned` (boolean, required)
  - `startedAt` (string, nullable)
  - `endedAt` (string, nullable)
- Validation Rules:
  - `tabBlocked=true`면 `isRunning=false`여야 한다.
  - `isRunning=true`면 `openedInNewTab=true`여야 한다.

## Entity: CenteredConnectorPath
- Description: 인접 도형 중심점 연결 경로
- Fields:
  - `fromNodeId` (string, required)
  - `toNodeId` (string, required)
  - `startX` (number, required)
  - `startY` (number, required)
  - `endX` (number, required)
  - `endY` (number, required)
- Validation Rules:
  - 시작점은 시작 도형 중심점과 동일해야 한다.
  - 종료점은 대상 도형 중심점과 동일해야 한다.

## Relationships
- ShapeStyleProfile N --- 1 FlowNode
- PresentationViewSession 1 --- N CenteredConnectorPath

## State Transitions
- PresentationViewSession: `idle -> running(new-tab-opened) -> stopped`
- PresentationViewSession (failure): `idle -> blocked(error-shown)`
