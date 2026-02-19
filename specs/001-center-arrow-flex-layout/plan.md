# Implementation Plan: 화살표 중앙 정렬 세로 플렉스 레이아웃

**Branch**: `001-center-arrow-flex-layout` | **Date**: 2026-02-16 | **Spec**: `D:\workspace\flowchart-app\specs\001-center-arrow-flex-layout\spec.md`
**Input**: Feature specification from `D:\workspace\flowchart-app\specs\001-center-arrow-flex-layout\spec.md`

## Summary

플로우차트를 세로(top-to-bottom) 플렉스 스택으로 통일하고 교차축 중앙 정렬을 강제한다. 모든 화면(편집/프레젠테이션)과 모든 데이터(기존/신규)에 동일 규칙을 적용하며, 화살표는 각 도형 수평 중심에 0px 오차로 정렬한다. 도형 높이와 텍스트 길이에 따라 동적 간격을 계산해 도형/화살표 겹침을 방지하고, 재정렬 성능은 p95 300ms 이내를 만족한다.

## Technical Context

**Language/Version**: TypeScript 5.7.x  
**Primary Dependencies**: React 18, React DOM 18, Zustand 4, Vite 6  
**Storage**: Browser localStorage (기존 store 영속화 사용, 신규 저장소 추가 없음)  
**Testing**: Vitest (unit/integration), Testing Library, Playwright (E2E)  
**Contract Style**: OpenAPI 문서는 외부 HTTP API 구현이 아닌 내부 레이아웃/검증 논리 계약(artifact)으로 사용  
**Target Platform**: Modern desktop browsers (Chromium-family baseline)  
**Project Type**: Single-page web application  
**Performance Goals**: 도형 변경/프레젠테이션 시작 후 레이아웃+화살표 재정렬 p95 <= 300ms, 화살표 중심 정렬 오차 0px  
**Constraints**: 세로 단방향 스택 강제, 수동 x/y 배치 비허용, 화면 간 동일 규칙, 동적 간격 기반 비겹침 보장  
**Scale/Scope**: 단일 플로우차트 화면, 최대 50개 도형 기준 레이아웃/화살표/검증 로직

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- 코드 품질: PASS - 기존 `services/components/store` 구조 내 변경으로 모듈 책임 분리를 유지하고 lint/typecheck 기준을 적용한다.
- 테스트 표준: PASS - 단위(좌표/간격 계산) + 통합(화면 정합) + E2E(편집/프레젠테이션 흐름) 검증을 포함한다.
- UX 일관성: PASS - 편집/프레젠테이션 동일 용어와 동일 정렬 규칙을 강제하고 화면별 예외를 두지 않는다.
- 성능 예산: PASS - p95 300ms 목표와 측정 구간(재정렬 시작~좌표 반영 완료)을 문서화한다.
- 주석/네이밍/구조: PASS - 한글 근거 주석, 기존 네이밍 규칙, 기능 중심 단순 계층을 유지한다.

**Post-Design Re-check (Phase 1)**

- 코드 품질: PASS - 레이아웃/정렬 계산을 서비스 계층으로 응집시키고 UI 컴포넌트는 결과 렌더링만 담당하도록 설계했다.
- 테스트 표준: PASS - 동적 간격/비겹침/0px 중심 정렬/화면 간 동일성 검증 포인트를 문서화했다.
- UX 일관성: PASS - 모든 플로우차트와 모든 화면에 공통 정책(FR-007)을 적용하도록 계약을 명시했다.
- 성능 예산: PASS - 입력 규모(최대 50개), 반복 횟수, p95 산출 기준을 quickstart/research에 명시했다.
- 주석/네이밍/구조: PASS - 기존 `src/features/flowchart/*` 계층과 테스트 구조(`tests/unit|integration`)를 그대로 사용한다.
- 계약 정합성: PASS - `contracts/flowchart-layout.openapi.yaml`은 런타임 endpoint가 아닌 내부 계약 문서로만 유지한다.

## Project Structure

### Documentation (this feature)

```text
D:/workspace/flowchart-app/specs/001-center-arrow-flex-layout/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── flowchart-layout.openapi.yaml
└── tasks.md
```

### Source Code (repository root)

```text
D:/workspace/flowchart-app/
├── src/
│   ├── app/
│   ├── features/
│   │   └── flowchart/
│   │       ├── components/
│   │       ├── models/
│   │       ├── services/
│   │       ├── shortcuts/
│   │       └── store/
│   └── shared/
│       └── utils/
└── tests/
    ├── unit/
    ├── integration/
    └── helpers/
```

**Structure Decision**: 단일 웹 앱 구조를 유지하고, 레이아웃/정렬 계산은 `src/features/flowchart/services`에 집중한다. 뷰 반영은 `components`에서 처리하고 검증은 `tests/unit`, `tests/integration`, `tests/integration/*.e2e.ts`를 유지한다.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

헌장 위반 항목 없음.

## Final CCR-003 Structure Check

- 점검 결과: 변경 대상은 기존 기능 중심 계층(`models/services/components/store/tests`) 안에서 해결 가능하다.
- 판단: CCR-003(기능 중심 단순 계층 유지) 충족.

## Quality Gate Evidence

- lint: `PASS` (2026-02-16, `npm run lint`)
- typecheck: `PASS` (2026-02-16, `npm run typecheck`)
- test:unit: `PASS` (2026-02-16, `npm run test:unit`, 24 files/45 tests)
- test:integration: `PASS` (2026-02-16, `npm run test:integration`, 29 files/37 tests)

## Naming Rule Compliance Notes

- `PascalCase`: 타입/컴포넌트
- `camelCase`: 함수/변수
- `UPPER_SNAKE_CASE`: 상수
- `kebab-case`: 파일/폴더
- 검증 상태: `PASS` (`@typescript-eslint/naming-convention` + 문서 체크 완료)
