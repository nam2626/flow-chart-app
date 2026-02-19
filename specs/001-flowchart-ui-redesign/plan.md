# Implementation Plan: Flowchart UI Redesign

**Branch**: `001-flowchart-ui-redesign` | **Date**: 2026-02-17 | **Spec**: `D:\workspace\flowchart-app\specs\001-flowchart-ui-redesign\spec.md`  
**Input**: Feature specification from `D:\workspace\flowchart-app\specs\001-flowchart-ui-redesign\spec.md`

## Summary

편집 모드 UI를 레퍼런스 시안 구조(상단 툴바/좌측 패널/중앙 캔버스/우측 속성 패널)에 맞게 리디자인하되, 기능 동작 및 데이터 결과는 변경하지 않는다.  
프레젠테이션 모드의 시각 레이아웃은 변경하지 않으며, 수동 회귀 체크리스트를 기준으로 기능 동등성을 검증한다.  
구현은 기존 `flowchart` 기능 모듈 내 컴포넌트 스타일/레이아웃 재구성 중심으로 수행하고, 성능은 기준 빌드 대비 악화 없음(상대 비교)으로 관리한다.

## Technical Context

**Language/Version**: TypeScript 5.x, React 18  
**Primary Dependencies**: React, Zustand, Vite  
**Storage**: 브라우저 로컬 저장소 및 파일 내보내기(JSON/SVG/PNG), 서버 저장소 없음  
**Testing**: Vitest(unit/integration), Playwright(E2E), 수동 회귀 체크리스트 병행  
**Target Platform**: Desktop-class browser (Chrome/Edge 최신)  
**Project Type**: Single web application (frontend-only)  
**Performance Goals**: 편집 화면 초기 렌더/패널 상호작용 p95가 기준 빌드 대비 악화 없음  
**Constraints**: 편집 모드만 리디자인, 프레젠테이션 모드 시각 레이아웃 불변, 기능/데이터 동작 불변  
**Scale/Scope**: 단일 화면 편집 레이아웃 리디자인 + 핵심 상호작용(내보내기/폭 조절/단계 선택) 보존

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Design Gate

- 코드 품질: PASS - 기존 `lint`, `typecheck` 스크립트 기준 유지, 변경 파일에 동일 기준 적용.
- 테스트 표준: PASS - 수동 검증 요구가 있으나 헌장 준수를 위해 단위+통합(E2E 필요 시 포함) 테스트도 유지/보강.
- UX 일관성: PASS - 기존 용어/패턴을 유지하고 시안 반영은 구조/간격/위계 기준으로 제한.
- 성능 예산: PASS - 상대 비교 성능 기준(기준 빌드 대비 악화 없음) 및 측정 방식 문서화.
- 주석/네이밍/구조: PASS - 기존 기능 중심 구조 유지, 신규 주석은 한국어로 작성.

### Post-Design Gate (After Phase 1)

- 코드 품질: PASS - 변경 범위를 `src/features/flowchart/components`와 관련 스타일 계산 로직으로 한정.
- 테스트 표준: PASS - 단위/통합 테스트 보강 포인트와 수동 회귀 체크리스트를 모두 설계에 포함.
- UX 일관성: PASS - 좌/중/우 패널 역할과 기존 컨트롤 동작 유지 전략 명시.
- 성능 예산: PASS - 렌더/상호작용 상대 비교 측정 시나리오를 `quickstart.md`에 명시.
- 주석/네이밍/구조: PASS - 기존 네이밍 체계와 폴더 구조를 그대로 유지하는 설계로 확정.

## Project Structure

### Documentation (this feature)

```text
specs/001-flowchart-ui-redesign/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── flowchart-ui-redesign.openapi.yaml
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── app/
│   └── app-shell.tsx
├── features/
│   └── flowchart/
│       ├── components/
│       ├── services/
│       ├── store/
│       └── models/
└── shared/
    ├── ui/
    └── utils/

tests/
├── unit/
├── integration/
└── helpers/
```

**Structure Decision**: 단일 프론트엔드 구조를 유지하고, 변경은 `src/features/flowchart/components` 중심으로 제한한다.

## Phase 0: Research

- 레이아웃 리디자인 범위를 편집 모드로 제한하는 적용 원칙 확정
- 시각 일치 기준을 픽셀 강제가 아닌 구조/위계/간격 기준으로 확정
- 성능 측정 기준(상대 비교)과 검증 시나리오 정의
- 수동 회귀 체크리스트와 자동 테스트 병행 전략 확정(헌장 준수)

## Phase 1: Design & Contracts

- 데이터 모델: UI 레이아웃 섹션/시각 규칙/기능 동등성 체크리스트 엔터티 정리
- 계약 문서: 내보내기/편집 상호작용에 대한 로컬 계약(OpenAPI 문서 형태) 정리
- 실행 가이드: 개발/검증 순서 및 성능/회귀 검증 절차 정리

## Phase 2: Task Planning Approach

- 작업은 사용자 스토리 우선순위(P1→P2→P3) 기준으로 분해
- 각 스토리마다 기능 보존 검증 태스크를 포함
- 수동 회귀 체크리스트 태스크와 자동 테스트 태스크를 병행 배치

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| 없음 | N/A | N/A |
