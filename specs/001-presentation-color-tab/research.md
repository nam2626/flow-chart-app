# Research: 도형 색상 커스터마이징 및 새탭 프레젠테이션 정렬 개선

## Decision 1: 도형별 색상 범위
- Decision: 도형별 스타일 커스터마이징은 채움색(fill)과 테두리색(border)만 허용한다.
- Rationale: 사용자가 요구한 범위를 정확히 만족하면서 상태 모델과 UI 복잡도를 최소화한다.
- Alternatives considered:
  - 텍스트색/그림자색까지 확장: 설정 복잡도와 회귀 범위 증가.
  - 전체 테마 단위 일괄 변경만 제공: 도형별 차별화 요구 미충족.

## Decision 2: 새탭 프레젠테이션 실패 처리
- Decision: 프레젠테이션 시작 시 새탭 오픈이 차단되면 시작을 취소하고 명시적 오류 메시지를 표시한다.
- Rationale: 명시적 실패는 사용자 오해(시작된 줄로 착각)를 방지하고 검증 기준을 명확히 만든다.
- Alternatives considered:
  - 현재 탭 자동 대체: 요구사항(새탭 실행) 위반 가능성.
  - 재시도 대기 모달: 흐름 복잡도 증가.

## Decision 3: 화살표 중심점 연결 규칙
- Decision: 인접 도형의 정확한 중심점(center-to-center)을 시작/종료점으로 사용한다.
- Rationale: “정가운데” 요구를 가장 직접적으로 구현하며 계산 규칙이 단순하고 재현 가능하다.
- Alternatives considered:
  - 경계점-경계점 연결: 중심 연결 요구와 불일치.
  - 중심축 + 경계 오프셋: 규칙 해석 모호성 잔존.

## Decision 4: box-shadow 2배 밝기 정의
- Decision: 활성 도형 그림자 강조는 baseline 대비 opacity를 2배로 증가시키고 최대값 1.0으로 제한한다.
- Rationale: 정량 기준이 있어 테스트 가능하고 과도한 시각 왜곡을 방지한다.
- Alternatives considered:
  - blur radius 2배: 밝기와 직접 상관이 낮음.
  - blur+opacity 동시 2배: 과강조 가능성 증가.

## Decision 5: 성능 측정 기준
- Decision: 50단계 기준으로 새탭 전환/중심 화살표 재계산을 각각 10회 반복 측정해 p95를 기록한다.
- Rationale: 헌장 성능 예산을 재현 가능한 입력 조건으로 검증할 수 있다.
- Alternatives considered:
  - 단회 측정: 변동성 통제 불가.
  - 10단계 소규모 데이터: 실제 사용 상한 반영 부족.

## UX-003 신규 패턴 도입 사유/영향
- 신규 패턴: 새탭 프레젠테이션 렌더 서비스(`presentation-tab-service`) 도입.
- 도입 사유: 발표 화면을 편집 화면과 분리해 집중도를 높이고 새탭 차단 실패를 명시적으로 처리하기 위함.
- 영향 범위:
  - 툴바 시작 동작에서 새탭 오픈 분기 추가.
  - 실패 시 배너 오류 문구 노출 규칙 고정.
  - 기존 인앱 프레젠테이션 경로와 병행 유지(회귀 안정성 목적).

## 성능 측정 기록 템플릿
- 항목: `presentation-tab-start-p95`
  - 입력 크기: 노드 50개
  - 반복 횟수: 10회
  - 측정 구간: 시작 클릭 이후 store 상태 전이 + 렌더 트리 반영 직전
  - 결과:
  - 비고:
- 항목: `center-connector-recompute-p95`
  - 입력 크기: 노드 50개
  - 반복 횟수: 10회
  - 측정 구간: 중심점 경로 계산 함수 호출 구간
  - 결과:
  - 비고:

## 네이밍 규칙 점검 리포트
- `PascalCase`: `PresentationMode`, `PresentationTab`, `ShapeStyleModel`
- `camelCase`: `buildCenterConnectorPaths`, `updateNodeColors`, `openPresentationTab`
- `UPPER_SNAKE_CASE`: `DEFAULT_SHAPE_COLORS`
- `kebab-case` 파일: `presentation-tab-service.ts`, `center-connector-performance.integration.spec.ts`
- 점검 결과: 신규 파일/식별자에서 규칙 위반 없음.
