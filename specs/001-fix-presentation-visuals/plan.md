# Implementation Plan: 다중 도형 스타일 및 프레젠테이션 가시성 개선

**Branch**: `001-fix-presentation-visuals` | **Date**: 2026-02-16 | **Spec**: `D:\workspace\flowchart-app\specs\001-fix-presentation-visuals\spec.md`
**Input**: Feature specification from `D:\workspace\flowchart-app\specs\001-fix-presentation-visuals\spec.md`

## Summary

모든 도형에 독립 색상(배경/테두리) 지정 및 복원을 보장하고, 프레젠테이션 모드에서 경계 기준 화살표 가시성을 복구한다. 또한 프레젠테이션 텍스트 크기(1.3em)와 활성 도형 강조 그림자(blur/spread 2배, opacity 유지)를 적용해 발표 가독성을 높인다.

## Technical Context

**Language/Version**: TypeScript 5.7.x  
**Primary Dependencies**: React 18, React DOM 18, Zustand 4, Vite 6  
**Storage**: Browser localStorage (도형 스타일 최근 상태 저장/복원)  
**Testing**: Vitest (unit/integration), Testing Library, Playwright (E2E)  
**Target Platform**: Modern desktop browsers (Chromium-family baseline)  
**Project Type**: Single-page web application  
**Performance Goals**: 화살표 표시 p95 <= 300ms, 50개 도형 스타일 반영 p95 <= 300ms  
**Constraints**: 경계 기준 화살표 정합성 유지, 도형 고유 ID 기반 색상 복원, lint/typecheck/test 게이트 통과  
**Scale/Scope**: 단일 플로우차트 화면, 최대 50개 도형, 사용자 스토리 3개(P1~P3)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- 코드 품질: PASS - ESLint/TypeScript 타입체크/중복 최소화 원칙을 작업 범위에 포함.
- 테스트 표준: PASS - 단위 + 통합 + E2E 시나리오를 사용자 스토리별로 설계.
- UX 일관성: PASS - 기존 flowchart UI 용어/버튼/피드백 규칙 유지, 신규 패턴 도입 없음.
- 성능 예산: PASS - PRF-001/002를 p95 300ms 기준으로 측정 계획 포함.
- 주석/네이밍/구조: PASS - 한글 주석 원칙, 네이밍 규칙, 기능 중심 폴더 구조 유지.

**Post-Design Re-check (Phase 1)**

- 코드 품질: PASS - 서비스/모델 분리 및 기존 `src/features/flowchart` 구조 준수.
- 테스트 표준: PASS - 계약/엔티티/흐름 검증용 테스트 지점이 `quickstart.md`와 계약 문서에 반영됨.
- UX 일관성: PASS - 편집/프레젠테이션 공통 색상 규칙과 강조 규칙을 단일 용어로 통일.
- 성능 예산: PASS - 측정 구간(프레젠테이션 시작~화살표 표시, 스타일 업데이트 반영)을 명시.
- 주석/네이밍/구조: PASS - 기존 규칙 위반 필요 없음.

## Project Structure

### Documentation (this feature)

```text
D:/workspace/flowchart-app/specs/001-fix-presentation-visuals/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── flowchart-presentation.openapi.yaml
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

**Structure Decision**: 단일 웹 앱 구조를 유지하고 `src/features/flowchart` 하위 컴포넌트/서비스/모델에 변경을 집중한다. 테스트는 `tests/unit`, `tests/integration`, `tests` 내 E2E 파일 배치를 유지한다.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

현재 헌장 위반이 없어 추가 정당화 항목 없음.
