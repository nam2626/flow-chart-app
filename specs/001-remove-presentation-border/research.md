# Research: Remove Presentation Border

## Decision 1: 프레젠테이션 컨테이너는 무테두리 정책을 단일 소스로 관리
- Decision: 프레젠테이션 모드 렌더링에서 컨테이너 border를 항상 `none`으로 강제한다.
- Rationale: 인앱 프레젠테이션과 팝업 프레젠테이션 탭 간의 시각 정책 불일치를 제거한다.
- Alternatives considered:
  - 특정 조건에서만 border 제거: 상태 분기가 늘어 회귀 위험 증가.
  - 테마 값만 변경: 일부 코드 경로에서 border 선언이 남으면 누락 가능성 존재.

## Decision 2: 렌더러 계층에서 정책 적용, 노드 스타일은 유지
- Decision: 컨테이너 스타일만 변경하고 노드/커넥터 스타일은 기존 정책을 유지한다.
- Rationale: 요구사항은 컨테이너 테두리 제거이며 기존 읽기 흐름/상호작용 회귀를 최소화해야 한다.
- Alternatives considered:
  - 전체 프레젠테이션 테마 재설계: 범위 과다.
  - 노드 테두리까지 제거: 요구사항 초과로 가독성 저하 위험.

## Decision 3: 회귀 방지 테스트를 모드 전환과 단계 이동 중심으로 강화
- Decision: 단위(스타일 정책), 통합(모드 전환), E2E(사용자 시나리오)에서 무테두리 지속성 검증을 추가/갱신한다.
- Rationale: 시각 정책 변경은 회귀가 쉬우므로 여러 레벨 테스트로 방어해야 한다.
- Alternatives considered:
  - 스냅샷 테스트만 사용: 동작 시나리오 보장이 약함.
  - 수동 QA 의존: 반복 회귀 탐지 실패 가능성.

## Decision 4: 팝업 프레젠테이션 HTML도 동일한 계약으로 동기화
- Decision: `presentation-tab-service` HTML 생성 규칙에서 컨테이너 border 선언을 제거하고 인앱 정책과 동일하게 맞춘다.
- Rationale: 사용자 관점에서 프레젠테이션 표시 위치(인앱/팝업) 차이와 무관하게 동일 UX를 제공해야 한다.
- Alternatives considered:
  - 팝업은 별도 스타일 유지: UX 일관성 원칙 위반.
  - CSS 파일 분리 후 별도 로딩: 현재 구조 대비 복잡도 증가.
