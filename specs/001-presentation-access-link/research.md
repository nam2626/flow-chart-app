# Research: 프레젠테이션 별도 접속 링크

## Decision 1
- Decision: 6~8자 공유 코드를 사용하고 충돌 시 즉시 재발급한다.
- Rationale: OBS 입력/공유 편의성을 유지하면서 유일성은 재시도로 보장할 수 있다.
- Alternatives considered: 긴 토큰 링크, 문서 ID 직접 노출 링크.

## Decision 2
- Decision: 링크 재생성 시 기존 링크와 이미 열린 발표 탭을 즉시 무효화한다.
- Rationale: 운영 규칙을 단순화하고 유출 대응 시간을 최소화한다.
- Alternatives considered: 유예 시간 차단, 신규 링크와 기존 링크 병행 허용.

## Decision 3
- Decision: 발표 화면은 저장 완료된 최신 리비전을 실시간 자동 반영한다.
- Rationale: 발표자가 수동 새로고침 없이 최신 화면을 유지해야 실제 발표 흐름이 안정적이다.
- Alternatives considered: 수동 새로고침 방식, 선택형 라이브 모드.

## Decision 4
- Decision: 발표 링크 접근 시 문서명을 브라우저 탭 제목으로 사용한다.
- Rationale: OBS Browser Source에서 소스 식별성과 운영 편의성을 높인다.
- Alternatives considered: 고정 제목 사용, 제목 미지정.

## Decision 5
- Decision: 성능 예산은 p95 렌더, 실패율, 반복 편차와 함께 번들/메모리/네트워크 호출을 측정한다.
- Rationale: 헌장 성능 원칙의 필수 측정 항목을 모두 충족해야 품질 게이트를 통과할 수 있다.
- Alternatives considered: 렌더링 시간만 측정, 수동 관찰 기반 검증.

## Decision 6
- Decision: 본 계약 문서는 서버 API가 아닌 클라이언트 내부 facade 계약으로 사용한다.
- Rationale: 현재 프로젝트는 단일 SPA 구조이며 구현 경계를 문서상에서 명확히 해야 혼선을 줄일 수 있다.
- Alternatives considered: 외부 서버 API 계약으로 확장, 계약 문서 미사용.
