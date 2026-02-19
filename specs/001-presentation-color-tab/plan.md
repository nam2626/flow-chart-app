# Implementation Plan: 도형 색상 커스터마이징 및 새탭 프레젠테이션 정렬 개선

**Branch**: `001-presentation-color-tab` | **Date**: 2026-02-16 | **Spec**: `D:/workspace/flowchart-app/specs/001-presentation-color-tab/spec.md`
**Input**: Feature specification from `D:/workspace/flowchart-app/specs/001-presentation-color-tab/spec.md`

## Summary

도형별 채움색/테두리색 커스터마이징을 추가하고, 프레젠테이션 시작 시 새탭 전용 화면으로 전환한다.
전용 화면은 도형 흐름을 가로 중앙 정렬하고, 활성 도형 box-shadow는 기존 대비 opacity 2배(최대 1.0)로 강조한다.
화살표는 순차 도형의 정확한 중심점 간 연결 경로를 사용한다. 새탭 차단 시 프레젠테이션 시작을 중단하고 명시적 오류를 표시한다.

## Technical Context

**Language/Version**: TypeScript 5.x, React 18.x  
**Primary Dependencies**: React, Zustand, Vite, Vitest, Playwright  
**Storage**: 브라우저 localStorage (zustand persist)  
**Testing**: Vitest(단위/통합), Playwright(E2E)  
**Target Platform**: 최신 데스크톱 브라우저 (Chrome, Edge)  
**Project Type**: single web application  
**Performance Goals**: 새탭 프레젠테이션 전환 p95 300ms 이하, 50개 도형 중심 화살표 재계산 p95 300ms 이하  
**Constraints**: 도형별 색상은 채움색/테두리색만 허용, 새탭 차단 시 시작 중단, box-shadow opacity 2배(상한 1.0), 중심점-중심점 화살표 연결  
**Scale/Scope**: 차트당 최대 50단계, 단일 사용자 세션, 단일 화면 앱 범위

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Phase 0 Gate

- 코드 품질: PASS - `npm run lint`, `npm run typecheck`를 필수 게이트로 적용.
- 테스트 표준: PASS - 스토리별 단위 테스트와 핵심 흐름 통합/E2E 테스트를 포함.
- UX 일관성: PASS - 기존 툴바/배너/오류 피드백 패턴을 재사용하고 새탭 실패 문구를 공통 규칙에 맞춤.
- 성능 예산: PASS - p95 300ms/300ms 목표와 50단계 입력 기준 측정 시나리오를 명시.
- 주석/네이밍/구조: PASS - 한글 주석, 네이밍 규칙, 기능 중심 폴더 구조 유지.

### Post-Phase 1 Re-check

- 코드 품질: PASS - 색상/프레젠테이션/화살표 책임을 모델-서비스-컴포넌트로 분리.
- 테스트 표준: PASS - 색상 지속성, 새탭 전환 실패 처리, 중심점 화살표를 독립 검증 가능하도록 설계.
- UX 일관성: PASS - 프레젠테이션 시작/실패 피드백 문구를 단일 규칙으로 고정.
- 성능 예산: PASS - 새탭 전환 및 중심 계산 측정 지점/입력 크기/반복 횟수 정의.
- 주석/네이밍/구조: PASS - 새 파일 네이밍 및 주석 원칙을 설계 산출물에 반영.

## Project Structure

### Documentation (this feature)

```text
D:/workspace/flowchart-app/specs/001-presentation-color-tab/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── presentation-color-tab.openapi.yaml
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
│       └── store/
└── shared/

D:/workspace/flowchart-app/tests/
├── integration/
└── unit/
```

**Structure Decision**: 단일 웹 앱 구조를 유지하고 구현 범위를 `src/features/flowchart`로 제한한다. 상태/계약은 `models`, 계산/변환은 `services`, UI는 `components`로 분리한다.

## Phase 0: Outline & Research

- 리서치 과제 1: 도형별 색상(채움/테두리) 커스터마이징의 상태 저장/복원 패턴
- 리서치 과제 2: 새탭 프레젠테이션 전환 성공/차단 실패 처리 UX 패턴
- 리서치 과제 3: 중심점-중심점 화살표 계산 및 렌더링 정합성 패턴
- 리서치 과제 4: 활성 도형 box-shadow opacity 2배 적용 시 가시성/대비 기준
- 리서치 과제 5: 50단계 기준 성능 측정 절차(p95) 재현 방법

## Phase 1: Design & Contracts

- 데이터 모델: ShapeStyleProfile, PresentationViewSession, CenteredConnectorPath 엔터티/검증 규칙 정의
- 계약 정의: 색상 업데이트, 프레젠테이션 새탭 시작/실패, 중심 연결 렌더, 성능 검증 계약(OpenAPI) 명세
- 검증 시나리오: quickstart에 P1/P2/P3 독립 시나리오 + 실패/경계 시나리오 명시
- 에이전트 컨텍스트: codex 대상 스택/패턴 컨텍스트 갱신 스크립트 실행

## Phase 2: Planning Readiness

- 다음 단계(`/speckit.tasks`)에서 P1(도형 색상) -> P2(새탭 중앙 정렬) -> P3(강조/중심 화살표) 우선순위로 태스크 분해
- 테스트를 구현보다 먼저 배치(TDD)
- 비기능 요구(PRF-001/002/003)를 각 스토리 태스크에 매핑

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| 없음 | N/A | N/A |
