# Research: 간단 웹 플로우차트 작성기

## Decision 1: 렌더링 표면은 SVG를 기본으로 사용
- Decision: 도형(사각형/타원)과 outglow 표현을 SVG 기반으로 구현한다.
- Rationale: 투명 배경 유지와 도형별 강조 스타일 일관성 확보가 쉽고, SVG 내보내기와 동일한
  시각 모델을 공유할 수 있다.
- Alternatives considered:
  - HTML div 절대배치: 간단하지만 내보내기 정합성과 좌표 처리 일관성이 떨어짐.
  - Canvas: 성능은 좋지만 노드 단위 접근성/상호작용 테스트가 복잡해짐.

## Decision 2: 상태 관리는 Zustand + persist(localStorage)
- Decision: 다이어그램 상태, 진행 상태, 단축키 설정을 Zustand 스토어로 관리하고 persist를 적용한다.
- Rationale: 로컬 유지 요구를 최소 코드로 충족하고, React 컴포넌트와의 결합이 낮아 테스트 분리가 쉽다.
- Alternatives considered:
  - React Context + useReducer: 기능 가능하지만 파일 병합/충돌 흐름에서 액션 확장이 번거로움.
  - Redux Toolkit: 구조는 명확하지만 현재 범위 대비 설정 비용이 큼.

## Decision 3: 파일 병합 충돌 기본값은 가져온 파일 우선
- Decision: JSON 불러오기 병합 시 기본 충돌 해결은 가져온 파일 값 우선으로 한다.
- Rationale: 사용자 입력으로 가져온 최신 파일 적용 기대와 일치하며 기본 동작이 단순하다.
- Alternatives considered:
  - 기존 캔버스 우선: 데이터 반영 누락 가능성 큼.
  - 병합 중단: 안전하지만 사용성이 낮고 반복 작업이 증가.

## Decision 4: 테스트 계층은 Vitest + RTL + Playwright
- Decision: 로직은 Vitest, UI 상호작용은 RTL, 핵심 사용자 흐름은 Playwright로 검증한다.
- Rationale: 헌장 요구(단위 + 사용자 흐름 테스트)를 최소 중복으로 충족한다.
- Alternatives considered:
  - Jest only: E2E 대체 불가.
  - Cypress only: 단위 테스트 세분화가 약함.

## Decision 5: 성능/제약 검증 기준
- Decision: 단계 전환 0.3초, 5MB 이하 import 3초, 200노드 조작 무지연을 검증 기준으로 확정한다.
- Rationale: 스펙의 정량 목표와 직접 매핑되며 수용 테스트 작성이 가능하다.
- Alternatives considered:
  - 정성 지표만 사용: 합격/불합격 기준이 불명확.

## Resolved Clarifications
- Technical Context의 불확실 항목(상태관리 방식, 렌더링 방식, 테스트 스택, 성능 검증 방식)은
  모두 본 문서 결정으로 해소됨.

## Quality Gate Results
- Date: 2026-02-16
- lint: PASS (`npm.cmd run lint`)
- typecheck: PASS (`npm.cmd run typecheck`)
- unit tests: PASS (7 files, 13 tests)
- integration tests: PASS (5 files, 6 tests)
- e2e tests: PASS (3 scenarios)


