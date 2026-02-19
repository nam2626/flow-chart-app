# Data Model: 프레젠테이션 컴포넌트 전환 및 PNG 내보내기

## Entity: PresentationViewState
- Description: 프레젠테이션 전용 화면 렌더링 상태
- Fields:
  - `isActive` (boolean, required): 프레젠테이션 모드 활성 여부
  - `currentStepOrder` (number, nullable): 현재 강조 단계 번호
  - `hideStepOrderText` (boolean, required): 단계 번호 텍스트 숨김 정책
  - `themeId` (string, required): 적용된 프레젠테이션 색상 체계 식별자
- Validation Rules:
  - `isActive=true`일 때 `hideStepOrderText=true`여야 한다.
  - `isActive=true`이고 단계가 존재하면 `currentStepOrder`는 1..N 범위여야 한다.

## Entity: ArrowRenderSegment
- Description: 도형 간 흐름 화살표 렌더링 단위
- Fields:
  - `fromNodeId` (string, required)
  - `toNodeId` (string, required)
  - `startPoint` (object, required: x, y)
  - `endPoint` (object, required: x, y)
  - `endOffsetPx` (number, required, fixed: 4)
  - `strokeColor` (string, required)
- Validation Rules:
  - `endOffsetPx`는 4로 고정해야 한다.
  - `startPoint`는 시작 도형 경계 위에 있어야 한다.
  - `endPoint`는 대상 도형 경계 안쪽으로 들어가면 안 된다.

## Entity: ExportJob
- Description: 내보내기 요청과 실행 결과
- Fields:
  - `jobId` (string, required)
  - `format` (string, required, enum: `png`)
  - `sourceView` (string, required, enum: `presentation`)
  - `status` (string, required, enum: `requested`, `success`, `failed`)
  - `fileName` (string, required)
  - `message` (string, required)
  - `requestedAt` (string, required)
  - `completedAt` (string, nullable)
- Validation Rules:
  - `format=png`이면 `sourceView`는 항상 `presentation`이어야 한다.
  - 필수 단계 텍스트 누락 시 `status=failed`와 실패 메시지를 반환해야 한다.

## Relationships
- PresentationViewState 1 --- N ArrowRenderSegment
- PresentationViewState 1 --- N ExportJob (시간순 이력)
- ExportJob N --- 1 PresentationViewState (생성 기준 뷰)

## State Transitions
- PresentationViewState: `inactive -> active -> inactive`
- ExportJob: `requested -> success` 또는 `requested -> failed`
