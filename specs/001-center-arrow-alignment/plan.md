# Implementation Plan: 화살표 수평 중앙 정렬

**Branch**: `001-center-arrow-alignment` | **Date**: 2026-02-16 | **Spec**: `D:\workspace\flowchart-app\specs\001-center-arrow-alignment\spec.md`
**Input**: Feature specification from `D:\workspace\flowchart-app\specs\001-center-arrow-alignment\spec.md`

## Summary

편집 화면과 프레젠테이션 화면에서 화살표의 x축 정렬 기준을 도형 수평 중심으로 통일하고, y축은 기존 경계 시작/종료 규칙을 유지한다. 정렬 판정은 0px 오차 완전 일치 기준을 적용하며, 성능 예산(p95 300ms) 내에서 재정렬을 보장한다.

## Technical Context

**Language/Version**: TypeScript 5.7.x  
**Primary Dependencies**: React 18, React DOM 18, Zustand 4, Vite 6  
**Storage**: Browser localStorage (기존 앱 상태 유지, 본 기능은 신규 저장소 의존 없음)  
**Testing**: Vitest (unit/integration), Testing Library, Playwright (E2E)  
**Target Platform**: Modern desktop browsers (Chromium-family baseline)  
**Project Type**: Single-page web application  
**Performance Goals**: 화살표 재정렬/표시 p95 <= 300ms, 중앙 정렬 판정 오차 0px  
**Constraints**: x축은 도형 중심 완전 일치, y축은 기존 경계 규칙 유지, 화면 간 규칙 동일성 유지  
**Scale/Scope**: 단일 플로우차트 화면, 최대 50개 도형, 편집/프레젠테이션 화살표 정렬 로직

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- 코드 품질: PASS - 기존 서비스 분리 구조 내 변경, lint/typecheck 게이트 포함.
- 테스트 표준: PASS - 단위/통합/E2E 모두 화살표 정렬 시나리오 포함.
- UX 일관성: PASS - 편집/프레젠테이션 동일 정렬 규칙을 명시적으로 강제.
- 성능 예산: PASS - PRF-001/002/003/004를 p95 및 0px 기준으로 측정.
- 주석/네이밍/구조: PASS - 한글 근거 주석과 기존 네이밍/기능 중심 구조 유지.

**Post-Design Re-check (Phase 1)**

- 코드 품질: PASS - 정렬 로직은 서비스 단위로 캡슐화하고 UI는 소비만 수행.
- 테스트 표준: PASS - 경계 규칙 + 중앙 정렬 + 화면 간 일관성 테스트 포인트를 문서화.
- UX 일관성: PASS - 동일 용어(수평 중앙 정렬, 경계 규칙)로 문서/테스트를 통일.
- 성능 예산: PASS - 측정 구간(정렬 계산 시작~렌더 완료)과 반복 입력 정의.
- 주석/네이밍/구조: PASS - 신규 파일도 기존 계층(`components/services/models/tests`)에 배치.

## Project Structure

### Documentation (this feature)

```text
D:/workspace/flowchart-app/specs/001-center-arrow-alignment/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── connector-alignment.openapi.yaml
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

**Structure Decision**: 단일 웹 앱 구조를 유지하고 화살표 정렬 관련 변경은 `src/features/flowchart/services`와 `components`에 집중한다. 검증은 `tests/unit`, `tests/integration`, `tests/integration/*.e2e.ts`를 유지한다.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

헌장 위반 항목 없음.

## Final CCR-003 Structure Check

- 점검 결과: 변경 파일은 기존 기능 중심 계층(`models/services/components/store/tests`) 내에만 배치됨.
- 판단: CCR-003(기능 중심 단순 계층 유지) 충족.
