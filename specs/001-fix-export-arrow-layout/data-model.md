# Data Model: 단계형 플로우차트 보강

## Entity: Flowchart
- Description: 사용자 편집 단위 차트
- Fields:
  - `id` (string, required): 차트 식별자
  - `title` (string, optional): 차트 제목
  - `canvasWidthPx` (number, required, 300~400): 캔버스 가로폭
  - `background` (string, required, enum: `transparent`): 배경 설정
  - `steps` (FlowStep[], required): 단계 목록
  - `connections` (StepConnection[], derived): 단계 간 연결
  - `updatedAt` (string, required): 마지막 수정 시각
- Validation Rules:
  - `canvasWidthPx`는 300~400 정수여야 한다.
  - `steps.length`는 1~50 범위여야 한다.
- State Transitions:
  - `editing` -> `readyToExport` (모든 단계 텍스트 유효)
  - `readyToExport` -> `editing` (단계 수정 발생)

## Entity: FlowStep
- Description: 플로우차트의 단일 단계 도형
- Fields:
  - `id` (string, required): 단계 식별자
  - `order` (number, required): 세로 정렬 순서
  - `shapeType` (string, required, enum: `rectangle`, `ellipse`)
  - `text` (string, required, minLength: 1)
- Validation Rules:
  - 동일 차트 내 `order`는 고유해야 한다.
  - `text` 공백-only 값은 허용하지 않는다.

## Entity: StepConnection
- Description: 인접 단계 간 화살표 연결
- Fields:
  - `id` (string, required): 연결 식별자
  - `fromStepId` (string, required)
  - `toStepId` (string, required)
  - `direction` (string, required, enum: `down`)
- Validation Rules:
  - `fromStepId`의 `order`는 `toStepId`보다 작아야 한다.
  - 자기 자신으로의 연결은 금지한다.

## Entity: ExportJob
- Description: 내보내기 실행 기록
- Fields:
  - `id` (string, required)
  - `flowchartId` (string, required)
  - `status` (string, required, enum: `queued`, `running`, `succeeded`, `failed`)
  - `startedAt` (string, optional)
  - `finishedAt` (string, optional)
  - `errorCode` (string, optional)
  - `errorMessage` (string, optional)
- Validation Rules:
  - `status=failed`일 때 `errorMessage`는 필수다.
  - `status=succeeded`일 때 `finishedAt`은 필수다.

## Relationships
- Flowchart 1 --- N FlowStep
- Flowchart 1 --- N StepConnection
- Flowchart 1 --- N ExportJob
- StepConnection N --- 1 FlowStep (`fromStepId`)
- StepConnection N --- 1 FlowStep (`toStepId`)
