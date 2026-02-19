# Implementation Plan: 간단 웹 플로우차트 작성기

**Branch**: `001-flowchart-step-guide` | **Date**: 2026-02-16 | **Spec**: `D:/workspace/flowchart-app/specs/001-flowchart-step-guide/spec.md`
**Input**: Feature specification from `/specs/001-flowchart-step-guide/spec.md`

## Summary

사각형/타원 도형 기반 플로우차트를 웹에서 작성하고, 단축키로 다음 단계를 진행하면서
현재 단계를 outglow로 강조한다. React 기반 단일 웹 앱으로 구현하며 상태는 Zustand와
Zustand persist(localStorage)로 유지한다. 다이어그램은 JSON/SVG 내보내기를 지원하고,
JSON 불러오기는 기존 캔버스 병합과 충돌 해결(기본값: 가져온 파일 우선)을 제공한다.

## Technical Context

**Language/Version**: TypeScript 5.x, React 18  
**Primary Dependencies**: React, React DOM, Zustand, Zustand Persist Middleware  
**Storage**: Browser localStorage, JSON file import/export, SVG export  
**Testing**: Vitest, React Testing Library, Playwright (E2E)  
**Target Platform**: Modern desktop browsers (Chrome/Edge/Safari 최신 2개 메이저 버전)
**Project Type**: single-page web application  
**Performance Goals**: 단계 전환 0.3초 이내, 5MB 이하 파일 불러오기 3초 이내, 200개 노드 체감 지연 없음  
**Constraints**: 캔버스 가로폭 300~4000px, 투명 배경 유지, 단축키 기본 N/사용자 변경 가능, 파일 상한 5MB  
**Scale/Scope**: 단일 사용자 로컬 편집, 최대 200 노드, 서버 동기화/협업 제외

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Research Gate Review

- 코드 품질: PASS
  - 린트/타입체크/리뷰 게이트를 tasks 단계에 필수 작업으로 배치 예정.
- 테스트 표준: PASS
  - 단위(Vitest) + 사용자 흐름(E2E Playwright) 전략을 본 계획에 명시.
- UX 일관성: PASS
  - 단계 안내 문구, outglow 규칙, 오류 문구를 공통 규칙으로 정의.
- 성능 예산: PASS
  - 0.3초, 3초, 200노드 목표를 측정 가능한 수치로 확정.
- 주석/네이밍/구조: PASS
  - 한글 주석, 네이밍 규칙, 기능 중심 단순 폴더 구조를 구조 결정에 반영.

### Post-Design Gate Review

- 코드 품질: PASS (데이터 모델/계약/퀵스타트에 검증 경로 포함)
- 테스트 표준: PASS (unit/integration/E2E 범위와 검증 시나리오 정합)
- UX 일관성: PASS (단계 안내/강조/오류 처리의 단일 용어 유지)
- 성능 예산: PASS (계약과 퀵스타트에 성능 검증 시나리오 명시)
- 주석/네이밍/구조: PASS (파일 구조와 구현 규칙 상충 없음)

## Project Structure

### Documentation (this feature)

```text
D:/workspace/flowchart-app/specs/001-flowchart-step-guide/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── openapi.yaml
└── tasks.md
```

### Source Code (repository root)

```text
D:/workspace/flowchart-app/
├── src/
│   ├── app/
│   │   └── app-shell.tsx
│   ├── features/
│   │   └── flowchart/
│   │       ├── components/
│   │       ├── store/
│   │       ├── models/
│   │       ├── services/
│   │       └── shortcuts/
│   └── shared/
│       ├── ui/
│       └── utils/
└── tests/
    ├── unit/
    └── integration/
```

**Structure Decision**: React 단일 웹 앱 구조를 선택한다. 기능 중심(`features/flowchart`)으로
도메인 코드를 모으고, 공통 모듈은 `shared`에 제한한다. 폴더 깊이는 2~3단계로 유지해
헌장상의 단순 구조 원칙을 충족한다.

## Phase 0: Outline & Research

- Research task: React에서 노드 렌더링과 outglow 강조를 안정적으로 구현하는 방법
- Research task: Zustand + persist(localStorage) 상태 설계 및 파일 import 병합 패턴
- Research task: 단축키 충돌 회피/재매핑 UX 패턴
- Research task: JSON/SVG export와 5MB import 제한 검증 방식
- Research task: Vitest/RTL/Playwright 조합의 테스트 분리 기준

산출물: `D:/workspace/flowchart-app/specs/001-flowchart-step-guide/research.md`

## Phase 1: Design & Contracts

- 데이터 모델 정의: 다이어그램, 노드, 진행 상태, 단축키 설정, 병합 충돌 항목
- 계약 정의: 다이어그램 생성/수정, 단계 진행, import/export, 충돌 해결 API 계약
- 검증 가이드: 로컬 실행, 테스트 실행, 성능/경계값 시나리오
- 에이전트 컨텍스트 업데이트: codex 대상으로 신규 스택 반영

산출물:
- `D:/workspace/flowchart-app/specs/001-flowchart-step-guide/data-model.md`
- `D:/workspace/flowchart-app/specs/001-flowchart-step-guide/contracts/openapi.yaml`
- `D:/workspace/flowchart-app/specs/001-flowchart-step-guide/quickstart.md`

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| 없음 | 해당 없음 | 해당 없음 |
