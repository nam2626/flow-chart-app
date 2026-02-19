# Research: 프레젠테이션 컴포넌트 전환 및 PNG 내보내기

## Decision 1: 프레젠테이션 전용 컴포넌트 분리
- Decision: 프레젠테이션 시작 시 편집 컴포넌트와 분리된 전용 컴포넌트를 렌더링한다.
- Rationale: 편집 UI와 발표 UI 책임을 분리해 상태 충돌과 조건 분기 복잡도를 줄인다.
- Alternatives considered:
  - 단일 컴포넌트 조건부 렌더: 분기 증가로 회귀 위험 상승.
  - CSS만으로 숨김 처리: 구조 분리는 되지 않아 유지보수성이 낮음.

## Decision 2: 단계 번호 숨김 정책
- Decision: 프레젠테이션 전용 화면에서는 "단계 N" 번호 텍스트만 숨기고 본문 라벨은 유지한다.
- Rationale: 전달 정보(본문)는 유지하면서 시각적 노이즈를 줄인다.
- Alternatives considered:
  - 도형 전체 숨김: 흐름 이해가 깨짐.
  - 본문까지 숨김: 발표 정보 손실.

## Decision 3: 화살표 경계 계산 규칙
- Decision: 화살표는 시작 도형 경계에서 출발하고 대상 도형 경계 4px 앞에서 끝난다.
- Rationale: 도형 내부 침범 없이 시각 연결성을 유지하고, 테스트 가능 기준(4px)을 제공한다.
- Alternatives considered:
  - 경계 0px 종료: 화살촉이 테두리와 겹쳐 가독성 저하.
  - 8px 이상 오프셋: 연결감 약화.

## Decision 4: 리디자인 색상 체계
- Decision: 프레젠테이션 모드 전용 색상 토큰(도형 채움/테두리/화살표/활성 강조)을 정의하고 일괄 적용한다.
- Rationale: 모드 정체성을 강화하고 시각 요소 일관성을 보장한다.
- Alternatives considered:
  - 기존 색상 재사용: 리디자인 요구 미충족.
  - 화면별 임의 색상: UX 일관성 저하.

## Decision 5: PNG 내보내기 생성 방식
- Decision: 프레젠테이션 전용 렌더(SVG 기반)를 캔버스로 변환해 PNG Blob 다운로드를 제공한다.
- Rationale: 기존 벡터 렌더 파이프라인 재사용으로 구현 복잡도를 낮추고 품질을 유지한다.
- Alternatives considered:
  - DOM 스크린샷 라이브러리 의존: 스타일/브라우저 호환 변동성 증가.
  - 서버 변환: 단일 웹앱 범위를 벗어나 인프라가 필요.

## Decision 6: 성능 검증 기준
- Decision: 50단계 샘플에서 전환/경계 계산/PNG 피드백 지연을 각각 측정한다.
- Rationale: 헌장 성능 예산을 직접 검증하고 회귀를 조기에 감지한다.
- Alternatives considered:
  - 수동 체감 검증: 재현성과 추적성 부족.
  - 소규모 샘플만 측정: 실제 상한 시나리오를 반영하지 못함.

## SC-004 analytics tagging rule (presentation-ux)
- 이벤트 키: `presentation-ux`
- 수집 시점:
  - 프레젠테이션 시작
  - 프레젠테이션 종료
  - PNG 내보내기 시도/성공/실패
- 최소 페이로드:
  - `eventName`, `timestamp`, `diagramId`, `nodeCount`, `canvasWidthPx`, `result`
- 성공 기준 집계:
  - 배포 전 14일 대비 배포 후 14일 `presentation-ux` 성공 이벤트 비율 비교

## Quality gate execution log
- lint/typecheck/unit/integration/e2e 실행 순서 고정
- 실패 시 즉시 중단하고 실패 로그를 동일 파일에 추가

## Naming convention report
- `presentation-*`, `png-export-*`, `arrow-*` 접두로 기능 단위 네이밍 통일
- 컴포넌트는 PascalCase, 서비스/유틸은 kebab-case 파일명 유지
