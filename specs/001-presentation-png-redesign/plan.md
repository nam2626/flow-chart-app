# Implementation Plan: 프레젠테이션 컴포넌트 전환 및 PNG 내보내기

**Branch**: `001-presentation-png-redesign` | **Date**: 2026-02-16 | **Spec**: `D:/workspace/flowchart-app/specs/001-presentation-png-redesign/spec.md`
**Input**: Feature specification from `D:/workspace/flowchart-app/specs/001-presentation-png-redesign/spec.md`

## Summary

프레젠테이션 시작 시 편집 화면에서 분리된 전용 컴포넌트로 전환하고, 해당 화면에서는 단계 번호
텍스트를 숨긴다. 화살표는 도형 경계 기준으로 시작하고 대상 도형 경계 4px 앞에서 멈추도록
렌더링 규칙을 재정의한다. 도형/화살표/테두리 색상 체계를 리디자인하고, PNG 내보내기를
프레젠테이션 전용 화면 기준으로 제공한다.

## Technical Context

**Language/Version**: TypeScript 5.x, React 18.x  
**Primary Dependencies**: React, Zustand, Vite, Vitest, Playwright  
**Storage**: 브라우저 localStorage (zustand persist)  
**Testing**: Vitest(단위/통합), Playwright(E2E)  
**Target Platform**: 최신 데스크톱 브라우저 (Chrome, Edge)  
**Project Type**: single web application  
**Performance Goals**: 프레젠테이션 전환/화살표 경계 계산 p95 300ms 이하, PNG 내보내기 피드백 p95 700ms 이하  
**Constraints**: 프레젠테이션 전용 뷰 강제, 단계 번호 숨김, 화살표 종료점 4px 오프셋, 캔버스 폭 300~400px 유지  
**Scale/Scope**: 차트당 최대 50단계, 단일 사용자 세션, 단일 화면 앱 범위

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Phase 0 Gate

- 코드 품질: PASS - `npm run lint`, `npm run typecheck`를 필수 게이트로 적용.
- 테스트 표준: PASS - 스토리별 단위/통합 테스트 + 핵심 흐름 E2E를 포함.
- UX 일관성: PASS - 프레젠테이션 전용 컴포넌트 용어/피드백 규칙을 고정.
- 성능 예산: PASS - p95 300ms/700ms 목표와 50단계 기준 측정을 문서화.
- 주석/네이밍/구조: PASS - 한글 주석, 네이밍 규칙, 기능 중심 단순 구조 준수.

### Post-Phase 1 Re-check

- 코드 품질: PASS - 프레젠테이션 컴포넌트 분리와 렌더링 책임 경계 명확화.
- 테스트 표준: PASS - 전환/화살표/PNG 각각 독립 검증 시나리오 확보.
- UX 일관성: PASS - 단계 번호 숨김 정책과 상태 문구를 단일 규칙으로 확정.
- 성능 예산: PASS - 50단계 전환/내보내기 측정 지점과 통과 임계치 반영.
- 주석/네이밍/구조: PASS - 변경 대상 경로와 네이밍/주석 원칙이 설계 산출물에 반영됨.

## Project Structure

### Documentation (this feature)

```text
D:/workspace/flowchart-app/specs/001-presentation-png-redesign/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── presentation-export.openapi.yaml
└── tasks.md
```

### Source Code (repository root)

```text
D:/workspace/flowchart-app/src/
├── app/
├── features/
│   └── flowchart/
│       ├── components/
│       ├── models/
│       ├── services/
│       ├── shortcuts/
│       └── store/
└── shared/
    └── utils/

D:/workspace/flowchart-app/tests/
├── integration/
└── unit/
```

**Structure Decision**: 단일 웹 앱 구조를 유지하고 구현 범위를 `src/features/flowchart`로 제한한다.
프레젠테이션 전용 컴포넌트는 동일 feature 하위에 추가하고, 내보내기 로직은 `services`에서 관리한다.

## Phase 0: Outline & Research

- 리서치 과제 1: 프레젠테이션 전용 컴포넌트 전환 시 상태 동기화 패턴
- 리서치 과제 2: 도형 경계 기반 화살표 시작/종료점(4px 오프셋) 계산 패턴
- 리서치 과제 3: 발표 모드 시각 리디자인(도형/테두리/화살표 색상) 접근성 기준
- 리서치 과제 4: SVG 기반 렌더를 PNG 파일로 안정적으로 내보내는 브라우저 패턴

## Phase 1: Design & Contracts

- 데이터 모델: PresentationViewState, ArrowRenderSegment, ExportJob 필드/검증 규칙 정의
- 계약 정의: 프레젠테이션 전환/렌더링 규칙/PNG 내보내기 계약(OpenAPI) 명세
- 검증 시나리오: quickstart에 P1/P2/P3 독립 시나리오 및 예외 흐름 명시
- 에이전트 컨텍스트: codex 대상 스택/설계 컨텍스트 갱신 스크립트 실행

## Phase 2: Planning Readiness

- 다음 단계(`/speckit.tasks`)에서 P1(전용 컴포넌트) -> P2(시각 리디자인) -> P3(PNG 내보내기)
  우선순위로 태스크를 분해
- 테스트를 구현보다 먼저 배치(TDD)
- 비기능 요구(전환/렌더링/내보내기 성능)를 스토리별 태스크에 매핑

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| 없음 | N/A | N/A |
