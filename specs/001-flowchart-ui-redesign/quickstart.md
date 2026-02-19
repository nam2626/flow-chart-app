# Quickstart: Flowchart UI Redesign Validation

## 1) Prerequisites

- Repo root: `D:\workspace\flowchart-app`
- Install deps: `npm install`
- Run app: `npm run dev`

## 2) Manual Verification (Primary Acceptance)

1. 편집 모드 진입 시 상단/좌측/중앙/우측 구조가 레퍼런스 정보 구조와 일치하는지 확인.
2. 좌측 Shapes 및 Layers/Steps 패널에서 선택/정렬 동작이 기존과 동일한지 확인.
3. 중앙 캔버스에서 단계 간 시각 연결이 유지되는지 확인.
4. 우측 Properties에서 텍스트/색상 편집이 정상 동작하는지 확인.
5. `File` 메뉴에서 JSON/SVG/PNG Export가 모두 동작하는지 확인.
6. 캔버스 폭 조절 컨트롤이 표시되고 값 반영이 되는지 확인.
7. 프레젠테이션 모드 진입 시 기존 시각 레이아웃이 유지되는지 확인.

## 3) Automated Safety Checks (Constitution Compliance)

- Unit tests: `npm run test:unit`
- Integration tests: `npm run test:integration`
- E2E tests (필요 시): `npm run test:e2e`
- Lint/type check: `npm run lint`, `npm run typecheck`

## 4) Performance Comparison (Relative)

1. 기준 빌드와 변경 빌드에서 동일 시나리오 실행.
2. 편집 화면 초기 렌더와 패널 상호작용 시간을 p95로 기록.
3. 결과가 기준 빌드 대비 악화되지 않았는지 확인.

## 5) Evidence

- 스크린샷: 편집 모드 전체 레이아웃 1장 이상
- 체크리스트: 기능 동등성 항목별 pass/fail 기록
- 성능 비교표: 기준/변경 p95 수치

## 6) Validation Run Log

- 2026-02-17 `npm run lint`: PASS (경고 1건: `.eslintignore` deprecation 안내)
- 2026-02-17 `npm run typecheck`: PASS
- 2026-02-17 `npm run test:unit`: PASS (29 files, 56 tests)
- 2026-02-17 `npm run test:integration`: PASS (35 files, 47 tests)

## 7) Review Evidence Links

- FR-008 evidence: `specs/001-flowchart-ui-redesign/checklists/ui-regression.md`
- UX-004 evidence: `specs/001-flowchart-ui-redesign/checklists/ui-visual-rules.md`
