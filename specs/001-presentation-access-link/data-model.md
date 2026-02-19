# Data Model - 프레젠테이션 별도 접속 링크

## PresentationLink
- Purpose: 다이어그램별 발표 접근 링크 상태를 관리한다.
- Fields:
  - `diagramId` (string, required)
  - `shareCode` (string, required, 6..8)
  - `status` (enum: `active` | `revoked`, required)
  - `documentTitle` (string, required)
  - `createdAt` (datetime, required)
  - `regeneratedAt` (datetime, optional)
- Validation:
  - 활성 링크 집합에서 `shareCode`는 유일해야 한다.
  - `status=revoked` 상태 링크는 접근 성공을 반환할 수 없다.
- Relationships:
  - `PresentationLink` 1:N `LinkAccessEvent`
  - `PresentationLink` 1:N `PresentationSessionState`

## PresentationSessionState
- Purpose: 발표 탭 단위 연결/동기화/차단 상태를 표현한다.
- Fields:
  - `sessionId` (string, required)
  - `shareCode` (string, required)
  - `state` (enum: `connected` | `revoked` | `error`, required)
  - `lastSyncedRevision` (string, required)
  - `lastSyncedAt` (datetime, required)
  - `lastErrorCode` (string, optional)
- State transitions:
  - `connected -> revoked` (링크 재생성)
  - `connected -> error` (실시간 반영 실패)
  - `error -> connected` (재연결 성공)
- Validation:
  - `revoked` 전환 시 편집 데이터 반영 중단 및 접근 거부 UI 전환이 필요하다.

## LinkAccessEvent
- Purpose: 링크 접근/차단/동기화 관련 계측 이벤트를 기록한다.
- Fields:
  - `eventId` (string, required)
  - `shareCode` (string, required)
  - `eventType` (enum: `open_success` | `open_denied` | `session_revoked` | `sync_update` | `sync_error`, required)
  - `occurredAt` (datetime, required)
  - `latencyMs` (number, optional)
  - `reasonCode` (string, optional)
- Validation:
  - `open_denied` 이벤트는 `reasonCode`를 반드시 포함해야 한다.

## DiagramSnapshot
- Purpose: 발표 화면 렌더링의 기준 데이터(저장 리비전 단위).
- Fields:
  - `diagramId` (string, required)
  - `revisionId` (string, required)
  - `savedAt` (datetime, required)
  - `nodes` (array, required)
  - `edges` (array, required)
- Validation:
  - 발표 화면은 저장 완료된 `revisionId`만 반영할 수 있다.
