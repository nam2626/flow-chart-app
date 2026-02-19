# Implementation Plan: 프레젠테이션 별도 접속 링크

**Branch**: `001-presentation-access-link` | **Date**: 2026-02-19 | **Spec**: `D:/workspace/flowchart-app/specs/001-presentation-access-link/spec.md`
**Input**: Feature specification from `/specs/001-presentation-access-link/spec.md`

## Summary

편집 화면과 분리된 프레젠테이션 전용 링크를 제공하고, OBS에서 직접 연결 가능한 URL/탭 제목을 보장한다. 링크는 6~8자 공유 코드를 사용하며 재생성 시 기존 링크와 기존 활성 탭을 즉시 무효화한다. 발표 화면은 링크 접속 중에도 저장 변경을 실시간 반영한다.

## Technical Context

**Language/Version**: TypeScript 5.7.x, React 18.x  
**Primary Dependencies**: React, React DOM, Zustand, Vite 6, Vitest, Playwright  
**Storage**: Browser localStorage (existing Zustand persist) + in-memory runtime state  
**Testing**: Vitest(unit/integration), Playwright(E2E), ESLint, TypeScript typecheck  
**Target Platform**: Modern desktop browsers (Chrome/Edge) + OBS Browser Source  
**Project Type**: Single web application (SPA)  
**Performance Goals**: 링크 진입 p95 <= 300ms, 링크 진입 실패율 <1%, 반복 진입 표시시간 편차 p95 <= 1s  
**Constraints**: 공유 코드 6~8자 유일성, 링크 재생성 즉시 기존 링크/활성 탭 차단, 실시간 자동 반영, 번들/메모리/네트워크 호출 예산 측정 의무  
**Scale/Scope**: 문서당 활성 링크 1개, 동시 발표 시청자 수십 명, 단일 다이어그램 발표 흐름 중심

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- 코드 품질: **PASS** - lint/typecheck 실행 및 증적 기록을 quickstart/tasks에서 강제한다.
- 테스트 표준: **PASS** - 사용자 스토리별 단위 + 통합/E2E 테스트 전략을 유지한다.
- UX 일관성: **PASS** - 기존 프레젠테이션 용어/피드백 패턴 재사용을 spec 요구와 일치시킨다.
- 성능 예산: **PASS** - p95 300ms + 실패율 + 편차 + 번들/메모리/네트워크 측정 항목을 포함한다.
- 주석/네이밍/구조: **PASS** - 기능 중심 구조 유지, 한글 이유 주석/네이밍 점검 항목을 계획에 반영한다.

## Project Structure

### Documentation (this feature)

```text
specs/001-presentation-access-link/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── openapi.yaml
├── checklists/
│   ├── requirements.md
│   ├── regression-results.md
│   ├── e2e-results.md
│   └── naming-convention.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── app/
├── features/
│   └── flowchart/
│       ├── components/
│       ├── services/
│       ├── store/
│       └── models/
└── shared/

tests/
├── unit/
├── integration/
└── helpers/
```

**Structure Decision**: 단일 SPA 구조를 유지하고, 프레젠테이션 링크 기능은 `src/features/flowchart` 내부 확장으로 구현한다. 외부 백엔드 도입 없이 클라이언트 상태/라우팅/렌더링을 확장한다.

## Phase 0 - Research Plan

- Research share-code collision handling for 6~8 length links
- Research immediate revocation propagation for already-open presentation tabs
- Research realtime sync update strategy for saved revisions
- Research OBS browser-source compatibility for URL/title stability
- Research performance-budget measurement pattern (render latency/failure rate/variance/bundle/memory/network)

## Phase 1 - Design & Contracts Plan

- 데이터 모델: PresentationLink, ShareCode, PresentationSessionState, LinkAccessEvent, DiagramSnapshot 정의
- 계약: 링크 조회/생성/재생성 + 발표 로드/이벤트 구독에 대한 클라이언트 facade 계약 정의
- 검증 가이드: 링크 생성, OBS 접속, 실시간 반영, 무효화, 성능 예산 측정 절차 문서화
- 에이전트 컨텍스트 갱신: `.specify/scripts/powershell/update-agent-context.ps1 -AgentType codex`
- 구현 체크포인트: Phase 1 체크리스트(`regression-results.md`, `e2e-results.md`, `naming-convention.md`, `performance-budget.md`) 생성 완료

## Post-Design Constitution Check

- 코드 품질: **PASS** - 구현/검증 경계(components/services/store/models) 분리로 단일 책임 유지 가능.
- 테스트 표준: **PASS** - 각 기능 요구사항을 단위/통합/E2E 시나리오로 매핑 완료.
- UX 일관성: **PASS** - 신규 UX 패턴 도입 없이 기존 토스트/오류 안내 규칙 재사용.
- 성능 예산: **PASS** - 300ms p95, 실패율, 편차, 번들/메모리/네트워크 측정 항목 포함.
- 주석/네이밍/구조: **PASS** - 한글 이유 주석 및 네이밍 점검 체크리스트 경로를 포함해 운영 가능.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| 없음 | 해당 없음 | 해당 없음 |
