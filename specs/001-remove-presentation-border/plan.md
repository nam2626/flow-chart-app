# Implementation Plan: Remove Presentation Border

**Branch**: `001-remove-presentation-border` | **Date**: 2026-02-16 | **Spec**: `D:\workspace\flowchart-app\specs\001-remove-presentation-border\spec.md`
**Input**: Feature specification from `D:\workspace\flowchart-app\specs\001-remove-presentation-border\spec.md`

## Summary

프레젠테이션 모드에서 플로우차트 컨테이너 테두리를 제거하고, 모드 전환/단계 이동/빈 상태에서도 무테두리 정책이 일관되게 유지되도록 렌더링 규칙을 통합한다. 구현은 기존 플로우 렌더러(`FlowLayoutStack`)와 프레젠테이션 탭 HTML 렌더러에 동일한 borderless 규칙을 적용하고, 회귀 방지 테스트를 단위/통합/E2E에 추가하는 방식으로 진행한다.

## Technical Context

**Language/Version**: TypeScript 5.x, React 18.x  
**Primary Dependencies**: React, Zustand, Vite, Vitest, Playwright  
**Storage**: N/A (UI 렌더링 정책 변경, 영속 저장소 변경 없음)  
**Testing**: Vitest(unit/integration), Playwright(E2E)  
**Target Platform**: Modern desktop browsers (presentation mode + popup tab)  
**Project Type**: single web application  
**Performance Goals**: 프레젠테이션 모드 진입 p95 300ms 이하, 단계 이동 p95 150ms 이하, 렌더링 깜빡임 회귀 0건  
**Constraints**: 프레젠테이션 UX만 변경, 편집 모드 동작 회귀 금지, 기존 키보드/탭 프레젠테이션 흐름 유지  
**Scale/Scope**: flowchart feature 내부 컴포넌트/서비스/테스트 중심의 소규모 UI 정책 변경

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- 코드 품질: PASS - lint/typecheck 기준(`npm run lint`, `npm run typecheck`)과 변경 대상 모듈 경계가 정의됨.
- 테스트 표준: PASS - 단위 + 통합 + E2E 회귀 테스트를 모두 포함하는 전략 수립.
- UX 일관성: PASS - 프레젠테이션 모드와 새 탭 프레젠테이션 렌더링에 동일한 무테두리 정책 적용.
- 성능 예산: PASS - p95 300ms 유지, 단계 이동 시 시각 안정성 유지, 기존 성능 예산 측정 흐름 재사용.
- 주석/네이밍/구조: PASS - 기존 feature 중심 구조 유지, 네이밍 규칙 준수(`PascalCase/camelCase/UPPER_SNAKE_CASE/kebab-case`), 필요한 경우 한글 주석으로 이유 설명.

## Project Structure

### Documentation (this feature)

```text
D:/workspace/flowchart-app/specs/001-remove-presentation-border/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── presentation-border-removal.openapi.yaml
└── tasks.md
```

### Source Code (repository root)

```text
D:/workspace/flowchart-app/src/
├── features/
│   └── flowchart/
│       ├── components/
│       │   ├── flow-layout-stack.tsx
│       │   ├── presentation-mode.tsx
│       │   └── presentation-tab.tsx
│       ├── services/
│       │   └── presentation-tab-service.ts
│       └── models/
└── shared/

D:/workspace/flowchart-app/tests/
├── unit/
└── integration/
```

**Structure Decision**: 단일 웹앱 구조를 유지하고 `src/features/flowchart` 내부에서 컴포넌트/서비스 정책을 변경한다. 테스트는 `tests/unit`, `tests/integration` 및 기존 E2E 스위트에 추가한다.

## Phase 0: Research

### Research Tasks

- Task: Research presentation container style policy for consistent borderless rendering across in-app presentation and popup presentation tab.
- Task: Find best practices for React inline style policy centralization to avoid mode drift.
- Task: Find best practices for UI regression testing of visual policy changes with Vitest + Playwright.
- Task: Research window.open based presentation rendering sync pattern for style parity.

### Phase 0 Output

`D:\workspace\flowchart-app\specs\001-remove-presentation-border\research.md` 생성 완료 (미해결 리서치 이슈 없음).

## Phase 1: Design & Contracts

### Data Model Design

- PresentationContainerStylePolicy: 모드별 컨테이너 시각 규칙(특히 border visibility)
- PresentationRenderState: 모드 진입/단계 이동/빈 상태에서 style policy 적용 결과
- 기존 FlowNode/PresentationState는 변경 최소화, 컨테이너 렌더링 정책만 명시적으로 확장

### API/Contract Design

- 계약 산출물: `D:\workspace\flowchart-app\specs\001-remove-presentation-border\contracts\presentation-border-removal.openapi.yaml`
- 사용자 액션(프레젠테이션 진입/업데이트/종료)에 대응하는 렌더링 정책 contract를 OpenAPI 형태로 정의

### Quickstart/Test Design

- 산출물: `D:\workspace\flowchart-app\specs\001-remove-presentation-border\quickstart.md`
- 핵심 시나리오: 무테두리 진입, 반복 전환 안정성, 단계 이동 회귀 없음, 빈 상태 무테두리

### Agent Context Update

- 실행 커맨드: `.specify/scripts/powershell/update-agent-context.ps1 -AgentType codex`
- 결과: codex 컨텍스트 파일 자동 갱신 (신규 기술 추가 시에만 반영)

## Post-Design Constitution Check

- 코드 품질: PASS - 변경 지점이 제한적이며 타입/린트 검증 가능.
- 테스트 표준: PASS - 단위/통합/E2E 각각의 검증 포인트가 설계 문서에 반영됨.
- UX 일관성: PASS - 인앱/팝업 프레젠테이션 렌더링 모두 동일한 borderless 정책으로 통합.
- 성능 예산: PASS - 새로운 연산/네트워크 없음, 기존 렌더 경로 유지로 p95 목표 준수 가능.
- 주석/네이밍/구조: PASS - 기존 구조를 유지하며 신규 정책 모델은 명확한 네이밍으로 추가.

## Complexity Tracking

해당 없음 (Constitution 위반 없음)

## Validation Log

- lint: `npm run lint` 통과 (ESLintIgnoreWarning only)
- typecheck: `npm run typecheck` 통과
- unit: `npm run test:unit` 통과 (51 passed)
- integration: `npm run test:integration` 통과 (42 passed)
- e2e: `npm run test:e2e` 통과 (15 passed)

## CCR Compliance Notes

- CCR-001: 프레젠테이션 컨테이너 무테두리 정책 적용 이유를 한글 주석으로 명시했다.
- CCR-002: 네이밍 규칙은 ESLint `@typescript-eslint/naming-convention` 규칙으로 점검했다.
- CCR-003: 변경은 `src/features/flowchart/*`와 `tests/*`에 한정해 기능 중심 단순 구조를 유지했다.

