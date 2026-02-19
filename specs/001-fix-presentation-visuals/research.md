# Research: 다중 도형 스타일 및 프레젠테이션 가시성 개선

## Decision 1: 도형 색상 저장 전략
- Decision: 도형별 배경색/테두리색을 browser-local 저장소에 보관하고, 문서와 무관하게 최근 상태를 도형 고유 ID로 복원한다.
- Rationale: 명시된 요구(문서 무관 최근 상태 복원 + 모든 도형 적용)를 가장 직접적으로 만족하고, 도형 순서 변경에도 매핑 안정성이 높다.
- Alternatives considered:
  - 문서 단위 저장: 요구사항(문서 무관 복원)과 충돌.
  - 인덱스 기반 저장: 도형 재정렬/삭제 시 잘못 매핑될 위험이 큼.

## Decision 2: 프레젠테이션 화살표 경계 정합성
- Decision: 화살표는 source 도형 경계에서 시작하고 target 도형 경계 직전에서 종료하도록 경계 교차점 기반 계산을 사용한다.
- Rationale: Clarification에서 확정된 경계 규칙과 시각적 일치성을 보장하고, 도형 크기/간격 변화에도 계산 방식이 일관된다.
- Alternatives considered:
  - 중심점-중심점 고정 연결: 도형 내부 관통으로 요구사항 위반.
  - 고정 오프셋 종단점: 다양한 레이아웃에서 어긋남 발생.

## Decision 3: 강조 스타일 확장 기준
- Decision: 프레젠테이션에서 텍스트 크기 1.3em 적용, 활성 도형 그림자는 baseline 대비 blur/spread 각각 2배, opacity는 고정 유지.
- Rationale: 수치 기준이 명확해 테스트 가능하며, 강조 강도를 높이되 과도한 불투명도 증가를 방지한다.
- Alternatives considered:
  - spread만 2배: 확장 효과는 있으나 강조 체감이 약함.
  - opacity 증가 포함: 대비는 증가하지만 가독성/색상 충돌 리스크 확대.

## Decision 4: 품질 게이트 및 측정
- Decision: 단위/통합/E2E를 분리 실행하고 p95 300ms 예산(화살표 표시, 스타일 반영)을 성능 스펙으로 검증한다.
- Rationale: 헌장(테스트 표준, 성능 예산)을 직접 만족하며 회귀 위치를 빠르게 식별할 수 있다.
- Alternatives considered:
  - E2E 단독 검증: 원인 분석 범위가 넓어 회귀 추적 비용이 큼.
  - 정성 검증만 수행: 성능 기준(PRF) 충족 여부를 객관적으로 증명 불가.

## Decision 5: 계약 문서화 방식
- Decision: 백엔드 도입 전 설계 정렬을 위해 OpenAPI 기반 논리 계약을 `contracts/`에 유지한다.
- Rationale: 사용자 액션을 일관된 인터페이스로 명시해 향후 API 전환 시 재작업을 줄이고 테스트 포인트를 표준화한다.
- Alternatives considered:
  - 계약 문서 생략: 계획-구현 간 용어 불일치 가능성 증가.
  - GraphQL 계약 단독 사용: 현재 액션 기반 요구 대비 단순 REST 문맥이 더 명확.
