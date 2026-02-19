# Implementation Plan: 도형 관리 및 프레젠테이션 모드

**Branch**: `001-add-reset-delete-presentation` | **Date**: 2026-02-16 | **Spec**: `D:\workspace\flowchart-app\specs\001-add-reset-delete-presentation\spec.md`
**Input**: Feature specification from `D:\workspace\flowchart-app\specs\001-add-reset-delete-presentation\spec.md`

## Summary

도형 단일 삭제, 전체 초기화(도형/연결/프레젠테이션 상태/캔버스 설정 기본값 복원), 프레젠테이션
모드(시작/이동/종료)를 추가한다. 프레젠테이션 중 삭제/초기화 요청은 즉시 반영하며,
삭제 후 단계 순서는 자동으로 1..N 재정렬한다.

## Technical Context

**Language/Version**: TypeScript 5.x, React 18.x  
**Primary Dependencies**: React, Zustand, Vite, Vitest, Playwright  
**Storage**: 브라우저 localStorage (zustand persist)  
**Testing**: Vitest(단위/통합), Playwright(E2E)  
**Target Platform**: 최신 데스크톱 브라우저(Chrome, Edge)  
**Project Type**: single web application  
**Performance Goals**: 삭제/초기화/프레젠테이션 단계 전환 반영 p95 300ms 이하  
**Constraints**: 프레젠테이션 중 삭제/초기화 즉시 반영, 삭제 후 순서 1..N 재정렬, 전체 초기화 시 캔버스 설정 기본값 복원  
**Scale/Scope**: 차트당 최대 50단계, 단일 사용자 편집 세션

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Phase 0 Gate

- 코드 품질: PASS - `npm run lint`, `npm run typecheck`를 필수 게이트로 사용.
- 테스트 표준: PASS - 사용자 스토리별 단위/통합 테스트와 핵심 흐름 E2E 포함.
- UX 일관성: PASS - 삭제/초기화/프레젠테이션 제어 용어 및 피드백 규칙 고정.
- 성능 예산: PASS - 핵심 상호작용 p95 300ms 목표와 측정 기준 정의.
- 주석/네이밍/구조: PASS - 한글 주석, 네이밍 컨벤션, 단순 계층 구조 준수.

### Post-Phase 1 Re-check

- 코드 품질: PASS - 모델/서비스/컴포넌트 책임 경계가 문서화됨.
- 테스트 표준: PASS - 삭제/초기화/프레젠테이션 각각 독립 검증 시나리오 확보.
- UX 일관성: PASS - 오류 문구/확인 동작/강조 규칙을 quickstart에 고정.
- 성능 예산: PASS - 50단계 기준 측정 지점과 통과 임계치 명시.
- 주석/네이밍/구조: PASS - 변경 대상 경로와 주석 정책을 설계 산출물에 반영.

## Project Structure

### Documentation (this feature)

```text
D:/workspace/flowchart-app/specs/001-add-reset-delete-presentation/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── presentation-controls.openapi.yaml
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

**Structure Decision**: 단일 웹 앱 구조를 유지하고, 구현 범위를 `src/features/flowchart`로 제한한다.
공통 유틸은 `src/shared/utils`에 둔다.

## Phase 0: Outline & Research

- 리서치 과제 1: 프레젠테이션 중 실시간 삭제/초기화 반영 시 상태 일관성 보장 패턴
- 리서치 과제 2: 삭제 후 단계 자동 재정렬과 활성 단계 재계산 규칙
- 리서치 과제 3: 전체 초기화 시 기본 캔버스 설정 복원 UX/확인 대화 패턴
- 리서치 과제 4: 단계 전환 p95 300ms 측정 및 회귀 방지 전략

## Phase 1: Design & Contracts

- 데이터 모델: PresentationSession, FlowStep, ChartStateSnapshot 상태와 전이 정의
- 계약 정의: 삭제/초기화/프레젠테이션 시작·이동·종료 계약(OpenAPI) 정의
- 검증 시나리오: quickstart에 P1/P2/P3 독립 시나리오 작성
- 에이전트 컨텍스트: codex 대상 기술 스택 갱신 스크립트 실행

## Phase 2: Planning Readiness

- 다음 단계(`/speckit.tasks`)에서 P1→P2→P3 우선순위로 태스크 분해
- 테스트를 구현보다 선행 배치(TDD)
- 비기능 요구(성능/UX 일관성)를 스토리별 태스크에 매핑

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| 없음 | N/A | N/A |
