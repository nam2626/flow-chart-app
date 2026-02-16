# Implementation Plan: 수동 위치 금지 중앙 정렬 레이아웃

**Branch**: `001-enforce-flex-center-layout` | **Date**: 2026-02-16 | **Spec**: `D:\workspace\flowchart-app\specs\001-enforce-flex-center-layout\spec.md`
**Input**: Feature specification from `D:\workspace\flowchart-app\specs\001-enforce-flex-center-layout\spec.md`

## Summary

편집/프레젠테이션 화면 모두에서 플로우차트 컨테이너를 세로 플렉스 레이아웃으로 통일하고 가로 중앙 정렬을 강제한다. 도형의 수동 `top/left` 지정과 `position: absolute` 기반 배치를 전면 금지하며, 연결선은 도형 사이 전용 흐름 행(row)으로 렌더링한다. 도형 수가 증가하면 컨테이너 높이를 확장하고 재배치 성능 p95 300ms를 유지한다.

## Technical Context

**Language/Version**: TypeScript 5.7.x  
**Primary Dependencies**: React 18, React DOM 18, Zustand 4, Vite 6  
**Storage**: Browser localStorage (기존 store 지속화 방식 재사용)  
**Testing**: Vitest (unit/integration), Testing Library, Playwright (E2E)  
**Target Platform**: Modern desktop browsers (Chromium baseline)  
**Project Type**: Single-page web application  
**Performance Goals**: 편집/프레젠테이션 레이아웃 반영 p95 <= 300ms, 정렬 불일치율 < 5%  
**Constraints**: 도형/연결선/보조 UI 전체에서 `position: absolute` 금지, 수동 `top/left` 금지, 세로 플로우 + 교차축 중앙 정렬 고정  
**Scale/Scope**: 단일 플로우차트 화면, 최대 50개 도형 기준

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- 코드 품질: PASS - 기존 `components/services/store` 책임 분리를 유지하며 lint/typecheck 게이트를 적용한다.
- 테스트 표준: PASS - 단위 + 통합 + E2E 테스트 조합으로 사용자 흐름 변경을 검증한다.
- UX 일관성: PASS - 편집/프레젠테이션에 동일 용어/동일 레이아웃 규칙을 적용한다.
- 성능 예산: PASS - p95 300ms 목표와 측정 구간/반복 횟수를 명시한다.
- 주석/네이밍/구조: PASS - 한글 주석 원칙과 네이밍 규칙, 기능 중심 구조를 유지한다.

**Post-Design Re-check (Phase 1)**

- 코드 품질: PASS - 레이아웃 계산 로직을 서비스 계층으로 한정하고 컴포넌트는 렌더 역할로 유지한다.
- 테스트 표준: PASS - 수동 배치 금지, 절대 위치 금지, 연결선 행 렌더링 규칙을 각각 검증 대상으로 분리했다.
- UX 일관성: PASS - 모드별 예외 없는 공통 레이아웃 정책을 계약/퀵스타트에 명시했다.
- 성능 예산: PASS - 입력 규모(50개), 10회 반복, p95 산출 방식을 `research.md`와 `quickstart.md`에 정의했다.
- 주석/네이밍/구조: PASS - 기존 `src/features/flowchart/*` 및 `tests/*` 계층을 변경 없이 활용한다.

## Project Structure

### Documentation (this feature)

```text
D:/workspace/flowchart-app/specs/001-enforce-flex-center-layout/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── flowchart-flex-layout.openapi.yaml
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

**Structure Decision**: 단일 웹앱 구조를 유지한다. 플로우차트 레이아웃 규칙은 `src/features/flowchart/services` 중심으로 구현하고, 뷰 반영은 `components`에서 처리한다. 테스트는 기존 `tests/unit`, `tests/integration`, `tests/integration/*.e2e.ts` 체계를 따른다.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

헌장 위반 항목 없음.

## Quality Gate Evidence

- lint: PASS (2026-02-16, `npm run lint`)
- typecheck: PASS (2026-02-16, `npm run typecheck`)
- test:unit: PASS (2026-02-16, `npm run test:unit`, 25 files/49 tests)
- test:integration: PASS (2026-02-16, `npm run test:integration`, 29 files/39 tests)
- test:e2e: PASS (2026-02-16, `npm run test:e2e`, 14 tests)

## Naming and Structure Check

- CCR-002: `PascalCase`, `camelCase`, `UPPER_SNAKE_CASE`, `kebab-case` 네이밍 규칙 준수 점검 완료.
- CCR-003: `src/features/flowchart/{components,models,services,store}` 기능 중심 구조 유지 확인.

