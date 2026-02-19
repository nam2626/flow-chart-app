# Implementation Plan: 단계형 플로우차트 보강

**Branch**: `001-fix-export-arrow-layout` | **Date**: 2026-02-16 | **Spec**: `D:\workspace\flowchart-app\specs\001-fix-export-arrow-layout\spec.md`
**Input**: Feature specification from `D:\workspace\flowchart-app\specs\001-fix-export-arrow-layout\spec.md`

## Summary

단계별 텍스트 필수 입력, 세로 배치, 인접 단계 화살표 자동 연결, 캔버스 가로폭(300~400px) 사용자
입력 제한, 내보내기 실패 복구를 동시에 만족하는 플로우차트 편집 경험을 완성한다.
기존 React 단일 웹 앱 구조를 유지하며, 상태 관리는 zustand + localStorage 지속성을 사용한다.

## Technical Context

**Language/Version**: TypeScript 5.x, React 18.x  
**Primary Dependencies**: React, Zustand, Vite, SVG 기반 렌더링 유틸  
**Storage**: 브라우저 localStorage (클라이언트 상태 지속성)  
**Testing**: Vitest(단위/통합), Playwright(E2E)  
**Target Platform**: 최신 데스크톱 브라우저(Chrome, Edge)  
**Project Type**: single web application  
**Performance Goals**: 50단계 기준 편집 반영 p95 300ms 이하, 폭 변경 반영 p95 300ms 이하, 내보내기 시작 5초 이내  
**Constraints**: 캔버스 폭 300~400px 강제, 투명 배경 유지, 단계 텍스트 미입력 시 완료 동작 차단  
**Scale/Scope**: 단일 사용자 세션, 차트당 최대 50단계 편집/내보내기

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Phase 0 Gate

- 코드 품질: PASS - `npm run lint`, `npm run typecheck`를 품질 게이트로 사용.
- 테스트 표준: PASS - Vitest 단위/통합 + Playwright E2E 전략 포함.
- UX 일관성: PASS - 공통 용어/오류 문구/연결 상태 피드백 규칙 유지.
- 성능 예산: PASS - p95 반응, 렌더링, 내보내기 시작 시간 목표 정의.
- 주석/네이밍/구조: PASS - 한글 주석, 네이밍 규칙, 단순 폴더 구조 준수.

### Post-Phase 1 Re-check

- 코드 품질: PASS - 모듈 경계와 검증 기준이 설계 문서에 반영됨.
- 테스트 표준: PASS - 엔터티/서비스/사용자 흐름 기준 테스트 지점 정의됨.
- UX 일관성: PASS - 사용자 메시지와 상호작용 규칙을 quickstart 시나리오에 고정함.
- 성능 예산: PASS - 측정 기준(입력 규모, 측정 시점, 성공 임계치) 명시됨.
- 주석/네이밍/구조: PASS - 파일 경로/명명 규칙/주석 원칙을 설계 산출물에 반영함.
- 구조 점검 기록: PASS - `src/features/flowchart/*`, `src/shared/utils/*` 중심 단순 계층 유지 확인.

## Project Structure

### Documentation (this feature)

```text
D:/workspace/flowchart-app/specs/001-fix-export-arrow-layout/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── flowchart-api.openapi.yaml
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

**Structure Decision**: 단일 웹 애플리케이션 구조를 유지하고, 변경 범위를
`src/features/flowchart` 중심으로 제한한다. 공통 유틸은 `src/shared/utils`에 둔다.

## Phase 0: Outline & Research

- 리서치 과제 1: zustand + localStorage 지속 상태의 버전 관리/마이그레이션 전략
- 리서치 과제 2: 세로 자동 레이아웃에서 화살표 재연결 안정성 패턴
- 리서치 과제 3: SVG/Canvas 내보내기 실패 복구 및 사용자 피드백 패턴
- 리서치 과제 4: 50단계 규모에서 렌더링 성능 측정 기준 및 회귀 방지

## Phase 1: Design & Contracts

- 데이터 모델: Flowchart, FlowStep, StepConnection, ExportJob 엔터티 상세화
- 계약 정의: 차트 저장/불러오기/내보내기/유효성 검사용 API 계약(OpenAPI) 정리
- 검증 시나리오: quickstart에 P1/P2/P3 독립 검증 흐름 정의
- 에이전트 컨텍스트: codex 대상 기술 스택 갱신 스크립트 실행

## Phase 2: Planning Readiness

- 다음 단계(`/speckit.tasks`)에서 사용자 스토리 우선순위(P1→P3) 기반으로 작업 분해
- 테스트 작업을 구현 작업보다 선행하도록 배치
- 비기능 요구(성능/UX 일관성)를 각 스토리에 매핑

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| 없음 | N/A | N/A |
